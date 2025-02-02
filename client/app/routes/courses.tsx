import { ActionFunctionArgs, json } from "@remix-run/node"
import { prisma } from "~/lib/prisma.server"
import { slugify } from "~/lib/slugify"

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    })
  }

  const data = await request.json()

  const { code, name } = data

  await prisma.course.create({
    data: { code, name, slug: slugify(`${code} ${name}`) },
  })

  return json({})
}
