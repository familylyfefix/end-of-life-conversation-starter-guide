
import React from 'react';

interface CustomHTMLSectionProps {
  htmlContent: string;
}

const CustomHTMLSection = ({ htmlContent }: CustomHTMLSectionProps) => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div 
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

export default CustomHTMLSection;
