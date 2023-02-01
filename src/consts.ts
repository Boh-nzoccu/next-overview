import { z } from 'zod';
import { Octokit } from 'octokit';

const privateEnvSchema = z.object({
  GITHUB_TOKEN: z.string(),
  REVALIDATION_SECRET: z.string(),
});

export const privateEnv = privateEnvSchema.parse({
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
});

export const github = new Octokit({
  auth: privateEnv.GITHUB_TOKEN,
});
