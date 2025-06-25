// // // import { useState, useEffect, useCallback } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import Navbar from "../components/Navbar";
// // // import SubscriptionForm from "../components/SubscriptionForm";
// // // import SubscriptionTable from "../components/SubscriptionTable";
// // // import {
// // //   getUserData,
// // //   addSubscription,
// // //   updateSubscription,
// // //   deleteSubscription,
// // // } from "../services/api";

// // // function DashboardPage() {
// // //   const [subscriptions, setSubscriptions] = useState([]);
// // //   const [filter, setFilter] = useState("");
// // //   const [priceFilter, setPriceFilter] = useState("");
// // //   const [sortOrder, setSortOrder] = useState("asc");
// // //   const [editSubscriptionData, setEditSubscriptionData] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [userEmail] = useState(localStorage.getItem("userEmail") || "");

// // //   const navigate = useNavigate();

// // //   const handleLogout = useCallback(() => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("userEmail");
// // //     navigate("/login");
// // //   }, [navigate]);

// // //   // Funkcja do pobierania subskrypcji z backendu
// // //   const fetchSubscriptions = useCallback(async () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     try {
// // //       const userData = await getUserData();
// // //       // POPRAWIONO MAPOWANIE: userData.Subscriptions jest listą SubscriptionDto
// // //       /*const fetchedSubs = (userData?.Subscriptions || []).map((sub) => ({
// // //         id: sub.id, // Dostęp bezpośredni do id
// // //         name: sub.ServiceName, // Dostęp bezpośredni do ServiceName
// // //         price: sub.Cost, // Dostęp bezpośredni do Cost
// // //         description: sub.Description, // Dostęp bezpośredni do Description
// // //         category: sub.Category, // Dostęp bezpośredni do Category
// // //         frequency: sub.Frequency, // Dostęp bezpośredni do Frequency
// // //         */
// // //       const fetchedSubs = (userData?.subscriptions || []).map((sub) => ({
// // //         id: sub.Id, // <--- Tutaj musi być zgodność z tym, co zwraca DTO z IUserService
// // //         name: sub.serviceName,
// // //         price: sub.cost,
// // //         description: sub.description,
// // //         category: sub.category,
// // //         frequency: sub.frequency,
// // //       }));
// // //       setSubscriptions(fetchedSubs);
// // //     } catch (err) {
// // //       console.error("Failed to fetch subscriptions:", err);
// // //       setError(err.message || "Nie udało się załadować subskrypcji.");
// // //       if (err.message.includes("Unauthorized")) {
// // //         handleLogout();
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [handleLogout]);

// // //   useEffect(() => {
// // //     fetchSubscriptions();
// // //   }, [fetchSubscriptions]);

// // //   const handleAddOrUpdateSubscription = async (subData) => {
// // //     setError(null);
// // //     try {
// // //       if (editSubscriptionData) {
// // //         await updateSubscription(editSubscriptionData.id, {
// // //           id: editSubscriptionData.id,
// // //           serviceName: subData.name,
// // //           cost: subData.price,
// // //           frequency: subData.frequency, // Przekazujemy częstotliwość z subData
// // //           startDate: editSubscriptionData.startDate, // Zachowaj istniejącą datę rozpoczęcia
// // //           description: subData.description, // Przekazujemy opis z subData
// // //           category: subData.category, // Przekazujemy kategorię z subData
// // //         });
// // //         setEditSubscriptionData(null);
// // //         alert("Subskrypcja zaktualizowana!");
// // //       } else {
// // //         await addSubscription({
// // //           serviceName: subData.name,
// // //           cost: subData.price,
// // //           frequency: subData.frequency, // Przekazujemy częstotliwość z subData
// // //           startDate: new Date().toISOString(), // Data dla nowej subskrypcji
// // //           description: subData.description, // Przekazujemy opis z subData
// // //           category: subData.category, // Przekazujemy kategorię z subData
// // //         });
// // //         alert("Subskrypcja dodana!");
// // //       }
// // //       fetchSubscriptions();
// // //     } catch (err) {
// // //       console.error("Operation failed:", err);
// // //       setError(err.message || "Nie udało się wykonać operacji.");
// // //     }
// // //   };

// // //   const handleRemoveSubscription = async (idToRemove) => {
// // //     setError(null);
// // //     if (window.confirm("Czy na pewno chcesz usunąć tę subskrypcję?")) {
// // //       try {
// // //         await deleteSubscription(idToRemove);
// // //         alert("Subskrypcja usunięta!");
// // //         fetchSubscriptions();
// // //       } catch (err) {
// // //         console.error("Deletion failed:", err);
// // //         setError(err.message || "Nie udało się usunąć subskrypcji.");
// // //       }
// // //     }
// // //   };

// // //   const handleEditSubscription = (idToEdit) => {
// // //     const subToEdit = subscriptions.find((sub) => sub.id === idToEdit);
// // //     if (subToEdit) {
// // //       setEditSubscriptionData(subToEdit);
// // //     }
// // //   };

// // //   const handleSort = () => {
// // //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// // //   };

// // //   const filteredAndSortedSubscriptions = subscriptions
// // //     .filter((sub) => {
// // //       const matchesName = sub.name.toLowerCase().includes(filter.toLowerCase());
// // //       const parsedPriceFilter = parseFloat(priceFilter);
// // //       const matchesPrice =
// // //         priceFilter === "" ||
// // //         isNaN(parsedPriceFilter) ||
// // //         sub.price <= parsedPriceFilter;
// // //       return matchesName && matchesPrice;
// // //     })
// // //     .sort((a, b) =>
// // //       sortOrder === "asc" ? a.price - b.price : b.price - a.price
// // //     );

// // //   if (loading) {
// // //     return <div className="container">Ładowanie subskrypcji...</div>;
// // //   }

// // //   return (
// // //     <div>
// // //       <Navbar user={userEmail} onLogout={handleLogout} />
// // //       <div className="container">
// // //         <h2>Twoje subskrypcje</h2>

// // //         {error && <p style={{ color: "red" }}>{error}</p>}

// // //         <input
// // //           type="text"
// // //           placeholder="Filtruj po nazwie"
// // //           value={filter}
// // //           onChange={(e) => setFilter(e.target.value)}
// // //         />
// // //         <input
// // //           type="number"
// // //           placeholder="Filtruj po cenie (max)"
// // //           value={priceFilter}
// // //           onChange={(e) => setPriceFilter(e.target.value)}
// // //           style={{ marginLeft: "10px" }}
// // //         />
// // //         <button onClick={handleSort} className="btn-primary">
// // //           Sortuj {sortOrder === "asc" ? "▲" : "▼"}{" "}
// // //         </button>

// // //         <SubscriptionForm
// // //           onAdd={handleAddOrUpdateSubscription}
// // //           editData={editSubscriptionData}
// // //         />

// // //         <SubscriptionTable
// // //           subscriptions={filteredAndSortedSubscriptions}
// // //           onRemove={handleRemoveSubscription}
// // //           onEdit={handleEditSubscription}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default DashboardPage;

// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getUserData,
//   deleteSubscription,
//   updateSubscription, // Upewnij się, że masz tę funkcję zaimplementowaną w api.js
//   addSubscription, // Upewnij się, że masz tę funkcję zaimplementowaną w api.js
// } from "../services/api";
// import SubscriptionTable from "../components/SubscriptionTable";

// function DashboardPage() {
//   const navigate = useNavigate();
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("");
//   const [priceFilter, setPriceFilter] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
//   const [newSubscriptionName, setNewSubscriptionName] = useState("");
//   const [newSubscriptionPrice, setNewSubscriptionPrice] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentSubscription, setCurrentSubscription] = useState(null); // Dla edycji

//   // Funkcja wylogowywania
//   const handleLogout = useCallback(() => {
//     localStorage.removeItem("token");
//     console.log("Token usunięty. Przekierowanie do /login"); // Dodaj log
//     navigate("/login");
//   }, [navigate]);

//   // Funkcja pobierająca subskrypcje użytkownika
//   const fetchSubscriptions = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const userData = await getUserData(); // Oczekujemy obiektu z polem 'subscriptions'
//       console.log("Raw user data from backend (api.js):", userData); // Logowanie surowych danych

//       if (userData && Array.isArray(userData.subscriptions)) {
//         const fetchedSubs = userData.subscriptions.map((sub, index) => {
//           // Dodaj index tutaj
//           console.log(
//             `Backend sub ${index}: ID=${sub.id}, ServiceName=${sub.serviceName}, Cost=${sub.cost}`
//           ); // Dodatkowe logowanie
//           if (typeof sub.id === "undefined" || sub.id === null) {
//             console.error(
//               `Błąd: Subskrypcja z backendu na indeksie ${index} ma undefined/null ID!`,
//               sub
//             );
//           }
//           return {
//             id: sub.id,
//             name: sub.serviceName, // Upewnij się, że to jest serviceName z backendu
//             price: sub.cost, // Upewnij się, że to jest cost z backendu
//             description: sub.description,
//             category: sub.category,
//             frequency: sub.frequency, // Pamiętaj, że frequency może być enumem w backendzie
//           };
//         });
//         console.log(
//           "Przetworzone subskrypcje do wyświetlenia (z DashboardPage):",
//           fetchedSubs
//         );
//         setSubscriptions(fetchedSubs);
//       } else {
//         console.warn(
//           "Brak pola 'subscriptions' lub nie jest tablicą w danych użytkownika:",
//           userData
//         );
//         setSubscriptions([]); // Ustaw pustą tablicę, aby uniknąć błędów
//       }
//     } catch (err) {
//       console.error("Failed to fetch subscriptions:", err);
//       setError(err.message || "Nie udało się załadować subskrypcji.");
//       if (err.message.includes("Unauthorized")) {
//         handleLogout();
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [handleLogout]);

//   useEffect(() => {
//     fetchSubscriptions();
//   }, [fetchSubscriptions]);

//   // Filtrowanie i sortowanie subskrypcji
//   const filteredAndSortedSubscriptions = subscriptions
//     .filter((sub) => {
//       const matchesName = sub.name.toLowerCase().includes(filter.toLowerCase());
//       const parsedPriceFilter = parseFloat(priceFilter);
//       const matchesPrice =
//         priceFilter === "" ||
//         isNaN(parsedPriceFilter) ||
//         sub.price <= parsedPriceFilter;
//       return matchesName && matchesPrice;
//     })
//     .sort((a, b) =>
//       sortOrder === "asc" ? a.price - b.price : b.price - a.price
//     );

//   // Obsługa usuwania subskrypcji
//   const handleRemoveSubscription = async (idToRemove) => {
//     setError(null);
//     console.log(
//       "handleRemoveSubscription: Próba usunięcia subskrypcji z ID:",
//       idToRemove
//     );
//     if (typeof idToRemove === "undefined" || idToRemove === null) {
//       console.error(
//         "handleRemoveSubscription: Błąd usuwania: ID subskrypcji jest undefined/null."
//       );
//       setError("Nie można usunąć: ID subskrypcji jest nieprawidłowe.");
//       return;
//     }

//     if (window.confirm("Czy na pewno chcesz usunąć tę subskrypcję?")) {
//       try {
//         await deleteSubscription(idToRemove);
//         alert("Subskrypcja usunięta!");
//         fetchSubscriptions(); // Odśwież listę po usunięciu
//       } catch (err) {
//         console.error("Nie udało się usunąć subskrypcji:", err);
//         setError(err.message || "Nie udało się usunąć subskrypcji.");
//       }
//     }
//   };

//   // Obsługa dodawania subskrypcji
//   const handleAddSubscription = async () => {
//     setError(null);
//     if (!newSubscriptionName || !newSubscriptionPrice) {
//       setError("Nazwa i cena są wymagane.");
//       return;
//     }
//     try {
//       const newSubData = {
//         serviceName: newSubscriptionName,
//         cost: parseFloat(newSubscriptionPrice),
//         frequency: "Monthly", // Domyślna wartość
//         description: "Brak opisu",
//         category: "Inne",
//       };
//       console.log("Dodawanie subskrypcji:", newSubData);
//       await addSubscription(newSubData);
//       alert("Subskrypcja dodana!");
//       setNewSubscriptionName("");
//       setNewSubscriptionPrice("");
//       fetchSubscriptions(); // Odśwież listę po dodaniu
//     } catch (err) {
//       console.error("Nie udało się dodać subskrypcji:", err);
//       setError(err.message || "Nie udało się dodać subskrypcji.");
//     }
//   };

//   // Obsługa otwierania modalu edycji
//   const handleEditSubscription = (subId) => {
//     console.log(
//       "handleEditSubscription: Próba edycji subskrypcji z ID:",
//       subId
//     );
//     if (typeof subId === "undefined" || subId === null) {
//       console.error(
//         "handleEditSubscription: Błąd edycji: ID subskrypcji jest undefined/null."
//       );
//       setError("Nie można edytować: ID subskrypcji jest nieprawidłowe.");
//       return;
//     }
//     const subToEdit = subscriptions.find((sub) => sub.id === subId);
//     if (subToEdit) {
//       setCurrentSubscription(subToEdit);
//       setIsModalOpen(true);
//     } else {
//       setError("Nie znaleziono subskrypcji do edycji.");
//     }
//   };

//   // Obsługa zapisywania edytowanej subskrypcji
//   const handleSaveEdit = async () => {
//     setError(null);
//     if (
//       !currentSubscription ||
//       typeof currentSubscription.id === "undefined" ||
//       currentSubscription.id === null
//     ) {
//       setError("Błąd zapisu: brak danych subskrypcji lub ID.");
//       return;
//     }
//     try {
//       // Dostosuj dane do formatu oczekiwanego przez backend DTO
//       const updatedData = {
//         id: currentSubscription.id,
//         serviceName: currentSubscription.name, // Mapping back
//         cost: parseFloat(currentSubscription.price),
//         description: currentSubscription.description, // Upewnij się, że te pola są dostępne w CurrentSubscription
//         category: currentSubscription.category,
//         frequency: currentSubscription.frequency,
//       };
//       console.log("Zapisywanie edytowanej subskrypcji:", updatedData);
//       await updateSubscription(currentSubscription.id, updatedData);
//       alert("Subskrypcja zaktualizowana!");
//       setIsModalOpen(false);
//       setCurrentSubscription(null);
//       fetchSubscriptions(); // Odśwież listę
//     } catch (err) {
//       console.error("Nie udało się zaktualizować subskrypcji:", err);
//       setError(err.message || "Nie udało się zaktualizować subskrypcji.");
//     }
//   };

//   if (loading) {
//     return <div>Ładowanie subskrypcji...</div>;
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Twoje subskrypcje</h2>
//       <button onClick={handleLogout} style={{ float: "right" }}>
//         Wyloguj
//       </button>
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Filtruj po nazwie"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Filtruj po cenie (max)"
//           value={priceFilter}
//           onChange={(e) => setPriceFilter(e.target.value)}
//         />
//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//         >
//           <option value="asc">Sortuj rosnąco</option>
//           <option value="desc">Sortuj malejąco</option>
//         </select>
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Nazwa subskrypcji"
//           value={newSubscriptionName}
//           onChange={(e) => setNewSubscriptionName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Cena miesięczna"
//           value={newSubscriptionPrice}
//           onChange={(e) => setNewSubscriptionPrice(e.target.value)}
//         />
//         <button onClick={handleAddSubscription}>Dodaj</button>
//       </div>

//       <SubscriptionTable
//         subscriptions={filteredAndSortedSubscriptions}
//         onRemove={handleRemoveSubscription}
//         onEdit={handleEditSubscription}
//       />

//       {isModalOpen && currentSubscription && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>Edytuj subskrypcję</h3>
//             <label>
//               Nazwa:
//               <input
//                 type="text"
//                 value={currentSubscription.name || ""}
//                 onChange={(e) =>
//                   setCurrentSubscription({
//                     ...currentSubscription,
//                     name: e.target.value,
//                   })
//                 }
//               />
//             </label>
//             <label>
//               Cena:
//               <input
//                 type="number"
//                 value={currentSubscription.price || ""}
//                 onChange={(e) =>
//                   setCurrentSubscription({
//                     ...currentSubscription,
//                     price: parseFloat(e.target.value),
//                   })
//                 }
//               />
//             </label>
//             {/* Dodaj pola dla Description, Category, Frequency jeśli chcesz je edytować */}
//             <button onClick={handleSaveEdit}>Zapisz zmiany</button>
//             <button onClick={() => setIsModalOpen(false)}>Anuluj</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DashboardPage;

// const API_BASE_URL = "https://localhost:7252/api"; // UPEWNIJ SIĘ, ŻE TO JEST POPRAWNY URL DLA TWOJEGO BACKENDU (HTTP/HTTPS i port)!

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
//     console.error("Unauthorized: Please log in again.");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userEmail");
//     window.location.href = "/login";
//     throw new Error("Unauthorized"); // Rzuć błąd, aby przerwać dalsze przetwarzanie
//   }

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
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
//     headers: { "Content-Type": "application/json" },
//   });
//   return response.json();
// };

// export const loginUser = async (credentials) => {
//   const response = await fetchWithAuth(`${API_BASE_URL}/Account/login`, {
//     method: "POST",
//     body: JSON.stringify(credentials),
//     headers: { "Content-Type": "application/json" },
//   });
//   return response.json();
// };

// export const getUserData = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     throw new Error("Unauthorized");
//   }

//   const response = await fetch(`${API_BASE_URL}/Account/userdata`, {
//     method: "POST", // MUSI BYĆ POST ZGODNIE Z BACKENDEM
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({}), // Domyślne puste ciało dla POST
//   });

//   if (!response.ok) {
//     if (response.status === 401) {
//       throw new new Error("Unauthorized")();
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
//   console.log("Raw user data from backend (api.js - getUserData):", data); // Dodaj to do debugowania
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
//   // Obsługa 204 No Content
//   if (response.status === 204) {
//     return {}; // Zwróć pusty obiekt, jeśli sukces, ale brak treści
//   }
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

// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getUserData,
//   deleteSubscription,
//   updateSubscription,
//   addSubscription,
// } from "../services/api";
// import SubscriptionTable from "../components/SubscriptionTable";

// // WAŻNE: Przyjmujemy onLogout jako prop
// function DashboardPage({ onLogout }) {
//   const navigate = useNavigate();
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("");
//   const [priceFilter, setPriceFilter] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [newSubscriptionName, setNewSubscriptionName] = useState("");
//   const [newSubscriptionPrice, setNewSubscriptionPrice] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentSubscription, setCurrentSubscription] = useState(null);

//   // Zmieniono: Teraz wywołujemy prop onLogout zamiast lokalnej funkcji
//   const handleLogout = useCallback(() => {
//     onLogout(); // Wywołujemy funkcję z App.js, która zaktualizuje stan isLoggedIn
//     navigate("/login"); // Przekierowanie po wylogowaniu
//   }, [onLogout, navigate]); // Zależności: onLogout i navigate

//   const fetchSubscriptions = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const userData = await getUserData();
//       console.log("Raw user data from backend (getUserData):", userData);

//       if (userData && Array.isArray(userData.subscriptions)) {
//         const fetchedSubs = userData.subscriptions.map((sub, index) => {
//           if (typeof sub.id === "undefined" || sub.id === null) {
//             console.error(
//               `Błąd: Subskrypcja z backendu na indeksie ${index} ma undefined/null ID!`,
//               sub
//             );
//           }
//           return {
//             id: sub.id,
//             name: sub.serviceName,
//             price: sub.cost,
//             description: sub.description,
//             category: sub.category,
//             frequency: sub.frequency,
//           };
//         });
//         console.log(
//           "Przetworzone subskrypcje do wyświetlenia (z DashboardPage):",
//           fetchedSubs
//         );
//         setSubscriptions(fetchedSubs);
//       } else {
//         console.warn(
//           "Brak pola 'subscriptions' lub nie jest tablicą w danych użytkownika:",
//           userData
//         );
//         setSubscriptions([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch subscriptions:", err);
//       setError(err.message || "Nie udało się załadować subskrypcji.");
//       if (err.message.includes("Unauthorized")) {
//         // Ważne: to wywołanie handleLogout spowoduje, że wywoła się onLogout z App.js
//         handleLogout();
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [handleLogout]);

//   useEffect(() => {
//     fetchSubscriptions();
//   }, [fetchSubscriptions]);

//   // Handle removing a subscription
//   const handleRemoveSubscription = useCallback(
//     async (id) => {
//       try {
//         await deleteSubscription(id);
//         fetchSubscriptions(); // Refresh the list after deletion
//       } catch (err) {
//         console.error("Failed to remove subscription:", err);
//         setError(err.message || "Nie udało się usunąć subskrypcji.");
//       }
//     },
//     [fetchSubscriptions]
//   );

//   // Handle adding a new subscription
//   const handleAddSubscription = useCallback(async () => {
//     if (!newSubscriptionName || !newSubscriptionPrice) {
//       setError("Wprowadź nazwę i cenę nowej subskrypcji.");
//       return;
//     }
//     try {
//       const newSubData = {
//         serviceName: newSubscriptionName,
//         cost: parseFloat(newSubscriptionPrice),
//         frequency: "Monthly", // Domyślna wartość, możesz dodać pole do wyboru
//         description: "", // Domyślna wartość
//         category: "", // Domyślna wartość
//       };
//       await addSubscription(newSubData);
//       setNewSubscriptionName("");
//       setNewSubscriptionPrice("");
//       fetchSubscriptions(); // Refresh the list after adding
//     } catch (err) {
//       console.error("Failed to add subscription:", err);
//       setError(err.message || "Nie udało się dodać subskrypcji.");
//     }
//   }, [newSubscriptionName, newSubscriptionPrice, fetchSubscriptions]);

//   // Handle opening the edit modal
//   const handleEditSubscription = useCallback((subscription) => {
//     setCurrentSubscription({ ...subscription });
//     setIsModalOpen(true);
//   }, []);

//   // Handle changes in the edit modal form
//   const handleModalChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setCurrentSubscription((prev) => ({
//       ...prev,
//       [name]: name === "price" ? parseFloat(value) : value,
//     }));
//   }, []);

//   // Handle saving edited subscription
//   const handleSaveEdit = useCallback(async () => {
//     if (!currentSubscription || !currentSubscription.id) {
//       setError("Błąd: Brak wybranej subskrypcji do edycji.");
//       return;
//     }
//     try {
//       const updatedSubData = {
//         serviceName: currentSubscription.name,
//         cost: currentSubscription.price,
//         description: currentSubscription.description,
//         category: currentSubscription.category,
//         frequency: currentSubscription.frequency,
//       };
//       await updateSubscription(currentSubscription.id, updatedSubData);
//       setIsModalOpen(false);
//       fetchSubscriptions(); // Refresh the list after editing
//     } catch (err) {
//       console.error("Failed to update subscription:", err);
//       setError(err.message || "Nie udało się zaktualizować subskrypcji.");
//     }
//   }, [currentSubscription, fetchSubscriptions]);

//   const filteredAndSortedSubscriptions = subscriptions
//     .filter((sub) => {
//       const matchesName = sub.name.toLowerCase().includes(filter.toLowerCase());
//       const parsedPriceFilter = parseFloat(priceFilter);
//       const matchesPrice =
//         priceFilter === "" ||
//         isNaN(parsedPriceFilter) ||
//         sub.price <= parsedPriceFilter;
//       return matchesName && matchesPrice;
//     })
//     .sort((a, b) =>
//       sortOrder === "asc" ? a.price - b.price : b.price - a.price
//     );

//   if (loading) {
//     return <div className="container">Ładowanie subskrypcji...</div>;
//   }

//   return (
//     <div className="dashboard-page-container">
//       <nav
//         style={{
//           padding: "10px",
//           background: "#f8f9fa",
//           borderBottom: "1px solid #e9ecef",
//         }}
//       >
//         <h2>Twoje subskrypcje</h2>
//         <button
//           onClick={handleLogout}
//           style={{
//             float: "right",
//             padding: "8px 12px",
//             backgroundColor: "#dc3545",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Wyloguj
//         </button>
//       </nav>

//       <div className="container" style={{ padding: "20px" }}>
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <div style={{ marginBottom: "20px" }}>
//           <input
//             type="text"
//             placeholder="Filtruj po nazwie"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             style={{
//               marginRight: "10px",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           />
//           <input
//             type="number"
//             placeholder="Filtruj po cenie (max)"
//             value={priceFilter}
//             onChange={(e) => setPriceFilter(e.target.value)}
//             style={{
//               marginRight: "10px",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "44px",
//             }}
//           />
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             style={{
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           >
//             <option value="asc">Sortuj rosnąco</option>
//             <option value="desc">Sortuj malejąco</option>
//           </select>
//         </div>

//         <div
//           style={{
//             marginBottom: "30px",
//             border: "1px solid #eee",
//             padding: "15px",
//             borderRadius: "8px",
//             backgroundColor: "#f9f9f9",
//           }}
//         >
//           <h3>Dodaj nową subskrypcję</h3>
//           <input
//             type="text"
//             placeholder="Nazwa subskrypcji"
//             value={newSubscriptionName}
//             onChange={(e) => setNewSubscriptionName(e.target.value)}
//             style={{
//               marginRight: "10px",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           />
//           <input
//             type="number"
//             placeholder="Cena miesięczna"
//             value={newSubscriptionPrice}
//             onChange={(e) => setNewSubscriptionPrice(e.target.value)}
//             style={{
//               marginRight: "10px",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           />
//           <button
//             onClick={handleAddSubscription}
//             style={{
//               padding: "8px 15px",
//               backgroundColor: "#28a745",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Dodaj
//           </button>
//         </div>

//         <SubscriptionTable
//           subscriptions={filteredAndSortedSubscriptions}
//           onRemove={handleRemoveSubscription}
//           onEdit={handleEditSubscription}
//         />

//         {isModalOpen && currentSubscription && (
//           <div className="modal">
//             <div className="modal-content">
//               <h3>Edytuj subskrypcję</h3>
//               <label>
//                 Nazwa:
//                 <input
//                   type="text"
//                   name="name"
//                   value={currentSubscription.name || ""}
//                   onChange={handleModalChange}
//                 />
//               </label>
//               <label>
//                 Cena:
//                 <input
//                   type="number"
//                   name="price"
//                   value={currentSubscription.price || ""}
//                   onChange={handleModalChange}
//                 />
//               </label>
//               <label>
//                 Opis:
//                 <input
//                   type="text"
//                   name="description"
//                   value={currentSubscription.description || ""}
//                   onChange={handleModalChange}
//                 />
//               </label>
//               <label>
//                 Kategoria:
//                 <input
//                   type="text"
//                   name="category"
//                   value={currentSubscription.category || ""}
//                   onChange={handleModalChange}
//                 />
//               </label>
//               <label>
//                 Częstotliwość:
//                 <select
//                   name="frequency"
//                   value={currentSubscription.frequency || "Monthly"}
//                   onChange={handleModalChange}
//                 >
//                   <option value="Monthly">Miesięcznie</option>
//                   <option value="Annually">Rocznie</option>
//                   <option value="Weekly">Tygodniowo</option>
//                   <option value="Quarterly">Kwartalnie</option>
//                 </select>
//               </label>
//               <button onClick={handleSaveEdit}>Zapisz zmiany</button>
//               <button onClick={() => setIsModalOpen(false)}>Anuluj</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;

// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getUserData,
//   deleteSubscription,
//   updateSubscription,
//   addSubscription,
// } from "../services/api";
// import SubscriptionTable from "../components/SubscriptionTable";

// function DashboardPage({ onLogout }) {
//   console.log("DashboardPage renderuje się!");
//   const navigate = useNavigate();
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("");
//   const [priceFilter, setPriceFilter] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [newSubscriptionName, setNewSubscriptionName] = useState("");
//   const [newSubscriptionPrice, setNewSubscriptionPrice] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentSubscription, setCurrentSubscription] = useState(null);

//   const handleLogout = useCallback(() => {
//     onLogout();
//     navigate("/login");
//   }, [onLogout, navigate]);

//   const fetchSubscriptions = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const userData = await getUserData();
//       console.log("Raw user data from backend (getUserData):", userData);

//       if (userData && Array.isArray(userData.subscriptions)) {
//         const fetchedSubs = userData.subscriptions.map((sub, index) => {
//           if (typeof sub.id === "undefined" || sub.id === null) {
//             console.error(
//               `Błąd: Subskrypcja z backendu na indeksie ${index} ma undefined/null ID!`,
//               sub
//             );
//           }
//           return {
//             id: sub.id,
//             name: sub.serviceName,
//             price: sub.cost,
//             description: sub.description,
//             category: sub.category,
//             frequency: sub.frequency,
//           };
//         });
//         console.log(
//           "Przetworzone subskrypcje do wyświetlenia (z DashboardPage):",
//           fetchedSubs
//         );
//         setSubscriptions(fetchedSubs);
//       } else {
//         console.warn(
//           "Brak pola 'subscriptions' lub nie jest tablicą w danych użytkownika:",
//           userData
//         );
//         setSubscriptions([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch subscriptions:", err);
//       setError(err.message || "Nie udało się załadować subskrypcji.");
//       if (err.message.includes("Unauthorized")) {
//         handleLogout();
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [handleLogout]);

//   useEffect(() => {
//     fetchSubscriptions();
//   }, [fetchSubscriptions]);

//   const handleRemoveSubscription = useCallback(
//     async (id) => {
//       try {
//         await deleteSubscription(id);
//         fetchSubscriptions();
//       } catch (err) {
//         console.error("Failed to remove subscription:", err);
//         setError(err.message || "Nie udało się usunąć subskrypcji.");
//       }
//     },
//     [fetchSubscriptions]
//   );

//   const handleAddSubscription = useCallback(async () => {
//     if (!newSubscriptionName || !newSubscriptionPrice) {
//       setError("Wprowadź nazwę i cenę nowej subskrypcji.");
//       return;
//     }
//     try {
//       const newSubData = {
//         serviceName: newSubscriptionName,
//         cost: parseFloat(newSubscriptionPrice),
//         frequency: "Monthly",
//         description: "",
//         category: "",
//       };
//       await addSubscription(newSubData);
//       setNewSubscriptionName("");
//       setNewSubscriptionPrice("");
//       fetchSubscriptions();
//     } catch (err) {
//       console.error("Failed to add subscription:", err);
//       setError(err.message || "Nie udało się dodać subskrypcji.");
//     }
//   }, [newSubscriptionName, newSubscriptionPrice, fetchSubscriptions]);

//   // ZMODYFIKOWANO: handleEditSubscription pobiera tylko potrzebne pola
//   const handleEditSubscription = useCallback((subscription) => {
//     setCurrentSubscription({
//       id: subscription.id,
//       name: subscription.name,
//       price: subscription.price,
//     });
//     setIsModalOpen(true);
//   }, []);

//   const handleModalChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setCurrentSubscription((prev) => ({
//       ...prev,
//       [name]: name === "price" ? parseFloat(value) : value,
//     }));
//   }, []);

//   // ZMODYFIKOWANO: handleSaveEdit wysyła tylko serviceName i cost
//   const handleSaveEdit = useCallback(async () => {
//     if (!currentSubscription || !currentSubscription.id) {
//       setError("Błąd: Brak wybranej subskrypcji do edycji.");
//       return;
//     }
//     try {
//       const updatedSubData = {
//         serviceName: currentSubscription.name,
//         cost: currentSubscription.price,
//         // USUNIĘTO: description, category, frequency
//       };
//       await updateSubscription(currentSubscription.id, updatedSubData);
//       setIsModalOpen(false);
//       setCurrentSubscription(null); // Ważne: zresetuj currentSubscription po zapisie
//       fetchSubscriptions();
//     } catch (err) {
//       console.error("Failed to update subscription:", err);
//       setError(err.message || "Nie udało się zaktualizować subskrypcji.");
//     }
//   }, [currentSubscription, fetchSubscriptions]);

//   const filteredAndSortedSubscriptions = subscriptions
//     .filter((sub) => {
//       const matchesName = sub.name.toLowerCase().includes(filter.toLowerCase());
//       const parsedPriceFilter = parseFloat(priceFilter);
//       const matchesPrice =
//         priceFilter === "" ||
//         isNaN(parsedPriceFilter) ||
//         sub.price <= parsedPriceFilter;
//       return matchesName && matchesPrice;
//     })
//     .sort((a, b) =>
//       sortOrder === "asc" ? a.price - b.price : b.price - a.price
//     );

//   if (loading) {
//     return <div className="container">Ładowanie subskrypcji...</div>;
//   }

//   return (
//     <div className="dashboard-page-container">
//       <nav
//         style={{
//           padding: "10px",
//           background: "#f8f9fa",
//           borderBottom: "1px solid #e9ecef",
//         }}
//       >
//         <h2>Twoje subskrypcje</h2>
//         <button
//           onClick={handleLogout}
//           style={{
//             float: "right",
//             padding: "8px 12px",
//             backgroundColor: "#dc3545",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Wyloguj
//         </button>
//       </nav>

//       <div className="container" style={{ padding: "20px" }}>
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <div style={{ marginBottom: "20px" }}>
//           <input
//             type="text"
//             placeholder="Filtruj po nazwie"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             style={{
//               marginRight: "10px",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           />
//           <input
//             type="number"
//             placeholder="Filtruj po cenie (max)"
//             value={priceFilter}
//             onChange={(e) => setPriceFilter(e.target.value)}
//             style={{
//               marginRight: "10px",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "44px",
//             }}
//           />
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             style={{
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           >
//             <option value="asc">Sortuj rosnąco</option>
//             <option value="desc">Sortuj malejąco</option>
//           </select>
//         </div>

//         <div
//           style={{
//             marginBottom: "30px",
//             border: "1px solid #eee",
//             padding: "15px",
//             borderRadius: "8px",
//             backgroundColor: "#f9f9f9",
//           }}
//         >
//           <h3>Dodaj nową subskrypcję</h3>
//           <input
//             type="text"
//             placeholder="Nazwa subskrypcji"
//             value={newSubscriptionName}
//             onChange={(e) => setNewSubscriptionName(e.target.value)}
//             style={{
//               marginRight: "10px",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           />
//           <input
//             type="number"
//             placeholder="Cena miesięczna"
//             value={newSubscriptionPrice}
//             onChange={(e) => setNewSubscriptionPrice(e.target.value)}
//             style={{
//               marginRight: "10px",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           />
//           <button
//             onClick={handleAddSubscription}
//             style={{
//               padding: "8px 15px",
//               backgroundColor: "#28a745",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Dodaj
//           </button>
//         </div>

//         <SubscriptionTable
//           subscriptions={filteredAndSortedSubscriptions}
//           onRemove={handleRemoveSubscription}
//           onEdit={handleEditSubscription}
//         />

//         {isModalOpen && currentSubscription && (
//           <div className="modal">
//             <div className="modal-content">
//               <h3>Edytuj subskrypcję</h3>
//               <label>
//                 Nazwa:
//                 <input
//                   type="text"
//                   name="name"
//                   value={currentSubscription.name || ""}
//                   onChange={handleModalChange}
//                 />
//               </label>
//               <label>
//                 Cena:
//                 <input
//                   type="number"
//                   name="price"
//                   value={currentSubscription.price || ""}
//                   onChange={handleModalChange}
//                 />
//               </label>
//               {/* USUNIĘTO: pola Opis, Kategoria, Częstotliwość */}
//               <button
//                 onClick={handleSaveEdit}
//                 style={{
//                   padding: "8px 15px",
//                   backgroundColor: "#007bff",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   marginRight: "10px",
//                 }}
//               >
//                 Zapisz zmiany
//               </button>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 style={{
//                   padding: "8px 15px",
//                   backgroundColor: "#6c757d",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Anuluj
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;

// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getUserData,
//   deleteSubscription,
//   updateSubscription,
//   addSubscription,
// } from "../services/api";
// import SubscriptionTable from "../components/SubscriptionTable";

// function DashboardPage({ onLogout }) {
//   const navigate = useNavigate();
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("");
//   const [priceFilter, setPriceFilter] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
//   const [newSubscriptionName, setNewSubscriptionName] = useState("");
//   const [newSubscriptionPrice, setNewSubscriptionPrice] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentSubscription, setCurrentSubscription] = useState(null); // Dla edycji

//   const handleLogout = useCallback(() => {
//     onLogout();
//     console.log("Token usunięty. Przekierowanie do /login");
//     navigate("/login");
//   }, [onLogout, navigate]);

//   const fetchSubscriptions = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const userData = await getUserData();
//       console.log("Raw user data from backend (api.js):", userData);

//       if (userData && Array.isArray(userData.subscriptions)) {
//         const fetchedSubs = userData.subscriptions.map((sub, index) => {
//           console.log(
//             `Backend sub ${index}: ID=${sub.id}, ServiceName=${sub.serviceName}, Cost=${sub.cost}`
//           );
//           if (typeof sub.id === "undefined" || sub.id === null) {
//             console.error(
//               `Błąd: Subskrypcja z backendu na indeksie ${index} ma undefined/null ID!`,
//               sub
//             );
//           }
//           return {
//             id: sub.id,
//             name: sub.serviceName,
//             price: sub.cost,
//             description: sub.description,
//             category: sub.category,
//             frequency: sub.frequency,
//           };
//         });
//         console.log(
//           "Przetworzone subskrypcje do wyświetlenia (z DashboardPage):",
//           fetchedSubs
//         );
//         setSubscriptions(fetchedSubs);
//       } else {
//         console.warn(
//           "Brak pola 'subscriptions' lub nie jest tablicą w danych użytkownika:",
//           userData
//         );
//         setSubscriptions([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch subscriptions:", err);
//       setError(err.message || "Nie udało się załadować subskrypcji.");
//       if (err.message.includes("Unauthorized")) {
//         handleLogout();
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [handleLogout]);

//   useEffect(() => {
//     fetchSubscriptions();
//   }, [fetchSubscriptions]);

//   const filteredAndSortedSubscriptions = subscriptions
//     .filter((sub) => {
//       const matchesName = sub.name.toLowerCase().includes(filter.toLowerCase());
//       const parsedPriceFilter = parseFloat(priceFilter);
//       const matchesPrice =
//         priceFilter === "" ||
//         isNaN(parsedPriceFilter) ||
//         sub.price <= parsedPriceFilter;
//       return matchesName && matchesPrice;
//     })
//     .sort((a, b) =>
//       sortOrder === "asc" ? a.price - b.price : b.price - a.price
//     );

//   const handleRemoveSubscription = useCallback(
//     async (idToRemove) => {
//       setError(null);
//       console.log(
//         "handleRemoveSubscription: Próba usunięcia subskrypcji z ID:",
//         idToRemove
//       );
//       if (typeof idToRemove === "undefined" || idToRemove === null) {
//         console.error(
//           "handleRemoveSubscription: Błąd usuwania: ID subskrypcji jest undefined/null."
//         );
//         setError("Nie można usunąć: ID subskrypcji jest nieprawidłowe.");
//         return;
//       }

//       if (window.confirm("Czy na pewno chcesz usunąć tę subskrypcję?")) {
//         try {
//           await deleteSubscription(idToRemove);
//           alert("Subskrypcja usunięta!");
//           fetchSubscriptions();
//         } catch (err) {
//           console.error("Nie udało się usunąć subskrypcji:", err);
//           setError(err.message || "Nie udało się usunąć subskrypcji.");
//         }
//       }
//     },
//     [fetchSubscriptions]
//   );

//   const handleAddSubscription = useCallback(async () => {
//     setError(null);
//     if (!newSubscriptionName || !newSubscriptionPrice) {
//       setError("Nazwa i cena są wymagane.");
//       return;
//     }
//     try {
//       const newSubData = {
//         serviceName: newSubscriptionName,
//         cost: parseFloat(newSubscriptionPrice),
//         frequency: "Monthly",
//         description: "Brak opisu",
//         category: "Inne",
//       };
//       console.log("Dodawanie subskrypcji:", newSubData);
//       await addSubscription(newSubData);
//       alert("Subskrypcja dodana!");
//       setNewSubscriptionName("");
//       setNewSubscriptionPrice("");
//       fetchSubscriptions();
//     } catch (err) {
//       console.error("Nie udało się dodać subskrypcji:", err);
//       setError(err.message || "Nie udało się dodać subskrypcji.");
//     }
//   }, [newSubscriptionName, newSubscriptionPrice, fetchSubscriptions]);

//   const handleEditSubscription = useCallback(
//     (subId) => {
//       console.log(
//         "handleEditSubscription: Próba edycji subskrypcji z ID:",
//         subId
//       );
//       if (typeof subId === "undefined" || subId === null) {
//         console.error(
//           "handleEditSubscription: Błąd edycji: ID subskrypcji jest undefined/null."
//         );
//         setError("Nie można edytować: ID subskrypcji jest nieprawidłowe.");
//         return;
//       }
//       const subToEdit = subscriptions.find((sub) => sub.id === subId);
//       if (subToEdit) {
//         setCurrentSubscription(subToEdit);
//         setIsModalOpen(true);
//       } else {
//         setError("Nie znaleziono subskrypcji do edycji.");
//       }
//     },
//     [subscriptions]
//   );

//   const handleModalChange = useCallback((e) => {
//     const { name, value } = e.target;
//     // Aktualizujemy tylko pola, które są obecne w modal
//     setCurrentSubscription((prev) => ({
//       ...prev,
//       [name]: name === "price" ? parseFloat(value) : value,
//     }));
//   }, []);

//   const handleSaveEdit = useCallback(async () => {
//     setError(null);
//     if (
//       !currentSubscription ||
//       typeof currentSubscription.id === "undefined" ||
//       currentSubscription.id === null
//     ) {
//       setError("Błąd zapisu: brak danych subskrypcji lub ID.");
//       return;
//     }
//     try {
//       // Przygotowujemy dane do aktualizacji, używając oryginalnych wartości dla nieedytowanych pól
//       const updatedData = {
//         id: currentSubscription.id,
//         serviceName: currentSubscription.name,
//         cost: parseFloat(currentSubscription.price),
//         // Zachowujemy oryginalne wartości dla pól, których nie edytujemy w modalu
//         description: currentSubscription.description || "",
//         category: currentSubscription.category || "",
//         frequency: currentSubscription.frequency || "Monthly",
//       };
//       console.log("Zapisywanie edytowanej subskrypcji:", updatedData);
//       await updateSubscription(currentSubscription.id, updatedData);
//       alert("Subskrypcja zaktualizowana!");
//       setIsModalOpen(false);
//       setCurrentSubscription(null);
//       fetchSubscriptions();
//     } catch (err) {
//       console.error("Nie udało się zaktualizować subskrypcji:", err);
//       setError(err.message || "Nie udało się zaktualizować subskrypcji.");
//     }
//   }, [currentSubscription, fetchSubscriptions]);

//   if (loading) {
//     return <div className="container">Ładowanie subskrypcji...</div>;
//   }

//   return (
//     <div className="dashboard-page-container">
//       <nav
//         style={{
//           padding: "10px",
//           background: "#f8f9fa",
//           borderBottom: "1px solid #e9ecef",
//         }}
//       >
//         <h2>Twoje subskrypcje</h2>
//         <button
//           onClick={handleLogout}
//           style={{
//             float: "right",
//             padding: "8px 12px",
//             backgroundColor: "#dc3545",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Wyloguj
//         </button>
//       </nav>

//       <div className="container" style={{ padding: "20px" }}>
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <div style={{ marginBottom: "20px" }}>
//           <input
//             type="text"
//             placeholder="Filtruj po nazwie"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             style={{
//               marginRight: "10px",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           />
//           <input
//             type="number"
//             placeholder="Filtruj po cenie (max)"
//             value={priceFilter}
//             onChange={(e) => setPriceFilter(e.target.value)}
//             style={{
//               marginRight: "10px",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "44px",
//             }}
//           />
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             style={{
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           >
//             <option value="asc">Sortuj rosnąco</option>
//             <option value="desc">Sortuj malejąco</option>
//           </select>
//         </div>

//         <div
//           style={{
//             marginBottom: "30px",
//             border: "1px solid #eee",
//             padding: "15px",
//             borderRadius: "8px",
//             backgroundColor: "#f9f9f9",
//           }}
//         >
//           <h3>Dodaj nową subskrypcję</h3>
//           <input
//             type="text"
//             placeholder="Nazwa subskrypcji"
//             value={newSubscriptionName}
//             onChange={(e) => setNewSubscriptionName(e.target.value)}
//             style={{
//               marginRight: "10px",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           />
//           <input
//             type="number"
//             placeholder="Cena miesięczna"
//             value={newSubscriptionPrice}
//             onChange={(e) => setNewSubscriptionPrice(e.target.value)}
//             style={{
//               marginRight: "10px",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           />
//           <button
//             onClick={handleAddSubscription}
//             style={{
//               padding: "8px 15px",
//               backgroundColor: "#28a745",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Dodaj
//           </button>
//         </div>

//         <SubscriptionTable
//           subscriptions={filteredAndSortedSubscriptions}
//           onRemove={handleRemoveSubscription}
//           onEdit={handleEditSubscription}
//         />

//         {isModalOpen && currentSubscription && (
//           <div className="modal">
//             <div className="modal-content">
//               <h3>Edytuj subskrypcję</h3>
//               <label>
//                 Nazwa:
//                 <input
//                   type="text"
//                   name="name"
//                   value={currentSubscription.name || ""}
//                   onChange={handleModalChange}
//                 />
//               </label>
//               <label>
//                 Cena:
//                 <input
//                   type="number"
//                   name="price"
//                   value={currentSubscription.price || ""}
//                   onChange={handleModalChange}
//                 />
//               </label>
//               {/* Usunięto pola Opis, Kategoria, Częstotliwość zgodnie z prośbą */}
//               <button onClick={handleSaveEdit}>Zapisz zmiany</button>
//               <button onClick={() => setIsModalOpen(false)}>Anuluj</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserData,
  deleteSubscription,
  updateSubscription,
  addSubscription,
} from "../services/api";
import SubscriptionTable from "../components/SubscriptionTable";
// WAŻNE: Upewnij się, że usunąłeś linię 'import "../components/DashboardPage.css";'

function DashboardPage({ onLogout }) {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const [newSubscriptionName, setNewSubscriptionName] = useState("");
  const [newSubscriptionPrice, setNewSubscriptionPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null); // Dla edycji

  const handleLogout = useCallback(() => {
    onLogout();
    console.log("Token usunięty. Przekierowanie do /login");
    navigate("/login");
  }, [onLogout, navigate]);

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await getUserData();
      console.log("Raw user data from backend (api.js):", userData);

      if (userData && Array.isArray(userData.subscriptions)) {
        const fetchedSubs = userData.subscriptions.map((sub, index) => {
          console.log(
            `Backend sub ${index}: ID=${sub.id}, ServiceName=${sub.serviceName}, Cost=${sub.cost}`
          );
          if (typeof sub.id === "undefined" || sub.id === null) {
            console.error(
              `Błąd: Subskrypcja z backendu na indeksie ${index} ma undefined/null ID!`,
              sub
            );
          }
          return {
            id: sub.id,
            name: sub.serviceName,
            price: sub.cost,
          };
        });
        console.log(
          "Przetworzone subskrypcje do wyświetlenia (z DashboardPage):",
          fetchedSubs
        );
        setSubscriptions(fetchedSubs);
      } else {
        console.warn(
          "Brak pola 'subscriptions' lub nie jest tablicą w danych użytkownika:",
          userData
        );
        setSubscriptions([]);
      }
    } catch (err) {
      console.error("Failed to fetch subscriptions:", err);
      setError(err.message || "Nie udało się załadować subskrypcji.");
      if (err.message.includes("Unauthorized")) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [handleLogout]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const filteredAndSortedSubscriptions = subscriptions
    .filter((sub) => {
      const matchesName = sub.name.toLowerCase().includes(filter.toLowerCase());
      const parsedPriceFilter = parseFloat(priceFilter);
      const matchesPrice =
        priceFilter === "" ||
        isNaN(parsedPriceFilter) ||
        sub.price <= parsedPriceFilter;
      return matchesName && matchesPrice;
    })
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const totalSubscriptionPrice = filteredAndSortedSubscriptions.reduce(
    (sum, sub) => sum + (sub.price || 0),
    0
  );

  const handleRemoveSubscription = useCallback(
    async (idToRemove) => {
      setError(null);
      console.log(
        "handleRemoveSubscription: Próba usunięcia subskrypcji z ID:",
        idToRemove
      );
      if (typeof idToRemove === "undefined" || idToRemove === null) {
        console.error(
          "handleRemoveSubscription: Błąd usuwania: ID subskrypcji jest undefined/null."
        );
        setError("Nie można usunąć: ID subskrypcji jest nieprawidłowe.");
        return;
      }

      if (window.confirm("Czy na pewno chcesz usunąć tę subskrypcję?")) {
        try {
          await deleteSubscription(idToRemove);
          alert("Subskrypcja usunięta!");
          fetchSubscriptions();
        } catch (err) {
          console.error("Nie udało się usunąć subskrypcji:", err);
          setError(err.message || "Nie udało się usunąć subskrypcji.");
        }
      }
    },
    [fetchSubscriptions]
  );

  const handleAddSubscription = useCallback(async () => {
    setError(null);
    if (!newSubscriptionName || !newSubscriptionPrice) {
      setError("Nazwa i cena są wymagane.");
      return;
    }
    try {
      const newSubData = {
        serviceName: newSubscriptionName,
        cost: parseFloat(newSubscriptionPrice),
        frequency: "Monthly",
        description: "Brak opisu",
        category: "Inne",
      };
      console.log("Dodawanie subskrypcji:", newSubData);
      await addSubscription(newSubData);
      alert("Subskrypcja dodana!");
      setNewSubscriptionName("");
      setNewSubscriptionPrice("");
      fetchSubscriptions();
    } catch (err) {
      console.error("Nie udało się dodać subskrypcji:", err);
      setError(err.message || "Nie udało się dodać subskrypcji.");
    }
  }, [newSubscriptionName, newSubscriptionPrice, fetchSubscriptions]);

  const handleEditSubscription = useCallback(
    (subId) => {
      console.log(
        "handleEditSubscription: Próba edycji subskrypcji z ID:",
        subId
      );
      if (typeof subId === "undefined" || subId === null) {
        console.error(
          "handleEditSubscription: Błąd edycji: ID subskrypcji jest undefined/null."
        );
        setError("Nie można edytować: ID subskrypcji jest nieprawidłowe.");
        return;
      }
      const subToEdit = subscriptions.find((sub) => sub.id === subId);
      if (subToEdit) {
        setCurrentSubscription(subToEdit);
        setIsModalOpen(true);
      } else {
        setError("Nie znaleziono subskrypcji do edycji.");
      }
    },
    [subscriptions]
  );

  const handleModalChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentSubscription((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  }, []);

  const handleSaveEdit = useCallback(async () => {
    setError(null);
    if (
      !currentSubscription ||
      typeof currentSubscription.id === "undefined" ||
      currentSubscription.id === null
    ) {
      setError("Błąd zapisu: brak danych subskrypcji lub ID.");
      return;
    }
    try {
      const updatedData = {
        id: currentSubscription.id,
        serviceName: currentSubscription.name,
        cost: parseFloat(currentSubscription.price),
        description: "Brak opisu",
        category: "Inne",
        frequency: "Monthly",
      };
      console.log("Zapisywanie edytowanej subskrypcji:", updatedData);
      await updateSubscription(currentSubscription.id, updatedData);
      alert("Subskrypcja zaktualizowana!");
      setIsModalOpen(false);
      setCurrentSubscription(null);
      fetchSubscriptions();
    } catch (err) {
      console.error("Nie udało się zaktualizować subskrypcji:", err);
      setError(err.message || "Nie udało się zaktualizować subskrypcji.");
    }
  }, [currentSubscription, fetchSubscriptions]);

  if (loading) {
    return <div className="container">Ładowanie subskrypcji...</div>;
  }

  return (
    <div className="dashboard-page-container">
      <nav
        style={{
          padding: "10px",
          background: "#f8f9fa",
          borderBottom: "1px solid #e9ecef",
        }}
      >
        <h2>Twoje subskrypcje</h2>
        <button
          onClick={handleLogout}
          style={{
            float: "right",
            padding: "8px 12px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Wyloguj
        </button>
      </nav>

      <div className="container" style={{ padding: "20px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Filtruj po nazwie"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              marginRight: "10px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <input
            type="number"
            placeholder="Filtruj po cenie (max)"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            style={{
              marginRight: "10px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="asc">Sortuj rosnąco</option>
            <option value="desc">Sortuj malejąco</option>
          </select>
        </div>

        <div
          style={{
            marginBottom: "30px",
            border: "1px solid #eee",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>Dodaj nową subskrypcję</h3>
          <input
            type="text"
            placeholder="Nazwa subskrypcji"
            value={newSubscriptionName}
            onChange={(e) => setNewSubscriptionName(e.target.value)}
            style={{
              marginRight: "10px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <input
            type="number"
            placeholder="Cena miesięczna"
            value={newSubscriptionPrice}
            onChange={(e) => setNewSubscriptionPrice(e.target.value)}
            style={{
              marginRight: "10px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={handleAddSubscription}
            style={{
              padding: "8px 15px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Dodaj
          </button>
        </div>

        <SubscriptionTable
          subscriptions={filteredAndSortedSubscriptions}
          onRemove={handleRemoveSubscription}
          onEdit={handleEditSubscription}
        />

        {/* ZMIANY TUTAJ: Usunięto backgroundColor */}
        <div
          style={{
            marginTop: "20px",
            padding:
              "15px" /* Usunięto backgroundColor, borderTop i borderRadius */,
          }}
        >
          <h4>Łączny koszt miesięczny: {totalSubscriptionPrice.toFixed(2)}</h4>
        </div>

        {isModalOpen && currentSubscription && (
          <div className="modal">
            <div
              className="modal-content"
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3>Edytuj subskrypcję</h3>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Nazwa:
                <input
                  type="text"
                  name="name"
                  value={currentSubscription.name || ""}
                  onChange={handleModalChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginTop: "5px",
                  }}
                />
              </label>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Cena:
                <input
                  type="number"
                  name="price"
                  value={currentSubscription.price || ""}
                  onChange={handleModalChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginTop: "5px",
                  }}
                />
              </label>
              <button
                onClick={handleSaveEdit}
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Zapisz zmiany
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Anuluj
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
