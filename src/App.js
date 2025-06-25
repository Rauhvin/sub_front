// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage"; // <-- Upewnij się, że to jest tutaj!
// import DashboardPage from "./pages/DashboardPage";
// import "./App.css";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//   };

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       setIsLoggedIn(!!localStorage.getItem("token"));
//     };
//     window.addEventListener("storage", checkLoginStatus);
//     return () => window.removeEventListener("storage", checkLoginStatus);
//   }, []);

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Public routes */}
//           <Route
//             path="/login"
//             element={
//               isLoggedIn ? (
//                 <Navigate to="/dashboard" replace />
//               ) : (
//                 <LoginPage onLoginSuccess={handleLoginSuccess} />
//               )
//             }
//           />
//           {/* TEN ROUTE JEST KLUCZOWY DLA STRONY REJESTRACJI: */}
//           <Route path="/register" element={<RegisterPage />} />{" "}
//           {/* <-- Upewnij się, że to jest tutaj! */}
//           {/* Protected dashboard route */}
//           <Route
//             path="/dashboard"
//             element={
//               isLoggedIn ? <DashboardPage /> : <Navigate to="/login" replace />
//             }
//           />
//           {/* Redirect root to login or dashboard based on auth status */}
//           <Route
//             path="/"
//             element={
//               isLoggedIn ? (
//                 <Navigate to="/dashboard" replace />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           {/* Fallback for unknown routes */}
//           <Route
//             path="*"
//             element={
//               <Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect, useCallback } from "react"; // Dodano useCallback
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // NOWA FUNKCJA: do obsługi wylogowania z DashboardPage
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail"); // Upewnij się, że to też usuwasz
    setIsLoggedIn(false); // Natychmiast ustaw stan na false
    console.log(
      "Wylogowano pomyślnie. Token usunięty. Przekierowanie do /login."
    );
  }, []); // Pusta tablica zależności, bo nie zależy od żadnych zmiennych ze stanu/propsów

  // Usuń ten useEffect, ponieważ `handleLogout` teraz bezpośrednio aktualizuje `isLoggedIn`
  // useEffect(() => {
  //   const checkLoginStatus = () => {
  //     setIsLoggedIn(!!localStorage.getItem("token"));
  //   };
  //   window.addEventListener("storage", checkLoginStatus);
  //   return () => window.removeEventListener("storage", checkLoginStatus);
  // }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          {/* Protected dashboard route */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                // Przekazujemy handleLogout jako prop do DashboardPage
                <DashboardPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Redirect root to login or dashboard based on auth status */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Fallback for unknown routes */}
          <Route
            path="*"
            element={
              <Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
