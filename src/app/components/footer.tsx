import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

function footer() {
  return (
    <div className="bg-popover flex flex-wrap flex-col justify-around py-10 px-15 gap-2">
      <div className=" w-full flex justify-around gap-5">
        <div className="flex flex-col gap-2">
          <div className="text-2xl">Developers</div>
          <span className="flex items-center gap-2">
            <div>
              <Avatar>
                <AvatarImage src={"/image/uchral.png"}></AvatarImage>
              </Avatar>
            </div>
            <div>Uchral</div>
          </span>
          <span className="flex items-center gap-2">
            <div>
              <Avatar>
                <AvatarImage src={"/image/Tod-erhes.png"}></AvatarImage>
              </Avatar>
            </div>
            <div>Tod-Erhes</div>
          </span>
          <span className="flex items-center gap-2">
            <div>
              <Avatar>
                <AvatarImage src={"/image/manduul.png"}></AvatarImage>
              </Avatar>
            </div>
            <div>Manduul</div>
          </span>
          <span className="flex items-center gap-2">
            <div>
              <Avatar>
                <AvatarImage src={"/image/Duman.png"}></AvatarImage>
              </Avatar>
            </div>
            <div>Dumanbek</div>
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-3xl">Contact us</div>
          <div>i-Space@gmail.com</div>
          <div>9999-9999</div>
          <div>You need to Spaceship to reach our Market</div>
        </div>
        <div>
          <div className="text-2xl">Download App</div>
          <div>Save $3 with App New Users Only</div>
          <div className="flex gap-2">
            <div>
              <Image
                src="/image/qr-code.png"
                width={100}
                height={100}
                alt="Rick Roll"
              ></Image>
            </div>
            <div className="flex flex-col justify-around">
              <div>
                <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}>
                  <Image
                    src="/image/playstore.png"
                    width={100}
                    height={100}
                    alt="playstore"
                  ></Image>
                </Link>
              </div>
              <div>
                <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}>
                  <Image
                    src="/image/applestore.png"
                    width={100}
                    height={100}
                    alt="appstore"
                  ></Image>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-accent">
        @ Copyright Rimet 2025. All right reserved
      </div>
    </div>
  );
}

export default footer;
