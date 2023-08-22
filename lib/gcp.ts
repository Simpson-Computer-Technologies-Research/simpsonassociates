import { Bucket, File, Storage } from "@google-cloud/storage";

// Create a new storage instance with the credentials
const storage: Storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: (process.env.GCP_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    client_id: process.env.GCP_CLIENT_ID,
  },
});

// Reference to the bucket
const bucket: Bucket = storage.bucket("simpsonassociates-agents");

/**
 * Upload the photo to the google cloud storage
 * @param image The image to upload (base64)
 * @param agentName The name of the agent
 * @param agentId The id of the agent
 * @returns A promise that resolves when the image is uploaded
 */
export const uploadAgentPhotoGCP = async (
  image: string,
  agentName: string,
  agentId: string,
): Promise<string> => {
  const imageType: string = image.split("data:")[1].split(";")[0];
  const imageName: string =
    agentName.toLowerCase().replace(" ", "") + "_headshot-" + agentId;

  const ref: File = bucket.file(imageName);
  const buf: Buffer = Buffer.from(
    image.split("data:image/png;base64,")[1],
    "base64",
  );
  ref.save(buf);

  const stream = ref.createWriteStream({
    gzip: true,
    contentType: imageType,
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (err) => reject(err));
    stream.on("finish", () =>
      resolve(
        `https://storage.googleapis.com/simpsonassociates-agents/${imageName}`,
      ),
    );
    stream.end(buf);
  });
};

/**
 * Delete a photo from the google cloud storage
 * @param agentName The name of the agent
 * @param agentId The id of the agent
 * @returns A promise that resolves when the file is deleted
 */
export const deleteAgentPhotoGCP = async (
  agentName: string,
  agentId: string,
): Promise<any> => {
  const imageName: string =
    agentName.toLowerCase().replace(" ", "") + "_headshot-" + agentId;

  const file: File = bucket.file(imageName);
  return file.delete();
};
