import Image from 'next/image';
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
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-primary">My Projects</h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        Here are some of the projects I've worked on, showcasing my skills in various technologies and my passion for creating impactful solutions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full h-48">
              <Image 
                src={project.imageUrl} 
                alt={project.title} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={project.dataAiHint} 
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <CardDescription className="text-sm h-20 overflow-y-auto">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button variant="default" size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
