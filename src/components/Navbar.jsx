/**
 * Komponent paska nawigacyjnego wyświetlany na stronie dashboardu.
 * Pokazuje email zalogowanego użytkownika i przycisk wylogowania.
 * @param {string} user - Email zalogowanego użytkownika.
 * @param {function} onLogout - Funkcja wywoływana po kliknięciu przycisku wylogowania.
 */
function Navbar({ user, onLogout }) {
  return (
    <nav>
      <span>Zalogowano jako: {user}</span>{" "}
      {/* Wyświetlanie emaila użytkownika */}
      <button onClick={onLogout}>Wyloguj</button> {/* Przycisk wylogowania */}
    </nav>
  );
}

export default Navbar;
