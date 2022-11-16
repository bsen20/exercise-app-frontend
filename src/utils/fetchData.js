export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "12b750f74fmsh2725655f478c25ap10e2c9jsn720a79a92463",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "12b750f74fmsh2725655f478c25ap10e2c9jsn720a79a92463",
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};
