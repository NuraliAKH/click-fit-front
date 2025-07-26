export type WorkingHours = {
  [day: string]: string; // e.g., { monday: "06:00-23:00" }
};

export interface Gym {
  id: number;
  name: string;
  description?: string;
  address: string;
  phone: string;
  email?: string;

  latitude: number;
  longitude: number;
  workingHours: WorkingHours;

  rating: number;
  reviewCount: number;

  ownerId: number;
  owner: any;

  services: any[];
  trainers: any[];
  images: any[];
  bookings: any[];
  reviews: any[];
  favorites: any[];
  amenities: any[];
  schedules: any[];

  isActive: boolean;

  createdAt: string; // ISO string or Date if parsed
  updatedAt: string;

  GymAnalytics: any[];
}

export interface CreateGym {
  id: number;
  name: string;
  description?: string;
  address: string;
  phone: string;
  email?: string;

  latitude: number;
  longitude: number;
  workingHours: WorkingHours;

  rating: number;
  reviewCount: number;

  ownerId: number;

  isActive: boolean;
}
