// /**
//  * Komponent tabeli wyświetlającej listę subskrypcji.
//  * Zawiera również przyciski do edycji i usuwania poszczególnych subskrypcji.
//  * @param {Array<object>} subscriptions - Tablica obiektów subskrypcji do wyświetlenia.
//  * @param {function} onRemove - Funkcja wywoływana po kliknięciu "Usuń" (przekazana z DashboardPage).
//  * @param {function} onEdit - Funkcja wywoływana po kliknięciu "Edytuj" (przekazana z DashboardPage).
//  */
// function SubscriptionTable({ subscriptions, onRemove, onEdit }) {
//   // Oblicza sumę miesięcznych kosztów wszystkich subskrypcji.
//   const totalMonthly = subscriptions.reduce((sum, sub) => sum + (sub.price || 0), 0); // Dodano || 0 na wypadek undefined price

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <table>
//         <thead>
//           <tr>
//             <th>Nazwa</th>
//             <th>Cena miesięczna</th>
//             <th>Akcje</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Mapowanie po tablicy `subscriptions` w celu wyrenderowania każdego wiersza. */}
//           {subscriptions.map(
//             (
//               sub,
//               index // Dodaj index jako drugi argument dla klucza zapasowego
//             ) => {
//               console.log(`SubscriptionTable render: Subskrypcja na indeksie ${index}: ID=${sub.id}, Nazwa=${sub.name}`); // Logowanie tutaj
//               if (typeof sub.id === 'undefined' || sub.id === null) {
//                 console.error(`SubscriptionTable render: Błąd: Subskrypcja na indeksie ${index} ma undefined/null ID!`, sub);
//               }
//               return (
//                 // Każdy wiersz tabeli musi mieć unikalny `key` dla optymalizacji Reacta.
//                 // Używamy `sub.id` jako klucza, a jeśli jest undefined/null, używamy `index` (tymczasowo)
//                 <tr key={sub.id || `sub-${index}`}> {/* Zmieniono key na bezpieczniejszy unikalny string */}
//                   <td>{sub.name}</td>
//                   <td>{sub.price} zł</td>
//                   <td>
//                     {/* Przycisk Edytuj - wywołuje `onEdit` z ID subskrypcji. */}
//                     <button
//                       onClick={() => {
//                         console.log(`SubscriptionTable onClick (Edytuj): Kliknięto ID=${sub.id}, Nazwa=${sub.name}`); // Logowanie w onClick
//                         onEdit(sub.id);
//                       }}
//                       className="btn-warning"
//                     >
//                       Edytuj
//                     </button>
//                     {/* Przycisk Usuń - wywołuje `onRemove` z ID subskrypcji. */}
//                     <button
//                       onClick={() => {
//                         console.log(`SubscriptionTable onClick (Usuń): Kliknięto ID=${sub.id}, Nazwa=${sub.name}`); // Logowanie w onClick
//                         onRemove(sub.id);
//                       }}
//                       className="btn-danger"
//                     >
//                       Usuń
//                     </button>
//                   </td>
//                 </tr>
//               );
//             }
//           )}
//         </tbody>
//       </table>
//       <h4 style={{ marginTop: "15px" }}>
//         {/* Wyświetlanie łącznego miesięcznego kosztu. */}
//         Łączny koszt miesięczny: {totalMonthly.toFixed(2)} zł
//       </h4>
//     </div>
//   );
// }

// export default SubscriptionTable;

import React from "react";
// WAŻNE: Upewnij się, że usunąłeś linię 'import "./SubscriptionTable.css";'

function SubscriptionTable({ subscriptions, onRemove, onEdit }) {
  if (!subscriptions || subscriptions.length === 0) {
    return <p>Brak subskrypcji do wyświetlenia.</p>;
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        tableLayout: "fixed", // Dodano: Zapewnia stały układ tabeli
      }}
    >
      <thead>
        <tr style={{ background: "#f2f2f2" }}>
          <th
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              textAlign: "left",
              width: "45%",
            }}
          >
            Nazwa
          </th>{" "}
          {/* Dostosowana szerokość */}
          <th
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              textAlign: "left",
              width: "20%",
            }}
          >
            Cena
          </th>{" "}
          {/* Dostosowana szerokość */}
          <th
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              textAlign: "left",
              width: "35%",
            }}
          >
            Akcje
          </th>{" "}
          {/* Dostosowana szerokość */}
        </tr>
      </thead>
      <tbody>
        {subscriptions.map((sub) => (
          <tr key={sub.id} style={{ background: "#fff" }}>
            <td
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {sub.name}
            </td>{" "}
            {/* Dodano overflow handling */}
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {sub.price}
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <button
                onClick={() => onEdit(sub.id)}
                style={{
                  padding: "5px 10px",
                  marginRight: "5px",
                  backgroundColor: "#ffc107",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edytuj
              </button>
              <button
                onClick={() => onRemove(sub.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Usuń
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SubscriptionTable;
