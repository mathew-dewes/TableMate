import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


type Props = {
    type: "Min" | "Max";
    value: number | null;
    onChange: (value: number) => void;
    disabled?: boolean;
};

export default function CapacitySelector({
    type,
    value,
    onChange,
    disabled
}: Props) {

    return (
        <Select value={value?.toString()}
            onValueChange={(value) =>
                onChange(Number(value))
            }
            disabled={disabled}>
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder={type + " capacity"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{type} capacity</SelectLabel>
                    {[1, 2, 3, 4, 5, 6].map((time) => {
                        return <SelectItem  key={time}
              value={time.toString()}>{time}</SelectItem>
                    })}

                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

