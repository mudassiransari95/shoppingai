import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
const Header = () => {
  const context=useContext(Context)
  console.log(context,"hello")
  const navigate=useNavigate()
  const user=useSelector(state=>state?.user?.user)
  // console.log(user)
  console.log('user details selecter ',user)
  const dispatch=useDispatch()

  const [menuDisplay,setmenuDisplay]=useState(false)

  const handleLogout=async()=>{
    const fetchdata=await fetch(SummaryApi.logout_user.url,{
      method:SummaryApi.logout_user.method,
      credentials:'include'
    })
    const data =await fetchdata.json()
    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate('/')
     
    }
    if(data.error){
      toast.error(data.message)
    }
  }

  const handleSearch=(e)=>{
    const {value}=e.target
    if(value){
  navigate(`/search?q=${value}`)
    }else {
      navigate('/search')
    }
  }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full  z-40'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
          <div className=''>
<Link to="/"> 
 <Logo w={90} h={60} />
 </Link>
      
          </div>
<div className='hidden lg:flex items-center w-full justify-between max-w-sm  border rounded-full focus-within:shadow '>
  <input onChange={handleSearch} type="text" placeholder='search product here' className='w-full outline-none pl-2 ' />
  <div className='text-lg min-w-[50px] h-10 bg-red-600 flex items-center justify-center  rounded-r-full text-white '>
  <GrSearch/>
  </div>
</div>
<div className='flex items-center gap-6'>
<div className='relative flex justify-center'>
{
  user?._id && (
    <div className='text-4xl overflow-hidden cursor-pointer ' onClick={()=>setmenuDisplay((preve)=>!preve)}>
  {
    user?.profilepic ? (
      <img src={user?.profilepic} alt='image' className='w-20 h-20 rounded-full'/>
    ):(
      <FaRegCircleUser />
    )
  }

</div>
  )
}
{
  menuDisplay && (
<div className='absolute bg-white bottom-0  top-11 h-fit p-4 shadow-lg rounded '>
  <div>
    {
      user?.role===ROLE.ADMIN && (
        <Link to={'/admin-panel/all-product'} className='whitespace-nowrap  hover:bg-slate-100 p-2 hidden md:block ' onClick={()=>setmenuDisplay((preve)=>!preve)}>Admin Panel</Link>

      )
    }
  </div>
</div>
)
}

</div>

{
  user?._id && (
    <Link to={'/Cart'} className='text-2xl relative'>
<span><FaShoppingCart/></span>
    <div className='bg-red-600 text-white w-5 p-1  flex items-center justify-center rounded-full absolute -top-3 -right-3'>
<p className='text-xs'>{context?.cartProductCount}</p>
</div>
</Link>
  )
}




<div>
  {
    user?._id ?(
      <buttotn onClick={handleLogout}  className='px-3 py-1 rounded-full bg-red-600 hover:bg-red-700'>Logout</buttotn>
    ):(
      <Link to={"/login"} className='px-3 py-1 rounded-full bg-red-600 hover:bg-red-700'>Login</Link>
    )
  }
  
</div>
</div>
        </div>
    </header>
  )
}

export default Header