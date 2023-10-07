import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import BackPage from "@/components/custom/BackPage";
import { PagesWrapperContext } from "./PagesWrapper";
import { createContext, useContext } from "react";
import { jsoFont } from "@/styles/fonts";
import useFirestoreData, { FirestoreDataType } from "@/hooks/useFirestoreData";
import { AdminData, constructEmptyAdminData } from "@/classes/AdminData";
import MyImporter from "@/components/custom/MyImporter";
import FirebaseHelper from "@/classes/FirebaseHelper";
import CrossCircleIcon from "@/components/svg/icon/CrossCircleIcon";
import CheckCircleIcon from "@/components/svg/icon/CheckCircleIcon";

export const ImportPagesContext = createContext({
  adminData: {} as FirestoreDataType<AdminData>,
});

interface ImportPageProps {}

const ImportPage: React.FC<ImportPageProps> = ({}) => {
  const { setShowImport, settingsData } = useContext(PagesWrapperContext);
  const adminData = useFirestoreData(
    doc(db, "data", "admin_data"),
    constructEmptyAdminData
  );

  const importLength = adminData.csvs.length;

  return (
    <ImportPagesContext.Provider value={{ adminData }}>
      <div className="py-32 px-16">
        <div className="pb-16">
          <MyImporter />
        </div>
        <p className={`${jsoFont} text-2xl`}>Previous Imports</p>
        <div className="flex flex-col gap-4">
          {adminData.csvs
            .map((importId, _) => parseInt(importId, 10))
            .sort((a, b) => b - a)
            .map((importId, index) => {
              const dateObject = new Date(importId);
              const localDateString = dateObject.toLocaleDateString(
                undefined,
                dateFormatOptions
              );

              return (
                <div
                  key={index}
                  className="flex items-center justify-between border border-black rounded-lg pl-1 pr-3 py-3 select-none hover:bg-lighter_blue"
                  style={{
                    backgroundColor:
                      settingsData.default === `${importId}`
                        ? "#F9D5B5"
                        : undefined,
                  }}
                  onClick={() => {}}
                >
                  <div className="flex flex-row items-center gap-2 pl-1">
                    <p className="text-sm text-gray-600">
                      {importLength - index}:{" "}
                    </p>
                    <p className="text-lg">{localDateString}</p>
                  </div>
                  {settingsData.default !== `${importId}` && (
                    <div className="flex flex-row items-center gap-4">
                      <CheckCircleIcon
                        onClick={() =>
                          settingsData.updateData({ default: `${importId}` })
                        }
                      />

                      <CrossCircleIcon
                        onClick={() =>
                          FirebaseHelper.removeBarangayData(`${importId}`)
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        <BackPage onClick={() => setShowImport(false)} />
      </div>
    </ImportPagesContext.Provider>
  );
};

// Format the Date object into a local date string
const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

export default ImportPage;
