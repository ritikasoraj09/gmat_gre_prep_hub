import clsx from "clsx";

export function Card({ className, ...props }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-gray-200 bg-white shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={clsx("p-5 border-b border-gray-100", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={clsx("text-lg font-semibold text-gray-900", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={clsx("p-5", className)} {...props} />;
}
