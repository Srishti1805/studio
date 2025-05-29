
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileDown } from 'lucide-react';

interface ResumeFrontmatter {
  name?: string;
  title?: string;
  cvUrl?: string;
  [key: string]: any;
}

async function getResumeDocument(): Promise<{ frontmatter: ResumeFrontmatter, content: string }> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', 'resume.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return { frontmatter: data as ResumeFrontmatter, content };
  } catch (error) {
    console.error("Failed to read resume.md:", error);
    return { 
      frontmatter: { name: "Error", title: "Could not load resume information", cvUrl: null }, 
      content: "Error loading resume content. Please check the server logs." 
    };
  }
}

export default async function ResumePage() {
  const { frontmatter } = await getResumeDocument();

  return (
    <div className="space-y-8">
      <Card className="shadow-xl bg-card/80 backdrop-blur-sm max-w-2xl mx-auto">
        <CardHeader className="text-center p-8">
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary">
            {frontmatter.name || 'My Resume'}
          </CardTitle>
          {frontmatter.title && (
            <CardDescription className="text-xl text-muted-foreground pt-2">
              {frontmatter.title}
            </CardDescription>
          )}
          {frontmatter.cvUrl && (
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={frontmatter.cvUrl} target="_blank" rel="noopener noreferrer">
                  <FileDown className="mr-2 h-5 w-5" /> Download CV
                </Link>
              </Button>
            </div>
          )}
          {!frontmatter.cvUrl && !frontmatter.name?.includes("Error") && (
             <CardDescription className="text-lg text-muted-foreground pt-6">
              CV download link is not available at the moment.
            </CardDescription>
          )}
          {frontmatter.name?.includes("Error") && (
            <CardDescription className="text-lg text-destructive pt-6">
              There was an error loading resume information. Please try again later.
            </CardDescription>
          )}
        </CardHeader>
        {/* CardContent and MarkdownRenderer removed to not display resume text on this page */}
      </Card>
    </div>
  );
}
