import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };
  const editTransaction = async (id, newData) => {
    try {
      const transactionDocRef = doc(db, "transactions", id);
      await updateDoc(transactionDocRef, newData);
    } catch (error) {
      console.error("Error updating transaction: ", error);
    }
  };
  return { addTransaction, editTransaction };
};
