import React, { JSX } from 'react';
import { Button } from '@/app/ui/components/button';

export default function Component({
  id,
  title,
  content,
  date,
}: {
  id: string;
  title: string;
  content: string;
  date: string;
}) {
  return (
    <div key={id} className='border border-gray-200 p-4 my-4'>
      <h2>{title}</h2>
      <p className='text-gray-500'>{date}</p>
      <p>{content}</p>
      <div className='flex justify-end'>
        <Button className='deleteBtn bg-red-700 text-white mt-1'>Delete</Button>
      </div>
    </div>
  );
}
