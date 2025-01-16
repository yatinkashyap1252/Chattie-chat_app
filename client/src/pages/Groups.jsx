import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import {
  Avatar,
  Backdrop,
  Button,
  ButtonGroup,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import MenuIcon from "@mui/icons-material/Menu";
import { sampleChats, sampleUsers } from "../consonants/sampledata";
import DeleteIcon from "@mui/icons-material/Delete";
import Title from "../components/shared/Title";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UserItem from "../components/shared/UserItem";
import {
  useAddMemberMutation,
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMygroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { useAsyncMutation, useError } from "../hooks/hooks";
import Loading from "../components/layout/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/misc";
// import  lingra  from "../consonants/color.js";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddmemberDialog = lazy(() =>
  import("../components/dialogs/AddmemberDialog")
);

const Groups = () => {
  const myGroups = useMygroupsQuery("");
  const dispatch = useDispatch();
  const [isEdit, setisEdit] = useState(false);
  const chatId = useSearchParams()[0].get("groups");
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupnameUpdatedValue, setgroupnameUpdatedValue] = useState("");
  const { isAddMember } = useSelector((state) => state.misc);
  const [members, setMembers] = useState([]);
  // console.log(myGroups.data)

  const [groupRename, groupRenameIsLoading] = useAsyncMutation(
    useRenameGroupMutation
  );
  const [removeMembers, removeMembersIsLoading] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );
  const [deleteChat, deleteChatIsLoading] = useAsyncMutation(
    useDeleteChatMutation
  );
  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const handleMobile = () => {
    setisMobileMenuOpen((prev) => !prev);
  };

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useError(errors);

  const handleMobileclose = () => setisMobileMenuOpen(false);
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };
  const updateGroupName = () => {
    setisEdit(false);
    groupRename("Group Name is changing...", {
      chatId,
      name: groupnameUpdatedValue,
    });
    // console.log(groupnameUpdatedValue);
  };

  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const deleteHandler = () => {
    console.log("deleteHandler");
    deleteChat("Deleting chat...",chatId)
    closeconfirmDeleteHandler();
    navigate("/")
  };

  const removeMemberHandler = (_id) => {
    removeMembers("Removing user...", { chatId, userId: _id });
    // console.log("remove user", _id);
  };

  const openAddmemberHandler = () => {
    dispatch(setIsAddMember(true));
    // addMembers("Adding members...",{chatId,})

    // console.log("add member");
  };

  const openconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("delete");
  };

  const closeconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  // let name=groupDetails?.data?.chat?.name
  // let membersdata=groupDetails?.data?.chat?.members
  useEffect(() => {
    // console.log(groupDetails?.data)
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.name);
      setgroupnameUpdatedValue(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members);
    }
    return () => {
      setGroupName("");
      setgroupnameUpdatedValue("");
      setMembers([]);
      setisEdit(false);
    };
  }, [groupDetails.data]);

  const Iconbtns = (
    <>
      <IconButton
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            top: "1rem",
            right: "1rem",
          },
          ":hover": {
            color: "white",
            transition: "0.5s",
            bgcolor: "rgba(0,0,0,0.6)",
          },
        }}
        onClick={handleMobile}
      >
        <MenuIcon />
      </IconButton>
      <Tooltip
        title="back"
        onClick={navigateBack}
        sx={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          bgcolor: "rgba(2,2,2,1)",
          color: "white",
          borderRadius: "50%",
          padding: "3px",
          width: "35px",
          height: "35px",
          ":hover": { bgcolor: "white", color: "black", transition: "0.7s" },
        }}
      >
        <KeyboardBackspaceIcon />
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupnameUpdatedValue}
            onChange={(e) => setgroupnameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={groupRenameIsLoading}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupnameUpdatedValue}</Typography>
          <IconButton
            onClick={() => setisEdit(true)}
            disabled={groupRenameIsLoading}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{ sm: "row", xs: "column-reverse" }}
      spacing={"1rem"}
      p={{ sm: "1rem", xs: "0", md: "1rem 4rem" }}
    >
      <Button
        size="large"
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openconfirmDeleteHandler}
      >
        Delete group
      </Button>
      <Button
        variant="contained"
        size="large"
        startIcon={<AddIcon />}
        onClick={openAddmemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <Loading />
  ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        sx={{ display: { xs: "none", sm: "block" }, bgcolor: "springgreen" }}
      >
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {Iconbtns}
        {groupName && (
          <>
            {GroupName}
            <Typography marginBottom={"1rem"} marginTop={"1rem"}>
              Members
            </Typography>
            <Stack
              //  border={'2px solid #000'}
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{ sm: "1rem", xs: "0", md: "1rem 4rem" }}
              spacing={"2rem"}
              bgcolor={"#fff"}
              height={"70vh"}
              overflow={"auto"}
            >
              {removeMembersIsLoading ? (
                <CircularProgress />
              ) : (
                members.map((i) => (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      boxShadow: "5px 5px 15px rgba(0,0,0,0.7)",
                      padding: "1rem 2rem",
                      borderRadius: "15px",
                      // border:'2px solid #000'
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddmemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeconfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}
      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileclose}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <GroupList
          w={"50vw"}
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w} padding={"5px"}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        no groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, _id } = group;
  return (
    <Link
      to={`?groups=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack
        flexDirection={"row"}
        sx={{
          background:
            "linear-gradient(to left,rgba(255,255,255,0.8),rgb(175 169 169 / 32%))",
          border: "5px solid #000",
          borderRadius: "25px",
          padding: "5px",
          alignItems: "center",
          gap: "7px",
          marginBottom: "5px",
        }}
      >
        <Avatar></Avatar>
        <Typography
          sx={{
            fontFamily: "sans-serif",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          {name}
        </Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
