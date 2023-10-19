"use client";

import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { auth, db } from "./firebase";
import PagesWrapper from "./pages/PagesWrapper";
import LoadingPage from "./pages_outer/LoadingPage";
import useFirestoreData from "@/hooks/useFirestoreData";
import { doc } from "firebase/firestore";
import { constructEmptyAdminBackendSettingsData } from "@/classes/AdminBackendSettingsData";

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
  const adminBackendSettingsData = useFirestoreData(
    doc(db, "admin", "backend_settings"),
    constructEmptyAdminBackendSettingsData
  );

  // user changes
  useEffect(() => {
    onAuthStateChanged(auth, (new_user) => {
      setUser(new_user);
      setLoading(false);
    });
  }, []);

  if (adminBackendSettingsData.nuke) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <h1>💥</h1>
      </div>
    );
  } else if (loading) {
    return <LoadingPage />;
  }

  return <PagesWrapper user={user} />;
};
