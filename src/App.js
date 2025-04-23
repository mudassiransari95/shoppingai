import React, { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common'
import Context from './context'
import { setUserDetails } from './store/userSlice'
import {useDispatch}  from  'react-redux'


const App = () => {
const dispatch=useDispatch()                               

const [cartProductCount,setCartProductCount] = useState(0)
  // usr details
const fetchUserDetails=async()=>{
  const dataResponse=await fetch(SummaryApi.current_user.url,{  
    method:SummaryApi.current_user.method,
    credentials:'include',
    headers:{
      'Content-Type':'application/json'
    } 
  }) 
  const dataApi=await dataResponse.json()
  console.log('hellllllllllllllllllooooooooooo',dataApi)

if(dataApi.success){
  dispatch(setUserDetails(dataApi.data))
}
  
}
const fetchUserAddToCart = async()=>{
  const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
    method : SummaryApi.addToCartProductCount.method,
    credentials : 'include'
  })

  const dataApi = await dataResponse.json()

  setCartProductCount(dataApi?.data?.count)
  console.log(dataApi?.data)
}
  useEffect(()=>{
    fetchUserDetails()
    fetchUserAddToCart()
  },[])
  return ( 
    <>
    <Context.Provider value={{
      fetchUserDetails,
      cartProductCount ,
      fetchUserAddToCart
    }}>

    <ToastContainer position='top-center'/> 
    <Header/>
    {/* <Home/> */}
    <main className='min-h-[calc(100vh-120px)]  pt-16'>

    <Outlet/>
    </main>
    <Footer/>
    
    </Context.Provider>
    </>
  )
}

export default App