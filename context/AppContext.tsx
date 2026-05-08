import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { User, AppEvent, defaultUser, defaultEvent } from '@/types/models';

interface AppState {
  profile: User;
  eventsList: AppEvent[];
  usersList: User[];
  visibilityOwned: boolean;
  visibilityJoined: boolean;
  selectedEvent: AppEvent | null;
  selectedFriend: User | null;
  updateProfile: (user: User) => void;
  setVisibilityOwned: (v: boolean) => void;
  setVisibilityJoined: (v: boolean) => void;
  setSelectedEvent: (event: AppEvent | null) => void;
  setSelectedFriend: (user: User | null) => void;
  joinEvent: (eventId: number) => void;
  leaveEvent: (eventId: number) => void;
  addFriend: (username: string) => void;
  removeFriend: (username: string) => void;
  createEvent: (eventData: Omit<AppEvent, 'id' | 'participants' | 'owner'>) => void;
}

const AppContext = createContext<AppState | null>(null);

const initialEvents: AppEvent[] = [
  defaultEvent,
  { ...defaultEvent, id: 2, name: 'Hiking in the hills', date: '20/05/2025', location: 'Achalm, Reutlingen' },
  { ...defaultEvent, id: 3, name: 'Board game night', date: '22/05/2025', location: 'Stadtbibliothek Reutlingen' },
];

const initialUsers: User[] = [
  defaultUser,
  { ...defaultUser, name: 'User2', description: 'Love hiking and photography.' },
  { ...defaultUser, name: 'User3', description: 'Coffee enthusiast and coder.' },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<User>(defaultUser);
  const [eventsList, setEventsList] = useState<AppEvent[]>(initialEvents);
  const [usersList] = useState<User[]>(initialUsers);
  const [visibilityOwned, setVisibilityOwned] = useState(true);
  const [visibilityJoined, setVisibilityJoined] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null);

  const joinEvent = useCallback((eventId: number) => {
    const userName = profile.name;
    const updater = (e: AppEvent) =>
      e.id === eventId && !e.participants.includes(userName)
        ? { ...e, participants: [...e.participants, userName] }
        : e;
    setEventsList(prev => prev.map(updater));
    setSelectedEvent(prev => (prev ? updater(prev) : prev));
  }, [profile.name]);

  const leaveEvent = useCallback((eventId: number) => {
    const userName = profile.name;
    const updater = (e: AppEvent) =>
      e.id === eventId
        ? { ...e, participants: e.participants.filter(p => p !== userName) }
        : e;
    setEventsList(prev => prev.map(updater));
    setSelectedEvent(prev => (prev ? updater(prev) : prev));
  }, [profile.name]);

  const createEvent = useCallback((eventData: Omit<AppEvent, 'id' | 'participants' | 'owner'>) => {
    const newEvent: AppEvent = {
      ...eventData,
      id: Date.now(),
      participants: [profile.name],
      owner: profile.name,
    };
    setEventsList(prev => [...prev, newEvent]);
  }, [profile.name]);

  const addFriend = useCallback((username: string) => {
    setProfile(prev => ({
      ...prev,
      friends: prev.friends.includes(username) ? prev.friends : [...prev.friends, username],
    }));
  }, []);

  const removeFriend = useCallback((username: string) => {
    setProfile(prev => ({
      ...prev,
      friends: prev.friends.filter(f => f !== username),
    }));
  }, []);

  const value = useMemo<AppState>(() => ({
    profile,
    eventsList,
    usersList,
    visibilityOwned,
    visibilityJoined,
    selectedEvent,
    selectedFriend,
    updateProfile: setProfile,
    setVisibilityOwned,
    setVisibilityJoined,
    setSelectedEvent,
    setSelectedFriend,
    joinEvent,
    leaveEvent,
    addFriend,
    removeFriend,
    createEvent,
  }), [profile, eventsList, usersList, visibilityOwned, visibilityJoined, selectedEvent, selectedFriend, joinEvent, leaveEvent, addFriend, removeFriend, createEvent]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
