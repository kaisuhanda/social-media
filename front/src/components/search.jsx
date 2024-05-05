import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

function SearchBar({ width }) {
    return (
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
            />
        </InputGroup>
    )
}

export default SearchBar;
