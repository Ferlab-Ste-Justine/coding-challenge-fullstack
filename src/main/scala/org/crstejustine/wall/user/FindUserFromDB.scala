package org.crstejustine.wall.user

import org.crstejustine.wall.authentication.Username
import org.crstejustine.wall.utils.{DBError, NoRow}
import play.api.db.Database

class FindUserFromDB(implicit db: Database) extends (Username => Either[DBError, UserRow]) {
  override def apply(username: Username): Either[DBError, UserRow] = db.withConnection { conn =>
    val query = "SELECT id, username, password, role FROM wall_user WHERE username = ?"
    val statement = conn.prepareStatement(query)
    statement.setString(1, username.value)
    val rs = statement.executeQuery()
    if(rs.next()) {
      Right(UserRow(
        rs.getLong("id"),
        rs.getString("username"),
        rs.getString("password"),
        rs.getString("role")
      ))
    } else Left(NoRow)
  }
}

case class UserRow(id: Long, username: String, password: String, role: String)
