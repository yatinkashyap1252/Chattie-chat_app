import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
} from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";
import {
  AudioFile,
  Image as ImageIcon,
  UploadFile,
  VideoFile,
} from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";
import { motion } from "framer-motion";

const Filemenu = ({ anchorE1, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const fileMenuCloseHandler = () => dispatch(setIsFileMenu(false));
  const [sendAttachments] = useSendAttachmentsMutation();
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const selectFileHandler = (ref) => {
    ref.current?.click();
  };

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);
    if (files.length <= 0) return;
    if (files.length > 5)
      return toast.error(`You can send up to 5 ${key} files at a time.`);

    dispatch(setUploadingLoader(true));
    const toastId = toast.loading(`Sending ${key}...`);
    fileMenuCloseHandler();

    try {
      const myForm = new FormData();
      myForm.append("chatId", chatId);
      files.forEach((file) => myForm.append("files", file));

      const res = await sendAttachments(myForm);
      if (res.data) {
        toast.success(`${key} sent successfully`, { id: toastId });
      } else {
        toast.error(`Failed to send ${key}`, { id: toastId });
      }
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  return (
    <Menu
      open={isFileMenu}
      anchorEl={anchorE1}
      onClose={fileMenuCloseHandler}
      PaperProps={{
        style: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          padding: "0.5rem",
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ width: "10rem" }}>
          <MenuList>
            <MenuItem
              onClick={() => selectFileHandler(imageRef)}
              style={{
                color: "white",
                borderRadius: "8px",
                transition: "background-color 0.3s ease, opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <Tooltip title="Image">
                <IconButton style={{ color: "white" }}>
                  <ImageIcon />
                </IconButton>
              </Tooltip>
              <ListItemText>Image</ListItemText>
              <input
                ref={imageRef}
                type="file"
                multiple
                accept="image/jpeg, image/png, image/gif"
                style={{ display: "none" }}
                onChange={(e) => fileChangeHandler(e, "image")}
              />
            </MenuItem>

            <MenuItem
              onClick={() => selectFileHandler(audioRef)}
              style={{
                color: "white",
                borderRadius: "8px",
                transition: "background-color 0.3s ease, opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <Tooltip title="Audio">
                <IconButton style={{ color: "white" }}>
                  <AudioFile />
                </IconButton>
              </Tooltip>
              <ListItemText>Audio</ListItemText>
              <input
                ref={audioRef}
                type="file"
                multiple
                accept="audio/mpeg, audio/wav"
                style={{ display: "none" }}
                onChange={(e) => fileChangeHandler(e, "audio")}
              />
            </MenuItem>

            <MenuItem
              onClick={() => selectFileHandler(videoRef)}
              style={{
                color: "white",
                borderRadius: "8px",
                transition: "background-color 0.3s ease, opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <Tooltip title="Video">
                <IconButton style={{ color: "white" }}>
                  <VideoFile />
                </IconButton>
              </Tooltip>
              <ListItemText>Video</ListItemText>
              <input
                ref={videoRef}
                type="file"
                multiple
                accept="video/webm, video/mp4, video/ogg"
                style={{ display: "none" }}
                onChange={(e) => fileChangeHandler(e, "video")}
              />
            </MenuItem>

            <MenuItem
              onClick={() => selectFileHandler(fileRef)}
              style={{
                color: "white",
                borderRadius: "8px",
                transition: "background-color 0.3s ease, opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <Tooltip title="Files">
                <IconButton style={{ color: "white" }}>
                  <UploadFile />
                </IconButton>
              </Tooltip>
              <ListItemText>Files</ListItemText>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="*"
                style={{ display: "none" }}
                onChange={(e) => fileChangeHandler(e, "file")}
              />
            </MenuItem>
          </MenuList>
        </div>
      </motion.div>
    </Menu>
  );
};

export default Filemenu;