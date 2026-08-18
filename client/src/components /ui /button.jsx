import clsx from "clsx";

const variants = {
  default: "bg-brand-purple text-white hover:bg-brand-purple/90",
  outline: "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50",
  ghost: "text-gray-700 hover:bg-gray-100",
  success: "bg-emerald-500 text-white hover:bg-emerald-600",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

export function Button({ className, variant = "default", ...props }) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
