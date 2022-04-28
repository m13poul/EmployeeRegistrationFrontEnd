import React from 'react'
import { useSelector } from "react-redux";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";


function ConfirmationComp() {
  // This Hook is an alternative for the connect() method from good old Redux. Instead of using mapStateToProps and the rest, we can simply work the Hook! Hooray!
  // Among other things connect() is also kind of tricky to work with TS.
  const newEmployee = useSelector(
    (state) => state.employeeToRegister.newEmployee
  );

  // useRef returns a mutable ref object. We need this for the next step.
  const toPrintRef = useRef();
  // useReactToPrint will print the component we in order to render a Card for the new employee
  const handlePrintEmployeeCard = useReactToPrint({
    content: () => toPrintRef.current,
  });

  return (
    // Nothing fancy Headers, just some markup
    <div
      className="mx-auto  box-border min-w-full overflow-hidden  rounded-r-md border border-b-4  border-secondary shadow-xl dark:text-white"
      ref={toPrintRef}
    >
      <div className="svgDivStyle">
        <svg className="inline-block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Success
      </div>
      <div className="mt-12 text-center">
        <div className="mb-12 px-2 text-3xl">
          You have successfully registered a new employee!
        </div>
        <div className="grid gap-x-4  text-2xl md:grid-cols-2">
          <p className="justify-self-end">First name: </p>
          <p className="justify-self-start">{newEmployee.firstName}</p>
          <p className="justify-self-end">Last name: </p>
          <p className="justify-self-start">{newEmployee.lastName}</p>
          <p className="justify-self-end">Email: </p>
          <p className="justify-self-start">{newEmployee.email}</p>
          <p className="justify-self-end">Gender: </p>
          <p className="justify-self-start">{newEmployee.Gender}</p>
          <div className="col-span-2 my-8 justify-self-center">
            <QRCodeSVG
              renderas="svg"
              bgColor="#66000000"
              // Some people, when confronted with a problem, think "I know, I'll use regular expressions." Now they have two problems. http://regex.info/blog/2006-09-15/247
              // value={JSON.stringify(newEmployee).replace(/[!@#$%^&*{}"]/g, "")} />
              value={`First Name: ${JSON.stringify(newEmployee.firstName)}, Last Name: ${JSON.stringify(newEmployee.lastName)}, Email: ${JSON.stringify(newEmployee.email)}, Gender: ${JSON.stringify(newEmployee.Gender)} `}
            />
          </div>
        </div>
      </div>
      <div className="confirmationCompoButtonGrid">
        <Link to="/">
          <div className="confirmationCompoButton"> Register another one </div>
        </Link>
        <div className="confirmationCompoButton" onClick={handlePrintEmployeeCard} > Print Card </div>
      </div>
    </div>
  )
}

export default ConfirmationComp