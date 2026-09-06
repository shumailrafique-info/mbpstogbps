import type { Metadata } from "next";
import SigninPage from "../../_components/signin-page";

export const metadata: Metadata = {
  title: "Sign in",
};

const Page = () => {
  return <SigninPage />;
};

export default Page;
