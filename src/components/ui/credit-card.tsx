import { cn } from "@/lib/utils";
import { CreditCard as CardIcon } from "lucide-react";

interface CreditCardProps extends React.HTMLAttributes<HTMLDivElement> {
  balance: string;
  cardHolder: string;
  validThru: string;
  cardNumber: string;
  variant?: "dark" | "light";
}

export function CreditCard({
  balance,
  cardHolder,
  validThru,
  cardNumber,
  variant = "dark",
  className,
  ...props
}: CreditCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-[20px] h-[235px] flex flex-col justify-between",
        variant === "dark"
          ? "bg-gradient-to-r from-[#5B5A6F] to-[#000000] text-white"
          : "bg-white text-[#1B2559] shadow-sm ring-1 ring-gray-100",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-6 p-6 pb-0">
        <div className="flex justify-between">
          <div>
            <p
              className={cn(
                "text-sm font-medium",
                variant === "dark" ? "text-gray-400" : "text-[#6B7280]"
              )}
            >
              Balance
            </p>
            <p className="text-2xl font-semibold">${balance}</p>
          </div>
          <CardIcon className="h-8 w-8" />
        </div>

        <div className="flex justify-between">
          <div>
            <p
              className={cn(
                "text-sm font-medium",
                variant === "dark" ? "text-gray-400" : "text-[#6B7280]"
              )}
            >
              CARD HOLDER
            </p>
            <p className="font-medium">{cardHolder}</p>
          </div>
          <div>
            <p
              className={cn(
                "text-sm font-medium",
                variant === "dark" ? "text-gray-400" : "text-[#6B7280]"
              )}
            >
              VALID THRU
            </p>
            <p className="font-medium">{validThru}</p>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex items-end justify-between py-4 px-6 bg-gradient-to-r from-[hsla(0,0%,100%,0.15)] to-[hsla(0,0%,100%,0)]",
          variant === "light" ? "border-t" : "border-[hsla(205,42%,91%,1)]"
        )}
      >
        <div className="flex items-center gap-2">
          <p className="text-lg tracking-wider">{cardNumber}</p>
        </div>
        <div className="flex -space-x-3">
          <div
            className={cn(
              "h-8 w-8 rounded-full border-2",
              variant === "dark"
                ? "border-white/30 bg-gray-400"
                : "border-gray-300 bg-gray-200"
            )}
          />
          <div
            className={cn(
              "h-8 w-8 rounded-full border-2",
              variant === "dark"
                ? "border-white/30 bg-gray-500"
                : "border-gray-300 bg-gray-300"
            )}
          />
        </div>
      </div>
    </div>
  );
}
