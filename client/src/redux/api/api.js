import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../consonants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["Chat", "User", "Message"],
  endpoints: (builder) => ({
    mychats: builder.query({
      query: () => ({
        url: "chat/my",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/sendrequest",
        credentials: "include",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getNotification: builder.query({
      query: () => ({
        url: "user/notification",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/acceptrequest",
        credentials: "include",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `chat/${chatId}`;
        if (populate) url += "?populate=true";
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/messages/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    sendAttachments: builder.mutation({
      query: (data) => ({
        url: `chat/message`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    mygroups: builder.query({
      query: () => ({
        url: "chat/my/groups",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    availableFriends: builder.query({
      query: (chatId) => {
        let url = `user/friends`;
        if (chatId) url += `?chatId=${chatId}`;
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    newGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: "chat/new",
        credentials: "include",
        method: "POST",
        body:{name,members}
      }),
      invalidatesTags: ["Chat"],
    }),
    renameGroup:builder.mutation({
      query:({chatId,name})=>({
        url:`chat/${chatId}`,
        method:"PUT",
        body:{name},
        credentials:"include"
      }),
      invalidatesTags:["Chat"]
    }),
    removeGroupMember:builder.mutation({
      query:({chatId,userId})=>({
        url:'chat/removemembers',
        credentials:"include",
        method:"PUT",
        body:{chatId,userId}
      }),
      invalidatesTags:["Chat"]
    }),
    addMember:builder.mutation({
      query:({members,chatId})=>({
        url:'chat/addmembers',
        credentials:"include",
        method:"PUT",
        body:{members,chatId}
      }),
      invalidatesTags:["Chat"]
    }),
    deleteChat:builder.mutation({
      query:(chatId)=>({
        url:`chat/${chatId}`,
        credentials:"include",
        method:"DELETE",
      }),
      invalidatesTags:["Chat"]
    }),
    leaveGroup:builder.mutation({
      query:(chatId)=>({
        url:`chat/leave/${chatId}`,
        credentials:"include",
        method:"DELETE"
      }),
      invalidatesTags:["Chat"]
    })
  }),
});

export default api;
export const {
  useMychatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useMygroupsQuery,
  useAvailableFriendsQuery,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddMemberMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation
} = api;
