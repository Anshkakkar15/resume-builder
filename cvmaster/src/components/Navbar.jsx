import Image from "next/image";
import { ASSETS } from "../../assets";
import Link from "next/link";
import { User2 } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="shadow-md bg-white  w-full">
      <div className="container mx-auto py-3 px-0">
        <div className="flex justify-between items-center">
          <div className="">
            <Image src={ASSETS.LOGO} alt="logo" />
          </div>
          <div>
            <ul className="flex gap-9">
              <li>
                <a
                  href="#template"
                  className="font-medium text-xl text-dark-blue font-popins"
                >
                  Craft Your Resume
                </a>
              </li>
              <li>
                <Link
                  className="flex gap-2 items-center font-medium text-xl text-dark-blue font-popins"
                  href="/login"
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
