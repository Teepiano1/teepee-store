import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
   return <Navigate to={"/"} replace={true} />
  } else {
    return children
  }
}

export default ProtectedRoutes