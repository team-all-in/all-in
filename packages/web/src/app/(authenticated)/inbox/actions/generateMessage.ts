'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { casual, formal, long, oba, oji, simple } from '../components/gen-message/prompt';

export const generateMessageAction = async (_previousState: unknown, formData: FormData) => {
  const message = formData.get('message');
  const style = formData.get('style') as 'simple' | 'formal' | 'casual' | 'long' | 'oji' | 'oba';

  const styles = { simple, formal, casual, long, oji, oba };
  const stylePrompt = styles[style] || '';

  const result = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: z.object({
      message: z.string(),
    }),
    prompt: `
    以下のメッセージに対して、返信を生成してください。

    「${message}」

    以下のような話し方や表現を使ってください。
    ${stylePrompt}
    `,
  });

  console.log('result', result);

  return result.object.message;
};
