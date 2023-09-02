import { Box, Card, SimpleGrid, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listCards } from "../APICalls/collection";

import Pagination from "../Page/Pagination";

const Catalog = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [length, setLength] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await listCards(currentPage);
      setCards(response.data.content);
      setHasMore(!response.data.last);
      if (totalElements !== response.data.totalElements) {
        setTotalElements(response.data.totalElements);
      }
    };
    fetchData();
  }, [currentPage, totalElements]);

  useEffect(() => {
    if (length !== cards.length) {
      setLength(cards.length);
    }
  }, [cards]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
        Sua coleção - {totalElements} carta(s)
      </Text>
      <SimpleGrid columns={[1, 2, 3, 4]} gap={6}>
        {cards.map((card) => (
          <Link
            key={card.id}
            to={{
              pathname: `/${card.set_name}/card/${card.id}`,
              state: { card: card },
            }}
          >
            <Box textAlign="center" key={card.id}>
              <Card bg={"#F5FBEF"}>
                <Text fontSize="md" fontWeight="bold">
                  {card.name} - ({card.numberOfCopies}){" "}
                </Text>
                {card.image ? (
                  <Image src={card.image} alt={card.name} />
                ) : (
                  <Text> Imagem não disponível</Text>
                )}
              </Card>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        hasMore={hasMore}
      />
    </Box>
  );
};

export default Catalog;
