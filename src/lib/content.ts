export type Feature = {
  title: string;
  description: string;
  glyph: string;
  detail?: string[];
};

export const outcomes: {
  stat: string;
  label: string;
  note: string;
}[] = [
  {
    stat: "0s",
    label: "Average answer time",
    note: "Every call picked up on the first ring, including 03:00 and holidays.",
  },
  {
    stat: "68%",
    label: "Conversations fully resolved",
    note: "Tier-1 volume closed without a human agent touching the ticket.",
  },
  {
    stat: "3.4x",
    label: "More qualified bookings",
    note: "Missed calls turn into confirmed appointments and callbacks.",
  },
  {
    stat: "24/7",
    label: "Coverage in 5 languages",
    note: "Albanian, English, Serbian, German and Turkish on one number.",
  },
];

export const platformPillars: Feature[] = [
  {
    glyph: "◆",
    title: "Native Albanian voice, not a translation layer",
    description:
      "Trained on Kosovo dialects, Gheg pronunciation and real call-centre transcripts, so callers never ask to be transferred to a human because they were misunderstood.",
    detail: [
      "Gheg and standard Albanian, plus English, Serbian, German, Turkish",
      "Sub-600ms response latency on local carriers",
      "Barge-in support: callers can interrupt naturally",
    ],
  },
  {
    glyph: "◇",
    title: "Answers, books, verifies and escalates",
    description:
      "Zana is not an IVR tree. It understands intent, checks your systems, completes the task and only routes to a human when policy or emotion demands it.",
    detail: [
      "Appointment booking with live calendar availability",
      "Order status, invoices and account lookups via API",
      "Identity verification with configurable rules",
    ],
  },
  {
    glyph: "○",
    title: "Sits on top of your existing stack",
    description:
      "Keep your numbers, your CRM and your agents. Zana connects to what you already run and starts taking overflow within days, not quarters.",
    detail: [
      "SIP / VoIP trunking, Twilio, 3CX, Asterisk, FreePBX",
      "CRM sync: HubSpot, Zoho, Pipedrive, Salesforce, custom REST",
      "WhatsApp, Viber, web chat and email from the same brain",
    ],
  },
  {
    glyph: "□",
    title: "A control room, not a black box",
    description:
      "Every conversation is transcribed, scored and searchable. You see containment, sentiment, revenue influenced and where the AI handed off — live.",
    detail: [
      "Live queue, transcripts and call recordings",
      "Quality scoring on 12 dimensions per conversation",
      "Exportable reporting for clients and stakeholders",
    ],
  },
];

export const capabilities: Feature[] = [
  {
    glyph: "01",
    title: "Inbound reception",
    description:
      "Greets, identifies the caller, understands the reason for calling and resolves or routes in one pass.",
  },
  {
    glyph: "02",
    title: "Overflow & after-hours",
    description:
      "Catches the 30–60% of calls that go unanswered at peak and every call outside working hours.",
  },
  {
    glyph: "03",
    title: "Appointment setting",
    description:
      "Reads live availability, books, reschedules, and sends SMS confirmations to reduce no-shows.",
  },
  {
    glyph: "04",
    title: "Lead qualification",
    description:
      "Scores intent against your criteria and pushes clean, structured records into your CRM.",
  },
  {
    glyph: "05",
    title: "Order & ticket status",
    description:
      "Pulls real data from your systems and answers 'where is my order' without a human in the loop.",
  },
  {
    glyph: "06",
    title: "Outbound follow-up",
    description:
      "Callbacks, payment reminders, satisfaction checks and reactivation campaigns on schedule.",
  },
  {
    glyph: "07",
    title: "Escalation with context",
    description:
      "When a human is needed, the agent receives a full summary before they say hello.",
  },
  {
    glyph: "08",
    title: "Quality assurance",
    description:
      "100% of calls reviewed automatically — not the 2% sample your QA team can listen to.",
  },
];

export const steps: { step: string; title: string; body: string; days: string }[] =
  [
    {
      step: "01",
      title: "Discovery & call audit",
      days: "Day 1–3",
      body: "We listen to a sample of your real calls, map the top intents, and quantify what missed and mishandled calls are costing you every month.",
    },
    {
      step: "02",
      title: "Build & train",
      days: "Day 4–10",
      body: "We write your knowledge base, connect your telephony and CRM, and train Zana on your scripts, tone, offers and escalation policy.",
    },
    {
      step: "03",
      title: "Shadow mode",
      days: "Day 11–14",
      body: "Zana answers in parallel with your team on a test number. You review transcripts and approve every behaviour before a single customer hears it.",
    },
    {
      step: "04",
      title: "Go live & optimise",
      days: "Day 15 onward",
      body: "We route real traffic, watch containment daily, and tune weekly. You get a named specialist and a monthly performance review.",
    },
  ];

export const solutions: {
  slug: string;
  name: string;
  headline: string;
  body: string;
  wins: string[];
}[] = [
  {
    slug: "call-centers",
    name: "Call centres & BPOs",
    headline: "Take on more seats without hiring more seats",
    body: "Zana absorbs tier-1 volume so your agents handle the conversations that actually need judgement. Margins improve, SLAs stop slipping, and you can bid on contracts your headcount could not previously support.",
    wins: [
      "Answer 100% of offered calls, even at 09:00 Monday peak",
      "Cut average handling time by summarising before transfer",
      "Deliver client-ready QA reporting on every interaction",
    ],
  },
  {
    slug: "clinics",
    name: "Clinics & dental",
    headline: "Stop losing patients to a busy signal",
    body: "Reception is answering the person in front of them. Zana answers the phone, books into your calendar, confirms by SMS and calls back no-shows — in Albanian, without a script that sounds robotic.",
    wins: [
      "Bookings captured after 17:00 and on weekends",
      "Automatic reminders that cut no-shows",
      "Triage rules that escalate urgent cases instantly",
    ],
  },
  {
    slug: "hospitality",
    name: "Hotels & restaurants",
    headline: "Every reservation request answered in the guest's language",
    body: "Guests call from Germany, Switzerland, Turkey and Serbia. Zana handles reservations, availability, directions and special requests in five languages, then writes it into your PMS.",
    wins: [
      "Multilingual reservations without multilingual staff",
      "Upsells offered consistently on every call",
      "Group and event enquiries routed to sales with context",
    ],
  },
  {
    slug: "retail-logistics",
    name: "Retail & logistics",
    headline: "Order status calls, resolved without a human",
    body: "The highest-volume, lowest-value call in your queue is 'where is my package'. Zana pulls the real record, answers in seconds, and files the exception when something is genuinely wrong.",
    wins: [
      "Real-time lookups from your order system",
      "Returns and exchanges initiated on the call",
      "Peak-season volume absorbed with zero hiring",
    ],
  },
  {
    slug: "financial-services",
    name: "Banks, insurance & fintech",
    headline: "Compliant first-line support at scale",
    body: "Configurable verification, strict disclosure scripts, full recording and retention controls. Zana handles balance, claim and policy enquiries and hands off anything requiring an adviser.",
    wins: [
      "Deterministic scripts where regulation requires them",
      "Complete audit trail on every conversation",
      "GDPR-aligned data handling and EU data residency",
    ],
  },
  {
    slug: "real-estate",
    name: "Real estate & property",
    headline: "Never miss the buyer who calls once",
    body: "Property enquiries are time-sensitive and single-attempt. Zana answers instantly, qualifies budget and timeline, books the viewing and notifies the agent before the caller hangs up.",
    wins: [
      "Instant response to portal and ad enquiries",
      "Qualification against budget, area and timeline",
      "Viewings booked directly into agent calendars",
    ],
  },
];

export const plans: {
  name: string;
  price: string;
  cadence: string;
  summary: string;
  includes: string[];
  cta: string;
  featured?: boolean;
  meta: string;
}[] = [
  {
    name: "Reception",
    price: "$499",
    cadence: "per month",
    meta: "Up to 1,000 answered conversations",
    summary:
      "The full AI receptionist for a single location or a focused inbound queue. Live in two weeks.",
    includes: [
      "24/7 inbound answering in 5 languages",
      "Up to 1,000 answered conversations / month",
      "Appointment booking + SMS confirmations",
      "Calendar, email and CRM integration",
      "Live dashboard, transcripts and recordings",
      "Warm transfer to your team with summary",
      "Guided onboarding + 14-day shadow mode",
      "Email support, next-business-day response",
    ],
    cta: "Start with Reception",
  },
  {
    name: "Operations",
    price: "$1,290",
    cadence: "per month",
    meta: "Up to 4,000 answered conversations",
    featured: true,
    summary:
      "For call centres and multi-site operators running real volume across voice and messaging.",
    includes: [
      "Everything in Reception",
      "Up to 4,000 answered conversations / month",
      "WhatsApp, Viber, web chat and email agent",
      "Outbound callbacks and follow-up campaigns",
      "Custom API and database integrations",
      "Automated QA scoring on 100% of calls",
      "Named success specialist + monthly tuning",
      "Priority support, 4-hour response SLA",
    ],
    cta: "Scale with Operations",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual agreement",
    meta: "Unlimited volume, dedicated infrastructure",
    summary:
      "Dedicated capacity, custom voice, and contractual SLAs for regulated and high-volume operations.",
    includes: [
      "Everything in Operations",
      "Unlimited conversation volume",
      "Dedicated instance and EU data residency",
      "Custom branded voice and persona",
      "99.9% uptime SLA with penalties",
      "SSO, role-based access, audit logs",
      "White-label option for BPO resellers",
      "Quarterly business review with our team",
    ],
    cta: "Talk to us",
  },
];

export const inclusions: string[] = [
  "Discovery call audit",
  "Knowledge base build",
  "Telephony integration",
  "CRM & calendar sync",
  "Voice + persona tuning",
  "14-day shadow mode",
  "Live analytics dashboard",
  "Call recordings & transcripts",
  "Escalation rules",
  "Monthly optimisation",
  "GDPR-aligned handling",
  "No setup fee",
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Does the AI actually speak natural Albanian?",
    a: "Yes. Zana is tuned on Kosovo Albanian, including Gheg pronunciation and the code-switching people actually use on the phone. It also handles English, Serbian, German and Turkish, and switches language mid-call when the caller does. You can hear real recorded samples on your discovery call before you commit to anything.",
  },
  {
    q: "What happens when the AI cannot handle something?",
    a: "It escalates. You define the rules — refund thresholds, complaint keywords, detected frustration, VIP accounts — and Zana transfers the caller to the right human with a written summary already in their screen. Nothing is left in limbo, and no caller is trapped in a loop.",
  },
  {
    q: "Will this replace my agents?",
    a: "It replaces the queue, not the people. Most operators keep their team and redeploy them onto retention, complex cases and outbound revenue work, while Zana absorbs the repetitive tier-1 volume that burns agents out and inflates cost per contact.",
  },
  {
    q: "How long does it take to go live?",
    a: "Two weeks from kickoff for the Reception plan. Days 1–3 are discovery and call audit, days 4–10 are build and training, days 11–14 are shadow mode where the AI answers on a test line and you approve every behaviour. Complex integrations may add a week.",
  },
  {
    q: "What does $499 per month actually include?",
    a: "The full product: 24/7 answering in five languages, up to 1,000 answered conversations, booking, CRM and calendar integration, transcripts, recordings, the live dashboard, warm transfer, onboarding and shadow mode. There is no setup fee and no per-minute surprise billing on the base plan.",
  },
  {
    q: "How does this compare with hiring a receptionist?",
    a: "One full-time agent in Kosovo covers roughly 40 hours a week and answers one call at a time. Zana covers 168 hours a week, answers unlimited concurrent calls, never has a bad day, and costs less than a single salary — while producing a transcript and quality score for every conversation.",
  },
  {
    q: "Is our customer data safe?",
    a: "Conversations are encrypted in transit and at rest, processed on EU infrastructure, and retained only as long as your policy specifies. We sign a DPA, support GDPR data-subject requests, and Enterprise customers can run on a dedicated instance with strict residency guarantees.",
  },
  {
    q: "Can we keep our current phone number and provider?",
    a: "Yes. Zana sits on top of your existing telephony — SIP trunks, Twilio, 3CX, Asterisk, FreePBX or your carrier. Nothing needs to be ripped out, and you can route only a percentage of traffic while you build confidence.",
  },
  {
    q: "What if it does not work for us?",
    a: "You see performance in shadow mode before a single customer is exposed to it, and monthly plans are month-to-month with 30 days' notice. If containment does not hit the target we agreed in discovery, we keep tuning at no extra cost or you walk away.",
  },
];

export const testimonials: {
  quote: string;
  name: string;
  role: string;
  org: string;
}[] = [
  {
    quote:
      "We were losing roughly 40% of calls between 12:00 and 14:00. Now nothing goes unanswered, and our agents finally spend their day on the cases that need a person.",
    name: "Arb\u00ebr K.",
    role: "Operations Director",
    org: "Outsourced contact centre, Prishtina",
  },
  {
    quote:
      "Our clients ask for QA on every call. We used to sample 2%. Now every conversation is scored and the reporting writes itself — that alone won us a contract.",
    name: "Vlora M.",
    role: "Head of Delivery",
    org: "BPO, Prizren",
  },
  {
    quote:
      "Reception stopped being a bottleneck. Bookings after hours went from zero to about sixty a month, and no-shows dropped because confirmations actually go out.",
    name: "Dr. Endrit S.",
    role: "Clinic Owner",
    org: "Dental group, Ferizaj",
  },
];

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

export const integrations: string[] = [
  "Twilio",
  "3CX",
  "Asterisk",
  "FreePBX",
  "HubSpot",
  "Zoho CRM",
  "Pipedrive",
  "Salesforce",
  "Google Calendar",
  "Microsoft 365",
  "WhatsApp Business",
  "Viber",
  "Slack",
  "Zendesk",
  "Shopify",
  "Custom REST API",
];
