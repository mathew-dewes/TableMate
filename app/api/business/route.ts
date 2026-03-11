import { getAllBusinesses } from "@/lib/db/queries/business"

export async function GET() {

  const business = await getAllBusinesses()

  if (business.error) {
    return Response.json(business, { status: 404 })
  }

  return Response.json(business)
}