"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SignOut = () => {
  type FieldName = "fullname" | "username" | "email" | "password";

  const router = useRouter();
  const signUp = useAuthStore((state) => state.register);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signUpSchema = yup.object().shape({
    fullname: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Email must be valid")
      .required("Email is required"),
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
    resolver: yupResolver(signUpSchema),
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
    fullname: string;
    username: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError("");

    try {
      await signUp(data);
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
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-[0.7] items-center"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-2">
          <div className="flex-1 py-1">
            <h3 className="font-semibold text-lg py-2 px-3">name</h3>
            <InputText
              {...customRegister("fullname")}
              name="fullname"
              placeholder="name"
              isValid={getValidationState("fullname")}
              errorMessage={errors.fullname?.message}
            />
          </div>
          <div className="flex-1 py-1">
            <h3 className="font-semibold text-lg py-2 px-3">username</h3>
            <InputText
              {...customRegister("username")}
              name="username"
              placeholder="username"
              isValid={getValidationState("username")}
              errorMessage={errors.username?.message}
            />
          </div>
        </div>
        <div className="py-1">
          <h3 className="font-semibold text-lg py-2 px-3">email</h3>
          <InputText
            {...customRegister("email")}
            name="email"
            placeholder="email"
            isValid={getValidationState("email")}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className="py-1">
          <h3 className="font-semibold text-lg py-2 px-3">password</h3>
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
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignOut;
