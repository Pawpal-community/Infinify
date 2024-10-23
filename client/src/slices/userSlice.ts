import { Userinfo, UserTopArtistList, UserTopSongs } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
export interface User {
  user : Userinfo;
  user_top_artist: UserTopArtistList;
  user_top_songs: UserTopSongs;

}

// Define the UserState interface
interface UserState {
  user: User | null;
  appToken: { token: string; expiration: number } | null;
}

const initialState: UserState = {
  user: null,
  appToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setToken: (
      state,
      action: PayloadAction<{ token: string; expiration: number }>
    ) => {
      state.appToken = action.payload;
    },
    getUser: (state) => {
      const userDataString = localStorage.getItem("user");
      
      if (userDataString) {
        state.user = JSON.parse(userDataString);
      }
    },
  },
});

export const { setUser, setToken, getUser } = userSlice.actions;
export default userSlice.reducer;
