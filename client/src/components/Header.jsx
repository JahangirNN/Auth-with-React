import React from 'react';
import { Link } from 'react-router-dom';
import DarkMode from './theme/darkMode.jsx';

const Header = () => {
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

                    <Link to="/sign-in">
                        <li className='dark:text-zinc-50'>Sign In</li>
                    </Link>
                </ul>
            </div>
        </div>
    </div>
    
  )
}

export default Header
