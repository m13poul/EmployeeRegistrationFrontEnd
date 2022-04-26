import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationComp from "../components/confirmation.component";
import { useSelector } from "react-redux";
import ErrorMessage from "../components/errorMessage";

function Confirmation() {

  const status = useSelector(state => state.employeeToRegister.statusCode)

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