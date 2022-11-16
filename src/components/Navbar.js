import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const [userDetails, setuserDetails] = useState();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user) {
      setuserDetails(user);
    }
  }, []);
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      sx={{
        gap: { sm: "122px", xs: "40px" },
        mt: { sm: "32px", xs: "20px" },
        justifyContent: "none",
      }}
      px="20px"
    >
      <Link to="/">
        <img
          src={Logo}
          alt="logo"
          style={{ width: "48px", height: "48px", margin: "0 20px" }}
        />
      </Link>
      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            borderBottom: "3px solid #FF2625",
          }}
        >
          Home
        </Link>
        <a
          href="#bookmark"
          style={{ textDecoration: "none", color: "#3A1212" }}
          onClick={() => {
            window.scrollTo({ top: 5000, bahavior: "smooth" });
          }}
        >
          Exercises
        </a>

        {userDetails ? (
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#3A1212",
              borderBottom: "3px solid #FF2625",
            }}
            onClick={() => {
              localStorage.removeItem("userDetails");
              navigate("/");
              window.location.reload();
            }}
          >
            Logout
          </Link>
        ) : (
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#3A1212",
              borderBottom: "3px solid #FF2625",
            }}
          >
            Login
          </Link>
        )}
      </Stack>
    </Stack>
  );
};

export default Navbar;
