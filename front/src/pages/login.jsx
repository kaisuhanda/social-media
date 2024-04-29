import { Box, Button, FormControl, FormLabel, Heading, Input, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../components/registerModal";

function Login() {
    const [inputUsername, setInputUsername] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const { isOpen: isOpenRegister, onOpen: onOpenRegister, onClose: onCloseRegister } = useDisclosure()
    const navigate = useNavigate();
    const HandleLogin = () => {
        try {
            // URL for login
            const url = 'http://localhost:2066/accounts/login';
            // Axios runs the request, along with the headers
            axios.post(url, {
                username: inputUsername,
                password: inputPassword
            })
                // Axios needs to return a promise, using then and a callback function
                .then(loginResponse => {
                    // Extracts the success and the token from the response
                    const { success, token } = loginResponse.data;
                    console.log(token);

                    // If successful, sets the token into the local storage
                    if (success) {
                        localStorage.setItem('token', token);

                        // URL for logging in with the token
                        const keepLoginUrl = 'http://localhost:2066/accounts/keep-login';
                        // Axios runs the request, along with the headers
                        axios.get(keepLoginUrl, {
                            headers: {
                                Authorization: `Bearer ${token}` // Use the token from login response
                            }
                        })
                            // Axios needs to return a promise, using then and a callback function
                            .then(keepLoginResponse => {
                                // Extracts the success and the findAccount from the response
                                const { success: keepLoginSuccess, findAccount } = keepLoginResponse.data;
                                // If successful, sets the username in the local storage and moves to the dashboard
                                if (keepLoginSuccess && findAccount) {
                                    localStorage.setItem('username', findAccount.username);
                                    localStorage.setItem('name', findAccount.name);
                                    navigate('/dashboard')
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={'100vh'}
            width={'100vw'}
            bg={"black"}
            color={"white"}
        >
            <Box fontSize={'600px'} marginRight={'250px'} color={"white"}>
                ¥
            </Box>
            <Box height={'100vh'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Box >
                    <Box marginBottom={'50px'}>
                        <Heading fontSize={'70px'} marginBottom={'20px'}>Happening now</Heading>
                        <Heading>Join today.</Heading>
                    </Box>
                    <Box display={"flex"} justifyContent={'center'} alignItems={"center"}>
                        <FormControl width={'450px'}>
                            <Box marginBottom={'20px'} color={"white"}>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    borderRadius={'20px'}
                                    bg={"white"}
                                    color={"gray"}
                                    onChange={(e) => setInputUsername(e.target.value)}
                                />
                            </Box>
                            <Box marginBottom={'20px'} color={"white"}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    borderRadius={'20px'}
                                    bg={"white"}
                                    color={"gray"}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                />
                            </Box>
                            <Box
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                marginTop={'20px'}
                            >
                                <Button paddingX={'70px'} marginTop={'20px'} fontSize={'20px'} colorScheme="twitter" borderRadius={'20px'} onClick={HandleLogin}>log in</Button>
                            </Box>
                        </FormControl>
                    </Box>
                    <Box marginY={'30px'} display={"flex"} justifyContent={'center'} alignItems={"center"}>
                        <Box>
                            <Heading fontSize={'20px'}>Don't have an account?</Heading>
                            <Box display={"flex"} justifyContent={'center'} alignItems={"center"}>
                                <Button
                                    marginTop={'30px'}
                                    bg={'none'}
                                    color={"white"}
                                    border={'1px'}
                                    borderColor={'white'}
                                    borderRadius={'20px'}
                                    paddingX={'70px'}
                                    onClick={onOpenRegister}
                                >
                                    Register
                                </Button>
                                <RegisterModal onClose={onCloseRegister} isOpen={isOpenRegister} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Login;