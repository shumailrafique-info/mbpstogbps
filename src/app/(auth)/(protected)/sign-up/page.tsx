import type { Metadata } from "next";
import SignUpPage from "../../_components/signup-page";

export const metadata: Metadata = {
  title: "Start free",
};

const Page = async () => {
  return <SignUpPage />;
};

export default Page;
