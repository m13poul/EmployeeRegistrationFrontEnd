import React from "react";
import { useState } from "react";
import { createNewEmployee } from "../features/registrationSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../dataUtils";
import { Link } from "react-router-dom";
import { MdForward } from "react-icons/md";
import { handleStatusCode } from "../features/registrationSlice";


// This is the initial state for our form. We declare it outside the component in order to avoid calling in many times.
const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  Gender: "",
  // isCorrect: true,
};

function Form() {
  // This out local state. In here we temporarily save the user data before we send them to the server. We could also do this using a class component. However, functional components are more convinient and the whole react community has moved towards functional components. It's a matter of taste I guess.
  const [formData, setFormData] = useState(INITIAL_STATE);

  // This hook returns a reference to the dispatch function from the store. We will need latern in order to dispatch actions as needed.
  const dispatch = useDispatch();
  // This hook returns a function which we will need later on, to navigate programmatically
  const navigate = useNavigate();

  // Handle Change
  // In order to handle all changes in the different form fields without writing separate similar functions - bad pattern - .Instead we can dynamically assign the correct key-value pairs to the local state, by capturing both the "name" and the "value"
  // This state should be managed locally until the form has been submitted due to seperation of concerns.
  // Like in Redux, in order to correctly apply immutable updates, we return the whole state, and just overwrite the desired fields. Otherwise, react will not be able to correctly re-render the component, and then all hell breaks loose.
  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    if (name == "firstName" || name == "lastName") {
      // We want the first and last name to start with capital letter. Don't think there is built in method or function in JS, therefore we use a custom one.
      setFormData({ ...formData, [name]: capitalizeFirstLetter(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // HandleFormSubmittion
  // This function sends the data the backend, when the user clicks the "Submit" button. It also resets the form fields. It makes a POST request with the appropriate content-type - we need to set this, in order to use the data in the backend. Otherwise Node will not be able to decide what to do with the data.
  const handleFormSubmission = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_BACKEND_HOST}`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      dispatch(handleStatusCode(res.status))
    });


    // Using the useDispatch hook, we assign a new state to the store, because we will need to read this state, once the confirmation page has been rendered. Could be done using local state and passing props. Pontentially though, we might also need to read from the state, in different component, as the app grows bigger. It's essentially a matter of scalability in the long term.
    dispatch(createNewEmployee(formData));
    // We reset the form state for a better user experience.
    setFormData(INITIAL_STATE);
    // Finally we redirect to the confirmation page
    navigate("/confirmation");
  };
  return (

    <div>
      <h2 className="formTitle">
        Employee Registration Form
      </h2>
      {/* {formData.isCorrect ? null : <p>Please complete all the fields</p>} */}
      <div className="mt-8">
        <form onSubmit={handleFormSubmission}>
          <div className="formGrid">
            <label className="block">
              <div className="formNameGrid">
                <span className="formFieldText">First Name</span>
                <span className="formFieldText">Last Name</span>
              </div>
              <div className="formNameGrid">
                <input type="text" className="formInputField" value={formData.firstName} onChange={handleChange} name="firstName" required />
                <input type="text" className="formInputField" value={formData.lastName} onChange={handleChange} name="lastName" required />
              </div>
            </label>
            <label className="block">
              <span className="formFieldText">Email address</span>
              <input type="email" className="formInputField" placeholder="JohnDoe@example.com" value={formData.email} onChange={handleChange} name="email" required />
            </label>
            <label className="block">
              <span className="formFieldText">Gender</span>
              <select value={formData.Gender} onChange={handleChange} name="Gender" className="formSelectField" required>
                <option></option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to disclose</option>
              </select>
            </label>
            <button type="submit" className="mt-6 formButtonBasic buttonMainAnimation"> Submit </button>
            <div className="text-center">OR</div>
            <Link to="/administration">
              <button className="group flex w-full items-center justify-center gap-x-4 formButtonBasic buttonMainAnimation">
                <p>Go to administration portal</p>
                <MdForward className=" duration-500 group-hover:translate-x-6" />
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>


  );
}

export default Form;