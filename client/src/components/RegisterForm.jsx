import React, { useState } from "react";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-4">
        <div>
          <div className="group relative rounded-lg border focus-within:border-red-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-400/30">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-red-400">Full name</label>
            </div>
            <input
              type="text"
              name="fullname"
              placeholder="Full name"
              autoComplete="off"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div>
          <div className="group relative rounded-lg border focus-within:border-red-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-400/30">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-red-400">Username</label>
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
          <div className="group relative rounded-lg border focus-within:border-red-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-400/30">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-red-400">Email address</label>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div>
          <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-400/30">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-red-400">Password</label>
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
      <div className="mt-4 flex items-center justify-end gap-x-2">
        <button className="font-semibold hover:bg-red-500 hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-300 text-white h-10 px-4 py-2" type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;
