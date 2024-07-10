import React, { useEffect, useState } from "react";
import FileUploadField from "../../components/admin/FileUploadField";
import CrossIcon from "../../components/commons/CrossIcon";
import RichTextEditor from "../../components/admin/RichTextEditor2";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiHost } from "../../utils";
import LoaderSpinner from "../../components/LoaderSpinner";

export default function AddNewBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [displayImages, setDisplayImages] = useState([]);
  const [images, setImages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [slugLoading, setSlugLoading] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState(true);

  function imagesUploadHandler(files) {
    setImages([...files]);
    // if (e.target.files.length > 2) alert('You can only upload maximum two [2] images');
    [...files].forEach((item, i) => {
      let reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onload = (e) => {
        setDisplayImages((prevState) => [...prevState, e.target.result]);
      };
    });
  }

  const removeImage = (index) => {
    setImages(images.filter((image, imageIndex) => imageIndex !== index));
    setDisplayImages(
      displayImages.filter((image, imageIndex) => imageIndex !== index)
    );
  };

  const handlePublish = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    if (images.length > 0) {
      formData.append("image", images[0]);
    }
    if (slugAvailable) {
      setLoading(true);
      try {
        await fetch(`${apiHost}/api/blogs`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            console.log(response);
            if (response.ok) {
              toast.success("Blog published Successfully!!");
            } else {
              throw new Error("File upload failed");
            }
            setLoading(false);
            setTimeout(() => {
              navigate("/admin/default");
            }, 1000);
          })
          .catch((error) => {
            setLoading(false);
            toast.error(error.message);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warning("Please Modify Slug");
    }
  };

  useEffect(() => {
    const checkSlugAvailability = async () => {
      if (slug.length > 0) {
        setSlugLoading(true);
        await fetch(`${apiHost}/api/blogs/slugs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug: slug }),
        })
          .then(async (response) => {
            setSlugLoading(false);
            const { availability } = await response.json();
            if (availability) {
              setSlugAvailable(true);
            } else {
              setSlugAvailable(false);
            }
          })
          .catch((error) => {
            setSlugLoading(false);
            console.log(error);
          });
      }
    };

    const timeoutId = setTimeout(() => {
      checkSlugAvailability();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [title, slug]);

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
    setSlug(slugify(e.target.value.toLowerCase()));
  };

  const handleSlugChange = (e) => {
    e.preventDefault();
    setSlug(slugify(e.target.value.toLowerCase()));
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-10">
      <div className="mb-28 mt-3 max-w-lg mx-auto">
        <form className="">
          {/* Title */}
          <div className="">
            <label
              htmlFor={"title"}
              className="text-sm text-zinc-700 font-semibold"
            >
              Title
            </label>
            <input
              value={title}
              onChange={handleTitleChange}
              className="block max-w-lg w-full mt-2 rounded-lg p-2"
              placeholder="Title"
              required
              id="title"
              type="text"
            />
          </div>

          {/* Slug */}
          <div className="mt-4">
            <label
              htmlFor={"title"}
              className="text-sm text-zinc-700 font-semibold flex"
            >
              <span className="mr-2">slug</span>
            </label>
            <div className="text-xs text-gray-500">
              Example: <br />
              Title: "10 Tips for a Healthy Lifestyle" <br />
              Good Slug: "healthy-lifestyle-tips"
            </div>
            <div className="relative">
              <input
                // value={slug}
                defaultValue={slug}
                onChange={handleSlugChange}
                required
                className={`block max-w-lg w-full mt-2 bg-white rounded-lg p-2 ${
                  !slugAvailable && "outline-red-500 border border-red-500"
                }`}
                placeholder="Slug"
                id="slug"
                type="text"
              />
              <div className="absolute right-0 -top-6 flex items-center">
                {!slugAvailable && (
                  <span className="text-red-500 text-xs">
                    Slug Not Available
                  </span>
                )}
                {slugLoading && (
                  <span>
                    <LoaderSpinner loaderStyle="size-4" size={4} />
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor={"blog-image"}
              className="text-sm text-zinc-700 font-semibold"
            >
              Blog Image
            </label>
            {images.length < 1 && (
              <FileUploadField
                id="picture"
                extra="mb-2"
                onChange={({ target }) => imagesUploadHandler(target.files)}
                placeholder="PNG, JPG, or GIF (max. 800 x 400 pixels)"
                label="picture"
                type="file"
              />
            )}
          </div>

          {/* BlogImages Display */}
          <BlogImages images={displayImages} removeImage={removeImage} />

          <label
            htmlFor="blog-content"
            className="mb-2 mt-4 inline-block text-sm text-zinc-700 font-semibold"
          >
            Content
          </label>
          <RichTextEditor value={content} setValue={setContent} />
          <br />
          {/* actions */}
          <div className="mt-10">
            <button
              onClick={handlePublish}
              type="button"
              disabled={loading}
              className="rounded-lg p-2 w-full bg-blue-500 text-white flex items-center justify-center"
            >
              {loading ? (
                <LoaderSpinner loaderStyle="size-4 stroke-white" size={5} color="white" />
              ) : (
                <span>Save </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function BlogImages({ images, removeImage }) {
  return (
    <div className="flex flex-wrap gap-3 mt-4 mb-10">
      {images.map((image, index) => {
        // console.log(index,image.slice(0,10))
        return (
          <div
            key={index}
            className="relative flex items-center justify-center rounded-xl border bg-white text-sm"
          >
            <button
              onClick={() => removeImage(index)}
              title="remove"
              type="button"
              className="absolute -left-1 -top-1 z-10 flex items-center justify-center rounded-full bg-gray-300 p-1 shadow-md "
            >
              <CrossIcon className="h-3 w-3 font-bold " />
            </button>
            <div className="relative h-24 w-36 ">
              <img
                width="20"
                height="10"
                className="h-full w-full rounded-xl object-cover"
                src={image}
                alt=""
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SelectedFiles({ data, onRemove, className }) {
  return (
    <div className={`grid grid-cols-1 gap-3 ${className}`}>
      {data.map((item) => (
        <div
          key={item.name}
          className="relative h-full rounded-xl border border-gray-200 bg-white text-sm"
        >
          <button
            onClick={() => onRemove(item)}
            className="absolute -left-1 -top-1 flex items-center justify-center rounded-full bg-gray-300 p-1 shadow-md"
          >
            <CrossIcon className="h-3 w-3 font-bold " />
          </button>
          <div className=" h-12 justify-center rounded-xl bg-white p-3 text-sm outline-none">
            <p>{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
