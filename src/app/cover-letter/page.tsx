"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateCoverLetter, type CoverLetterGeneratorInput } from '@/ai/flows/cover-letter-generator';
import MarkdownRenderer from '@/components/markdown-renderer';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  jobDescription: z.string().min(50, { message: "Job description must be at least 50 characters." }),
  resumeInformation: z.string().min(50, { message: "Resume information must be at least 50 characters." }),
  additionalInstructions: z.string().optional(),
});

type CoverLetterFormValues = z.infer<typeof formSchema>;

export default function CoverLetterPage() {
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CoverLetterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
      resumeInformation: '',
      additionalInstructions: '',
    },
  });

  const onSubmit: SubmitHandler<CoverLetterFormValues> = async (data) => {
    setIsLoading(true);
    setGeneratedLetter(null);
    try {
      const input: CoverLetterGeneratorInput = {
        jobDescription: data.jobDescription,
        resumeInformation: data.resumeInformation,
        additionalInstructions: data.additionalInstructions || undefined,
      };
      const result = await generateCoverLetter(input);
      setGeneratedLetter(result.coverLetter);
      toast({
        title: "Success!",
        description: "Cover letter generated successfully.",
      });
    } catch (error) {
      console.error("Error generating cover letter:", error);
      toast({
        title: "Error",
        description: "Failed to generate cover letter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-primary">AI Cover Letter Generator</h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        Craft a personalized cover letter in seconds. Fill in the details below, and let AI assist you in creating a compelling application.
      </p>
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Cover Letter Details</CardTitle>
          <CardDescription>Provide the job description, your resume highlights, and any specific instructions.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="jobDescription">Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="jobDescription"
                        placeholder="Paste the full job description here..."
                        rows={8}
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resumeInformation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="resumeInformation">Your Resume Information / Key Skills</FormLabel>
                    <FormControl>
                      <Textarea
                        id="resumeInformation"
                        placeholder="Highlight your relevant skills, experiences, and achievements from your resume..."
                        rows={8}
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="additionalInstructions">Additional Instructions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        id="additionalInstructions"
                        placeholder="e.g., Emphasize leadership skills, mention a specific company value, desired tone (formal/informal)..."
                        rows={4}
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Cover Letter'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {generatedLetter && (
        <Card className="max-w-3xl mx-auto shadow-lg mt-8">
          <CardHeader>
            <CardTitle>Generated Cover Letter</CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownRenderer content={generatedLetter} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
