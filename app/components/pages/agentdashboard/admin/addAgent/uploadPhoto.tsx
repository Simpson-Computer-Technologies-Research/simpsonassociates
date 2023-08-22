"use client";
import { ObjectState } from "@/app/lib/state";

/**
 * Upload Photo Button
 * @returns JSX.Element
 */
interface UploadPhotoProps {
  photo: ObjectState<string>;
}
export default function UploadPhoto(props: UploadPhotoProps): JSX.Element {
  const onChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => props.photo.set(reader.result as string);
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
