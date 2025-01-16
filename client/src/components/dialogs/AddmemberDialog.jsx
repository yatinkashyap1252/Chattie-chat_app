// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   Skeleton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import { sampleUsers } from "../../consonants/sampledata";
// import UserItem from "../shared/UserItem";
// import { useAsyncMutation, useError } from "../../hooks/hooks";
// import {
//   useAddMemberMutation,
//   useAvailableFriendsQuery,
// } from "../../redux/api/api";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsAddMember } from "../../redux/reducers/misc";

// const AddmemberDialog = ({ chatId }) => {
//   const [Members, setMembers] = useState(sampleUsers);
//   const dispatch = useDispatch();
//   const { isAddMember } = useSelector((state) => state.misc);
//   const [selectedMembers, setselectedMembers] = useState([]);
//   const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);
//   const [addMembers, addMembersIsLoading] =
//     useAsyncMutation(useAddMemberMutation);

//   const selectMemberHandler = (id) => {
//     setselectedMembers((prev) =>
//       prev.includes(id)
//         ? prev.filter((currElement) => currElement !== id)
//         : [...prev, id]
//     );
//   };

// //   console.log(data)

//   const AddmemberSubmitHandler = () => {
//     addMembers("Adding members...", { members: selectedMembers, chatId });
//     closeHandler();
//   };

//   const closeHandler = () => {
//     console.log("close");
//     // setselectedMembers([]);
//     // setMembers([]);
//     dispatch(setIsAddMember(false));
//   };

//   useError([{ isError, error }]);

//   return (
//     <Dialog open={isAddMember} onClose={closeHandler}>
//       <Stack p={"2rem"} width={"25rem"} spacing={"2rem"}>
//         <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
//         <Stack spacing={"1rem"}>
//           {isLoading ? (
//             <Skeleton />
//           ) : data?.friends?.length > 0 ? (
//             data?.friends?.map((i) => (
//               <UserItem
//                 key={i._id}
//                 user={i}
//                 handler={selectMemberHandler}
//                 isAdded={selectedMembers.includes(i._id)}
//               />
//             ))
//           ) : (
//             <Typography textAlign={"center"}>No Friend</Typography>
//           )}
//         </Stack>
//         <Stack spacing={"1.5rem"}>
//           <Button color="error" variant="outlined" onClick={closeHandler}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             disabled={addMembersIsLoading}
//             onClick={AddmemberSubmitHandler}
//           >
//             Create
//           </Button>
//         </Stack>
//       </Stack>
//     </Dialog>
//   );
// };

// export default AddmemberDialog;
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { sampleUsers } from "../../consonants/sampledata";
import UserItem from "../shared/UserItem";
import { useAsyncMutation, useError } from "../../hooks/hooks";
import {
  useAddMemberMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";

const ADD_MEMBER_BUTTON_COLOR = "#BB86FC"; // Color for Add Members button background

const AddMemberDialog = ({ chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);
  const [addMembers, addMembersIsLoading] =
    useAsyncMutation(useAddMemberMutation);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addMembers("Adding members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  useError([{ isError, error }]);

  return (
    <Dialog
      open={isAddMember}
      onClose={closeHandler}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(33, 33, 33, 0.7)",
        borderRadius: "10px",
        width: "100%", // Make dialog take full width
        // maxWidth: "25rem", // Set max width to keep dialog contained
        overflow: "hidden",
        transition: "all 0.3s ease-in-out", // Smooth transition for animation
      }}
    >
      <Stack
        sx={{
          p: "2rem",
          spacing: "2rem",
          width: "100%",
          maxHeight: "80vh", // Limit the height
          overflowY: "scroll", // Allow vertical scrolling
          "::-webkit-scrollbar": {
            display: "none", // Hide the scrollbar
          },
        }}
        p={"2rem"}
        spacing={"2rem"}
        width="100%"
      >
        <DialogTitle textAlign={"center"}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Add Members
          </motion.div>
        </DialogTitle>

        <Stack
          sx={{
            p: "2rem",
            spacing: "2rem",
            width: "100%",
            maxHeight: "80vh", // Limit the height
            overflowY: "scroll", // Allow vertical scrolling
            "::-webkit-scrollbar": {
              display: "none", // Hide the scrollbar
            },
          }}
          spacing={"1rem"}
        >
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((user) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <UserItem
                  user={user}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(user._id)}
                />
              </motion.div>
            ))
          ) : (
            <Typography textAlign={"center"}>No friends found</Typography>
          )}
        </Stack>

        <Stack spacing={"1.5rem"}>
          <Button
            color="error"
            variant="outlined"
            onClick={closeHandler}
            sx={{
              color: "#fff",
              backgroundColor: "#424242",
              "&:hover": { backgroundColor: "#616161" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={addMembersIsLoading}
            onClick={addMemberSubmitHandler}
            sx={{
              backgroundColor: ADD_MEMBER_BUTTON_COLOR,
              "&:hover": { backgroundColor: "#9F53C4" },
            }}
          >
            Add Members
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
