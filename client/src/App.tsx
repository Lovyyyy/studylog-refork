import { Signup } from "pages/Signup";
import Login from "pages/Login";
import Landing from "pages/Landing";
import Mypage from "pages/Mypage";
import Room from "pages/Room";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Todo from "pages/Todo";
import Creatingroom from "./pages/Creatingroom";
import { useStore } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Boards from "components/Boards";
import Roomlist from "pages/Roomlist";
import Nav from "./components/Nav";
import Idinquiry from "./components/Idinquiry";
import { io } from "socket.io-client";
import Findinfo from "pages/Findinfo";
import Total from "pages/Total";

const socket = io("http://localhost:4000", {
  withCredentials: true,
});

function App() {
  const guestNum = (Math.random() * 10000000).toString().slice(0, 4);
  const geust = `Annoy${guestNum}`;
  const [annoy, setAnnoy] = useState(geust);
  console.log(annoy);
  const [roomId, setRoomId] = useState("");
  const SERVER = process.env.REACT_APP_SERVER;
  let { userId } = useParams();
  const url = new URL(window.location.href);
  const authCode = url.searchParams.get("code");

  // --------------------------- OAUTH 로그인---------------------
  const sendAuthCode = (authCode: any) => {
    axios
      .post(`${SERVER}/Oauth`, { authorizationCode: authCode })
      .then((res: AxiosResponse) => {
        // console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log("err:", err);
      });
  };

  useEffect(() => {
    sendAuthCode(authCode);
  }, []);
  // outh 서버로 전송이 안댐 , 뭔가 틀렸을텐데 뭘까
  // ----------------------------------------

  return (
    //------------------------------------------------------------------------------------------------
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing socket={socket} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="/room">
          <Route path=":roomId" element={<Room socket={socket} annoy={annoy} roomId={roomId} />} />
        </Route>
        <Route
          path="/creatingroom"
          element={<Creatingroom socket={socket} setRoomId={setRoomId} />}
        />
        <Route
          path="/roomlist"
          element={<Roomlist socket={socket} annoy={annoy} roomId={roomId} setRoomId={setRoomId} />}
        />
        <Route path="/Findinfo" element={<Findinfo />} />
        <Route path="/Nav" element={<Nav />} />
        <Route path="/Total" element={<Total />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
