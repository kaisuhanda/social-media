import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react';
import AccountListItem from './customComponents/accountListItem';
import SearchBar from './search';
import { useState, useEffect } from 'react';
import axios from 'axios';

function RightBarNoSearch() {
    const [currentUserId, setCurrentUserId] = useState(0)
    const [accounts, setAccounts] = useState([])

    const fetchAccounts = async () => {
        try {
            let url = 'http://localhost:2066/accounts'
            const response = await fetch(url)
            const accountResponse = await response.json()
            const accountsData = accountResponse.accounts;
            setAccounts(accountsData);
            console.log("Accounts response : ", accountsData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAccounts()
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        const url = "http://localhost:2066/accounts/keep-login"
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const { success: keepLoginSuccess, findAccount } = response.data;
            if (keepLoginSuccess && findAccount) {
                setCurrentUserId(findAccount.id)
            }
        })
        console.log("abchdbj ", currentUserId);
    }, [])

    return (
        <>
            <Box
                bg={'black'}
                color={'white'}
                height={'100vh'}
                width={'445px'}
                paddingX={'50px'}
                paddingY={'30px'}
                right={0}
                borderLeft={'1px'}
                borderColor={'gray.700'}
            >
                <Box
                    marginY={'20px'}
                    width={'300px'}
                    bg={'gray.900'}
                    padding={'10px'}
                    borderRadius={'20px'}
                >
                    <UnorderedList listStyleType={'none'} spacing={6} color={'gray'}>
                        <ListItem>
                            <Heading as={'h3'} size={'lg'} color={'white'}>Trends for you</Heading>
                        </ListItem>
                        <ListItem>
                            <Heading as={'h5'} size={'md'} color={'white'}>Trend 1</Heading>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        </ListItem>
                        <ListItem>
                            <Heading as={'h5'} size={'md'} color={'white'}>Trend 2</Heading>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        </ListItem>
                        <ListItem>
                            <Heading as={'h5'} size={'md'} color={'white'}>Trend 3</Heading>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        </ListItem>
                        <ListItem>
                            <Heading as={'h5'} size={'md'} color={'white'}>Trend 4</Heading>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        </ListItem>
                    </UnorderedList>
                </Box>
            </Box>
        </>
    )
}

export default RightBarNoSearch;