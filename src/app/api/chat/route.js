import { openai } from '@ai-sdk/openai';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { convertToCoreMessages, streamText } from 'ai';

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(3, '60s'),
});

export async function POST(request) {
  const ip = request.ip ?? 'ip';
  const { success, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Limite de mensagens atingido!', { status: 429 })
  }

  return new Response('Limite de mensagens atingido!', { status: 429 })

  const { messages } = await request.json();

  // throw Error('Erro forçado');

  const systemPrompt = `
  Você é um assistente pessoal divertido e gentil que fala sobre filmes.
  Se alguém te perguntar qualquer coisa que não seja sobre filmes, 
  responda de forma divertida que você só sabe falar sobre filmes e ofereça seus serviços.
  `;

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: convertToCoreMessages(messages),
    system: systemPrompt,
  });

  return result.toDataStreamResponse({
    getErrorMessage: (error) => {
      if (error == null) {
        console.error(
          '[POST] :: toDataStreamResponse - erro chegou null e não sabemos o que houve.'
        );
        return 'Algum erro inesperado aconteceu';
      }

      if (typeof error == 'string') {
        console.error(
          '[POST] :: toDataStreamResponse - erro é uma string.',
          error
        );
        return error;
      }

      if (typeof error == Error) {
        console.error(
          '[POST] :: toDataStreamResponse - erro é do tipo Error.',
          error.messages
        );
        return error.messages;
      }

      console.error(
        '[POST] :: toDataStreamResponse - error genérico.',
        JSON.stringify(error)
      );
      return JSON.stringify(error);
    },
  });
}
