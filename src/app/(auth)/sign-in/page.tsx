"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";

const SignIn = () => {
  const [formLogin, setFormLogin] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await login({
        usernameOrEmail: formLogin.usernameOrEmail,
        password: formLogin.password,
      });

      router.push("/");
    } catch (e: any) {
      console.error("Login failed:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-100 h-full flex flex-col">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex-1 items-center"
      >
        <div className="py-1">
          <h3 className="font-semibold text-lg py-2 px-3">Username or Email</h3>
          <InputText
            name="usernameOrEmail"
            placeholder="username or email"
            value={formLogin.usernameOrEmail}
            onChange={handleChange}
          />
        </div>
        <div className="py-1">
          <h3 className="font-semibold text-lg py-2 px-3">Password</h3>
          <InputText
            type="password"
            name="password"
            placeholder="password"
            value={formLogin.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex-1 justify-end">
          <Button className="rounded-full" color="rose" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
