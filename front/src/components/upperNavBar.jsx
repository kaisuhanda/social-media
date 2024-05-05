import { Box, Container, UnorderedList, ListItem, Heading } from '@chakra-ui/react';
import { useState } from 'react';

function NavBar({ following, setFollowing }) {
    return (
        <>
            <Box
                bg={'black'}
                color={'white'}
                height={'70px'}
                borderBottom={'1px'}
                borderColor={'gray.700'}
            >
                <Container textAlign={'center'} height={'full'}>
                    <UnorderedList
                        height={'full'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        listStyleType={'none'}
                    >
                        <ListItem
                            marginX={'70px'}
                            marginTop={'35px'}
                            borderBottom={!following ? '4px' : ''}
                            borderRadius={'2px'}
                            borderColor={'lightblue'}
                            onClick={() => setFollowing(false)}
                        >
                            <Heading as={'h3'} size={'sm'} padding={'5px'}>For you</Heading>
                        </ListItem>
                        <ListItem
                            marginX={'70px'}
                            marginTop={'35px'}
                            borderBottom={following ? '4px' : ''}
                            borderRadius={'2px'}
                            borderColor={'lightblue'}
                            onClick={() => setFollowing(true)}
                        >
                            <Heading as={'h3'} size={'sm'} padding={'5px'}>Following</Heading>
                        </ListItem>
                    </UnorderedList>
                </Container>
            </Box>
        </>
    )
}

export default NavBar;