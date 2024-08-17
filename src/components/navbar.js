import Link from 'next/link'
import React from 'react'

const navbar = () => {
  return (
    <nav className='w-full px-12 py-2 border text-center bg-[#1E293B] text-white font-semibold flex flex-row items-center justify-between'>
      <h1 className='text-2xl'>Tournamax Assignment</h1>
      <Link className='text-2xl text-[#1E293B] bg-white p-3 rounded-md mr-4' href={'addTopic'}>Add Topic</Link>
    </nav>
  )
}

export default navbar
