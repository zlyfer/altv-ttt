// jshint esversion: 9

/* --------------------------------- Imports -------------------------------- */

import alt from "alt";
import mapsJSON from "./maps.json";

/* ---------------------------- Global Constants ---------------------------- */

const maps = mapsJSON.maps;

/* ---------------------------- Global Variables ---------------------------- */

var devMode = true;
var players = {};
var map = selectMap(null);

/* -------------------------------- Schedules ------------------------------- */

alt.setInterval(() => {
  alt.Player.all.forEach((p) => {
    players[p.id].ping = p.ping;
  });
  alt.emitClient(null, "ttt:players", getPlayerList());
}, 500);

/* --------------------------------- Events --------------------------------- */

alt.on("playerConnect", (player) => {
  if (map.ipl) alt.emitClient(player, "ttt:requestIpl", map.ipl);

  initPlayer(player);

  alt.onClient("ttt:ready", (player) => {
    let spawn = selectSpawn();
    player.spawn(spawn.x, spawn.y, spawn.z, 0);
    player.rot = new alt.Vector3(spawn.rx, spawn.ry, spawn.rz);
    alt.emitClient(player, "ttt:ident", players[player.id]);
    alt.emitClient(player, "ttt:players", getPlayerList);
    alt.emitClient(player, "ttt::devMode", devMode);
  });
  alt.on("playerDisconnect", (player, reason) => {
    delete players[player.id];
  });
  alt.on("playerDeath", (player) => {
    // TODO: Handle after death.
  });
  alt.onClient("ttt::spawn", (player) => {
    alt.log(
      `Position: ${player.pos.x} ${player.pos.y} ${player.pos.z} Rotation: ${player.rot.x} ${player.rot.y} ${player.rot.z}`
    );
  });
});

/* -------------------------------- Functions ------------------------------- */

function initPlayer(player) {
  let newPlayer = {
    role: "traitor",
    name: player.name,
    kills: 0,
    deaths: 0,
    karma: 0,
    ping: player.ping,
  };
  players[player.id] = newPlayer;
}

function genRole() {
  // 0 = innocent, 1 = traitor
  let role = Math.floor(Math.random() * 3);
  if (role == 0) role = "innocent";
  if (role == 1) role = "traitor";
  if (role == 2) role = "detective";
  return role;
}

function getPlayerList() {
  let playerList = [];
  Object.keys(players).forEach((p) => {
    playerList.push(players[p]);
  });
  return playerList;
}

function selectMap(mapname) {
  if (mapname) {
    return maps[mapname];
  } else {
    let keys = Object.keys(maps);
    let count = keys.length;
    let ran = Math.floor(Math.random() * count);
    return maps[keys[ran]];
  }
}

function selectSpawn() {
  let ran = Math.floor(Math.random() * map.spawns.length);
  return map.spawns[ran];
}
