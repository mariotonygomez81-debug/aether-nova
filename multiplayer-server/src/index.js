import { defineServer, defineRoom } from "colyseus";
import { AetherBattleRoom } from "./rooms/AetherBattleRoom.js";

const server = defineServer({
  rooms: {
    aether_battle: defineRoom(AetherBattleRoom).filterBy(["coopRoomId"])
  },
  express: (app) => {
    app.get("/health", (_request, response) => {
      response.status(200).json({ ok: true, service: "aether-nova-authoritative-server" });
    });
  }
});

const port = Number(process.env.PORT || 2567);
server.listen(port);
console.log(`AETHER NOVA authoritative server listening on :${port}`);
