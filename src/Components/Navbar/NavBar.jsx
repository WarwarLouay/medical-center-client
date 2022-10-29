import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { SideBarData } from '../SidebarData';
import { IconContext } from 'react-icons';
import './Navbar.css';
import { BiLogOut } from 'react-icons/bi';

const NavBar = () => {

    const [sidebar, setSideBar] = React.useState(false);

    const showSideBar = () => {
        setSideBar(!sidebar);
    };

    const logoutHandler = () => {
        sessionStorage.setItem('user', '');
      };

  return (
    <React.Fragment>
    <IconContext.Provider value={{ color: '#fff' }}>
    <div className='navbar'>
      <Link to='#' className='menu-bars'>
        <FaBars onClick={showSideBar} />
        <BiLogOut onClick={logoutHandler} style={{marginRight: '2%'}} />
      </Link>
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                    <AiOutlineClose onClick={showSideBar} />
                </Link>
            </li>
            {SideBarData.map((item, index) => {
                return(
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </nav>
    </IconContext.Provider>
    </React.Fragment>
  )
}

export default NavBar
