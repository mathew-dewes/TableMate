import {buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "@/lib/types";
import Link from "next/link";

export default function TablesReviewCard({ tables }:
    { tables: Table[] }
) {
    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Tables</CardTitle>
                <CardDescription>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, eveniet.</CardDescription>
            </CardHeader>

            <CardContent>
                <ul className="grid grid-cols-2 gap-3">
                    {tables.map((table) => {
                        return (
                            <div className="flex items-center gap-2" key={table.number}>
                                <p>Table: {table.number}: Capacity {table.min_capacity}-{table.max_capacity}</p>
                                <Link className={buttonVariants({variant: "secondary", size: "sm"})} href={'/setup/edit/tables/' + table.id}>Update</Link>
                            </div>

                        )

                    })}

                </ul>


            </CardContent>

            <CardFooter className="flex justify-end">
                <Link className={buttonVariants()} href={'/setup/edit?details=tables'}>Regenerate tables</Link>
            </CardFooter>

        </Card>
    )
}