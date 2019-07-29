package org.crstejustine.wall.utils

import org.crstejustine.wall.UnitTest

class MD5Test extends UnitTest {
  "MD5" should "hash string" in {
    MD5("My test string") shouldBe "AA2A28C6443BE2EC593D1E04E0DCBCD4"
  }
}
