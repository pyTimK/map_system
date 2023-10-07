import {
  BarangayData,
  constructEmptyBarangayData,
} from "@/classes/BarangayData";
import {
  SettingsData,
  constructEmptySettingsData,
} from "@/classes/SettingsData";
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
import ImportPage from "./ImportPage";
import MainPage from "./MainPage";
import FirebaseHelper from "@/classes/FirebaseHelper";

export const PagesWrapperContext = createContext({
  user: null as User | null,
  setShowSignIn: {} as Dispatch<SetStateAction<boolean>>,
  setShowImport: {} as Dispatch<SetStateAction<boolean>>,
  settingsData: {} as FirestoreDataType<SettingsData>,
  barangayData: {} as BarangayData,
});

interface PagesWrapperProps {
  user: User | null;
}

const PagesWrapper: React.FC<PagesWrapperProps> = ({ user }) => {
  //! SIGN IN PAGE
  const [showSignIn, setShowSignIn] = useState(false);
  useEffect(() => {
    if (user !== null) {
      setShowSignIn(false);
    }
  }, [user]);

  //! IMPORT PAGE
  const [showImport, setShowImport] = useState(false);

  //! SETTINGS DATA
  const settingsData = useFirestoreData(
    doc(db, "data", "data"),
    constructEmptySettingsData
  );

  //! BARANGAY DATA
  const [barangayData, setBarangayData] = useState(
    constructEmptyBarangayData()
  );

  useEffect(() => {
    const id = settingsData.default;

    if (!id) return;

    FirebaseHelper.getBarangayData(id).then((data) => {
      setBarangayData(data ?? constructEmptyBarangayData());
    });
  }, [settingsData.default]);

  return (
    <PagesWrapperContext.Provider
      value={{ user, setShowSignIn, setShowImport, settingsData, barangayData }}
    >
      {showSignIn ? <SignInPage /> : showImport ? <ImportPage /> : <MainPage />}
    </PagesWrapperContext.Provider>
  );
};

export default PagesWrapper;
