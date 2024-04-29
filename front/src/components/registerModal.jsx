import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterModal({ isOpen, onClose }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [nameInput, setNameInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const navigate = useNavigate()

    const handleRegister = () => {
        try {
            console.log('test');
            const url = 'http://localhost:2066/accounts/register'
            axios.post(url, {
                name: nameInput,
                username: usernameInput,
                email: emailInput,
                password: passwordInput,
                confirmPassword: confirmPasswordInput
            }).then(registerResponse => {
                onClose()
                setCurrentStep(1)
                setNameInput('')
                setUsernameInput('')
                setEmailInput('')
                setPasswordInput('')
                setConfirmPasswordInput('')
                console.log(registerResponse.data);
                const { success, token } = registerResponse.data
                console.log(token);
                if (success) {
                    localStorage.setItem('token', token)
                    const keepLoginUrl = 'http://localhost:2066/accounts/keep-login';
                    axios.get(keepLoginUrl, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(keepLoginResponse => {
                        const { success: keepLoginSuccess, findAccount } = keepLoginResponse.data;
                        if (keepLoginSuccess && findAccount) {
                            localStorage.setItem('username', findAccount.username);
                            localStorage.setItem('name', findAccount.name);
                            navigate('/dashboard')
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleNext = () => {
        console.log('next');
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder="Name"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose} marginRight={'10px'}>Cancel</Button>
                            <Button colorScheme="blue" onClick={handleNext}>Next</Button>
                        </ModalFooter>
                    </>
                );
            case 2:
                return (
                    <>
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    placeholder="Username"
                                    value={usernameInput}
                                    onChange={(e) => setUsernameInput(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handlePrevious} marginRight={'10px'}>Previous</Button>
                            <Button colorScheme="blue" onClick={handleNext}>Next</Button>
                        </ModalFooter>
                    </>
                );
            case 3:
                return (
                    <>
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    placeholder="Email"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handlePrevious} marginRight={'10px'}>Previous</Button>
                            <Button colorScheme="blue" onClick={handleNext}>Next</Button>
                        </ModalFooter>
                    </>
                );
            case 4:
                return (
                    <>
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    placeholder="Password"
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    type="password"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    placeholder="Confirm Password"
                                    value={confirmPasswordInput}
                                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                                    type="password"
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handlePrevious} marginRight={'10px'}>Previous</Button>
                            <Button colorScheme="blue" onClick={handleRegister}>Finish</Button>
                        </ModalFooter>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalHeader>Register</ModalHeader>
            <ModalContent>{renderStepContent()}</ModalContent>
        </Modal>
    );
}

export default RegisterModal;
