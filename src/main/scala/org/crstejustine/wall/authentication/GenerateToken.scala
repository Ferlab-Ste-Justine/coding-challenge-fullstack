package org.crstejustine.wall.authentication

import java.time.Clock

import pdi.jwt.{Jwt, JwtClaim}

class GenerateToken(config: TokenConfig)(implicit clock: Clock) extends (User => Token) {
  override def apply(user: User): Token = {
    val claims = JwtClaim({s"""{"user":${user.id}}"""})

    Token(Jwt.encode(claims.expiresIn(config.tokenExpiration), config.secretKey, config.algorithm))
  }
}

object GenerateToken {
  def apply(config: TokenConfig)(implicit clock: Clock): GenerateToken = new GenerateToken(config)
}
