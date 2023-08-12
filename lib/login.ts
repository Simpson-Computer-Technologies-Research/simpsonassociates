/**
 * Returns whether the given session is valid or not
 * @param session The google auth session
 * @returns true if the session is valid, false otherwise
 */
export const invalidSession = (session: any, status: string): boolean => {
  return (
    (!session || !session.user || !session.user.email) && status !== "loading"
  );
};
