/* eslint-disable no-undef */
import { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const CLIENT_ID = "e269b673d31546e6a6b44f63f4aeadc0";
  const CLIENT_SECRET = "1f1ca0920b104536bb29efd3d84c784a";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseAPI = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const dataUser = await responseAPI.json();

      if (dataUser.success) {
        // Establecer el token de acceso en una variable de sesión
        sessionStorage.setItem("USER_ACCESS_TOKEN", dataUser.user.token);

        // Obtener el token de acceso a la API de Spotify
        const responseSpotify = await fetch(
          "https://accounts.spotify.com/api/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
          }
        );
        if (!responseSpotify.ok) {
          throw new Error("Failed to fetch access token from Spotify API");
        }

        const dataSpotify = await responseSpotify.json();
        sessionStorage.setItem(
          "SPOTIFY_ACCESS_TOKEN",
          dataSpotify.access_token
        );
 
        console.log("Login successful with Spotify access token and Alphonics access token");

        // Redirigir a la página principal
        window.location.href = "/";
      } else {
        setError(dataUser.error);

        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="text-foreground text-red-500 font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
        Log in to Alphonics to continue enjoying music
      </div>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>
        <div className="mx-5 border dark:border-b-red-500/50 dark:border-t-red-500/50 border-b-red-500/20 sm:border-t-red-500/20 shadow-[20px_0_20px_20px] shadow-red-500/10 dark:shadow-red-500/20 rounded-lg border-red-500/20 border-l-red-500/20 border-r-red-500/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl text-red-500 font-semibold leading-6 tracking-tighter">
              Login
            </h3>
            <p className="mt-1.5 text-sm font-medium text-black">
              Welcome back, enter your credentials to continue.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <div className="group relative rounded-lg border focus-within:border-red-400 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-400/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-red-500 text-black">
                        Username
                      </label>
                      <div className="absolute right-3 translate-y-2 text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      autoComplete="off"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-red-400 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-400/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-red-500 text-black">
                        Password
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-red-500 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                {error && (
                  <div className="text-red-600 font-medium mr-6">{error}</div>
                )}
              </div>
              <div className="mt-4 flex items-center justify-end gap-x-2">
                <a
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-red-600 h-10 px-4 py-2 duration-200"
                  href="/signup"
                >
                  Register
                </a>
                <button
                  className="font-semibold hover:bg-red-600 hover:text-white hover:ring hover:ring-red-600 transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                  type="submit"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LoginForm;


//El codigo comentado hace la comprobacion para obtener el componente ApiAccessTokenProvider

// export default LoginForm;

// import { useState } from "react";
// import DefaultLayout from "../layouts/DefaultLayout";
// import ApiAccessTokenProvider from "../utils/ApiAccessTokenProvider";

// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado para controlar el estado de inicio de sesión

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         const user = {
//           id: data.user.id,
//           token: data.user.token,
//         };

//         // Guardar los datos del usuario en la sesión
//         sessionStorage.setItem("user", JSON.stringify(user));
//         setIsLoggedIn(true); // Actualizar el estado de inicio de sesión

//         // Redirigir a la página de inicio
//         location.href = "/";
//       } else {
//         setError(data.error);

//         setTimeout(() => {
//           setError("");
//         }, 3000);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <DefaultLayout>
//       {/* Renderizar el componente ApiAccessTokenProvider solo si el usuario está logueado */}
//       {isLoggedIn && <ApiAccessTokenProvider />}
//       <div className="text-foreground text-red-500 font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
//         Log in to Alphonics to continue enjoying music
//       </div>
//       <div className="relative mt-12 w-full max-w-lg sm:mt-10">
//         <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>
//         <div className="mx-5 border dark:border-b-red-500/50 dark:border-t-red-500/50 border-b-red-500/20 sm:border-t-red-500/20 shadow-[20px_0_20px_20px] shadow-red-500/10 dark:shadow-red-500/20 rounded-lg border-red-500/20 border-l-red-500/20 border-r-red-500/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
//           <div className="flex flex-col p-6">
//             <h3 className="text-xl text-red-500 font-semibold leading-6 tracking-tighter">
//               Login
//             </h3>
//             <p className="mt-1.5 text-sm font-medium text-black">
//               Welcome back, enter your credentials to continue.
//             </p>
//           </div>
//           <div className="p-6 pt-0">
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <div>
//                   <div className="group relative rounded-lg border focus-within:border-red-400 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-400/30">
//                     <div className="flex justify-between">
//                       <label className="text-xs font-medium text-muted-foreground group-focus-within:text-red-500 text-black">
//                         Username
//                       </label>
//                       <div className="absolute right-3 translate-y-2 text-red-500">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="currentColor"
//                           className="w-6 h-6"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                     <input
//                       type="text"
//                       name="username"
//                       placeholder="Username"
//                       autoComplete="off"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <div>
//                   <div className="group relative rounded-lg border focus-within:border-red-400 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-400/30">
//                     <div className="flex justify-between">
//                       <label className="text-xs font-medium text-muted-foreground group-focus-within:text-red-500 text-black">
//                         Password
//                       </label>
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         type="password"
//                         name="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-red-500 sm:leading-7 text-foreground"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 {error && (
//                   <div className="text-red-600 font-medium mr-6">{error}</div>
//                 )}
//               </div>
//               <div className="mt-4 flex items-center justify-end gap-x-2">
//                 <a
//                   className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-red-600 h-10 px-4 py-2 duration-200"
//                   href="/signup"
//                 >
//                   Register
//                 </a>
//                 <button
//                   className="font-semibold hover:bg-red-600 hover:text-white hover:ring hover:ring-red-600 transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
//                   type="submit"
//                 >
//                   Log in
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default LoginForm;
