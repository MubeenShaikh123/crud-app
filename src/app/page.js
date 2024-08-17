"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";

const Home = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/topics/getAll');
        const data = await response.json();
        console.log("data", data)
        setTopics(data.data);
      } catch (error) {
        console.error('Failed to fetch topics:', error.message);
      }
    };

    fetchTopics();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/topics/delete/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setTopics(topics.filter((topic) => topic._id !== id));
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to delete topic:', error.message);
    }
  };

  if (topics.length == 0 || !topics) {
    return <h1 className='text-3xl w-full text-center m-6'>Topic not found</h1>
  }

  return (
    <div>
      {topics.map((topic) => (
        <div key={topic._id} className='rounded-lg shadow-md border p-3 mb-3 flex flex-row justify-between gap-x-1'>
          <div className='flex flex-col break-words w-11/12'>
            <h2 className='text-3xl font-bold'>{topic.title}</h2>
            <p className='text-2xl'>{topic.description}</p>
          </div>
          <div className='flex flex-row text-2xl gap-x-3 items-start h-fit'>
            <button className='text-red-500' onClick={() => handleDelete(topic._id)}><RiDeleteBin6Line /></button>
            <Link href={`/edit-topic/${topic._id}`}>
              <LiaEditSolid />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
