'use client'
import React, { createContext, ReactNode, useState } from 'react';

export enum LoginStatus {
  Unknown = 'Unknown',
  LoggedIn = 'Logged In',
  LoggedOut = 'Logged Out',
  SigningUp = 'Singing Up',
}

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
  user: User | null,
  setUser: (userStatus: User | null) => void,
  firebaseAccount: FirebaseAccount | null;
  setFirebaseAccount: (firebaseAccount: FirebaseAccount | null) => void
  loginStatus: LoginStatus,   
  setLoginStatus: (loginStatus: LoginStatus) => void,
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserContextProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [firebaseAccount, setFirebaseAccount] = useState<FirebaseAccount | null>(null);
  const [loginStatus, setLoginStatus] = useState(LoginStatus.Unknown);

  return (
    <UserContext.Provider
      value={{ user, setUser, firebaseAccount, setFirebaseAccount, loginStatus, setLoginStatus }}
    >
      {children}
    </UserContext.Provider>
  );
}