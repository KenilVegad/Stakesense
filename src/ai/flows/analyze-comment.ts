
'use server';
/**
 * @fileOverview This file defines a Genkit flow for analyzing a user comment.
 *
 * It performs several AI-driven analyses on a piece of text, including
 * translation, summarization, sentiment analysis, and keyword extraction.
 *
 * - analyzeComment - A function that performs the analysis.
 * - AnalyzeCommentInput - The input type for the analysis function.
 * - AnalyzeCommentOutput - The return type for the analysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const AnalyzeCommentInputSchema = z.object({
  comment: z.string().describe('The user comment to be analyzed.'),
});
export type AnalyzeCommentInput = z.infer<typeof AnalyzeCommentInputSchema>;

export const AnalyzeCommentOutputSchema = z.object({
  englishTranslation: z
    .string()
    .describe('The English translation of the original comment.'),
  executiveSummary: z
    .string()
    .describe('A concise summary of the key points in the comment.'),
  sentiment: z
    .enum(['Positive', 'Neutral', 'Negative'])
    .describe('The overall sentiment of the comment.'),
  keyInsights: z
    .array(z.string())
    .describe('A list of the most important insights or takeaways.'),
  keywords: z
    .array(z.string())
    .describe('A list of important keywords extracted from the comment.'),
});
export type AnalyzeCommentOutput = z.infer<typeof AnalyzeCommentOutputSchema>;

export async function analyzeComment(
  input: AnalyzeCommentInput
): Promise<AnalyzeCommentOutput> {
  return analyzeCommentFlow(input);
}

const analysisPrompt = ai.definePrompt({
  name: 'commentAnalysisPrompt',
  input: {schema: AnalyzeCommentInputSchema},
  output: {schema: AnalyzeCommentOutputSchema},
  prompt: `You are an expert policy analyst for a government agency. Your task is to analyze a public comment submitted regarding a draft regulation.

  Analyze the following comment:
  "{{{comment}}}"

  Perform the following actions:
  1.  Translate the full comment into professional English.
  2.  Provide a concise, neutral "executive summary" of the comment's main points.
  3.  Determine the overall sentiment (Positive, Neutral, or Negative).
  4.  Extract a list of key insights or actionable talking points from the comment.
  5.  Extract a list of the most relevant keywords.

  Return the analysis in a structured JSON format.`,
});

const analyzeCommentFlow = ai.defineFlow(
  {
    name: 'analyzeCommentFlow',
    inputSchema: AnalyzeCommentInputSchema,
    outputSchema: AnalyzeCommentOutputSchema,
  },
  async input => {
    const {output} = await analysisPrompt(input);
    return output!;
  }
);
