
"use client";

import { useRef } from 'react';
// import fs from 'fs'; // This will cause an error in client component if not handled
// import path from 'path'; // This will cause an error in client component if not handled
// import matter from 'gray-matter'; // This will cause an error in client component if not handled
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MarkdownRenderer from '@/components/markdown-renderer';
import { Github, Linkedin, Mail, FileDown, Check, CalendarDays, Briefcase, Building } from 'lucide-react';
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
  logoUrl?: string; // URL for the logo image
  dataAiHint?: string; // Hint for placeholder logo image
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
}

interface PageData {
  frontmatter: ResumeFrontmatter;
  summary: string;
  skillCategories: SkillCategory[];
  allSkillsWithLogos: Skill[]; 
  experience: ExperienceItem[];
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
  allSkillsWithLogos: [], 
  experience: [
    {
      title: "Lead AI Engineer",
      company: "QuantumLeap AI",
      dates: "2020 - Present",
      responsibilities: [
        "Spearheaded the design and development of a cutting-edge predictive analytics platform using Python, TensorFlow, and Kubeflow, resulting in a 25% increase in operational efficiency for clients.",
        "Led a team of 5 AI engineers, fostering a collaborative and high-performance culture.",
        "Architected and deployed scalable AI models on AWS SageMaker, handling terabytes of data.",
        "Published 2 papers on novel machine learning techniques at industry conferences.",
      ],
    },
    {
      title: "Senior Software Developer",
      company: "Tech Solutions Global",
      dates: "2017 - 2020",
      responsibilities: [
        "Developed and maintained critical backend services for a large-scale e-commerce platform using Java (Spring Boot) and microservices architecture.",
        "Implemented CI/CD pipelines, reducing deployment times by 40%.",
        "Contributed to the front-end development using React and Redux.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Alpha Innovations",
      dates: "2015 - 2017",
      responsibilities: [
        "Worked on developing new features for a SaaS product using Python (Django) and PostgreSQL.",
        "Participated in full software development lifecycle, from requirements gathering to testing and deployment.",
      ],
    },
  ],
};
placeholderData.allSkillsWithLogos = placeholderData.skillCategories.flatMap(category => category.skills.filter(skill => skill.logoUrl));


export default function HomePage() {
  const { frontmatter, summary, skillCategories, allSkillsWithLogos, experience } = placeholderData;

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
  const separator3Ref = useRef<HTMLDivElement>(null);
  const technologiesTitleRef = useRef<HTMLHeadingElement>(null);
  const technologiesLogosRef = useRef<HTMLDivElement>(null);
  const separator4Ref = useRef<HTMLDivElement>(null);
  const experienceTitleRef = useRef<HTMLHeadingElement>(null);
  const experienceTimelineRef = useRef<HTMLDivElement>(null);
  
  const skillCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  skillCardRefs.current = skillCategories.map(
    (_, i) => skillCardRefs.current[i] ?? null
  );

  const experienceCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  experienceCardRefs.current = experience.map(
    (_, i) => experienceCardRefs.current[i] ?? null
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
  const isSeparator3Visible = useIntersectionObserver(separator3Ref, { freezeOnceVisible: true, threshold: 0.1 });
  const isTechnologiesTitleVisible = useIntersectionObserver(technologiesTitleRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isTechnologiesLogosVisible = useIntersectionObserver(technologiesLogosRef, { freezeOnceVisible: true, threshold: 0.1 });
  const isSeparator4Visible = useIntersectionObserver(separator4Ref, { freezeOnceVisible: true, threshold: 0.1 });
  const isExperienceTitleVisible = useIntersectionObserver(experienceTitleRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isExperienceTimelineVisible = useIntersectionObserver(experienceTimelineRef, { freezeOnceVisible: true, threshold: 0.05 });


  const skillCardIsVisible = skillCategories.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useIntersectionObserver(
      { current: skillCardRefs.current[index] },
      { freezeOnceVisible: true, threshold: 0.2 }
    )
  );

  const experienceCardIsVisible = experience.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useIntersectionObserver(
      { current: experienceCardRefs.current[index] },
      { freezeOnceVisible: true, threshold: 0.15 } // Lower threshold for timeline items
    )
  );


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
                      <Check className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator
        ref={separator3Ref}
        className={cn(
          "my-12 bg-border/50 opacity-0",
          { 'animate-fadeInUp': isSeparator3Visible }
        )}
        style={{ animationDelay: '0.2s' }}
      />

      {/* Technologies Section */}
      <section id="technologies" className="space-y-8 scroll-mt-20">
        <h2
          ref={technologiesTitleRef}
          className={cn(
            "text-3xl md:text-4xl font-bold text-center text-primary opacity-0",
            { 'animate-fadeInUp': isTechnologiesTitleVisible }
          )}
          style={{ animationDelay: '0s' }}
        >
          Technologies I Use
        </h2>
        <div
          ref={technologiesLogosRef}
          className={cn(
            "flex flex-wrap justify-center items-center gap-6 md:gap-8 opacity-0",
            { 'animate-fadeInUp': isTechnologiesLogosVisible }
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

       <Separator
        ref={separator4Ref}
        className={cn(
          "my-12 bg-border/50 opacity-0",
          { 'animate-fadeInUp': isSeparator4Visible }
        )}
        style={{ animationDelay: '0.2s' }}
      />

      {/* Experience Section */}
      <section id="experience" className="space-y-12 scroll-mt-20">
        <h2
          ref={experienceTitleRef}
          className={cn(
            "text-3xl md:text-4xl font-bold text-center text-primary opacity-0",
            { 'animate-fadeInUp': isExperienceTitleVisible }
          )}
          style={{ animationDelay: '0s' }}
        >
          My Experience
        </h2>
        <div 
          ref={experienceTimelineRef}
          className={cn("relative opacity-0", { 'animate-fadeInUp': isExperienceTimelineVisible })}
          style={{ animationDelay: '0.1s' }}
        >
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border/70 transform -translate-x-1/2 hidden md:block"></div>

          {experience.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                ref={el => experienceCardRefs.current[index] = el}
                className={cn(
                  "mb-12 flex md:items-center w-full opacity-0",
                  isLeft ? "md:flex-row-reverse" : "md:flex-row",
                  { 
                    'animate-fadeInRight': experienceCardIsVisible[index] && isLeft,
                    'animate-fadeInLeft': experienceCardIsVisible[index] && !isLeft,
                    'animate-fadeInUp': experienceCardIsVisible[index] && !isLeft && !isLeft, // Fallback for mobile
                  }
                )}
                style={{ animationDelay: `${0.2 + index * 0.2}s` }}
              >
                {/* Timeline Dot for Desktop */}
                <div className="hidden md:flex w-1/2 justify-center">
                  <div className={cn(
                    "absolute w-1/2 flex",
                    isLeft ? "justify-start pl-[calc(50%-0.75rem)]" : "justify-end pr-[calc(50%-0.75rem)]"
                  )}>
                     <div className="z-10 h-6 w-6 rounded-full bg-primary border-4 border-background shadow-md"></div>
                  </div>
                </div>
                 {/* Timeline Dot for Mobile (aligned with card) */}
                <div className="flex md:hidden items-center mr-4">
                   <div className="z-10 h-5 w-5 rounded-full bg-primary border-2 border-background shadow-md"></div>
                </div>


                <Card className={cn(
                  "w-full md:w-[calc(50%-2rem)] shadow-xl bg-card/80 backdrop-blur-sm",
                  isLeft ? "md:mr-8" : "md:ml-8"
                )}>
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
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
