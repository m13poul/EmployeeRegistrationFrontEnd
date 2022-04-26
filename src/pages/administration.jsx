import React from "react";
import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function DashboardLogin() {

  // Placeholder for any possible errors during authentication.
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate();

  // Firebase Observer. If there's already a user, go to dashboard.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/administration/dashboard', { replace: true })
      }
    });
    return () => unsubscribe()
  }, []);

  // Pretty much what we did for the the registration form 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };

  // Basic Firebase 9 authentication using Email/Password. If successfull redirect to dashboard, else show an error message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log(user)
        // console.log("logged In as:", user);
        setFormData({ email: "", password: "" });
        navigate('/administration/dashboard', { replace: true })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        setErrorMessage(errorMessage)
        setTimeout(() => {
          setErrorMessage("")
        }, 4000);
      });

  };
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
        <div className="administratorLoginPageWrapper">
          <div className=" mx-auto grid grid-cols-2 justify-items-center">
            <div className=" h-screen w-full bg-primary"></div>
            <div className="h-screen w-full bg-primary"></div>
          </div>
          <div className="insideWrapper">
            <div className="grid grid-cols-1">
              <div className="mb-12 self-center justify-self-start text-secondary">
                <h2 className=" mb-4 text-5xl font-semibold">Hello again!</h2>
                <h3 className="border-r-2 border-tertiary">Welcome Back.</h3>
              </div>
              <div className="self-center justify-self-start">
                <form onSubmit={handleSubmit} className="w-96">
                  <div className="my-4 grid grid-cols-1">
                    <div>
                      <div className=" mb-4 flex flex-col rounded border border-secondary px-8 pt-6 pb-8 shadow-xl ">
                        <div className="mb-4">
                          <label className="formFieldText text-base"> Email </label>
                          <input name="email" value={formData.email} onChange={handleChange} className="formInputField" id="username" type="text" placeholder="Email" />
                        </div>
                        <div className="mb-6">
                          <label className="formFieldText text-base"> Password </label>
                          <input name="password" value={formData.password} onChange={handleChange} className="formInputField" id="password" type="password" placeholder="******************" />
                        </div>
                        <button type="submit" className=" buttonMainAnimation rounded-md p-2 text-white bg-tertiary hover:bg-tertiaryHover" > Login </button>
                        <div className="text-center text-sm whitespace-pre">
                          {errorMessage ?
                            <div className="bg-red-600 p-2 rounded-md mt-4">
                              <p initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>{errorMessage}</p>
                            </div>
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to="/"> <button className="buttonMainAnimation formButtonBasic w-full"> Back to Homepage </button> </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DashboardLogin;