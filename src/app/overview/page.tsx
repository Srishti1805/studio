import fs from 'fs';
import path from 'path';
import MarkdownRenderer from '@/components/markdown-renderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

async function getResumeContent(): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', 'resume.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const contentWithoutFrontmatter = fileContent.replace(/---[\s\S]*?---/, '').trim();
    return contentWithoutFrontmatter;
  } catch (error) {
    console.error("Failed to read resume.md:", error);
    return "Error loading resume content. Please check the server logs.";
  }
}

export default async function OverviewPage() {
  const resumeMarkdown = await getResumeContent();

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold text-center text-primary">
            My Professional Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MarkdownRenderer content={resumeMarkdown} />
        </CardContent>
      </Card>
    </div>
  );
}
