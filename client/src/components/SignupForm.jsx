import DefaultLayout from "../layouts/DefaultLayout";
import { useState } from "react";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, name, email }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to the home page
        const user = {
          id: data.user.id,
          token: data.user.token,
        };

        // Guardar los datos del usuario en la sesión
        sessionStorage.setItem("user", JSON.stringify(user));
        location.href = "/";
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DefaultLayout>
      <div className="text-foreground text-red-500 font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
        Sign up to Alphonics to start listening to our music
      </div>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>
        <div className="mx-5 border dark:border-b-red-500/50 dark:border-t-red-500/50 border-b-red-500/20 sm:border-t-red-500/20 shadow-[20px_0_20px_20px] shadow-red-500/10 dark:shadow-red-500/20 rounded-lg border-red-500/20 border-l-red-500/20 border-r-red-500/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl text-red-500 font-semibold leading-6 tracking-tighter">
              Sign up
            </h3>
            <p className="mt-1.5 text-sm font-medium text-black">
              Welcome to Alphonics, enter your credentials.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <div className="group relative rounded-lg border focus-within:border-red-400 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-400/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-red-500 text-black">
                        Your name
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name and surname"
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-red-500 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
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
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      autoComplete="off"
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
                        Email
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-red-500 sm:leading-7 text-foreground"
                      />
                    </div>
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
              {error && (
                <div className="mt-4">
                  <div className="text-red-500 text-sm font-semibold">
                    {error}
                  </div>
                </div>
              )}
              <div className="mt-4 flex items-center justify-end gap-x-2">
                <button
                  className="font-semibold hover:bg-red-600 hover:text-white hover:ring hover:ring-red-600 transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignupForm;
