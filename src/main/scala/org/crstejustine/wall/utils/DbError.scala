package org.crstejustine.wall.utils

trait DBError

case class DBException(cause: Throwable) extends DBError
case object NoRow extends DBError

