// jshint esversion: 9

/* --------------------------------- Imports -------------------------------- */

import alt from "alt";
import game from "natives";
import native from "natives";

/* -------------------------------- Settings -------------------------------- */

game.setPedDefaultComponentVariation(game.playerPedId());
native.displayRadar(false);

/* ---------------------------- Global Variables ---------------------------- */

var view = new alt.WebView("http://resources/altv-ttt/html/index.html");
var devMode = false;

/* -------------------------------- Schedules ------------------------------- */

alt.everyTick(() => {
  native.disableControlAction(0, 37, true);
});

/* --------------------------------- Events --------------------------------- */

alt.onServer("ttt:requestIpl", (ipl) => {
  alt.requestIpl(ipl);
});
alt.onServer("ttt:ident", (identity) => {
  view.emit("ttt:yourRole", identity.role);
});
alt.onServer("ttt:players", (players) => {
  view.emit("ttt:players", players);
});
alt.onServer("ttt::devMode", (mode) => {
  devMode = mode;
});

alt.on("keydown", (key) => {
  switch (key) {
    case 9:
      view.emit("ttt:showScoreboard", true);
      break;
    case 32:
      if (devMode) alt.emitServer("ttt::spawn");
      break;
  }
});
alt.on("keyup", (key) => {
  switch (key) {
    case 9:
      view.emit("ttt:showScoreboard", false);
      break;
  }
});
view.on("ttt:ready", () => {
  alt.emitServer("ttt:ready");
});
