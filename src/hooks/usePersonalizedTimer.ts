
import { useState, useEffect } from 'react';

interface TimerData {
  visitorId: string;
  startDate: string;
  expiryDate: string;
  hasExpired: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const usePersonalizedTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [hasExpired, setHasExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate unique visitor ID
  const generateVisitorId = (): string => {
    return `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  };

  // Get current price based on timer status
  const getCurrentPrice = (): { current: number; regular: number; savings: number } => {
    if (hasExpired) {
      return { current: 67, regular: 67, savings: 0 };
    }
    return { current: 47, regular: 67, savings: 20 };
  };

  // Initialize or get existing timer data
  const initializeTimer = (): TimerData => {
    try {
      const existingData = localStorage.getItem('familyLyfeTimer');
      
      if (existingData) {
        const timerData: TimerData = JSON.parse(existingData);
        const now = new Date();
        const expiry = new Date(timerData.expiryDate);
        
        // Check if timer has expired
        if (now >= expiry) {
          const updatedData = { ...timerData, hasExpired: true };
          localStorage.setItem('familyLyfeTimer', JSON.stringify(updatedData));
          return updatedData;
        }
        
        return timerData;
      }
      
      // Create new timer for first-time visitor
      const now = new Date();
      const expiry = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days from now
      
      const newTimerData: TimerData = {
        visitorId: generateVisitorId(),
        startDate: now.toISOString(),
        expiryDate: expiry.toISOString(),
        hasExpired: false
      };
      
      localStorage.setItem('familyLyfeTimer', JSON.stringify(newTimerData));
      return newTimerData;
      
    } catch (error) {
      console.error('Error with localStorage:', error);
      // Fallback for browsers without localStorage support
      const now = new Date();
      const expiry = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
      
      return {
        visitorId: generateVisitorId(),
        startDate: now.toISOString(),
        expiryDate: expiry.toISOString(),
        hasExpired: false
      };
    }
  };

  // Calculate time remaining
  const calculateTimeLeft = (expiryDate: string): TimeLeft => {
    const now = new Date().getTime();
    const expiry = new Date(expiryDate).getTime();
    const difference = expiry - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  // Initialize timer on component mount
  useEffect(() => {
    const timerData = initializeTimer();
    setHasExpired(timerData.hasExpired);
    
    if (!timerData.hasExpired) {
      const remaining = calculateTimeLeft(timerData.expiryDate);
      setTimeLeft(remaining);
    }
    
    setIsLoading(false);
  }, []);

  // Update countdown every second
  useEffect(() => {
    if (hasExpired || isLoading) return;

    const interval = setInterval(() => {
      try {
        const timerData = JSON.parse(localStorage.getItem('familyLyfeTimer') || '{}');
        const remaining = calculateTimeLeft(timerData.expiryDate);
        
        // Check if timer just expired
        if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
          setHasExpired(true);
          const updatedData = { ...timerData, hasExpired: true };
          localStorage.setItem('familyLyfeTimer', JSON.stringify(updatedData));
          clearInterval(interval);
        } else {
          setTimeLeft(remaining);
        }
      } catch (error) {
        console.error('Error updating timer:', error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasExpired, isLoading]);

  return {
    timeLeft,
    hasExpired,
    isLoading,
    pricing: getCurrentPrice()
  };
};
