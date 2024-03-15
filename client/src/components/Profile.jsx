import Layout from "../layouts/Layout";
import { useRef } from "react";
import { useEffect } from "react";

const Profile = () => {
  const userRef = useRef();

  useEffect(() => {
    async function fetchData() {
      if (sessionStorage.getItem("user")) {
        const data = await fetch("http://localhost:3000/api/users/" + JSON.parse(sessionStorage.getItem("user")).id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(sessionStorage.getItem("user")).token,
          },
        }).then((response) => response.json());

        const user = {
          name: data.user.name,
          username: data.user.username,
          email: data.user.email,
          password: data.user.password,
        };

        userRef.current = user;
      }
    }

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="text-foreground text-red-500 font-semibold text-4xl tracking-tighter mx-auto flex items-center gap-2 mt-10">
        Profile
      </div>
    </Layout>
  );
};

export default Profile;
