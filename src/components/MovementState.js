gob.components.MovementState = function () {

  this.types = new Set([
    'idle',
    'left',
    'right',
    'jumping',
    'ascending',
    'descending',
    'grounded'
  ]);

  this.states = new Set(['idle', 'descending']);
};

gob.components.MovementState.prototype = {

  is: function (state) {
    return this.states.has(state);
  },

  not: function (state) {
    return !this.is(state);
  },

  set: function () {
    var _this = this;
    _.each(arguments, function (state) {
      if (_this.types.has(state)) {
        _this.states.add(state);
      }
    });
    return this;
  },

  unset: function () {
    var _this = this;
    _.each(arguments, function (state) {
      _this.states.delete(state);
    });
    return this;
  },

  setIdle: function () {
    this.unset('left', 'right').set('idle');
  },

  setLeft: function () {
    this.unset('idle', 'right').set('left');
  },

  setRight: function () {
    this.unset('idle', 'left').set('right');
  },

  setJumping: function() {
    this.unset('idle').set('jumping');
  },

  setAscending: function () {
    this.unset('jumping', 'descending', 'grounded').set('ascending');
  },

  setDescending: function () {
    this.unset('jumping', 'ascending', 'grounded').set('descending');
  },

  setGrounded: function () {
    this.unset('ascending', 'descending').set('grounded');
  }

}
