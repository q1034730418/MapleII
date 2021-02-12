//=============================================================================
// StairMove.js
// by Tsukimi
// Last Updated: 2017.12.13
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc 自动楼梯斜移动
 * @author 多米
 * 
 * @param 右斜上移动区域id
 * @desc 右斜上,移动的区域id (↗↙)
 * @type number
 * @min 1
 * @max 255
 * @default 33
 * 
 * @param 左斜上移动区域id
 * @desc 左斜上,移动的区域id (↗↙)
 * @type number
 * @min 1
 * @max 255
 * @default 34
 * 
 *
 * @help
 *自动楼梯斜移动
 *区域设置和自动斜移动。
 * 
 * -----------------
 * 
 */
//=============================================================================

var Imported = Imported || {};
Imported.TKM_StairMove = true;
var $TKMvar = $TKMvar || {};
$TKMvar.stairMove = {};

(function() {
    'use strict';
    
    var pluginName = 'StairMove';
    var getParam = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };
    
    $TKMvar.stairMove = {};
    // PARAMETER
    var parameters = PluginManager.parameters(pluginName);
    var temp = 0;
    $TKMvar.stairMove.regionLDRU = Number( getParam("右斜上移动区域id") ) || -1;
    $TKMvar.stairMove.regionLURD = Number( getParam("左斜上移动区域id") ) || -1;
    
    
    var _Game_Player_executeMove = Game_Player.prototype.executeMove;
    Game_Player.prototype.executeMove = function(direction) {
        var diagonalAccess = false;
        var sm = $TKMvar.stairMove;
        
        if(this.regionId() === sm.regionLDRU || this.regionId() === sm.regionLURD) {
            if(direction === 4 || direction === 6) {
                var yDirection;
                if(this.regionId() === sm.regionLDRU) yDirection = (direction === 4) ? 2 : 8;
                else yDirection = (direction === 4) ? 8 : 2;
                
                var x2 = $gameMap.roundXWithDirection(this.x, direction);
                var y2 = $gameMap.roundYWithDirection(this.y, yDirection);
                if($gameMap.regionId(x2, y2) === this.regionId()) {
                    diagonalAccess = true;
                    this._direction = direction;
                    this.moveDiagonally(direction, yDirection);
                }
            }
        }
        
        if(!diagonalAccess) {
            _Game_Player_executeMove.apply(this, arguments);
        }
    }
   
    Game_Player.prototype.moveDiagonally = function(horz, vert) {
        Game_CharacterBase.prototype.moveDiagonally.apply(this, arguments);
        
        if(!this.isMovementSucceeded()) {
            var sm = $TKMvar.stairMove;
            var direction = this._direction;
            
            if(this.regionId() === sm.regionLDRU || this.regionId() === sm.regionLURD) {
                if(direction === 4 || direction === 6) {
                    var yDirection = 0;
                    if(this.regionId() === sm.regionLDRU) yDirection = (direction === 4) ? 2 : 8;
                    else yDirection = (direction === 4) ? 8 : 2;

                    var x2 = $gameMap.roundXWithDirection(this.x, direction);
                    var y2 = $gameMap.roundYWithDirection(this.y, yDirection);
                    if($gameMap.regionId(x2, y2) === this.regionId()) this.checkEventTriggerTouch(x2, y2);
                }
            }
        }
    }
    
})();
