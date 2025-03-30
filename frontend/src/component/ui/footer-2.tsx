import React from "react";
import { GithubIcon } from "../../icons/github";
import { InstagramIcon } from "../../icons/instagram";
import { LinkedInIcon } from "../../icons/linkedIn";
import { Logo } from "../../icons/logo";
import { MapPin } from "../../icons/mapPin";
import { ProdyLogo } from "../../icons/prody";

export const FooterTwo = () => {
  return (
    <>
      <footer className="bg-transparent text-white border-gray-600">
        <div className="container mx-auto px-4 py-8 sm:px-8 md:px-16 lg:px-32">
          <div className="flex flex-col items-center mb-8">
            <div className="mb-footer">
              <img
                src="../../../public/iste_logo-01-removebg-preview.webp"
                alt="Website Logo"
                className="h-[30vw] pb-5"
              />
            </div>
            <p className="text-3xl lg:mb-2 -mt-12 font-medium">ISTE NITH</p>
            <hr className="w-3/4 lg:w-full border-gray-600 my-4 py-4" />
            <div className="flex mb-8 space-x-4 lg:space-x-16">
              <a
                href="https://www.linkedin.com/company/iste-nith/"
                className="bg-white p-3 rounded-full"
                target="_blank"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://www.google.com/maps/place/National+Institute+of+Technology,+Hamirpur/@31.7084291,76.5247777,17z/data=!3m1!4b1!4m6!3m5!1s0x3904d5487e12c4a1:0x395f92d3a202a7d0!8m2!3d31.7084291!4d76.5273526!16zL20vMGNybnJ4?coh=219816&entry=tts&g_ep=EgoyMDI0MDgwNS4wKgBIAVAD"
                className="bg-white p-3 rounded-full"
                target="_blank"
              >
                <MapPin />
              </a>
              <a
                href="https://github.com/istenith"
                className="bg-white p-3 rounded-full"
                target="_blank"
              >
                <GithubIcon />
              </a>
              <a
                href="https://www.instagram.com/teamistenith/"
                className="bg-white p-3 rounded-full"
                target="_blank"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <p className="hidden sm:block">© 2024 All Rights Reserved</p>
            <p className="block sm:hidden text-center">
              © 2024 All Rights Reserved
            </p>

            <a
              href="mailto:iste@nith.ac.in"
              className=" mr-4 lg:mr-0 hover:underline cursor-pointer"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
