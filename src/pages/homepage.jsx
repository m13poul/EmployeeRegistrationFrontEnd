import React from 'react'
import Form from '../components/form.component'
import { motion, AnimatePresence } from "framer-motion";

function Homapage() {
  return (
    <div >
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.5, duration: 1 }}>
          <div>
            <div className="outsideWrapper"></div>
            <div className="insideWrapper">
              <div className="w-96 rounded-md border-2 border-secondary p-2 dark:border-white">
                <Form />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Homapage