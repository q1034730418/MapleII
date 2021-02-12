// [SQUARE PHOENIX] : http://enix.web.fc2.com/
/*:
* @plugindesc ドロップ率と取得ゴールド＆経験値を数倍にできるスキル
* @author SQUARE PHOENIX
* @help
ドロップ率と取得ゴールド＆経験値を数倍にできるスキルを作成できます。
スキルは覚えているだけで効果を発揮します。

↓例（スキルのメモに書きます）
<gold_x:3>：戦闘後に取得できるゴールドが３倍になります
<exp_x:4> ：戦闘後に取得できるゴールドが４倍になります
<drop_x:5>：戦闘後にアイテムを取得できる可能性が５倍になります

* 利用規約：
*  自己責任で自由にお使いください。
*/
(function() {
  //=============================================================================
  // rpg_objects
  //=============================================================================
  Game_Enemy.prototype.dropItemRate = function() {
    var actId = 0;
    var ninzu = $gameParty._actors.length
    for(var i=1;i <= ninzu;i++){
    actId = $gameParty._actors[i-1];
      var actor = $gameActors.actor(actId);
      var skill_suu = actor.skills().length
      for(var ii = 1; ii <= skill_suu; ii++){
        //drop
        if (actor.skills()[ii-1].meta['drop_x']){
         console.log(actor.skills()[ii-1].meta['drop_x']);
         return actor.skills()[ii-1].meta['drop_x'];
        }
      }
    }
  //-------------------------------------------------------
      return $gameParty.hasDropItemDouble() ? 2 : 1;//moto
  };

  //=============================================================================
  // rpg_managers.js v1.5.0
  //=============================================================================
  BattleManager.makeRewards = function() {
      this._rewards = {};
      this._rewards.gold = $gameTroop.goldTotal();
      this._rewards.exp = $gameTroop.expTotal();
      this._rewards.items = $gameTroop.makeDropItems();
      //------------------------------------
      var actId = 0;
      var ninzu = $gameParty._actors.length
      for(var i=1;i <= ninzu;i++){
      actId = $gameParty._actors[i-1];
        var actor = $gameActors.actor(actId);
        var skill_suu = actor.skills().length
        for(var ii = 1; ii <= skill_suu; ii++){
          //gold
          if (actor.skills()[ii-1].meta['gold_x']){
           this._rewards.gold = $gameTroop.goldTotal()*actor.skills()[ii-1].meta['gold_x'];
          }
          //exp
          if (actor.skills()[ii-1].meta['exp_x']){
           this._rewards.exp = $gameTroop.expTotal()*actor.skills()[ii-1].meta['exp_x'];
          }
        }
      }
  };

})();
