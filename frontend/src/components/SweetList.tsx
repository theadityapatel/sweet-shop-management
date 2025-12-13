import { useEffect, useState } from 'react';
import { apiFetch } from '../api/client';

export default function SweetList() {
  const [sweets, setSweets] = useState<any[]>([]);

  async function loadSweets() {
    const data = await apiFetch('/sweets');
    setSweets(data);
  }

  async function purchase(id: string) {
    await apiFetch(`/sweets/${id}/purchase`, {
      method: 'POST',
      body: JSON.stringify({ amount: 1 })
    });
    loadSweets();
  }

  useEffect(() => {
    loadSweets();
  }, []);

  return (
  <>
    <h2>Sweets</h2>
    {sweets.map(s => (
      <div className="sweet" key={s.id}>
        <div>
          <strong>{s.name}</strong>
          <div>Qty: {s.quantity}</div>
        </div>
        <button
          disabled={s.quantity === 0}
          onClick={() => purchase(s.id)}
        >
          Buy
        </button>
      </div>
    ))}
  </>
);

}
