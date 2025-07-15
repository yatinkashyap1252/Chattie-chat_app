import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { adminLogin, AdminLogout, fetchAdmin } from "../thunks/admin";

const initialState = {
  user: null,
  isAdmin: false,
  loader: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Userexist: (state, action) => {
      (state.user = action.payload), (state.loader = false);
    },
    UserNotExist: (state) => {
      (state.user = null), (state.loader = false);
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isAdmin = true;
        toast.success(action.payload);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isAdmin = false;
        toast.error(action.error.message);
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAdmin = true;
        }
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.isAdmin = false;
      })
      .addCase(AdminLogout.fulfilled, (state, action) => {
        state.isAdmin = false;
        toast.success(action.payload);
      })
      .addCase(AdminLogout.rejected, (state, action) => {
        state.isAdmin = true;
        toast.error(action.error.message);
      });
  },
});

export default authSlice;
export const { Userexist, UserNotExist } = authSlice.actions;
