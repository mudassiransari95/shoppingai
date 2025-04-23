import React, { useEffect } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ROLE from '../common/role'

const AdminPanel = () => {
    const user=useSelector(state=>state?.user?.user)

    

const navigate=useNavigate()
useEffect(()=>{
if(user?.role !==ROLE.ADMIN){
  navigate('/')
}
},[user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-60  costomshadow'>
            <div className='h-32 flex items-center justify-center flex-col'>
            <div className='text-3xl overflow-hidden cursor-pointer flex justify-center '>
  {
    user?.profilepic ? (
      <img src={user?.profilepic} alt='image' className='w-20 h- rounded-full'/>
    ):(
      <FaRegCircleUser />
    )
  }

</div>
<p className='capitalize font-semibold text-lg'>{user?.name}</p>
<p className='text-sm font-semibold '>{user?.role}</p>
            </div>
            {/* navigation */}
            <div>
<nav className='grid p-4'>
    <Link to={'all-user'}className='px-2 py-2 hover:bg-slate-100'>All User</Link>
    <Link to={'all-product'}className='px-2 py-2 hover:bg-slate-100'> products </Link>
</nav>
            </div>
        </aside>
        <main className='w-full h-full p-2'>

                <Outlet/>
        </main>
        
    </div>
  )
}

export default AdminPanel