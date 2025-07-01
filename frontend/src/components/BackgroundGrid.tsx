import React from 'react';

export default function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0 opacity-20" style={{ 
      backgroundImage: 'linear-gradient(#9F70FD 1px, transparent 1px), linear-gradient(to right, #9F70FD 1px, transparent 1px)', 
      backgroundSize: '3rem 3rem' 
    }} />
  );
}