import { Button, Flex, useTheme } from "@chakra-ui/react";
import React from "react";

const Pagination = ({ currentPage, onPageChange, hasMore }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const theme = useTheme();
  return (
    <Flex justify="center" mt={4}>
      <Button
        disabled={currentPage === 1}
        size="lg"
        mx={1}
        bg={theme.colors.brand.button}
        colorScheme={
          currentPage === 1
            ? theme.colors.brand.background
            : theme.colors.brand.button
        }
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        bg={theme.colors.brand.button}
        colorScheme={
          !hasMore ? theme.colors.brand.background : theme.colors.brand.button
        }
        size="lg"
        mx={1}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
