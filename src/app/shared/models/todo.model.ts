export type ManyTodoResponse = {
  "todos": SingleTodoResponse[],
  "total": number,
  "skip": number,
  "limit": number
}

export type SingleTodoResponse = {
  "id": number,
  "todo": string,
  "completed": boolean,
  "userId": number
}
