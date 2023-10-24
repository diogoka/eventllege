'use client'
import React, { createContext, ReactNode, useState } from "react";

export type User = {
  id: string;
  role: string;
  courseId: number;
  courseName: string;
  name: string;
  email: string;
  postalCode: string;
  phone: string;
}

type UserContextProps = {
  user: User | null,
  setUser: (userStatus: User | null) => void
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserContextProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
}