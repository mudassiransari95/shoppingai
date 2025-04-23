import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";



const BannerProduct = () => {
const [currentImage,setcurrentImage]=useState(0)
    const desktopImage=[
        image1,
        image2,
        image3,
        image4,
        image5
    ]
    const mobileImage=[
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage=()=>{
        if(desktopImage.length-1>currentImage){
            setcurrentImage(preve=>preve+1)
        }
    }
    const preveImage=()=>{
        if(currentImage!==0){
            setcurrentImage(preve=>preve-1)
        }
    }

    useEffect(()=>{
        const interval=setInterval(()=>{
            if(desktopImage.length-1>currentImage){

                nextImage()
            }else {
                setcurrentImage(0)
            }
        },5000)
        return ()=>clearInterval(interval)
    },[currentImage])

  return (
    <div className='container mx-auto px-4 rounded '>
        <div className='h-56  md:h-72 w-full bg-slate-200 relative '>
            <div className='absolute flex  z-10 h-full w-full md:flex items-center'>
                <div className='flex justify-between   w-full text-2xl'>
                    
                <butto onClick={preveImage} className='bg-white shadow-md rounded-full p-1' ><FaAngleLeft/></butto>
                <butto onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight/></butto>
                </div>
            </div>

    {/* desktop and tablet version */}

           <div className='hidden md:flex h-full w-full overflow-hidden'>
           {
                desktopImage.map((imageUrI,index)=>{
                    return(
                        <div className='w-full h-full min-h-full min-w-full transition-all' key={imageUrI} style={{transform:`translatex(-${currentImage*100}%)`}}>
                         <img src={imageUrI} alt='' className='w-full h-full' />
                         </div>
                    )
                })

            }
           </div>
           {/* mobile  version */}

           <div className='flex h-full w-full overflow-hidden md:hidden'>
           {
                mobileImage.map((imageUrI,index)=>{
                    return(
                        <div className='w-full h-full min-h-full min-w-full transition-all' key={imageUrI} style={{transform:`translatex(-${currentImage*100}%)`}}>
                         <img src={imageUrI} alt='' className='w-full h-full object-cover' />
                         </div>
                    )
                })

            }
           </div>
           
        </div>
    </div>
  )
}

export default BannerProduct