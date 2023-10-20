"use client";
import { useSelector } from "react-redux";

function User() {
  const user = useSelector((state) => state.user.user);
  console.log(user);

  return <p className={"text-content"}>{user.name}</p>;
}

export default User;
