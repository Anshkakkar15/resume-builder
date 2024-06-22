"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { ASSETS } from "../../assets";

export const BuilderTopbar = () => {
  const [stepsData, setStepsData] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStepsData(JSON.parse(sessionStorage.getItem("builder-page")));
    }
  }, []);

  return (
    <div className="w-full bg-dark-blue shadow-md">
      <div className="container mx-auto px-3 py-3 sm:px-5 sm:py-4 md:px-7 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-5 sm:justify-between">
          <div className="">
            <Image src={ASSETS.ICON} alt="icon" className="w-10" />
          </div>
          <div className="flex w-full justify-center sm:w-auto">
            <svg
              width="532"
              height="29"
              viewBox="0 0 532 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M101.394 15.3047L80.6021 27.7095C79.9382 28.1058 79.0387 28.4308 77.9841 28.6559C76.9295 28.8809 75.7514 28.9991 74.5548 29H3.6453C2.98562 29.0002 2.3382 28.9291 1.77215 28.7942C1.2061 28.6594 0.742661 28.4659 0.4313 28.2344C0.11994 28.0029 -0.0276545 27.7421 0.00426878 27.4798C0.036192 27.2176 0.246435 26.9637 0.612561 26.7452L21.1268 14.5L0.635329 2.25475C0.270261 2.03697 0.0601448 1.78391 0.0272808 1.52243C-0.00558335 1.26094 0.14003 1.0008 0.448666 0.769604C0.757305 0.538404 1.21744 0.344781 1.78026 0.209282C2.34307 0.0737829 2.98755 0.00146349 3.6453 0H74.5548C75.7514 0.000881933 76.9295 0.119084 77.9841 0.344161C79.0387 0.56924 79.9382 0.89426 80.6021 1.2905L101.381 13.6952C101.782 13.933 101.998 14.2127 102 14.4992C102.002 14.7856 101.792 15.0659 101.394 15.3047Z"
                fill={`${stepsData?.includes("introduction") ? "#e88d67" : "#E7E7E7"}`}
              />
              <path
                d="M187.394 15.3047L166.602 27.7095C165.938 28.1058 165.039 28.4308 163.984 28.6559C162.929 28.8809 161.751 28.9991 160.555 29H89.6452C88.9855 29.0002 88.3383 28.9291 87.7722 28.7942C87.2061 28.6594 86.7427 28.4659 86.4313 28.2344C86.1199 28.0029 85.9726 27.7421 86.0042 27.4798C86.0364 27.2176 86.2464 26.9637 86.6126 26.7452L107.127 14.5L86.6353 2.25475C86.2702 2.03697 86.0603 1.78391 86.0275 1.52243C85.9947 1.26094 86.1402 1.0008 86.4486 0.769604C86.7576 0.538404 87.2175 0.344781 87.7805 0.209282C88.343 0.0737829 88.9878 0.00146349 89.6452 0H160.555C161.751 0.000881933 162.929 0.119084 163.984 0.344161C165.039 0.56924 165.938 0.89426 166.602 1.2905L187.381 13.6952C187.782 13.933 187.998 14.2127 188 14.4992C188.002 14.7856 187.792 15.0659 187.394 15.3047Z"
                fill={`${stepsData?.includes("language") ? "#e88d67" : "#E7E7E7"}`}
              />
              <path
                d="M273.394 15.3047L252.602 27.7095C251.938 28.1058 251.039 28.4308 249.984 28.6559C248.929 28.8809 247.751 28.9991 246.555 29H175.645C174.985 29.0002 174.338 28.9291 173.772 28.7942C173.206 28.6594 172.743 28.4659 172.431 28.2344C172.12 28.0029 171.973 27.7421 172.004 27.4798C172.036 27.2176 172.246 26.9637 172.613 26.7452L193.127 14.5L172.635 2.25475C172.27 2.03697 172.06 1.78391 172.027 1.52243C171.995 1.26094 172.14 1.0008 172.449 0.769604C172.758 0.538404 173.217 0.344781 173.781 0.209282C174.343 0.0737829 174.988 0.00146349 175.645 0H246.555C247.751 0.000881933 248.929 0.119084 249.984 0.344161C251.039 0.56924 251.938 0.89426 252.602 1.2905L273.381 13.6952C273.782 13.933 273.998 14.2127 274 14.4992C274.002 14.7856 273.792 15.0659 273.394 15.3047Z"
                fill="#E7E7E7"
              />
              <path
                d="M359.394 15.3047L338.602 27.7095C337.938 28.1058 337.039 28.4308 335.984 28.6559C334.929 28.8809 333.751 28.9991 332.555 29H261.645C260.985 29.0002 260.338 28.9291 259.772 28.7942C259.206 28.6594 258.743 28.4659 258.431 28.2344C258.12 28.0029 257.973 27.7421 258.004 27.4798C258.036 27.2176 258.246 26.9637 258.613 26.7452L279.127 14.5L258.635 2.25475C258.27 2.03697 258.06 1.78391 258.027 1.52243C257.995 1.26094 258.14 1.0008 258.449 0.769604C258.758 0.538404 259.217 0.344781 259.781 0.209282C260.343 0.0737829 260.988 0.00146349 261.645 0H332.555C333.751 0.000881933 334.929 0.119084 335.984 0.344161C337.039 0.56924 337.938 0.89426 338.602 1.2905L359.381 13.6952C359.782 13.933 359.998 14.2127 360 14.4992C360.002 14.7856 359.792 15.0659 359.394 15.3047Z"
                fill="#E7E7E7"
              />
              <path
                d="M445.394 15.3047L424.602 27.7095C423.938 28.1058 423.039 28.4308 421.984 28.6559C420.929 28.8809 419.751 28.9991 418.555 29H347.645C346.985 29.0002 346.338 28.9291 345.772 28.7942C345.206 28.6594 344.743 28.4659 344.431 28.2344C344.12 28.0029 343.973 27.7421 344.004 27.4798C344.036 27.2176 344.246 26.9637 344.613 26.7452L365.127 14.5L344.635 2.25475C344.27 2.03697 344.06 1.78391 344.027 1.52243C343.995 1.26094 344.14 1.0008 344.449 0.769604C344.758 0.538404 345.217 0.344781 345.781 0.209282C346.343 0.0737829 346.988 0.00146349 347.645 0H418.555C419.751 0.000881933 420.929 0.119084 421.984 0.344161C423.039 0.56924 423.938 0.89426 424.602 1.2905L445.381 13.6952C445.782 13.933 445.998 14.2127 446 14.4992C446.002 14.7856 445.792 15.0659 445.394 15.3047Z"
                fill="#E7E7E7"
              />
              <path
                d="M531.394 15.3047L510.602 27.7095C509.938 28.1058 509.039 28.4308 507.984 28.6559C506.929 28.8809 505.751 28.9991 504.555 29H433.645C432.985 29.0002 432.338 28.9291 431.772 28.7942C431.206 28.6594 430.743 28.4659 430.431 28.2344C430.12 28.0029 429.973 27.7421 430.004 27.4798C430.036 27.2176 430.246 26.9637 430.613 26.7452L451.127 14.5L430.635 2.25475C430.27 2.03697 430.06 1.78391 430.027 1.52243C429.995 1.26094 430.14 1.0008 430.449 0.769604C430.758 0.538404 431.217 0.344781 431.781 0.209282C432.343 0.0737829 432.988 0.00146349 433.645 0H504.555C505.751 0.000881933 506.929 0.119084 507.984 0.344161C509.039 0.56924 509.938 0.89426 510.602 1.2905L531.381 13.6952C531.782 13.933 531.998 14.2127 532 14.4992C532.002 14.7856 531.792 15.0659 531.394 15.3047Z"
                fill="#E7E7E7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
