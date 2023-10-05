import { ReadingData, constructEmptyReadingData } from "@/classes/ReadingData";
import useFirestoreData, { FirestoreDataType } from "@/hooks/useFirestoreData";
import { User } from "firebase/auth";
import { doc } from "firebase/firestore";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { db } from "../firebase";
import SignInPage from "../pages_outer/SignInPage";
import MainPage from "./MainPage";

export const PagesWrapperContext = createContext({
  user: null as User | null,
  setShowSignIn: {} as Dispatch<SetStateAction<boolean>>,
  readingData: {} as FirestoreDataType<ReadingData>,
});

interface PagesWrapperProps {
  user: User | null;
}

const PagesWrapper: React.FC<PagesWrapperProps> = ({ user }) => {
  const [showSignIn, setShowSignIn] = useState(false);

  const readingData = useFirestoreData(
    doc(db, "data", "data"),
    constructEmptyReadingData
  );

  useEffect(() => {
    if (user !== null) {
      setShowSignIn(false);
    }
  }, [user]);

  console.log(readingData);

  return (
    <PagesWrapperContext.Provider value={{ user, setShowSignIn, readingData }}>
      {showSignIn ? <SignInPage /> : <MainPage />}
    </PagesWrapperContext.Provider>
  );
};

export default PagesWrapper;
