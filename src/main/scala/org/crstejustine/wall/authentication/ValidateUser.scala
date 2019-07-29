package org.crstejustine.wall.authentication

class ValidateUser(
                    findUserFromDB: Username => Either[DBError, UserRow],
                    hashPassword: String => String
                  ) extends ((Username, Password) => Either[AuthenticationError, User]){
  override def apply(username: Username, password: Password): Either[AuthenticationError, User] = {
    findUserFromDB(username) match {
      case Left(_:NoRow.type ) => Left(UnknownUser)
      case Right(user) if !validatePassword(user.password, password.value) => Left(WrongPassword)
      case Right(user) => GetRole(user.role).map(role => Right(User(user.id, Username(user.username), role))).getOrElse(Left(UnknownRole))
    }
  }

  private def validatePassword(userPassword: String, submission: String): Boolean = {
    userPassword equals hashPassword(submission)
  }

  private def GetRole(name: String): Option[Role] = name match {
    case "member" => Some(Member)
    case "guest" => Some(Guest)
    case _ => None
  }
}

object ValidateUser {
  def apply()(implicit db: Database): ValidateUser = {
    new ValidateUser(new FindUserFromDB, MD5.apply)
  }
}
