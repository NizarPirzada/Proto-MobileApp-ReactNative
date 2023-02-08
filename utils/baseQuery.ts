import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "meecha/store/store";

export default fetchBaseQuery({
  // baseUrl: 'https://1d07ab4d-1dcf-4916-8092-dae583b250a5.mock.pstmn.io',
  // https://stackoverflow.com/questions/5528850/how-do-you-connect-localhost-in-the-android-emulator
  baseUrl: 'https://test.meecha.app:1323',
  prepareHeaders: async (headers, { getState }) => {
    // https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
    const token = (getState() as RootState).auth.authPackage?.tokens
      .accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
