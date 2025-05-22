
"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MarkdownRenderer from '@/components/markdown-renderer';
import { Github, Linkedin, Mail, FileDown, Building, CalendarDays, ExternalLink, GraduationCap } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
  logoUrl?: string;
  dataAiHint?: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface ExperienceItem {
  title: string;
  company: string;
  dates: string;
  responsibilities: string[];
  companyLogoUrl?: string;
  companyLogoDataAiHint?: string;
  timelineNote?: string;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  dataAiHint?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface EducationItem {
  degree: string;
  institution: string;
  dates: string;
  details?: string[];
  institutionLogoUrl?: string;
  institutionLogoDataAiHint?: string;
}


interface PageData {
  frontmatter: ResumeFrontmatter;
  summary: string;
  skillCategories: SkillCategory[]; // Kept for "Technologies I Use" section
  allSkillsWithLogos: Skill[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
}


const placeholderData: PageData = {
  frontmatter: {
    name: "Jane R. Doe",
    title: "Senior Software Engineer & AI Solutions Architect",
    tagline: "Building Innovative Solutions with a Passion for AI",
    profileImage: "https://placehold.co/300x300.png",
    dataAiHint: "professional portrait",
    email: "jane.r.doe@example.com",
    linkedin: "linkedin.com/in/janerdoe",
    github: "github.com/janerdoe",
    cvUrl: "/jane-r-doe-resume.pdf",
  },
  summary: "A results-oriented Senior Software Engineer with 7+ years of expertise in developing and architecting robust, scalable software solutions. Adept at leading cross-functional teams and leveraging AI/ML technologies to solve complex business problems. Proven track record of delivering high-impact projects from conception to deployment. Eager to apply advanced technical skills to drive innovation and user-centric product development.",
  skillCategories: [
    {
      category: "Core Technologies",
      skills: [
        { name: "Python", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "python logo" },
        { name: "Java", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "java logo" },
        { name: "Go", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "golang logo" },
        { name: "JavaScript", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "javascript logo" },
        { name: "TypeScript", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "typescript logo" },
        { name: "React", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "react logo" },
        { name: "Next.js", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "nextjs logo" },
        { name: "Node.js", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "nodejs logo" },
        { name: "HTML5", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "html5 logo" },
        { name: "CSS3", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "css3 logo" },
        { name: "Tailwind CSS", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "tailwind logo" },
        { name: "ShadCN UI" },
      ]
    },
    {
      category: "AI & Machine Learning",
      skills: [
        { name: "TensorFlow", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "tensorflow logo" },
        { name: "PyTorch", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "pytorch logo" },
        { name: "Scikit-learn", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "scikitlearn logo" },
        { name: "Natural Language Processing (NLP)" },
        { name: "Computer Vision (CV)" },
        { name: "Genkit", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "genkit logo" },
        { name: "Hugging Face Transformers", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "huggingface logo" },
        { name: "MLOps (Kubeflow, MLflow)" },
      ]
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "AWS", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "aws logo" },
        { name: "GCP", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "gcp logo" },
        { name: "Docker", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "docker logo" },
        { name: "Kubernetes", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "kubernetes logo" },
        { name: "Terraform", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "terraform logo" },
        { name: "Ansible" },
        { name: "CI/CD (Jenkins, GitLab CI)" },
      ]
    },
     {
      category: "Databases & Data Engineering",
      skills: [
        { name: "PostgreSQL", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "postgresql logo" },
        { name: "MySQL", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "mysql logo" },
        { name: "MongoDB", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "mongodb logo" },
        { name: "Cassandra" },
        { name: "Apache Kafka", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "kafka logo" },
        { name: "Apache Spark", logoUrl: "https://placehold.co/60x60.png", dataAiHint: "spark logo" },
        { name: "Airflow" },
        { name: "Data Warehousing (Snowflake, BigQuery)" },
      ]
    },
  ],
  allSkillsWithLogos: [], // Will be populated below
  experience: [
    {
      title: "Lead AI Engineer",
      company: "QuantumLeap AI",
      dates: "2020 - Present",
      responsibilities: [
        "Spearheaded the design and development of a cutting-edge predictive analytics platform using Python, TensorFlow, and Kubeflow, resulting in a 25% increase in operational efficiency for clients.",
        "Led a team of 5 AI engineers, fostering a collaborative and high-performance culture.",
        "Architected and deployed scalable AI models on AWS SageMaker, handling terabytes of data.",
      ],
      companyLogoUrl: "https://placehold.co/40x40.png",
      companyLogoDataAiHint: "company logo",
      timelineNote: "Key achievement: 25% efficiency boost.",
    },
    {
      title: "Senior Software Developer",
      company: "Tech Solutions Global",
      dates: "2017 - 2020",
      responsibilities: [
        "Developed and maintained critical backend services for a large-scale e-commerce platform using Java (Spring Boot) and microservices architecture.",
        "Implemented CI/CD pipelines, reducing deployment times by 40%.",
      ],
      companyLogoUrl: "https://placehold.co/40x40.png",
      companyLogoDataAiHint: "tech company",
      timelineNote: "Reduced deployment time by 40%.",
    },
    {
      title: "Software Engineer",
      company: "Alpha Innovations",
      dates: "2015 - 2017",
      responsibilities: [
        "Worked on developing new features for a SaaS product using Python (Django) and PostgreSQL.",
        "Participated in full software development lifecycle, from requirements gathering to testing and deployment.",
      ],
      companyLogoUrl: "https://placehold.co/40x40.png",
      companyLogoDataAiHint: "alpha logo",
      timelineNote: "Full SDLC participation.",
    },
  ],
  projects: [
    {
      id: '1',
      title: 'AI-Powered Task Manager',
      description: 'A smart task management application that uses AI to prioritize tasks and suggest optimal workflows. Built with Next.js, Tailwind CSS, and OpenAI API.',
      imageUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'task manager',
      tags: ['Next.js', 'AI', 'Tailwind CSS', 'Productivity'],
      githubUrl: 'https://github.com/janerdoe/ai-task-manager',
      liveUrl: '#',
    },
    {
      id: '2',
      title: 'E-commerce Analytics Dashboard',
      description: 'A comprehensive dashboard for e-commerce businesses to track sales, customer behavior, and inventory. Features real-time data visualization.',
      imageUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'dashboard analytics',
      tags: ['React', 'Node.js', 'Charts', 'Data Visualization'],
      githubUrl: 'https://github.com/janerdoe/ecommerce-dashboard',
    },
    {
      id: '3',
      title: 'Personal Portfolio Website (This!)',
      description: 'This very website! A showcase of my skills and projects, built with modern web technologies and a focus on clean design and user experience.',
      imageUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'portfolio website',
      tags: ['Next.js', 'TypeScript', 'ShadCN UI', 'GenAI'],
      githubUrl: 'https://github.com/janerdoe/personal-showcase',
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
  ],
  education: [
    {
      degree: "Master of Science in Artificial Intelligence",
      institution: "Carnegie Mellon University",
      dates: "2013 - 2015",
      details: [
        "Thesis: \"Advancements in Neural Network Architectures for Time Series Forecasting\"",
        "Specialization: Machine Learning and Large Scale Systems"
      ],
      institutionLogoUrl: "https://placehold.co/60x60.png",
      institutionLogoDataAiHint: "university logo carnegie"
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "Georgia Institute of Technology",
      dates: "2009 - 2013",
      details: [
        "Graduated Summa Cum Laude",
        "Capstone Project: \"Autonomous Robotic Navigation System\""
      ],
      institutionLogoUrl: "https://placehold.co/60x60.png",
      institutionLogoDataAiHint: "university logo georgia"
    }
  ],
};
// Populate allSkillsWithLogos from skillCategories
placeholderData.allSkillsWithLogos = placeholderData.skillCategories.flatMap(category => category.skills.filter(skill => skill.logoUrl));


export default function HomePage() {
  const { frontmatter, summary, experience, projects, education, allSkillsWithLogos } = placeholderData;

  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const heroTaglineRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  const heroSocialsRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  
  const separator1Ref = useRef<HTMLDivElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutCardRef = useRef<HTMLDivElement>(null);
  
  const separator2Ref = useRef<HTMLDivElement>(null);
  const experienceTitleRef = useRef<HTMLHeadingElement>(null);
  const experienceTimelineRef = useRef<HTMLDivElement>(null);
  
  const separator3Ref = useRef<HTMLDivElement>(null);
  const projectsTitleRef = useRef<HTMLHeadingElement>(null);
  
  const separator4Ref = useRef<HTMLDivElement>(null);
  const educationTitleRef = useRef<HTMLHeadingElement>(null);

  const separator5Ref = useRef<HTMLDivElement>(null); // Separator before Technologies
  const technologiesTitleRef = useRef<HTMLHeadingElement>(null);
  const technologiesLogosRef = useRef<HTMLDivElement>(null);

  const experienceCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  experienceCardRefs.current = experience.map(
    (_, i) => experienceCardRefs.current[i] ?? null
  );
  const experienceTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  experienceTextRefs.current = experience.map(
    (_, i) => experienceTextRefs.current[i] ?? null
  );
  const projectCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  projectCardRefs.current = projects.map(
    (_,i) => projectCardRefs.current[i] ?? null
  );
  const educationCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  educationCardRefs.current = education.map(
    (_,i) => educationCardRefs.current[i] ?? null
  );


  const isHeroNameVisible = useIntersectionObserver(heroNameRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isHeroTaglineVisible = useIntersectionObserver(heroTaglineRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isHeroButtonsVisible = useIntersectionObserver(heroButtonsRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isHeroSocialsVisible = useIntersectionObserver(heroSocialsRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isHeroImageVisible = useIntersectionObserver(heroImageRef, { freezeOnceVisible: true, threshold: 0.3 });
  
  const isSeparator1Visible = useIntersectionObserver(separator1Ref, { freezeOnceVisible: true, threshold: 0.1 });
  const isAboutTitleVisible = useIntersectionObserver(aboutTitleRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isAboutCardVisible = useIntersectionObserver(aboutCardRef, { freezeOnceVisible: true, threshold: 0.2 });
  
  const isSeparator2Visible = useIntersectionObserver(separator2Ref, { freezeOnceVisible: true, threshold: 0.1 });
  const isExperienceTitleVisible = useIntersectionObserver(experienceTitleRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isExperienceTimelineVisible = useIntersectionObserver(experienceTimelineRef, { freezeOnceVisible: true, threshold: 0.05 });
  
  const isSeparator3Visible = useIntersectionObserver(separator3Ref, { freezeOnceVisible: true, threshold: 0.1 });
  const isProjectsTitleVisible = useIntersectionObserver(projectsTitleRef, { freezeOnceVisible: true, threshold: 0.3 });
  
  const isSeparator4Visible = useIntersectionObserver(separator4Ref, { freezeOnceVisible: true, threshold: 0.1 });
  const isEducationTitleVisible = useIntersectionObserver(educationTitleRef, { freezeOnceVisible: true, threshold: 0.3 });

  const isSeparator5Visible = useIntersectionObserver(separator5Ref, { freezeOnceVisible: true, threshold: 0.1 });
  const isTechnologiesTitleVisible = useIntersectionObserver(technologiesTitleRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isTechnologiesLogosVisible = useIntersectionObserver(technologiesLogosRef, { freezeOnceVisible: true, threshold: 0.1 });

  const experienceCardIsVisible = experience.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useIntersectionObserver(
      { current: experienceCardRefs.current[index] },
      { freezeOnceVisible: true, threshold: 0.1 } 
    )
  );
  const experienceTextIsVisible = experience.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useIntersectionObserver(
      { current: experienceTextRefs.current[index] },
      { freezeOnceVisible: true, threshold: 0.1 }
    )
  );
  const projectCardIsVisible = projects.map((_, index) => 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useIntersectionObserver(
      { current: projectCardRefs.current[index] },
      { freezeOnceVisible: true, threshold: 0.1 }
    )
  );
  const educationCardIsVisible = education.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useIntersectionObserver(
      { current: educationCardRefs.current[index] },
      { freezeOnceVisible: true, threshold: 0.1 }
    )
  );


  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section id="home" className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-12 md:py-20">
        <div className="md:w-2/3 space-y-6 text-center md:text-left">
          <h1
            ref={heroNameRef}
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl font-bold",
              isHeroNameVisible ? 'animate-fadeInUp' : 'opacity-0'
            )}
            style={{ animationDelay: '0s' }}
          >
            Hi, I&apos;m <span className="text-primary">{frontmatter.name || 'Your Name'}</span>
          </h1>
          <p
            ref={heroTaglineRef}
            className={cn(
              "text-xl sm:text-2xl text-muted-foreground",
              isHeroTaglineVisible ? 'animate-fadeInUp' : 'opacity-0'
            )}
            style={{ animationDelay: '0.1s' }}
          >
            {frontmatter.tagline || frontmatter.title || 'A Passionate Developer'}
          </p>
          <div
            ref={heroButtonsRef}
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center md:justify-start",
              isHeroButtonsVisible ? 'animate-fadeInUp' : 'opacity-0'
            )}
            style={{ animationDelay: '0.2s' }}
          >
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
          <div
            ref={heroSocialsRef}
            className={cn(
              "flex justify-center md:justify-start space-x-4 pt-4",
              isHeroSocialsVisible ? 'animate-fadeInUp' : 'opacity-0'
            )}
            style={{ animationDelay: '0.3s' }}
          >
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
        <div
          ref={heroImageRef}
          className={cn(
            "md:w-1/3 flex justify-center mt-8 md:mt-0",
            isHeroImageVisible ? 'animate-fadeInUp' : 'opacity-0'
          )}
          style={{ animationDelay: '0.4s' }}
        >
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

      <Separator
        ref={separator1Ref}
        className={cn(
          "my-12 bg-border/50",
          isSeparator1Visible ? 'animate-fadeInUp' : 'opacity-0'
        )}
        style={{ animationDelay: '0s' }} 
      />

      {/* About Me Section */}
      <section id="about" className="space-y-6 scroll-mt-20">
        <h2
          ref={aboutTitleRef}
          className={cn(
            "text-3xl md:text-4xl font-bold text-center text-primary",
            isAboutTitleVisible ? 'animate-fadeInUp' : 'opacity-0'
          )}
          style={{ animationDelay: '0s' }}
        >
          About Me
        </h2>
        <Card
          ref={aboutCardRef}
          className={cn(
            "shadow-xl bg-card/80 backdrop-blur-sm",
            isAboutCardVisible ? 'animate-fadeInUp' : 'opacity-0'
          )}
          style={{ animationDelay: '0.1s' }}
        >
          <CardContent className="pt-6 text-lg leading-relaxed text-foreground/90">
            <MarkdownRenderer content={summary} />
          </CardContent>
        </Card>
      </section>

      <Separator
        ref={separator2Ref}
        className={cn(
          "my-12 bg-border/50",
          isSeparator2Visible ? 'animate-fadeInUp' : 'opacity-0'
        )}
        style={{ animationDelay: '0s' }}
      />

      {/* My Experience (Work) Section */}
      <section id="experience" className="space-y-12 scroll-mt-20">
        <h2
          ref={experienceTitleRef}
          className={cn(
            "text-3xl md:text-4xl font-bold text-center text-primary",
            isExperienceTitleVisible ? 'animate-fadeInUp' : 'opacity-0'
          )}
          style={{ animationDelay: '0s' }}
        >
          My Experience
        </h2>
        <div
          ref={experienceTimelineRef}
          className={cn(
            "relative", 
            isExperienceTimelineVisible ? 'animate-fadeInUp' : 'opacity-0'
          )}
          style={{ animationDelay: '0.1s' }}
        >
          {/* Central Timeline Line for Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-foreground/70 transform -translate-x-1/2 hidden md:block"></div>

          {experience.map((exp, index) => {
            const isCardLeft = index % 2 === 0; 
            return (
              <div
                key={exp.company + '-' + index}
                className={cn(
                  "mb-12 flex w-full items-start md:items-center"
                )}
              >
                {/* Mobile Layout */}
                <div className="flex md:hidden flex-col w-full items-start">
                   <div 
                    ref={el => { // Ref for the whole mobile block including logo
                      if (experienceCardRefs.current) {
                        experienceCardRefs.current[index] = el;
                      }
                    }}
                    className={cn("flex items-center mb-2", experienceCardIsVisible[index] ? 'animate-fadeInUp' : 'opacity-0')}
                    style={{ animationDelay: `${0.1 + index * 0.15}s` }}
                   >
                    {exp.companyLogoUrl && (
                      <Image
                        src={exp.companyLogoUrl}
                        alt={`${exp.company} logo`}
                        width={36}
                        height={36}
                        className="rounded-full object-contain bg-card/50 p-0.5 shadow-md mr-3 border-2 border-primary"
                        data-ai-hint={exp.companyLogoDataAiHint || "company logo"}
                      />
                    )}
                     <div className="h-1 w-10 bg-foreground/50 rounded-full mr-3"></div>
                  </div>
                  <Card 
                    className={cn(
                      "w-full shadow-xl bg-card/80 backdrop-blur-sm border border-foreground/50",
                      experienceCardIsVisible[index] ? 'animate-fadeInUp' : 'opacity-0' // Card animates with its block
                    )}
                     style={{ animationDelay: `${0.1 + index * 0.15}s` }}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl text-accent">{exp.title}</CardTitle>
                      <CardDescription className="text-muted-foreground/90">
                        <div className="flex items-center text-sm">
                          <Building className="mr-2 h-4 w-4" /> {exp.company}
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <CalendarDays className="mr-2 h-4 w-4" /> {exp.dates}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground/80 list-disc pl-5">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  {exp.timelineNote && (
                    <div 
                      ref={el => {
                        if(experienceTextRefs.current) {
                           experienceTextRefs.current[index] = el;
                        }
                      }}
                      className={cn(
                        "mt-3 text-sm text-muted-foreground italic pl-5",
                         experienceCardIsVisible[index] ? 'animate-fadeInUp' : 'opacity-0' // Note animates with its block
                      )}
                      style={{ animationDelay: `${0.15 + index * 0.15}s` }}
                    >
                      {exp.timelineNote}
                    </div>
                  )}
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex w-1/2 items-center justify-end">
                  {isCardLeft ? (
                    <Card
                      ref={el => {
                        if(experienceCardRefs.current) {
                          experienceCardRefs.current[index] = el;
                        }
                      }}
                      className={cn(
                        "w-full max-w-md shadow-xl bg-card/80 backdrop-blur-sm border border-foreground/50 mr-8",
                        experienceCardIsVisible[index] ? 'animate-fadeInLeft' : 'opacity-0'
                      )}
                      style={{ animationDelay: `${0.1 + index * 0.15}s` }}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl text-accent">{exp.title}</CardTitle>
                        <CardDescription className="text-muted-foreground/90">
                          <div className="flex items-center text-sm"><Building className="mr-2 h-4 w-4" />{exp.company}</div>
                          <div className="flex items-center text-sm mt-1"><CalendarDays className="mr-2 h-4 w-4" />{exp.dates}</div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-foreground/80 list-disc pl-5">
                          {exp.responsibilities.map((resp, i) => (<li key={i}>{resp}</li>))}
                        </ul>
                      </CardContent>
                    </Card>
                  ) : (
                    <div 
                      ref={el => {
                        if(experienceTextRefs.current) {
                           experienceTextRefs.current[index] = el;
                        }
                      }}
                      className={cn(
                        "w-full max-w-md text-right text-muted-foreground italic pr-8",
                         experienceTextIsVisible[index] ? 'animate-fadeInLeft' : 'opacity-0'
                      )}
                      style={{ animationDelay: `${0.15 + index * 0.15}s` }}
                    >
                      {exp.timelineNote}
                    </div>
                  )}
                </div>

                {/* Timeline Marker with Company Logo (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center z-10">
                  {exp.companyLogoUrl && (
                     <div className={cn("h-10 w-10 rounded-full bg-primary border-2 border-background shadow-md flex items-center justify-center", experienceCardIsVisible[index] || experienceTextIsVisible[index] ? 'animate-fadeInUp' : 'opacity-0' )} style={{ animationDelay: `${0.05 + index * 0.15}s` }}>
                        <Image
                            src={exp.companyLogoUrl}
                            alt={`${exp.company} logo`}
                            width={28}
                            height={28}
                            className="rounded-full object-contain"
                            data-ai-hint={exp.companyLogoDataAiHint || "company logo"}
                        />
                     </div>
                  )}
                </div>
                
                <div className="hidden md:flex w-1/2 items-center justify-start">
                  {!isCardLeft ? (
                     <Card
                      ref={el => {
                        if(experienceCardRefs.current) {
                           experienceCardRefs.current[index] = el;
                        }
                      }}
                      className={cn(
                        "w-full max-w-md shadow-xl bg-card/80 backdrop-blur-sm border border-foreground/50 ml-8",
                        experienceCardIsVisible[index] ? 'animate-fadeInRight' : 'opacity-0'
                      )}
                      style={{ animationDelay: `${0.1 + index * 0.15}s` }}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl text-accent">{exp.title}</CardTitle>
                        <CardDescription className="text-muted-foreground/90">
                          <div className="flex items-center text-sm"><Building className="mr-2 h-4 w-4" />{exp.company}</div>
                          <div className="flex items-center text-sm mt-1"><CalendarDays className="mr-2 h-4 w-4" />{exp.dates}</div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-foreground/80 list-disc pl-5">
                          {exp.responsibilities.map((resp, i) => (<li key={i}>{resp}</li>))}
                        </ul>
                      </CardContent>
                    </Card>
                  ) : (
                     <div 
                      ref={el => {
                        if(experienceTextRefs.current) {
                           experienceTextRefs.current[index] = el;
                        }
                      }}
                      className={cn(
                        "w-full max-w-md text-left text-muted-foreground italic ml-8",
                        experienceTextIsVisible[index] ? 'animate-fadeInRight' : 'opacity-0'
                      )}
                      style={{ animationDelay: `${0.15 + index * 0.15}s` }}
                    >
                      {exp.timelineNote}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Separator
        ref={separator3Ref}
        className={cn(
          "my-12 bg-border/50",
          isSeparator3Visible ? 'animate-fadeInUp' : 'opacity-0'
        )}
        style={{ animationDelay: '0s' }}
      />

      {/* Projects Section */}
      <section id="projects" className="space-y-10 scroll-mt-20">
        <h2
          ref={projectsTitleRef}
          className={cn(
            "text-3xl md:text-4xl font-bold text-center text-primary",
            isProjectsTitleVisible ? 'animate-fadeInUp' : 'opacity-0'
          )}
          style={{ animationDelay: '0s' }}
        >
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              ref={el => {
                if (projectCardRefs.current) {
                  projectCardRefs.current[index] = el;
                }
              }}
              className={cn(
                "flex flex-col overflow-hidden bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1",
                projectCardIsVisible[index] ? 'animate-fadeInUp' : 'opacity-0'
              )}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="relative w-full h-52 group">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
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
      </section>

      <Separator
        ref={separator4Ref}
        className={cn(
          "my-12 bg-border/50",
          isSeparator4Visible ? 'animate-fadeInUp' : 'opacity-0'
        )}
        style={{ animationDelay: '0s' }}
      />

      {/* Education Section */}
      <section id="education" className="space-y-10 scroll-mt-20">
        <h2
          ref={educationTitleRef}
          className={cn(
            "text-3xl md:text-4xl font-bold text-center text-primary",
            isEducationTitleVisible ? 'animate-fadeInUp' : 'opacity-0'
          )}
          style={{ animationDelay: '0s' }}
        >
          My Education
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <Card
              key={edu.institution + '-' + index}
              ref={el => {
                if(educationCardRefs.current) {
                  educationCardRefs.current[index] = el;
                }
              }}
              className={cn(
                "flex flex-col bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-shadow duration-300",
                educationCardIsVisible[index] ? 'animate-fadeIn' : 'opacity-0' // Changed to animate-fadeIn
              )}
              style={{ animationDelay: `${0.1 + index * 0.15}s` }}
            >
              <CardHeader className="flex flex-row items-start gap-4">
                {edu.institutionLogoUrl && (
                  <Image
                    src={edu.institutionLogoUrl}
                    alt={`${edu.institution} logo`}
                    width={56} 
                    height={56}
                    className="rounded-lg object-contain bg-muted/30 p-1 shadow-sm border border-border/50 mt-1"
                    data-ai-hint={edu.institutionLogoDataAiHint || "university logo"}
                  />
                )}
                <div className="flex-1">
                  <CardTitle className="text-xl text-accent">{edu.degree}</CardTitle>
                  <CardDescription className="text-muted-foreground/90">
                    <div className="flex items-center text-sm mt-1">
                      <GraduationCap className="mr-2 h-4 w-4 text-primary/80" /> {edu.institution}
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      <CalendarDays className="mr-2 h-4 w-4" /> {edu.dates}
                    </div>
                  </CardDescription>
                </div>
              </CardHeader>
              {edu.details && edu.details.length > 0 && (
                <CardContent>
                  <ul className="space-y-1.5 text-sm text-foreground/80 list-disc pl-5">
                    {edu.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      <Separator
        ref={separator5Ref}
        className={cn(
          "my-12 bg-border/50",
          isSeparator5Visible ? 'animate-fadeInUp' : 'opacity-0'
        )}
        style={{ animationDelay: '0s' }}
      />

      {/* Technologies Section */}
      <section id="technologies" className="space-y-8 scroll-mt-20">
        <h2
          ref={technologiesTitleRef}
          className={cn(
            "text-3xl md:text-4xl font-bold text-center text-primary",
            isTechnologiesTitleVisible ? 'animate-fadeInUp' : 'opacity-0'
          )}
          style={{ animationDelay: '0s' }}
        >
          Technologies I Use
        </h2>
        <div
          ref={technologiesLogosRef}
          className={cn(
            "flex flex-wrap justify-center items-center gap-6 md:gap-8",
            isTechnologiesLogosVisible ? 'animate-fadeInUp' : 'opacity-0'
          )}
          style={{ animationDelay: '0.1s' }}
        >
          {allSkillsWithLogos.map((skill) => (
            skill.logoUrl && (
              <div
                key={skill.name}
                title={skill.name}
                className="group p-2 transition-transform duration-300 ease-in-out hover:scale-110"
              >
                <Image
                  src={skill.logoUrl}
                  alt={`${skill.name} logo`}
                  width={60}
                  height={60}
                  className="rounded-full object-contain bg-card/50 p-1 shadow-md group-hover:shadow-primary/40"
                  data-ai-hint={skill.dataAiHint || skill.name.toLowerCase()}
                />
              </div>
            )
          ))}
        </div>
      </section>
    </div>
  );
}

