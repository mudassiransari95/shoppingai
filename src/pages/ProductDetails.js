import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from './../helpers/displayCurrency';
// import VerticalCardProduct from '../components/VerticalCardProduct';
import CategroyWiseProductDisplay from './../components/CategoryWiseProductDisplay';


const ProductDetails = () => {
  const [data,setdata]=useState({
    productName:'',
    brandName:'',
    category:'',
    productImage:[],
    description:'',
    price:'',
    sellingPrice:''
  })

  const params=useParams()

const [loading,setloading]=useState(false)
const productImageListloading=new Array(4).fill(null)
const [ActiveImage,setActiveImage]=useState('')
  // console.log('product id',params)
  const fetchProductDetails=async()=>{
    setloading(true)
    const response=await fetch(SummaryApi.productdetail.url,{
      method:SummaryApi.productdetail.method,
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        productId:params?.id
      })
    })
    setloading(false)
    const dataResponse=await response.json()
    // console.log(dataResponse)
    setdata(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])

  }
  const handleMouseEnterProduct=(imgURL)=>{
    setActiveImage(imgURL)
  }



  useEffect(()=>{
    fetchProductDetails()
  },[params])
  
  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* product image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
      <img src={ActiveImage} className='h-full w-full object-scale-down mix-blend-multiply'/>
          </div>
        <div className='h-full'>
          {
            loading ? (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {
                productImageListloading.map((el)=>{
                  return(
                    <div className='h-20 w-20 bg-slate-200 rounded animate-pulse'></div>
                  )
                })
                }

              </div>
            ):(
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {
                data.productImage.map((imgURL,index)=>{
                  return(
                    <div className='h-20 w-20 bg-slate-200 rounded' key={imgURL}>
                      <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply' onMouseEnter={()=>handleMouseEnterProduct(imgURL)} onClick={()=>handleMouseEnterProduct(imgURL)}/>
                    </div>
                  )
                })
                }

              </div>
            )
          }

        </div>
        </div>
       {/* product details  */}

          {
            loading ? (
              <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
              <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
              <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

              <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>
  
              </div>

              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                <p className='text-red-600 bg-slate-200 w-full'></p>
                <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
              </div>

              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
              </div>

              <div className='w-full'>
                <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
              </div>
            </div>
            ):(
              <div className='flex flex-col gap-1'>
              <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                       <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                       <p className='capitalize text-slate-400'>{data?.category}</p>
                       <div className='text-red-600 flex items-center gap-1'>
                           <FaStar/>
                           <FaStar/>
                           <FaStar/>
                           <FaStar/>
                           <FaStarHalf/>
                       </div>
                       <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                         <p className='text-red-600'>{displayINRCurrency(data.sellingPrice)}</p>
                         <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
                       </div>
                       <div className='flex items-center gap-3 my-2'>
                         <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>Buy</button>
                         <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white' >Add To Cart</button>
                       </div>
                       <div>
                         <p className='text-slate-600 font-medium my-1'>Description : </p>
                         <p>{data?.description}</p>
                       </div>
              </div>
            )
          }

      </div>
      {
        data.category && (
          <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>
        )
      }
    </div>
  )
}

export default ProductDetails