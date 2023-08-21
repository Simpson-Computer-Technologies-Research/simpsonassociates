import { Bucket, File, Storage } from "@google-cloud/storage";

// Create a new storage instance with the credentials
const storage: Storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY,
    client_id: process.env.GCP_CLIENT_ID,
  },
});

// Reference to the bucket
const bucket: Bucket = storage.bucket("simpsonassociates-agents");

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
