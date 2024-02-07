import React from 'react'
import { useState } from 'react'
import { sendButton } from '../assets/index.js'
import '../main.css'
import bot from '../assets/chatgpt-icon.png'
import user from '../assets/user.svg'
import ECL from './ECL.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const InputField = () => {

  // Adjusting the height of textarea when text overflows
  const adjustTextareaHeight = (event) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  // loading animation
  let loadInterval;
  function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
      // Update the text content of the loading indicator
      element.textContent += '.';

      // If the loading indicator has reached three dots, reset it
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  }

  // necessary for typing text effect for that specific reply
  function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index)
        index++
      } else {
        clearInterval(interval)
      }
    }, 10)
  }

  // generate unique ID for each message div of bot
  // without unique ID, typing text will work on every element
  function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  }

  function chatStripe(isAi, value, uniqueId) {
    return (
      `
        <div class="${isAi && 'aiChat-bg-color'} w-full rounded-md px-2 sm:px-4">
            <div class="chat flex flex-row gap-2 my-6 items-start ">
                <div class="profile flex items-center min-w-[30px] min-h-[24px] justify-center  ${!isAi && 'bg-indigo-800'}  rounded-md">
                    <img class='w-6 h-6'
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const chatContainer = document.getElementById('chat_container');
    const inputField = document.getElementById('my-input-id');
    const inputValue = inputField.value;

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, inputValue);

    // to clear the textarea input
    inputField.value = '';
    // inputField.style.height="10px"

    // bot's chatstripe
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, ' ', uniqueId);

    // to focus scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div
    const messageDiv = document.getElementById(uniqueId);

    if (messageDiv) {
      loader(messageDiv);

      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: inputValue,
        }),
      });
      clearInterval(loadInterval);
      messageDiv.innerHTML = ' ';

      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.bot;

        typeText(messageDiv, data);
      } else {
        const err = await response.text();

        messageDiv.innerHTML = 'Something went wrong';
        alert(err);
      }
    }
  }
  return (
    <div className='w-11/12 sm:w-2/3 flex flex-col justify-between gap-3 sm:gap-5' >
      <div id="chat_container" className='flex flex-col gap-8'>
        <ECL />
      </div>
      <div className='mb-8 flex flex-col gap-2 justify-between'>
        <form className="relative" onSubmit={handleSubmit}>
          <textarea
            tabIndex={0}
            // className='resize-none input-field-bg-color w-full rounded-md p-3 focus:outline-none'
            className='border border-gray-400 max-h-44 pr-10  focus:outline-none resize-none border-opacity-40 rounded-lg text-sm p-4 text-start text-white w-full bg-transparent flex items-center'
            id="my-input-id"
            placeholder='Send a message...'
            rows={1}
            autoComplete='off'
            required='yes'
            autoFocus
            onInput={adjustTextareaHeight}
          ></textarea>
          <button className='absolute top-[2px] bottom-0 right-1 p-3' type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>

        <div className='text-center text-[10px] text-gray-300'>This application can make mistakes. Consider checking important information.</div>
      </div>
    </div>
  )
}

export default InputField

