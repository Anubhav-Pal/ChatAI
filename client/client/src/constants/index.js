import {
    icon,
    plus,
    onoff,
    chaticon,
    avatar,
    dots,
    sun,
    lightning,
    caution,
    sendButton
} from '../assets/index.js'

import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';



export const ECLIconCont = [
    {
        id: "sun",
        icon: faSun,
        title: "Examples"
    },
    {
        id: "lightning",
        icon: faBolt,
        title: "Capabilities"
    },
    {
        id: "Limitations",
        icon: faTriangleExclamation,
        title: "Limitations"
    }
]

export const ECLPromptsCont = [
    {
        id: "1",
        content: "Explain quantum computing in simple terms"
    },
    {
        id: "2",
        content: "Got any creative ideas for a 10 year old’s birthday?"
    },
    {
        id: "3",
        content: "How do I make an HTTP request in Javascript?"
    },
    {
        id: "4",
        content: "Remembers what user said earlier in the conversation"
    },
    {
        id: "5",
        content: "Allows user to provide follow-up corrections"
    },
    {
        id: "6",
        content: "Trained to decline inappropriate requests"
    },
    {
        id: "7",
        content: "May occasionally generate incorrect information"
    },
    {
        id: "8",
        content: "May occasionally produce harmful instructions"
    },
    {
        id: "9",
        content: "Limited knowledge of the world and events after 2021"
    }
];

