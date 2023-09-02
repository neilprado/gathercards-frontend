import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Stack,
  Link,
  useTheme,
  Input,
  IconButton,
  AlertIcon,
  Alert,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { fetchSearch } from "../APICalls/api";
import { useNavigate } from "react-router-dom";

const Menu = ({ searchResult, setSearchResult }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(false);
  const theme = useTheme();

  const handleSearch = async () => {
    if (searchValue.trim() === "") {
      setError(true);
      return;
    }
    const response = await fetchSearch(searchValue);
    setSearchResult(response);
    setSearchValue("");
    navigate(`/cards/${encodeURIComponent(searchValue)}`);
  };

  return (
    <Flex
      bg={theme.colors.brand.background}
      color={theme.styles.global.body.color}
      minH={"60px"}
      py={2}
      px={4}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={theme.styles.global.body.bg}
      align={"center"}
    >
      <Link
        textAlign={"left"}
        fontFamily={theme.fonts.heading}
        color={theme.styles.global.body.bg}
        href="/"
        _hover={{
          textDecoration: "none",
        }}
        mr={8}
      >
        GatherCards
      </Link>

      <Stack direction={"row"} spacing={4} align="center">
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Link
              p={2}
              href={navItem.href ?? "#"}
              fontSize={"sm"}
              fontWeight={500}
              color={theme.colors.brand.buttonText}
              fontFamily={theme.fonts.menu}
              _hover={{
                textDecoration: "underline",
                color: theme.styles.global.color,
              }}
            >
              {navItem.label}
            </Link>
          </Box>
        ))}
      </Stack>
      <Flex ml="auto">
        <Box>
          <InputGroup>
            <Input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search your card"
              borderColor={theme.colors.brand.buttonText}
              color={theme.colors.brand.buttonText}
              _focus={{ borderColor: theme.colors.brand.buttonText }}
              width="500px"
            />
            <InputRightElement>
              <IconButton
                icon={<SearchIcon />}
                onClick={handleSearch}
                type="submit"
                aria-label="Buscar"
                bg={theme.colors.brand.button}
                _hover={{
                  background: theme.colors.login._hover,
                }}
              />
            </InputRightElement>
          </InputGroup>
          {error && (
            <Alert status="error" mt={2}>
              <AlertIcon />
              Please, fill your search box.
            </Alert>
          )}
        </Box>
      </Flex>

      <Flex ml={"auto"}>
        <Button
          as={"a"}
          fontSize={"sm"}
          color={theme.colors.brand.buttonText}
          fontFamily={theme.fonts.menu}
          fontWeight={400}
          variant={"link"}
          href={"#"}
          mx={2}
          _hover
        >
          Sign In
        </Button>
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={600}
          color={theme.colors.brand.buttonText}
          fontFamily={theme.fonts.menu}
          bg={theme.colors.brand.button}
          href={"#"}
          _hover={{
            textDecoration: "none",
            background: theme.colors.login._hover,
          }}
        >
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

const NAV_ITEMS = [
  {
    label: "Catalog",
    href: "/catalog",
  },
  {
    label: "All Sets",
    href: "/sets",
  },
];

export default Menu;
