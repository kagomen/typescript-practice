{
  let guestName = "kagome";

  function greet(name: string) {
    console.log(`hello ${name}`);
  }

  greet(guestName.toUpperCase());

  ///////////////////////

  let age: number;
  const adultAge = 18;
  age = adultAge;

  ///////////////////////

  let themeColor: "light" | "dark" = "light";

  themeColor = "dark";

  ///////////////////////

  type ThemeColor = "light" | "dark";
  let themeColor2: ThemeColor = "light";

  ///////////////////////

  type Animal = Cat | Dog;

  type Cat = "mike" | "dora";
  type Dog = "shiba" | "bulldog";

  let animal: Animal = "mike";

  ///////////////////////

  type Book = {
    title: string;
    author: string;
    published: number;
  };

  const book1: Book = {
    title: "kokoro",
    author: "Soseki Natsume",
    published: 1914,
  };

  ///////////////////////

  type Person = {
    name: string;
    age?: number;
  };

  const kagome: Person = {
    name: "kagome", // ageは省略可能
  };

  console.log(kagome.age); // undefined

  type Person2 = {
    name: string;
    age: number | undefined;
  };

  const kagome2: Person2 = {
    name: "kagome",
    age: undefined, // ageは省略不可
  };

  ///////////////////////

  type Pet = {
    readonly name: string;
    age: number;
  };

  const uri: Pet = {
    name: "uri",
    age: 2,
  };

  // uri.name = "uri2"; // 不可
  uri.age = 3; // 可

  console.log("uri's age", uri.age);

  ///////////////////////

  const nums = [1, 2, 3, "four"]; // (string | number)[]

  const stringNums = ["one", "two", "three", "four"];

  // console.log(nums[3].toUpperCase()); // 不可

  console.log(stringNums[3].toUpperCase()); // 可

  ///////////////////////

  let val: unknown = 1;

  // console.log(val * 2); // 不可

  if (typeof val === "number") {
    console.log(val * 2);
  }

  // unknown型はany型より安全

  ///////////////////////

  const person = {
    age: 25,
    firstName: Math.random() < 0.5 ? "Bob" : undefined,
  };

  // console.log(person.firstName.toUpperCase());  // 不可
  console.log(person.firstName?.toUpperCase()); // BOB or undefined

  ///////////////////////

  // パラメータや戻り値の型を推論できない場合、any型になる
  // strictオプションを有効にする場合、any型はエラーになる

  function add(a: number, b: number) {
    return a + b;
  }

  console.log(add(1, 2));

  function add2(a: number, b: number) {
    return a.toString() + b.toString();
  }

  console.log(add2(1, 2));

  // function add3(a: number, b: number): number {
  //   return a.toString() + b.toString(); // エラー
  // }

  // 戻り値にも型定義しておくとこのようなケースも未然に防げる

  ///////////////////////

  function greet2(name?: string) {
    if (name) {
      console.log(`hello ${name}`);
      return;
    }
    console.log("hello guest");
  }

  greet2("kagome");
  greet2();

  ///////////////////////

  type Func = (a: number, b: number) => number;

  const sampleFunc: Func = (a, b) => a + b;

  console.log(sampleFunc(1, 2));

  ///////////////////////

  type VoidFunc = () => void;

  const sampleVoidFunc: VoidFunc = () => {
    console.log("hello void");
  };

  sampleVoidFunc();

  const sampleVoidFunc2: VoidFunc = () => {
    return "hello void 2";
  };

  sampleVoidFunc2();

  ///////////////////////

  // never型は、戻り値を返さない且つ呼び出し元に制御を戻さない関数を表す

  // function throwError(): never {
  //   throw new Error("エラーが発生しました");
  // }

  // throwError();

  // function loop(): never {
  //   while (true) {
  //     console.log("loop");
  //   }
  // }

  ///////////////////////

  function addNums(a: number | string, b: number | string) {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
    return a.toString() + b.toString();
  }

  const result = addNums("1", 2);

  // result.includes("1");  // 不可
  // resultをnumber|stringとして型推論しているため、string型専用のincludesメソッドが使えない

  // 関数オーバーロードで解決
  function addNums2(a: number, b: number): number;
  function addNums2(a: string, b: string): string;
  function addNums2(a: string, b: number): string;
  function addNums2(a: number, b: string): string;

  function addNums2(a: number | string, b: number | string) {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
    return a.toString() + b.toString();
  }

  const result2 = addNums2("1", 2);
  result2.includes("1");
}
