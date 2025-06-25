// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../services/api"; // Upewnij się, że to jest '../services/api'
// import { Link } from "react-router-dom";

// function RegisterPage() {
//   // Nazwa funkcji (komponentu)
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (!username || !email || !password) {
//       setError("Wszystkie pola są wymagane.");
//       return;
//     }

//     try {
//       const data = await registerUser({
//         userName: username, // Backend expects UserName
//         email: email,
//         password: password,
//       });

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userEmail", data.email);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Registration failed:", err);
//       setError(
//         err.message || "Rejestracja nie powiodła się. Spróbuj ponownie."
//       );
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Rejestracja</h2>
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Nazwa użytkownika"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Hasło"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="btn-primary">
//           Zarejestruj
//         </button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <p style={{ marginTop: "15px" }}>
//         Masz już konto? <Link to="/login">Zaloguj się</Link>
//       </p>
//     </div>
//   );
// }

// export default RegisterPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function RegisterPage() {
  const [userName, setUserName] = useState(""); // NOWY STAN DLA USERNAME
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nadal potrzebne do walidacji po stronie klienta
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Hasła nie pasują do siebie.");
      return;
    }

    try {
      // WAŻNA ZMIANA: Wysyłamy UserName, Email i Password (PascalCase)
      // NIE wysyłamy ConfirmPassword do API, bo go nie ma w DTO
      const data = await registerUser({
        UserName: userName,
        Email: email,
        Password: password,
      });
      console.log("Registration successful:", data);
      setSuccess(
        "Rejestracja zakończona sukcesem! Możesz się teraz zalogować."
      );
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      // Próba odczytania błędów walidacji z serwera
      if (err.message) {
        try {
          const errorJson = JSON.parse(err.message);
          if (errorJson.errors) {
            // Obsługa błędów walidacji zwróconych jako obiekt errors
            let errorMessages = [];
            for (const key in errorJson.errors) {
              errorMessages.push(`${key}: ${errorJson.errors[key].join(", ")}`);
            }
            setError(
              errorMessages.join("\n") || "Błąd rejestracji. Spróbuj ponownie."
            );
          } else if (typeof errorJson === "string") {
            setError(errorJson); // Jeśli wiadomość to sam string
          } else {
            setError(err.message); // Domyślna wiadomość
          }
        } catch (parseError) {
          setError(err.message || "Błąd rejestracji. Spróbuj ponownie.");
        }
      } else {
        setError("Błąd rejestracji. Spróbuj ponownie.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Rejestracja</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Nazwa użytkownika: {/* NOWE POLE DLA USERNAME */}
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
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
          <label>
            Potwierdź Hasło:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Zarejestruj się</button>
        </form>
        <p>
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
