import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Table } from 'reactstrap';

const CompanyTable = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{

    getList()

},[])

const getList  =()=>{

    axios.get('http://localhost:4040/getcompany',

    ).then(res=>setData(res.data))

}

const deleteHandler =id =>{

 axios.delete(`http://localhost:4040/deletecompany/${id}`).then(

      arr => {

        getList();

      alert("Data has been Deleted Successfully")

      },
 )

  }

  // useEffect(() => {
  //   axios.get('http://localhost:4040/getcompany',

  //   ).then(res => setData(res.data))
  // }, [])

  // const deleteHandler = id => {
  //   axios.delete(`http://localhost:4040/deletecompany/${id}`).then(
  //     arr => setData(arr.data),
  //     alert("Data Deleted")
  //   )
  // }


  return (
    <div className='w-100'>
      <center>
        <Link to="/addcompany" className="btn btn-success mt-2">Add Company</Link>
      </center>
      <div className="table-responsive mt-2  w-100">
          <Table bordered >
          <thead>
            <tr>
              <th >Company Name</th>
              <th  >Street Address</th>
              <th  >City</th>
              <th  >State</th>
              <th  >Zip Code</th>
              <th  >Website</th>
              <th  >Phone</th>
              <th  >Sector Of Expertise</th>
              <th  >Company Summary</th>
              <th  >LinkedIn Profile</th>
              <th  >Facebook Profile</th>
              <th  >Branch</th>
              <th  >Account Manager</th>
              <th  >Recruiter</th>
              <th  >Staffing Agency Competitor</th>
              <th></th>

            </tr>
          </thead>
          <tbody>
            {data.length >= 1 ?
              data.map(item =>               
                  <tr>
                    <td>{item.companyname}</td>
                    <td>{item.streetaddress}</td>
                    <td>{item.city}</td>
                    <td>{item.state}</td>
                    <td>{item.zipcode}</td>
                    <td>{item.website}</td>
                    <td>{item.phone}</td>
                    <td>{item.sectorofexpertise}</td>
                    <td>{item.companysummary}</td>
                    <td>{item.linkedin}</td>
                    <td>{item.facebook}</td>
                    <td>{item.branch}</td>
                    <td>{item.accountmanager}</td>
                    <td>{item.recruiter}</td>
                    <td>{item.competitor}</td>
                    <td >  
                                    
                      {/* <button type="button" class="btn btn-warning" >Edit</button>
                      <input type="submit" className="btn btn-dark" onClick={() => deleteHandler(item._id)} value="Delete" />
                       */}
                       {/* <Link to={`/editcontact/${item._id}`}>
                      <button className='btn btn-success'>Edit</button>
                      </Link>
                    <button className='btn btn-danger' onClick={() => deleteHandler(item._id)} >Delete</button> */}
                    <p key={item._id} align="right">
                    <Link to={`/editcompany/${item._id}`}>

<button className='btn btn-success ml-3'>Edit</button>

</Link>

<button className='btn btn-danger'onClick={()=>deleteHandler(item._id)} >Delete</button></p>




                    </td>

                  </tr>
                
              )
              : null
              }
          </tbody>
          </Table>
      </div>
    </div>
  );
}

export default CompanyTable;
