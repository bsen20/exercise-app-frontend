import React, { useContext } from "react";
import { Typography, Box, Stack } from "@mui/material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";

import Loader from "./Loader";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const ExerciseVideos = ({ exerciseVideos, name }) => {
  // if (!exerciseVideos.length) return <Loader />;

  return (
    <Box sx={{ marginTop: { lg: "203px", xs: "20px" } }} p="20px">
      <Typography
        sx={{ fontSize: { lg: "44px", xs: "25px" } }}
        fontWeight={700}
        color="#000"
        mb="33px"
      >
        Watch{" "}
        <span style={{ color: "#FF2625", textTransform: "capitalize" }}>
          {name}
        </span>{" "}
        exercise videos
      </Typography>

      {/* <Stack
        sx={{ flexDirection: { lg: "row" }, gap: { lg: "110px", xs: "0px" } }}
        justifyContent="flex-start"
        flexWrap="wrap"
        alignItems="center"
      > */}
      {!exerciseVideos.length ? (
        <Loader />
      ) : (
        <ScrollMenu
        // LeftArrow={LeftArrow} RightArrow={RightArrow}
        >
          {exerciseVideos?.map((item, index) => (
            <Box mr="30px" key={index}>
              <a
                key={index}
                className="exercise-video"
                href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  style={{ borderRadius: "20px" }}
                  src={item.video.thumbnails[0].url}
                  alt={item.video.title}
                />
                <Box>
                  <Typography
                    sx={{ fontSize: { lg: "28px", xs: "18px" } }}
                    fontWeight={600}
                    color="#000"
                  >
                    {item.video.title}
                  </Typography>
                  <Typography fontSize="14px" color="#000">
                    {item.video.channelName}
                  </Typography>
                </Box>
              </a>
            </Box>
          ))}
        </ScrollMenu>
      )}
      {/* </Stack> */}
    </Box>
  );
};

export default ExerciseVideos;
