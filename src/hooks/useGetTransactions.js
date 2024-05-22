import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  doc, // Importing doc
  deleteDoc, // Importing deleteDoc
  editTransaction,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });

  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === "expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }

          console.log(totalExpenses, totalIncome);
        });

        setTransactions(docs);

        let balance = totalIncome - totalExpenses;
        setTransactionTotals({
          balance,
          expenses: totalExpenses,
          income: totalIncome,
        });
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  //

  const deleteTransaction = async (id) => {
    try {
      const transactionDocRef = doc(db, "transactions", id);
      await deleteDoc(transactionDocRef);
      // Update state to remove the deleted transaction
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction: ", error);
    }
  };

  // const editTransaction = async (id, newData) => {
  //   try {
  //     // Call the editTransaction function from useAddTransaction
  //     // This will update the transaction in Firebase Firestore
  //     await editTransaction(id, newData);

  //     // Update the state to reflect the changes
  //     setTransactions(
  //       transactions.map((transaction) => {
  //         if (transaction.id === id) {
  //           return { ...transaction, ...newData };
  //         }
  //         return transaction;
  //       })
  //     );
  //   } catch (error) {
  //     console.error("Error editing transaction: ", error);
  //   }
  // };

  return {
    transactions,
    deleteTransaction,
    transactionTotals,
  };
};

//

// return { transactions, transactionTotals };
// };
