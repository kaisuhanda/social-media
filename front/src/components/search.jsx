import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

function SearchBar() {
    return (
        <InputGroup width={["full", "sm"]}>
            <InputLeftAddon children={<BiSearch />} bg={'black'} borderLeftRadius={'20px'}/>
            <Input
                borderRadius={'20px'}
                width={'300px'}
                type="text"
                placeholder="Search"
            />
        </InputGroup>
    )
}

export default SearchBar;