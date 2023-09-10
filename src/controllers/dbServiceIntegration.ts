import axios, { AxiosResponse } from "axios";

export const makeGraphQLRequest = async (query: string) => {
  //change to env
  const url = "http://localhost:3000/";

  try {
    const response = await axios.post(url, { query });
    console.log("Response from receiving server:", response.status);

    return response.data.data;
  } catch (error: any) {
    console.error("Error:", error.data);
  }
};
