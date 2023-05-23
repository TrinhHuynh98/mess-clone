"use client";

import { Buttons } from "@/app/components/Buttons";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SocialButton } from "./SocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();

  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSumit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios.post("/api/register", data).then(() =>
        signIn("credentials", {
          ...data,
          redirect: false,
        })
          .then((callback) => {
            if (callback?.error) {
              toast.error("UnAuthentication");
            }
            if (callback?.ok && !callback?.error) {
              toast.success("Create new account");
              router.push("/users");
            }
          })
          .catch(() => {
            toast.error("Something went wrong!");
          })
          .finally(() => setIsLoading(false))
      );
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Login!");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const loginWithSocial = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("UnAuthentication");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Login!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSumit)}>
          {variant === "REGISTER" && (
            <Input
              label="Name"
              id="name"
              required
              errors={errors}
              register={register}
              disabled={isLoading}
            />
          )}
          <Input
            label="Email Address"
            type="email"
            id="email"
            required
            errors={errors}
            register={register}
            disabled={isLoading}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            required
            errors={errors}
            register={register}
            disabled={isLoading}
          />
          <div>
            <Buttons disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Login" : "Register"}
            </Buttons>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <SocialButton
            icon={BsGithub}
            onClick={() => loginWithSocial("github")}
          />
          <SocialButton
            icon={BsGoogle}
            onClick={() => loginWithSocial("google")}
          />
        </div>

        <div className="flex gap-2 justify-center text-sm mt-4 px-2 text-gray-500">
          <div>
            {variant === "LOGIN" ? "New messeger" : "Already have an account? "}
          </div>
          <div
            onClick={handleChangeVariant}
            className="underline cursor-pointer"
          >
            {variant === "LOGIN" ? "Create new account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
