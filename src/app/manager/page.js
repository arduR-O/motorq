"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-black">
      <form className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Username"
          className="mb-4"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4"
          value={password}
          onChange={handlePasswordChange}
        />
        <Link href="/manager/home">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={!username || !password}
          >
            Submit
          </button>
        </Link>
      </form>
    </main>
  );
}
