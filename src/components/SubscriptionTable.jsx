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
