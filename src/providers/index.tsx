"use client";

import type { ReactNode } from "react";
import ReactQueryProvider from "./tanstack-query-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default Providers;
