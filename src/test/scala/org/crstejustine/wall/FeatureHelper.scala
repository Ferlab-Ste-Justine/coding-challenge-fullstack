package org.crstejustine.wall

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
