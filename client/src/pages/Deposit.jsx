import React, { useState, useContext, useRef } from "react";
import SubmitBtn from "../components/SubmitBtn";
import CustomCard from "../components/Card";
import Form from "react-bootstrap/Form";
import { UserContext } from "..";
import { handleChange, handleKeyPress } from "../helper";
import dayjs from "dayjs";
import { COLORS } from "../themes";
import { Card } from "react-bootstrap";

// ** If grabbing value from onChange on each keychange, use ref OR e.target.value; NOT depositValue
// ** setState won't update until next render, so messes up disabled/abled button

export default function Deposit() {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");
  const [depositValue, setDepositValue] = useState("");
  const [textColor, setTextColor] = useState("");
  const ctx = useContext(UserContext);
  const currentUser = ctx.users[ctx.users.length - 1];
  // const ref = useRef(null);

  console.log("depositValue on render", depositValue);
  console.log("ctx", ctx);
  console.log("currentUser", currentUser);

  // function handleKeyPress(e) {
  //   console.log("--- handleKeyPress ---");
  //   e.preventDefault();
  //   if (e.keyCode === 13) {
  //     if (show === true) {
  //       handleDeposit();
  //       return false;
  //     } else {
  //       setTextColor("red");
  //       setStatus("Cannot Complete Deposit");
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // }

  function handleDeposit() {
    console.log("-- handleDeposit --");
    // console.log("ref", ref.current.value, typeof ref.current.value);
    console.log("depositVal", depositValue, typeof depositValue);
    const depositInt = parseInt(depositValue);
    currentUser.balance += depositInt;
    currentUser.transactions = [
      ...currentUser.transactions,
      {
        info: `Deposit $${depositInt}`,
        timeStamp: dayjs().format("MM/DD/YYYY HH:mm:ss"),
      },
    ];

    setTextColor("green");
    setStatus("Deposit Complete!");
    setShow(false);
    setDepositValue("");
  }

  return (
    <div className="page-wrapper">
      <h1>Deposit</h1>
      <CustomCard
        bgHeaderColor={COLORS.cardHeader}
        header="Deposit Into Account"
        bgColor={COLORS.cardBackground}
        statusText={status}
        statusColor={textColor}
        body={
          <Form
            className="form"
            // onSubmit={(e) =>
            //   handleKeyPress(e, handleDeposit, setTextColor, show,setStatus)
            // }
          >
            <Form.Group className="mb-4" controlId="formDeposit">
              <Form.Label style={{ fontSize: "1.5rem" }}>
                Deposit Amount
              </Form.Label>
              <Form.Control
                required
                // ref={ref}
                size="lg"
                type="text"
                placeholder="Deposit"
                value={depositValue}
                onChange={(e) =>
                  handleChange(
                    e,
                    setDepositValue,
                    setStatus,
                    setShow,
                    setTextColor
                  )
                }
              />
            </Form.Group>

            {show ? (
              <SubmitBtn name="Deposit" handleClick={handleDeposit} />
            ) : (
              <SubmitBtn name="Deposit" disabled="true" />
            )}
          </Form>
        }
      />
      {/* DEVELOPMENT ONLY */}
      {/* <div>{JSON.stringify(currentUser)}</div> */}
    </div>
  );
}
