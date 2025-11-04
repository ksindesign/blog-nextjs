import React, { JSX } from 'react';
import { Button } from '@/app/ui/components/button';
import { auth } from '../../../../../auth';
import { deletePost } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function Component({
  id,
  title,
  content,
  date,
  author,
}: {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}) {
  const session = await auth();

  async function handleDelete() {
    'use server';
    await deletePost(id);
    revalidatePath('/blog/posts');
    redirect('/blog/posts');
  }

  return (
    <div key={id} className='border border-gray-200 p-4 my-4'>
      <h2>{title}</h2>
      <p className='text-gray-500'>{date}</p>
      <p className='text-gray-500'>{author}</p>
      <p>{content}</p>
      {session?.user && (
        <div className='flex justify-end'>
          <form action={handleDelete}>
            <Button
              type='submit'
              className='deleteBtn bg-red-700 text-white mt-1'
            >
              Delete
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
