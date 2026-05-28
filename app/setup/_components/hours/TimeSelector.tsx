import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { generateTimeOptions } from "@/lib/utils";

type Props = {
    type: "Open" | "Close";
    value: number | null;
    onChange: (value: number) => void;
    disabled?: boolean;
};

export default function TimeSelector({
    type,
    value,
    onChange,
    disabled
}: Props) {

    const timeOptions = generateTimeOptions()
    return (
        <Select value={value?.toString()}
            onValueChange={(value) =>
                onChange(Number(value))
            }
            disabled={disabled}>
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder={type + " time"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{type} time</SelectLabel>
                    {timeOptions.map((time) => {
                        return <SelectItem  key={time.value}
              value={time.value.toString()}>{time.label}</SelectItem>
                    })}

                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

