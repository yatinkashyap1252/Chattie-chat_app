import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useError = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else
          toast.error(error?.response?.data?.message || "Something went wrong");
      }
    });
  }, [errors]);
};

const useAsyncMutation = (mutationObject) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [mutate] = mutationObject();

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Updating data...");
    try {
      const res = await mutate(...args);
      // console.log(res);

      if (res?.data) {
        toast.success(res.data.message || "Updated data successfully", {
          id: toastId,
        });
        setData(res.data);
      } else {
        const errorMessage =
          res?.error?.data?.message || "An unknown error occurred";
        // console.error(errorMessage);
        toast.error(errorMessage, { id: toastId });
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };
  return [executeMutation, isLoading, data];
};

const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handlers]) => {
      socket.on(event,handlers);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handlers]) => {
        socket.off(event,handlers);
      })
    };
  },[socket,handlers]);
};

export { useError, useAsyncMutation, useSocketEvents };
