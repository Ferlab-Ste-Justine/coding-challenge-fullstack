package org.crstejustine.wall.authentication

case class User(id: Long, username: Username, role: Role, message: Option[Message] = None)

sealed class Role (val name: String)

case object Guest extends Role("guest")
case object Member extends Role("member")

case class Username(value: String) extends AnyVal
case class Password(value: String) extends AnyVal
case class Token(value: String) extends AnyVal
case class Message(value: String) extends AnyVal



