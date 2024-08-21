import BlogsPage from "@/components/blogs/BlogsPage";
import { apiHost } from "@/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read our latest blogs",
  description:
    "Stay ahead of the competition with the most up-to-date information in the world of sports betting!",
};

export default async function Page() {
  const blogs = await fetch(`${apiHost}/api/blogs`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));

  return <BlogsPage blogs={blogs} />;
}
