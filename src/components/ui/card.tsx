import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-[20px] bg-white p-4 shadow-sm md:p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}
