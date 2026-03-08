import { getBusinessBySlug } from "@/lib/db/queries/business"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {


  const { slug } = await params;

  const business = await getBusinessBySlug(slug)

  if (!business.success) {
    return Response.json(business, { status: 404 })
  }

  return Response.json(business)
}