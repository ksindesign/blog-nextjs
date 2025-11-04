import Post from '@/app/ui/components/posts/Post';
import { notFound } from 'next/navigation';
import { getPostById } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <h1>Post</h1>
      <Post
        {...(post as {
          id: string;
          title: string;
          content: string;
          date: string;
          author: string;
        })}
        showPreview={false}
      />
    </>
  );
}
