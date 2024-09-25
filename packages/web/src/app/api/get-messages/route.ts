'use server';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Database } from '~/libs/types/database';
import type { Message } from '~/libs/types/message';
import { fetchResponseMessages } from '~/server/messages/fetch-response-messages';
import { mergeMessages } from '~/server/messages/utils/merge-messages';

export async function POST(req: NextRequest) {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    const {
      databaseMessages,
      githubMessages,
    }: {
      databaseMessages: Database['public']['Tables']['messages']['Row'][];
      githubMessages: Message[];
    } = await req.json();

    const responseMessages = await fetchResponseMessages(databaseMessages);
    if (!responseMessages) {
      return NextResponse.json({ message: 'Response messages not found' }, { status: 404 });
    }

    const messages = mergeMessages(databaseMessages, responseMessages);

    if (githubMessages) {
      messages.push(...githubMessages);
    }

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('Error in getMessages route:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Error fetching messages: ${error.message}` },
        { status: 500 },
      );
    }
    return NextResponse.json({ message: 'Unknown error fetching messages' }, { status: 500 });
  }
}
