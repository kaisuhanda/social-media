import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input, } from '@chakra-ui/react';
import axios from "axios"
import { useState } from "react"

function PasswordModal({ isOpen, onClose }) {
    const [oldPassInp, setOldPassInp] = useState('')
    const [newPassInp, setNewPassInp] = useState('')
    const [confirmPassInp, setConfirmPassInp] = useState('')

    const handleResetPassword = () => {
        const url = 'http://localhost:2066/accounts/reset-password'
        axios.post(url, {
            oldPassword: oldPassInp,
            newPassword: newPassInp,
            confirmPassword: newPassInp
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            console.log("Password reset successful:", response.data);
            onClose()
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={'xl'} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Reset Password</ModalHeader>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Old password</FormLabel>
                        <Input
                            type='password'
                            value={oldPassInp}
                            onChange={(e) => setOldPassInp(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>New Password</FormLabel>
                        <Input
                            type='password'
                            value={newPassInp}
                            onChange={(e) => setNewPassInp(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Confirm New Password</FormLabel>
                        <Input
                            type='password'
                            value={confirmPassInp}
                            onChange={(e) => setConfirmPassInp(e.target.value)}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter justifyContent={'space-between'}>
                    <Button colorScheme='blue' mr={3} onClick={handleResetPassword}>
                        Reset Password
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default PasswordModal