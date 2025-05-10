"use client";

import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';

// Define the VideoMessage interface
export interface VideoMessage {
  id: string;
  videoData?: string; // Optional now, as videos are stored on the server
  recipientEmail: string;
  scheduledDate: string; // ISO string format
  subject: string;
  message: string;
  created: string; // ISO string format
  delivered: boolean;
}

interface VideoRecorderProps {
  onVideoRecorded: (videoBlob: Blob) => void;
}

export function VideoRecorder({ onVideoRecorded }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check if MediaRecorder is supported
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!navigator.mediaDevices || !window.MediaRecorder) {
        setIsSupported(false);
      }
    }
  }, []);

  // Request camera and microphone access
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera and microphone:", err);
      alert("Please allow access to your camera and microphone to record a video message.");
    }
  };

  // Start recording
  const startRecording = () => {
    if (!stream) return;

    try {
      // Try to determine the best supported MIME type
      const mimeType = getSupportedMimeType();

      const options = mimeType ? { mimeType } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (err) {
      console.error("Error starting recording:", err);
      alert("There was an error starting the recording. Your browser may not support this feature.");
    }
  };

  // Helper function to get supported MIME type
  const getSupportedMimeType = () => {
    const types = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/webm',
      'video/mp4'
    ];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    return null;
  };

  // Pause recording
  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);

      // Pause timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Resume recording
  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);

      // Resume timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Format recording time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [stream, previewUrl]);

  // Create video preview when recording is complete
  useEffect(() => {
    if (recordedChunks.length > 0 && !isRecording) {
      const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(videoBlob);
      setPreviewUrl(videoUrl);
      onVideoRecorded(videoBlob);
    }
  }, [recordedChunks, isRecording, onVideoRecorded]);

  return (
    <div className="video-recorder-container">
      {!isSupported ? (
        <div className="browser-not-supported">
          <div className="not-supported-icon">⚠️</div>
          <h4>Browser Not Supported</h4>
          <p>Your browser doesn't support video recording. Please try using a modern browser like Chrome, Firefox, or Edge.</p>
        </div>
      ) : (
        <>
          <div className="video-preview-container">
            {!previewUrl ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="video-preview"
              />
            ) : (
              <video
                src={previewUrl}
                controls
                className="video-preview"
              />
            )}
          </div>

          <div className="recording-controls">
            {!stream && !isRecording && (
              <button
                onClick={startCamera}
                className="camera-btn"
              >
                Enable Camera
              </button>
            )}

            {stream && !isRecording && !previewUrl && (
              <button
                onClick={startRecording}
                className="record-btn"
              >
                Start Recording
              </button>
            )}

            {isRecording && !isPaused && (
              <>
                <div className="recording-indicator">
                  <span className="recording-dot"></span>
                  <span className="recording-time">{formatTime(recordingTime)}</span>
                </div>
                <div className="recording-buttons">
                  <button
                    onClick={pauseRecording}
                    className="pause-btn"
                  >
                    Pause
                  </button>
                  <button
                    onClick={stopRecording}
                    className="stop-btn"
                  >
                    Stop
                  </button>
                </div>
              </>
            )}

            {isRecording && isPaused && (
              <>
                <div className="recording-indicator paused">
                  <span className="recording-time">{formatTime(recordingTime)} (Paused)</span>
                </div>
                <div className="recording-buttons">
                  <button
                    onClick={resumeRecording}
                    className="resume-btn"
                  >
                    Resume
                  </button>
                  <button
                    onClick={stopRecording}
                    className="stop-btn"
                  >
                    Stop
                  </button>
                </div>
              </>
            )}

            {previewUrl && (
              <button
                onClick={() => {
                  setPreviewUrl(null);
                  setRecordedChunks([]);
                  startCamera();
                }}
                className="retake-btn"
              >
                Record Again
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

interface VideoSchedulerProps {
  videoBlob: Blob | null;
  onSchedule: (message: Omit<VideoMessage, 'id' | 'videoData' | 'created' | 'delivered'>) => void;
}

export function VideoScheduler({ videoBlob, onSchedule }: VideoSchedulerProps) {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Set minimum date to today
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoBlob) {
      alert('Please record a video first.');
      return;
    }

    if (!recipientEmail || !scheduledDate || !scheduledTime || !subject) {
      alert('Please fill in all required fields.');
      return;
    }

    // Combine date and time into a single ISO string
    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);

    // Check if scheduled time is in the future
    if (scheduledDateTime <= new Date()) {
      alert('Please select a future date and time.');
      return;
    }

    onSchedule({
      recipientEmail,
      scheduledDate: scheduledDateTime.toISOString(),
      subject,
      message
    });

    // Reset form
    setRecipientEmail('');
    setScheduledDate('');
    setScheduledTime('');
    setSubject('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="video-scheduler-form">
      <div className="form-group">
        <label htmlFor="recipient-email">Recipient Email *</label>
        <input
          id="recipient-email"
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          placeholder="Enter recipient's email"
          required
          className="scheduler-input"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="scheduled-date">Date *</label>
          <input
            id="scheduled-date"
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            min={minDate}
            required
            className="scheduler-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="scheduled-time">Time *</label>
          <input
            id="scheduled-time"
            type="time"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            required
            className="scheduler-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject *</label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter message subject"
          required
          className="scheduler-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message (optional)</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a personal message..."
          className="scheduler-textarea"
        />
      </div>

      <button
        type="submit"
        className="schedule-btn"
        disabled={!videoBlob}
      >
        Schedule Message
      </button>
    </form>
  );
}

interface VideoMessageListProps {
  messages: VideoMessage[];
  onDelete: (id: string) => void;
}

export function VideoMessageList({ messages, onDelete }: VideoMessageListProps) {
  return (
    <div className="video-message-list">
      {messages.length === 0 ? (
        <p className="text-pink-300 text-center italic">No scheduled video messages yet.</p>
      ) : (
        <div className="message-list">
          {messages.map((message) => {
            const scheduledDate = new Date(message.scheduledDate);
            const isDelivered = message.delivered;
            const isPending = !isDelivered && scheduledDate > new Date();
            const isOverdue = !isDelivered && scheduledDate <= new Date();

            return (
              <div
                key={message.id}
                className={`message-item ${isDelivered ? 'delivered' : ''} ${isPending ? 'pending' : ''} ${isOverdue ? 'overdue' : ''}`}
              >
                <div className="message-header">
                  <h4 className="message-subject">{message.subject}</h4>
                  <div className="message-status">
                    {isDelivered && <span className="status delivered">Delivered</span>}
                    {isPending && <span className="status pending">Pending</span>}
                    {isOverdue && <span className="status overdue">Processing</span>}
                  </div>
                </div>

                <div className="message-details">
                  <p className="message-recipient">
                    <span className="label">To:</span> {message.recipientEmail}
                  </p>
                  <p className="message-date">
                    <span className="label">Scheduled for:</span> {format(scheduledDate, 'MMM d, yyyy h:mm a')}
                  </p>
                  {message.message && (
                    <p className="message-text">
                      <span className="label">Message:</span> {message.message}
                    </p>
                  )}
                </div>

                <div className="message-actions">
                  {!isDelivered && (
                    <button
                      onClick={() => onDelete(message.id)}
                      className="delete-message-btn"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
