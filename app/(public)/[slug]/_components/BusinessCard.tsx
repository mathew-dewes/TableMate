import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Business } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"

export function BusinessCard({name, email, phone, description}: Business) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <Image
        width={120} height={120}
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge className="bg-green-400">OPEN</Badge>
        </CardAction>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
   <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        </div>
        <div className="mt-2">
            <p>Work hours:</p>
            <div>
  <p>Mon - Fri: 07:00am - 05:00pm</p>
  <p>Sat - Sun: Closed</p>
            </div>
          
        </div>

        <div className="flex gap-2 items-center mt-3">
            <p>Capacity:</p>
            <div className="size-3 bg-green-300 rounded-full"/>
            <div className="size-3 bg-green-300 rounded-full"/>
            <div className="size-3 bg-gray-300 rounded-full"/>
            <div className="size-3 bg-gray-300 rounded-full"/>
            <div className="size-3 bg-gray-300 rounded-full"/>
        </div>
      </CardContent>
      <CardFooter>
        <Link className={buttonVariants({className: "w-full"})} href={'/fff/book'}>Book Table</Link>

      </CardFooter>
    </Card>
  )
}
