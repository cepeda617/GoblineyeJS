gob.layers.TouchPad = cc.Layer.extend({

  ctor: function (player) {

    this._super();

    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,

      onTouchBegan: function (touch, event) {
        var input = new gob.components.TouchInput(touch);

        if (input.isLeft) {
          player.movement.state.setLeft();

        } else if (input.isRight) {
          player.movement.state.setRight();
        }

        if (input.isJump) {
          player.movement.state.setJumping();
        }
      },

      onTouchMoved: function (touch, event) {
        var input = new gob.components.TouchInput(touch);

        if (input.isRight && (input.wasLeft || input.wasBlank)) {
          player.movement.state.setRight();

        } else if (input.isLeft && input.wasRight) {
          player.movement.state.setLeft();

        } else if (input.isBlank && input.wasRight) {
          player.movement.state.setIdle();
        }
      },

      onTouchEnded: function (touch, event) {
        var input = new gob.components.TouchInput(touch);

        if (input.isLeft || input.isRight) {
          player.movement.state.setIdle();
        }

        if (input.isJump) {
          player.movement.state.setDescending();
        }
      }

    }, this);
  }

});

