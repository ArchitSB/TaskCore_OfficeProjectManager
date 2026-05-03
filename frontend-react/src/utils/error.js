export const getApiErrorMessage = (error, fallbackMessage = 'Something went wrong') => {
  if (!error) return fallbackMessage;

  const status = error?.response?.status;
  if (status === 403) {
    return 'Not allowed to perform this action.';
  }

  return error?.response?.data?.message || error.message || fallbackMessage;
};
