import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PARTY_SIZES } from "@/lib/constants";


type Props = {
    value: number | null;
    onChange: (value: number) => void;
};

export default function PartySizeSelector({
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
                        {PARTY_SIZES.map((sizes) => {
                        return <SelectItem  key={sizes.value}
              value={sizes.value.toString()}>{sizes.label}</SelectItem>
                    })}


                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

