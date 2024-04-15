import { Box, Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [inputUsername, setInputUsername] = useState('')
    const [inputPassword, setInputPassword] = useState('')
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
        >
            <Box>
                <FormControl width={'400px'}>
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
                    >
                        <Button width={'100px'} colorScheme="twitter" borderRadius={'20px'} onClick={HandleLogin}>log in</Button>
                    </Box>
                </FormControl>
            </Box>
        </Box>
    )
}

export default Login;