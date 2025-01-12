import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InputButtonGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  buttonIcon?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function InputButtonGroup({
  className,
  buttonIcon,
  buttonText,
  onButtonClick,
  ...props
}: InputButtonGroupProps) {
  return (
    <div className="relative w-full">
      <Input className={cn("pr-[100px]", className)} {...props} />
      <div className="absolute inset-y-[2px] right-[2px]">
        <Button
          onClick={onButtonClick}
          className="h-[calc(100%-0px)] rounded-full bg-[#111827] px-6 text-base hover:bg-[#111827]/90"
        >
          {buttonText}
          {buttonIcon && <span className="ml-2">{buttonIcon}</span>}
        </Button>
      </div>
    </div>
  );
}
