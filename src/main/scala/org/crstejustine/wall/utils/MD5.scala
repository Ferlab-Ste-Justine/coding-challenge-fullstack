package org.crstejustine.wall.utils

import java.security.MessageDigest

object MD5 {
  def apply(s: String): String = {
    val m = MessageDigest.getInstance("MD5")
    val b = s.getBytes("UTF-8")
    m.digest(b).map(0xFF & _).map { "%02x".format(_) }.foldLeft("") {_ + _} toUpperCase
  }
}
