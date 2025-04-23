import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({
  onClose,
  fetchData
}) => {
  const [data,setdata]=useState({
    productName:'',
    brandName:'',
    category:'',
    productImage:[],
    description:'',
    price:'',
    sellingPrice:''
  })
  const [openfullScreenImage,setopenfullScreenImage]=useState(false)
const [fullScreenImage,setfullScreenImage]=useState('')
  const handleOnChange=(e)=>{
    const {name , value }=e.target
    setdata((preve)=>{
      return{
        ...preve,
        [name]:value
      }
    })
  }

  const handleUploadProduct=async(e)=>{
    const file=e.target.files[0]
    const uploadImageCloudinary=await uploadImage(file)
    setdata((preve)=>{
      return{
        ...preve,
        productImage:[...preve.productImage,uploadImageCloudinary.url]
      }
    })
  }
const handleDeleteProductImage=async(index)=>{
  console.log('indexxx',index)
  const newProductImage=[...data.productImage]
  newProductImage.splice(index,1)
  setdata((preve)=>{
    return{
      ...preve,
      productImage:[...newProductImage]
    }
  })
}

// upload product   

const handleSubmit =async(e)=>{
  e.preventDefault()
  
  const response=await fetch(SummaryApi.uploadproduct.url,{
    method:SummaryApi.uploadproduct.method,
    credentials:'include',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })
  const responsedata=await response.json()
  if(responsedata.success){
    toast.success(responsedata.message)
    onClose()
    fetchData()
  }
  if(responsedata.error){
    toast.error(responsedata.message)
  }
}
  return (
    <div  className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
            <div className='flex justify-between items-center pb-3'>

                <h2 className='font-bold text-lg'>   UploadProduct</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <IoMdClose />
                </div>
            </div>
            <form className='grid p-4 gap-3 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
              <label htmlFor='productName'>Product Name</label>
              <input type='text'
               id='productName'
               name='productName'
                placeholder='enter product name'
                value={data.productName}
                className='p-2 bg-slate-100 border rounded'
                onChange={handleOnChange}

                
                />
                 <label htmlFor='brandName' className='mt-3'>Brand Name</label>
              <input type='text'
               id='brandName'
                placeholder='enter brand name'
                name='brandName'
                value={data.brandName}
                className='p-2 bg-slate-100 border rounded'
                onChange={handleOnChange}
                required

                
                />
                 <label htmlFor='category' className='mt-3'>cotegory :</label>
                 <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                 <option value={''}>Select Category</option>
                {
                  productCategory.map((ele,index)=>{
                    return(
                      <option value={ele.value} key={ele.value+index}>{ele.label}</option>
                    )
                  })
                }
                 </select>
                 <label htmlFor='productImage' className='mt-3'>Product  Image :</label>
                 <label htmlFor='uploadImageInput'>

                 <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center  cursor-pointer'>
              
                  <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                  <span className='text-4xl'><FaCloudUploadAlt/></span>
                  
                  <p className='text-sm'>Upload Product</p>
                  <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                  </div>
                 </div>
                 </label>
                 <div>
                  {
                    data?.productImage[0] ? (
                      <div className='flex items-center gap-2'>
                        {
                        data?.productImage.map((ele,index)=>{
                        return(
                            <div className='relative group'>

                              <img src={ele} alt='' width={80} height={80} className=' bg-slate-100 border cursor-pointer' onClick={()=>{setopenfullScreenImage(true)
                                setfullScreenImage(ele)
                              }}/>
 <div className='absolute bottom-0 right-0 text-white bg-red-600 rounded-full p-1 hidden group-hover:block curser-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                <MdDelete/>
                              </div>
                            </div>
                        )
                      })
                    }
                      </div>
                    ):(
                      <p className='text-red-600  text-xs'>Please upload Product Image</p>
                    )
                  }
                 </div>
                 {/* <div> */}
                 <label htmlFor='price' className='mt-3'>Price :</label>
              <input type='number'
               id='price'
                placeholder='enter price'
                name='price'
                value={data.price}
                className='p-2 bg-slate-100 border rounded'
                onChange={handleOnChange}
                required

                
                />
                <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
              <input type='number' 
               id='sellingPrice'
                placeholder='enter selling price'
                name='sellingPrice'
                value={data.sellingPrice}
                className='p-2 bg-slate-100 border rounded'
                onChange={handleOnChange}
                required

                
                />
                    <label htmlFor='description' className='mt-3'>Description :</label>
                    <textarea className='h-28 w-full bg-slate-100 resize-none p-1'
                    name='description'
                    value={data.description}
                    placeholder='enter image description' onChange={handleOnChange}>

                    </textarea>
                 {/* </div> */}
                 <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
            </form>  
        </div>
{/*****display image full screen */}

{
  openfullScreenImage && (

<DisplayImage onClose={()=>setopenfullScreenImage(false)} imgUrl={fullScreenImage} />
  )
}
    </div>
  )
}

export default UploadProduct