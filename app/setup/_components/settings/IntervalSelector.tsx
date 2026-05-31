import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SLOT_INTERVALS } from "@/lib/constants";


type Props = {
    value: number | null;
    onChange: (value: number) => void;
};

export default function IntervalSelector({
    value,
    onChange,
}: Props) {

    return (
        <Select value={value?.toString()}
            onValueChange={(value) =>
                onChange(Number(value))
            }
  >
            <SelectTrigger className="w-full max-w-48">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>time</SelectLabel>
                    {SLOT_INTERVALS.map((slot) => {
                        return <SelectItem  key={slot.value}
              value={slot.value.toString()}>{slot.label}</SelectItem>
                    })}

                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

