"use client";

import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { auth } from "./firebase";
import PagesWrapper from "./pages/PagesWrapper";
import LoadingPage from "./pages_outer/LoadingPage";

export default function Home() {
  return (
    <>
      <Wrapper />
      <ToastContainer theme="colored" autoClose={2} closeButton={false} />
    </>
  );
}

const Wrapper = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // user changes
  useEffect(() => {
    onAuthStateChanged(auth, (new_user) => {
      setUser(new_user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return <PagesWrapper user={user} />;
};
