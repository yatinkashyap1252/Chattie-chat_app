import { useInputValidation } from "6pp"; // Custom hook for validating user input
import SearchIcon from "@mui/icons-material/Search";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api"; // API hook for user search
import { setIsSearch } from "../../redux/reducers/misc"; // Action to close the search dialog
import UserItem from "../shared/UserItem"; // Reusable user item component
import { toast } from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hooks";

const Search = () => {
  // Redux state for managing the search modal's visibility
  const { isSearch } = useSelector((state) => state.misc);

  // Lazy loading the user search query
  const [searchUser, { isLoading, isError }] = useLazySearchUserQuery();
  const [sendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

  // Dispatch function for closing the search modal
  const dispatch = useDispatch();

  // Input validation for search field using a custom hook
  const search = useInputValidation("");

  // State to hold search results (users)
  const [users, setUsers] = useState([]);

  // Handler to simulate sending a friend request
  const addFriendHandler = async (id) => {
    // console.log("Sending friend request to user with ID:", id);
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  // console.log(users._id)

  // Close the search modal
  const handleCloseSearch = () => dispatch(setIsSearch(false));

  // Search logic to fetch users based on input
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.value.trim()) {
        searchUser(search.value) // Fetch users matching the search query
          .then(({ data }) => {
            // console.log(data);
            setUsers(data.users); // Update state with fetched users
            // console.log(search.value)
            // console.log(data.users);
          })
          .catch((err) => {
            console.error("Search error:", err); // Log any errors
            setUsers([]); // Clear users in case of error
          });
      } else {
        setUsers([]); // Clear users if search field is empty
      }
    }, 1000); // Wait 1000ms to avoid too frequent calls during typing

    return () => {
      clearTimeout(timeout); // Clean up the timeout when the component unmounts
    };
  }, [search.value]); // Trigger useEffect when the search value changes

  return (
    <Dialog open={isSearch} onClose={handleCloseSearch}>
      <Stack
        padding={"2rem"}
        direction={"column"}
        width={"30rem"}
        sx={{
          bgcolor: "black",
          border: "3px solid #fff",
          color: "white",
          maxHeight: "80vh", // Set maximum height for the dialog
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        {/* Dialog Title */}
        <DialogTitle
          textAlign={"center"}
          style={{
            fontFamily: "fantasy",
            fontSize: "25px",
            textDecoration: "3px solid underline #fff",
          }}
        >
          Search Users
        </DialogTitle>

        {/* Search Input */}
        <TextField
          label="Search"
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          sx={{
            border: "3px solid #fff",
            borderRadius: "5px",
            color: "white", // Text color
            input: {
              color: "white", // Color of the typed text
            },
            label: {
              color: "white", // Label color
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "white", // Border before input is focused
            },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "white", // Border color on hover
            },
            "& .MuiOutlinedInput-root": {
              color: "white", // Color of text and border of the input field
            },
            "& .MuiInputLabel-root": {
              color: "white", // Color of the label text
            },
            "& .MuiInputBase-input": {
              color: "white", // Color of the input text when focused
            },
          }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <CircularProgress sx={{ margin: "1rem auto" }} color="inherit" />
        )}

        {/* Error Message */}
        {isError && (
          <Typography color="error" textAlign="center">
            Error fetching users. Please try again.
          </Typography>
        )}

        {/* No Results Found */}
        {users.length === 0 && !isLoading && !isError && (
          <Typography textAlign="center" color="gray">
            No users found
          </Typography>
        )}

        {/* List of Users */}
        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id} // Fallback to another unique identifier (e.g., name)
              handler={addFriendHandler}
              handlerIsLoading={isLoading}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
