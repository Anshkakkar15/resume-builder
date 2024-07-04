"use client";
import Image from "next/image";
import { ASSETS } from "../../assets";
import Link from "next/link";
import { LogOut, User2 } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { useToken } from "@/lib/useToken";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAuth } from "@/redux/slices/AuthSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const { getAuth, removeAuth } = useAuth();
  const { getToken, removeToken } = useToken();
  const userDetails = getAuth();
  const userToken = getToken();
  const userId = useSelector((state) => state.AuthSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToken) {
      dispatch(
        updateUserAuth({
          userId: userToken,
          userDetails: userDetails && JSON.parse(userDetails),
        }),
      );
    }
  }, [userToken, userDetails]);

  const handleLogout = () => {
    removeAuth();
    removeToken();
    router.push("/");
    window.location.reload();
  };

  return (
    <div className="w-full bg-white shadow-md">
      <div className="container mx-auto px-3 py-3 sm:px-5 sm:py-4 md:px-7 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="max-w-28 sm:max-w-32 2xl:w-full">
            <Link href="/">
              <Image src={ASSETS.LOGO} alt="logo" />
            </Link>
          </div>
          <div>
            <ul className="flex items-center gap-2 sm:gap-5 md:gap-7 xl:gap-9">
              <li>
                <a
                  href="#templates"
                  className="text-nowrap font-popins text-sm font-medium text-dark-blue sm:text-base 2xl:text-lg"
                >
                  Craft Your Resume
                </a>
              </li>
              {userId?.userId ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "focus:shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-white",
                      )}
                    >
                      {userId?.userDetails?.username}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className={cn("flex cursor-pointer gap-2 text-red-500")}
                      onClick={handleLogout}
                    >
                      <LogOut />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <li>
                  <Link
                    className="flex items-center gap-1 font-popins text-sm font-medium text-dark-blue sm:gap-2 sm:text-base 2xl:text-lg"
                    href="/sign-in"
                  >
                    <span>
                      <User2 />
                    </span>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
