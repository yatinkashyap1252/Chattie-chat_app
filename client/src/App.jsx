import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy, useEffect, useState } from "react";
import ProtectRoute from "./components/auth/ProtectRoute";
import Loading from "./components/layout/Loading";
import axios from "axios";
import { server } from "./consonants/config";
import { useDispatch, useSelector } from "react-redux";
import { Userexist, UserNotExist } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./socket";

const Chat = lazy(() => import("./pages/Chat"));

const Groups = lazy(() => import("./pages/Groups"));

const Login = lazy(() => import("./pages/Login"));

const Home = lazy(() => import("./pages/Home"));

const About = lazy(() => import("./pages/About"));

const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

const UserManagement = lazy(() => import("./pages/admin/UserManagement"));

const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));

const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));

let user = true;

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(server)
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(Userexist(data.user)))
      .catch((err) => dispatch(UserNotExist()));
  }, [dispatch]);
  return loader ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home></Home>} />
            <Route path="/about" element={<About />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/chat-management" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
