_.extend(cc.TMXLayer.prototype, {

  getHeightInPixels: function () {
    return this.getLayerSize().height * this.getMapTileSize().height
  },

  getTileCoordinateAt: function (pos) {
    var x = Math.floor(pos.x / this.getLayerSize().width),
        y = Math.floor((this.getHeightInPixels() - pos.y) / this.getMapTileSize().height);

    return cc.p(x, y);
  },

  getTileRectAt: function (coords) {
    var tileWidth = this.getMapTileSize().width,
        tileHeight = this.getMapTileSize().height,
        origin = cc.p(coords.x * tileWidth, this.getHeightInPixels() - ((coords.y + 1) * tileHeight));

    return cc.rect(origin.x, origin.y, tileWidth, tileHeight);
  },

  tileExistsAt: function (pos) {
    return pos.x < this._layerSize.width && pos.y < this._layerSize.height && pos.x >= 0 && pos.y >= 0
  },

  tilesAround: function (pos) {
    var tiles = [],
        _this = this;

    pos = this.getTileCoordinateAt(pos);

    _.each(_.range(9), function (i) {

      var column = i % 3,
          row = Math.floor(i / 3),
          x = pos.x + column - 1,
          y = pos.y + row - 1,
          tilePos = cc.p(x, y),
          rect = _this.getTileRectAt(tilePos),
          gid = 0;

      if (_this.tileExistsAt(tilePos)) {
        gid = _this.getTileGIDAt(tilePos);
      }

      tiles.push({
        gid: gid,
        x: rect.x,
        y: rect.y,
        tilePos: tilePos
      });
    });

    /*

    Reorganize tiles so we're correcting collisions
    prioritizing bottom, top, left, right. Also, don't
    need the center tile.

    */

    // 0 1 2
    // 3 4 5
    // 6 7 8

    _.swap(tiles, 0, 7);

    // 7 1 2
    // 3 4 5
    // 6 0 8

    _.swap(tiles, 2, 3);

    // 7 1 3
    // 2 4 5
    // 6 0 8

    _.swap(tiles, 3, 5);

    // 7 1 5
    // 2 4 3
    // 6 0 8

    _.swap(tiles, 5, 8);

    // 7 1 8
    // 2 4 3
    // 6 0 5

    tiles.splice(4, 1);

    // 6 1 7
    // 2   3
    // 5 0 4

    // console.table(tiles)

    return tiles
  }

});
