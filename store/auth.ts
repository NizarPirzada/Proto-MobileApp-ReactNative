import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthPackage } from "meecha/generated/api.generated";

interface State {
  authPackage?: AuthPackage;
  firstLogin: boolean;
  langCode?: string;
}

const initialState: State = {
  authPackage: {
    tokens: {
      accessExp: "",
      accessToken:
        "",
    },
  },
  firstLogin: false,
  langCode: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state: State, action: PayloadAction<AuthPackage>) => {
      state.authPackage = action.payload;
      state.firstLogin = true;
    },
    login: (state: State, action: PayloadAction<AuthPackage>) => {
      state.authPackage = action.payload;
      state.firstLogin = false;
    },
    setLangCode: (state: State, action: PayloadAction<string>) => {
      state.langCode = action.payload;
    },
    logout: (state: State) => {
      state.authPackage = undefined;
      state.langCode = undefined;
      state.firstLogin = false;
    },
  },
});

export const { login, logout, signup, setLangCode } = authSlice.actions;
