import React,{useEffect,useState} from 'react'
import {Link,Navigate} from 'react-router-dom'
import axios from 'axios'
import './App.css'

const MyProfile = () => {
    const[data,setData]=useState(null);
    const[review,setReview]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:4040/myprofile',{
            headers:{
                'x-token' : localStorage.getItem('token')
            }
        }).then(res=>setData(res.data))
    
    axios.get('http://localhost:4040/myreview',{
            headers:{
                'x-token' : localStorage.getItem('token')
            }
        }).then(res=>setReview(res.data))
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
                            My Profile
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login" onClick={()=>localStorage.removeItem('token')}>
                            Logout
                        </a>
                    </li>      
                </ul>
            </nav> 
            {data &&
             <section className='container' >
                <Link to="/dashboard" className="btn btn-success mt-2">Back To Profiles</Link>

                <div className='profile-grid my-1' style={{width:"60%"}}>
                    <div className='profile-top bg-info p-2'>
                    <img className='round-img'
                            src="https://www.gravatar.com/avatar/0000000000000000000000000000000000?d=mp&f=y&s=200"
                            alt="avatar"
                    />
                    <h1 className="large">{data.fullname}</h1>
                    <p className='lead'>{data.email}</p>
                    <p>India</p>
                    </div>
                
                <div className='profile-github'>
                    <h2 className='text-primary my-1'>
                        <i className='fab fa-github'></i>Review and Ratings
                    </h2>
                    <div className='repo bg-white py-1 my-1'>
                        {review ?
                        review.map(review =>
                        <div>
                            <h4><Link to="#">{review.taskprovider}</Link></h4>
                            <p>
                            {review.rating}/5
                            </p>
                        </div>)
                        : <p>No Review Added yet</p>
                        }

                    </div>
                    <div className='repo bg-white p-1 my-1'>
                        <div>
                            <h4>Enter Your Reviews</h4>
                            <form className='form' autoComplete='off'>
                                <div className='form-group'>
                                    <input
                                      type="text"
                                      placeholder="Enter your rating out of 5"
                                      name="rating"
                                      required/>
                                </div>
                                <input type="submit" className='btn btn-primary' value="Add Rating"/>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </section>
            }
        </div>
    )
}

export default MyProfile
