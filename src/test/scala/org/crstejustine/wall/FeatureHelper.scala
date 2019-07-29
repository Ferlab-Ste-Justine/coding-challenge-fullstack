package org.crstejustine.wall

import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import com.typesafe.config.ConfigFactory
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FeatureSpec, GivenWhenThen, Matchers}
import play.api.libs.ws.WSClientConfig
import play.api.libs.ws.ahc.{AhcWSClientConfig, StandaloneAhcWSClient}

class FeatureHelper extends FeatureSpec with GivenWhenThen with MockitoSugar with Matchers with DatabaseHelper {

  private val config = ConfigFactory.load()

  private val wsClientMat = ActorMaterializer()(ActorSystem("WSClientTest"))
  val wsClient: StandaloneAhcWSClient = StandaloneAhcWSClient(AhcWSClientConfig(WSClientConfig()))(wsClientMat)

  def withRunningWallApi[T](block: String => T): T = {
    val server = new WallApi(config = config)
    try {
      block(server.url)
    } finally {
      server.shutdown()
    }
  }

}
