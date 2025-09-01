import { useValidatedParams, zh } from 'h3-zod'

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString
  })
  const { user } = await requireUserSession(event)

  // Delete todo for the current user
  const db = await useDB()
  const deletedTodos = await db.delete(tables.todos).where(and(
    eq(tables.todos.id, id),
    eq(tables.todos.userId, user.id)
  )).returning()

  const deletedTodo = deletedTodos[0]
  if (!deletedTodo) {
    throw createError({
      statusCode: 404,
      message: 'Todo not found'
    })
  }
  return deletedTodo
})
