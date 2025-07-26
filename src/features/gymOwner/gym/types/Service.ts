export type ServiceCategory = {
  id: number;
  type: string; // gym, pool, yoga, boxing
  name: string;
  icon: string;
  color: string;
  services?: GymService[]; // Опционально, если вы загружаете связанные услуги
};

export type GymService = {
  id: number;
  gymId: number;
  categoryId: number;
  name: string;
  description?: string;
  price: number; // в тийинах
  durationMinutes: number;
  capacity: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  gym?: any; // Опционально, если вы загружаете связанные данные
  category?: ServiceCategory;
  bookings?: any[];
  GymSchedule?: any[];
};
