// const API_BASE_URL = "https://localhost:7252/api"; // Your backend API base URL

// // Function to get the JWT token from localStorage
// const getToken = () => localStorage.getItem("token");

// // Helper for authenticated requests
// const fetchWithAuth = async (url, options = {}) => {
//   const token = getToken();
//   const headers = {
//     "Content-Type": "application/json",
//     ...options.headers,
//   };

//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   const response = await fetch(url, { ...options, headers });

//   if (response.status === 401) {
//     // Optionally, redirect to login page if token is invalid or expired
//     console.error("Unauthorized: Please log in again.");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userEmail"); // Clear stored email if you have one
//     window.location.href = "/login"; // Redirect to login
//   }

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({})); // Try to parse error, but don't fail if not JSON
//     throw new Error(
//       errorData.message || response.statusText || "Something went wrong!"
//     );
//   }
//   return response;
// };

// // --- Account Endpoints ---
// export const registerUser = async (userData) => {
//   const response = await fetchWithAuth(`${API_BASE_URL}/Account/register`, {
//     method: "POST",
//     body: JSON.stringify(userData),
//     headers: { "Content-Type": "application/json" }, // Explicitly set for non-auth initial call
//   });
//   return response.json();
// };

// export const loginUser = async (credentials) => {
//   const response = await fetchWithAuth(`${API_BASE_URL}/Account/login`, {
//     method: "POST",
//     body: JSON.stringify(credentials),
//     headers: { "Content-Type": "application/json" }, // Explicitly set for non-auth initial call
//   });
//   return response.json();
// };

// /*export const getUserData = async () => {
//   const response = await fetchWithAuth(`${API_BASE_URL}/Account/userdata`, {
//     method: "POST", // Backend uses POST for this endpoint
//   });
//   return response.json();
// };
// */
// export const getUserData = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     throw new Error("Unauthorized");
//   }

//   const response = await fetch(`${API_BASE_URL}/Account/userdata`, {
//     method: "POST", // <--- MUSI BYĆ POST ZGODNIE Z BACKENDEM
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({}), // Domyślne puste ciało dla POST, jeśli nie ma innych danych
//   });

//   if (!response.ok) {
//     if (response.status === 401) {
//       throw new Error("Unauthorized");
//     }
//     const errorData = await response
//       .json()
//       .catch(() => ({ message: `HTTP error! status: ${response.status}` }));
//     throw new Error(
//       errorData.message ||
//         `Failed to fetch user data. Status: ${response.status}`
//     );
//   }

//   const data = await response.json();
//   console.log("Raw user data from backend (Opcja A):", data); // Dodaj to do debugowania

//   // Zwracamy całe 'data', ponieważ oczekujemy, że będzie ono zawierało pole 'Subscriptions'
//   // lub inną strukturę, którą DashboardPage.jsx będzie przetwarzać.
//   return data;
// };

// // --- Subscription Endpoints ---
// export const getSubscriptions = async (filterName = "") => {
//   let url = `${API_BASE_URL}/Subscription`;
//   if (filterName) {
//     url += `?SubscriptionName=${encodeURIComponent(filterName)}`;
//   }
//   const response = await fetchWithAuth(url, {
//     method: "GET",
//   });
//   return response.json();
// };

// export const addSubscription = async (subscriptionData) => {
//   const response = await fetchWithAuth(`${API_BASE_URL}/Subscription`, {
//     method: "POST",
//     body: JSON.stringify(subscriptionData),
//   });
//   return response.json();
// };

// export const updateSubscription = async (id, subscriptionData) => {
//   const response = await fetchWithAuth(`${API_BASE_URL}/Subscription/${id}`, {
//     method: "PUT",
//     body: JSON.stringify(subscriptionData),
//   });
//   return response.json();
// };

// export const deleteSubscription = async (id) => {
//   const response = await fetchWithAuth(`${API_BASE_URL}/Subscription/${id}`, {
//     method: "DELETE",
//   });
//   if (response.status === 204) {
//     return true; // No content, but successful deletion
//   }
//   throw new Error("Failed to delete subscription");
// };

// // These are for assigning/unassigning user specific subscriptions if needed,
// // based on your backend description. Your current frontend doesn't seem to use them directly
// // for the Dashboard (it manages all subscriptions and user gets overview),
// // but they are available from the backend.
// export const assignSubscriptionToUser = async (subscriptionId) => {
//   const response = await fetchWithAuth(
//     `${API_BASE_URL}/Subscription/assign/${subscriptionId}`,
//     {
//       method: "POST",
//     }
//   );
//   return response.json();
// };

// export const removeSubscriptionFromUser = async (subscriptionId) => {
//   const response = await fetchWithAuth(
//     `${API_BASE_URL}/Subscription/assign/${subscriptionId}`,
//     {
//       method: "DELETE",
//     }
//   );
//   if (response.status === 204) {
//     return true;
//   }
//   throw new Error("Failed to remove subscription from user");
// };

const API_BASE_URL = "https://localhost:7252/api"; // UPEWNIJ SIĘ, ŻE TO JEST POPRAWNY URL DLA TWOJEGO BACKENDU (HTTP/HTTPS i port)!

// Function to get the JWT token from localStorage
const getToken = () => localStorage.getItem("token");

// Helper for authenticated requests
const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    console.error("Unauthorized: Please log in again.");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
    throw new Error("Unauthorized"); // Rzuć błąd, aby przerwać dalsze przetwarzanie
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || response.statusText || "Something went wrong!"
    );
  }
  return response;
};

// --- Account Endpoints ---
export const registerUser = async (userData) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/Account/register`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/Account/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const getUserData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${API_BASE_URL}/Account/userdata`, {
    method: "POST", // MUSI BYĆ POST ZGODNIE Z BACKENDEM
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}), // Domyślne puste ciało dla POST
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new new Error("Unauthorized")();
    }
    const errorData = await response
      .json()
      .catch(() => ({ message: `HTTP error! status: ${response.status}` }));
    throw new Error(
      errorData.message ||
        `Failed to fetch user data. Status: ${response.status}`
    );
  }

  const data = await response.json();
  console.log("Raw user data from backend (api.js - getUserData):", data); // Dodaj to do debugowania
  return data;
};

// --- Subscription Endpoints ---
export const getSubscriptions = async (filterName = "") => {
  let url = `${API_BASE_URL}/Subscription`;
  if (filterName) {
    url += `?SubscriptionName=${encodeURIComponent(filterName)}`;
  }
  const response = await fetchWithAuth(url, {
    method: "GET",
  });
  return response.json();
};

export const addSubscription = async (subscriptionData) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/Subscription`, {
    method: "POST",
    body: JSON.stringify(subscriptionData),
  });
  return response.json();
};

export const updateSubscription = async (id, subscriptionData) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/Subscription/${id}`, {
    method: "PUT",
    body: JSON.stringify(subscriptionData),
  });
  // Obsługa 204 No Content
  if (response.status === 204) {
    return {}; // Zwróć pusty obiekt, jeśli sukces, ale brak treści
  }
  return response.json();
};

export const deleteSubscription = async (id) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/Subscription/${id}`, {
    method: "DELETE",
  });
  if (response.status === 204) {
    return true; // No content, but successful deletion
  }
  throw new Error("Failed to delete subscription");
};

export const assignSubscriptionToUser = async (subscriptionId) => {
  const response = await fetchWithAuth(
    `${API_BASE_URL}/Subscription/assign/${subscriptionId}`,
    {
      method: "POST",
    }
  );
  return response.json();
};

export const removeSubscriptionFromUser = async (subscriptionId) => {
  const response = await fetchWithAuth(
    `${API_BASE_URL}/Subscription/assign/${subscriptionId}`,
    {
      method: "DELETE",
    }
  );
  if (response.status === 204) {
    return true;
  }
  throw new Error("Failed to remove subscription from user");
};
