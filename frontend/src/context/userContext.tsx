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

export type FirebaseAccount = {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

type UserContextProps = {
  user: User | null,                            // When this is null, the user is not logged in Eventllege
  setUser: (userStatus: User | null) => void,
  firebaseAccount: FirebaseAccount | null;
  setFirebaseAccount: (firebaseAccount: FirebaseAccount | null) => void
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserContextProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [firebaseAccount, setFirebaseAccount] = useState<FirebaseAccount | null>(null);

  return (
    <UserContext.Provider
      value={{ user, setUser, firebaseAccount, setFirebaseAccount }}
    >
      {children}
    </UserContext.Provider>
  );
}