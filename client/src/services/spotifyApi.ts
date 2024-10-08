import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1",
  }),
  endpoints: (builder) => ({
    getArtisData: builder.query({
      query: ({ id, appToken }) => ({
        url: `https://api.spotify.com/v1/artists/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${appToken}`,
        },
      }),
    }),
    getTopArtistLongRange: builder.query({
      query: ({ timeRange, limit, appToken }) => (
        console.log(timeRange, limit, appToken),
        {
          url: `me/top/artists?time_range=${timeRange}&limit=${limit}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${appToken}`,
          },
        }
      ),
    }),
    getPopularArtists: builder.query({
      query: ({ limit, appToken }) => ({
        url: `search?q=artist&type=artist&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${appToken}`,
        },
      }),
    }),
    getGenereoftheDay: builder.query({
      query: ({ appToken }) => ({
        url: `recommendations/available-genre-seeds`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${appToken}`,
        },
      }),
    }),
    getSearchSongsbyGenre: builder.query({
      query: ({ genre, limit, appToken }) => ({
        url: `search?q=${genre}&type=track&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${appToken}`,
        },
      }),
    }),

    getPlaylistByGenre: builder.query({
      query: ({ genre, limit, appToken }) => ({
        url: `search?q=${genre}&type=playlist&limit=${limit}`, 
        method: "GET",
        headers: {
          Authorization: `Bearer ${appToken}`,
        },
      }),
    }),
    
  }),
});

export const {
  useGetArtisDataQuery,
  useGetTopArtistLongRangeQuery,
  useGetPopularArtistsQuery,
  useGetGenereoftheDayQuery,
  useGetSearchSongsbyGenreQuery,
  useGetPlaylistByGenreQuery,
} = spotifyApi;
