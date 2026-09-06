import {
  customSessionClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { clientEnv } from "@/env/client";
import type { auth } from "./server";

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    customSessionClient<typeof auth>(),
  ],
  fetchOptions: {
    credentials: "include",
  },
  sessionOptions: {
    refetchOnWindowFocus: false,
  },
});
