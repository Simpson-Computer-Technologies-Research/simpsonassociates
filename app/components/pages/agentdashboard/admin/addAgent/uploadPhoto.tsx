import React from "react";

/**
 * Upload Photo Button
 * @returns JSX.Element
 */
export default function UploadPhoto(props: {
  photoRef: React.MutableRefObject<any>;
}): JSX.Element {
  const onChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      props.photoRef.current = reader.result;
      console.log(props.photoRef.current);
    };
  };

  return (
    <input
      id="photo"
      onChange={onChange}
      type="file"
      accept="image/*"
      className="mt-4 w-full rounded-md bg-white px-2 py-2"
    />
  );
}
