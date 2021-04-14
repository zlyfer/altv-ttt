// jshint esversion: 9

window.addEventListener("load", function () {
  vue = new Vue({
    el: "#client",
    data: {
      players: [],
      role: "unknown",
      showScoreboard: false,
    },
    methods: {
      capitalize(string) {
        return string.substring(0, 1).toUpperCase() + string.substring(1, string.length);
      },
    },
    watch: {},
    updated() {},
    mounted: function () {
      if ("alt" in window) {
        alt.emit("ttt:ready");
        alt.on("ttt:yourRole", (role) => {
          vue.role = role;
        });
        alt.on("ttt:players", (players) => {
          vue.players = players;
        });
        alt.on("ttt:showScoreboard", (show) => {
          vue.showScoreboard = show;
        });
      }
    },
  });
});
