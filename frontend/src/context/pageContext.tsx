'use client'
import React, { createContext, ReactNode, useState } from 'react';

export enum PageStatus {
  Loading = 'Loading',
  NotFound = 'Not Found',
  Ready = 'Ready',
}

type PageContextProps = {
  pageStatus: PageStatus,
  setPageStatus: (pageStatus: PageStatus) => void,
}

export const PageContext = createContext<PageContextProps>({} as PageContextProps);

export function PageContextProvider({ children }: { children: ReactNode }) {

  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.Loading);

  return (
    <PageContext.Provider
      value={{ pageStatus, setPageStatus }}
    >
      {children}
    </PageContext.Provider>
  );
}