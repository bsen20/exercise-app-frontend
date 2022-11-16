import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
// import { Link } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CFaUserAlt = chakra(MdEmail);
const CFaLock = chakra(FaLock);

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password);
    axios
      .post("https://exercise-api-app.herokuapp.com/users/signin", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        localStorage.setItem("userDetails", JSON.stringify(response.data));
        // setLoggedIn(true);
        // setgUsername(response.data.username);
        navigate("/");
        window.location.reload();
      })
      .catch(function (error) {
        toast({
          title: "Wrong Credentails",
          description: "Email or password did not match.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log(error);
      });
  };

  return (
    <>
      <ChakraProvider>
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          bg={useColorModeValue("gray.100")}
          justifyContent="center"
          alignItems="center"
          color={"black"}
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar bg="orange.500" />
            <Heading color="orange.400">Welcome</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
              <form>
                <Stack
                  spacing={4}
                  p="1rem"
                  bg={useColorModeValue("gray.100", "gray.900")}
                  boxShadow="md"
                >
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaUserAlt color="gray.300" />}
                      />
                      <Input
                        type="email"
                        placeholder="email address"
                        color={"black"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaLock color="gray.300" />}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText textAlign="right">
                      {/* <Link>forgot password?</Link> */}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="orange"
                    width="full"
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
          <Box>
            New to us?{" "}
            <Link to="../register" color="orange.500">
              <Button color="orange.500">Sign Up</Button>
            </Link>
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default Login;
