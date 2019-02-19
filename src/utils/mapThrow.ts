export const mapThrow = async <A, B, E = Error>(
  func: () => A | Promise<A>,
  mapError: (e: E) => B
): Promise<A> => {
  try {
    return await func();
  } catch (e) {
    throw mapError(e);
  }
};
