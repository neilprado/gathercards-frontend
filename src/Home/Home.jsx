import { Box, Heading, Text, useTheme } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  const theme = useTheme();

  const sections = [
    {
      heading: "Bem-vindo à GatherCards",
      text: "Descubra um mundo mágico de colecionismo com nossa plataforma online para catalogar cartas de Magic: The Gathering. Aqui, você encontrará todas as informações sobre as expansões, poderá explorar cada conjunto de cartas e até mesmo catalogar sua própria coleção.",
    },
    {
      heading: "Explore as Expansões:",
      text: "Navegue por todas as expansões de Magic: The Gathering já lançadas. De clássicos como 'Alpha' e 'Beta' até as mais recentes, oferecemos uma lista completa de todas as expansões já lançadas. Descubra o enredo, os personagens e os conjuntos de cartas exclusivos de cada expansão.",
    },
    {
      heading: "Cartas por Expansão:",
      text: "Se você está procurando por cartas específicas de uma expansão, nossa plataforma facilita a busca. Selecione a expansão desejada e obtenha acesso a todas as cartas disponíveis nela. Explore as ilustrações, estude suas habilidades e saiba mais sobre o valor de cada carta. Não se sinta sozinho em sua jornada como colecionador. Nossa plataforma permite que você se conecte com outros jogadores, compartilhe sua coleção e descubra novas estratégias. Participe de fóruns, converse com outros colecionadores e desfrute de uma experiência de jogo ainda mais enriquecedora. Junte-se a nós na Magic Catalog e mergulhe no incrível universo de Magic: The Gathering. Desvende segredos, colecione cartas valiosas e torne-se um mestre nesse mundo de magia e estratégia. Seja bem-vindo ao seu novo lar para catalogar e compartilhar sua paixão por Magic!",
    },
  ];

  return (
    <Box p={4} maxW={800} m="0 auto">
      {sections.map((section, index) => (
        <Box
          key={index}
          mt={index === 0 ? 16 : 8}
          mb={index === sections.length - 1 ? 16 : 8}
        >
          <Heading
            as={index === 0 ? "h1" : "h2"}
            size={index === 0 ? "xl" : "l"}
            fontFamily={theme.fonts.heading}
            color={theme.colors.brand.heading}
            textAlign={index === 0 ? "center" : "left"}
          >
            {section.heading}
          </Heading>
          <Text mt={4} textAlign="justify" fontFamily={theme.fonts.body}>
            {section.text}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default Home;
