import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';

const Register = () => {
    let navigate=useNavigate();
    const [data,setData] = useState({
        fullname:'',
        email:'',
        mobile:'',
        skill:'',
        password:'',
        confirmpassword:''
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
        const submitHandler = e =>{
            e.preventDefault();
            axios.post('http://localhost:4040/register',data).then(

                res => {

                    alert(res.data)
    
                    navigate('/login')
    
                },
            )
            e.target.reset();
        }
    

    return (
        <div>
            <nav className='navbar navbar-expand-sm bg-light'>
            <h1>
                <Link to='/'><i className='fas fa-code'></i>Developers Hub</Link>
            </h1>
            {/* <ul>
                <Link to='/register' classNameName='btn btn-primary m-1'>Register</Link>
                 <Link to='/login' className='btn btn-primary m-1'>Login</Link>
             </ul> */}
             <ul className="navbar-nav ml-auto">
                    <li className="nav-item"
                    >
                        <a className="nav-link" href="/register">
                            Register
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login" onClick={()=>localStorage.removeItem('token')}>
                           Login
                        </a>
                    </li>      
                </ul>
        </nav>
        <center>
            <h2 className='text-primary mt-3 mx-3'>Sign Up</h2><br/>
            <form onSubmit={submitHandler} autoComplete='off' action='login.html'>
            <div className="form-group col-md-4">
                    <input type="text" className="form-control" id="name" placeholder="Full Name"name="fullname" onChange={changeHandler} />
                </div>
                <div className="form-group col-md-4">
                    <input type="email" className="form-control" id="inputEmail4" placeholder="Email"name="email" onChange={changeHandler} />
                </div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" id="mobile" placeholder="Mobile"name="mobile" onChange={changeHandler} />
                </div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" id="skills" placeholder="Skill"name="skill" onChange={changeHandler} />
                    <p className='form-text my-7'>Please provide skills by seperation of comma<b>( , )</b></p>
                </div>
                <div className="form-group col-md-4">
                    <input type="password" className="form-control" id="inputPassword4" placeholder="Password" name="password" onChange={changeHandler}/>
                </div>
                <div className="form-group col-md-4">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Confirm Password" name="confirmpassword" onChange={changeHandler}/>
                </div>
                <button type="submit" className="btn btn-primary mx-3">Register</button>
            </form>
            <p className='my-1 mx-3'>Already have an account? <Link to="/login">Sign In</Link>
            </p>
    </center>

        </div>
       
    )
}

export default Register
