'use client'
import React, { createContext, ReactNode, useState } from 'react';

export enum PageStatus {
  UserLoading = 'User Loading',
  PageLoading = 'Page Loading',
  NotFound = 'Not Found',
  Ready = 'Ready',
}

type PageContextProps = {
  pageStatus: PageStatus,
  setPageStatus: (pageStatus: PageStatus) => void,
  ready: () => void,
}

export const PageContext = createContext<PageContextProps>({} as PageContextProps);

export function PageContextProvider({ children }: { children: ReactNode }) {

  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.UserLoading);

  const ready = () => {
    setPageStatus(PageStatus.Ready);
  }

  return (
    <PageContext.Provider
      value={{ pageStatus, setPageStatus, ready }}
    >
      {children}
    </PageContext.Provider>
  );
}