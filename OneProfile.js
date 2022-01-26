import React, { useState } from 'react'
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';

const OneProfile = () => {
    const {fullname,email,id} = useParams();
    const[rating,setRating]=useState(null);
    const[taskprovider,setTaskProvider]=useState(null);
    
    const submitHandler = e =>{
        axios.get('http://localhost:4040/myprofile',{
            headers:{
                'x-token': localStorage.getItem('token')
            }
        }).then(res=>setTaskProvider(res.data.fullname))
    
        let review={
            taskprovider,
            taskworker:id,
            rating,
        }
        axios.post('http://localhost:4040/addreview',review,{
            headers:{
                'x-token': localStorage.getItem('token')
            }
        }).then(res=>alert(res.data))
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
           
             <section className='container' >
                <Link to="/dashboard" className="btn btn-success mt-2">Back To Profiles</Link>

                <div className='profile-grid my-1' style={{width:"100%"}}>
                    <div className='profile-top bg-primary p-2'>
                    <img className='round-img'
                            src="https://www.gravatar.com/avatar/0000000000000000000000000000000000?d=mp&f=y&s=200"
                            alt="avatar"
                    />
                    <h1 className="large">{fullname}</h1>
                    <p className='lead'>{email}</p>
                    <p>India</p>
                    </div>
                
                <div className='profile-github'>
                    <h2 className='text-primary my-1'>
                        <i className='fab fa-github'></i>Review and Ratings
                    </h2>
                    
                
                    <div className='repo bg-white'>
                        <div>
                            <h4>Enter Your Reviews</h4>
                            <form className='form' autoComplete='off' onSubmit={submitHandler}>
                                <div className='form-group'>
                                    <input
                                      type="text"
                                      placeholder="Enter your rating out of 5"
                                      name="rating"
                                      onChange={e => setRating(e.target.value)}
                                      required/>
                                </div>
                                <input type="submit" className='btn btn-primary' value="Add Rating"/>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </section>
            

        </div>
    )
}

export default OneProfile
