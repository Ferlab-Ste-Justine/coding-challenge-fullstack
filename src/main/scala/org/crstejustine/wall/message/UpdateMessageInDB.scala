package org.crstejustine.wall.message

import org.crstejustine.wall.authentication.Message
import org.crstejustine.wall.utils.{DBError, NoRow}
import play.api.db.Database

class UpdateMessageInDB(implicit db: Database) extends ((Long, Message) => Either[DBError, Unit]) {

  override def apply(userId: Long, message: Message): Either[DBError, Unit] = db.withConnection { conn =>
    val query = "UPDATE wall_user SET message = ? WHERE id = ?"
    val statement = conn.prepareStatement(query)
    statement.setString(1, message.value)
    statement.setLong(2, userId)
    val nb = statement.executeUpdate()
    if (nb > 0) Right((): Unit) else Left(NoRow)
  }
}
