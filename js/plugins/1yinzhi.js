(function() {
var _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function(character) {
    _Sprite_Character_initialize.apply(this, arguments);
    this._isValid = character == $gamePlayer;
    this._ghostingSprites = [];
    this._time = 0;
};

var _Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function() {
    _Sprite_Character_updatePosition.call(this);
    this._ghostingSprites && this._ghostingSprites.forEach(function(sprite, index) {
        sprite.opacity -= 7;
        sprite.x = sprite._ax;
		sprite.x -= $gameMap.displayX()*20;
		sprite.y = sprite._ay
		sprite.y -= $gameMap.displayY()*20;
        if (sprite.opacity <= 0) {
            SceneManager._scene._spriteset._tilemap.removeChild(sprite);
            this._ghostingSprites.splice(index, 1);
        }
    }.bind(this))
    if (!$gamePlayer.isMoving() && $gamePlayer.isDashing() && 
        this._isValid && !this._time && SceneManager._scene instanceof Scene_Map) {
        var sprite = new Sprite_Base();
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 1;
        sprite.bitmap = ImageManager.loadCharacter(this._characterName);
        var pw = this.patternWidth();
        var ph = this.patternHeight();
        var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
        var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
        sprite.setFrame(sx, sy, pw, ph);
        //sprite.x = this.x;
        //sprite.y = this.y;
        sprite._ax = this.x + $gameMap.displayX()*20;
        sprite._ay = this.y + $gameMap.displayY()*20;
        sprite.z = this.z;
        this._ghostingSprites.push(sprite);
        SceneManager._scene._spriteset._tilemap.addChild(sprite);
    }
    this._time++;
    this._time %= 2;
};
})();
