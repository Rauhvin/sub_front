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
