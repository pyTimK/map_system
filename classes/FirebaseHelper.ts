import { db } from "@/app/firebase";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import {
  BarangayData,
  YearBarangayData,
  constructEmptyBarangayData,
} from "./BarangayData";
import { Constants } from "./constants";

abstract class FirebaseHelper {
  //! ADD BARANGAY DATA
  static addBarangayData(barangayData: BarangayData, name: String) {
    const timestampId = Date.now().toString();
    const timestampNameId = timestampId + Constants.delimeter + name;

    const batch = writeBatch(db);
    const barangayDataDoc = doc(db, "barangay_data", timestampId);
    batch.set(barangayDataDoc, { name: name });
    for (const barangay in barangayData) {
      const barangayDoc = doc(
        db,
        "barangay_data",
        timestampId,
        "barangay",
        barangay
      );
      batch.set(barangayDoc, barangayData[barangay as keyof BarangayData], {
        merge: true,
      });
    }
    batch.update(doc(db, "data", "admin_data"), {
      csvs: arrayUnion(timestampNameId),
    });
    batch.update(doc(db, "data", "data"), { default: timestampNameId });
    batch.commit();
  }

  //! REMOVE BARANGAY DATA
  static removeBarangayData(timestampNameId: string) {
    if (!timestampNameId.includes(Constants.delimeter)) return;

    const timestampId = timestampNameId.split(Constants.delimeter)[0];

    console.log(`removing barangay data for ${timestampNameId}`);
    const batch = writeBatch(db);
    for (const barangay in constructEmptyBarangayData()) {
      const barangayDoc = doc(
        db,
        "barangay_data",
        timestampId,
        "barangay",
        barangay
      );
      batch.delete(barangayDoc);
    }
    batch.delete(doc(db, "barangay_data", timestampId));
    batch.update(doc(db, "data", "admin_data"), {
      csvs: arrayRemove(timestampNameId),
    });
    batch.commit();
  }

  //! GET BARANGAY DATA
  static async getBarangayData(timestampId: string) {
    console.log(timestampId);

    const barangayDataDoc = doc(db, "barangay_data", timestampId);

    if (!(await getDoc(barangayDataDoc)).exists()) {
      console.log(`no barangay data for ${timestampId}`);
      return;
    }

    const barangayData = constructEmptyBarangayData();
    for (const barangay in barangayData) {
      const barangayDocRef = doc(
        db,
        "barangay_data",
        timestampId,
        "barangay",
        barangay
      );
      const barangaySnap = await getDoc(barangayDocRef);
      if (barangaySnap.exists()) {
        barangayData[barangay as keyof BarangayData] =
          barangaySnap.data() as YearBarangayData;
      }
    }
    console.log(timestampId, barangayData);
    return barangayData;
  }
}

export default FirebaseHelper;
