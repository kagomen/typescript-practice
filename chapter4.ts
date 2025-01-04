{
  interface FruitStock {
    [fruitName: string]: number;
  }

  const stock: FruitStock = {};

  stock.apple = 10;
  stock.banana = 20;
  stock.orange = 30;

  console.log(stock);

  interface Ranking {
    1: "strawberry";
    [rank: number]: string;
  }

  const ranking: Ranking = {
    1: "strawberry",
    2: "apple",
    3: "banana",
    4: "orange",
  };

  console.log(ranking);

  const ranking2: Ranking = {
    1: "strawberry",
  };

  ranking2[2] = "apple";
  ranking2[3] = "banana";
  ranking2["4"] = "orange";

  console.log(ranking2);

  interface Product {
    [key: `product_${number}`]: string;
  }
  const product: Product = {
    product_1: "apple",
    product_22093048: "banana",
  };
}
{
  type Fn = (a: number, b: number) => number;

  const add: Fn = (a, b) => a + b;

  console.log(add(1, 2));

  interface Fn2 {
    (a: number, b: number): number;
  }

  const add2: Fn2 = (a, b) => a + b;

  console.log(add2(1, 2));
}
{
  interface Vehicle {
    speed: number | string;
  }

  interface Car extends Vehicle {
    speed: number; // オーバーライド 逆は不可
    color: string;
    wheels: number;
  }

  const car: Car = {
    speed: 100,
    color: "red",
    wheels: 4,
  };
}
{
  interface Born {
    year: number;
    month: number;
    day: number;
  }

  interface Hobby {
    hobbies: string[];
  }

  interface Person extends Born, Hobby {
    name: string;
  }

  const john: Person = {
    name: "John",
    year: 1990,
    month: 1,
    day: 1,
    hobbies: ["music", "sports"],
  };
}
{
  interface Car {
    speed: number;
  }

  interface Car {
    // インターフェースのマージ
    color: string;
  }

  const car: Car = {
    speed: 100,
    color: "red",
  };
}
{
  class Person {
    name: string;
    readonly age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    greet(): void {
      console.log(`hello ${this.name}`);
    }
  }

  const john = new Person("John", 20);
  john.name = "John Doe";
  // john.age = 30; // 不可
  console.log(john.greet());

  let john2 = {};
  // john2.name = "John" ; // JSでは可、TSでは不可
}

{
  class Person {
    constructor(name: string) {
      console.log(`hi ${name}`);
    }
  }

  const john = new Person("John");

  class Person2 extends Person {
    constructor(name: string, age: number) {
      super(name); // constructorのオーバーライド
      console.log(`hi ${name}(${age})`);
    }
  }

  const john2 = new Person2("John", 20);
}

{
  class Person {
    private name: string;
    constructor(name: string) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
  }

  const john = new Person("John");
  // console.log(john.name); // 不可
  console.log(john.getName());
}
{
  class Person {
    protected name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  class Person2 extends Person {
    constructor(name: string) {
      super(name);
    }
    greet() {
      console.log(`Protected ${this.name}`); // privateはサブクラスで使用不可、protectedはサブクラスで使用可
    }
  }

  const kagome = new Person2("Kagome");
  kagome.greet();
}

{
  class Person {
    constructor(public name: string, public age: number) {} // アクセス修飾子をつけることでメンバー変数の宣言が省略可能
    introduce() {
      console.log(`I'm ${this.name} and ${this.age} years old.`);
    }
  }

  console.log(new Person("John", 20).introduce());
}

{
  class Circle {
    constructor(private _radius: number) {}

    get radius(): number {
      console.log("get radius!");
      return this._radius;
    }

    set radius(value: number) {
      if (value <= 0) {
        throw new Error("不正な値です");
      }
      console.log("set radius!");
      this._radius = value;
    }
  }

  const circle = new Circle(3);

  console.log(circle.radius); // ゲッターの実行
  circle.radius = 2; // セッターの実行

  console.log(circle.radius);

  // circle.radius = -1; // エラーがスローされる
}

{
  class Circle {
    static PI = 3.14;
    constructor(public radius: number) {}

    get area() {
      console.log("面積を取得します...");
      return Circle.PI * this.radius * this.radius;
    }
  }

  const circle = new Circle(2);
  console.log(circle.area);
}

{
  abstract class Animal {
    abstract sound(): void;
    move(): void {
      console.log("the animal is moving");
    }
  }

  class Dog extends Animal {
    sound() {
      console.log("Bow! Bow!");
    }
  }

  const dog = new Dog();
  dog.move();
  dog.sound();
}

{
  interface Shape {
    get area(): number;
  }

  class Circle implements Shape {
    // extendsはclassを継承する時にしか使用できない
    // interfaceを継承する際はimplementsを使う
    static PI = 3.14;
    constructor(public radius: number) {}
    get area() {
      return Circle.PI * this.radius * this.radius;
    }
  }

  const circle = new Circle(2);
  console.log(circle.area);
}
