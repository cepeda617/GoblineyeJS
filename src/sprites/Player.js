gob.sprites.Player = cc.Sprite.extend({

  ctor : function() {
    this._super();
    this.initWithFile(res.koalio_png, cc.rect(0,0,18,26));

    this.movement = new gob.components.Movement(this);
  },

  collisionBox: function () {
  },

  update: function (delta) {
    this.movement.update(delta);
  }

})
