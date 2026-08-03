import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  company: varchar("company", { length: 200 }),
  phone: varchar("phone", { length: 60 }),
  seats: varchar("seats", { length: 60 }),
  monthlyCalls: varchar("monthly_calls", { length: 60 }),
  plan: varchar("plan", { length: 60 }),
  source: varchar("source", { length: 80 }).notNull().default("website"),
  message: text("message"),
  status: varchar("status", { length: 40 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const roiEstimates = pgTable("roi_estimates", {
  id: serial("id").primaryKey(),
  monthlyCalls: integer("monthly_calls").notNull(),
  agents: integer("agents").notNull(),
  agentCost: integer("agent_cost").notNull(),
  automationRate: integer("automation_rate").notNull(),
  monthlySavings: integer("monthly_savings").notNull(),
  payload: jsonb("payload"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
