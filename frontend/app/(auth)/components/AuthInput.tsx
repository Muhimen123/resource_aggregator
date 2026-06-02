"use client";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputLabel: string;
}

export function AuthInput({ inputLabel, type = "text", value, onChange, ...rest }: AuthInputProps) {
  return (
    <div className="flex flex-col gap-1 w-72">
      {/* Label styled with your RPG theme typography */}
      <label className="text-beige text-sm font-mono tracking-wider ml-1">
        {inputLabel}
      </label>
      
      <input
        type={type}
        value={value}
        onChange={onChange}
        {...rest} // Spreads any extra properties like placeholder, required, or disabled automatically
        className="w-full bg-slate-950/40 border border-amber-700/50 rounded-md px-3 py-2 text-beige focus:outline-none focus:border-amber-500 transition font-sans text-base backdrop-blur-sm shadow-inner"
      />
    </div>
  );
}