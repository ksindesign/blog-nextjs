import React, { JSX } from 'react';
import { auth } from '../../../../../auth';
import Link from 'next/link';
import { DeleteButton } from './DeleteButton';
import { sanitizeHTML } from '@/app/lib/sanitize';
import { truncateWords } from '@/app/lib/utils';

export default async function Component({
  id,
  title,
  content,
  date,
  author,
  showPreview = true,
}: {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  showPreview?: boolean;
}) {
  const session = await auth();
  const sanitizedContent = sanitizeHTML(content);
  const displayContent = showPreview ? truncateWords(content, 20) : sanitizedContent;

  return (
    <div key={id} className='border border-gray-200 p-4 my-4'>
      <Link key={id} href={`/blog/post/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p className='text-gray-500'>{date}</p>
      <p className='text-gray-500'>{author}</p>
      {showPreview ? (
        <p className='text-gray-700'>{displayContent}</p>
      ) : (
        <div
          className='prose max-w-none'
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />
      )}

      {session?.user && (
        <div className='flex justify-end'>
          <DeleteButton postId={id} />
        </div>
      )}
    </div>
  );
}
