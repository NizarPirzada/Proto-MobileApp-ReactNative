import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Tag = { name: string; id: number };
export interface PostSettingState {
  postType: Tag;
  postCategory: Tag;
  ready?: boolean;
}

const initialState: PostSettingState = {
  postType: { name: "Any", id: 0 },
  postCategory: { name: "Random", id: 0 },
  ready: false,
};

export const postSlice = createSlice({
  name: "postSettings",
  initialState,
  reducers: {
    setPref: (
      state: PostSettingState,
      action: PayloadAction<PostSettingState>
    ) => {
      console.log("Payload", action.payload);
      state.postType = action.payload.postType;
      state.postCategory = action.payload.postCategory;
    },
    setReady: (state: PostSettingState) => {
      state.ready = true;
    },
    reset: (state: PostSettingState) => {
      state.postType = initialState.postType;
      state.postCategory = initialState.postCategory;
    },
  },
});

export const { setPref, reset, setReady } = postSlice.actions;
