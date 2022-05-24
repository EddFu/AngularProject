//se debe agregar el tipado para que ts sepa de que tipo es la variable

const username: string | number = "EddFuu";

const sum = (a: number,b:number) => {
  return a + b;
}

sum(1 , 2);

//orientado a objetos

class Person {
  //private antes de la propiedad para que no se pueda acceder y modificarse
  age: number;
  lastName: string;

  constructor(age: number, lastName:string) {
    this.age = age;
    this.lastName = lastName;
  }
}

const eduardo = new Person(15, "Fuentes");

eduardo.age;

//se puede declarar de esta manera de igual forma

class Person2 {
  //private antes de la propiedad para que no se pueda acceder y modificarse
  // age: number;
  // lastName: string;

  constructor(public age: number, public lastName:string) {  }
}

const eduardo2 = new Person2(16, "Fuentes");

eduardo2.age;
