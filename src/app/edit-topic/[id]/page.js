"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EditTopicPage = ({ params }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = params; // Retrieve the ID from route params

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await fetch(`/api/topics/get/${id}`);
        const result = await response.json();

        if (result.success) {
          setTitle(result.data.title);
          setDescription(result.data.description);
          setLoading(false);
        } else {
          console.error(result.message);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch topic:', error.message);
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/topics/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      const result = await response.json();
      if (result.success) {
        router.push('/'); // Navigate to the home page
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to update topic:', error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='flex justify-center'>
      <form onSubmit={handleSubmit} className='w-1/2 flex flex-col box-border border p-4 shadow-md rounded-lg'>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Topic title'
          required
          className='w-full border border-black mt-5 py-3 px-12 text-xl rounded-md focus:outline-none focus:border-2 focus:border-green-700'

        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Topic description'
          required
          className='w-full border border-black mt-5 py-3 px-12 text-xl rounded-md focus:outline-none focus:border-2 focus:border-green-700'

        />
        <button type="submit" className='w-full text-xl text-white font-bold rounded-md bg-green-600 hover:bg-green-700 mt-5 px-8 py-3'>Update Topic</button>
      </form>
    </div>
  );
};

export default EditTopicPage;
