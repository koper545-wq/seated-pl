"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { type HostEvent, getHostEventsByHostId as getMockEvents } from "@/lib/mock-data";

const STORAGE_KEY = "seated-custom-events";

interface EventsContextType {
  // Get events for a specific host (combines mock + custom)
  getHostEvents: (hostId: string) => HostEvent[];
  // Add a new event
  addEvent: (hostId: string, event: Omit<HostEvent, "id">) => HostEvent;
  // Update an event
  updateEvent: (eventId: string, updates: Partial<HostEvent>) => void;
  // Delete an event
  deleteEvent: (eventId: string) => void;
  // Check if loaded
  isLoaded: boolean;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [customEvents, setCustomEvents] = useState<Record<string, HostEvent[]>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load events from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const converted: Record<string, HostEvent[]> = {};
        for (const [hostId, events] of Object.entries(parsed)) {
          converted[hostId] = (events as HostEvent[]).map((event) => ({
            ...event,
            date: new Date(event.date),
            createdAt: event.createdAt ? new Date(event.createdAt) : new Date(),
          }));
        }
        setCustomEvents(converted);
      }
    } catch (error) {
      console.error("Failed to load events from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customEvents));
      } catch (error) {
        console.error("Failed to save events to localStorage:", error);
      }
    }
  }, [customEvents, isLoaded]);

  const getHostEvents = useCallback(
    (hostId: string): HostEvent[] => {
      // Get mock events for this host
      const mockEvents = getMockEvents(hostId);
      // Get custom events for this host
      const hostCustomEvents = customEvents[hostId] || [];
      // Combine and return
      return [...mockEvents, ...hostCustomEvents];
    },
    [customEvents]
  );

  const addEvent = useCallback(
    (hostId: string, eventData: Omit<HostEvent, "id">): HostEvent => {
      const newEvent: HostEvent = {
        ...eventData,
        id: `custom-event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };

      setCustomEvents((prev) => ({
        ...prev,
        [hostId]: [...(prev[hostId] || []), newEvent],
      }));

      return newEvent;
    },
    []
  );

  const updateEvent = useCallback((eventId: string, updates: Partial<HostEvent>) => {
    setCustomEvents((prev) => {
      const newState = { ...prev };
      for (const hostId of Object.keys(newState)) {
        newState[hostId] = newState[hostId].map((event) =>
          event.id === eventId ? { ...event, ...updates } : event
        );
      }
      return newState;
    });
  }, []);

  const deleteEvent = useCallback((eventId: string) => {
    setCustomEvents((prev) => {
      const newState = { ...prev };
      for (const hostId of Object.keys(newState)) {
        newState[hostId] = newState[hostId].filter((event) => event.id !== eventId);
      }
      return newState;
    });
  }, []);

  return (
    <EventsContext.Provider
      value={{
        getHostEvents,
        addEvent,
        updateEvent,
        deleteEvent,
        isLoaded,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
}
