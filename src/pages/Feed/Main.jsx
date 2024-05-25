import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Post from "../../components/Post";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  snapshotEqual,
} from "firebase/firestore";
import { db } from "../../fireBase/config";
import Loader from "../../components/Loader";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState();
  useEffect(() => {
    const tweetsCol = collection(db, "tweets");
    const q = query(tweetsCol, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const tempTweets = [];
      snapshot.docs.map((doc) =>
        tempTweets.push({ ...doc.data(), id: doc.id })
      );
      setTweets(tempTweets);
    });
  }, []);
  return (
    <main className="border border-zinc-600 overflow-auto">
      <header className="border-b border-zinc-600 p-4 font-bold">
        Main page
      </header>
      <Form user={user} />
      {!tweets ? (
        <div className="my-20 flex justify-center scale-150">
          <Loader />
        </div>
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
