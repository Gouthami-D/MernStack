import React from 'react'
import {BrowserRouter,Routes,Route,Link,useParams} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import MyProfile from './MyProfile';
import OneProfile from './OneProfile';
import CompanyData from './CompanyData';


const App = () => {
  const {id} = useParams();
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login/>} />
         <Route path="/register" element={<Register />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/myprofile" element={<MyProfile />} />
         <Route path="/oneprofile/:fullname/:email/:skill/:id" element={<OneProfile />} />
         <Route path="/editcompany/:id" element={<CompanyData />} />
         <Route path="/addcompany" element={<CompanyData />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
