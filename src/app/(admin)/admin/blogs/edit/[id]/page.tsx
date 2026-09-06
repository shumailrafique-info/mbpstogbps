import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/drizzle/db";
import { blog } from "@/drizzle/schema";
import BlogForm from "../../new/_components/blog-form";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blogR = await db.query.blog.findFirst({
    where: eq(blog.id, id),
  });
  if (!blogR) {
    return notFound();
  }
  return <BlogForm blog={blogR} />;
};

export default Page;
