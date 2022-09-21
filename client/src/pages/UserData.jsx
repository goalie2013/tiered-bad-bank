import React, { useContext } from "react";
import Transaction from "../components/Transaction";
import { UserContext } from "..";
import CustomCard from "../components/Card";
import { COLORS } from "../themes";

export default function UserData() {
  const ctx = useContext(UserContext);
  const currentUser = ctx.users[ctx.users.length - 1];

  const transactions =
    currentUser &&
    currentUser.transactions.map((el, i) => {
      //`${i + 1}: ${el}`;
      return <Transaction key={i} idx={i} transaction={el} />;
    });

  return (
    <>
      {currentUser && (
        <div className="page-wrapper">
          <h1>All Data</h1>
          <h3 style={{ marginTop: "2rem" }}>
            <b>Your Current Balance: {currentUser.balance}</b>
          </h3>
          {/* <h3>Transaction History</h3> */}
          <CustomCard
            bgHeaderColor={COLORS.cardHeader}
            header={`${currentUser.name} Transaction History`}
            body={<h4>{transactions}</h4>}
          ></CustomCard>
          {/* {transactions} */}
        </div>
      )}
    </>
  );
}
