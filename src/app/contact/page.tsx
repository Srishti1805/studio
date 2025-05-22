"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must be less than 500 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log("Contact form submitted:", data);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
      variant: "default", // Explicitly default, can be customized
    });
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Get In Touch</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Have a question, a project proposal, or just want to say hello? Feel free to reach out using the form below.
        </p>
      </div>
      <Card className="max-w-lg mx-auto shadow-xl bg-card/80 backdrop-blur-sm border-border/70">
        <CardHeader>
          <CardTitle className="text-2xl text-accent">Contact Form</CardTitle>
          <CardDescription className="text-muted-foreground/90">I&apos;m always open to discussing new opportunities and collaborations.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name" className="text-foreground/90">Full Name</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="e.g. Jane Doe" {...field} className="bg-input placeholder:text-muted-foreground/70 focus:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email" className="text-foreground/90">Email Address</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" placeholder="e.g. jane.doe@example.com" {...field} className="bg-input placeholder:text-muted-foreground/70 focus:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="message" className="text-foreground/90">Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder="Let's talk about..."
                        rows={5}
                        className="resize-y bg-input placeholder:text-muted-foreground/70 focus:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
