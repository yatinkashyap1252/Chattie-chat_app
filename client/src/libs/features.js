import moment from "moment";

const fileFormat = (url = "") => {
  const fileExtension = url.split(".").pop();
  if (
    fileExtension === "mp4" ||
    fileExtension === "webm" ||
    fileExtension === "ogg"
  )
    return "video";
  if (
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "png" ||
    fileExtension === "gif"
  )
    return "image";
  if (fileExtension === "mp3" || fileExtension === "wav") return "audio";
  return "nothing";
};
const transformImage = (url = "", width = 100) => url;

const getLast7Days = () => {
  const currentdate = moment();
  const last7days = [];
  for (let i = 0; i < 7; i++) {
    const daydate = currentdate.clone().subtract(i, "days");
    const dayname = daydate.format("dddd");
    last7days.unshift(dayname);
  }
  return last7days;
};

const getSaveFunc = ({ key, value, get }) => {
  if (get)
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
    else localStorage.setItem(key,JSON.stringify(value))
};

export { fileFormat, transformImage, getLast7Days,getSaveFunc };
