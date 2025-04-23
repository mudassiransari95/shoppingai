import React, { useEffect, useState } from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import scrollTop from '../helpers/scrollTop'
import { FaArrowUp } from "react-icons/fa";
const Home = () => {
  const [Visible,setVisible]=useState(false)
  const scroll=window.scrollY
  console.log('scroll',scroll)
  useEffect(()=>{
    const top=()=>{
   if(window.scrollY>200){
    setVisible(true)
   }else{
    setVisible(false)
   }
    }
    window.addEventListener('scroll',top)
    return () => window.removeEventListener('scroll', top);
  },[])
 
  return (
    <div className='relative'>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={'airpodes'}  heading={"Top's Airpods"}/>
      <HorizontalCardProduct category={'watches'} heading={"Top's Wathes"}/>
      <VerticalCardProduct category={'mobiles'} heading={"Mobiles"}/>
      <VerticalCardProduct category={'Mouse'} heading={"Mouse"}/>
      <VerticalCardProduct category={'televisions'} heading={"Telivision"}/>
      <VerticalCardProduct category={'camera'} heading={"Camera & Photography"}/>
      <VerticalCardProduct category={'earphones'} heading={"Wire Earphone"}/>
      <VerticalCardProduct category={'speakers'} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category={'refrigerator'} heading={"Rafrigerator"}/>
      <VerticalCardProduct category={'trimmers'} heading={"Trimmers"}/>
 { Visible &&    <p className='fixed right-6 bottom-6 bg-white text-black px-3 py-2 rounded-full cursor-pointer shadow-md  transition-all' 
  onClick={scrollTop}><FaArrowUp/></p>}

    </div>
  )
}

export default Home