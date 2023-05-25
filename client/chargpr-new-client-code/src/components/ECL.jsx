// Examples, Capibilities and Limitations

import React from 'react'
import { ECLIconCont, ECLPromptsCont } from '../constants/index.js'
import ECLPrompt from './ECLPrompt.jsx'
import '../main.css'


const ECL = () => (
  <div  className='ecl-container flex flex-col gap-6'>
    <h1 className='text-4xl text-center mb-4 font-bold'>ChatGPT</h1>
    <div className='header-icons-cont flex text-center items-center justify-around'>
      {ECLIconCont.map((item, index) => (
        <div key={item.id} className='flex flex-col gap-1 items-center justify-center '>
          <img src={item.icon} alt="icon" className='w-6 h-auto' />
          <h3 className='text-lg'>{item.title}</h3>
        </div>
      ))}
    </div>
    <div className="header-prompts-cont flex flex-wrap items-center justify-evenly">
      {ECLPromptsCont.map((prompt) => (
        <ECLPrompt key={prompt.id} content={prompt.content} />
      ))}
    </div>
  </div>
)


export default ECL