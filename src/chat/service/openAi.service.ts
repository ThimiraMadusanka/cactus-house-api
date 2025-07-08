import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  async autoReply(conversation: any, content: any) {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `
        You are an assistant that answers user questions or messages based ONLY on the provided content.

        Content:
        "${content}"

        When the user sends a message:
        - If the message is a greeting (like "hi", "hello", "good morning", etc.), greet the user warmly and then proceed.
        - If the question is about something mentioned in the content, and the content provides an answer, respond with the answer clearly and politely.
        - If the content does NOT have enough information to answer the question, politely inform the user that you don't have that information and provide the email address info@cactushouse.com for further assistance.

        Never make up information that is not in the content.
        Always be concise, clear, and friendly.
    `;

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL,
      input: [{ role: 'system', content: systemPrompt }, ...conversation],
    });

    return response.output_text;
  }
}
