package org.crstejustine.wall

import java.time.Clock

import org.crstejustine.wall.authentication._
import org.crstejustine.wall.message.{MessageRequest, UpdateMessage}
import org.crstejustine.wall.ws.SameOriginCheck
import org.slf4j.{Logger, LoggerFactory}
import play.api.db.Database
import play.api.libs.json.{Json, _}
import play.api.mvc._

import scala.concurrent.ExecutionContext

class Controller(authenticateUser: (Username, Password) => Either[AuthenticationError, (User, Token)],
                 authenticatedAction: ActionBuilder[UserRequest, AnyContent])
                (implicit cc: ControllerComponents, ec: ExecutionContext, clock: Clock, db: Database)
  extends AbstractController(cc) with SameOriginCheck {

  val logger: Logger = LoggerFactory.getLogger("WallAPIController")

  def index: Action[AnyContent] = Action {
    Ok("Running")
  }

  def authenticate: Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[AuthenticationRequest](Json.reads) match {
      case JsSuccess(credentials, _) =>
        authenticateUser(Username(credentials.username), Password(credentials.password)) match {
          case Right((user, token)) =>
            Ok(Json.obj(
                "userName" -> credentials.username,
                "role" -> user.role.name))
              .withHeaders("Access-Token" -> token.value)
          case Left(_) => Forbidden
        }
      case JsError(_) => Forbidden
    }
  }

  def postMessage(userId: Long): Action[JsValue] = authenticatedAction(parse.json) { request =>
    request.body.validate[MessageRequest](Json.reads) match {
      case JsSuccess(messageRequest, _) => UpdateMessage(db)(userId, Message(messageRequest.message)) match {
        case Left(NotAllowedAccess) => Forbidden
        case _ => Ok
      }
      case JsError(_) => BadRequest
    }
  }

  def ws: WebSocket = ???
}

object Controller {
  def apply(tokenConfig: TokenConfig)(implicit cc: ControllerComponents, ec: ExecutionContext, clock: Clock, db: Database): Controller = {
    val authenticateUser = AuthenticateUserByCredential(tokenConfig)
    val authenticatedAction = AuthenticatedAction(tokenConfig)
    new Controller(authenticateUser, authenticatedAction)
  }
}
