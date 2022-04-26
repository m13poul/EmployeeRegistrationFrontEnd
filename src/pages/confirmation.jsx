import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationComp from "../components/confirmation.component";
import { useSelector } from "react-redux";
import ErrorMessage from "../components/errorMessage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Confirmation() {

  const status = useSelector(state => state.employeeToRegister.statusCode)
  const employee = useSelector(state => state.employeeToRegister.newEmployee)
  console.log(employee)
  const navigate = useNavigate()
  useEffect(() => {
    Object.keys(employee).length === 0 ?
      navigate('/', { replace: true })
      : null
  },
    [employee]);
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
        <div className="outsideWrapper">
          <div className="insideWrapper">
            {status != 200
              ? <ErrorMessage />
              : <ConfirmationComp />}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Confirmation;