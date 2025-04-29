import React from 'react'

const Navbar = ({ children }) => {
  return (
    <div className='flex items-center justify-between bg-gray-100 px-4 lg:px-10 py-4 rounded-md shadow-md'>
      <h1 className="text-lg md:text-2xl xl:text-4xl font-bold">Personal Finance Visualizer</h1>
      {children}
    </div>
  )
}

export default Navbar
