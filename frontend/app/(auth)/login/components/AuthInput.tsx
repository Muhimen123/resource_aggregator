// "use client";

// import { useState } from "react";

// export function AuthInput({inputLabel} : {inputLabel: string}) {
//   const [inputValue, setInputValue] = useState("");

//   return (
//     <div className="flex flex-col gap-1">
//       <p className="m-0 p-0 text-beige text-stroke-green">{inputLabel}</p>
//       <InputField value={inputValue} onChange={setInputValue} />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";

type AuthInputProps = {
  inputLabel: string;
  type?: "text" | "password" | "email";
};

export function AuthInput({
  inputLabel,
  type = "text",
}: AuthInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1">
      <p className="m-0 p-0 text-beige text-stroke-green">
        {inputLabel}
      </p>

      <div className="relative w-full">
        <InputField
          value={inputValue}
          onChange={setInputValue}
          type={isPassword && !isVisible ? "password" : "text"}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setIsVisible((prev) => !prev)}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-[999] cursor-pointer"
          >
            <Image
              src={
                isVisible
                  ? "/assets/eye_open.png"
                  : "/assets/eye_closed.png"
              }
              alt="toggle visibility"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
    </div>
  );
}
interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  type: string;
}

function InputField({ value, onChange, type }: InputFieldProps) {
  return (
    <div
      className="relative inline-block p-1.25 w-full"
      style={{
        background: "#4F3310",
        clipPath: `polygon(
          10px 0%,
          calc(100% - 10px) 0%,
          100% 10px,
          100% calc(100% - 10px),
          calc(100% - 10px) 100%,
          10px 100%,
          0% calc(100% - 10px),
          0% 10px
        )`,
      }}
    >
      <div
        className="absolute inset-0.5 pointer-events-none"
        style={{
          background: "#8a6a3a",
          clipPath: `polygon(
            8px 0%,
            calc(100% - 8px) 0%,
            100% 8px,
            100% calc(100% - 8px),
            calc(100% - 8px) 100%,
            8px 100%,
            0% calc(100% - 8px),
            0% 8px
          )`,
        }}
      />

      <div
        className="absolute inset-1.5 pointer-events-none"
        style={{
          border: "2px solid #a08040",
          clipPath: `polygon(
            6px 0%,
            calc(100% - 6px) 0%,
            100% 6px,
            100% calc(100% - 6px),
            calc(100% - 6px) 100%,
            6px 100%,
            0% calc(100% - 6px),
            0% 6px
          )`,
        }}
      />

      <div
        className="absolute inset-1.25 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle,#6b8c2a 2px,transparent 2px) 0 0 / 10px 10px no-repeat,
            radial-gradient(circle,#6b8c2a 2px,transparent 2px) 100% 0 / 10px 10px no-repeat,
            radial-gradient(circle,#6b8c2a 2px,transparent 2px) 0 100% / 10px 10px no-repeat,
            radial-gradient(circle,#6b8c2a 2px,transparent 2px) 100% 100% / 10px 10px no-repeat
          `,
        }}
      />

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="relative z-10 w-full border-none bg-beige font-bold text-base outline-none pointer-events-auto"
        style={{
          letterSpacing: "0.05em",
          padding: "12px 14px",
          clipPath: `polygon(
            14px 0%,
            calc(100% - 14px) 0%,
            100% 14px,
            100% calc(100% - 14px),
            calc(100% - 14px) 100%,
            14px 100%,
            0% calc(100% - 14px),
            0% 14px
          )`,
        }}
      />
    </div>
  );
}