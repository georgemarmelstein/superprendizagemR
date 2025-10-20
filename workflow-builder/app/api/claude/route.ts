import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, model, context, attachment } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Build the full prompt with context and attachment
    let fullPrompt = '';

    // Add context from previous tasks
    if (context) {
      fullPrompt += `${context}\n\n`;
    }

    // Add attachment if present
    if (attachment) {
      fullPrompt += `<anexo filename="${attachment.filename}">\n${attachment.content}\n</anexo>\n\n`;
    }

    // Add the main prompt
    fullPrompt += prompt;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: model || 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: fullPrompt,
        },
      ],
    });

    // Extract text response
    const textContent = message.content.find((block) => block.type === 'text');
    const response = textContent && 'text' in textContent ? textContent.text : '';

    return NextResponse.json({
      response,
      usage: message.usage,
    });
  } catch (error: any) {
    console.error('Claude API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to call Claude API' },
      { status: 500 }
    );
  }
}
