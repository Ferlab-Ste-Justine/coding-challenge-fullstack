package org.crstejustine.wall

import java.time.Clock

import com.typesafe.config.Config
import org.crstejustine.wall.authentication.TokenConfig
import org.slf4j.LoggerFactory
import pdi.jwt.JwtAlgorithm
import pdi.jwt.algorithms.JwtHmacAlgorithm
import play.api.BuiltInComponents
import play.api.db.Database
import play.api.mvc._
import play.api.routing.Router
import play.api.routing.sird._
import play.core.server.AkkaHttpServerComponents

class WallApi(port: Option[Int] = None, config: Config)(implicit db: Database) extends AkkaHttpServerComponents with BuiltInComponents {

  private val logger = LoggerFactory.getLogger(classOf[WallApi])
  private implicit val clock: Clock = Clock.systemUTC()

  implicit lazy val controllerComponents: ControllerComponents = DefaultControllerComponents(
    defaultActionBuilder, playBodyParsers, messagesApi, langs, fileMimeTypes, executionContext
  )

  private val tokenConfig = TokenConfig(
    tokenExpiration = config.getLong("token.expirationInSeconds"),
    secretKey = config.getString("token.secretKey"),
    algorithm = JwtAlgorithm.fromString(config.getString("token.algorithm")).asInstanceOf[JwtHmacAlgorithm]
  )
  private lazy val wallController = Controller(tokenConfig)

  override def router: Router = Router.from {
    case GET(p"/") => wallController.index
    case POST(p"/users/authenticate") => wallController.authenticate
    case GET(p"/users") => ???
    case POST(p"/users") => ???
    case PUT(p"/users/${long(userId)}/message") => wallController.postMessage(userId)
    case GET(p"/connect") => wallController.ws
  }

  override def httpFilters: Seq[EssentialFilter] = List.empty

  lazy val url = s"http://localhost:${server.httpPort.get}"

  def start(): Unit = {
    logger.info(s"Starting server at $url")
  }

  def shutdown(): Unit = server.stop()
}
