import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function RichTextEditor({ value, setValue }) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [ "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const placeholder = "Start typing...";

  const { quill, quillRef } = useQuill({ modules, placeholder });


  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = value
      quill.on('text-change', (delta, oldDelta, source) => {
        setValue(JSON.stringify(quill.root.innerHTML))
      });
    }
  }, [quill, quillRef, setValue]);

  return (
    <div className="bg-white border-none rounded-lg h-[400px]">
      <div
        className="border-none bg-white rounded-b-lg w-full max-w-lg "
        ref={quillRef}
      />
    </div>
  );
}
