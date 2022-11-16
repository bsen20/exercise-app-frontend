import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Stack } from "@mui/material";
import { UserContext, UserDispatchContext } from "../ReferenceDataContext";
import axios from "axios";

const ExerciseCard = ({ exercise }) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  // const setUserDetails = useContext(UserDispatchContext);
  const imageClick = () => {
    window.scrollTo({ top: 10, bahavior: "smooth" });
  };
  const performLike = async () => {
    if (!userDetails) return;
    console.log(userDetails);
    axios
      .put("https://exercise-api-app.herokuapp.com/bookmark", {
        user_id: userDetails.user._id,
        exercise_id: exercise._id,
      })
      .then(function (response) {
        console.log(response.data);
        // setUserDetails(response.data.user);
        console.log(userDetails);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return (
    <Link className="exercise-card" to={`/exercise/${exercise._id}`}>
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        onClick={imageClick}
      />
      <Stack direction="row">
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#ffa9a9",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {exercise.bodyPart}
        </Button>
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#fcc757",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {exercise.target}
        </Button>
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#FF0000",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
          onClick={performLike}
        >
          Likes{"  "}
          {exercise.likes}
        </Button>
      </Stack>
      <Typography
        ml="21px"
        color="#000"
        fontWeight="bold"
        mt="11px"
        pb="10px"
        textTransform="capitalize"
        fontSize="22px"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
