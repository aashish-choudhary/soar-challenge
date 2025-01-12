import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Send } from "lucide-react";
import { InputButtonGroup } from "@/components/ui/input-button-group";
import { Card } from "@/components/ui/card";
import { useGetContactsQuery } from "@/lib/store/services/api";

interface QuickTransferProps extends React.HTMLAttributes<HTMLDivElement> {}

export function QuickTransfer({ className, ...props }: QuickTransferProps) {
  const [amount, setAmount] = useState("");
  const { data: contacts } = useGetContactsQuery();
  const contactsContainerRef = useRef<HTMLDivElement>(null);

  const scrollContacts = () => {
    if (contactsContainerRef.current) {
      contactsContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("", className)} {...props}>
      <h2 className="text-xl font-semibold text-[#1A1D1F]">Quick Transfer</h2>

      <Card className="mt-4 h-[276px] md:mt-6">
        <div className="relative flex items-center">
          <div
            ref={contactsContainerRef}
            className="flex space-x-4 overflow-hidden scrollbar-hide md:space-x-8"
          >
            {contacts?.map((contact) => (
              <div key={contact.id} className="text-center flex-shrink-0">
                <div className="relative mb-2 md:mb-3">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-[#1A1D1F]">
                  {contact.name}
                </h3>
                <p className="text-sm text-[#6B7280] md:text-base">
                  {contact.role}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={scrollContacts}
            className="absolute -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg md:-right-4 md:h-12 md:w-12"
          >
            <ChevronRight className="h-4 w-4 text-[#6B7280] md:h-6 md:w-6" />
          </button>
        </div>

        <div className="mt-8 flex items-center gap-4 md:mt-12 md:gap-6">
          <span className="text-base text-lg text-nowrap text-[#A3AED0]">
            Write Amount
          </span>
          <InputButtonGroup
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="525.50"
            className="h-12 flex-1 rounded-full bg-[#F4F7FE] text-base font-medium placeholder:text-[#A3AED0] md:h-14 md:text-lg"
            buttonText="Send"
            buttonIcon={<Send className="h-4 w-4 md:h-5 md:w-5" />}
            onButtonClick={() => {}}
          />
        </div>
      </Card>
    </div>
  );
}
