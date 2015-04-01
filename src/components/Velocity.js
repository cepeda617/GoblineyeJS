gob.components.Velocity = function () {

  var DirectionalVelocity = function () {
    this.value = 0;
  }

  DirectionalVelocity.prototype = {
    stop: function () {
      this.value = 0;
    }
  }

  this.x = new DirectionalVelocity();
  this.y = new DirectionalVelocity();

};

gob.components.Velocity.prototype = {

  get: function () {
    return cc.p(this.x.value, this.y.value);
  },

  set: function (velocity, y) {
    if (_.isNull(velocity)) {
      throw "gob.components.Velocity.set(): velocity shouldn't be null"
    }
    if (!_.isUndefined(y)) {
      velocity = cc.p(velocity, y);
    }

    this.x.value = velocity.x;
    this.y.value = velocity.y;
  },

  add: function (velocity) {
    this.set(cc.pAdd(this.get(), velocity));
    return this;
  },

  stepBy: function (delta) {
    return cc.pMult(this.get(), delta);
  },

  stop: function () {
    this.x.stop();
    this.y.stop();
  },

  dampenBy: function (damp, y) {
    if (_.isNull(damp)) {
      throw "gob.components.Velocity.dampenBy(): damp shouldn't be null"
    }
    if (!_.isUndefined(y)) {
      damp = cc.p(damp, y);
    }

    this.x.value = this.x.value * damp.x;
    this.y.value = this.y.value * damp.y;

    return this;
  },

  clampBy: function (min, max) {
    if (_.isNull(min) || _.isNull(max)) {
      throw "gob.components.Velocity.clampBy(): min and max shouldn't be null"
    }

    this.set(cc.pClamp(this.get(), min, max));
    return this;
  }

}
