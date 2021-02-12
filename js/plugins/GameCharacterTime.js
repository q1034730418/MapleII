//=============================================================================
// GameCharacterTime.js
//=============================================================================
/*: 
 * @name GameCharacterTime 
 * @plugindesc 角色计时
 * @author 汪汪
 * @version 2.0
 * 
 *   
 * 
 * @help
 * 对于一个角色,如$gamePlayer
 * ========================== 
 * 最后一次调用的时间
 * $gamePlayer.lastTime(id) 
 * id 最后一次调用的时间,(如果从来没有调用则为-1000)
 * 如 $gamePlayer.lastTime(12) 
 * 
 * ==========================
 * 最后一次调用到现在的时间
 * $gamePlayer.lastTimeToNew(id) 
 * id 最后一次调用到现在的时间 ,(如果从来没有调用则为 当前时间+1000)
 * 如 $gamePlayer.lastTimeToNew(12) 
 * ==========================
 * 最后一次调用到现在的时间是否大于等于time 
 * time默认为0
 * $gamePlayer.lastTimeMore(id,time) 
 * 如 $gamePlayer.lastTimeMore(12,100) 
 * 
 * ==========================
 * 设置最后一次调用的时间 
 * $gamePlayer.setLastTime(id,time) 
 * time为延时值,默认为0 
 * 如 $gamePlayer.setLastTime(12,100) 
 * 这样就是设置最后一次调用为100帧后,(在100帧之前,$gamePlayer.lastTimeMore(12,0) 都是为 false)
 * 
 * */

var ww = ww || {}
ww.GameCharacterTime = {}

ww.GameCharacterTime.initialize = Game_CharacterBase.prototype.initialize

Game_CharacterBase.prototype.initialize = function () {
    this._characterTime = 0
    this._characterTimes = {}
    ww.GameCharacterTime.initialize.call(this)
};
ww.GameCharacterTime.update = Game_CharacterBase.prototype.update
Game_CharacterBase.prototype.update = function () {
    ww.GameCharacterTime.update.call(this)
    this._characterTime++
}; 

Game_CharacterBase.prototype.lastTime = function (id) {
    this._characterTimes[id] = this._characterTimes[id] || -1000
    return this._characterTimes[id]
}; 

Game_CharacterBase.prototype.lastTimeToNew = function (id) {
    return this._characterTime - this.lastTime(id)
};

Game_CharacterBase.prototype.lastTimeMore = function (id, time) {
    return this.lastTimeToNew(id) >= (time||0)
};


Game_CharacterBase.prototype.setLastTime = function (id, time) {
    this._characterTimes[id] = this._characterTime + (time || 0)
};
Game_CharacterBase.prototype.skillTimes=function(id,time){ 
    if($gamePlayer.lastTimeMore(id,time)){
        $gamePlayer.act(id)
        $gamePlayer.setLastTime(id,0)
        console.log(time)
     }
    };
var skillt =new Game_CharacterBase();
var delays = 100;
var s10damage;
var s11damage;
var s12damage;
var dhp = 0;
var ddp = 0;