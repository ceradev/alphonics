import React, { useState, useEffect } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 5000); // Cambia el valor 5000 por el tiempo en milisegundos que deseas que dure el mensaje de error
    }
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.ok) {
          window.location.href = "/home";
        } else {
          // Si la respuesta del servidor indica un error, muestra el mensaje de error al usuario
          return res.json().then((data) => {
            throw new Error(data.error || "Error en el inicio de sesión");
          });
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <div className="group relative rounded-lg border focus-within:border-red-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-400/30">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-red-400">
                Username
              </label>
              <div className="absolute right-3 translate-y-2 text-red-200">
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
                  ></path>
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
          <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-400/30">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-red-400">
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
      {error && <p className="text-red-500 font-sans mt-2">{error}</p>}
      <div className="mt-4 flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remember"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="outline-none focus:outline focus:outline-red-300"
          />
          <span className="text-xs font-medium">Remember me</span>
        </label>
      </div>
      <div className="mt-4 flex items-center justify-end gap-x-2">
        <a
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-red-400 h-10 px-4 py-2 duration-200"
          href="/auth/register"
        >
          Register
        </a>
        <button
          className="font-semibold hover:bg-red-500 hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-300 text-white h-10 px-4 py-2"
          type="submit"
        >
          Log in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
