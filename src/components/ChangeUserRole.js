import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoIosClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userid,
    onClose,
    callFunc,
}) => {
    const [userRole,setuserRole]=useState(role)
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',userRole)

const handleOnChangeSelect=(e)=>{
    setuserRole(e.target.value)

}
const updateUserRole=async()=>{
    const dataResponse =await fetch(SummaryApi.updateUser.url,{
        method:SummaryApi.updateUser.method  ,
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            userid:userid,
            role:userRole
        })
    })
    const data=await dataResponse.json()
    if(data.success){
        toast.success(data.message)
        onClose()
        callFunc()
    }
    console.log('user updated rolr dtattt',data)
}

  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 h-full  w-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
        <div className=' mx-auto bg-white shadow-md p-4  w-full max-w-sm'>
            <button className='block ml-auto ' onClick={onClose}>
            <IoIosClose />
            </button>
            <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
            <p>Name:{name}</p>
            <p>Email:{email}</p>
           <div className='flex justify-between items-center my-4'>
           <p>Role:</p>
            <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                {
                    Object.values(ROLE).map(ele=>{
                        return(
                            <option value={ele} key={ele}>{ele}</option>
                        )
                    })

                }
            </select>
           </div>
           <button className='w-fit mx-auto block border py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
            </div>

    </div>
  )
}

export default ChangeUserRole