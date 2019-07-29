package org.crstejustine.wall.ws

import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future}

class UserParentActor(implicit ec: ExecutionContext) extends Actor with InjectedActorSupport with ActorLogging {

  import UserParentActor._

  implicit val timeout = Timeout(2.seconds)

  override def receive: Receive = LoggingReceive {
    case Create(id) =>
      val name = s"userActor-$id"
      log.info(s"Creating user actor $name")
      val future = Future(())
      pipe(future) to sender()
  }
}

object UserParentActor {
  case class Create(id: String)
}
