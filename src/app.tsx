import { useState } from 'preact/hooks';
import Content from './Content';

export function App() {
  const [show, setShow] = useState(false);

  return (
    <div style={{padding:20}}>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Content />}
    </div>
  );
}