import React from 'react';

export function CountResult({ count }) {
  return (
    <p data-testid='result'>{count} 일</p>
  );
}
