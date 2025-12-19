
import { Classroom } from './types';

export const BUILDINGS = ['Science Hall', 'Main Library', 'Engineering Wing', 'Arts Complex', 'Student Union'];

export const MOCK_CLASSROOMS: Classroom[] = [
  {
    id: '1',
    roomNumber: '304',
    building: 'Science Hall',
    capacity: 25,
    availableUntil: '4:00 PM',
    amenities: ['Whiteboard', 'Power Outlets', 'Projector'],
    imageUrl: 'https://picsum.photos/seed/room1/800/400',
  },
  {
    id: '2',
    roomNumber: '102B',
    building: 'Main Library',
    capacity: 4,
    availableUntil: '6:30 PM',
    amenities: ['Power Outlets', 'Quiet Zone'],
    imageUrl: 'https://picsum.photos/seed/room2/800/400',
  },
  {
    id: '3',
    roomNumber: '401',
    building: 'Engineering Wing',
    capacity: 50,
    availableUntil: '2:00 PM',
    amenities: ['Whiteboard', 'Ethernet', 'Dual Monitors'],
    imageUrl: 'https://picsum.photos/seed/room3/800/400',
  },
  {
    id: '4',
    roomNumber: 'Studio 5',
    building: 'Arts Complex',
    capacity: 10,
    availableUntil: '8:00 PM',
    amenities: ['Large Tables', 'Natural Light'],
    imageUrl: 'https://picsum.photos/seed/room4/800/400',
  }
];
