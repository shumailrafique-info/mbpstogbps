import { APIError, type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";
import { db } from "@/drizzle/db";
import { userRoleEnum } from "@/drizzle/schema";
import type { UserRoleType } from "@/drizzle/types";
import { serverEnv } from "@/env/server";

const ALLOWED_ROLES = userRoleEnum.enumValues;

const options = {
  appName: "Dineri",
  advanced: {
    cookiePrefix: process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME ?? "dineri",
  },
  user: {
    additionalFields: {
      role: { required: false, type: ALLOWED_ROLES, input: false },
    },
  },
  socialProviders: {
    google: {
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    },
  },
  trustedOrigins: [String(serverEnv.BETTER_AUTH_URL)],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",") ?? [];

          let role = (user.role ?? "user") as UserRoleType;

          if (!ALLOWED_ROLES.includes(role)) {
            throw new APIError("BAD_REQUEST", {
              message: "Invalid role provided",
              code: "INVALID_ROLE",
            });
          }

          if (role === "admin" && !ADMIN_EMAILS.includes(user.email)) {
            throw new APIError("FORBIDDEN", {
              message: "You are not allowed to register as admin",
              code: "UNAUTHORIZED_ROLE",
            });
          }

          if (ADMIN_EMAILS.includes(user.email)) {
            role = "admin";
          }

          return { data: { ...user, role } };
        },
      },
    },
  },
  plugins: [openAPI()],
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,
  plugins: [...(options.plugins ?? []), nextCookies()],
});
