var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",

    koalio_png: "res/koalio.png",

    goblin_png: "res/sprites/goblin.png",
    goblin_plist: "res/sprites/goblin.plist",

    level_tiles_png: "res/tilesets/level-tiles.png",
    level_tmx: "res/tilesets/level.tmx"
};

var g_resources = [];

for (var i in res) {
  g_resources.push(res[i]);
}
