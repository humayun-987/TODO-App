import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between py-2 bg-indigo-900 text-white'>
        <div className="logo">
            <span className='font-bold text-xl mx-6'>iTask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:text-gray-300  transition-all'>Home</li>
            <li className='cursor-pointer hover:text-gray-300 transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
