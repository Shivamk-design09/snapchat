import { ArrowLeft } from 'lucide-react'
import React from 'react'

const Registerform = () => {
  return (
    <div className='flex flex-col  item-center  justify-center min-h-screen  px-6  py-10  bg-white relative'>
        <div className='absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer'>
            <ArrowLeft className='w-5 h-5'/>
            <span className='font-black'>Back</span>
        </div>
    </div>
  )
}

export default Registerform