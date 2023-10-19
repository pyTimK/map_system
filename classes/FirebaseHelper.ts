import { db } from "@/app/firebase";
import {
  arrayRemove,
  arrayUnion,
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

abstract class FirebaseHelper {
  static addBarangayData(barangayData: BarangayData) {
    const id = Date.now().toString();

    const batch = writeBatch(db);
    for (const barangay in barangayData) {
      console.log(barangay);
      const barangayDoc = doc(db, "barangay_data", id, "barangay", barangay);
      batch.set(barangayDoc, barangayData[barangay as keyof BarangayData], {
        merge: true,
      });
    }
    batch.update(doc(db, "data", "admin_data"), { csvs: arrayUnion(id) });
    batch.update(doc(db, "data", "data"), { default: id });
    batch.commit();
  }

  static removeBarangayData(id: string) {
    const batch = writeBatch(db);
    batch.delete(doc(db, "barangay_data", id));
    batch.update(doc(db, "data", "admin_data"), { csvs: arrayRemove(id) });
    batch.commit();
  }

  static async getBarangayData(id: string) {
    const barangayData = constructEmptyBarangayData();
    for (const barangay in barangayData) {
      const barangayDocRef = doc(db, "barangay_data", id, "barangay", barangay);
      const barangaySnap = await getDoc(barangayDocRef);
      if (barangaySnap.exists()) {
        barangayData[barangay as keyof BarangayData] =
          barangaySnap.data() as YearBarangayData;
      }
    }
    console.log(barangayData);
    return barangayData;
  }
}

export default FirebaseHelper;
