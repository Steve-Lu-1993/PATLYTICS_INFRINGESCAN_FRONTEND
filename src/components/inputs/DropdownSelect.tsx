import { Check, ChevronsDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {  useState } from "react";

type DropdownSelectType = {
  name: string;
  options: { value: string; label: string }[];
  setKeyword?: (value: string) => void;
  value: string;
  setValue: (value: string) => void;
};

export function DropdownSelect({ name, options, setKeyword,value,setValue }: DropdownSelectType) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
          size={"lg"}
        >
          {value
            ? options.find((raw) => raw.value === value)?.label
            : `Select ${name}...`}
          <ChevronsDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          {setKeyword ? (
            <CommandInput placeholder={`Search ${name}...`} className="h-9" onChangeCapture={(e) => setKeyword(e.currentTarget.value)} />
          ) : (
            <CommandInput placeholder={`Search ${name}...`} className="h-9" />
          )}
          <CommandList>
            <CommandEmpty>No {name} found.</CommandEmpty>
            <CommandGroup>
              {options.map((raw) => (
                <CommandItem
                  key={raw.value}
                  value={raw.value}
                  keywords={[raw.label]}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {raw.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === raw.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
