import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import UsersPage from './pages/UsersPage/UsersPage'
import UserProfilePage from './pages/UserProfilePage/UserProfilePage'

function App() {

  return (
    <>
      

      <Routes>
        
          <Route path="/" element={<Navigate to={"/users"} />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path='/users/:id' element={<UserProfilePage />} />
          
      </Routes>



      {/* <RegisterPage></RegisterPage> */}

      {/* <UsersList></UsersList> */}

      {/* <UsersPage></UsersPage> */}
    </>
  )
}

export default App
