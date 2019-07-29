package org.crstejustine.wall.authentication

import pdi.jwt.algorithms.JwtHmacAlgorithm

case class TokenConfig(tokenExpiration: Long, secretKey: String, algorithm: JwtHmacAlgorithm)
