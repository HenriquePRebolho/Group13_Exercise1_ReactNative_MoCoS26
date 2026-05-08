export interface User {
  name: string;
  birthday: string;
  description: string;
  languages: string[];
  sex: string;
  hobbies: string[];
  contactInfo: string[];
  location: string;
  email: string;
  password: string;
  friends: string[];
  blocked: string[];
}

export const defaultUser: User = {
  name: 'Nico',
  birthday: '14/01/1998',
  description: 'I like being outside and meeting new people!',
  languages: ['English', 'Mongolian'],
  sex: 'Male',
  hobbies: ['Reading', 'Football', 'Ski', 'Coding', 'Traveling', 'Movies', 'Hiking'],
  contactInfo: ['+00 234-5678', '@nico.nico'],
  location: 'Kaiserstraße 46, 72764 Reutlingen, Deutschland',
  email: 'nico.nico@gmail.com',
  password: 'password',
  friends: ['User1', 'User2'],
  blocked: ['User3', 'User4'],
};

export interface AppEvent {
  id: number;
  name: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  description: string;
  participants: string[];
  owner: string;
  tags: string[];
  restrictions: string[];
  languages: string[];
  limitPeople: number;
  public: boolean;
  bring: string[];
  contactInfo: string[];
}

export const defaultEvent: AppEvent = {
  id: 1,
  name: 'Event name',
  date: '14/01/2023',
  timeStart: '14:00',
  timeEnd: '15:00',
  location: 'Kaiserstraße 46, 72764 Reutlingen',
  description: 'Event description',
  participants: ['User1', 'User2'],
  owner: 'User1',
  tags: ['Tag1', 'Tag2'],
  restrictions: ['Restriction1', 'Restriction2'],
  languages: ['English', 'Mongolian', 'Cantonese', 'Bosnian', 'Yapper'],
  limitPeople: 12,
  public: true,
  bring: ['Bring1', 'Bring2'],
  contactInfo: ['+00 234-5678', '@nico.nico'],
};
