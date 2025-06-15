/**
 * Komponent tabeli wyświetlającej listę subskrypcji.
 * Zawiera również przyciski do edycji i usuwania poszczególnych subskrypcji.
 * @param {Array<object>} subscriptions - Tablica obiektów subskrypcji do wyświetlenia.
 * @param {function} onRemove - Funkcja wywoływana po kliknięciu "Usuń" (przekazana z DashboardPage).
 * @param {function} onEdit - Funkcja wywoływana po kliknięciu "Edytuj" (przekazana z DashboardPage).
 */
function SubscriptionTable({ subscriptions, onRemove, onEdit }) {
  // Oblicza sumę miesięcznych kosztów wszystkich subskrypcji.
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.price, 0);

  return (
    <div style={{ marginTop: "20px" }}>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Cena miesięczna</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapowanie po tablicy `subscriptions` w celu wyrenderowania każdego wiersza. */}
          {subscriptions.map(
            (
              sub // Iterujemy po każdym obiekcie subskrypcji
            ) => (
              // Każdy wiersz tabeli musi mieć unikalny `key` dla optymalizacji Reacta.
              // Używamy `sub.id` jako klucza, co jest najlepszą praktyką.
              <tr key={sub.id}>
                <td>{sub.name}</td>
                <td>{sub.price} zł</td>
                <td>
                  {/* Przycisk Edytuj - wywołuje `onEdit` z ID subskrypcji. */}
                  <button
                    onClick={() => onEdit(sub.id)}
                    className="btn-warning"
                  >
                    Edytuj
                  </button>
                  {/* Przycisk Usuń - wywołuje `onRemove` z ID subskrypcji. */}
                  <button
                    onClick={() => onRemove(sub.id)}
                    className="btn-danger"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <h4 style={{ marginTop: "15px" }}>
        {/* Wyświetlanie łącznego miesięcznego kosztu. */}
        Łączny koszt miesięczny: {totalMonthly.toFixed(2)} zł
      </h4>
    </div>
  );
}

export default SubscriptionTable;
