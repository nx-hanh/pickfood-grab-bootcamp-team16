import { createAppSlice } from "@/lib/redux/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
interface UserInfoState {
  location: LocationInLatLong;
}
const initialState: UserInfoState = {
  location: { lat: -1, long: -1 },
};

export const userInfoSlice = createAppSlice({
  name: "userInfo",
  initialState,
  reducers: (create) => ({
    updateLocation: create.reducer(
      (state, action: PayloadAction<LocationInLatLong>) => {
        state.location = action.payload;
      }
    ),
  }),
  selectors: {
    selectLocation: (state) => state.location,
  },
});

export const { updateLocation } = userInfoSlice.actions;

export const { selectLocation } = userInfoSlice.selectors;
