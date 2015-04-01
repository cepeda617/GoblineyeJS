_.mixin({

  swap: function(list, x, y) {
    var heldValue = list[y];
    list[y] = list[x];
    list[x] = heldValue;
  }

});
