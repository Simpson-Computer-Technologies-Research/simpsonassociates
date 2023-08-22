export const isSuccess = (status: number): boolean =>
  status === 200 || status === 304;
