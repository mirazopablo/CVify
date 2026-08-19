import type { ResumeData } from "./resume-types"

/** Small stable-ish id generator for array items (client-only). */
export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
}

export const emptyResume: ResumeData = {
  language: "en",
  theme: {
    accent: "#1f6feb",
    text: "#1a1a1a",
    muted: "#5c5c5c",
  },
  header: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
    photo: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  references: [],
  publications: [],
}

export const sampleResume: ResumeData = {
  language: "en",
  theme: {
    accent: "#1f6feb",
    text: "#1a1a1a",
    muted: "#5c5c5c",
  },
  header: {
    fullName: "Alex Morgan",
    jobTitle: "Senior Backend Engineer",
    email: "alex.morgan@email.com",
    phone: "+1 (555) 012-3456",
    location: "Austin, TX",
    website: "alexmorgan.dev",
    github: "github.com/alexmorgan",
    linkedin: "linkedin.com/in/alexmorgan",
    photo: "",
  },
  summary:
    "Backend engineer with 8+ years building scalable, fault-tolerant distributed systems. Specialized in Go and Node.js microservices, event-driven architectures, and cloud infrastructure. Proven record of reducing latency and cutting infrastructure costs while leading small, high-performing teams.",
  experience: [
    {
      id: "exp1",
      role: "Senior Backend Engineer",
      company: "Nimbus Data",
      location: "Remote",
      startDate: "2021",
      endDate: "",
      current: true,
      description:
        "Led migration of a monolith to 12 event-driven microservices, cutting p99 latency by 40%.\nDesigned a multi-region PostgreSQL topology serving 20M+ daily requests.\nMentored 4 engineers and established the team's code-review and on-call standards.",
    },
    {
      id: "exp2",
      role: "Backend Engineer",
      company: "Corewave",
      location: "Austin, TX",
      startDate: "2017",
      endDate: "2021",
      current: false,
      description:
        "Built billing and subscription services processing $5M+ monthly.\nIntroduced contract testing that reduced integration incidents by 60%.",
    },
  ],
  education: [
    {
      id: "edu1",
      degree: "B.S. in Computer Science",
      institution: "University of Texas at Austin",
      location: "Austin, TX",
      startDate: "2013",
      endDate: "2017",
      description: "Graduated with honors. Focus on distributed systems and databases.",
    },
  ],
  skills: [
    { id: "sk1", category: "Languages", items: "Go, TypeScript, Python, SQL" },
    { id: "sk2", category: "Frameworks", items: "Node.js, Express, gRPC, React" },
    { id: "sk3", category: "Infrastructure", items: "AWS, Docker, Kubernetes, Terraform, Kafka" },
  ],
  projects: [
    {
      id: "pr1",
      name: "OpenQueue",
      url: "github.com/alexmorgan/openqueue",
      description: "A lightweight distributed task queue with at-least-once delivery guarantees.",
      tech: "Go, Redis, gRPC",
    },
  ],
  languages: [
    { id: "ln1", name: "English", level: "Native" },
    { id: "ln2", name: "Spanish", level: "Professional (C1)" },
  ],
  references: [
    { id: "rf1", name: "Jordan Lee", relation: "Engineering Manager, Nimbus Data", contact: "jordan.lee@email.com" },
  ],
  publications: [
    {
      id: "pb1",
      title: "Scaling Event-Driven Systems Without the Pain",
      publisher: "ACM Queue",
      date: "2022",
      url: "queue.acm.org/scaling-eds",
    },
  ],
}
