import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [loading,setloading]=useState(false)
const [cotegoryProduct,setcotegoryProduct]=useState([])

const CategoryLoadung=new Array(13).fill(null)

const fetchcategoryProduct=async()=>{
    setloading(true)
    const response=await fetch(SummaryApi.categoryproduct.url)
    const dataResponse =await response.json() 
    setloading(false)
    setcotegoryProduct(dataResponse.data)
    console.log('coategory List',dataResponse.data)
}
useEffect(()=>{
    fetchcategoryProduct()
},[])

  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {

          loading ? (

            CategoryLoadung.map((ele,index)=>{
              return(
                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={'categoryloading'+index}>

                </div>
              )
            })
           
          ):(
            cotegoryProduct.map((product,index)=>{
              return(
                  <Link to={'/product-category/'+product?.category} className='cursor-pointer' key={product?.category}>
                      <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex justify-center items-center'>
                          <img src={product?.productImage[0]} alt={product?.category}  className='hover:scale-125 transition-all  h-full mix-blend-multiply object-scale-down'/>
                      </div>
                      <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                  </Link>
              )
            }) 
          )
          
        }
        </div>
    </div>
  )
}

export default CategoryList