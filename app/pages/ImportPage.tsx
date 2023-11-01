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
import TimestampNameId from "@/classes/TimestampNameId";

export const ImportPagesContext = createContext({
  adminData: {} as FirestoreDataType<AdminData>,
});

interface ImportPageProps {}

const ImportPage: React.FC<ImportPageProps> = ({}) => {
  const { settingsData } = useContext(PagesWrapperContext);
  const adminData = useFirestoreData(
    doc(db, "data", "admin_data"),
    constructEmptyAdminData
  );

  const importLength = adminData.csvs.length;

  return (
    <ImportPagesContext.Provider value={{ adminData }}>
      <div className="py-32 px-16">
        {/*//! IMPORT BOX  //*/}
        <div className="pb-16">
          <MyImporter />
        </div>

        {/*//! PREVIOUS IMPORTS  //*/}
        <p className={`${jsoFont} text-2xl`}>Previous Imports</p>
        <div className="flex flex-col gap-4">
          {adminData.csvs
            .map((timestampNameIdStr, _) =>
              TimestampNameId.fromStr(timestampNameIdStr)
            )
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((timestampNameId, index) => {
              const dateObject = new Date(timestampNameId.timestamp);
              const localDateString = dateObject.toLocaleDateString(
                undefined,
                dateFormatOptions
              );

              const isDefault = TimestampNameId.fromStr(
                settingsData.default
              ).equals(timestampNameId);

              return (
                <div
                  key={index}
                  className="flex items-center justify-between border border-black rounded-lg pl-1 pr-3 py-3 select-none hover:bg-lighter_blue"
                  style={{
                    backgroundColor: isDefault ? "#F9D5B5" : undefined,
                  }}
                  onClick={() => {}}
                >
                  <div className="flex flex-row items-center gap-2 pl-1">
                    <p className="text-sm text-gray-600">
                      {importLength - index}:{" "}
                    </p>
                    <p className="text-lg">{timestampNameId.name}</p>
                    <p className="text-sm text-gray-600">
                      &nbsp;&nbsp;{localDateString}
                    </p>
                  </div>
                  {!isDefault && (
                    <div className="flex flex-row items-center gap-4">
                      <CheckCircleIcon
                        onClick={() =>
                          settingsData.updateData({
                            default: `${timestampNameId}`,
                          })
                        }
                      />

                      <CrossCircleIcon
                        onClick={() =>
                          FirebaseHelper.removeBarangayData(
                            `${timestampNameId}`
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
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
