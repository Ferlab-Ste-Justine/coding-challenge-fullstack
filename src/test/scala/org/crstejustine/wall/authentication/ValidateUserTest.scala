package org.crstejustine.wall.authentication

class ValidateUserTest extends UnitTest {
  private val findUserFromDB:Username => Either[DBError, UserRow] = username => Right(UserRow(1, username.value, "pwd", Member.name))
  private val hashPassword = (pwd:String) => s"hashed $pwd"
  private def validationUser(findUser: Username => Either[DBError, UserRow] = findUserFromDB) = new ValidateUser(findUser, hashPassword)
  private val username = Username("pumpkins")

  "Validate user" should "validate user hashed password from database and return user" in {
    val username = Username("pumpkins")
    val pwd = "secret"
    val findUserFromDB:Username => Either[DBError, UserRow] = username => Right(UserRow(1, username.value, hashPassword(pwd), Member.name))
    validationUser(findUserFromDB)(username, Password(pwd)) shouldBe Right(User(1, username, Member))
  }

  it should "return an error if passwords doesn't match" in {
    val pwd = "secret"
    val userWithAnotherPassword:Username => Either[DBError, UserRow] = username => Right(UserRow(1, username.value, "notsecret", Member.name))
    validationUser(userWithAnotherPassword)(username, Password(pwd)) shouldBe Left(WrongPassword)
  }

  it should "return an error if there is no user in database for the username" in {
    val noUser:Username => Either[DBError, UserRow] = _ => Left(NoRow)

    validationUser(noUser)(username, Password("pwd")) shouldBe Left(UnknownUser)
  }

  it should "return an error if there is no corresponding role" in {
    val pwd = "secret"
    val unknownRole:Username => Either[DBError, UserRow] = username => Right(UserRow(1, username.value, hashPassword(pwd), "unknown"))

    validationUser(unknownRole)(username, Password(pwd)) shouldBe Left(UnknownRole)
  }


}
