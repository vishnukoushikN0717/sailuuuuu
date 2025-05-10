"use client";

import { useState, useEffect } from 'react';
import { VideoMessage } from './VideoMessage';

interface DeliveryNotificationProps {
  message: VideoMessage | null;
  show: boolean;
  onClose: () => void;
}

export default function DeliveryNotification({ message, show, onClose }: DeliveryNotificationProps) {
  const [visible, setVisible] = useState(false);
  
  // Handle visibility changes
  useEffect(() => {
    if (show) {
      setVisible(true);
      
      // Auto-hide after 5 seconds
      const timeoutId = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    } else {
      setVisible(false);
    }
  }, [show, onClose]);
  
  if (!visible || !message) return null;
  
  return (
    <div className="delivery-notification">
      <div className="notification-content">
        <div className="notification-icon">✉️</div>
        <div className="notification-text">
          <h4>Message Delivered!</h4>
          <p>Your video message "{message.subject}" has been delivered to {message.recipientEmail}.</p>
        </div>
        <button 
          className="notification-close"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
