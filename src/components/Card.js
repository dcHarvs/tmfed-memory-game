import React from 'react';

export default function Card({ value, index, shown, onFlip, loading = false }) {
  return (
    <button
      className="card"
      style={{
        cursor: loading ? 'auto' : 'pointer',
      }}
      onClick={() => {
        if (!loading) {
          onFlip?.(value, index);
        }
      }}
    >
      {shown ? value : <span>&#8900;</span>}
    </button>
  );
}
