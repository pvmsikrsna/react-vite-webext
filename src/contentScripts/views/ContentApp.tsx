import React from "react";

export const ContentApp = () => {
  const [count, setCount] = React.useState(0);
  return <div onClick={e => setCount(c => c + 1)}>React Vite WebExt - {count}</div>;
};
