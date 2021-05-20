import React, { useState } from "react";

const Context = React.createContext({});

export function ContextSidebarProvider({ children }: any) {
  const [position, setPosition] = useState(true);

  return (
    <Context.Provider value={{ position, setPosition }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
