import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
});

export const insertCard = async (newCard) => {
  try {
    const response = await api.post("collections", newCard);
    return response.data;
  } catch (error) {
    console.error("Error creating a new card in your collection", error);
    throw error;
  }
};

export const listCards = async (page) => {
  try {
    console.log(page);
    const response = await api.get(`collections?page=${page}&size=1000`);
    return response;
  } catch (error) {
    console.error("Error when your collection was fetched", error);
    throw error;
  }
};

export const getCard = async (id) => {
  try {
    const response = await api.get(`collections/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Fetched card not found, or was not possible to get a card",
      error,
    );
    throw error;
  }
};

export const updateCard = async (id, card) => {
  try {
    const response = await api.put(`collections/${id}`, card);
    return response.data;
  } catch (error) {
    console.error("Unable to update card, try again later", error);
  }
};

export const deleteCard = async (id) => {
  try {
    const response = await api.delete(`collections/${id}`);
    return response;
  } catch (error) {
    console.error("Unable to delete card", error);
    throw error;
  }
};
