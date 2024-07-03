"use client";
import Image from "next/image";
import React from "react";
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
import { signUpSchema } from "@/schemas/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion, AnimatePresence } from "framer-motion";
import { useSignUpMutation } from "@/redux/api";
import { useToast } from "@/components/ui/use-toast";
import { ButtonLoader } from "@/components/loaders/ButtonLoader";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [signUp, { isLoading, isSuccess, isError }] = useSignUpMutation();
  const { toast } = useToast();
  const form = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await signUp(data);
    console.log(isSuccess);
    if (isSuccess) {
      toast({
        title: response?.data?.message,
      });
      router.push("/sign-in");
    }
    if (isError) {
      toast({
        variant: "destructive",
        title: response?.error?.data?.message,
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
          <div className="grid w-full max-w-[550px] grid-cols-1 place-items-center rounded-2xl py-16 shadow-xl shadow-gray-500 md:max-w-full md:grid-cols-2 md:py-24">
            <div className="hidden md:block">
              <Image src={ASSETS.AUTH_IMG} alt="auth" />
            </div>
            <div className="container mx-auto">
              <h1 className="text-center font-popins text-2xl sm:text-3xl xl:text-4xl">
                Sign Up
              </h1>
              <p className="mt-2 text-center font-popins text-base sm:text-xl xl:text-2xl">
                Enter your credentials to sign in
              </p>
              <Form {...form} className="space-y-6">
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <Input {...field} name="username" className="mt-3" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Input {...field} name="email" className="mt-3" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          name="password"
                          className="mt-3"
                        />
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
                    {!isLoading && "Sign Up"}
                  </Button>
                </form>
              </Form>
              <p className="mt-4 text-center text-dark-blue">
                Already have an account?{" "}
                <Link
                  className="font-semibold hover:text-[#171717e6]"
                  href={"/sign-in"}
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
