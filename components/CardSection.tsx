import React, { ReactNode } from 'react';

interface CardSectionProps {
  heading?: string;
  children: ReactNode;
}

const CardSection: React.FC<CardSectionProps> = ({ heading, children }) => {
  return (
    <div className="bg-gray-800 text-white p-4 mb-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      {heading && <h2 className="text-xl font-bold mb-2">{heading}</h2>}
      {children}
    </div>
  );
};

export default CardSection;
