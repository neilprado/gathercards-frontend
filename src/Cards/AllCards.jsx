import { Box, Card, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchSearch } from "../APICalls/api";
import { Link, useParams } from "react-router-dom";
import Pagination from "../Page/Pagination";

const AllCards = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSearch(params.name, currentPage);
      setCards(response);
      setHasMore(response.hasMore);
    };
    fetchData();
  }, [params.name, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
        Cartas encontradas - {cards.length}
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
                <Text fontSize="lg" fontWeight="bold">
                  {card.name}
                </Text>
                {card.image_uris?.normal ? (
                  <Image src={card.image_uris.normal} alt={card.name} />
                ) : (
                  <Text>Imagem não disponível</Text>
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

export default AllCards;
