package org.crstejustine.wall.authentication

import java.time.Clock

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success, Try}

case class UserRequest[A](jwt: JwtClaim, token: Token, request: Request[A]) extends WrappedRequest[A](request)

class AuthenticatedAction(bodyParser: BodyParser[AnyContent], validateToken: Token => Try[JwtClaim])(implicit ec: ExecutionContext)
  extends ActionBuilder[UserRequest, AnyContent] {

  override def parser: BodyParser[AnyContent] = bodyParser
  override protected def executionContext: ExecutionContext = ec

  private val headerTokenRegex = """Bearer (.+?)""".r

  override def invokeBlock[A](request: Request[A], block: UserRequest[A] => Future[Result]): Future[Result] =
    extractBearerToken(request) map { value =>
      val token = Token(value)
      validateToken(token) match {
        case Success(claim) => block(UserRequest(claim, token, request))
        case Failure(t) => Future.successful(Results.Unauthorized(t.getMessage))
      }
    } getOrElse Future.successful(Results.Unauthorized)

  private def extractBearerToken[A](request: Request[A]): Option[String] =
    request.headers.get(HeaderNames.AUTHORIZATION) collect {
      case headerTokenRegex(token) => token
    }
}

object AuthenticatedAction {
  def apply(config: TokenConfig)(implicit ec: ExecutionContext, clock: Clock): AuthenticatedAction = {
    val validateToken = ValidateToken(config)
    new AuthenticatedAction(BodyParsers.parse.default, validateToken)
  }
}
