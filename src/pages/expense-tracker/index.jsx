// import { useState } from "react";
// import { signOut } from "firebase/auth";
// import { useAddTransaction } from "../../hooks/useAddTransaction";
// import { useGetTransactions } from "../../hooks/useGetTransactions";
// import { useGetUserInfo } from "../../hooks/useGetUserInfo";
// import { useNavigate } from "react-router-dom";

// import "./styles.css";
// import { auth } from "../../config/firebase-config";

// export const ExpenseTracker = () => {
//   const { addTransaction, editTransaction } = useAddTransaction();
//   const { transactions, transactionTotals, deleteTransaction } =
//     useGetTransactions();
//   const { name, profilePhoto } = useGetUserInfo();
//   const navigate = useNavigate();

//   const [description, setDescription] = useState("");
//   const [transactionAmount, setTransactionAmount] = useState(0);
//   const [transactionType, setTransactionType] = useState("expense");

//   const { balance, income, expenses } = transactionTotals;

//   const onSubmit = (e) => {
//     e.preventDefault();
//     addTransaction({
//       description,
//       transactionAmount,
//       transactionType,
//     });

//     setDescription("");
//     setTransactionAmount("");
//   };
//   const handleDelete = (id) => {
//     deleteTransaction(id);
//   };
//   const handleEdit = (id) => {
//     editTransaction(id);
//   };
//   const signUserOut = async () => {
//     try {
//       await signOut(auth);
//       localStorage.clear();
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <div className="expense-tracker">
//         <div className="container">
//           <h1> {name}'s Expense Tracker</h1>
//           <div className="balance">
//             <h3> Your Balance</h3>
//             {balance >= 0 ? <h2> ${balance}</h2> : <h2> -${balance * -1}</h2>}
//           </div>
//           <div className="summary">
//             <div className="income">
//               <h4> Income</h4>
//               <p>${income}</p>
//             </div>
//             <div className="expenses">
//               <h4> Expenses</h4>
//               <p>${expenses}</p>
//             </div>
//           </div>
//           <form className="add-transaction" onSubmit={onSubmit}>
//             <input
//               type="text"
//               placeholder="Description"
//               value={description}
//               required
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               value={transactionAmount}
//               required
//               onChange={(e) => setTransactionAmount(e.target.value)}
//             />
//             <input
//               type="radio"
//               id="expense"
//               value="expense"
//               checked={transactionType === "expense"}
//               onChange={(e) => setTransactionType(e.target.value)}
//             />
//             <label htmlFor="expense"> Expense</label>
//             <input
//               type="radio"
//               id="income"
//               value="income"
//               checked={transactionType === "income"}
//               onChange={(e) => setTransactionType(e.target.value)}
//             />
//             <label htmlFor="income"> Income</label>

//             <button type="submit"> Add Transaction</button>
//           </form>
//         </div>
//         {profilePhoto && (
//           <div className="profile">
//             {" "}
//             <img className="profile-photo" src={profilePhoto} />
//             <button className="sign-out-button" onClick={signUserOut}>
//               Sign Out
//             </button>
//           </div>
//         )}
//       </div>
//       <div className="transactions">
//         <h3> Transactions</h3>
//         <ul>
//           {transactions.map((transaction) => {
//             const { id, description, transactionAmount, transactionType } =
//               transaction;
//             return (
//               <li key={id}>
//                 <h4> {description} </h4>
//                 <p>
//                   ${transactionAmount} •{" "}
//                   <label
//                     style={{
//                       color: transactionType === "expense" ? "red" : "green",
//                     }}
//                   >
//                     {" "}
//                     {transactionType}{" "}
//                   </label>
//                 </p>

//                 <div>
//                   <button onClick={() => handleDelete(id)}>Delete</button>
//                   <button onClick={() => handleEdit(id)}>Edit</button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </>
//   );
// };

import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction, editTransaction } = useAddTransaction();
  const { transactions, transactionTotals, deleteTransaction } =
    useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [editedTransaction, setEditedTransaction] = useState(null);

  const { balance, income, expenses } = transactionTotals;

  const handleEditClick = (transaction) => {
    setEditedTransaction(transaction);
  };

  const handleDelete = (id) => {
    deleteTransaction(id);
  };

  const handleEditSubmit = () => {
    if (editedTransaction) {
      editTransaction(editedTransaction.id, {
        transactionAmount: editedTransaction.transactionAmount,
        transactionType: editedTransaction.transactionType,
      });
      setEditedTransaction(null);
    }
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitDefault = (e) => {
    e.preventDefault();
    addTransaction({
      description: e.target.description.value,
      transactionAmount: e.target.transactionAmount.value,
      transactionType: e.target.transactionType.value,
    });
    e.target.reset();
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1> {name}'s Expense Tracker</h1>
          <div className="balance">
            <h3> Your Balance</h3>
            {balance >= 0 ? <h2> ${balance}</h2> : <h2> -${balance * -1}</h2>}
          </div>
          <div className="summary">
            <div className="income">
              <h4> Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4> Expenses</h4>
              <p>${expenses}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={handleSubmitDefault}>
            <input
              type="text"
              name="description"
              placeholder="Description"
              required
            />
            <input
              type="number"
              name="transactionAmount"
              placeholder="Amount"
              required
            />
            <select name="transactionType" defaultValue="expense">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <button type="submit"> Add Transaction</button>
          </form>
          {profilePhoto && (
            <div className="profile">
              {" "}
              <img className="profile-photo" src={profilePhoto} />
              <button className="sign-out-button" onClick={signUserOut}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="transactions">
        <h3> Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { id, description, transactionAmount, transactionType } =
              transaction;
            return (
              <li key={id}>
                {editedTransaction && editedTransaction.id === id ? (
                  <div>
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={editedTransaction.description}
                      onChange={(e) =>
                        setEditedTransaction({
                          ...editedTransaction,
                          description: e.target.value,
                        })
                      }
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      value={editedTransaction.transactionAmount}
                      onChange={(e) =>
                        setEditedTransaction({
                          ...editedTransaction,
                          transactionAmount: e.target.value,
                        })
                      }
                    />
                    <select
                      value={editedTransaction.transactionType}
                      onChange={(e) =>
                        setEditedTransaction({
                          ...editedTransaction,
                          transactionType: e.target.value,
                        })
                      }
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                    <button onClick={handleEditSubmit}>Save</button>
                    <button onClick={() => setEditedTransaction(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <h4> {description} </h4>
                    <p>
                      ${transactionAmount} •{" "}
                      <label
                        style={{
                          color:
                            transactionType === "expense" ? "red" : "green",
                        }}
                      >
                        {" "}
                        {transactionType}{" "}
                      </label>
                    </p>
                    <div>
                      <button onClick={() => handleDelete(id)}>Delete</button>
                      <button onClick={() => handleEditClick(transaction)}>
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
