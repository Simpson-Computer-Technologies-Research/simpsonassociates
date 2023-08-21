import { Bucket, File, Storage } from "@google-cloud/storage";
import { generateId } from "./auth";

// Create a new storage instance with the credentials
const storage: Storage = new Storage({
  keyFilename: "dansimpson-b01718476b94.json",
});

// Reference to the bucket
const bucket: Bucket = storage.bucket(process.env.GCS_BUCKET as string);

/**
 * Upload the photo to the google cloud storage
 * @param img The base64 encoded image to upload
 * @returns A promise that resolves when the image is uploaded
 */
export const uploadPhotoGCP = async (
  img: string,
  imgName: string,
): Promise<string> => {
  const ref: File = bucket.file(imgName);
  const buf: Buffer = Buffer.from(
    img.split("data:image/png;base64,")[1],
    "base64",
  );
  ref.save(buf);

  const stream = ref.createWriteStream({
    gzip: true,
    contentType: "image/png",
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (err) => reject(err));
    stream.on("finish", () =>
      resolve(
        `https://storage.googleapis.com/simpsonassociates-agents/${imgName}`,
      ),
    );
    stream.end(buf);
  });
};

/**
 * Delete a photo from the google cloud storage
 * @param fileName The name of the file to delete
 * @returns A promise that resolves when the file is deleted
 */
export const deletePhotoGCP = async (fileName: string): Promise<any> => {
  const file: File = bucket.file(fileName);
  return file.delete();
};
