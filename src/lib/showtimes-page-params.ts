import { createSearchParamsCache, parseAsIsoDate } from "nuqs/server";

export const showtimesPageParams = createSearchParamsCache(
  {
    date: parseAsIsoDate.withDefault(new Date()).withOptions({
      shallow: false,
    }),
  },
  {
    urlKeys: {
      date: "d",
    },
  }
);
