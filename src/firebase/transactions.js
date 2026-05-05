import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";
import { addDoc } from "firebase/firestore";

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