import { Unsubscribe } from "firebase/auth";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar{
    display: none;
  }
`;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubcribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createAt", "desc"),
        limit(25));

        unsubcribe = onSnapshot(tweetsQuery, (snapshot) => {
          const tweets = snapshot.docs.map((doc) => {
            const {tweet, createAt, userId, username, photo} = doc.data();
            return {
              tweet,
              createAt,
              userId,
              username,
              photo,
              id:doc.id,
            };
          });
          setTweet(tweets);
        })
    };
    fetchTweets();
    return () => {
      unsubcribe && unsubcribe();
    };
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet}/>
      ))}
    </Wrapper>
  );
}
