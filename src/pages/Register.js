import { useContext, useState } from "react";
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
  ChakraProvider,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext, UserDispatchContext } from "../ReferenceDataContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail);

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const setUserDetails = useContext(UserDispatchContext);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    axios
      .post("https://exercise-api-app.herokuapp.com/users/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        setUserDetails(response.data);
        console.log(response.data);
        localStorage.setItem("userDetails", JSON.stringify(response.data));

        navigate("/");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error.response);
        toast({
          title: error.response.data.message,
          description: "Enter some other email address",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <ChakraProvider>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        bg={useColorModeValue("gray.100", "gray.900")}
        justifyContent="center"
        alignItems="center"
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
                color="black"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CMdEmail color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="email address"
                      value={email}
                      color="black"
                      onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="username"
                      value={username}
                      color="black"
                      onChange={(e) => setUsername(e.target.value)}
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
                      color="black"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleShowClick}
                        color="black"
                      >
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
                  Register
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Already have an account?{" "}
          <Link to="../login" style={{ color: "orange.500" }}>
            <Button color="orange.500">Login </Button>
          </Link>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Register;
