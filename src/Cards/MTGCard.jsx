import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCard, fetchCardLanguage } from "../APICalls/api";
import { FaFlagUsa, FaTrash } from "react-icons/fa";
import { GiBrazilFlag } from "react-icons/gi";

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Image,
  Link,
  Text,
  useTheme,
} from "@chakra-ui/react";
import InputNumber from "../Inputs/InputNumber";
import {
  getCard,
  insertCard,
  updateCard,
  deleteCard,
} from "../APICalls/collection";

const MTGCard = () => {
  const { id } = useParams();

  const [card, setCard] = useState("");
  const [language, setLanguage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [numberOfCopies, setNumberOfCopies] = useState(0);
  const [updateButton, setUpdateButton] = useState(false);

  const navigation = useNavigate();

  const theme = useTheme();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCard(id);
      setCard(data);

      if (data.id) {
        const cardData = await getCard(data.id);
        if (cardData.numberOfCopies > 0) {
          setNumberOfCopies(cardData.numberOfCopies);
          setUpdateButton(true);
        } else {
          setUpdateButton(false);
        }
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCardLanguage(
        card.set,
        card.collector_number,
        language,
      );
      setCard(data);
    };
    getData();
  }, [refresh]);

  const handleClick = async (set, codeNumber, lang) => {
    setLanguage(lang);
    fetchCardLanguage(set, codeNumber, lang);
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const handleChange = (copies) => {
    setNumberOfCopies(copies);
  };

  const handleDelete = (id) => {
    deleteCard(id);
    navigation("/catalog");
  };

  const handleSubmit = async () => {
    const requestCard = {
      id: card.id,
      expansion: card.set_name,
      image: card.image_uris ? card.image_uris.normal : "Not found",
      name: card.name,
      set: card.set,
      numberOfCopies: numberOfCopies,
    };
    updateButton ? updateCard(card.id, requestCard) : insertCard(requestCard);
    navigation("/catalog");
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" textAlign="center">
        {card.printed_name ? card.printed_name : card.name} - {card.set_name}
      </Text>
      <Flex justify="center" mb={2}>
        <Button
          onClick={() => handleClick(card.set, card.collector_number, "en")}
          aria-label="USA Flag"
          mr={1}
          size="sm"
          bg={theme.colors.brand.background}
          _hover={{
            background: theme.colors.brand.button,
          }}
        >
          EN
        </Button>
        <Button
          onClick={() => handleClick(card.set, card.collector_number, "pt")}
          aria-label="Brazil Flag"
          size="sm"
          ml={1}
          bg={theme.colors.brand.background}
          _hover={{
            background: theme.colors.brand.button,
          }}
        >
          PT
        </Button>
      </Flex>
      <Flex justify="center">
        <Card align="center" maxW="400px" borderRadius="md">
          <Flex justify="center">
            {card.image_uris?.normal ? (
              <Image src={card.image_uris.normal} alt={card.name} />
            ) : (
              <Text fontWeight="bold">Imagem não disponível</Text>
            )}
          </Flex>
        </Card>
      </Flex>
      <Flex justifyContent="center">
        <Accordion allowToggle maxW={400} mb={5}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box
                  flex={1}
                  textAlign="center"
                  fontFamily={theme.fonts.heading}
                >
                  Details
                </Box>
                <AccordionItem />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text fontFamily={theme.fonts.menu} textAlign="center">
                Expansão: {card.set_name}
              </Text>
            </AccordionPanel>
            <AccordionPanel>
              <Text fontFamily={theme.fonts.menu} textAlign="center">
                Descrição
              </Text>
              {
                <Text fontFamily={theme.fonts.menu} textAlign="justify">
                  {card.printed_text ? card.printed_text : card.oracle_text}
                </Text>
              }
            </AccordionPanel>
            <AccordionPanel>
              <Text fontFamily={theme.fonts.menu} textAlign="center">
                <Link
                  href={card.related_uris?.edhrec}
                  isExternal
                  _hover={{ fontWeight: 700, textDecoration: "none" }}
                >
                  Decks - EDHREC
                </Link>
              </Text>
              <Text fontFamily={theme.fonts.menu} textAlign="center">
                <Link
                  href={card.related_uris?.tcgplayer_infinite_decks}
                  isExternal
                  _hover={{ fontWeight: 700, textDecoration: "none" }}
                >
                  Decks - TCGPLAYER
                </Link>
              </Text>
            </AccordionPanel>
            <AccordionPanel>
              <Text fontFamily={theme.fonts.menu} textAlign="center">
                Número de cópias
              </Text>
              <InputNumber
                numberOfCopies={numberOfCopies}
                onChange={handleChange}
              />
              <Flex justifyContent="center">
                <Button
                  onClick={() => handleSubmit()}
                  fontSize={"sm"}
                  mt={2}
                  fontWeight={600}
                  color={theme.colors.brand.buttonText}
                  fontFamily={theme.fonts.menu}
                  bg={theme.colors.brand.button}
                  _hover={{
                    textDecoration: "none",
                    background: theme.colors.login._hover,
                  }}
                >
                  {updateButton ? "Atualizar" : "Cadastrar"}
                </Button>
              </Flex>
              {updateButton && (
                <Flex justifyContent="center">
                  <IconButton
                    onClick={() => handleDelete(card.id)}
                    aria-label="Trash can"
                    size="sm"
                    mt={3}
                    icon={<FaTrash />}
                    bg={theme.colors.brand.background}
                    _hover={{
                      background: theme.colors.brand.button,
                    }}
                  />
                </Flex>
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </Box>
  );
};

export default MTGCard;
