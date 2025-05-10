"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import FloatingHearts from "../components/FloatingHearts";
import VideoMessageSection from "../components/VideoMessageSection";

// Define types for our data
interface CalendarEvent {
  id: string;
  date: string; // ISO string format
  title: string;
  description: string;
  color: string; // For different event categories
}

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string; // ISO string format
}

export default function CareerPage() {
  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState<Omit<CalendarEvent, 'id'>>({
    date: '',
    title: '',
    description: '',
    color: '#ff69b4' // Default pink color
  });

  // Todo list state
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [showHearts, setShowHearts] = useState(false);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }

    const savedTodos = localStorage.getItem('careerTodos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Calendar navigation functions
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Get days for current month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Calendar event functions
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setNewEvent({
      ...newEvent,
      date: date.toISOString(),
    });
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    if (newEvent.title.trim() === '') return;

    const event: CalendarEvent = {
      ...newEvent,
      id: Date.now().toString(),
    };

    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));

    // Also add the event to the todo list
    const eventDate = new Date(event.date);
    const formattedDate = format(eventDate, 'MMM d, yyyy');
    const todoText = `${event.title} (${formattedDate})${event.description ? ': ' + event.description : ''}`;

    const todo: TodoItem = {
      id: `event-${event.id}`,
      text: todoText,
      completed: false,
      createdAt: new Date().toISOString()
    };

    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    localStorage.setItem('careerTodos', JSON.stringify(updatedTodos));

    // Reset form and close modal
    setNewEvent({
      date: '',
      title: '',
      description: '',
      color: '#ff69b4'
    });
    setShowEventModal(false);
  };

  // Todo list functions
  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;

    const todo: TodoItem = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString()
    };

    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    localStorage.setItem('careerTodos', JSON.stringify(updatedTodos));
    setNewTodo('');
  };

  const toggleTodoComplete = (id: string) => {
    const todo = todos.find(todo => todo.id === id);
    const isBeingCompleted = todo && !todo.completed;

    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('careerTodos', JSON.stringify(updatedTodos));

    // If this is a calendar event todo, we'll use the isEventCompleted function
    // to determine if the event should be displayed as completed in the calendar
    // No need to modify the events array since we check completion status dynamically

    // Show hearts animation when completing a task
    if (isBeingCompleted) {
      setShowHearts(true);
    }
  };

  const resetHeartsAnimation = () => {
    setShowHearts(false);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('careerTodos', JSON.stringify(updatedTodos));
  };

  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });
  };

  // Check if an event is completed by looking at its corresponding todo item
  const isEventCompleted = (eventId: string) => {
    const todoId = `event-${eventId}`;
    const todo = todos.find(todo => todo.id === todoId);
    return todo ? todo.completed : false;
  };

  return (
    <div className="flex flex-col items-center relative min-h-screen py-10">
      <div className="text-center mb-8">
        <h1 className="cosmic-title" data-text="Our Career Goals">Our Career Goals</h1>
        <p className="cosmic-subtitle">Planning our future together, one dream at a time</p>
      </div>

      {/* Side-by-side layout container */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-7xl mx-auto mb-8">
        {/* Calendar Section - Left Side */}
        <div className="bg-black p-4 rounded-lg shadow-md w-full md:w-5/12">
          <h2 className="text-2xl font-semibold text-pink-400 mb-3">Our Calendar</h2>

          <div className="calendar-container" style={{ padding: '0.75rem', border: 'none' }}>
            <div className="calendar-header flex justify-between items-center mb-2">
              <button
                onClick={prevMonth}
                className="calendar-nav-btn"
                style={{ width: '28px', height: '28px', fontSize: '0.9rem' }}
              >
                ❮
              </button>
              <h3 className="text-lg text-white font-medium">
                {format(currentDate, 'MMMM yyyy')}
              </h3>
              <button
                onClick={nextMonth}
                className="calendar-nav-btn"
                style={{ width: '28px', height: '28px', fontSize: '0.9rem' }}
              >
                ❯
              </button>
            </div>

            <div className="calendar-grid">
              {/* Day names header */}
              <div className="calendar-days-header">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="calendar-day-name" style={{ fontSize: '0.7rem' }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="calendar-days-grid" style={{ gap: '2px' }}>
                {Array(daysInMonth[0].getDay())
                  .fill(null)
                  .map((_, index) => (
                    <div key={`empty-${index}`} className="calendar-day empty"></div>
                  ))}

                {daysInMonth.map(day => {
                  const dayEvents = getEventsForDay(day);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const isCurrentDay = isToday(day);

                  return (
                    <div
                      key={day.toString()}
                      className={`calendar-day ${isCurrentMonth ? '' : 'other-month'} ${isCurrentDay ? 'today' : ''}`}
                      onClick={() => handleDateClick(day)}
                      style={{
                        height: '26px',
                        minHeight: '26px',
                        padding: '2px',
                        fontSize: '0.75rem'
                      }}
                    >
                      <div className="calendar-day-number">{format(day, 'd')}</div>
                      {dayEvents.length > 0 && (
                        <div className="calendar-day-events">
                          {dayEvents.map(event => (
                            <div
                              key={event.id}
                              className={`calendar-event ${isEventCompleted(event.id) ? 'completed-event' : ''}`}
                              style={{
                                backgroundColor: event.color,
                                padding: '1px 2px',
                                fontSize: '0.6rem',
                                textDecoration: isEventCompleted(event.id) ? 'line-through' : 'none',
                                opacity: isEventCompleted(event.id) ? 0.7 : 1
                              }}
                              title={`${event.title}${isEventCompleted(event.id) ? ' (Completed)' : ''}`}
                            >
                              {event.title.length > 5 ? `${event.title.substring(0, 5)}...` : event.title}
                              {isEventCompleted(event.id) && '✓'}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Todo List Section - Right Side */}
        <div className="bg-black p-4 rounded-lg shadow-md w-full md:w-7/12">
          <h2 className="text-2xl font-semibold text-pink-400 mb-3">Our Goals</h2>

          <div className="todo-container">
            <div className="todo-input-container mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new goal or task..."
                className="todo-input"
                onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
              />
              <button
                onClick={handleAddTodo}
                className="todo-add-btn"
              >
                Add
              </button>
            </div>

            <div className="todo-list" style={{ maxHeight: '350px' }}>
              {todos.length === 0 ? (
                <p className="text-pink-300 text-center italic">No goals added yet. Start by adding your first goal!</p>
              ) : (
                todos.map(todo => (
                  <div
                    key={todo.id}
                    className={`todo-item ${todo.completed ? 'completed' : ''} ${todo.id.startsWith('event-') ? 'calendar-event-todo' : ''}`}
                    style={{
                      borderLeft: todo.id.startsWith('event-') ? '3px solid #da70d6' : '3px solid #ff69b4',
                    }}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodoComplete(todo.id)}
                        className="todo-checkbox"
                      />
                      <span className="todo-text">
                        {todo.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="todo-delete-btn"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Message Section */}
      <VideoMessageSection />

      {/* Floating Hearts Animation */}
      <FloatingHearts trigger={showHearts} onComplete={resetHeartsAnimation} />

      {/* Event Modal */}
      {showEventModal && (
        <div className="event-modal-overlay">
          <div className="event-modal">
            <h3 className="text-xl font-semibold text-pink-400 mb-4">
              Add Event for {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
            </h3>

            <div className="event-form">
              <div className="form-group">
                <label htmlFor="event-title">Event Title</label>
                <input
                  id="event-title"
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Enter event title"
                  className="event-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="event-description">Description (optional)</label>
                <textarea
                  id="event-description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Enter event description"
                  className="event-textarea"
                />
              </div>

              <div className="form-group">
                <label htmlFor="event-color">Event Color</label>
                <div className="color-options">
                  {['#ff69b4', '#da70d6', '#ff1493', '#c71585', '#db7093'].map(color => (
                    <div
                      key={color}
                      className={`color-option ${newEvent.color === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewEvent({ ...newEvent, color })}
                    />
                  ))}
                </div>
              </div>

              <div className="modal-buttons">
                <button
                  onClick={() => setShowEventModal(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="add-event-btn"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Link href="/" className="text-pink-400 hover:text-pink-300 mt-8 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Home
      </Link>
    </div>
  );
}
