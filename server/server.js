"use strict";
const db = require("./db");
const dbUtils = require("./dbUtils");
const deepcopy = require("deepcopy");

let liveDb = deepcopy(db);

const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", ws => {
  if (ws.readyState === ws.OPEN) {
    ws.on("message", rawData => {
      const data = JSON.parse(rawData);
      if (data.request === "FETCH_ALL_COMMENTS") {
        ws.send(
          JSON.stringify({
            ALL_COMMENTS: dbUtils.fetchAllData(liveDb)
          })
        );
      } else if ((data.request = "ADD_COMMENT_REQUEST")) {
        liveDb = dbUtils.addCommentToDb(liveDb, data.payload);
      }
    });
  }
});
