import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../consonants/sampledata";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useError } from "../../hooks/hooks";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const NewGroup = () => {
  // const [Members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setselectedMembers] = useState([]);
  const { isNewGroup } = useSelector((state) => state.misc);

  const dispatch = useDispatch();
  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  // console.log(data)

  const [newGroup, newGroupIsLoading] = useAsyncMutation(useNewGroupMutation);

  const errors = [
    {
      isError,
      error,
    },
  ];
  useError(errors);

  const groupName = useInputValidation("");

  const selectMemberHandler = (id) => {
    setselectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");
    if (selectedMembers.length < 2)
      return toast.error("Members should be atleast 2");
    // console.log("Selected members:", selectedMembers);
    newGroup("Creating group...",{name:groupName.value,members:selectedMembers})
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  
  // console.log(selectedMembers);

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        sx={{
          bgcolor: "black",
          border: "3px solid #fff",
          color: "white",
          width: "30rem",
        }}
      >
        <DialogTitle
          textAlign={"center"}
          style={{
            fontFamily: "fantasy",
            fontSize: "25px",
            letterSpacing: "2px",
            textDecoration: "3px solid rgb(0,0,0) underline",
          }}
        >
          New Group
        </DialogTitle>
        <TextField
          label="Group name"
          style={{ borderBottom: "2px solid blue", borderRadius: "10px" }}
          InputLabelProps={{
            style: { color: "white", fontSize: "20px", fontWeight: "700" },
          }}
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography
          style={{
            fontFamily: "monospace",
            textAlign: "center",
            fontSize: "20px",
            paddingTop: "10px",
          }}
        >
          Members
        </Typography>
        {isLoading ? (
          <Skeleton />
        ) : (
          data?.friends?.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))
        )}
        <Stack
          style={{
            paddingTop: "10px",
            gap: "10px",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="outlined" onClick={closeHandler}>
            cancel
          </Button>
          <Button variant="contained" onClick={submitHandler} disabled={newGroupIsLoading} >
            create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
