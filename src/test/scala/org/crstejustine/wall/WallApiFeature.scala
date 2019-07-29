package org.crstejustine.wall

class WallApiFeature extends FeatureHelper {
  feature("Authentication") {

    scenario("Authenticate with valid credentials of an existing user should return 200 with user data and JWT token") {

      withRunningWallApi { url =>
        Given("A user that could access to the wall")
        insertUser("test", MD5("test"), "member")

        When("Attempting to authenticate the user with valid credentials")
        val data = Json.obj("username" -> "test", "password" -> "test")
        val response = await(wsClient.url(url + "/users/authenticate").post(data))

        Then("The response should be Ok")
        response.status shouldBe OK

        And("The response should be a json containing username and admin flag")
        response.body[JsValue] shouldBe Json.obj("userName" -> "test", "role" -> "member")

        And("The header should contain the JWT token")
        response.header("Access-Token") shouldBe defined
      }

    }

    scenario("Authenticate with invalid credentials should return 403") {

      withRunningWallApi { url =>
        Given("A user that could access to the wall")
        insertUser("test", MD5("test"), "member")

        When("Attempting to authenticate the user with invalid credentials")
        val data = Json.obj("username" -> "test", "password" -> "test fail")
        val response = await(wsClient.url(url + "/users/authenticate").post(data))

        Then("The access should be denied")
        response.status shouldBe FORBIDDEN
      }
    }

    scenario("Authenticate with valid credentials and using token should give access to securized endpoints") {

      withRunningWallApi { url =>
        Given("A user that could access to the wall")
        val userId = insertUser("test", MD5("test"), "member")

        And("Authenticate the user with valid credentials")
        val credentials = Json.obj("username" -> "test", "password" -> "test")
        val response = await(wsClient.url(url + "/users/authenticate").post(credentials))

        val token = response.header("Access-Token").get
        When("Access to securized endpoint")
        val message = Json.obj("message" -> "updated message")
        val response2 = await(wsClient.url(url + s"/users/$userId/message").withHttpHeaders("Authorization" -> s"Bearer $token").put(message))

        Then("The response should be Ok")
        response2.status shouldBe OK
      }
    }
  }
}
