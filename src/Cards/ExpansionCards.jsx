import { useEffect, useState } from "react";
import { Box, Card, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { fetchExpansionCards } from "../APICalls/api";
import { useParams, Link } from "react-router-dom";
import Pagination from "../Page/Pagination";

const ExpansionCards = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [expansionName, setExpansionName] = useState("");
  const { expansionCode } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchExpansionCards(expansionCode, currentPage);
      setCards(data);
      setHasMore(data.hasMore);
      setExpansionName(data[0].set_name);
    };
    getData();
  }, [expansionCode, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
        Cartas da Expansão - {expansionName}
      </Text>
      <SimpleGrid columns={[1, 2, 3, 4]} gap={6}>
        {cards.map((card) => (
          <Link
            key={card.id}
            to={{
              pathname: `/${card.set_name}/card/${card.id}`,
              state: { id: card.id },
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

export default ExpansionCards;
