// import './App.css';
import { useState, useEffect } from "react";
import Timer from "./component/Timer";

// useEffect? Mount(화면에 첫 렌더링), Update(다시 렌더링), Unmount(화면에서 사라질 때)
// 특정 작업을 처리할 코드를 실행시켜 주고 싶을 때 사용

// 렌더링 될 때 마다 실행
// useEffect(() => {
//   작업;
// });

// 화면에 첫 렌더링 될 때, value 값이 바뀔 때 실행
// 빈 배열 전달 시, 화면에 첫 렌더링 될 때만 실행
// useEffect(() => {
//   작업;
// }, [value]);

// useEffect(() => {
//   // 구독
//   return () => {
//     // 구독 해지
//   }
// }, []);

const heavyWork = () => {
  console.log("무거운작업");
  return ["홍길동", "김민수"];
};

function App() {
  const [time, setTime] = useState(1);
  // 처음 랜더링 시에만 함수가 불리게 하기 위해 콜백을 넣고 리턴값으로 함수를 넣어줌
  const [names, setNames] = useState(() => {
    return heavyWork();
  });
  const [input, setInput] = useState("");
  const [count, setCount] = useState(1);
  const [names2, setNames2] = useState("");
  const [showTimer, setShowTimer] = useState(false);

  const handleClick = () => {
    let newTime;
    if (time >= 12) {
      newTime = 1;
    } else {
      newTime = time + 1;
    }
    setTime(newTime);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleUpload = () => {
    setNames((prevState) => {
      return [input, ...prevState];
    });
  };

  const handleCountUpdate = () => {
    setCount(count + 1);
  };

  const handleInput2Change = (e) => {
    setNames2(e.target.value);
  };

  useEffect(() => {
    console.log("렌더링");
  }, [count]);

  return (
    <div className="App">
      <span>현재 시각: {time}시</span>
      <button onClick={handleClick}>Update</button>
      <br />
      <br />
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleUpload}>Upload</button>
      {names.map((name, idx) => {
        return <p key={idx}>{name}</p>;
      })}
      <button onClick={handleCountUpdate}>Update</button>
      <span>count: {count}</span>
      <br />
      <br />
      <input type="text" value={names2} onChange={handleInput2Change} />
      <span>name: {names2}</span>
      <br />
      <br />
      {showTimer && <Timer />}
      <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>
    </div>
  );
}

export default App;
