import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import theme from "./theme/theme";
import Menu from "./Menu/Menu";
import Home from "./Home/Home";
import Catalog from "./Catalog/Catalog";
import Sets from "./Sets/Sets";
import Footer from "./Footer/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ExpansionCards from "./Cards/ExpansionCards";
import AllCards from "./Cards/AllCards";
import MTGCard from "./Cards/MTGCard";

const App = () => {
  const [searchResult, setSearchResult] = useState(null);
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Flex direction="column" minH="100vh">
          <Menu searchResult={searchResult} setSearchResult={setSearchResult} />
          <Box flex={1}>
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/catalog" Component={Catalog} />
              <Route path="/sets" Component={Sets} />
              <Route
                path="/expansion/:expansionCode"
                Component={ExpansionCards}
              />
              <Route path="cards/:name" element={<AllCards />} />
              <Route path=":expansion/card/:id" Component={MTGCard} />
            </Routes>
          </Box>
          <Footer />
        </Flex>
      </Router>
    </ChakraProvider>
  );
};

export default App;
