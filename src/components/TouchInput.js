gob.components.TouchInput = function (touch) {

  var touchWidth = 80,
      winWidth = cc.winSize.width,
      location = touch.getLocation(),
      previously = touch.getPreviousLocation();

  this.isLeft = location.x < touchWidth;
  this.isRight = _.within(location.x, touchWidth, touchWidth*2);
  this.isJump = _.within(location.x, winWidth - touchWidth*2, winWidth - touchWidth);
  this.isBlank = !(this.isLeft || this.isRight || this.isJump);

  this.wasLeft = previously.x < touchWidth;
  this.wasRight = _.within(previously.x, touchWidth, touchWidth*2);
  this.wasJump = _.within(previously.x, winWidth - touchWidth*2, winWidth - touchWidth);
  this.wasBlank = !(this.wasLeft || this.wasRight || this.wasJump);
}
