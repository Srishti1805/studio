// Use server directive is required in edge runtime
'use server';

/**
 * @fileOverview AI agent to generate personalized cover letters based on job description and resume information.
 *
 * - generateCoverLetter - A function that generates a cover letter.
 * - CoverLetterGeneratorInput - The input type for the generateCoverLetter function.
 * - CoverLetterGeneratorOutput - The return type for the generateCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CoverLetterGeneratorInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The full job description that the cover letter will be tailored to.'),
  resumeInformation: z
    .string()
    .describe('The resume information, including skills and experiences.'),
  additionalInstructions: z.string().optional().describe('Any additional instructions for tailoring the cover letter.'),
});
export type CoverLetterGeneratorInput = z.infer<
  typeof CoverLetterGeneratorInputSchema
>;

const CoverLetterGeneratorOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter.'),
});
export type CoverLetterGeneratorOutput = z.infer<
  typeof CoverLetterGeneratorOutputSchema
>;

export async function generateCoverLetter(
  input: CoverLetterGeneratorInput
): Promise<CoverLetterGeneratorOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'coverLetterGeneratorPrompt',
  input: {schema: CoverLetterGeneratorInputSchema},
  output: {schema: CoverLetterGeneratorOutputSchema},
  prompt: `You are an expert at writing cover letters. You will be provided with a job description and resume information.

  Job Description: {{{jobDescription}}}

  Resume Information: {{{resumeInformation}}}

  Additional Instructions: {{{additionalInstructions}}}

  Using this information, write a cover letter that is tailored to the job description. The cover letter should be professional and highlight the skills and experiences that are most relevant to the job description.
  The cover letter should be concise and to the point.
  The cover letter should be no more than 3 paragraphs.
  Make sure to greet the hiring manager appropriately.
  Make sure to sign off appropriately.
  Make sure to include your contact information.
  Do not use a generic cover letter. Use the job description and resume information to write a personalized cover letter.
  Response must be in markdown format.`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: CoverLetterGeneratorInputSchema,
    outputSchema: CoverLetterGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
