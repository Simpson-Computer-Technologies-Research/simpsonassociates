/**
 * SHA256 Encryption
 */
export async function sha256(text: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(text);

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

/**
 * Base64 Encoding
 */
export function base64encode(text: string) {
  const buff: number[] = [];
  for (let i = 0; i < text.length; i++) {
    buff.push(text.charCodeAt(i));
  }
  const base64 = btoa(String.fromCharCode.apply(null, buff));
  return base64;
}

/**
 * Base64 Decoding
 */
export function base64decode(text: string) {
  const buff = atob(text);
  const arr = [];
  for (let i = 0; i < buff.length; i++) {
    arr.push(buff.charCodeAt(i));
  }
  return String.fromCharCode.apply(null, arr);
}
