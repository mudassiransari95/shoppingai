import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
const Login = () => {

  const navigate=useNavigate()
  const {fetchUserDetails, fetchUserAddToCart}=useContext(Context)
  
  const [showPassword,setshowpassword]=useState(false)
  const [data,setdata]=useState({
    email:"",
    password:""
  })
  console.log(data)
  const handleOnchange=(e)=>{
const {name,value}=e.target
console.log(value)

setdata((preve)=>{
  // console.log(preve)
  return {
    ...preve,
    
    [name]:value
  }
})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()

    const SignIndata=await fetch(SummaryApi.signIn.ulr,{
      method:SummaryApi.signIn.method,
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })

    const dataApi=await SignIndata.json()
    console.log('data  ghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',dataApi)
     if(dataApi.success){
    toast.success(dataApi.message)
    navigate('/')
    fetchUserDetails()
    fetchUserAddToCart()

     }
     if(dataApi.error){
      toast.error(dataApi.message)
    }
  }
  console.log("data login",data)
  return (
   <section id='login'>
    <div className='container mx-auto px-4'>
     
      <div className=' p-2 w-full bg-white py-5 max-w-sm mx-auto rounded'>
        <div className=' w-20 h-20 mx-auto '>

          <img src={loginIcon}   alt='image icons'/> 
        </div>
        <form className='pt-5' onSubmit={handleSubmit}>
          <div className='grid'>
            <label>Email:</label>
            <div className='bg-slate-100 p-2'>
            <input required onChange={handleOnchange} name='email' value={data.email} type="email" placeholder='enter email' className='w-full h-full outline-none bg-transparent '/>
            </div>
          </div>
          <div>
            <label>Password:</label>
            <div className='bg-slate-100 p-2 flex'>

            <input required type={showPassword? 'text':'password'} onChange={handleOnchange} name='password' value={data.password} placeholder='enter password' className='w-full h-full outline-none bg-transparent'/>
            <div className='cursor-pointer text-xl' onClick={()=>setshowpassword((preve)=>!preve)}>
              <span>
  {
  
  showPassword     ?  (

<FaEyeSlash/>

  ):(

    <FaEye/>

  )

}

              </span>
            </div>
            </div>
          <Link className='block  w-fit ml-auto hover:underline hover:text-red-600 mt-2' to={'/forgot-password' }>forgot password</Link>
          </div>
          <button className='bg-red-600 text-white hover:bg-red-700 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>login</button>

        </form>
        <p className='my-5'>Don't have account ?<Link to={'/sign-up'} className='hover:text-red-600 hover:underline' >Sign up</Link></p>
      </div>
    </div>
   </section>
  )
}

export default Login