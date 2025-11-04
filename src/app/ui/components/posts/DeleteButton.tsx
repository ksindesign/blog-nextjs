'use client';

import { Button } from '../button';
import { deletePost } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

export function DeleteButton({ postId }: { postId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
      await deletePost(postId);
      router.push('/blog/posts');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  return (
    <Button
      onClick={handleDelete}
      className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded'
    >
      Delete
    </Button>
  );
}
