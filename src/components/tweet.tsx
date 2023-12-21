import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { styled, withTheme } from "styled-components";
import { auth, db, storage } from "../firebase";
import EditTweetFrom from "./edit-tweet-form";
import { ITweet } from "./timeline";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div`
  &:last-child {
    place-self: end;
  }
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  
  `;

const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #1d9bf0;
  text-transform: uppercase;
  color: white;
  font-size: 12px;
  cursor: pointer;
  border: 0;
  border-radius: 5px;
  font-weight: 600;`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const [editing, setEditing] = useState(false);
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };
  const onEdit = () => setEditing((prev) => !prev);
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {editing ? (
          <EditTweetFrom
            tweet={tweet}
            photo={photo}
            id={id}
            setEditing={setEditing}
          />
        ) : (
          <Payload>{tweet}</Payload>
        )}

        {user?.uid === userId ? (<BtnWrap>
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
          <EditButton onClick={onEdit}>
            {editing ?"Cancel":"Edit"}
          </EditButton>
        </BtnWrap>
        ) : null}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
