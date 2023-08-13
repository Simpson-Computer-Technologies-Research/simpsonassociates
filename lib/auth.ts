/**
 * Returns whether the given session is valid or not
 * @param session The google auth session
 * @returns true if the session is valid, false otherwise
 */
export const invalidSession = (session: any, status: string): boolean => {
  return (
    (!session ||
      !session.user ||
      !session.user.email ||
      !session.user.name ||
      !session.user.image) &&
    status !== "loading"
  );
};

/**
 * Fetch the users permissions
 * @param email The email of the user
 * @param permissions The permissions to check
 * @returns the users permissions
 */
export const fetchPermissions = async (
  email: string | null | undefined,
): Promise<string[]> => {
  // If there is no email, return an empty array
  if (!email) return [];

  // Fetch the permissions
  return await fetch("/api/agents/permissions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => res.json())
    .then((json) => json.permissions);
};
