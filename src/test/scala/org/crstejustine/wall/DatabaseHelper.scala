package org.crstejustine.wall

import java.sql.Statement.RETURN_GENERATED_KEYS

trait DatabaseHelper extends BeforeAndAfterAll with BeforeAndAfterEach { this: Suite =>

  implicit val db: Database = Databases.inMemory(
    name = "default",
    urlOptions = Map(
      "MODE" -> "MYSQL"
    ),
    config = Map(
      "logStatements" -> true
    )
  )

  override def beforeEach() {
    cleanUpDB()
    Evolutions.applyEvolutions(db)
  }

  override def afterAll(): Unit = {
    db.shutdown()
  }

  def cleanUpDB(): Unit = {
    db.withConnection { _.createStatement().execute("DROP ALL OBJECTS") }
  }

  def insertUser(username: String, password: String, role: String, message: Option[String] = None): Long = {
    db.withConnection { conn =>
      val statement = conn.prepareStatement("INSERT INTO wall_user(username, password, role, message) VALUES (?, ?, ?, ?)", RETURN_GENERATED_KEYS)
      statement.setString(1, username)
      statement.setString(2, password)
      statement.setString(3, role)
      statement.setString(4, message.orNull)
      statement.execute()
      val generatedKeys = statement.getGeneratedKeys
      generatedKeys.next()
      generatedKeys.getLong(1)
    }
  }

  def getUser(userId: Long): TestUserRow = {
    db.withConnection { conn =>
      val query = "SELECT id, username, role, message FROM wall_user WHERE id = ?"
      val statement = conn.prepareStatement(query)
      statement.setLong(1, userId)
      val rs = statement.executeQuery()
      rs.next()
      TestUserRow(
        rs.getLong("id"),
        rs.getString("username"),
        rs.getString("role"),
        rs.getString("message")
      )
    }
  }

  case class TestUserRow(userId: Long, username: String, role: String, message: String)

}