
"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MarkdownRenderer from '@/components/markdown-renderer';
import { Github, Linkedin, Mail, Building, CalendarDays, ExternalLink, GraduationCap, Lightbulb, Palette, Brain, Database, Code, FileDown } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ResumeFrontmatter {
  name?: string;
  title?: string;
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

interface AboutHighlightItem {
  name: string;
  icon: React.ElementType;
  borderColorClass: string;
}


interface PageData {
  frontmatter: ResumeFrontmatter;
  summary: string;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  allSkillsWithLogos: Skill[];
  aboutMeHighlights: AboutHighlightItem[];
}


const placeholderData: PageData = {
  frontmatter: {
    name: "Srishti Sadanand Adkar",
    title: "Software Engineer & AI Solutions Architect",
    profileImage: "/logos/Srishti.png", 
    dataAiHint: "professional portrait",
    email: "sadkar@seattleu.edu",
    linkedin: "https://www.linkedin.com/in/srishti-adkar-3022411b1/",
    github: "github.com/Srishti1805",
    cvUrl: "/Resume/resume.pdf",
  },
  summary: "I'm a passionate software developer and AI/ML enthusiast with a strong foundation in programming, data engineering, and intelligent system design. I enjoy building end-to-end solutions — from developing machine learning models to deploying them in scalable cloud environments.\n\nI'm proficient in Python, SQL, and Java, and skilled in using frameworks like Scikit-learn, TensorFlow, and XGBoost. I work comfortably with cloud platforms such as AWS, Azure, and GCP, and have hands-on experience with tools like Docker, REST APIs, and data visualization dashboards.\n\nWhether it’s crafting clean code, automating data pipelines, or solving complex problems with machine learning, I’m driven by curiosity, creativity, and the impact of technology. Let’s build something amazing together!",
  experience: [
    {
      title: "AI/ML Engineer Intern",
      company: "HSBC",
      dates: "11/2024 – Present | Remote, USA",
      responsibilities: [
        "Worked on development of an advanced Claims Fraud Detection System, collaborating with cross-functional teams to gather requirements and define key fraud detection metrics, aligning closely with business objectives to achieve a 25% gain in fraud detection accuracy.",
        "Aligned with data engineering teams to design and used a robust ETL pipeline using Python, SQL, and AWS tools, automating data extraction and preprocessing from diverse sources, which led to a 40% progress in data processing efficiency and timeliness.",
        "Developed and trained a fraud detection model utilizing historical claims data (e.g., claim amounts, claimant history, claim frequency) with machine learning techniques, including Random Forest and XGBoost, resulting in a 30% reduction in fraud detection errors and higher operational reliability.",
        "Executed advanced hyperparameter tuning using GridSearchCV, optimizing key model parameters such as max depth, learning rate, and number of estimators for XGBoost, driving a 15% increase in model precision and recall.",
        "Integrated innovative AI-powered anomaly detection through Autoencoder Networks, identifying outlier claims and improving detection of sophisticated fraudulent activities by 20% over traditional methods.",
        "Collaborated seamlessly with DevOps teams to deploy the optimized model into AWS Sagemaker and Docker for smooth integration into HSBC’s claims processing pipeline and cutting claim review time by 35%, further enhancing operational efficiency.",
      ],
      companyLogoUrl: "/logos/hsbc-logo.png",
      companyLogoDataAiHint: "HSBC logo",
      timelineNote: "Claims Fraud Detection System",
    },
    {
      title: "Teaching Assistant (TA)",
      company: "Seattle University, Seattle, WA",
      dates: "Courses: Programming and Problem Solving in C++ (Mar 2024 – Jun 2024), Big Data Analytics",
      responsibilities: [
        "Assisted students with core C++ programming concepts, including data structures, algorithms, and debugging techniques.",
        "Guided students through programming assignments, provided one-on-one support, and conducted review sessions to strengthen problem-solving skills.",
        "Created supplementary learning materials and contributed to assignment grading and feedback.",
        "Supported students in configuring and managing AWS EC2 instances, teaching cloud infrastructure best practices.",
        "Facilitated lab sessions involving Docker and AWS, helping students complete hands-on projects in big data environments."
      ],
      companyLogoUrl: "/logos/seattle-uni-logo.png", 
      companyLogoDataAiHint: "university logo seattle",
      timelineNote: "Guided students in C++ & Big Data Analytics.",
    },
    {
      title: "Software Engineer Intern",
      company: "St. Francis House",
      dates: "06/2024 – 09/2024 | Seattle, WA, USA",
      responsibilities: [
        "Developed data pipelines for automated data ingestion and preprocessing, leveraging Python and SQL to manage large-scale datasets on AWS and GCP.",
        "Designed SQL queries for sub-second latency and integrated them into REST APIs to support high-traffic production environments.",
        "Automated data migration between AWS and GCP, ensuring zero data loss by applying data wrangling best practices.",
        "Implemented a machine learning model (e.g., Random Forest or XGBoost) for predictive analytics, optimizing data workflows and improving data processing efficiency.",
      ],
      companyLogoUrl: "/logos/st-francis-logo.png", 
      companyLogoDataAiHint: "st francis house logo",
      timelineNote: "Data pipeline development & ML model implementation.",
    },
    {
      title: "ML Engineer",
      company: "Atomic Loops Pvt Ltd",
      dates: "10/2021 – 08/2023 | Pune, India",
      responsibilities: [
        "Collaborated with cross-functional teams in requirement gathering sessions to understand business objectives, ensuring alignment of the Audio Analysis PoC Project with the company’s goals and identifying key performance indicators for accurate prediction.",
        "Collected, cleaned, and preprocessed large-scale audio data using Python libraries such as Pandas, NumPy, and Scikit-learn, while leveraging Azure Data Factory to automate the ETL pipeline and ensure efficient data integration and storage.",
        "Developed machine learning models for audio analysis, experimenting with different algorithms like CNNs and RNNs to classify audio into categories such as speech, music, and environmental sounds.",
        "Applied hyperparameter tuning techniques using GridSearchCV and RandomizedSearchCV to optimize model performance, fine-tuning key parameters to improve classification accuracy and event detection in audio signals.",
        "Implemented feature engineering strategies using audio processing techniques like MFCC, spectrograms, and chroma features to enhance model prediction capability and capture a more comprehensive view of the audio data.",
        "Deployed the optimized audio analysis models to production using Azure Machine Learning Service, collaborating closely with the DevOps team to automate deployment pipelines and ensure seamless integration with existing systems.",
        "Created an interactive dashboard to visualize and analyze audio features and predictions, providing stakeholders with actionable insights and facilitating data-driven decision-making in audio-based applications.",
      ],
      companyLogoUrl: "/logos/atomic-loops-logo.png",
      companyLogoDataAiHint: "atomic loops logo",
      timelineNote: "Audio Analysis PoC & ML Model Deployment.",
    },
  ],
  projects: [
    {
      id: '1',
      title: 'RetinaFace – A Face Detection Tool',
      description: 'Developed an advanced face detection system using the RetinaFace architecture, leveraging deep learning techniques to achieve high accuracy and real-time performance. Implemented the model using Python and PyTorch, with support for multi-scale detection and facial landmark localization. Integrated pre-trained models and optimized inference pipelines for efficient deployment in various computer vision applications.',
      imageUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'face detection',
      tags: ['Computer Vision', 'Deep Learning', 'PyTorch', 'Python', 'Face Detection'],
      githubUrl: '#',
      liveUrl: '#',
    },
    {
      id: '2',
      title: "SUMAZON – Seattle University's Campus Store Website",
      description: "Developed a full-stack e-commerce web application for Seattle University's campus store, designed to streamline product browsing, purchasing, and inventory management. Utilized a three-tier architecture with React for the frontend, Django for the backend, and PL/SQL for the database layer, ensuring seamless user interaction and robust data handling.",
      imageUrl: '/logos/sumazon.jpeg',
      dataAiHint: 'ecommerce website',
      tags: ['React', 'Django', 'PL/SQL', 'Full Stack', 'E-commerce'],
    },
    {
      id: '3',
      title: 'Diamond Data Analysis and Modeling',
      description: 'Conducted a comprehensive machine learning project to analyze and predict diamond prices, classify diamond types, and group similar diamonds. Implemented regression, clustering, and classification techniques using models like Linear Regression, Random Forest, Decision Trees, and K-Means. Preprocessed a dataset of 6,400+ entries by handling missing values, encoding categorical features, and performing exploratory data analysis. Integrated the final models into a Flask application for interactive use and achieved up to 93% accuracy in diamond type classification.',
      imageUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'data analysis diamond',
      tags: ['Machine Learning', 'Data Analysis', 'Python', 'Flask', 'Regression', 'Classification', 'Clustering'],
      githubUrl: '#',
      liveUrl: '#',
    },
    {
      id: '4',
      title: 'Retrieval-Augmented Generation (RAG) System for Document-Based QA',
      description: "Built a Retrieval-Augmented Generation (RAG) system to enable context-aware question answering over custom PDF and text documents. Leveraged LangChain for document loading, text splitting, and embedding using OpenAI Embeddings. Stored vector representations in ChromaDB and implemented semantic search to retrieve relevant context based on user queries. Integrated the pipeline with OpenAI's GPT model to generate accurate, grounded responses. The system supports efficient retrieval, scalable storage, and intelligent response generation, showcasing practical applications of RAG in enterprise search and knowledge management.",
      imageUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'rag system document',
      tags: ['RAG', 'LangChain', 'OpenAI', 'ChromaDB', 'NLP', 'GenAI'],
      githubUrl: '#',
      liveUrl: '#',
    },
  ],
  education: [
     {
      degree: "Master of Science in Computer Science",
      institution: "Seattle University – Seattle, WA",
      dates: "09/2023 – 06/2025",
      details: [],
      institutionLogoUrl: "/logos/seattle-uni-logo.png",
      institutionLogoDataAiHint: "university logo seattle"
    },
    {
      degree: "Bachelor of Engineering (Hons) in Computer Science",
      institution: "Pune University – Pune, India",
      dates: "08/2018 – 07/2022",
      details: [],
      institutionLogoUrl: "/logos/pune-uni-logo.png",
      institutionLogoDataAiHint: "university logo pune"
    }
  ],
  allSkillsWithLogos: [
      { name: "Python", logoUrl: "/logos/python.png", dataAiHint: "python logo" },
      { name: "Java", logoUrl: "/logos/java.png", dataAiHint: "java logo" },
      { name: "JavaScript", logoUrl: "/logos/javascript.png", dataAiHint: "javascript logo" },
      { name: "TypeScript", logoUrl: "/logos/typescript.png", dataAiHint: "typescript logo" },
      { name: "React", logoUrl: "/logos/react.png", dataAiHint: "react logo" },
      { name: "Next.js", logoUrl: "/logos/nextjs.png", dataAiHint: "nextjs logo" },
      { name: "Node.js", logoUrl: "/logos/nodejs.png", dataAiHint: "nodejs logo" },
      { name: "HTML5", logoUrl: "/logos/html5.png", dataAiHint: "html5 logo" },
      { name: "CSS3", logoUrl: "/logos/css3.png", dataAiHint: "css3 logo" },
      { name: "TensorFlow", logoUrl: "/logos/tensorflow.png", dataAiHint: "tensorflow logo" },
      { name: "PyTorch", logoUrl: "/logos/pytorch.png", dataAiHint: "pytorch logo" },
      { name: "AWS", logoUrl: "/logos/aws.png", dataAiHint: "aws logo" },
      { name: "GCP", logoUrl: "/logos/gcp.png", dataAiHint: "gcp logo" },
      { name: "Azure", logoUrl: "/logos/azure.png", dataAiHint: "azure logo"},
      { name: "Docker", logoUrl: "/logos/docker.png", dataAiHint: "docker logo" },
      { name: "Kubernetes", logoUrl: "/logos/kubernetes.png", dataAiHint: "kubernetes logo" },
      { name: "PostgreSQL", logoUrl: "/logos/postgresql.png", dataAiHint: "postgresql logo" },
      { name: "MySQL", logoUrl: "/logos/mysql.png", dataAiHint: "mysql logo" },
      { name: "MongoDB", logoUrl: "/logos/mongodb.png", dataAiHint: "mongodb logo" },
      { name: "Apache Kafka", logoUrl: "/logos/kafka.png", dataAiHint: "kafka logo" },
  ],
  aboutMeHighlights: [
    { name: "Full Stack Development", icon: Code, borderColorClass: "border-primary" },
    { name: "Machine Learning", icon: Brain, borderColorClass: "border-accent" },
    { name: "Data Engineering", icon: Database, borderColorClass: "border-chart-3" },
    { name: "UI/UX Design", icon: Palette, borderColorClass: "border-chart-4" },
  ],
};


export default function HomePage() {
  const { frontmatter, summary, experience, projects, education, allSkillsWithLogos, aboutMeHighlights } = placeholderData;

  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const heroSocialsRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  const heroBannerImageRef = useRef<HTMLDivElement>(null);

  const separator1Ref = useRef<HTMLDivElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutCardRef = useRef<HTMLDivElement>(null);
  const aboutHighlightsRef = useRef<HTMLDivElement>(null);

  const separator2Ref = useRef<HTMLDivElement>(null);
  const experienceTitleRef = useRef<HTMLHeadingElement>(null);
  const experienceTimelineRef = useRef<HTMLDivElement>(null);

  const separator3Ref = useRef<HTMLDivElement>(null);
  const projectsTitleRef = useRef<HTMLHeadingElement>(null);

  const separator4Ref = useRef<HTMLDivElement>(null);
  const educationTitleRef = useRef<HTMLHeadingElement>(null);

  const separator5Ref = useRef<HTMLDivElement>(null);
  const technologiesTitleRef = useRef<HTMLHeadingElement>(null);
  const technologiesLogosRef = useRef<HTMLDivElement>(null);

  const experienceCardRefs = useRef<(HTMLDivElement | null)[]>(experience.map(() => null));
  const experienceTextRefs = useRef<(HTMLDivElement | null)[]>(experience.map(() => null));
  const projectCardRefs = useRef<(HTMLDivElement | null)[]>(projects.map(() => null));
  const educationCardRefs = useRef<(HTMLDivElement | null)[]>(education.map(() => null));


  const isHeroNameVisible = useIntersectionObserver(heroNameRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isHeroSocialsVisible = useIntersectionObserver(heroSocialsRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isHeroImageVisible = useIntersectionObserver(heroImageRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isHeroButtonsVisible = useIntersectionObserver(heroButtonsRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isHeroBannerImageVisible = useIntersectionObserver(heroBannerImageRef, { freezeOnceVisible: true, threshold: 0.1 });

  const isSeparator1Visible = useIntersectionObserver(separator1Ref, { freezeOnceVisible: true, threshold: 0.1 });
  const isAboutTitleVisible = useIntersectionObserver(aboutTitleRef, { freezeOnceVisible: true, threshold: 0.3 });
  const isAboutCardVisible = useIntersectionObserver(aboutCardRef, { freezeOnceVisible: true, threshold: 0.2 });
  const isAboutHighlightsVisible = useIntersectionObserver(aboutHighlightsRef, { freezeOnceVisible: true, threshold: 0.1 });

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
            Hi, I&apos;m <span className="text-primary">{frontmatter.name?.split(' ')[0] || 'Srishti'}</span>
          </h1>
          {(frontmatter.title) && (
             <p
              className={cn(
                "text-xl sm:text-2xl text-muted-foreground",
                isHeroNameVisible ? 'animate-fadeInUp' : 'opacity-0'
              )}
              style={{ animationDelay: '0.1s' }}
            >
              {frontmatter.title}
            </p>
          )}
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
           {frontmatter.cvUrl && (
            <div
              ref={heroButtonsRef}
              className={cn(
                "pt-6 flex justify-center md:justify-start",
                isHeroButtonsVisible ? 'animate-fadeInUp' : 'opacity-0'
              )}
              style={{ animationDelay: '0.4s' }}
            >
              <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link href={frontmatter.cvUrl} target="_blank" rel="noopener noreferrer">
                  <FileDown className="mr-2 h-5 w-5" /> Download CV
                </Link>
              </Button>
            </div>
          )}
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

      {/* Banner Image Section */}
      <div
        ref={heroBannerImageRef}
        className={cn(
          "relative w-full h-56 sm:h-64 md:h-80 my-8 md:my-12 rounded-lg shadow-xl overflow-hidden",
          isHeroBannerImageVisible ? 'animate-fadeInUp' : 'opacity-0'
        )}
        style={{ animationDelay: '0.1s' }}
      >
        <Image
          src="/logos/background.png" 
          alt="Abstract technology banner"
          fill
          className="object-cover"
          data-ai-hint="tech banner"
          priority
        />
      </div>


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
            "shadow-xl bg-card/80 backdrop-blur-sm max-w-3xl mx-auto",
            isAboutCardVisible ? 'animate-fadeInUp' : 'opacity-0'
          )}
          style={{ animationDelay: '0.1s' }}
        >
          <CardContent className="pt-6 text-lg leading-relaxed text-foreground/90">
            <MarkdownRenderer content={summary} />
             <div
              ref={aboutHighlightsRef}
              className={cn(
                "mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                isAboutHighlightsVisible ? 'animate-fadeInUp' : 'opacity-0'
              )}
              style={{ animationDelay: '0.2s' }}
            >
              {aboutMeHighlights.map((highlight) => (
                <div
                  key={highlight.name}
                  className={cn(
                    "flex flex-col items-center justify-center text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-default bg-secondary/60 border-2",
                    highlight.borderColorClass
                  )}
                >
                  <highlight.icon className="h-10 w-10 mb-3 text-foreground/90" />
                  <span className="font-semibold text-md text-foreground/90">{highlight.name}</span>
                </div>
              ))}
            </div>
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
          
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-foreground/70 transform -translate-x-1/2 hidden md:block"></div>

          {experience.map((exp, index) => {
            const isCardLeft = index % 2 === 0;
            return (
              <div
                key={exp.company + '-' + index}
                className={cn("mb-12 flex w-full items-start md:items-center")}
              >
                 {/* Mobile View */}
                <div className={cn("flex md:hidden flex-col w-full items-start",
                     experienceCardIsVisible[index] || experienceTextIsVisible[index] ? 'animate-fadeInUp' : 'opacity-0')}
                      style={{ animationDelay: `${0.1 + index * 0.15}s` }}>
                   <div className="flex items-center mb-2 w-full">
                    {exp.companyLogoUrl && (
                      <Image
                        src={exp.companyLogoUrl}
                        alt={`${exp.company} logo`}
                        width={36}
                        height={36}
                        className="rounded-md object-contain bg-card/50 shadow-md mr-3 border-2 border-primary p-0.5"
                        data-ai-hint={exp.companyLogoDataAiHint || "company logo"}
                      />
                    )}
                     <div className="h-1 flex-grow bg-foreground/50 rounded-full mr-3"></div> 
                  </div>
                  <Card
                    ref={el => { if (experienceCardRefs.current) { experienceCardRefs.current[index] = el; } }}
                    className={cn(
                      "w-full shadow-xl bg-card/80 backdrop-blur-sm border border-foreground/50" ,
                       experienceCardIsVisible[index] ? 'animate-fadeInUp' : 'opacity-0' 
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
                       ref={el => { if (experienceTextRefs.current && experienceTextRefs.current[index] === null ) { experienceTextRefs.current[index] = el;}}}
                      className={cn(
                        "mt-3 text-sm text-muted-foreground italic pl-5",
                        experienceCardIsVisible[index] || experienceTextIsVisible[index] ? 'animate-fadeInUp' : 'opacity-0' 
                      )}
                       style={{ animationDelay: `${0.15 + index * 0.15}s` }}
                    >
                      {exp.timelineNote}
                    </div>
                  )}
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex w-1/2 items-center justify-end">
                  {isCardLeft ? (
                    <Card
                      ref={el => { if (experienceCardRefs.current) { experienceCardRefs.current[index] = el; } }}
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
                      ref={el => { if (experienceTextRefs.current) { experienceTextRefs.current[index] = el; } }}
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

                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center z-10">
                  {exp.companyLogoUrl && (
                     <div className={cn(
                        "h-14 w-14 rounded-full bg-card border-2 border-primary shadow-md flex items-center justify-center",
                        (experienceCardIsVisible[index] || experienceTextIsVisible[index]) ? 'animate-fadeInUp' : 'opacity-0'
                       )}
                       style={{ animationDelay: `${0.05 + index * 0.15}s` }}>
                        <Image
                            src={exp.companyLogoUrl}
                            alt={`${exp.company} logo`}
                            width={48}
                            height={48}
                            className="rounded-md object-contain"
                            data-ai-hint={exp.companyLogoDataAiHint || "company logo"}
                        />
                     </div>
                  )}
                </div>

                <div className="hidden md:flex w-1/2 items-center justify-start">
                  {!isCardLeft ? (
                     <Card
                      ref={el => { if (experienceCardRefs.current) { experienceCardRefs.current[index] = el; } }}
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
                      ref={el => { if (experienceTextRefs.current) { experienceTextRefs.current[index] = el; } }}
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
                educationCardIsVisible[index] ? 'animate-fadeIn' : 'opacity-0'
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
                  className="rounded-md object-contain bg-card/50 p-1 shadow-md group-hover:shadow-primary/40"
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
