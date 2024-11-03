type NonNullableObject<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeDataNonNullable = <T extends Record<string, any>>(
  data: T[]
): NonNullableObject<T>[] =>
  data.map((item) => {
    const nonNullableItem = {} as NonNullableObject<T>;
    for (const key in item) {
      if (item[key] === null || item[key] === undefined) {
        throw new Error(
          `Found null or undefined value for field ${key} where non-nullable is expected`
        );
      }
      nonNullableItem[key] = item[key] as NonNullable<T[typeof key]>;
    }
    return nonNullableItem;
  });
