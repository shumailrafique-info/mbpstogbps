import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    ADMIN_EMAILS: z
      .string()
      .min(1)
      .transform((value) =>
        value
          .split(",")
          .map((email) => email.trim().toLowerCase())
          .filter(Boolean),
      )
      .pipe(z.array(z.email()).min(1)),
    AWS_BUCKET_NAME: z.string().min(1),
    AWS_BUCKET_REGION: z.string().min(1),
    AWS_BUCKET_ACCESS_KEY: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
