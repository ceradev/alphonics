import React from "react";
import Layout from "../layouts/Layout";
import { useRef } from "react";
import { useEffect } from "react";

const Profile = () => {

  const userRef = useRef();
  const userid = JSON.parse(sessionStorage.getItem("user")).id;

  console.log(userid);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const data = fetch("http://localhost:3000/api/users/" + userid, {
        method: "GET",
        credentials: "include",
      }).then((response) => response.json());

      const user = {
        name: data.name,
        username : data.username,
        email : data.email,
        password : data.password
      }

      userRef.current = user;
    }
  });

  return (
    <Layout>
      <div className="text-foreground text-red-500 font-semibold text-4xl tracking-tighter mx-auto flex items-center gap-2 mt-10">Profile</div>
    </Layout>
  );
};

export default Profile;
