import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar"; // Komponent paska nawigacyjnego
import SubscriptionForm from "../components/SubscriptionForm"; // Komponent formularza dodawania/edycji subskrypcji
import SubscriptionTable from "../components/SubscriptionTable"; // Komponent tabeli subskrypcji

/**
 * Komponent strony głównej aplikacji (dashboardu).
 * Zarządza listą subskrypcji, ich filtrowaniem, sortowaniem oraz dodawaniem/edycją/usuwaniem.
 */
function DashboardPage() {
  // Stan `subscriptions` przechowuje listę subskrypcji.
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: "Netflix", price: 59.99 },
    { id: 2, name: "Spotify Premium", price: 19.99 },
    { id: 3, name: "Xbox Game Pass", price: 40.0 },
    { id: 4, name: "Disney+", price: 28.99 },
    { id: 5, name: "HBO Max", price: 29.99 },
  ]);
  // Stan `filter` dla filtrowania po nazwie subskrypcji.
  const [filter, setFilter] = useState("");
  // Stan `priceFilter` dla filtrowania po maksymalnej cenie subskrypcji.
  const [priceFilter, setPriceFilter] = useState("");
  // Stan `sortOrder` kontroluje kierunek sortowania (rosnąco 'asc' lub malejąco 'desc').
  const [sortOrder, setSortOrder] = useState("asc");
  // Stan `editIndex` przechowuje indeks subskrypcji edytowanej; `null` oznacza tryb dodawania.
  const [editIndex, setEditIndex] = useState(null);

  const navigate = useNavigate(); // Funkcja do nawigacji po aplikacji.

  /**
   * Obsługuje proces wylogowania użytkownika.
   * Usuwa informację o użytkowniku z `localStorage` i przekierowuje na stronę logowania.
   * @param {function} onLogoutSuccess - Funkcja z App.js do zaktualizowania stanu logowania.
   */
  const handleLogout = () => {
    localStorage.removeItem("user"); // Usunięcie danych sesji z pamięci przeglądarki
    navigate("/login"); // Przekierowanie do strony logowania
  };

  /**
   * Dodaje nową subskrypcję lub aktualizuje istniejącą.
   * @param {object} newSub - Obiekt subskrypcji (nazwa i cena).
   */
  const addSubscription = (newSub) => {
    if (editIndex !== null) {
      // Tryb edycji: aktualizujemy istniejącą subskrypcję w tablicy.
      // Ważne: Tworzymy nową tablicę `updated` i mapujemy, aby zachować niemutowalność stanu.
      const updated = subscriptions.map((sub, idx) =>
        idx === editIndex ? { ...newSub, id: subscriptions[editIndex].id } : sub
      );
      setSubscriptions(updated); // Aktualizacja stanu subskrypcji
      setEditIndex(null); // Zakończenie trybu edycji
    } else {
      // Tryb dodawania: generujemy nowe unikalne ID i dodajemy nową subskrypcję.
      const newId =
        subscriptions.length > 0
          ? Math.max(...subscriptions.map((s) => s.id)) + 1
          : 1; // Proste generowanie ID
      setSubscriptions([...subscriptions, { ...newSub, id: newId }]); // Dodanie nowej subskrypcji do listy
    }
  };

  /**
   * Usuwa subskrypcję z listy na podstawie jej ID.
   * @param {number} idToRemove - ID subskrypcji do usunięcia.
   */
  const removeSubscription = (idToRemove) => {
    // Tworzenie nowej tablicy bez elementu o podanym ID.
    setSubscriptions(subscriptions.filter((sub) => sub.id !== idToRemove));
  };

  /**
   * Włącza tryb edycji dla wybranej subskrypcji.
   * Ustawia `editIndex` na indeks subskrypcji, którą chcemy edytować.
   * @param {number} idToEdit - ID subskrypcji do edycji.
   */
  const editSubscription = (idToEdit) => {
    // Znalezienie indeksu subskrypcji na podstawie ID.
    const indexToEdit = subscriptions.findIndex((sub) => sub.id === idToEdit);
    if (indexToEdit !== -1) {
      setEditIndex(indexToEdit); // Ustawienie indeksu dla formularza edycji
    }
  };

  /**
   * Przełącza kierunek sortowania subskrypcji (rosnąco/malejąco).
   */
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  /**
   * Oblicza listę subskrypcji po zastosowaniu filtrów i sortowania.
   * Ta zmienna jest ponownie obliczana przy każdej zmianie `subscriptions`, `filter`, `priceFilter` lub `sortOrder`.
   */
  const filteredSubscriptions = subscriptions
    .filter((sub) => {
      // Logika filtrowania po nazwie (niezależnie od wielkości liter).
      const matchesName = sub.name.toLowerCase().includes(filter.toLowerCase());

      // Logika filtrowania po cenie (maksymalna cena).
      // Konwertuje `priceFilter` na liczbę. Jeśli jest pusty lub niepoprawny, ten warunek jest spełniony.
      const parsedPriceFilter = parseFloat(priceFilter);
      const matchesPrice =
        priceFilter === "" || // Jeśli filtr ceny jest pusty, zawsze pasuje.
        isNaN(parsedPriceFilter) || // Jeśli wpisana wartość nie jest liczbą, zawsze pasuje.
        sub.price <= parsedPriceFilter; // Sprawdzenie, czy cena subskrypcji jest mniejsza lub równa filtrowi.

      // Subskrypcja zostanie uwzględniona, jeśli spełnia OBA warunki (nazwy I ceny).
      return matchesName && matchesPrice;
    })
    // Sortowanie przefiltrowanych subskrypcji według ceny.
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <div>
      {/* Pasek nawigacyjny z informacją o użytkowniku i przyciskiem wylogowania */}
      <Navbar user={localStorage.getItem("user")} onLogout={handleLogout} />
      <div className="container">
        <h2>Twoje subskrypcje</h2>

        {/* Pole do filtrowania subskrypcji po nazwie */}
        <input
          type="text"
          placeholder="Filtruj po nazwie"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {/* Pole do filtrowania subskrypcji po cenie (maksymalna wartość) */}
        <input
          type="number"
          placeholder="Filtruj po cenie (max)"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          style={{ marginLeft: "10px" }} // Prosty styl inline dla odstępu
        />
        {/* Przycisk do przełączania kolejności sortowania */}
        <button onClick={handleSort} className="btn-primary">
          Sortuj {sortOrder === "asc" ? "▲" : "▼"}{" "}
          {/* Strzałka wskazująca kierunek sortowania */}
        </button>

        {/* Formularz do dodawania nowych subskrypcji lub edycji istniejących. */}
        {/* `editData` przekazuje dane edytowanej subskrypcji do formularza, jeśli jest w trybie edycji. */}
        <SubscriptionForm
          onAdd={addSubscription}
          editData={editIndex !== null ? subscriptions[editIndex] : null}
        />
        {/* Tabela wyświetlająca subskrypcje. */}
        {/* Przekazuje przefiltrowaną i posortowaną listę do wyświetlenia. */}
        {/* `onRemove` i `onEdit` przekazują funkcje do obsługi akcji na konkretnych subskrypcjach. */}
        <SubscriptionTable
          subscriptions={filteredSubscriptions}
          onRemove={removeSubscription}
          onEdit={editSubscription}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
