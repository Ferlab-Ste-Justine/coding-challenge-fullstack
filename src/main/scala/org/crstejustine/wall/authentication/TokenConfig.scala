package org.crstejustine.wall.authentication

case class TokenConfig(tokenExpiration: Long, secretKey: String, algorithm: JwtHmacAlgorithm)
