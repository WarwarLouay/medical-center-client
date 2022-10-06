import React from 'react';
import { AiFillHome, AiOutlinePlus } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';

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
    {
        title: 'Logout',
        path: '/login',
        icon: <BiLogOut />,
        cName: 'nav-text'
    },
];