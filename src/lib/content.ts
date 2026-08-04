export const articles: {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  body: { heading: string; paragraphs: string[]; list?: string[] }[];
}[] = [
  {
    slug: "cost-of-missed-calls-kosovo-call-centers",
    title: "The real cost of a missed call in a Kosovo call centre",
    description:
      "A practical model for calculating what unanswered calls cost your operation each month — and why the number is usually larger than the payroll you are protecting.",
    date: "2026-01-14",
    readingTime: "7 min read",
    category: "Operations",
    body: [
      {
        heading: "Missed calls are a silent line item",
        paragraphs: [
          "Every contact centre tracks average handling time and occupancy. Very few track the calls that never entered the queue in a meaningful, financial way. Yet abandoned and unanswered calls are where the largest recoverable margin usually hides.",
          "In a typical Kosovo operation running eight to twenty seats, between 20% and 45% of offered calls go unanswered at peak. Callers do not leave voicemails. They call the next number on the list.",
        ],
      },
      {
        heading: "A model you can run in five minutes",
        paragraphs: [
          "Take your monthly offered calls, multiply by your unanswered rate to get lost contacts. Multiply lost contacts by the share that would have converted or been retained, then by average value. That is your monthly leakage.",
        ],
        list: [
          "6,000 offered calls per month",
          "28% unanswered = 1,680 lost contacts",
          "12% would have converted = 202 lost outcomes",
          "€45 average value = roughly €9,000 lost per month",
        ],
      },
      {
        heading: "Why hiring is the expensive fix",
        paragraphs: [
          "Peak demand is not flat. To answer the 09:00–11:00 spike you must staff for the spike, which means paying for idle capacity for the rest of the day. Add recruitment, training, attrition and supervision and the effective cost of coverage climbs well beyond the salary line.",
          "Automation of tier-1 volume changes the shape of the problem. Concurrency is effectively unlimited, so the peak stops being a staffing question and becomes a routing question.",
        ],
      },
      {
        heading: "What to measure after you automate",
        paragraphs: [
          "Containment rate is the headline number, but it is not sufficient on its own. Track resolution quality, escalation rate, customer sentiment and — most importantly — the revenue or retention attributable to conversations that previously would not have been answered at all.",
        ],
      },
    ],
  },
  {
    slug: "ai-receptionist-vs-hiring-receptionist",
    title: "AI receptionist vs hiring: an honest comparison",
    description:
      "Where an AI receptionist clearly wins, where a human is still the right answer, and how most operators end up running both.",
    date: "2026-01-28",
    readingTime: "6 min read",
    category: "Strategy",
    body: [
      {
        heading: "Coverage is not a fair fight",
        paragraphs: [
          "One receptionist covers about 40 hours per week and one conversation at a time. An AI receptionist covers all 168 hours and handles concurrent calls without a queue. For any business where enquiries arrive outside office hours, this alone changes the economics.",
        ],
      },
      {
        heading: "Consistency and quality assurance",
        paragraphs: [
          "Humans have good days and bad days. An AI receptionist delivers the same greeting, the same qualifying questions and the same compliance disclosures on call one thousand as on call one. Every conversation is transcribed and scored, so quality assurance moves from a 2% sample to complete coverage.",
        ],
      },
      {
        heading: "Where humans still win",
        paragraphs: [
          "Emotional complexity, negotiation, high-value retention and genuinely novel problems remain human territory. The mistake is asking a skilled agent to spend six hours a day reading order statuses aloud.",
          "The strongest operations we work with use AI as the front door and humans as the specialists behind it — with a clean, well-defined escalation policy in between.",
        ],
      },
      {
        heading: "The practical recommendation",
        paragraphs: [
          "Route overflow and after-hours to AI first. Measure containment for thirty days. Then decide whether to expand automation into your primary queue. Almost nobody regrets starting with the calls they were already losing.",
        ],
      },
    ],
  },
  {
    slug: "albanian-language-ai-voice-agents",
    title: "What it takes to build an AI voice agent that speaks real Albanian",
    description:
      "Dialect, latency, barge-in and code-switching: the engineering details that separate a usable Albanian voice agent from a demo.",
    date: "2026-02-09",
    readingTime: "8 min read",
    category: "Technology",
    body: [
      {
        heading: "Generic models are not enough",
        paragraphs: [
          "Large speech models handle Albanian, but they are typically weighted towards standard Tosk-influenced pronunciation and formal register. Real callers in Kosovo speak Gheg, shorten words, and mix in English and German loanwords without warning.",
          "Without domain adaptation on real call audio, recognition accuracy drops precisely where it matters most: names, addresses, and numbers.",
        ],
      },
      {
        heading: "Latency is a product feature",
        paragraphs: [
          "Anything above roughly 800 milliseconds of response delay makes a voice agent feel broken. Achieving sub-600ms requires streaming recognition, speculative response generation and text-to-speech that begins before the full answer is composed.",
        ],
      },
      {
        heading: "Barge-in and turn-taking",
        paragraphs: [
          "Real conversations interrupt each other. An agent that cannot be interrupted mid-sentence feels like an IVR, and callers immediately start pressing zero. Reliable barge-in detection, combined with graceful recovery when the caller and the agent speak simultaneously, is what makes the interaction feel human.",
        ],
        list: [
          "Streaming ASR with endpointing tuned for Albanian prosody",
          "Interruption handling that discards the in-flight response",
          "Number, date and address normalisation for local formats",
          "Fallback to a human when confidence drops below threshold",
        ],
      },
      {
        heading: "Evaluation, continuously",
        paragraphs: [
          "A voice agent is never finished. We score every conversation, review low-confidence turns weekly, and retrain on the failures. That loop — not the initial build — is what moves containment from 40% to 70% over a quarter.",
        ],
      },
    ],
  },
  {
    slug: "gdpr-call-recording-kosovo",
    title: "GDPR, call recording and AI: what Kosovo operators need to get right",
    description:
      "A plain-language checklist for handling recordings, transcripts and AI processing without creating compliance exposure.",
    date: "2026-02-22",
    readingTime: "5 min read",
    category: "Compliance",
    body: [
      {
        heading: "Kosovo law tracks the GDPR closely",
        paragraphs: [
          "The Law on Personal Data Protection mirrors most GDPR principles: lawful basis, purpose limitation, data minimisation, and the rights of data subjects. If you serve EU clients, you are almost certainly in scope of the GDPR itself as a processor.",
        ],
      },
      {
        heading: "Practical checklist",
        paragraphs: [
          "Most exposure comes from the basics being skipped rather than from anything exotic.",
        ],
        list: [
          "Announce recording at the start of the call, in the caller's language",
          "Define and enforce a retention period for audio and transcripts",
          "Sign a data processing agreement with every AI vendor",
          "Keep processing inside the EU where your clients require it",
          "Be able to locate and delete a specific caller's data on request",
          "Redact payment and identity data from stored transcripts",
        ],
      },
      {
        heading: "Ask your vendor these questions",
        paragraphs: [
          "Where is audio processed and stored? Is your data used to train shared models? Can retention be configured per client? Is a dedicated instance available? A vendor that cannot answer these quickly is a vendor that has not thought about them.",
        ],
      },
    ],
  },
];
