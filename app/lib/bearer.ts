// Import jwt
async function sha256(text: string) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(text);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

export const generateBearer = async (email: string): Promise<string> => {
  const bearerSecret: string = process.env.BEARER_SECRET || "secret";
  const token: string = await sha256(email + bearerSecret);
  return token;
};
