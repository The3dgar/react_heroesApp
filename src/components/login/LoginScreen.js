import React from 'react'

export const LoginScreen = ({history}) => {
  const handleClick = () => {
    history.replace("/")
  }

  return (
    <div className="container mt-5">
      <h2>LoginScreen</h2>
      <hr/>
      <button 
        className="btn btn-primary"
        onClick={handleClick}
      >
        Login
      </button>

    </div>
  )
}
