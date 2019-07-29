package org.crstejustine.wall.authentication

import java.time.Clock

import play.api.db.Database

class AuthenticateUserByCredential(validateUser: (Username, Password) => Either[AuthenticationError,User],
                                   generateToken: User => Token) extends ((Username, Password) => Either[AuthenticationError, (User, Token)]){
  override def apply(username: Username, pwd: Password): Either[AuthenticationError, (User, Token)] =
    validateUser(username, pwd).map(user => (user, generateToken(user)))
}

object AuthenticateUserByCredential {
  def apply(config: TokenConfig)(implicit db: Database, clock: Clock): AuthenticateUserByCredential = {
    new AuthenticateUserByCredential(ValidateUser(), GenerateToken(config))
  }
}
