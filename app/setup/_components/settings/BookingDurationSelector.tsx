import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BOOKING_DURATIONS } from "@/lib/constants";


type Props = {
    value: number | null;
    onChange: (value: number) => void;
};

export default function BookingSelector({
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
                    <SelectLabel>Minutes</SelectLabel>
                        {BOOKING_DURATIONS.map((duration) => {
                        return <SelectItem  key={duration.value}
              value={duration.value.toString()}>{duration.label}</SelectItem>
                    })}


                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

