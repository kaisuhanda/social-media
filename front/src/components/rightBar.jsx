import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react';
import AccountListItem from './customComponents/accountListItem';
import SearchBar from './search';

function RightBar() {
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
                borderColor={'gray'}
            >
                <SearchBar />
                <Box
                    marginY={'20px'}
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
                <Box marginY={'20px'}>
                    <UnorderedList listStyleType={'none'} spacing={6}>
                        <ListItem>
                            <Heading as={'h2'} size={'lg'}>Who to follow</Heading>
                        </ListItem>
                        <AccountListItem/>
                        <AccountListItem/>
                        <AccountListItem/>
                    </UnorderedList>
                </Box>
            </Box>
        </>
    )
}

export default RightBar;