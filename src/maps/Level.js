gob.maps.Level = cc.TMXTiledMap.extend({

  ctor : function() {
    this._super();
    this.initWithTMXFile(res.level_tmx);

    this.players = [];
    this.ground = this.getLayer("ground");
  },

  addPlayer: function (player) {
    this.players.push(player);
    this.addChild(player);
  },

  resolvePlayerCollisions: function () {
    var _this = this;

    _.each(this.players, function (player) {

      var groundTiles = _this.ground.tilesAround(player.getPosition());

      _.each(groundTiles, function (tile, index) {

        var correction = cc.p(0, 0),
            playerRect = player.getBoundingBox(),
            tileRect = cc.rect(tile.x, tile.y, _this.tileWidth, _this.tileHeight),
            doesIntersect = cc.rectIntersectsRect(playerRect, tileRect),
            intersection = cc.rectIntersection(playerRect, tileRect);

        if (tile.gid && doesIntersect) {
          switch(index) {
            case 0: // Tile below
              correction.y = intersection.height;
              player.movement.land();
              break;

            case 1: // Tile above
              correction.y = -intersection.height;
              player.movement.stopVertical();
              break;

            case 2: // Left tile
              correction.x = intersection.width;
              break;

            case 3: // right tile
              correction.x = -intersection.width;
              break;

            default:

              if (intersection.width > intersection.height) {
                // collision is diagonal but resolving vertically
                player.movement.stopVertical();

                if (_.contains([4, 5], index)) {
                  correction.y = intersection.height;
                  player.movement.state.setGrounded();
                } else {
                  correction.y = -intersection.height;
                }
              } else {
                // collision is diagonal but resolving horizontally
                correction.x = (_.contains([5, 6], index) ? 1 : -1) * intersection.width;
              }
          } // end switch

          // cc.log('correction: ', index, correction);
          player.movement.add(correction);
        }

      });

      player.movement.resolve();

    });
  }

});
