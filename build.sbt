
name := "wall-api"

version := "0.1"

scalaVersion := "2.12.8"

Compile/mainClass := Some("org.crstejustine.wall.Bootstrap")

libraryDependencies ++= Seq(
  "com.typesafe.scala-logging" %% "scala-logging" % "3.9.0",
  "ch.qos.logback" % "logback-classic" % "1.2.3",
  "com.typesafe.play" %% "play-akka-http-server" % "2.7.0",
  "com.typesafe.play" %% "play-ahc-ws-standalone" % "2.0.1",
  "com.typesafe.play" %% "play-ws-standalone-json" % "2.0.1",
  "com.typesafe.play" %% "play-jdbc" % "2.7.0",
  "com.typesafe.play" %% "play-jdbc-evolutions" % "2.7.0",
  "org.mariadb.jdbc" % "mariadb-java-client" % "2.2.3",
  "com.pauldijou" %% "jwt-core" % "3.1.0",
  "com.typesafe.play" %% "play-test" % "2.7.0" % Test,
  "org.mockito" % "mockito-all" % "1.10.19" % Test,
  "org.scalatest" %% "scalatest" % "3.0.4" % Test,
  "com.h2database" % "h2" % "1.4.195" % Test
)