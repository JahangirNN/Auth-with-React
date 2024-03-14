import React from 'react';
import { Link } from 'react-router-dom';
import DarkMode from './theme/darkMode.jsx';
import { useSelector } from 'react-redux';
const Header = () => {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className='bg-slate-200 dark:bg-gray-500'>
        <div className="flex justify-between max-w-6xl mx-auto p-3">
            
            <div className="flex items-center space-x-4">
                <Link to='/'>
                    <h1 className='font-bold dark:text-zinc-50'>Auth</h1>
                </Link>
                <DarkMode />
            </div>

            
            <div className="flex items-center space-x-4">
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='dark:text-zinc-50'>Home</li>
                    </Link>

                    <Link to="/about">
                        <li className='dark:text-zinc-50'>About</li>
                    </Link>

                    <Link to="/profile">
                        {currentUser ? <img src={currentUser.profilePicture} alt="" className='w-7 h-7 rounded-full object-cover' />:
                        <li className='dark:text-zinc-50'>Sign In</li>
                        }
                    </Link>
                </ul>
            </div>
        </div>
    </div>
    
  )
}

export default Header
