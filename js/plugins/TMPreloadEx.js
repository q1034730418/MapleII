//=============================================================================
// TMPlugin - プリロード設定
// バージョン: 1.0.0
// 最終更新日: 2018/04/05
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc ゲーム起動時にシステム画像をプリロードするかどうかを、
 * 画像ごとに設定します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param iconSet
 * @type boolean
 * @desc IconSet.png预装文件。
 * @default true
 *
 * @param balloon
 * @type boolean
 * @desc Balloon.png预装文件。
 * @default true
 *
 * @param shadow1
 * @type boolean
 * @desc Shadow1.png预装文件。
 * @default true
 *
 * @param shadow2
 * @type boolean
 * @desc Shadow2.png预装文件
 *
 * @param damage
 * @type boolean
 * @desc Damage.png预装文件。
 * @default true
 *
 * @param states
 * @type boolean
 * @desc States.png预装文件。
 * @default true
 *
 * @param weapons1
 * @type boolean
 * @desc Weapons1.png预装文件。
 * @default true
 *
 * @param weapons2
 * @type boolean
 * @desc Weapons2.png预装文件。
 * @default true
 *
 * @param weapons3
 * @type boolean
 * @desc Weapons3.png预装文件。
 * @default true
 *
 * @param buttonSet
 * @type boolean
 * @desc ButtonSet.png预装文件。
 * @default true
 * 
 * @param others
 * @desc 预存指定的图像。
 * (无需扩展名，指定多个时用逗号隔开)
 * @default 
 *
 * @help
 * TMPlugin - 预装设置 ver1.0.0
 *
*使用方法：

*

*这个插件覆盖整个Scene_Boot的预装处理。
*根据其他插件和不同版本的核心剪辑的并用
*可能会发生故障。
*
*没有插件命令。
*
*这个插件在RPG tour MV Version 1.5.1中进行动作确认。
*
*这个插件在MIT许可证下分发，用于商业、
*改造、再散发等，可以自由使用。
 */

var Imported = Imported || {};
Imported.TMPreloadEx = true;

(function() {

  var parameters = PluginManager.parameters('TMPreloadEx');
  var iconSet = JSON.parse(parameters['iconSet'] || 'true');
  var balloon = JSON.parse(parameters['balloon'] || 'true');
  var shadow1 = JSON.parse(parameters['shadow1'] || 'true');
  var shadow2 = JSON.parse(parameters['shadow2'] || 'true');
  var damage = JSON.parse(parameters['damage'] || 'true');
  var states = JSON.parse(parameters['states'] || 'true');
  var weapons1 = JSON.parse(parameters['weapons1'] || 'true');
  var weapons2 = JSON.parse(parameters['weapons2'] || 'true');
  var weapons3 = JSON.parse(parameters['weapons3'] || 'true');
  var buttonSet = JSON.parse(parameters['buttonSet'] || 'true');
  var others = parameters['others'].split(',');
  

  //-----------------------------------------------------------------------------
  // Scene_Boot
  //

  Scene_Boot.loadSystemImages = function() {
    if (iconSet) ImageManager.reserveSystem('IconSet');
    if (balloon) ImageManager.reserveSystem('Balloon');
    if (shadow1) ImageManager.reserveSystem('Shadow1');
    if (shadow2) ImageManager.reserveSystem('Shadow2');
    if (damage) ImageManager.reserveSystem('Damage');
    if (states) ImageManager.reserveSystem('States');
    if (weapons1) ImageManager.reserveSystem('Weapons1');
    if (weapons2) ImageManager.reserveSystem('Weapons2');
    if (weapons3) ImageManager.reserveSystem('Weapons3');
    if (buttonSet) ImageManager.reserveSystem('ButtonSet');
    $gameScreen.showPicture(10,"BtnSkill0",0,828,430,100,100,255,0);
    $gameScreen.showPicture(11,"BtnBase",0,853,453,100,100,255,0);
    
    $gameScreen.showPicture(12,"BtnSkill0",0,832,344,100,100,255,0);
    $gameScreen.showPicture(13,"BtnBase",0,856,367,100,100,255,0);
    
    $gameScreen.showPicture(14,"BtnSkill0",0,900,280,100,100,255,0);
    $gameScreen.showPicture(15,"BtnBase",0,924,304,100,100,255,0);
    
    $gameScreen.showPicture(16,"BtnSkill0",0,987,278,100,100,255,0);
    $gameScreen.showPicture(17,"BtnBase",0,1011,301,100,100,255,0);
    
    $gameScreen.showPicture(18,"BtnSkill0",0,1053,343,100,100,255,0);
    $gameScreen.showPicture(19,"BtnBase",0,1078,366,100,100,255,0);
    
    $gameScreen.showPicture(20,"BtnSkill0",0,1057,429,100,100,255,0);
    $gameScreen.showPicture(21,"BtnBase",0,1082,453,100,100,255,0);
    
    $gameScreen.showPicture(22,"BtnSkill0",0,1100,270,100,100,255,0);
    $gameScreen.showPicture(23,"BtnBase",0,1112,279,100,100,255,0);
    
    $gameScreen.showPicture(24,"BtnSkill0",0,1100,200,100,100,255,0);
    $gameScreen.showPicture(25,"BtnBase",0,1112,209,100,100,255,0);
    console.log('sss2');
    
    others.forEach(function(fn) {
      ImageManager.reserveSystem(fn);
    });
  };

})();
