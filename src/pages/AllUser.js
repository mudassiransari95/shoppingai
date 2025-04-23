import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify';
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';




const AllUser = () => {
const [allUserData,setallUserData]=useState([])
const [openUpdateRole,setopenUpdateRole]=useState(false)
const [updateUserDetails,setupdateUserDetails]=useState({
    name:'',
    email:'',
    role:'',
    _id:''
})
console.log('zall user ddaddadafafgd',allUserData)

const fetchAllUser =async()=>{
    const fetchdata=await fetch(SummaryApi.allUser.url,{
        method:SummaryApi.allUser.method,
        credentials:'include'
    })
    const dataResponse=await fetchdata.json()
    console.log('data response',dataResponse)

    if(dataResponse.success){
        setallUserData(dataResponse.data)
    }
    if(dataResponse.error){
        toast.error(dataResponse.message)
    }
}

useEffect(()=>{
    fetchAllUser()
},[])
  return (
    <div className='bg-white pb-4'>
        <table className='w-full usertable'>
            <thead>
            <tr className='bg-black text-white'>
                
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {
                  allUserData.map((ele,index)=>{
                    return( <tr key={index}>
                    <td>{index+1}</td>
                    <td>{ele?.name}</td>
                    <td>{ele?.email}</td>
                    <td>{ele?.role}</td>
                    <td>{moment(ele?.createdAt).format('LL')}</td>
                    <td>
                        <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-600 hover:text-white' onClick={()=>{
                            setupdateUserDetails(ele)
                            setopenUpdateRole(true)
                        }
                    }>
                        <MdModeEdit/>
                        </button>
                    </td>
                </tr>)
                  })
                }
            </tbody>
        </table>
        {
            openUpdateRole && (

                <ChangeUserRole onClose={()=>
                    setopenUpdateRole(false)}            
                     name={updateUserDetails.name}
                     email={updateUserDetails.email}
                     role={updateUserDetails.role}
                     userid={updateUserDetails._id}
                     callFunc={fetchAllUser}
                    />
            )
        }
    </div>
  )
}

export default AllUser