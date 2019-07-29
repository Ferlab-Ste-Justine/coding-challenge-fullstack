package org.crstejustine.wall.message

import org.crstejustine.wall.authentication.Message
import org.crstejustine.wall.{DatabaseHelper, UnitTest}

class UpdateMessageInDBTest extends UnitTest with DatabaseHelper {
  "UpdateMessageInDB" should "update user message" in {
    val message = "initial message"
    val userId = insertUser("test", "pwd", "member", Some("initial message"))

    new UpdateMessageInDB().apply(userId, Message("new message")) shouldBe Right(())
    getUser(userId).message shouldBe "new message"
  }
}
