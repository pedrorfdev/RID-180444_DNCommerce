import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_URL: z.string().url().startsWith("postgresql://"),
});

export const env = envSchema.parse(process.env);