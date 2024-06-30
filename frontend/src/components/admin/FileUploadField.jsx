export default function FileUploadField(props) {
  const {
    label,
    id,
    extra,
    type,
    placeholder,
    variant,
    state,
    disabled,
    onChange,
  } = props;

  return (
    <div className={`${extra} mt-3`}>
      <div className="flex relative w-full h-full max-w-lg items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className={` flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white ${
            disabled === true
              ? "!border-none !bg-gray-100"
              : state === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500"
              : state === "success"
              ? "border-green-500 text-green-500 placeholder:text-green-500"
              : "border-gray-200"
          }`}
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">
                Drop image to upload, or{" "}
                <span className="text-blue-500">browse</span>
              </span>
            </p>
            <p className="text-xs text-gray-500">{placeholder}</p>
          </div>
          <input
            onChange={onChange}
            disabled={disabled}
            type={type}
            id={id}
            placeholder={placeholder}
            className="absolute inset-0 cursor-pointer opacity-0 w-full h-full"
          />
        </label>
      </div>
    </div>
  );
}
