package org.crstejustine.wall

object Bootstrap extends App {

  val port: Option[String] = if (args.length >= 1 && args(0).startsWith("-port=")) Some(args(0).split("=")(1)) else None
  val config = ConfigFactory.load()
  val environment = Environment.simple(mode = Mode.Prod)
  val dbConfig = config.getConfig("db").withFallback(config.getConfig("play.db.prototype"))
  implicit val db: Database = new PooledDatabase("default", dbConfig, environment, new HikariCPConnectionPool(environment))
  Evolutions.applyEvolutions(db)

  val server = new WallApi(
    port.map(_.toInt),
    config
  )

  server.start()
  sys.addShutdownHook(server.shutdown())
}
