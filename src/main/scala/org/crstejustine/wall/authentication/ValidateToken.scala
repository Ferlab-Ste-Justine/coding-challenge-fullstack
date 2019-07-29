package org.crstejustine.wall.authentication

import java.time.Clock

import scala.util.{Failure, Success, Try}

class ValidateToken(config: TokenConfig)(implicit clock: Clock) extends (Token => Try[JwtClaim]) {

  override def apply(token: Token): Try[JwtClaim] =
    Jwt.decode(token.value, config.secretKey, Seq(config.algorithm)).flatMap(validateClaims)

  private val validateClaims = (claims: JwtClaim) =>
    if (claims.isValid(clock)) {
      Success(claims)
    } else {
      Failure(new Exception("The JWT did not pass validation"))
    }
}

object ValidateToken {
  def apply(config: TokenConfig)(implicit clock: Clock): ValidateToken = new ValidateToken(config)
}
