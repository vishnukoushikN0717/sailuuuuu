"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { VideoRecorder, VideoScheduler, VideoMessageList, VideoMessage } from './VideoMessage';
import DeliveryNotification from './DeliveryNotification';
import './VideoMessage.css';

export default function VideoMessageSection() {
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoMessages, setVideoMessages] = useState<VideoMessage[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [deliveredMessage, setDeliveredMessage] = useState<VideoMessage | null>(null);

  // Use refs to avoid dependency issues
  const videoMessagesRef = useRef<VideoMessage[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update ref when state changes
  useEffect(() => {
    videoMessagesRef.current = videoMessages;
  }, [videoMessages]);

  // Load messages from backend API
  const loadMessages = useCallback(async () => {
    try {
      // First try to load from backend
      const response = await fetch('http://localhost:3001/api/messages');

      if (response.ok) {
        const messages = await response.json();
        setVideoMessages(messages);
        videoMessagesRef.current = messages;

        // Update localStorage with the latest messages
        localStorage.setItem('videoMessages', JSON.stringify(messages));
      } else {
        // If backend fails, try to load from localStorage as fallback
        const savedMessages = localStorage.getItem('videoMessages');
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages);
          setVideoMessages(parsedMessages);
          videoMessagesRef.current = parsedMessages;
        }
      }
    } catch (error) {
      console.error('Error loading messages:', error);

      // Try localStorage as fallback if API fails
      try {
        const savedMessages = localStorage.getItem('videoMessages');
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages);
          setVideoMessages(parsedMessages);
          videoMessagesRef.current = parsedMessages;
        }
      } catch (localError) {
        console.error('Error loading messages from localStorage:', localError);
      }
    }
  }, []);

  // Function to check for messages that need to be delivered
  const checkDelivery = useCallback(async () => {
    try {
      // Fetch the latest messages from the backend
      const response = await fetch('http://localhost:3001/api/messages');

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const latestMessages = await response.json();

      // Check for newly delivered messages
      const currentMessages = videoMessagesRef.current;
      let newlyDeliveredMessage: VideoMessage | null = null;

      // Find a message that was not delivered before but is delivered now
      for (const message of latestMessages) {
        const oldMessage = currentMessages.find(m => m.id === message.id);
        if (oldMessage && !oldMessage.delivered && message.delivered) {
          newlyDeliveredMessage = message;
          break;
        }
      }

      // Update state with the latest messages
      setVideoMessages(latestMessages);
      videoMessagesRef.current = latestMessages;
      localStorage.setItem('videoMessages', JSON.stringify(latestMessages));

      // Show notification if a message was newly delivered
      if (newlyDeliveredMessage) {
        setDeliveredMessage(newlyDeliveredMessage);
        setShowNotification(true);
      }
    } catch (error) {
      console.error('Error checking delivery:', error);
    }
  }, []);

  // Set up the delivery check interval
  useEffect(() => {
    // Load messages first
    loadMessages();

    // Initial check
    checkDelivery();

    // Set up interval
    intervalRef.current = setInterval(checkDelivery, 60000);

    // Clean up
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [loadMessages, checkDelivery]);

  // Notification handling is now in the DeliveryNotification component

  // Handle video recording
  const handleVideoRecorded = useCallback((blob: Blob) => {
    setVideoBlob(blob);
  }, []);

  // Handle scheduling a video message
  const handleScheduleMessage = useCallback(async (messageData: Omit<VideoMessage, 'id' | 'videoData' | 'created' | 'delivered'>) => {
    if (!videoBlob) return;

    try {
      // Create form data to send to the backend
      const formData = new FormData();
      formData.append('video', videoBlob, 'video.webm');
      formData.append('recipientEmail', messageData.recipientEmail);
      formData.append('scheduledDate', messageData.scheduledDate);
      formData.append('subject', messageData.subject);
      if (messageData.message) {
        formData.append('message', messageData.message);
      }

      // Send to backend API
      const response = await fetch('http://localhost:3001/api/schedule', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const newMessage = await response.json();

      // Add to local state
      const currentMessages = [...videoMessagesRef.current, {
        ...newMessage,
        videoData: 'stored_on_server' // We don't store the video data in the browser anymore
      }];

      // Update localStorage first (without the video data)
      localStorage.setItem('videoMessages', JSON.stringify(currentMessages));

      // Then update state
      setVideoMessages(currentMessages);
      videoMessagesRef.current = currentMessages;

      // Reset video blob
      setVideoBlob(null);

      // Show success message
      alert('Your video message has been scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling video message:', error);
      alert('There was an error scheduling your video message. Please try again.');
    }
  }, [videoBlob]);

  // Handle deleting a scheduled message
  const handleDeleteMessage = useCallback(async (id: string) => {
    try {
      // Delete from backend
      const response = await fetch(`http://localhost:3001/api/messages/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      // Use the ref for current messages
      const currentMessages = videoMessagesRef.current;
      const updatedMessages = currentMessages.filter(message => message.id !== id);

      // Update localStorage first
      localStorage.setItem('videoMessages', JSON.stringify(updatedMessages));

      // Then update state
      setVideoMessages(updatedMessages);
      videoMessagesRef.current = updatedMessages;
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('There was an error deleting the message. Please try again.');
    }
  }, []);

  // Convert blob to base64 string
  const blobToBase64 = useCallback((blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert blob to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }, []);

  return (
    <div className="video-message-section">
      <h2 className="video-message-title">Scheduled Video Messages</h2>
      <p className="video-message-subtitle">
        Record a special video message and schedule it to be delivered to your loved one at the perfect moment
      </p>

      <div className="video-message-container">
        <div className="video-recorder-container">
          <h3 className="text-xl font-semibold text-pink-400 mb-2">Record Your Message</h3>
          <VideoRecorder onVideoRecorded={handleVideoRecorded} />
        </div>

        <div className="video-scheduler-container">
          <h3 className="text-xl font-semibold text-pink-400 mb-2">Schedule Delivery</h3>
          <VideoScheduler videoBlob={videoBlob} onSchedule={handleScheduleMessage} />
        </div>
      </div>

      <div className="video-message-list-container">
        <h3 className="text-xl font-semibold text-pink-400 mb-2 mt-6">Your Scheduled Messages</h3>
        {/* Use a key to force re-render only when messages change */}
        <VideoMessageList
          key={videoMessages.length}
          messages={videoMessages}
          onDelete={handleDeleteMessage}
        />
      </div>

      {/* Delivery Notification */}
      <DeliveryNotification
        message={deliveredMessage}
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}
