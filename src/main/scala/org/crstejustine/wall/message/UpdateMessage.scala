package org.crstejustine.wall.message

import org.crstejustine.wall.authentication.{AuthenticationError, Message, NotAllowedAccess}
import org.crstejustine.wall.utils.DBError
import play.api.db.Database

class UpdateMessage(isMember: Long => Boolean, updateMessageInDB: (Long, Message) => Either[DBError, Unit]) extends ((Long, Message) => Either[AuthenticationError, Unit]) {
  override def apply(userId: Long, message: Message): Either[AuthenticationError, Unit] = {
    if(!isMember(userId))
      Left(NotAllowedAccess)
    else
      updateMessageInDB(userId, message)
      Right()
  }
}

object UpdateMessage {
  def apply(implicit db: Database): UpdateMessage = {
    //TODO Implement isMember
    val isMember: Long => Boolean = _ => true
    new UpdateMessage(isMember, new UpdateMessageInDB)
  }
}
