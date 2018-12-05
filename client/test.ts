function a(a: any) {
  console.log('1')
  return a
}
function b(a: any) {
  console.log('2')
  return a
}
@a
@b
class C {
  name = 1
}
const c = new C()