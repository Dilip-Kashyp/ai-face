const BASE_URL = "http://localhost:5000/query";

const fetchWrapper = async (options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...options.headers,
      },
      mode: "cors",
      credentials: "same-origin",
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export const getData = async (data) => {
  return await fetchWrapper({
    method: "POST",
    body: JSON.stringify(data),
  });
};
