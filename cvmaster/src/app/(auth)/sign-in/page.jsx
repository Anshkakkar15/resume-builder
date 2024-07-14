"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ASSETS } from "../../../../assets";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signInSchema } from "@/schemas/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSignInMutation } from "@/redux/api";
import { ButtonLoader } from "@/components/loaders/ButtonLoader";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useToken } from "@/lib/useToken";
import { useAuth } from "@/lib/useAuth";

export default function SignIn() {
  const router = useRouter();
  const { setToken } = useToken();
  const { setAuth } = useAuth();
  const [signIn, { isLoading, isError }] = useSignInMutation();
  const { toast } = useToast();
  const [password, showPassword] = useState(false);
  const form = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await signIn(data);
    if (response?.data?.success) {
      toast({
        title: `Welcome ${response?.data?.data?.username}`,
      });
      setToken(response?.data?.data?._id);
      setAuth(response?.data?.data);
      router.replace("/");
      window.location.reload();
    }
    if (isError) {
      toast({
        variant: "destructive",
        title: response?.error?.data?.message
          ? response?.error?.data?.message
          : "Something went wrong! Please try again later",
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -10 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        layout
        className="container mx-auto px-3 py-3 sm:px-5 sm:py-4 md:px-7 lg:px-8"
      >
        <div className="max-w-28 sm:max-w-32 2xl:w-full">
          <Link href="/">
            <Image src={ASSETS.LOGO} alt="logo" />
          </Link>
        </div>
        <div className="flex h-[90vh] w-full items-center justify-center">
          <div className="grid w-full max-w-[550px] grid-cols-1 place-items-center rounded-2xl py-16 shadow-xl shadow-gray-500 md:max-w-full md:grid-cols-2 md:py-20">
            <div className="hidden md:block">
              <Image src={ASSETS.AUTH_IMG} alt="auth" />
            </div>
            <div className="container mx-auto">
              <h1 className="text-center font-popins text-2xl sm:text-3xl xl:text-4xl">
                Sign In
              </h1>
              <p className="mt-2 text-center font-popins text-base sm:text-xl xl:text-2xl">
                Enter your credentials to sign in
              </p>
              <Form {...form} className="space-y-6">
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Input
                          {...field}
                          name="email"
                          className="mt-3 border-dark-blue outline-none"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mt-3">
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <Input
                            {...field}
                            type={`${password ? "text" : "password"}`}
                            name="password"
                          />
                          <div
                            onClick={() => showPassword(!password)}
                            className="absolute right-3 top-1/2 -translate-y-2/4 cursor-pointer"
                          >
                            {password ? <Eye /> : <EyeOff />}
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="mt-5 w-full md:mt-7 2xl:mt-8"
                    disabled={isLoading}
                  >
                    {isLoading && <ButtonLoader />}
                    {!isLoading && "Sign In"}
                  </Button>
                </form>
              </Form>
              <p className="mt-4 text-center text-dark-blue">
                Don&apos;t have account?{" "}
                <Link
                  className="font-semibold hover:text-[#171717e6]"
                  href={"/sign-up"}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
