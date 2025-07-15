import moment from "moment";

const fileFormat = (url = "") => {
  const fileExtension = url.split(".").pop().toLowerCase();

  const videoFormats = ["mp4", "webm", "ogg"];
  const imageFormats = ["jpg", "jpeg", "png", "gif"];
  const audioFormats = ["mp3", "wav"];
  const pdfFormats = ["pdf"];
  const wordFormats = ["doc", "docx"];

  if (videoFormats.includes(fileExtension)) return "video";
  if (imageFormats.includes(fileExtension)) return "image";
  if (audioFormats.includes(fileExtension)) return "audio";
  if (pdfFormats.includes(fileExtension)) return "pdf";
  if (wordFormats.includes(fileExtension)) return "doc";

  return "unknown";
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
  else localStorage.setItem(key, JSON.stringify(value));
};

export { fileFormat, transformImage, getLast7Days, getSaveFunc };
