export const createAction =
  <T>(type: string) =>
  (payload: T | null): Record<string, any> => {
    let error = null;

    if (payload instanceof Error) {
      error = payload;
      payload = null;
    }

    return {
      type,
      payload,
      error,
    };
  };
