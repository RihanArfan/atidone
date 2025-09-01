import { useValidatedBody, z } from 'h3-zod'

export default eventHandler(async (event) => {
  const { title } = await useValidatedBody(event, {
    title: z.string().min(1).max(100)
  })
  const { user } = await requireUserSession(event)

  // Insert todo for the current user
  const db = await useDB()
  const todos = await db.insert(tables.todos).values({
    userId: user.id,
    title,
    createdAt: new Date()
  }).returning()

  return todos[0]
})
