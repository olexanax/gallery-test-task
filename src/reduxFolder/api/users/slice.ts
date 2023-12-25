import { baseApi } from "../base/slice";
import qs from "query-string";

import type { GetPhotosResponse, GetPhotosQueryArgs } from "./types/GetImages";

const token = "5IYibvX1n3sx6PUnNkNg9CaF0zDUMtFY8hxmQmERN0A";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getImages: builder.query<
            GetPhotosResponse,
            Partial<GetPhotosQueryArgs>
        >({
            query: ({ page = 1, ...params }) => {
                const query = qs.stringify(params);
                return `/photos/?client_id=${token}&page=${page}&${query}&`;
            },
            providesTags: ["Images"],
            transformResponse: (response: GetPhotosResponse) => response,
        }),
    }),
});

export const { useGetImagesQuery } = usersApi;
