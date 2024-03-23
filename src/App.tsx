import { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./components/form";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const thereIsPosts = localStorage.getItem("posts");

    if (!thereIsPosts) {
      localStorage.setItem("posts", "[]");
    }
  }, []);

  return (
    <div className="flex justify-center w-full h-full items-center">
      <Form postsId={null} />
    </div>
  );
}

export default App;
