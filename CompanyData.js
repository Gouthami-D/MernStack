import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CompanyData = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({
        companyname: '',
        streetaddress: '',
        city: '',
        state: '',
        zipcode: '',
        website: '',
        phone: '',
        sectorofexpertise: '',
        companysummary: '',
        linkedin: '',
        facebook: '',
        branch: '',
        accountmanager: '',
        recruiter: '',
        competitor: ''
    })
    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    // const submitHandler = e =>{
    //     e.preventDefault();
    //     // console.log(data)
    //     axios.post('http://localhost:4040/addcompany',data).then(
    //         res=>setData(res.data))
    //         alert('data added')
    //         navigate('/dashboard')

    //     e.target.reset();
    // }

    const getEditparameters = () => {
        axios.get(`http://localhost:4040/getcompany/${id}`).then(
            res => {
                const { data } = res;
                if (data) {

                    setData(data)
                }
            },
            err => {
            })
    }

    useEffect(() => {

        if (id) {
            getEditparameters()
        }
    }, [])

    const submitHandler = e => {
        e.preventDefault();
        console.log(data);
        if (id) {
            axios.put(`http://localhost:4040/editcompany/${id}`, data).then(
                res => setData(res.data))
            {
                alert("Data Updated Successfully")
                navigate('/dashboard')
            }
        }
        else {
            axios.post('http://localhost:4040/addcompany', data).then(
                res =>  setData(res.data))
                {
                   
                    alert("Data addedd successfully")
                    navigate('/dashboard')
                }
            
            e.target.reset();
        }
    }

    const handleClick = () => {
        navigate('/dashboard')
    }

    return (
        <div>
            <center>
                <h3 className='mt-2'>Add Company</h3>
                <p>Please fill the following details</p>
            </center>
            <form className='px-5 mt-2' onSubmit={submitHandler}>
                <div className="row my-2">
                    <div className="col-md-6">
                        <label className="form-label">Company Name</label>
                        <input type="text" className="form-control" value={data.companyname} id="companyname" name="companyname" onChange={changeHandler} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <label className="form-label">Street Address</label>
                        <input type="text" className="form-control" value={data.streetaddress} id="streetaddress" name="streetaddress" onChange={changeHandler} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">City</label>
                        <div>
                            <select className="form-control" value={data.city} id="city" name="city" onChange={changeHandler}>
                                <option selected>Open this select menu</option>
                                <option >Hyd</option>
                                <option >Nzb</option>
                                <option >Tamilnadu</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">State</label>
                        <div>
                            <select className="form-control" value={data.state} id="state" name="state" onChange={changeHandler}>
                                <option selected>Open this select menu</option>
                                <option >Tg</option>
                                <option >sjd</option>
                                <option >jdajk</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Zip Code</label>
                        <input type="number" className="form-control" value={data.zipcode} id="zipcode" name="zipcode" onChange={changeHandler} />
                    </div>
                </div>
                <div className="row ">
                    <div className="col-md-4 ">
                        <label className="form-label">Website</label>
                        <input type="text" className="form-control" value={data.website} id="website" name="website" onChange={changeHandler} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Phone</label>
                        <input type="number" className="form-control" value={data.phone} id="phone" name="phone" onChange={changeHandler} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Sector Of Expertise</label>
                        <div>
                            <select className="form-control" value={data.sectorofexpertise} id="sectorofexpertise" name="sectorofexpertise" onChange={changeHandler}>
                                <option selected>Open this select menu</option>
                                <option >One</option>
                                <option >Two</option>
                                <option >Three</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <label className="form-label">Company Summary</label>
                        <input type="text" className="form-control" value={data.companysummary} id="companysummary" name="companysummary" onChange={changeHandler} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">LinkedIn Profile</label>
                        <input type="text" className="form-control" value={data.linkedin} id="linkedin" name="linkedin" onChange={changeHandler} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Facebook Profile</label>
                        <input type="text" className="form-control" value={data.facebook} id="facebook" name="facebook" onChange={changeHandler} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label">Branch</label>
                        <div>
                            <select className="form-control" value={data.branch} id="branch" name="branch" onChange={changeHandler}>
                                <option selected>Open this select menu</option>
                                <option >One</option>
                                <option >Two</option>
                                <option >Three</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Account Manager</label>
                        <div>
                            <select className="form-control" value={data.accountmanager} id="accountmanager" name="accountmanager" onChange={changeHandler}>
                                <option selected>Open this select menu</option>
                                <option >One</option>
                                <option >Two</option>
                                <option >Three</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label for="inputEmail4" className="form-label">Recruiter</label>
                        <div>
                            <select className="form-control" value={data.recruiter} id="recruiter" name="recruiter" onChange={changeHandler}>
                                <option selected>Open this select menu</option>
                                <option >One</option>
                                <option >Two</option>
                                <option >Three</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label for="inputEmail4" className="form-label">Staffing Agency Competitor</label>
                        <div>
                            <select className="form-control" value={data.competitor} id="competitor" name="competitor" onChange={changeHandler}>
                                <option selected>Open this select menu</option>
                                <option >One</option>
                                <option >Two</option>
                                <option >Three</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr />
                <p align="right">
                <button type="submit" className="btn btn-success " onClick={handleClick}>Cancel</button>&nbsp;
                
                {id ? <button type="submit" className="btn btn-primary" >

                    Update

                </button> :

                    <button type="submit" className="btn btn-primary" >

                        Save

                    </button>}
                    </p>


            </form>

        </div>
    )
}

export default CompanyData;
