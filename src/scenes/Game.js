gob.scenes.Game = cc.Scene.extend({

  onEnter: function () {
    this._super();

    var layer = new gob.layers.Game();
    this.addChild(layer);
  }

});
