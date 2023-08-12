/**
 * Verify that an agent has the provided permissions
 */
export const verifyPermissions = async (
  email: string | null | undefined,
  permissions: string[],
): Promise<boolean> => {
  if (!email) return false;
  return await fetch("/api/agents/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, permissions }),
  }).then((res) => res.status === 200);
};
