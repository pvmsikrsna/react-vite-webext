import {useState} from "react";
import {Counter} from "~/ui/Counter";

export const OptionsApp = () => {
  const [count, setCount] = useState(0);
  return <div>
    <Counter count={count}></Counter>
    <button onClick={e => setCount(x => x + 1)}>Increment Count</button>
  </div>;
};
