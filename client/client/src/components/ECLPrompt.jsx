import React from 'react'
import '../main.css'

const ECLPrompt = (props) => (
    <div className='border border-gray-400 hover:bg-zinc-400 hover:bg-opacity-20 transition-all border-opacity-40 rounded-lg text-sm p-4 text-start text-white w-full h-16 flex items-center'>
        <h3 className='sm:m-2 w-full font-semibold'>{props.content}</h3>
    </div>
  )


export default ECLPrompt