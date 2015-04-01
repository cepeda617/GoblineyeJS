_.mixin({

  within: function(value, min, max) {
    return value > min && value < max;
  }

});
