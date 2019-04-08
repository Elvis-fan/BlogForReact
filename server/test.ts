function foo(a: number) {
  return a + 1
}
foo.bar = 123
const a = (foo: (a: number) => number) => {
  console.log(foo)
}
a(foo)
class Q {

}
function aa(date: any): date is Q {
  return false
}
