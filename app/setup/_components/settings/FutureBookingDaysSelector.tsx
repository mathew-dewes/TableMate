import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FUTURE_BOOKING_WINDOW } from "@/lib/constants";


type Props = {
    value: number | null;
    onChange: (value: number) => void;
};

export default function FutureBookingDaysSelector({
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
                    <SelectLabel>People</SelectLabel>
                        {FUTURE_BOOKING_WINDOW.map((days) => {
                        return <SelectItem  key={days.value}
              value={days.value.toString()}>{days.label}</SelectItem>
                    })}


                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

