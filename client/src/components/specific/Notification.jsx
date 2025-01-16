import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../../consonants/sampledata";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationQuery,
} from "../../redux/api/api";
import { useError } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const Notification = () => {
  const { isLoading, data, error, isError } = useGetNotificationQuery();

  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.misc);

  const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({ _id, accept }) => {
    // alert(`Friend Request ${accept}`);
    dispatch(setIsNotification(false))
    try {
      const res = await acceptRequest({ requestId: _id, accept });
      if (res.data?.success) {
        console.log("Use Socket");
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.error || "Something went wrong")
      }
    } catch (error) {
      console.log(error)
    }
  };

  useError([{ error, isError }]);

  // console.log(data);
  // console.log(data?.request);

  const closeHandler = () => dispatch(setIsNotification(false));

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        sx={{ bgcolor: "black", border: "3px solid #fff", color: "white" }}
        maxWidth={"30rem"}
      >
        <DialogTitle
          textAlign={"center"}
          style={{
            fontFamily: "fantasy",
            fontSize: "25px",
            letterSpacing: "2px",
            textDecoration: "3px solid underline #fff",
          }}
        >
          Notifications
        </DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : data?.request?.length > 0 ? (
          data?.request.map(({ sender, _id }) => (
            <NotificationItem
              sender={sender}
              _id={_id}
              handler={friendRequestHandler}
              key={_id}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>0 Notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />
        <Typography
          variant="body1"
          sx={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis" }}
        >{`${name} sent you a request.`}</Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={{ xs: "15px", sm: "1rem" }}
        >
          <Button
            size="medium"
            variant="contained"
            onClick={() => handler({ _id, accept: true })}
          >
            accept
          </Button>
          <Button
            variant="outlined"
            size="medium"
            color="error"
            onClick={() => handler({ _id, accept: false })}
          >
            rejected
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notification;
