
module.exports = {
  Complex: require('./Complex'),
  Joint: require('./Joint'),
}

/*
SpriteSet
  Sprite
    .trigger
    Animation
      .trigger
      .looped
    SpriteSegment
      .primitive + dimensions
      .image + transform
      .jointAttachment
        -linear / -hinge
        .smoothening
Simple
  .image + transform
*/
