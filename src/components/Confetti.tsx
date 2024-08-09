'use client';

import Confetti from 'react-dom-confetti';
import { useEffect, useState } from 'react';

const ConfettiComponent = () => {
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  useEffect(() => setShowConfetti(true), []);

  return (
    <div
      className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center'
      aria-hidden='true'
    >
      <Confetti
        active={showConfetti}
        config={{
          elementCount: 250,
          spread: 90,
        }}
      />
    </div>
  );
};

export default ConfettiComponent;
