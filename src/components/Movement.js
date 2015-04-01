gob.components.Movement = function (node) {

  this.minVelocity = cc.p(-120, -450);
  this.maxVelocity = cc.p(120, 250);
  this.horizontalForce = 800;
  this.jumpForce = cc.p(0, 310);
  this.jumpCutoff = 150;
  this.friction = cc.p(0.90, 1);
  this.state = new gob.components.MovementState();
  this.velocity = new gob.components.Velocity();
  this.node = node;
  this.destination = node.getPosition();
  this.delta = 0;
};

gob.components.Movement.prototype = {

  getGravityStep: function () {
    return cc.pMult(gob.gravity.force, this.delta);
  },

  applyGravity: function () {
    this.velocity.add(this.getGravityStep());
  },

  stepRight: function () {
    var step = cc.pMult(cc.p(this.horizontalForce, 0), this.delta);
    this.velocity.add(step);
  },

  stepLeft: function () {
    var step = cc.pMult(cc.p(-this.horizontalForce, 0), this.delta);
    this.velocity.add(step);
  },

  update: function (delta) {
    var stepVelocity;

    this.delta = delta;

    if (this.state.is('left')) {
      this.stepLeft();
    }

    if (this.state.is('right')) {
      this.stepRight();
    }

    if (this.state.is('jumping') && this.state.is('grounded')) {
      this.velocity.add(this.jumpForce);
      this.state.setAscending();

    } else if (this.state.not('ascending') && this.velocity.y.value > this.jumpCutoff) {
      this.velocity.y.value = this.jumpCutoff;
    }
    this.velocity.dampenBy(this.friction).clampBy(this.minVelocity, this.maxVelocity);
    this.applyGravity();

    stepVelocity = this.velocity.stepBy(this.delta);
    this.destination = cc.pAdd(this.node.getPosition(), stepVelocity);
  },

  stopVertical: function () {
    this.velocity.y.stop();
  },

  stopHorizontal: function () {
    this.velocity.x.stop();
  },

  add: function (movement, y) {
    if (_.isNull(movement)) {
      throw "gob.components.Movement.add(): movement should not be null";
    }
    if (!_.isUndefined(y)) {
      movement = cc.p(movement, y);
    }

    this.destination = cc.pAdd(this.destination, movement);
    return this;
  },

  resolve: function () {
    // cc.log(this.destination);
    this.node.setPosition(this.destination);
  },

  land: function () {
    this.stopVertical();
    this.state.setGrounded();
  }

};
