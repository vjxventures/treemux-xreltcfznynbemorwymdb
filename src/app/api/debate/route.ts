import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, topic, position, difficulty } = await req.json();

  const systemPrompt = `You are an AI debate opponent participating in a structured debate about: "${topic}"

Your position: ${position}
Difficulty level: ${difficulty}

Guidelines:
- Make strong, logical arguments supporting your position
- Use evidence, examples, and reasoning
- ${difficulty === 'beginner' ? 'Keep arguments simple and clear. Be encouraging.' : difficulty === 'intermediate' ? 'Use moderate complexity and some advanced reasoning.' : 'Use sophisticated arguments, counterarguments, and deep analysis. Challenge assumptions.'}
- Respond directly to your opponent's points
- Be respectful but assertive
- Keep responses concise (2-3 paragraphs max)
- Structure: acknowledge opponent's point, then present your counter-argument

Remember: This is educational. Help your opponent improve their debate skills through quality argumentation.`;

  const result = streamText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    messages,
    system: systemPrompt,
  });

  return result.toTextStreamResponse();
}
