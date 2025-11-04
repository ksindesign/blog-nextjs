import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';

export async function POST(request: Request) {
  // Verify authentication
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const PROMPT = 'You are a professional front-end developer. Write a 100-word blog post about the title below.';

    const requestParams = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: PROMPT + title },
        { role: 'user', content: title },
      ],
    };

    // API key is safely accessed server-side only
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestParams),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0]?.message?.content || '';

    return NextResponse.json({ content: generatedContent }, { status: 200 });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
