import React from 'react';
import { AiFillHome, AiOutlinePlus } from 'react-icons/ai';

export const SideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Appointment',
        path: '/appointment',
        icon: <AiOutlinePlus />,
        cName: 'nav-text'
    },
];