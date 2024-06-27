import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backendHost } from "../../utils";
import { Loader } from "../../pages/LiveScores";
import { toast } from "react-toastify";
import LoaderSpinner from "../LoaderSpinner";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  async function handleDeleteBlog(slug, i) {
    setCurrentIndex(i);
    setDeleteLoading(true);
    try {
      await fetch(`${backendHost}/api/blogs/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: slug }),
      }).then(async (res) => {
        setDeleteLoading(false);
        toast.success("Blog deleted sucessfully!");
        fetchData();
      });
    } catch (error) {
      console.log(error);
      toast.error("Delete Error!");
      setDeleteLoading(false);
    }
  }

  async function fetchData() {
    await fetch(`${backendHost}/api/blogs`, {
      method: "GET",
    })
      .then(async (response) => {
        const data = await response.json();
        setBlogs(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-xl rounded-xl shadow-lg p-4 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="block text-xl font-extrabold text-transparent md:text-2xl bg-clip-text bg-gradient-to-r from-blue-800 to-purple-700">
          Blogs
        </h1>
        <Link
          to="/admin/add-new-blog"
          className="rounded-lg border border-blue-500 py-1 px-2 text-blue-500 font-medium"
        >
          + Add New
        </Link>
      </div>

      <div className="mt-4 flex flex-col gap-6">
        {blogs.length > 0 ? (
          blogs.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="min-w-32 h-20 overflow-hidden">
                <img
                  className="w-full h-full border rounded-lg object-fit object-cover"
                  src={
                    item.image
                      ? item.image
                      : "/images/no-image-available-icon-vector.jpg"
                  }
                  alt={item.title}
                />
              </div>
              <div className="truncate">
                <h3 className="truncate font-semibold text-gray-600">
                  {item.title}
                </h3>
                <div className="mt-2 flex gap-x-2">
                  <Link
                    to={`/admin/edit-blog/${item.slug}`}
                    className="flex items-center text-gray-400 p-1 rounded-lg hover:bg-gray-100 max-w-max"
                  >
                    <EditIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDeleteBlog(item.slug, i)}
                    className="flex items-center text-red-400 p-1 rounded-lg hover:bg-gray-100 max-w-max"
                  >
                    <DeleteIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm mr-2">Delete</span>
                    {currentIndex === i && deleteLoading && (
                      <LoaderSpinner loaderStyle="size-4 stroke-red-500" size={4} color="red-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

const EditIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);

const DeleteIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);
