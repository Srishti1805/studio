
"use client";

import { useRef, useEffect, useState } from 'react'; 
// import fs from 'fs'; // This will cause an error in client component if not handled
// import path from 'path'; // This will cause an error in client component if not handled
// import matter from 'gray-matter'; // This will cause an error in client component if not handled
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MarkdownRenderer from '@/components/markdown-renderer';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

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

interface PageData {
  frontmatter: ResumeFrontmatter;
  summary: string;
  skillCategories: SkillCategory[];
}

// Placeholder data, as fs operations won't work in "use client" directly
// This data is now updated to reflect the new resume.md content
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
        { name: "Python (Django, Flask), Java (Spring Boot), Go" }, 
        { name: "JavaScript/TypeScript (React, Next.js, Node.js)" },
        { name: "HTML5, CSS3, Tailwind CSS, ShadCN UI" }
      ] 
    },
    { 
      category: "AI & Machine Learning", 
      skills: [
        { name: "TensorFlow, PyTorch, Scikit-learn" }, 
        { name: "Natural Language Processing (NLP), Computer Vision (CV)" },
        { name: "Genkit, LangChain, Hugging Face Transformers" },
        { name: "MLOps (Kubeflow, MLflow)" }
      ] 
    },
    { 
      category: "Cloud & DevOps", 
      skills: [
        { name: "AWS (EC2, S3, Lambda, SageMaker), GCP (Vertex AI, GKE)" },
        { name: "Docker, Kubernetes, Terraform, Ansible" },
        { name: "CI/CD (Jenkins, GitLab CI)" }
      ]
    },
     { 
      category: "Databases & Data Engineering", 
      skills: [
        { name: "PostgreSQL, MySQL, MongoDB, Cassandra" },
        { name: "Apache Kafka, Spark, Airflow" },
        { name: "Data Warehousing (Snowflake, BigQuery)" }
      ]
    },
  ],
};


// This async function CANNOT be directly used in a client component's main body.
// async function getResumeData(): Promise<PageData> {
//   // fs, path, matter calls would be here
//   return placeholderData; // Returning placeholder for now
// }


export default function HomePage() {
  // const { frontmatter, summary, skillCategories } = await getResumeData(); // This await is not allowed in client component.
  // We need to fetch data differently or pass it as props.
  // Using placeholder data directly for now to demonstrate animations.
  const { frontmatter, summary, skillCategories } = placeholderData;


  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const heroTaglineRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  const heroSocialsRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const separator1Ref = useRef<HTMLDivElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutCardRef = useRef<HTMLDivElement>(null);
  const separator2Ref = useRef<HTMLDivElement>(null);
  const skillsTitleRef = useRef<HTMLHeadingElement>(null);
  
  // Individual refs for skill cards
  const skillCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  skillCardRefs.current = skillCategories.map(
    (_, i) => skillCardRefs.current[i] ?? null
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
  const isSkillsTitleVisible = useIntersectionObserver(skillsTitleRef, { freezeOnceVisible: true, threshold: 0.3 });

  const skillCardIsVisible = skillCategories.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useIntersectionObserver(
      { current: skillCardRefs.current[index] },
      { freezeOnceVisible: true, threshold: 0.2 }
    )
  );

  // Effect to handle server-side data if this component were to fetch it
  // For now, this component uses placeholder data due to "use client"
  // If data were fetched:
  // const [pageData, setPageData] = useState<PageData | null>(null);
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getResumeData(); // This would need to be an API call or passed prop
  //     setPageData(data);
  //   }
  //   fetchData();
  // }, []);
  // if (!pageData) return <div>Loading...</div>; // Or a skeleton loader
  // const { frontmatter, summary, skillCategories } = pageData;


  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-12 md:py-20">
        <div className="md:w-2/3 space-y-6 text-center md:text-left">
          <h1
            ref={heroNameRef}
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl font-bold opacity-0",
              { 'animate-fadeInUp': isHeroNameVisible }
            )}
            style={{ animationDelay: '0s' }}
          >
            Hi, I&apos;m <span className="text-primary">{frontmatter.name || 'Your Name'}</span>
          </h1>
          <p
            ref={heroTaglineRef}
            className={cn(
              "text-xl sm:text-2xl text-muted-foreground opacity-0",
              { 'animate-fadeInUp': isHeroTaglineVisible }
            )}
            style={{ animationDelay: '0.1s' }}
          >
            {frontmatter.tagline || frontmatter.title || 'A Passionate Developer'}
          </p>
          <div
            ref={heroButtonsRef}
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center md:justify-start opacity-0",
              { 'animate-fadeInUp': isHeroButtonsVisible }
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
              "flex justify-center md:justify-start space-x-4 pt-4 opacity-0",
              { 'animate-fadeInUp': isHeroSocialsVisible }
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
            "md:w-1/3 flex justify-center mt-8 md:mt-0 opacity-0",
            { 'animate-fadeInUp': isHeroImageVisible }
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
          "my-12 bg-border/50 opacity-0",
          { 'animate-fadeInUp': isSeparator1Visible }
        )}
        style={{ animationDelay: '0.2s' }}
      />

      {/* About Me Section */}
      <section id="about" className="space-y-6 scroll-mt-20">
        <h2
          ref={aboutTitleRef}
          className={cn(
            "text-3xl md:text-4xl font-bold text-center text-primary opacity-0",
            { 'animate-fadeInUp': isAboutTitleVisible }
          )}
          style={{ animationDelay: '0s' }}
        >
          About Me
        </h2>
        <Card
          ref={aboutCardRef}
          className={cn(
            "shadow-xl bg-card/80 backdrop-blur-sm opacity-0",
            { 'animate-fadeInUp': isAboutCardVisible }
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
          "my-12 bg-border/50 opacity-0",
          { 'animate-fadeInUp': isSeparator2Visible }
        )}
        style={{ animationDelay: '0.2s' }}
      />

      {/* Skills Section */}
      <section id="skills" className="space-y-8 scroll-mt-20">
        <h2
          ref={skillsTitleRef}
          className={cn(
            "text-3xl md:text-4xl font-bold text-center text-primary opacity-0",
            { 'animate-fadeInUp': isSkillsTitleVisible }
          )}
          style={{ animationDelay: '0s' }}
        >
          My Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((categoryObj, index) => (
            <Card 
              key={categoryObj.category}
              ref={el => skillCardRefs.current[index] = el}
              className={cn(
                "shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm opacity-0",
                { 'animate-fadeInUp': skillCardIsVisible[index] }
              )}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
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
