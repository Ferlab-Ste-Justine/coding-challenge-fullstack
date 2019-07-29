package org.crstejustine.wall.authentication

class AuthenticateUserByCredentialTest extends UnitTest {
  private val validateUser = (username: Username, _: Password) => Right(User(1, username, Member))
  private val generateToken = (user: User) => Token(s"Token for ${user.username.value}")

  "Authenticate User" should "validate user and generate token" in {
    val authenticateUser = new AuthenticateUserByCredential(validateUser, generateToken)
    authenticateUser(Username("Pumpkin"), Password("pwd")) shouldBe Right(User(1, Username("Pumpkin"), Member) -> Token("Token for Pumpkin"))
  }

  it should "return an authentication error if validation has failed" in {
    val userInvalid = (_:Username,_:Password) => Left(UnknownUser)
    val authenticateUser = new AuthenticateUserByCredential(userInvalid, generateToken)
    authenticateUser(Username("Pumpkin"), Password("pwd")) shouldBe Left(UnknownUser)
  }
}
