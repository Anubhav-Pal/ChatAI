import React from 'react'
import { useState } from 'react'
import { sendButton } from '../assets/index.js'
import '../main.css'
import bot from '../assets/chatgpt-icon.png'
import user from '../assets/user.svg'
import ECL from './ECL.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import React, { useState } from 'react';


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
    }, 20)
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
        <div class="${isAi && 'aiChat-bg-color'} w-full">
            <div class="chat flex flex-row gap-4 my-6">
                <div class="profile flex items-center justify-center bg-indigo-800 rounded-md">
                    <img class='w-7'
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
        const data = await response.json();
        const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'

        typeText(messageDiv, parsedData);
        console.log();
      } else {
        const err = await response.text();

        messageDiv.innerHTML = 'Something went wrong';
        alert(err);
      }
    }
  }
  return (
    <div className='w-full  max-w-3xl fixed bottom-12'>
      <div id="chat_container" className='absolute flex flex-col gap-8 bottom-12   mb-5'>
        <ECL />
      </div>
      <form action="" onSubmit={handleSubmit}>
        <textarea tabIndex={0} className='pr-12 resize-none input-field-bg-color w-full rounded-md p-3 focus:outline-none' id="my-input-id" placeholder='Send a message.' rows={1} autoComplete='off' required='yes' autoFocus
          onInput={adjustTextareaHeight}></textarea>

        <button className='absolute right-3 mt-3 mr-1 ' type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
      </form>
    </div>
  )
}

export default InputField

