import { Box, Flex, Link, Text, useTheme } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      as="footer"
      bg={theme.styles.global.body.footer}
      color={theme.styles.global.color}
      py={8}
    >
      <Flex direction="column" align="center">
        <Text fontSize="lg" fontFamily={theme.fonts.heading}>
          GatherCards
        </Text>
        <Text fontSize="sm" fontFamily={theme.fonts.body}>
          Todos os direitos reservados &copy; 2023
        </Text>
      </Flex>
      <Flex justify="center" mt={4}>
        <Link href="#" fontFamily={theme.fonts.menu}>
          Termos de Serviço
        </Link>
        <Text mx={2}>|</Text>
        <Link href="#" fontFamily={theme.fonts.menu}>
          Política de Privacidade
        </Link>
        <Text mx={2}>|</Text>
        <Link href="#" fontFamily={theme.fonts.menu}>
          Contato
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
