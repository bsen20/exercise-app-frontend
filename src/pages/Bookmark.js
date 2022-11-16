import React, { useState, useEffect, useContext } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Typography, Stack } from "@mui/material";

import ExerciseCard from "../components/ExerciseCard";
import axios from "axios";
import Loader from "../components/Loader";

const Bookmark = () => {
  const [exercises, setExercises] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (e, value) => {
    // console.log(value);
    setCurrentPage(value);
    window.scrollTo({ top: 4080, bahavior: "smooth" });
  };
  let exerciseData = [];
  useEffect(() => {
    const fetchExercisesData = async () => {
      const url = "https://exercise-api-app.herokuapp.com/bookmark/all";
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      let exercisesDataID = [];

      axios
        .put(url, {
          user_id: userDetails.user._id,
        })
        .then(function (response) {
          //   console.log(response);
          exercisesDataID = response.data;
          exercisesDataID.map((id) => {
            axios
              .get(
                `https://exercise-api-app.herokuapp.com/exercises/exercise/${id}`
              )
              .then(function (res) {
                exerciseData.push(res.data);
              })
              .catch(function (err) {
                console.log(err);
              });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
      setExercises(exerciseData);
      //   currentExercises = exercises;
    };
    fetchExercisesData();
  }, []);
  console.log(exercises);
  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h3" mt="46px" mb="30px">
        Your Exercises
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {exercises.length === 0 ? (
          <Loader />
        ) : (
          currentExercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))
        )}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            // defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Bookmark;
