import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownRenderer from '@/components/markdown-renderer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

async function getResumeDocument(): Promise<{ frontmatter: any, content: string }> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', 'resume.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return { frontmatter: data, content };
  } catch (error) {
    console.error("Failed to read resume.md:", error);
    return { 
      frontmatter: { name: "Error", title: "Could not load resume" }, 
      content: "Error loading resume content. Please check the server logs." 
    };
  }
}

export default async function ResumePage() {
  const { frontmatter, content } = await getResumeDocument();

  // Exclude Summary and Skills from the main resume page if they are displayed on home.
  // This is a simple way; more robust parsing might be needed for complex structures.
  let displayContent = content;
  displayContent = displayContent.replace(/## Summary[\s\S]*?(?=\n## Skills|\n## Experience|\n## Education|\n## Certifications|$)/, '');
  displayContent = displayContent.replace(/## Skills[\s\S]*?(?=\n## Experience|\n## Education|\n## Certifications|$)/, '');


  return (
    <div className="space-y-8">
      <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary">
            {frontmatter.name || 'My Resume'}
          </CardTitle>
          {frontmatter.title && (
            <CardDescription className="text-xl text-muted-foreground pt-1">
              {frontmatter.title}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <MarkdownRenderer content={displayContent.trim()} />
        </CardContent>
      </Card>
    </div>
  );
}
