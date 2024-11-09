export const changerPassword = async (apikey, data) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FASTFOOD_SERVER_API}/change/password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apikey,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
};