"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  type FieldName = "usernameOrEmail" | "password";

  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginSchema = yup.object().shape({
    usernameOrEmail: yup.string().required("Username or email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    getFieldState,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const getValidationState = (name: FieldName): boolean | undefined => {
    const { error, isTouched, isDirty } = getFieldState(name);
    if (!isTouched && !isDirty) return undefined;
    return !error;
  };

  const customRegister = (name: FieldName) => {
    const reg = register(name);
    return {
      ...reg,
      onBlur: async (e: React.FocusEvent<HTMLInputElement>) => {
        reg.onBlur(e);
        await trigger(name);
      },
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        reg.onChange(e);
        trigger(name);
      },
    };
  };

  const onSubmit = async (data: {
    usernameOrEmail: string;
    password: string;
  }) => {
    setLoading(true);
    setError("");

    try {
      await login(data);

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
      <div className="flex-[0.3] pt-2">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-[0.7] items-center"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="py-1">
          <h3 className="font-semibold text-lg py-2 px-3">Username or Email</h3>
          <InputText
            {...customRegister("usernameOrEmail")}
            name="usernameOrEmail"
            placeholder="username or email"
            isValid={getValidationState("usernameOrEmail")}
            errorMessage={errors.usernameOrEmail?.message}
          />
        </div>
        <div className="py-1">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg py-2 px-3">Password</h3>
            <a
              href="/forgot-password"
              className="text-sm text-rose-500 hover:text-rose-800 px-3"
            >
              forgot password?
            </a>
          </div>
          <InputText
            {...customRegister("password")}
            type="password"
            name="password"
            placeholder="password"
            isValid={getValidationState("password")}
            errorMessage={errors.password?.message}
          />
        </div>

        <div className="flex flex-col py-2">
          <div className="flex justify-center items-center">
            <Button
              className="rounded-full min-w-[120px]"
              color="rose"
              type="submit"
            >
              {loading ? "Logging In..." : "Login"}
            </Button>
          </div>
          <small className="text-center py-1">
            new user?{" "}
            <a href="/sign-up" className="text-rose-500 hover:text-rose-800">
              sign up
            </a>
          </small>
        </div>
      </form>
    </div>
  );
};

export default Login;
