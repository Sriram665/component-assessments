// types/User.ts
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department?: string;
  location?: string;
  joinDate?: string;
  isActive?: boolean;
}

  
  export interface UserCardProps {
    user: User;
    onViewProfile: (user: User) => void;
  }
  