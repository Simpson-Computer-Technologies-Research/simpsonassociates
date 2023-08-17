import React from "react";

/**
 * Upload Photo Button
 * @returns JSX.Element
 */
interface UploadPhotoProps {
  photoRef: React.MutableRefObject<any>;
}
export default function UploadPhoto(props: UploadPhotoProps): JSX.Element {
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
      className="w-full rounded-md bg-white px-2 py-2"
    />
  );
}
