import { Box, Flex, Heading, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";
import IconContainer from "./customComponents/IconContainer";
import { useNavigate } from "react-router-dom";

function SearchBar({ width }) {
    const [searchInput, setSearchInput] = useState('')
    const [accounts, setAccounts] = useState([])
    const [currentUserId, setCurrentUserId] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:2066/accounts').then(response => {
            setAccounts(response.data.accounts)
        })

        const token = localStorage.getItem('token')
        axios.get("http://localhost:2066/accounts/keep-login", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const { success: keepLoginSuccess, findAccount } = response.data;
            if (keepLoginSuccess && findAccount) {
                setCurrentUserId(findAccount.id)
            }
        })
    }, [])

    return (
        <Box>
            <InputGroup
                width={width}
                borderRadius={'20px'}
                bg={'gray.800'}
                border={'none'}
            >
                <InputLeftElement pointerEvents='none' color={'gray.400'}>
                    <BiSearch />
                </InputLeftElement>
                <Input
                    type='text'
                    placeholder='Search...'
                    border={'none'}
                    _focus={{ outline: 'none' }}
                    _hover={{ border: 'none' }}
                    bg={'transparent'}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </InputGroup>
            {searchInput && (
                <Box
                    bg={'gray.800'}
                    borderRadius={'20px'}
                    width={width}
                    padding={'10px'}
                    position={'fixed'}
                    maxHeight={'500px'}
                    overflowY={"auto"}
                >
                    {accounts.filter(account => account.id != currentUserId && (
                        account.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                        account.username.toLowerCase().includes(searchInput.toLowerCase())
                    )).map((account, index) => (
                        <Flex
                            key={index}
                            borderBottom={'1px'}
                            borderColor={'black'}
                            padding={'10px'}
                            onClick={() => navigate(`/view/${account.id}`)}
                        >
                            <IconContainer>
                                <RiAccountCircleFill size={40} />
                            </IconContainer>
                            <Box>
                                <Heading as={"h2"} size={"md"}>
                                    {account.name}
                                </Heading>
                                <Heading as={"h2"} size={"sm"} color={"gray"}>
                                    @{account.username}
                                </Heading>
                            </Box>
                        </Flex>
                    ))}
                </Box>
            )}
        </Box>
    )
}

export default SearchBar;
