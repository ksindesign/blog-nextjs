'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type ReactEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ReactEditor({ value, onChange }: ReactEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        ['clean'],
      ],
    }),
    []
  );

  return (
    <ReactQuill
      theme='snow'
      value={value}
      onChange={onChange}
      modules={modules}
      className='bg-white'
    />
  );
}
