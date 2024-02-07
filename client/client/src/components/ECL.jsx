// Examples, Capibilities and Limitations

import React from 'react'
import { ECLIconCont, ECLPromptsCont,ECLPromptsContsm } from '../constants/index.js'
import ECLPrompt from './ECLPrompt.jsx'
import '../main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo.svg'


const ECL = () => (
  <div  className='w-full ecl-container flex flex-col gap-10 sm:gap-6 mb-10 items-center'>
    <div className='flex bg-white rounded-full p-2 w-12'><a href="/"><img src={logo} alt="" className='w-full'/></a></div>
    <div className='flex  font-semibold text-2xl'>How can I help you today?</div>
    {/* <h1 className='text-4xl text-center hidden sm:flex mb-4 font-bold'>ChatGPT</h1> */}
    {/* <div className='header-icons-cont hidden sm:flex  text-center items-center justify-around'>
      {ECLIconCont.map((item, index) => (
        <div key={item.id} className='flex flex-col gap-1 items-center justify-center '>
          <FontAwesomeIcon className='w-12' icon={item.icon} />
          <h3 className='text-lg'>{item.title}</h3>
        </div>
      ))}
    </div> */}
    <div className="header-prompts-cont hidden sm:flex gap-2  flex-wrap items-center justify-evenly">
      {ECLPromptsCont.map((prompt) => (
        <ECLPrompt key={prompt.id} content={prompt.content} />
      ))}
    </div>
    <div className="header-prompts-cont flex gap-2 sm:hidden  flex-wrap items-center justify-evenly">
      {ECLPromptsContsm.map((prompt) => (
        <ECLPrompt key={prompt.id} content={prompt.content} />
      ))}
    </div>
  </div>
)


export default ECL