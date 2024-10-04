import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
  let token = window.localStorage.getItem('token')
  // console.log(token)
    if(token!=null) return children
    else return <Navigate to="/login"/>
  return (
    <div></div>
  )
}

export default PrivateRoute