import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./config";

export async function getTransactions() {
  const q = query(collection(db, "transactions"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addTransaction(data) {
  await addDoc(collection(db, "transactions"), {
    ...data,
    amount: Number(data.amount),
    month: data.date.slice(0, 7),
    createdAt: serverTimestamp(),
  });
}

export async function deleteTransaction(id) {
  await deleteDoc(doc(db, "transactions", id));
}

export async function updateTransaction(id, data) {
  await updateDoc(doc(db, "transactions", id), {
    ...data,
    amount: Number(data.amount),
    month: data.date.slice(0, 7),
  });
}