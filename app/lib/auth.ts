import { sha256, base64encode, base64decode } from "./crypto";

/**
 * Generate a random user id
 */
export async function generateUserId() {
  const currentTime = new Date().getTime().toString();
  const random = crypto.getRandomValues(new Uint8Array(10));
  const hash = await sha256(random + currentTime);
  return hash;
}

/**
 * Generate a new bearer token
 */
export const generateBearer = async (email: string): Promise<string> => {
  const bearerSecret: string = process.env.BEARER_SECRET || "*secret!";
  const token: string = await sha256(email + bearerSecret);
  return token;
};

/**
 * Generate a new authorization token
 */
export const generateAuthorization = async (
  accessToken: string,
  email: string,
): Promise<string> =>
  base64encode(JSON.stringify({ access_token: accessToken, email }));

/**
 * Decode an authorization token
 */
export const decodeAuthorization = async (
  authorization: string,
): Promise<{ accessToken: string; email: string }> => {
  const decoded = base64decode(authorization);
  const parsed = JSON.parse(decoded);
  return {
    accessToken: parsed.access_token,
    email: parsed.email,
  };
};
