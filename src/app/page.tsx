import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MarkdownRenderer from '@/components/markdown-renderer';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';

interface ResumeFrontmatter {
  name?: string;
  title?: string;
  tagline?: string;
  profileImage?: string;
  dataAiHint?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  cvUrl?: string;
  [key: string]: any;
}

interface Skill {
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

async function getResumeData(): Promise<{
  frontmatter: ResumeFrontmatter;
  summary: string;
  skillCategories: SkillCategory[];
}> {
  const filePath = path.join(process.cwd(), 'src', 'content', 'resume.md');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const summaryMatch = content.match(/## Summary\n([\s\S]*?)(?=\n## Skills|\n## Experience|\n## Education|\n## Certifications|$)/);
  const summary = summaryMatch ? summaryMatch[1].trim() : "Summary not found.";

  const skillsSectionMatch = content.match(/## Skills\n([\s\S]*?)(?=\n## Experience|\n## Education|\n## Certifications|$)/);
  const skillCategories: SkillCategory[] = [];

  if (skillsSectionMatch) {
    const skillsText = skillsSectionMatch[1];
    const categoryRegex = /### (.*?)\n([\s\S]*?)(?=\n### |\n*$)/g;
    let match;
    while ((match = categoryRegex.exec(skillsText)) !== null) {
      const categoryName = match[1].trim();
      const skillsList = match[2]
        .split('\n')
        .map(s => s.replace(/- /g, '').trim())
        .filter(Boolean)
        .map(skillName => ({ name: skillName })); // Icons can be added here based on skillName
      skillCategories.push({ category: categoryName, skills: skillsList });
    }
  }

  return { frontmatter: data as ResumeFrontmatter, summary, skillCategories };
}


export default async function HomePage() {
  const { frontmatter, summary, skillCategories } = await getResumeData();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-12 md:py-20">
        <div className="md:w-2/3 space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold animate-fadeInUp opacity-0">
            Hi, I&apos;m <span className="text-primary">{frontmatter.name || 'Your Name'}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground animate-fadeInUp-delay-100 opacity-0">
            {frontmatter.tagline || frontmatter.title || 'A Passionate Developer'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fadeInUp-delay-200 opacity-0">
            {frontmatter.cvUrl && (
              <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link href={frontmatter.cvUrl} target="_blank" rel="noopener noreferrer">
                  <FileDown className="mr-2 h-5 w-5" /> Download CV
                </Link>
              </Button>
            )}
             <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-accent/50 transition-shadow">
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" /> Contact Me
                </Link>
              </Button>
          </div>
          <div className="flex justify-center md:justify-start space-x-4 pt-4 animate-fadeInUp-delay-300 opacity-0">
            {frontmatter.github && (
              <Link href={`https://${frontmatter.github}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={28} />
              </Link>
            )}
            {frontmatter.linkedin && (
              <Link href={`https://${frontmatter.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={28} />
              </Link>
            )}
            {frontmatter.email && (
              <Link href={`mailto:${frontmatter.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={28} />
              </Link>
            )}
          </div>
        </div>
        <div className="md:w-1/3 flex justify-center mt-8 md:mt-0 animate-fadeInUp-delay-400 opacity-0">
          {frontmatter.profileImage && (
            <Image
              src={frontmatter.profileImage}
              alt={frontmatter.name || 'Profile'}
              width={300}
              height={300}
              className="rounded-full border-4 border-primary/50 shadow-2xl object-cover"
              priority
              data-ai-hint={frontmatter.dataAiHint || "profile photo"}
            />
          )}
        </div>
      </section>

      <Separator className="my-12 bg-border/50 animate-fadeInUp-delay-200 opacity-0" />

      {/* About Me Section */}
      <section id="about" className="space-y-6 scroll-mt-20 animate-fadeInUp opacity-0" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">About Me</h2>
        <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6 text-lg leading-relaxed text-foreground/90">
            <MarkdownRenderer content={summary} />
          </CardContent>
        </Card>
      </section>
      
      <Separator className="my-12 bg-border/50 animate-fadeInUp opacity-0" style={{ animationDelay: '0.6s' }} />

      {/* Skills Section */}
      <section id="skills" className="space-y-8 scroll-mt-20 animate-fadeInUp opacity-0" style={{ animationDelay: '0.7s' }}>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">My Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((categoryObj, index) => (
            <Card 
              key={categoryObj.category} 
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm animate-fadeInUp opacity-0"
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="text-xl text-accent">{categoryObj.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {categoryObj.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center text-foreground/90">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
