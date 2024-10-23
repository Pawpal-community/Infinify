export interface Artist {
    artist_id: string;
    artist_name: string;
    artist_photo:string;
    artist_uri: string 
}


export interface Song {
  artist_id: string;
  artist_name: string;
  song_id: string;
  song_image: string;
  song_name: string;
  song_uri: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  href: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  track: Song;
}

export interface UserTopArtistList {
  items: Artist[];
  total: number;
  limit: number;
  offset: number;
  href: string;
}

interface UserTopSongs {
  items: Song[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string | null;
  previous: string | null;
}

export interface Userinfo {
  id: string;
  username: string;
  email: string;
  role: string;
  display_name: string;
  images: Array<{ url: string }>;
  followers: { total: number };
  external_urls: { spotify: string };
  profile_photo: string;
}