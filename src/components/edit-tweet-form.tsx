import { doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    `;

const TextArea = styled.textarea`
    width: 100%;
    margin-top: 10px;
    padding: 20px;
    background-color: black;
    border: 2px solid white;
    border-radius: 20px;
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: white;
    resize: none;
    &::placeholder{
        font-size: 16px;
    }
    &:focus{
        outline: none;
        border-color: #1d9bf0;
    }
`;

const AttachFileButton = styled.label`
    padding: 10px 0px;
    border: 1px solid currentColor;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
    color: #1d9bf0;
    text-align: center;
    cursor: pointer;
    `;

const AttachFileInput = styled.input`
    display: none;
    `;

const SubmitButton = styled.input`
    padding: 10px 0px;
    background-color: #1d9bf0;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    cursor: pointer;
    &:hover,
    &:active{
        opacity: 0.9;
    }
`;

export default function EditTweetFrom({ photo, tweet, id, setEditing }) {
  const [loading, setLoading] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet);
  const [editFile, setEditFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value);
  };

  const onEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      if (files[0].size > 1000000) {
        alert("ooooooops! too much size!!!");
        return;
      }
      setEditFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || loading || editTweet === "" || editTweet.length > 180) {
      return;
    }
    try {
      setLoading(true);
      const tweetRef = doc(db, "tweets", id);
      await updateDoc(tweetRef, {
        tweet: editTweet,
      });
      if (editFile) {
        if (photo) {
          const originRef = ref(storage, `tweets/${user.uid}/${id}`);
          await deleteObject(originRef);
        }

        const locationRef = ref(storage, `tweets/${user.uid}/${id}`);
        const result = await uploadBytes(locationRef, editFile);
        const url = await getDownloadURL(result.ref);

        await updateDoc(tweetRef, {
          photo: url,
        });
      }
      setEditTweet("");
      setEditFile(null);
      setEditing(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={editTweet}
      />
      <AttachFileButton htmlFor={`eidtFile${id}`}>
        {editFile ? "Photo added ✅" : photo ? "Change photo" : "Add photo"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onEditFileChange}
        id={`editFile${id}`}
        type="file"
        accept="image/*"
      />
      <SubmitButton type="submit" value={loading ? "Editing..." : "Edit Tweet"}/>

    </Form>
  );
}
