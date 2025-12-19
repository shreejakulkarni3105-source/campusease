
export type UserRole = 'student' | 'assigner';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  profilePic?: string;
  studentId?: string;
}

export type RoomStatus = 'available' | 'reserved' | 'occupied';

export interface Classroom {
  id: string;
  roomNumber: string;
  building: string;
  capacity: number;
  availableUntil: string;
  amenities: string[];
  imageUrl: string;
  status?: RoomStatus;
  assignedTo?: {
    name?: string;
    studentId: string;
    startTime: string;
    endTime: string;
    email?: string;
  };
}

export interface Reservation {
  id: string;
  classroom: Classroom;
  startTime: string;
  endTime: string;
  date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface SearchFilters {
  building: string;
  timeSlot: string;
  capacity: number;
}
