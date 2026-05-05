import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./config";

export async function getTransactions() {
  const querySnapshot = await getDocs(collection(db, "transactions"));

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