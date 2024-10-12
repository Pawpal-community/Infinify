import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL


export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    getArtisData: builder.query({
      query: ({ id }) => ({
        url: `artists/${id}`,
        method: "GET",
      }),
    }),
    getTopArtistLongRange: builder.query({
      query: ({ timeRange, limit, appToken }) => (
        console.log(timeRange, limit, appToken),
        {
          url: `me/top/artists?time_range=${timeRange}&limit=${limit}`,
          method: "GET",
        }
      ),
    }),
    getPopularArtists: builder.query({
      query: () => ({
        url: `any-popular-artist`,
        method: "GET",
      }),
    }),
    getGenreOftheDay: builder.query({
      query: () => ({
        url: `genre-of-the-day`,
        method: "GET",
      }),
    }),
    getSearchSongsbyGenre: builder.query({
      query: () => ({
        url: `genre-of-the-day`,
        method: "GET",
      }),
    }),
    getPopularArtistPopularSongs: builder.query({
      query: ( artistId ) => (
        console.log(artistId),
        {
          url: `popular-artist/songs`,
          method: "POST",
          body: {artistId}
        }
      ),
    }),

    getTopSongsPlaylist: builder.query({
      query: () => ({
        url: `search?query=top+global&type=playlist&locale=es-ES%2Ces%3Bq%3D0.9&offset=0&limit=1`,
        method: "GET",
      }),
    }),

    getPlaylistbyId: builder.query({
      query: ({ id }) => ({
        url: `playlists/${id}`,
        method: "GET",
      }),
    }),

  }),
});

export const {
  useGetArtisDataQuery,
  useGetTopArtistLongRangeQuery,
  useGetPopularArtistsQuery,
  useGetPopularArtistPopularSongsQuery,
  useGetGenreOftheDayQuery,
  useGetSearchSongsbyGenreQuery,
  useGetTopSongsPlaylistQuery,
  useGetPlaylistbyIdQuery,
} = spotifyApi;
