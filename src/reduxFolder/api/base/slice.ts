import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        credentials: "same-origin",
        prepareHeaders: (headers) => {
            return headers;
        },
        baseUrl: "https://api.unsplash.com",
    }),
    tagTypes: ["Images"],
    endpoints: (_) => ({}),
});
