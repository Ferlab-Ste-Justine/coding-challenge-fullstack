package org.crstejustine.wall.user

class FindUserFromDBTest extends UnitTest with DatabaseHelper {

  "FindUserFromDB" should "return user from username" in {
    val username = "pumpkins"
    val userId = insertUser(username, "pwd", "guest")

    new FindUserFromDB().apply(Username(username)) shouldBe Right(UserRow(userId, username, "pwd", "guest"))
  }

  it should "return an error if no user is matching the username" in {
    val username = "pumpkins"
    val userId = insertUser(username, "pwd", "guest")

    new FindUserFromDB().apply(Username("another username")) shouldBe Left(NoRow)
  }
}
