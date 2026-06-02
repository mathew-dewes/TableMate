import { businessForms } from "@/lib/types"
import EditBusinessForm from "./_components/EditBusinessForm"
import EditHoursForm from "./_components/EditHoursForm"
import EditTablesForm from "./_components/EditTablesForm"


export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}){
  const details = (await searchParams).details as businessForms
    return (
        <div>
            {details == "business" && 
            <EditBusinessForm/>
            }
            {details == "hours" && 
            <EditHoursForm/>
            }
            {details == "tables" && 
            <EditTablesForm/>
            }
            {details == "settings" && 
            <EditBusinessForm/>
            }
    
        </div>
    )
}