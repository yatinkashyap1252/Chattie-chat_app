import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../consonants/config";

const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/api/v1/admin/verification`,
      { secretKey },
      config
    );
    return data.message;
  } catch (error) {
    console.log("Error in adminLogin thunk:", error);

    throw error?.response?.data?.message || "Something went wrong";
  }
});

const fetchAdmin = createAsyncThunk("admin/fetchAdmin", async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/`, {
      withCredentials: true,
    });
    return data.admin;
  } catch (error) {
    throw error?.response?.data?.message || "Something went wrong";
  }
});

const AdminLogout = createAsyncThunk("admin/logout", async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/logout`, {
      withCredentials: true,
    });
    return data.message;
  } catch (error) {
    throw error?.response?.data?.message || "Something went wrong";
  }
});

export { adminLogin, fetchAdmin,AdminLogout };
