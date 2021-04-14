// jshint esversion: 9
const maps = require("./maps.json");

for (let i = 0; i < 10; i++) {
  var map = selectMap(null);
  console.log(map);
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
