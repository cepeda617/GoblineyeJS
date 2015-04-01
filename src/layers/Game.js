gob.layers.Game = cc.Layer.extend({

  ctor: function () {
    this._super();

    var blue, sky;

    blue = cc.color(100, 100, 250);
    sky = cc.LayerColor.create(blue);

    this.addChild(sky);

    this.level = new gob.maps.Level();
    this.addChild(this.level);

    this.player = new gob.sprites.Player()
    this.player.setPosition(400, 400)

    this.level.addPlayer(this.player);

    this.touchPad = new gob.layers.TouchPad(this.player);
    this.addChild(this.touchPad);

    this.keyboardHandler()

    this.scheduleUpdate();
  },

  update: function (delta) {
    this.player.update(delta);
    this.level.resolvePlayerCollisions();
    this.centerOn(this.player);
    // cc.log(this.player.getPosition());
  },

  centerOn: function (node) {
    var position, x, y, center;

    position = node.getPosition();
    x = Math.max(position.x, cc.winSize.width / 2);
    y = Math.max(position.y, cc.winSize.height / 2);

    x = Math.min(x, (this.level.mapWidth * this.level.tileWidth) - cc.winSize.width / 2);
    y = Math.min(y, (this.level.mapHeight * this.level.tileHeight) - cc.winSize.height / 2);

    center = cc.p(cc.winSize.width / 2, cc.winSize.height / 2);

    this.level.setPosition(cc.pSub(center, cc.p(x, y)));
  },

  keyboardHandler: function() {
    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,

      onKeyPressed: function (keyCode, event) {
        cc.log('press:', keyCode, keyCode.toString());
      },

      onKeyReleased: function (keyCode, event) {
        cc.log('release:', keyCode, keyCode.toString());
      }

    }, this.player);
  }

});



//     self.touchHandler = TouchHandler()

//     addChild(self.touchHandler)
//     touchHandler.contentSize = contentSize

//   }
