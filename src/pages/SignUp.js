import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import loginIcon from '../assest/signin.gif'
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

 

const SignUp = () => {
    const navigate=useNavigate()
  const [showPassword,setshowpassword]=useState(false)
  const [ShowConfirmPassword,setShowConfirmpassword]=useState(false)
  const [data,setdata]=useState({
    email:"",
    password:"",
    name:"",
    confirmPassword:"",
    profilepic:""
  })
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

  
const handleUoloadPic=async(e)=>{
    const file=e.target.files[0]

    const imagePic=await imageTobase64(file)
    console.log('file',imagePic)
    setdata((preve)=>{
        return {
            ...preve,
            profilepic:imagePic
        }
    })

}



  const handleSubmit=async(e)=>{
    e.preventDefault()

    if(data.password===data.confirmPassword){
    
      const dataResponse=await fetch(SummaryApi.signup.url,{
        method:SummaryApi.signup.method,
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })
      let signupdata=await dataResponse.json()
      console.log('data',signupdata)
  
      if(signupdata.success){

        toast.success(signupdata.message)
        navigate('/login')
        
      }
      if(signupdata.error){
        toast.error(signupdata.message)

      }
    }
    else {
      toast.error('please ckeck password and confirm password')
    
    }
   
  }

  
  return (
    <section id='signup'>
    <div className='container mx-auto px-4'>
     
      <div className=' p-2 w-full bg-white py-5 max-w-sm mx-auto rounded'>
        <div className=' w-20 h-20 mx-auto relative rounded-full overflow-hidden'>
    <div>
    <img src={data.profilepic||loginIcon}   alt='image icons'/>

    </div>
   <form>
    <label>
   <div className='text-xs bg-slate-200 pb-5 text-center pt-2 bg-opacity-50 absolute bottom-0'>
        upload photo
    </div>
    <input type='file' hidden onChange={handleUoloadPic}/>
    </label>
   </form>
        </div>
        <form className='pt-5 flex flex-col gap-2' onSubmit={handleSubmit}>
        <div className='grid'>
            <label>Name:</label>
            <div className='bg-slate-100 p-2'>
            <input required onChange={handleOnchange} name='name' value={data.name} type="text" placeholder='enter your name' className='w-full h-full outline-none bg-transparent '/>
            </div>
          </div>
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

  showPassword?(

<FaEyeSlash/>

  ):(

    <FaEye/>

  )

}

              </span>
            </div>
            </div>
          
          </div>
          <div>
            <label>Confirm Password:</label>
            <div className='bg-slate-100 p-2 flex'>

            <input required type={ShowConfirmPassword? 'text':'password'} onChange={handleOnchange} name='confirmPassword' value={data.confirmPassword} placeholder='enter confirm password' className='w-full h-full outline-none bg-transparent'/>
            <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmpassword((preve)=>!preve)}>
              <span>
  {

ShowConfirmPassword?(
 
<FaEyeSlash/>

  ):(

    <FaEye/>

  )

}

              </span>
            </div>
            </div>
          <Link className='block  w-fit ml-auto hover:underline hover:text-red-600 mt-2' to={'/forgot-password' }>forgot password ?</Link>
          </div>
          <button className='bg-red-600 text-white hover:bg-red-700 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>

        </form>
        <p className='my-5'>allready have account ?<Link to={'/login'} className='hover:text-red-600 hover:underline' >login</Link></p>
      </div>
    </div>
   </section>
  )
}

export default SignUp