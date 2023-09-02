import { useEffect, useState } from "react";
import { Box, Image, SimpleGrid, Text, useTheme, Card } from "@chakra-ui/react";
import { fetchExpansions } from "../APICalls/api";
import { Link } from "react-router-dom";

const Sets = () => {
  const [expansions, setExpansions] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchExpansions();
      setExpansions(data);
    };
    fetchData();
  }, []);

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
        Expansões do MTG
      </Text>
      <SimpleGrid columns={[1, 2, 3]} gap={4}>
        {expansions.map((expansion) => (
          <Link
            key={expansion.id}
            to={{
              pathname: `/expansion/${expansion.code}`,
              state: { expansionName: expansion.name },
            }}
          >
            <Box textAlign="center">
              <Card bg={"#F5FBEF"}>
                <Image
                  src={expansion.icon_svg_uri}
                  alt={expansion.name}
                  boxSize={10}
                  mx="auto"
                  mb={4}
                />
                <Text fontSize="lg" fontWeight="bold">
                  {expansion.name}
                </Text>
                <Text mt={2}>{expansion.release_date}</Text>
              </Card>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Sets;
