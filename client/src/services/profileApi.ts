import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    getUserProfileInfo: builder.query({
      // Change this to a POST so we can send the token in the body
      query: () => {
        // Retrieve token from localStorage on the client side
        const token = typeof window !== 'undefined' ? localStorage.getItem('spotify_access_token') : '';
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('spotify_refresh_token') : '';
        return {
          url: 'get-profile',
          method: 'POST',
          body: { token, refresh_token: refreshToken },
        };
      }
    }),
    getUserTopDataWithRange: builder.query({
      query: ({ timeRange, userId }: { timeRange: string; userId: string | null }) => ({
        url: `get-user-range-info/${timeRange}?userId=${userId}`,
        method: 'GET',
      }), 
      keepUnusedDataFor: 60 * 60 * 24
    })
  }),
});

export const { useGetUserProfileInfoQuery, useGetUserTopDataWithRangeQuery } = profileApi;
