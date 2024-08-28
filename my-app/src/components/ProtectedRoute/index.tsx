import React from 'react'
import {Navigate, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({children}: any) => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Navigate to="/login" replace/>
  }

  return children
}

export default ProtectedRoute
