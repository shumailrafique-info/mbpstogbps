import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/drizzle/db";
import { pageContent } from "@/drizzle/schema";
import { managedPage } from "@/lib/page-content";
import PageContentForm from "../_components/page-content-form";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const page = managedPage(slug);

  if (!page) {
    return notFound();
  }

  const content = await db.query.pageContent.findFirst({
    where: eq(pageContent.slug, slug),
  });

  return <PageContentForm page={page} content={content} />;
};

export default Page;
