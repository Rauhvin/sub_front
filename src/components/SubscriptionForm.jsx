import { useState, useEffect } from "react";

function SubscriptionForm({ onAdd, editData }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setPrice(editData.price);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price) {
      onAdd({ name, price: parseFloat(price) });
      setName("");
      setPrice("");
    } else {
      alert("Wypełnij wszystkie pola.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="Nazwa subskrypcji"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Cena miesięczna"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-success">
        {editData ? "Zapisz" : "Dodaj"}
      </button>
    </form>
  );
}

export default SubscriptionForm;
