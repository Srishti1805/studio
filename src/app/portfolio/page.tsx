import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  dataAiHint?: string;
};

const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Task Manager',
    description: 'A smart task management application that uses AI to prioritize tasks and suggest optimal workflows. Built with Next.js, Tailwind CSS, and OpenAI API.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'task manager',
    tags: ['Next.js', 'AI', 'Tailwind CSS', 'Productivity'],
    githubUrl: 'https://github.com/yourusername/ai-task-manager',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'E-commerce Analytics Dashboard',
    description: 'A comprehensive dashboard for e-commerce businesses to track sales, customer behavior, and inventory. Features real-time data visualization.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dashboard analytics',
    tags: ['React', 'Node.js', 'Charts', 'Data Visualization'],
    githubUrl: 'https://github.com/yourusername/ecommerce-dashboard',
  },
  {
    id: '3',
    title: 'Personal Portfolio Website',
    description: 'This very website! A showcase of my skills and projects, built with modern web technologies and a focus on clean design and user experience.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'portfolio website',
    tags: ['Next.js', 'TypeScript', 'ShadCN UI', 'GenAI'],
    githubUrl: 'https://github.com/yourusername/personal-showcase',
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'Recipe Finder App',
    description: 'A mobile-friendly app that helps users discover new recipes based on ingredients they have. Integrated with a recipe API.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'recipe app',
    tags: ['React Native', 'API Integration', 'Mobile App'],
    liveUrl: '#',
  },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">My Projects</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here are some of the projects I&apos;ve worked on, showcasing my skills in various technologies and my passion for creating impactful solutions.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card 
            key={project.id} 
            className="flex flex-col overflow-hidden bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative w-full h-52">
              <Image 
                src={project.imageUrl} 
                alt={project.title} 
                layout="fill" 
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={project.dataAiHint} 
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl text-foreground hover:text-primary transition-colors">
                {project.liveUrl ? (
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </Link>
                ) : project.githubUrl ? (
                   <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </Link>
                ) : (
                  project.title
                )}
              </CardTitle>
              <CardDescription className="text-sm h-20 overflow-y-auto text-muted-foreground/80">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-secondary/70 text-secondary-foreground/90">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 p-4 bg-card/50">
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild className="border-primary/50 text-primary/90 hover:bg-primary/10 hover:text-primary">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Link>
                </Button>
              )}
              {project.liveUrl && (
                <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
