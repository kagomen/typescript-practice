// ジェネリック型
const fn = <T>(val: T): T => {
  return val
}
console.log(fn<number>(10))
console.log(fn<string>("hi"))

// ユーティリティ型
type User = {
  name: string
  age: number
  address: string
}

const user1: Partial<User> = {
  name: "Miku",
  age: 20,
}

// マップ型
type ReadOnlyUser = {
  readonly [P in keyof User]: User[P]
}

const user2: ReadOnlyUser = {
  name: "Zundamon",
  age: 8,
  address: "Tohoku",
}

user1.age = 18 // 可
// user2.age = 18 // 不可

// 型ガード
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const isString = (val: any): val is string => {
  return typeof val === "string"
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const printVal = (val: any): void => {
  if (isString(val)) {
    console.log("string")
    return
  }
  console.log("not string")
}

printVal(10)
printVal("hi")

// 非同期処理
type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

const fetchTodo = async (id: string): Promise<Todo> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  return (await res.json()) as Todo
}

const printTodo = async (id: string): Promise<void> => {
  const data = await fetchTodo(id)
  console.log(data)
}

printTodo("1")

// unknown型
let unknownVal: unknown = "hello"

// unknownVal.toUpperCase() // 不可

if (typeof unknownVal === "string") {
  console.log(unknownVal.toUpperCase())
}

// never型 中断or終わらない関数の型
const throwError = (): never => {
  throw new Error("error!")
}

const loop = (): never => {
  while (true) {
    console.log("loop")
  }
}

// 不可
// const greet = (): never => {
//   console.log("hello")
// }

// 型変換
const num = 1
console.log(typeof num.toString()) // string
console.log(typeof String(num)) // string
console.log(typeof num as unknown as string) // number

// エラーハンドリング
const divide = (a: number, b: number): number | undefined => {
  try {
    if (b === 0) {
      throw new Error("0で割ることはできません")
    }
    return a / b
  } catch (e) {
    console.error(e)
  }
}

console.log(divide(10, 0))
