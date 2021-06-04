import React, { useEffect } from "react";
import Message from "../components/Message";
import { useSelector } from "react-redux";

function Home() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userInfo = useSelector((state) => state.userInfo);
  const { user } = userInfo;
  useEffect(() => {}, []);
  return (
    <div>
      {isAuthenticated && user ? (
        <Message variant={"success"}>Logged In as {user.first_name}</Message>
      ) : (
        <Message variant={"danger"}>You are not logged In</Message>
      )}
    </div>
  );
}

export default Home;
