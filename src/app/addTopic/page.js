"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddTopicPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/topics/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      const result = await response.json();
      if (result.success) {
        router.push('/'); 
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to add topic:', error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='w-full flex flex-col box-border'>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Topic title'
          required
          className='w-full border border-black mt-5 py-3 px-12 text-xl'
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Topic description'
          required
          className='w-full border border-black mt-5 py-3 px-12 text-xl'
        />
        <button type="submit" className='w-fit text-xl text-white font-bold bg-green-600 mt-5 px-8 py-5'>Add Topic</button>
      </form>
    </>
  );
};

export default AddTopicPage;
