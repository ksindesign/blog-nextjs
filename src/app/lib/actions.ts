'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function deletePost(id: string) {
  try {
    await sql`DELETE FROM posts WHERE id = ${id}`;
    revalidatePath('/blog/posts');
    revalidatePath(`/blog/post/${id}`);
  } catch (error) {
    console.error('Error deleting post', error);
    throw error;
  }
}
