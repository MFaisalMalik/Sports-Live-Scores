import BlogsPage from "@/components/blogs/BlogsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read our latest blogs",
  description: "Stay ahead of the competition with the most up-to-date information in the world of sports betting!",
};

export default function Blogs() {
  return <BlogsPage />;
}
