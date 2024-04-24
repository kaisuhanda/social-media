import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function ProfileModal({ onClose, isOpen }) {
    const [nameInput, setNameInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [myAccount, setMyAccount] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        const url = "http://localhost:2066/accounts/keep-login";
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            const account = response.data.findAccount;
            setMyAccount(account);
            setNameInput(account.name);
            setUsernameInput(account.username);
            setEmailInput(account.email);
        });
    }, []);

    const handleSaveChanges = () => {
        const token = localStorage.getItem('token');
        const url = "http://localhost:2066/accounts/edit";

        const updateData = {
            name: nameInput,
            username: usernameInput,
            email: emailInput,
        };

        axios.patch(url, updateData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log("Profile updated:", response.data);
            onClose(); // Close the modal on successful update
        }).catch((error) => {
            console.error("Error updating profile:", error);
        });
    };

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleSaveChanges}>
                        Save changes
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ProfileModal;