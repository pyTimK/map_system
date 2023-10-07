import { db } from "@/app/firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { BarangayData } from "./BarangayData";

abstract class FirebaseHelper {
  static addBarangayData(barangayData: BarangayData) {
    const id = Date.now().toString();

    const batch = writeBatch(db);
    batch.set(doc(db, "barangay_data", id), barangayData);
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
    const docRef = doc(db, "barangay_data", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as BarangayData;
    } else {
      return null;
    }
  }
}

export default FirebaseHelper;
