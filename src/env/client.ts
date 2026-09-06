import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const clientEnv = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_BETTER_AUTH_URL: z.url(),
    NEXT_PUBLIC_SESSION_COOKIE_NAME: z.string().min(1),
  },

  runtimeEnv: {
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    NEXT_PUBLIC_SESSION_COOKIE_NAME:
      process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME,
  },
  emptyStringAsUndefined: true,
});
