const { Observable, async} = require("rxjs");
const { filter} = require("rxjs/operators");

//manera de hacer promesas con js vanilla
const doSomething = () => {
  return new Promise((resolve) => {
    // resolve("valor 1");
    // resolve("valor 2");
    setTimeout(() => {
      resolve("valor 3");
    }, 3000)
  });
}

//manera de hacer promesas con angular
const doSomething$ = () => {
  return new Observable(observer => {
    observer.next("valor 1 $");
    observer.next("valor 2 $");
    observer.next("valor 3 $");
    observer.next("valor 4 $");
    observer.next(null);
    setTimeout(() => {
      observer.next("valor 5 $");
    }, 5000)
    setTimeout(() => {
      observer.next(null);
    }, 7000)
    setTimeout(() => {
      observer.next("valor 7 $");
    }, 10000)
  })
}

//vanilla
(async() => {
  const rta = await doSomething();
  console.log(rta);
})();

//observable
(() => {
  const obs$ = doSomething$();
  obs$
  .pipe(
    filter(value => value !== null)
  )
  .subscribe(rta => {
    console.log(rta)
  })
}) ();
