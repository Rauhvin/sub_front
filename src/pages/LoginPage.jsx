import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Komponent strony logowania.
 * Umożliwia użytkownikowi wprowadzenie danych logowania i przejście do dashboardu.
 */
function LoginPage({ onLoginSuccess }) {
  // `onLoginSuccess` to funkcja przekazana z App.js
  // Stany przechowujące wartości pól formularza (email i hasło).
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Funkcja do nawigacji po aplikacji.

  /**
   * Obsługuje przesłanie formularza logowania.
   * @param {Event} e - Obiekt zdarzenia DOM.
   */
  const handleLogin = (e) => {
    e.preventDefault(); // Zapobiega domyślnej akcji formularza (przeładowaniu strony).

    // Prosta walidacja: sprawdza, czy pola email i hasło nie są puste.
    // W prawdziwej aplikacji, tutaj nastąpiłaby komunikacja z backendem w celu weryfikacji danych.
    if (email && password) {
      localStorage.setItem("user", email); // Symulacja zalogowania: zapisanie emaila w localStorage.
      onLoginSuccess(); // Wywołanie funkcji z App.js, aby zaktualizować globalny stan logowania.
      navigate("/dashboard"); // Przekierowanie użytkownika na stronę dashboardu.
    } else {
      alert("Wprowadź email i hasło."); // Komunikat dla użytkownika w przypadku pustych pól.
    }
  };

  return (
    <div className="container">
      <h2>Logowanie</h2>
      <form onSubmit={handleLogin}>
        {" "}
        {/* Formularz, który wywoła handleLogin po przesłaniu */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Aktualizacja stanu emaila przy zmianie inputa
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Aktualizacja stanu hasła przy zmianie inputa
        />
        <button type="submit" className="btn-primary">
          Zaloguj
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
