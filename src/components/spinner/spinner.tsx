import { RotatingLines } from 'react-loader-spinner';
import React from 'react';

interface SpinnerProps {
  size?: string;
}

export function Spinner({ size = 'small' }: SpinnerProps): React.JSX.Element {
  return (
    <div className={`spinner-container spinner-container--${size}`} data-testid="spinner">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible
      />
    </div>
  );
}
