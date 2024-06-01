import React, { useEffect, useState } from "react";
import FileUploadField from "../../admin/FileUploadField";
import CrossIcon from "../../commons/CrossIcon";
import RichTextEditor from "../../admin/RichTextEditor";
import { useParams } from "react-router-dom";
import allBlogs from "../../../utils/allBlogs.json";
import slugify from "slugify";

export default function EditBlog() {
  const { blogSlug } = useParams();

  const [article, setArticle] = useState();

  console.log(article);

  const [title, setTitle] = useState("");
  const [displayImages, setDisplayImages] = useState([]);
  const [images, setImages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    setArticle(allBlogs.find((itme) => slugify(itme.title) === blogSlug));
    setTitle(article?.title || "")
    setImages([article?.img] || "")
    setDisplayImages([article?.img])
    setContent(article?.content || "")
  }, [article?.content, article?.img, article?.title, blogSlug]);

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
              onChange={({ target }) => setTitle(target.value)}
              className="block max-w-lg w-full mt-2 rounded-lg p-2"
              placeholder="Title"
              id="title"
              type="text"
            />
          </div>
          {/* Blog Image */}
          <div className="mt-4">
            <label
              htmlFor={"blog-image"}
              className="text-sm text-zinc-700 font-semibold"
            >
              Blog Image
            </label>
            <FileUploadField
              id="picture"
              extra="mb-6"
              onChange={({ target }) => imagesUploadHandler(target.files)}
              placeholder="PNG, JPG, or GIF (max. 800 x 400 pixels)"
              label="picture"
              type="file"
            />
          </div>

          {/* ProductImages */}
          <ProductImages images={displayImages} removeImage={removeImage} />

          {/* product details */}
          <label
            htmlFor="blog-content"
            className="mb-2 mt-4 inline-block text-sm text-zinc-700 font-semibold"
          >
            Content
          </label>
          <RichTextEditor value={content} setValue={setContent} />
          <br />
        </form>
        {/* actions */}
        <div className="mt-10">
          <button type="button" className="rounded-lg p-2 w-full bg-blue-500 text-white">
            {loading ? (
              <span className="text-5">...</span>
            ) : (
              <span>Save Changes </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductImages({ images, removeImage }) {
  return (
    <div className="flex flex-wrap gap-3 my-10">
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
