import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Logo from "../assets/images/Logo-1.png";

const Footer = () => {
  return (
    <Box mt="80px" backgroundColor="#f5c1c6">
      <Stack gap="40px" alignItems="center" px="40px" pt="24px">
        <img src={Logo} alt="logo" width="200px" height="40px" />
        <Typography variant="h5" mb="40px" mt="20px">
          Made By Bibek Sen
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
