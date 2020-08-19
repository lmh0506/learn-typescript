// 默认从0开始自增
enum Status {
  OFFLINE,
  ONLINE,
  DELETED
}

console.log(Status, Status[0], Status.OFFLINE)

enum Odd {
  ONE = 1,
  THREE = 3,
  FIVE = 5
}

console.log(Odd, Odd[1], Odd.ONE)