import React from "react";

export const Skills = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto mb-16 max-w-4xl md:auto-rows-[16rem]">
      {/* React Skill */}
      <div className="row-span-1 rounded-xl bg-card/10 group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 border border-border justify-between flex flex-col space-y-4 md:col-span-1">
        <div className="w-full flex items-center justify-center">
          <svg
            width="100%"
            height="100%"
            viewBox="-10.5 -9.45 21 18.9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24"
            style={{ transform: "rotate(347.346deg)" }}
          >
            <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="10" ry="4.5"></ellipse>
              <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
              <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
            </g>
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">React</p>
          <p className="text-sm text-muted-foreground">
            I am an "expert" in React library and I can create whatever you want
            with this.
          </p>
        </div>
      </div>

      {/* TypeScript Skill */}
      <div className="row-span-1 rounded-xl bg-card/10 group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 border border-border justify-between flex flex-col space-y-4 md:col-span-1">
        <img
          src="/images/typescript-skills.png"
          className="w-full h-full object-cover"
          alt="TypeScript"
        />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">TypeScript is my 2nd language</p>
        </div>
      </div>

      {/* TailwindCSS Skill */}
      <div className="row-span-1 rounded-xl bg-card/10 group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 border border-border justify-between flex flex-col space-y-4 md:col-span-1">
        <div className="overflow-hidden w-full h-full rounded-md bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">TailwindCSS</p>
          <p className="text-sm text-muted-foreground">
            Since 2020, I started using TailwindCSS, and I think it's the best
            tool for CSS.
          </p>
        </div>
      </div>

      {/* No-Code Journey */}
      <div className="row-span-1 rounded-xl bg-card/10 group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 border border-border justify-between flex flex-col space-y-4 md:col-span-2">
        <div>
          <img
            src="/images/nocode-journey.png"
            className="w-full h-full object-cover"
            alt="No-Code Journey"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">No-Code Journey</p>
        </div>
      </div>
      <div className="row-span-1 rounded-xl bg-card/10 group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 border-border border justify-between flex flex-col space-y-4">
        {/* User & Assistant Conversation */}
        <div className="flex flex-col gap-4">
          <div className="group relative">
            <p className="text-sm font-medium leading-none flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="5"></circle>
                <path d="M20 21a8 8 0 0 0-16 0"></path>
              </svg>
              <span>User</span>
            </p>
            <p>Can you create a website?</p>
          </div>

          <div className="group relative">
            <p className="text-sm font-medium leading-none flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 8V4H8"></path>
                <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                <path d="M2 14h2"></path>
                <path d="M20 14h2"></path>
                <path d="M15 13v2"></path>
                <path d="M9 13v2"></path>
              </svg>
              <span>Assistant</span>
            </p>
            <p>Yes, just contact me.</p>
          </div>
        </div>

        {/* AI Usage Information */}
        <div className="flex flex-col gap-2">
          <svg
            stroke="currentColor"
            fill="#FFFFFF"
            strokeWidth="0"
            role="img"
            viewBox="0 0 24 24"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"></path>
          </svg>
          <p className="text-lg font-semibold">Perfect usage of AI</p>
          <p className="text-sm text-muted-foreground">
            <span className="text-sm">
              I have created several applications using AI tools.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
