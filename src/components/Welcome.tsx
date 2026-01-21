/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import {motion} from "motion/react"
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { Bike } from 'lucide-react'
import { ShoppingBasket } from 'lucide-react'
import { useRouter } from 'next/navigation'

type proptype={
    nextStep:(s:number)=>void
}

const Welcome = ({nextStep}:proptype) => {
    const route = useRouter()

  return (
    <div className='flex flex-col items-center justify-center text-center min-h-screen '>
       <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}  transition={{duration:1}}className='flex items-center gap-3'>
        <ShoppingBag/>
        <h1 className='text-4xl md:text-5xl font-extrabold  text-green-400'>SnapCart</h1>
       </motion.div>

       <motion.p initial={{opacity:0,y:10}}animate={{opacity:1,y:0}} transition={{duration:1,delay:0.3}}
       className='mt-4 font-semibold text-gray-700 text-lg md:text-xl max-w-lg'>
       Your one-step destination for each groceries , organic product , and daily essentials deliverd right to your doorstep
       </motion.p >
       
       <motion.div className='flex display-flex' initial={{opacity:0,y:10}}animate={{opacity:1,y:0}} transition={{duration:1,delay:0.3}}>
        <Bike className='w-24 h-24 md:w-24 md:h-24 text-green-400 drop-shadow-md'/>
        <ShoppingBasket className='w-24 h-24 md:w-24 md:h-24 text-orange-400 drop-shadow-md'/>
       </motion.div>

        <motion.button onClick={()=>nextStep(2)} initial={{opacity:0,y:20}}animate={{opacity:1,y:0}} transition={{duration:1,delay:0.3}} className='bg-green-400 hover:bg-green-600  mt-14 rounded-2xl flex py-3 px-3'>
            next
            <ArrowRight/>
        </motion.button>
    </div>
  )
}

export default Welcome