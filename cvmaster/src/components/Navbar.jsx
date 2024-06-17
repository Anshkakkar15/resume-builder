import Image from "next/image";
import { ASSETS } from "../../assets";
import Link from "next/link";
import { User2 } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-md">
      <div className="container mx-auto px-3 py-3 sm:px-5 sm:py-4 md:px-7 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="max-w-28 sm:max-w-32 2xl:w-full">
            <Image src={ASSETS.LOGO} alt="logo" />
          </div>
          <div>
            <ul className="flex gap-2 sm:gap-5 md:gap-7 xl:gap-9">
              <li>
                <a
                  href="#templates"
                  className="text-nowrap font-popins text-sm font-medium text-dark-blue sm:text-base 2xl:text-lg"
                >
                  Craft Your Resume
                </a>
              </li>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
