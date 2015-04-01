gob.components.Gravity = function () {

  this.force = cc.p(0, -450);

};

gob.components.Gravity.prototype = {

  setForce: function (newForce, yForce) {
    if (_.isNull(newForce)) {
      throw "gob.components.Gravity.setForce(): newForce should not be null";
    }
    if (!_.isUndefined(yForce)) {
      this.force = cc.p(newForce, yForce);
    } else {
      this.force = newForce;
    }

    return this.force;
  }

}

gob.gravity = new gob.components.Gravity();
