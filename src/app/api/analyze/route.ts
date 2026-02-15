import { anthropic } from '@ai-sdk/anthropic';
import { generateObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

const argumentAnalysisSchema = z.object({
  logicalStrength: z.number().min(1).max(10).describe('Score for logical coherence and reasoning'),
  evidenceQuality: z.number().min(1).max(10).describe('Score for use of evidence and examples'),
  persuasiveness: z.number().min(1).max(10).describe('Score for persuasive power'),
  structure: z.number().min(1).max(10).describe('Score for argument structure and organization'),
  overallScore: z.number().min(1).max(10).describe('Overall argument quality score'),
  strengths: z.array(z.string()).describe('List of argument strengths (2-3 items)'),
  improvements: z.array(z.string()).describe('List of improvement suggestions (2-3 items)'),
  feedback: z.string().describe('Brief constructive feedback paragraph'),
});

export async function POST(req: Request) {
  const { argument, topic, position } = await req.json();

  const result = await generateObject({
    model: anthropic('claude-3-5-sonnet-20241022'),
    schema: argumentAnalysisSchema,
    prompt: `Analyze this debate argument and provide structured feedback.

Topic: ${topic}
Position: ${position}
Argument: ${argument}

Evaluate the argument on:
1. Logical strength - Are the points logically sound and well-reasoned?
2. Evidence quality - Does it use good evidence, examples, or data?
3. Persuasiveness - How convincing is it?
4. Structure - Is it well-organized and clear?

Provide constructive feedback that helps improve debate skills. Be encouraging but honest.`,
  });

  return Response.json(result.object);
}
