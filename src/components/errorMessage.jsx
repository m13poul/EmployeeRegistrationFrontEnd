import React from 'react'
import { useNavigate } from "react-router-dom";

function ErrorMessage() {

  const navigate = useNavigate()
  return (
    <div className=''>
      <div className="text-center my-8 dark:text-white">
        <p>Something went wrong, please try again later.</p><br />
        <p>We hope to solve the problem as soon as possible.</p>
      </div>
      <button className="confirmationCompoButton"
        onClick={() => navigate('/', { replace: true })}
      >Go back to homepage</button>
    </div>
  )
}

export default ErrorMessage