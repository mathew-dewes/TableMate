import { Badge } from "@/components/ui/badge";
import { days } from "@/lib/utils";


type Props = {
    businessHours:{
 day_of_week: string,
    closing_time: string,
    opening_time: string
    }[]
   
}

export default function TodaysWorkingHours({businessHours}: Props){

    
    return (
            <div className="mt-5">
                    <Badge variant="default">Open</Badge>

                    <div className="mt-3">
                    <h2 className="font-semibold">Work hours:</h2>
                              <div className=" space-y-2 grid grid-cols-2 mt-2">
                            {businessHours.map((day, index)=>{
                        const dayString = days[Number(day.day_of_week)].label    
                        return <div key={index}>
                            <p>{dayString} {day.opening_time.slice(0, 5)} - {day.closing_time.slice(0, 5)}</p>
                            </div>
                    })}
                    </div>

                    </div>
                 
              
                    </div>
    )
}