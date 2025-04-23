import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data,setdata]=useState([])

    const [loading,setloading]=useState(false)

    const context=useContext(Context)

    const loadingCart=new Array(context.cartProductCount).fill(null)
    // console.log('loadingCart',loadingCart)

    const fetchData=async()=>{
        setloading(true)
        const response= await fetch(SummaryApi.addtoCartProductView.url,{
            method:SummaryApi.addtoCartProductView.method,
            credentials:'include',
            headers:{
                'content-type':'application/json'

            }
        })
        setloading(false)
        const responseData=await response.json()
        console.log('responseData.data',responseData.data)

        if(responseData.success){
            setdata(responseData.data)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])
    console.log('cart data',data)

    const increaseQty=async(id,qty)=>{
        console.log(id)
        const response=await fetch(SummaryApi.updateQuantity.url,{
            method:SummaryApi.updateQuantity.method,
            credentials:'include',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                quantity:qty+1,
                _id:id
                
            })
        })
        const responseData=await response.json()
        console.log('update quantity',responseData)

        if(responseData.success){
            fetchData()
        }
    }
    const decreaseQty=async(id,qty)=>{
        if(qty>=2){
            const response=await fetch(SummaryApi.updateQuantity.url,{
                method:SummaryApi.updateQuantity.method,
                credentials:'include',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({
                    quantity:qty-1,
                    _id:id
                    
                })
            })
            const responseData=await response.json()
            console.log('update quantity',responseData)
    
            if(responseData.success){
                fetchData()
            }
        }
        }
        const deleteCartProduct = async(id)=>{
            const response = await fetch(SummaryApi.deleteCartProduct.url,{
                method : SummaryApi.deleteCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(
                    {
                        _id : id,
                    }
                )
            })
    
            const responseData = await response.json()
    
            if(responseData.success){
                fetchData()


                context.fetchUserAddToCart()
            }
        }
        const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
        const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)
     

  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg py-3'>
      {
    
       data.length===0  &&  !loading && (
                <p className='bg-white py-5'>no data</p>
        )
}
      </div>
      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/* view product  */}
        <div className='w-full max-w-3xl'>
            {
                loading ? (
                    loadingCart.map((ele,index)=>{
                        return(

                        <div key={ele+'add to cart'+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                            
                        </div>
                        )
                    })   
                ):(
                    data.map((product,index)=>{
                        return(
                            <div key={product?._id+'add to cart'} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[132px,1fr]'>
                            <div className='h-32 w-32 bg-slate-200'>
                                <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>

                            </div>
                            <div className='px-4 py-2 relative'>
                                {/* delete element from cart */}
                                <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)} >
                                    <MdDelete/>

                               </div>
                                <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId.sellingPrice)}</p>
                                 <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                        <span>{product?.quantity}</span>
                                 <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                    </div>   
                                     </div>
                                     </div>
                        )
                 })
                        
                    
                )
            }

        </div>
       {/* **** total product  */}
       <div className='mt-5 lg:mt-0 w-full max-w-sm'>
       {
            loading ? (
                <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                total
            </div>
            ):(
                <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price</p>
                                        <p>{displayINRCurrency(totalPrice)}</p>    
                                    </div>

                                    <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>

                                </div>
            )
        }
       </div>
       
      </div>

    </div>                                                                  
  )
}

export default Cart