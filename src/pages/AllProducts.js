import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'


const AllProducts = () => {
  const [openUploadProduct,setopenUploadProduct]=useState(false)
  const [AllProduct,setAllProduct]=useState([])

  const fetchAllProduct=async()=>{
    const response=await fetch(SummaryApi.allProduct.url)
    const dataResponse=await response.json()

    // console.log('dataaaaaa',dataResponse)

  setAllProduct(dataResponse?.data || [])
  }
  useEffect(()=>{
  fetchAllProduct()
  },[])
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>

      <h1 className='font-bold text-lg'>AllProducts</h1>
      <button className='border-2 border-red-600 text-red-600 transition-all py-1 px-3 rounded-full hover:bg-red-600 hover:text-white' onClick={()=>setopenUploadProduct(true)}>Upload Product</button>

      </div>
    {/* all product  */}
    <div className='flex items-center flex-wrap h-[calc(100vh-190px)] overflow-y-scroll gap-5 py-4'>
  {
  AllProduct.map((product,index)=>{
  return(
    <AdminProductCard data={product} key={index+'allProduct'} fetchAlldata={fetchAllProduct} />
  

  )
  })
  }
    </div>


      {/* upload  products component */}
      {
        openUploadProduct && (

          <UploadProduct onClose={()=>setopenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }
      </div>
  )
}

export default AllProducts