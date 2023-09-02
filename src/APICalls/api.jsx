import axios from "axios";

const api = axios.create({
  baseURL: "https://api.scryfall.com/",
});

export const fetchExpansions = async () => {
  try {
    const response = await api.get("sets");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching expansions now, try again later!", error);
    throw error;
  }
};

export const fetchExpansionCards = async (expansionCode, page) => {
  try {
    const response = await api.get(
      `cards/search?include_extras=true&include_variations=true&order=set&q=e%3A${expansionCode}&unique=prints&page=${page}`,
    );
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching expansion cards now, try again later!",
      error,
    );
    throw error;
  }
};

export const fetchCard = async (id) => {
  try {
    const response = await api.get(`cards/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching this card now, please try again later!",
      error,
    );
  }
  throw error;
};

export const fetchSearch = async (searchValue, page) => {
  try {
    const response = await api.get(
      `https://api.scryfall.com/cards/search?unique=prints&order=name&q=lang=en+name=${searchValue}&page=${page}`,
    );
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching all cards now, please try again later",
      error,
    );
    throw error;
  }
};

export const fetchCardLanguage = async (set, code, lang) => {
  try {
    const response = await api.get(`/cards/${set}/${code}/${lang}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching this card now, please try again later",
      error,
    );
    throw error;
  }
};
