import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Redirect to checkout with toolkit product type
const ToolkitCheckout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to checkout with toolkit product parameter
    navigate('/checkout?product=toolkit', { replace: true });
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to toolkit checkout...</p>
      </div>
    </div>
  );
};

export default ToolkitCheckout;