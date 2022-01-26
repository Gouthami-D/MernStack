import React,{useEffect,useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import axios from 'axios'
import CompanyData from './CompanyData'
import CompanyTable from './CompanyTable'

const Dashboard = () => {
    const[data,setData]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:4040/allprofiles',{
            headers:{
                'x-token' : localStorage.getItem('token')
            }
        }).then(res=>setData(res.data))
    },[])
    if(!localStorage.getItem('token')){
        return <Navigate to='/login'/>
    }
    return (
        <div>
        <nav className="navbar navbar-expand-sm bg-light">
            <h1>
                    <Link to ="/"><i className='fas fa-code'></i>Developers Hub</Link>
                </h1>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/myprofile">
                        <button className= 'btn btn-primary'>My Profile</button>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login" onClick={()=>localStorage.removeItem('token')}>
                        <button className= 'btn btn-primary'>Logout</button>
                        </a>
                    </li>
                   
                </ul>
            </nav>  
            {/* <section className="container" > */}
                 {/* <CompanyData/>  */}
                 <CompanyTable/>
                <center>
                    <h1 className='large text-primary'>Developers</h1><br/>
                    </center>
                    <h5>
                        <i className='fab fa-connectdevelop'></i> Browse and Connect with developers
                    </h5>
                    <div className='profiles'>
                        {data.length>=1 ? 
                        data.map(profile =>
                        <div className='profile bg-light border border-primary mt-2' style={{textAlign:"center"}}>
                            <img className='round-img mt-2'
                            src="https://www.gravatar.com/avatar/0000000000000000000000000000000000?d=mp&f=y&s=200"
                            alt="avatar"
                            />
                            <div style={{textAlign:"center"}}>
                                <h2>{profile.fullname}</h2>
                                <p>{profile.email}</p>
                                <p>India</p>
                                <Link to={`/oneprofile/${profile.fullname}/${profile.email}/${profile.skill}/${profile._id}/`} className='btn btn-primary'>View Profile</Link>
                            </div>
                            <ul style={{textAlign:"center"}}>
                                {profile.skill.split(",").map(skill =>
                                <li className='text-primary'>
                                    <i className='fas fa-check mb-2'></i>{skill}
                                </li>
                                )}
                                
                            </ul>
                        </div>
                        )
                        :null}
                    </div>
                    
                {/* </section> */}
        </div>
    )
}

export default Dashboard
