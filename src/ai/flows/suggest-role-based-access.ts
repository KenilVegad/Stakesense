'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting role-based access for new users.
 *
 * It takes department and job title as input and suggests appropriate access roles and permissions.
 * - suggestRoleBasedAccess - A function that suggests access roles based on user information.
 * - SuggestRoleBasedAccessInput - The input type for the suggestRoleBasedAccess function.
 * - SuggestRoleBasedAccessOutput - The return type for the suggestRoleBasedAccess function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRoleBasedAccessInputSchema = z.object({
  department: z.string().describe('The department the user belongs to.'),
  jobTitle: z.string().describe('The job title of the user.'),
});
export type SuggestRoleBasedAccessInput = z.infer<
  typeof SuggestRoleBasedAccessInputSchema
>;

const SuggestRoleBasedAccessOutputSchema = z.object({
  suggestedRoles: z
    .array(z.string())
    .describe('A list of suggested roles for the user.'),
  suggestedPermissions: z
    .array(z.string())
    .describe('A list of suggested permissions for the user.'),
});
export type SuggestRoleBasedAccessOutput = z.infer<
  typeof SuggestRoleBasedAccessOutputSchema
>;

export async function suggestRoleBasedAccess(
  input: SuggestRoleBasedAccessInput
): Promise<SuggestRoleBasedAccessOutput> {
  return suggestRoleBasedAccessFlow(input);
}

const suggestRoleBasedAccessPrompt = ai.definePrompt({
  name: 'suggestRoleBasedAccessPrompt',
  input: {schema: SuggestRoleBasedAccessInputSchema},
  output: {schema: SuggestRoleBasedAccessOutputSchema},
  prompt: `You are an expert in access control and security.

  Based on the user's department and job title, suggest appropriate roles and permissions for the e-governance platform.

  Department: {{{department}}}
  Job Title: {{{jobTitle}}}

  Consider common practices and security best practices when suggesting roles and permissions.
  Return only a JSON formatted object.`,
});

const suggestRoleBasedAccessFlow = ai.defineFlow(
  {
    name: 'suggestRoleBasedAccessFlow',
    inputSchema: SuggestRoleBasedAccessInputSchema,
    outputSchema: SuggestRoleBasedAccessOutputSchema,
  },
  async input => {
    const {output} = await suggestRoleBasedAccessPrompt(input);
    return output!;
  }
);
