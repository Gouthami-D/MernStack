import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [isLogin,setIsLogin]= useState(false) ;

    useEffect(()=>{

        setIsLogin(localStorage.getItem('token')?true:false)

    },[])
    return (
        <div>
            {/* <nav className="navbar bg-dark">
                <h1>
                    <Link to ="/"><i className='fas fa-code'></i>Developers Hub</Link>
                </h1>
                <ul>
                    <li><Link to ="/register">Register</Link></li>
                    <li><Link to ="/login">Login</Link></li>
                </ul>
            </nav>
            <section className='landing'>
                <div className='dark-overlay'>
                    <h1 className='x-large'>Developers Hub</h1>
                    <p className="lead">Create a developer profile/portfolio,share posts and get help from other developers</p>
                    <div className='buttons'>
                        <Link to ="/register" className='btn btn-primary'>Sign Up </Link>&nbsp;&nbsp;
                        <Link to ="/login" className='btn btn-light'>Login</Link>

                    </div>
                </div>
            </section> */}
            <nav class="navbar navbar-expand-sm bg-light">
                <div className='col-md-11'>
            <h1>
                    <Link to ="/"><i className='fas fa-code'></i>Developers Hub</Link>
                </h1>
                </div>
                {isLogin?
                <ul>
                 <Link to='/login' onClick={()=>localStorage.removeItem('token')} className= 'btn btn-primary m-1 mx-5 ' >Logout</Link>
                 </ul>:
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/register">
                            <button className= 'btn btn-primary'>Register</button>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/login">
                        <button className= 'btn btn-primary'>Login</button>
                        </a>
                    </li>
                   
                </ul>}
            </nav>
            <div>
                <div className='dark-overlay' style={{textAlign:"center"}} >
                    <h1 style={{fontSize:"40px",margin:"2rem",}}>Developers Hub</h1>
                    <h5 style={{color:"GrayText"}}>Create a developer profile/portfolio,share posts and get help from other developers</h5>
                    <div className='buttons' >
                        {/* <Link to ="/register" className='btn btn-primary'>Sign Up </Link>&nbsp;&nbsp;
                        <Link to ="/login" className='btn btn-light'>Login</Link> */}

                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Home
