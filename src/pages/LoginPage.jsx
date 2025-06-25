import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api"; // Upewnij się, że to jest "../services/api"
import { Link } from "react-router-dom";

/**
 * Komponent strony logowania.
 * Umożliwia użytkownikowi wprowadzenie danych logowania i przejście do dashboardu.
 */
function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for handling login errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!email || !password) {
      setError("Wprowadź email i hasło.");
      return;
    }

    try {
      // Call the backend login endpoint
      // Używamy userName: email, password: password tak jak w Twojej działającej wersji
      const data = await loginUser({ userName: email, password: password });

      // Store the token and user email
      localStorage.setItem("token", data.token);
      // Upewnij się, czy Twój backend zwraca 'email' w obiekcie data. Jeśli nie, użyj 'email' ze stanu: localStorage.setItem("userEmail", email);
      localStorage.setItem("userEmail", data.email);

      onLoginSuccess(); // Update global login state in App.js
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Login failed:", err);
      // Ulepszona obsługa błędów, aby wyświetlić komunikat z serwera
      if (err.message) {
        try {
          const errorJson = JSON.parse(err.message);
          if (errorJson.errors) {
            let errorMessages = [];
            for (const key in errorJson.errors) {
              errorMessages.push(`${key}: ${errorJson.errors[key].join(", ")}`);
            }
            setError(
              errorMessages.join("\n") ||
                "Logowanie nie powiodło się. Sprawdź dane logowania."
            );
          } else if (typeof errorJson === "string") {
            setError(errorJson);
          } else {
            setError(err.message);
          }
        } catch (parseError) {
          setError(
            err.message || "Logowanie nie powiodło się. Sprawdź dane logowania."
          );
        }
      } else {
        setError("Logowanie nie powiodło się. Sprawdź dane logowania.");
      }
    }
  };

  return (
    // Zmieniamy klasę z "container" na "auth-container" dla centrowania i tła
    <div className="auth-container">
      {/* Dodajemy "auth-box" dla białego tła i cienia */}
      <div className="auth-box">
        <h2>Logowanie</h2>
        {/* Wyświetlanie błędu z klasą CSS */}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Hasło:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {/* Usuwamy "btn-primary", bo stylizacja guzika jest już w auth-box button */}
          <button type="submit">Zaloguj</button>
        </form>
        <p>
          Nie masz konta? <Link to="/register">Zarejestruj się</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
