//=============================================================================
// TMPlugin - ジャンプアクション
// バージョン: 1.0.1
// 最終更新日: 2017/07/28
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2015 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc マップシーンをそれっぽいアクションゲームにします。
 * 使用方法などは配布サイトを参照してください。
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param gravity
 * @type string
 * @desc 重力の強さ。
 * 初期値: 0.004
 * @default 0.004
 *
 * @param friction
 * @type string
 * @desc 通常の地形とイベントの摩擦の強さ。
 * 初期値: 0.001
 * @default 0.001
 *
 * @param tileMarginTop
 * @type string
 * @desc 地形との接触判定に使う座標をどれだけ上へずらすか。
 * 初期値: 0.5
 * @default 0.5
 *
 * @param stepsForTurn
 * @type number
 * @desc 何マスの移動で１ターン経過するか。
 * 初期値: 20
 * @default 20
 *
 * @param allDeadEvent
 * @type number
 * @desc 全滅時に起動するコモンイベント番号。
 * 初期値: 0
 * @default 0
 * 
 * @param guardState
 * @type state
 * @desc 防御状態として扱うステート番号
 * 初期値: 2
 * @default 2
 * 
 * @param guardMoveRate
 * @type number
 * @desc 防御状態の移動速度補正（％）
 * 初期値: 25
 * @default 25
 * 
 * @param eventCollapse
 * @type boolean
 * @desc イベント戦闘不能時に崩壊エフェクトを使う。
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 * 
 * @param hpGauge
 * @type boolean
 * @desc 足元にHPゲージを表示する機能を利用する。
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param floorDamage
 * @type number
 * @desc ダメージ床から受けるダメージ。
 * 初期値: 10
 * @default 10
 *
 * @param damageFallRate
 * @type number
 * @desc 落下ダメージの倍率。
 * 初期値: 10
 * @default 10
 *
 * @param damageFallHeight
 * @type number
 * @desc 落下ダメージを受ける高さ。
 * 初期値: 5
 * @default 5
 *
 * @param flickWeight
 * @type number
 * @desc はじき飛ばせる重さの差。
 * 初期値: 1（ 0 なら同じ重さではじき飛ばせる )
 * @default 1
 *
 * @param flickSkill
 * @type skill
 * @desc はじき飛ばしのダメージ計算に使うスキル番号。
 * 初期値: 1（ 0 ならダメージなし )
 * @default 1
 *
 * @param stageRegion
 * @type number
 * @desc 足場として扱うリージョン番号。
 * 初期値: 60
 * @default 60
 *
 * @param wallRegion
 * @type number
 * @desc 壁として扱うリージョン番号。
 * 初期値: 61
 * @default 61
 *
 * @param slipWallRegion
 * @type number
 * @desc 壁ジャンプができない壁として扱うリージョン番号。
 * 初期値: 62
 * @default 62
 *
 * @param slipFloorRegion
 * @type number
 * @desc すべる床として扱うリージョン番号。
 * 初期値: 63
 * @default 63
 *
 * @param roughFloorRegion
 * @type number
 * @desc 移動速度半減の床として扱うリージョン番号。
 * 初期値: 64
 * @default 64
 *
 * @param marshFloorRegion
 * @type number
 * @desc 移動できない床として扱うリージョン番号。
 * 初期値: 65
 * @default 65
 *
 * @param waterTerrainTag
 * @type number
 * @desc 水中として扱う地形タグ番号。
 * 初期値: 1
 * @default 1
 *
 * @param levelupPopup
 * @type string
 * @desc レベルアップ時に表示するポップアップ。
 * 初期値: LEVEL UP!!
 * @default LEVEL UP!!
 *
 * @param levelupAnimationId
 * @desc レベルアップ時に表示するアニメーション番号。
 * 初期値: 46
 * @default 46
 * @require 1
 * @type animation
 * 
 * @param attackToOk
 * @type boolean
 * @desc 攻撃ボタンをメニューの決定ボタンとしても使うかどうか
 * 初期値: ON ( false = OFF 無効 / true =  ON 有効 )
 * @default true
 *
 * @param jumpToCancel
 * @type boolean
 * @desc ジャンプボタンをメニューのキャンセルボタンとしても使うかどうか
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param useEventSeSwim
 * @type boolean
 * @desc 水に入ったときの効果音をイベントに適用する。
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param jumpSe
 * @desc ジャンプ効果音のファイル名。
 * 初期値: Crossbow
 * @default Crossbow
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param jumpSeParam
 * @type string
 * @desc ジャンプ効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 * 
 * @param dashSe
 * @desc ダッシュ効果音のファイル名。
 * 初期値: Wind4
 * @default Wind4
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param dashSeParam
 * @type string
 * @desc ダッシュ効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":50, "pan":0}
 * @default {"volume":90, "pitch":50, "pan":0}
 * 
 * @param flickSe
 * @desc ダッシュはじき効果音のファイル名。
 * 初期値: Damage1
 * @default Damage1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param flickSeParam
 * @type string
 * @desc ダッシュはじき効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 * 
 * @param swimSe
 * @desc 入水効果音のファイル名。
 * 初期値: Water1
 * @default Water1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param swimSeParam
 * @type string
 * @desc 入水効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 * 
 * @param changeSe
 * @desc 操作キャラ切り替え効果音のファイル名。
 * 初期値: Sword1
 * @default Sword1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param changeSeParam
 * @type string
 * @desc 操作キャラ切り替え効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 * 
 * @param carrySe
 * @desc イベント持ち上げ効果音のファイル名。
 * 初期値: Cancel1
 * @default Cancel1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param carrySeParam
 * @type string
 * @desc イベント持ち上げ効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":70, "pan":0}
 * @default {"volume":90, "pitch":70, "pan":0}
 * 
 * @param hurlSe
 * @desc イベント投げ効果音のファイル名。
 * 初期値: Evasion1
 * @default Evasion1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param hurlSeParam
 * @type string
 * @desc イベント投げ効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":70, "pan":0}
 * @default {"volume":90, "pitch":70, "pan":0}
 * 
 * @param guardSe
 * @desc 防御効果音のファイル名。
 * 初期値: Equip1
 * @default Equip1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param guardSeParam
 * @type string
 * @desc 防御効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":150, "pan":0}
 * @default {"volume":90, "pitch":150, "pan":0}
 * 
 * @param playerBulletsMax
 * @type number
 * @desc プレイヤーの弾の最大数。
 * 初期値: 32
 * @default 32
 *
 * @param enemyBulletsMax
 * @type number
 * @desc イベントの弾の最大数。
 * 初期値: 256
 * @default 256
 *
 * @param weaponSprite
 * @type boolean
 * @desc 弾発射時に武器画像を表示する。
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 * 
 * @param autoDamageSe
 * @type boolean
 * @desc 着弾時に自動で効果音を再生する。
 * 初期値: ON (false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param bulletTypeName1
 * @desc 弾タイプ 1 の画像ファイル名。
 * 初期値: Bullet1
 * @default Bullet1
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param bulletTypeName2
 * @desc 弾タイプ 2 の画像ファイル名。
 * 初期値: Bullet1
 * @default Bullet1
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param bulletTypeName3
 * @desc 弾タイプ 3 の画像ファイル名。
 * 初期値: Bullet1
 * @default Bullet1
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param bulletTypeName4
 * @desc 弾タイプ 4 の画像ファイル名。
 * 初期値: Bullet1
 * @default Bullet1
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param bulletTypeSize
 * @type string
 * @desc 弾タイプごとの当たり判定のサイズ。
 * 初期値: 6,6,6,6
 * @default 6,6,6,6
 *
 * @param attackKey
 * @type string
 * @desc プレイヤーの弾発射に使用するキー
 * 初期値: Z
 * @default Z
 *
 * @param jumpKey
 * @type string
 * @desc プレイヤーのジャンプに使用するキー
 * 初期値: X
 * @default X
 *
 * @param dashKey
 * @type string
 * @desc プレイヤーのダッシュに使用するキー
 * 初期値: C
 * @default C
 *
 * @param padButtons
 * @type string
 * @desc 利用するパッドボタンのコード
 * 初期値: ok,cancel,menu,shift,attack,jump,pageup,pagedown
 * @default ok,cancel,menu,shift,attack,jump,pageup,pagedown
 *
 * @param padButtonNames
 * @type string
 * @desc パッドボタンの名前
 * padButtonsと同じ並び順でボタンの名前を設定してください
 * @default 设置，取消，菜单，短划线，攻击，跳转，更改字符（上一页），更改字符（下一页）

 * @param defaultPadButtons
 * @type string
 * @desc 垫按钮的初始排列
 * 初期値: 设置与按钮1到12对应的代码
 * @default ok,ok,shift,jump,pageup,pagedown,attack,ok,ok,ok,ok,ok
 *
 * @param padConfigCommand
 * @type string
 * @desc パッドボタン配置のコマンド名 (空にすると機能を無効化)
 * 初期値: パッドボタン配置
 * @default パッドボタン配置
 * 
 * @param stepAnimeConstantA
 * @type string
 * @desc 足踏み速度定数Ａ
 * 初期値: 0.1
 * @default 0.1
 *
 * @param stepAnimeConstantB
 * @type string
 * @desc 足踏み速度定数Ｂ
 * 初期値: 300
 * @default 300
 *
 * @noteParam shot_se_name
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData weapons
 *
 * @requiredAssets img/system/TMJumpActionShield
 * 
 * @help
 * TMPlugin - ジャンプアクション ver1.0.1
 *
 * 使い方:
 *
 *   詳細は配布サイトを参照してください。
 *
 *   このプラグインは RPGツクールMV Version 1.5.0 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 *
 * メモ欄タグ（アクター、装備、ステート）:
 * 
 *   <move_speed:0.05>        # 歩行速度
 *   <jump_speed:0.14>        # ジャンプ力
 *   <swim_speed:0.02>        # 泳ぐ速度
 *   <ladder_speed:0.04>      # はしご移動速度
 *   <accele:0.003>           # 歩行加速度
 *   <ladder_accele:0.003>    # はしご移動加速度
 *   <jump_input:0>           # ジャンプ追加入力時間
 *   <swim_jump:0.1>          # 水中ジャンプ力
 *   <mulch_jump:1>           # 連続ジャンプ回数
 *   <weight:2>               # 重さ
 *   <gravity:0.0045>         # 重力
 *   <friction:0>             # 摩擦
 *   <wall_jump>              # 壁ジャンプ
 *   <dash_speed_x:0.14>      # ダッシュ速度（横方向）
 *   <dash_speed_y:0.03>      # ダッシュ速度（縦方向）
 *   <dash_count:15>          # ダッシュ時間
 *   <dash_delay:30>          # ダッシュ後硬直時間
 *   <dash_mp_cost:0>         # ダッシュに必要なＭＰ
 *   <fall_guard:50>          # 落下ダメージ耐性
 *   <guard_speed:15>         # 防御状態への移行速度
 *   <invincible_time:30>     # 被ダメージ後の無敵時間
 *   <shot_way:1>             # 同時に発射する弾の数
 *   <shot_space:0.2>         # 弾同士の間隔（ラジアン）
 *   <shot_speed:0.07>        # 弾の移動速度
 *   <shot_count:30>          # 弾の寿命
 *   <shot_type:1>            # 子弹的类型
 *   <shot_index:0>           # 弾画像のインデックス
 *   <shot_skill:1>           # 弾のスキル番号
 *   <shot_delay:10>          # 発射後の硬直時間
 *   <shot_se_name:Attack2>   # 弾発射効果音のファイル名
 *   <shot_se_volume:90>      # 弾発射効果音のボリューム
 *   <shot_se_pitch:150>      # 弾発射効果音のピッチ
 *
 * 
 * メモ欄タグ（イベント）:
 * 
 *   <w:0.375>                # 命中确定（从中心到左端和右端的大小）
 *   <h:0.75>                 # 判断（从头到脚的大小）
 *   <enemy:1>                # バトラー（敵番号）
 *   <dead:A>                 # バトラー戦闘不能時セルフスイッチ
 *   <repop:300>              # 再出現までの時間（フレーム）
 *   <lift>                   # リフト属性
 *   <weight:1>               # 重さ
 *   <gravity:0.004>          # 重力
 * 
 * 
 * メモ欄タグ（スキル）:
 * 
 *   <bullet_anime:67>        # 着弾時に再生するアニメーション
 *   <map_through>            # 弾が地形を無視して貫通する
 *   <map_reflect>            # 弾が地形に当たると消えずに跳ね返る
 * 
 *   <time_bomb:6 0 0.2 45 1 0 1>
 *     弾が時間切れで削除される際に新しく弾を発射する。
 *     パラメータはプラグインコマンド『nallShot』の n ～ skillId までを
 *     設定します。
 *
 * 
 * プラグインコマンド:
 * 
 *   actGainHp -1 -5          # プレイヤーに 5 ダメージを与える。
 *   actGainHp 1 -100         # イベント 1 番に 100 ダメージを与える。
 *   actHp 1 2                # イベント 1 番のHPをゲーム変数 2 番に代入。
 *   actForceX -1 0.1         # プレイヤーの X 速度を 0.1 に強制変更。
 *   actForceY 1 -0.15        # イベント 1 番の Y 速度を -0.15 に強制変更。
 *   actForceStop -1          # プレイヤーの速度を 0 に強制変更。
 *   actChangeActor 2         # 操作キャラクターをアクター 2 番に変更。
 *   actHideHpGauge           # 足元HPゲージを隠す
 *   actShowHpGauge           # 足元HPゲージを表示する
 * 
 *   actPopup -1 テキスト #ff0000
 *     プレイヤーに赤色のテキストをポップアップ
 * 
 *   nwayShot eventId n space angle speed count type index skillId
 *     eventId: 发射子弹的事件数（ -1 でプレイヤー）
 *     n:       同时发射的子弹数量
 *     space:   弾同士の間隔（ラジアン）
 *     angle:   发射方向（弧度）
 *     speed:   弾の移動速度
 *     count:   弾の寿命
 *     type:    弾のタイプ
 *     index:   弾画像のインデックス
 *     skillId: 弾のスキル（ダメージ計算用、省略可）
 * 
 *   nwayAim eventId n space angle speed count type index skillId
 *     nway_shot と同様ですが、angleにプレイヤーがいる方向（ラジアン）を
 *     自動的に加算します。angleが 0 なら自機狙いになります。
 *
 *   nallShot eventId n angle speed count type index skillId
 *     向各个方向射击子弹，子弹之间的间隔自动设定。
 *
 *   nallAim eventId n space angle speed count type index skillId
 *     nall_shot 它是一个自我定位的版本。
 */

var Imported = Imported || {};
Imported.TMJumpAction = true;

if (!Imported.TMEventBase) {
  Imported.TMEventBase = true;
  (function() {
  
    //-----------------------------------------------------------------------------
    // Game_Event
    //
  
    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
      _Game_Event_setupPage.call(this);
      if (this._pageIndex >= 0) this.loadCommentParams();
    };

    Game_Event.prototype.loadCommentParams = function() {
      this._commentParams = {};
      var re = /<([^<>:]+)(:?)([^>]*)>/g;
      var list = this.list();
      for (var i = 0; i < list.length; i++) {
        var command = list[i];
        if (command && command.code == 108 || command.code == 408) {
          for (;;) {
            var match = re.exec(command.parameters[0]);
            if (match) {
              this._commentParams[match[1]] = match[2] === ':' ? match[3] : true;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
    };

    Game_Event.prototype.loadTagParam = function(paramName) {
      return this._commentParams[paramName] || this.event().meta[paramName] || null;
    };

  })();
}

function Game_Bullet() {
  this.initialize.apply(this, arguments);
}

(function() {

  var parameters = PluginManager.parameters('TMJumpAction');

  var actGravity = +(parameters['gravity'] || 0.004);
  var actFriction = +(parameters['friction'] || 0.001);
  var actTileMarginTop = +(parameters['tileMarginTop'] || 0.5);
  var actStepsForTurn = +(parameters['stepsForTurn'] || 20);
  var actAllDeadEvent = +(parameters['allDeadEvent'] || 0);
  var actGuardStateId = +(parameters['guardState'] || 2);
  var actGuardMoveRate = +(parameters['guardMoveRate'] || 25);
  var actEventCollapse = JSON.parse(parameters['eventCollapse']);
  var actHpGauge = JSON.parse(parameters['hpGauge']);
  var actFloorDamage = +(parameters['floorDamage'] || 10);
  var actDamageFallRate = +(parameters['damageFallRate'] || 10);
  var actDamageFallHeight = +(parameters['damageFallHeight'] || 5);
  var actFlickWeight = +(parameters['flickWeight'] || 1);
  var actFlickSkill = +(parameters['flickSkill'] || 1);
  var actStageRegion = +(parameters['stageRegion'] || 60);
  var actWallRegion = +(parameters['wallRegion'] || 61);
  var actSlipWallRegion = +(parameters['slipWallRegion'] || 62);
  var actSlipFloorRegion = +(parameters['slipFloorRegion'] || 63);
  var actRoughFloorRegion = +(parameters['roughFloorRegion'] || 64);
  var actMarshFloorRegion = +(parameters['marshFloorRegion'] || 65);
  var actWaterTerrainTag = +(parameters['waterTerrainTag'] || 1);
  var actLevelupPopup = parameters['levelupPopup'];
  var actLevelupAnimationId = +(parameters['levelupAnimationId'] || 0);
  var actAttackToOk = JSON.parse(parameters['attackToOk']);
  var actJumpToCancel = JSON.parse(parameters['jumpToCancel']);
  var actUseEventSeSwim = JSON.parse(parameters['useEventSeSwim']);
  var actSeJump = JSON.parse(parameters['jumpSeParam'] || '{}');
  actSeJump.name = parameters['jumpSe'] || '';
  var actSeDash = JSON.parse(parameters['dashSeParam'] || '{}');
  actSeDash.name = parameters['dashSe'] || '';
  var actSeFlick = JSON.parse(parameters['flickSeParam'] || '{}');
  actSeFlick.name = parameters['flickSe'] || '';
  var actSeSwim = JSON.parse(parameters['swimSeParam'] || '{}');
  actSeSwim.name = parameters['swimSe'] || '';
  var actSeChange = JSON.parse(parameters['changeSeParam'] || '{}');
  actSeChange.name = parameters['changeSe'] || '';
  var actSeCarry = JSON.parse(parameters['carrySeParam'] || '{}');
  actSeCarry.name = parameters['carrySe'] || '';
  var actSeHurl = JSON.parse(parameters['hurlSeParam'] || '{}');
  actSeHurl.name = parameters['hurlSe'] || '';
  var actSeGuard = JSON.parse(parameters['guardSeParam'] || '{}');
  actSeGuard.name = parameters['guardSe'] || '';
  var actPlayerBulletsMax = +(parameters['playerBulletsMax'] || 32);
  var actEnemyBulletsMax = +(parameters['enemyBulletsMax'] || 256);
  var actWeaponSprite = JSON.parse(parameters['weaponSprite']);
  var actAutoDamageSe = JSON.parse(parameters['autoDamageSe']);
  var actBulletNames = [];
  actBulletNames[1] = parameters['bulletTypeName1'];
  actBulletNames[2] = parameters['bulletTypeName2'];
  actBulletNames[3] = parameters['bulletTypeName3'];
  actBulletNames[4] = parameters['bulletTypeName4'];
  var actBulletSizes = parameters['bulletTypeSize'].split(',').map(function(n) {
    return +n / 48;
  });
  actBulletSizes.unshift(0);
  var padButtons = parameters['padButtons'].split(',');
  var padButtonNames = parameters['padButtonNames'].split(',');
  var defaultPadButtons = parameters['defaultPadButtons'].split(',');
  var padConfigCommand = parameters['padConfigCommand'];
  var actStepAnimeConstantA = +(parameters['stepAnimeConstantA'] || 0.1);
  var actStepAnimeConstantB = +(parameters['stepAnimeConstantB'] || 300);

  //-----------------------------------------------------------------------------
  // Input
  //

  if (parameters['attackKey']) {
    Input.keyMapper[parameters['attackKey'].charCodeAt()] = 'attack';
	Input.keyMapper[81] = 'Q';
	Input.keyMapper[87] = 'W';
	Input.keyMapper[69] = 'E';
	Input.keyMapper[82] = 'R';
	Input.keyMapper[65] = 'A';
	Input.keyMapper[83] = 'S';
	Input.keyMapper[68] = 'D';
	Input.keyMapper[70] = 'F';
  }
  if (parameters['jumpKey']) {
    Input.keyMapper[parameters['jumpKey'].charCodeAt()] = 'jump';
  }
  if (parameters['dashKey']) {
    Input.keyMapper[parameters['dashKey'].charCodeAt()] = 'dash';
  }

  //-----------------------------------------------------------------------------
  // ConfigManager
  //

  ConfigManager.getPadButton = function(id) {
    return Input.gamepadMapper[id];
  };
  
  ConfigManager.setPadButton = function(id, code) {
    Input.gamepadMapper[id] = code;
  };

  var _ConfigManager_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function() {
    var config = _ConfigManager_makeData.call(this);
    for (var i = 0; i < 12; i++) {
      config['padButton' + i] = this.getPadButton(i);
    }
    return config;
  };

  var _ConfigManager_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.call(this, config);
    for (var i = 0; i < 12; i++) {
      this.setPadButton(i, this.readPadButton(config, i));
    }
  };

  ConfigManager.readPadButton = function(config, id) {
    return config['padButton' + id] || defaultPadButtons[id];
  };

  //-----------------------------------------------------------------------------
  // Game_System
  //

  var _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this._actHpGaugeVisible = true;
  };

  Game_System.prototype.isActHpGaugeVisible = function() {
    return this._actHpGaugeVisible;
  };

  Game_System.prototype.setActHpGaugeVisible = function(flag) {
    this._actHpGaugeVisible = flag;
  };

  //-----------------------------------------------------------------------------
  // Game_Action
  //

  var _Game_Action_setSubject = Game_Action.prototype.setSubject;
  Game_Action.prototype.setSubject = function(subject) {
    if (!subject.isActor() && !$gameParty.inBattle()) {
      this._subjectEnemyIndex = subject._screenX;
      this._subjectActorId = 0;
    } else {
      _Game_Action_setSubject.call(this, subject);
    }
  };

  var _Game_Action_subject = Game_Action.prototype.subject;
  Game_Action.prototype.subject = function() {
    if (this._subjectActorId == 0 && !$gameParty.inBattle()) {
      return $gameMap.event(this._subjectEnemyIndex).battler();
    } else {
      return _Game_Action_subject.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Battler
  //

  // メンバ変数の初期化
  var _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function() {
    _Game_Battler_initMembers.call(this);
    this._actionResult = new Game_ActionResult();
  };

  // リザルトのクリア
  var _Game_Battler_clearResult = Game_Battler.prototype.clearResult;
  Game_Battler.prototype.clearResult = function() {
    this._actionResult.hpDamage += this._result.hpDamage;
    this._actionResult.missed |= this._result.missed;
    this._actionResult.evaded |= this._result.evaded;
    this._actionResult.critical |= this._result.critical;
    this._actionResult.addedStates = this._actionResult.addedStates.concat(this._result.addedStates);
    this._actionResult.removedStates = this._actionResult.removedStates.concat(this._result.removedStates);
    _Game_Battler_clearResult.call(this);
  };

  // バトル終了処理
  var _Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
  Game_Battler.prototype.onBattleEnd = function() {
    _Game_Battler_onBattleEnd.call(this);
    this.clearActionResult();
  };

  // ジャンプアクションリザルトのクリア
  Game_Battler.prototype.clearActionResult = function() {
    this._actionResult.clear();
  };

  // ダメージ効果音の再生
  Game_Battler.prototype.playDamageSe = function() {
    if (!actAutoDamageSe) return;
    SoundManager.playEnemyDamage();
  };
  
  // 回復効果音の再生
  Game_Battler.prototype.playRecovarySe = function() {
    if (!actAutoDamageSe) return;
    SoundManager.playRecovery();
  };

  // ミス効果音の再生
  Game_Battler.prototype.playMissSe = function() {
    if (!actAutoDamageSe) return;
    SoundManager.playMiss();
  };
  
  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  // ダメージ床から受けるダメージ
  Game_Actor.prototype.basicFloorDamage = function() {
    return actFloorDamage;
  };

  // 何マスの移動で１ターン経過するか
  Game_Actor.prototype.stepsForTurn = function() {
    return actStepsForTurn;
  };

  // 付加されたステートの表示
  var _Game_Actor_showAddedStates = Game_Actor.prototype.showAddedStates;
  Game_Actor.prototype.showAddedStates = function() {
    if ($gameParty.inBattle()) {
      _Game_Actor_showAddedStates.call(this);
    }
  };

  // レベルアップの表示
  var _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
  Game_Actor.prototype.displayLevelUp = function(newSkills) {
    if ($gameParty.inBattle()) {
      _Game_Actor_displayLevelUp.call(this, newSkills);
    } else {
      $gamePlayer.setMapPopup(actLevelupPopup, '#ffffff');
      $gamePlayer.requestAnimation(actLevelupAnimationId);
    }
	AudioManager.playSe('levelup');
  };

  // 解除されたステートの表示
  var _Game_Actor_showRemovedStates = Game_Actor.prototype.showRemovedStates;
  Game_Actor.prototype.showRemovedStates = function() {
    if ($gameParty.inBattle()) {
      _Game_Actor_showRemovedStates.call(this);
    }
  };

  // アクター（＋装備、ステート）のタグからパラメータ（数値）をロード
  Game_Actor.prototype.loadTagParam = function(param_name, default_value) {
    var result = +(this.actor().meta[param_name] || default_value);
    var equips = this.equips().concat(this.states());
    for (var i = 0; i < equips.length; i++) {
      if (equips[i] && equips[i].meta[param_name]) {
        result += +equips[i].meta[param_name];
      }
    }
    return result;
  };

  // アクター（＋装備、ステート）のタグからパラメータ（真偽値）をロード
  Game_Actor.prototype.loadTagBool = function(param_name) {
    var equips = this.equips().concat(this.states(), this.actor());
    for (var i = 0; i < equips.length; i++) {
      if (equips[i] && equips[i].meta[param_name]) return true;
    }
    return false;
  };

  // アクター（＋装備、ステート）のタグからパラメータ（文字列）をロード
  Game_Actor.prototype.loadTagString = function(param_name, default_value) {
    var equips = this.states().concat(this.equips(), this.actor());
    for (var i = equips.length - 1; i >= 0; i--) {
      if (equips[i] && equips[i].meta[param_name]) {
        return equips[i].meta[param_name];
      }
    }
    return default_value;
  };

  // ダメージ効果音の再生
  Game_Actor.prototype.playDamageSe = function() {
    if (!actAutoDamageSe) return;
    SoundManager.playActorDamage();
  };
  
  //-----------------------------------------------------------------------------
  // Game_Party
  //

  Game_Party.prototype.frontSlideActor = function() {
    for (var i = 0; i < this.size(); i++) {
      this._actors.push(this._actors.shift());
      if (!this.leader().isDead()) break;
    }
    $gamePlayer.refresh();
  };

  Game_Party.prototype.backSlideActor = function() {
    for (var i = 0; i < this.size(); i++) {
      this._actors.unshift(this._actors.pop());
      if (!this.leader().isDead()) break;
    }
    $gamePlayer.refresh();
  };

  Game_Party.prototype.sortActor = function(actorId) {
    for (var i = 0; i < this.size(); i++) {
      this._actors.push(this._actors.shift());
      if (this._actors[0] === actorId) break;
    }
    $gamePlayer.refresh();
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  //

  // セットアップ
  var _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this.setupBullets();
  };

  // 弾のセットアップ
  Game_Map.prototype.setupBullets = function() {
    this._playerBullets = [];
    this._alivePlayerBullets = [];
    this._blankPlayerBullets = [];
    for (var i = 0; i < actPlayerBulletsMax; i++) {
      this._playerBullets.push(new Game_Bullet());
      this._blankPlayerBullets.push(i);
    }
    this._enemyBullets = [];
    this._aliveEnemyBullets = [];
    this._blankEnemyBullets = [];
    for (var i = 0; i < actEnemyBulletsMax; i++) {
      this._enemyBullets.push(new Game_Bullet());
      this._blankEnemyBullets.push(i);
    }
  };

  // 自機弾を返す
  Game_Map.prototype.playerBullets = function() {
    return this._playerBullets;
  };

  // 敵機弾を返す
  Game_Map.prototype.enemyBullets = function() {
    return this._enemyBullets;
  };

  // 乗り物は作らない
  Game_Map.prototype.createVehicles = function() {
    this._vehicles = [];
  };

  // 壁ジャンプが可能か判定する
  Game_Map.prototype.canWallJump = function(x, y, d) {
    if (!this.isValid(x, y)) return false;
    if (this.tileId(x, y, 5) === actSlipWallRegion) return false;
    return !this.isPassable(x, y, d);
  };

  // 通行チェック
  Game_Map.prototype.checkPassage = function(x, y, bit) {
    if (!this.isValid(x, y)) return false;
    var rg = this.tileId(x, y, 5);
    if (rg === actWallRegion || rg === actSlipWallRegion) return false;
    var flags = this.tilesetFlags();
    var tiles = this.allTiles(x, y);
    for (var i = 0; i < tiles.length; i++) {
      var flag = flags[tiles[i]];
      if (rg === actStageRegion) flag |= 1;
      if ((flag & 0x10) !== 0) continue;      // [*] No effect on passage
      if ((flag & bit) === 0) return true;    // [o] Passable
      if ((flag & bit) === bit) return false; // [x] Impassable
    }
    return false;
  };

  // 弾の通行チェック
  Game_Map.prototype.checkPassageBullet = function(x, y) {
    if (!this.isValid(x, y)) return false;
    var rg = this.tileId(x, y, 5);
    if (rg === actWallRegion || rg === actSlipWallRegion) return false;
    var flags = this.tilesetFlags();
    var tiles = this.layeredTiles(x, y);
    for (var i = 0; i < tiles.length; i++) {
      var flag = flags[tiles[i]];
      if ((flag & 0x10) !== 0) continue;
      if ((flag & 0x0f) !== 0x0f) return true;
      if ((flag & 0x0f) !== 0) return false;
    }
    return false;
  };

  // フレーム更新
  var _Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function(sceneActive) {
    _Game_Map_update.call(this, sceneActive);
    this.updateBullets();
  };

  // 弾の更新
  Game_Map.prototype.updateBullets = function() {
    for (var i = this._alivePlayerBullets.length - 1; i >= 0; i--) {
      var bi = this._alivePlayerBullets[i];
      if (!this._playerBullets[bi].update()) {
        this._alivePlayerBullets.splice(i, 1);
        this._blankPlayerBullets.push(bi);
      }
    }
    for (var i = this._aliveEnemyBullets.length - 1; i >= 0; i--) {
      var bi = this._aliveEnemyBullets[i];
      if (!this._enemyBullets[bi].update()) {
        this._aliveEnemyBullets.splice(i, 1);
        this._blankEnemyBullets.push(bi);
      }
    }
  };

  // 弾の追加
  Game_Map.prototype.addBullet = function(x, y, z, vx, vy, angle, count, type, index, enemyFlag, skillId, owner) {
    if (enemyFlag) {
      if (this._blankEnemyBullets.length > 0) {
        var bi = this._blankEnemyBullets.shift();
        this._enemyBullets[bi].setup(x, y, z, vx, vy, angle, count, type, index, true, skillId, owner);
        this._aliveEnemyBullets.push(bi);
      }
    } else {
      if (this._blankPlayerBullets.length > 0) {
        var bi = this._blankPlayerBullets.shift();
        this._playerBullets[bi].setup(x, y, z, vx, vy, angle, count, type, index, false, skillId, owner);
        this._alivePlayerBullets.push(bi);
      }
    }
  };

  // 自機弾の全削除
  Game_Map.prototype.clearPlayerBullets = function() {
    for (var i = 0; i < this._alivePlayerBullets.length; i++) {
      this._playerBullets[this._alivePlayerBullets[i]].erase();
    }
    this._blankPlayerBullets.concat(this._alivePlayerBullets);
    this._alivePlayerBullets = [];
  };

  // 敵機弾の全削除
  Game_Map.prototype.clearEnemyBullets = function() {
    for (var i = 0; i < this._aliveEnemyBullets.length; i++) {
      this._enemyBullets[this._aliveEnemyBullets[i]].erase();
    }
    this._blankEnemyBullets.concat(this._aliveEnemyBullets);
    this._aliveEnemyBullets = [];
  };

  // すべての弾を削除
  Game_Map.prototype.clearAllBullets = function() {
    this.clearPlayerBullets();
    this.clearEnemyBullets();
  };

  //-----------------------------------------------------------------------------
  // Game_Bullet
  //

  // 初期化
  Game_Bullet.prototype.initialize = function() {
    this._opacity = 0;
  };

  // セットアップ
  Game_Bullet.prototype.setup = function(x, y, z, vx, vy, angle, count, type, index, enemyFlag, skillId, owner) {
    this._opacity = 255;
    this._x = x;
    this._y = y;
    this._z = z;
    this._vx = vx;
    this._vy = vy;
    this._angle = angle;
    this._count = count;
    this._type = type;
    this._characterName = actBulletNames[this._type];
    this._characterIndex = index;
    this._enemyFlag = enemyFlag;
    this._skillId = skillId;
    this._owner = owner;
    this._collideSize = actBulletSizes[this._type];
    this._mapCollide = !$dataSkills[this._skillId].meta['map_through'];
    this._gravity = +$dataSkills[this._skillId].meta['gravity'];
  };

  // 存在状態判定
  Game_Bullet.prototype.isExist = function() {
    return this._characterName !== '';
  };

  // 敵機の弾判定
  Game_Bullet.prototype.isEnemy = function() {
    return this._enemyFlag;
  };

  // 弾タイプの取得
  Game_Bullet.prototype.type = function() {
    return this._type;
  };

  // 角度の取得
  Game_Bullet.prototype.angle = function() {
    return this._angle;
  };

  // 画面 X 座標の取得
  Game_Bullet.prototype.screenX = function() {
    var tw = $gameMap.tileWidth();
    return Math.round($gameMap.adjustX(this._x) * tw);
  };

  // 画面 Y 座標の取得
  Game_Bullet.prototype.screenY = function() {
    var th = $gameMap.tileHeight();
	if($dataWeapons[3002].wtypeId==16){
    return Math.round($gameMap.adjustY(this._y-0.08) * th);}
	else{
	return Math.round($gameMap.adjustY(this._y) * th)	
	}
  };

  // キャラクターがいる方向（角度）を取得
  Game_Bullet.prototype.angleToCharacter = function(character) {
    return Math.atan2(character._realY - character.collideH / 2 - this._y, character._realX - this._x);
  };

  // プレイヤーがいる方向（角度）を取得
  Game_Bullet.prototype.angleToPlayer = function() {
    return this.angleToCharacter($gamePlayer);
  };

  // フレーム更新
  Game_Bullet.prototype.update = function() {
    this._x += this._vx;
    this._y += this._vy;
    this._count--;
    if (this._count <= 0) {
      if ($dataSkills[this._skillId].meta['time_bomb']) this.timeBomb();
      this.erase();
    } else if (this.updateCollide()) {
     if($dataWeapons[3002].wtypeId >15){this.erase()}
    }
    if (this._gravity) this._vy = Math.min(this._vy + this._gravity, 0.6);
    return this.isExist();
  };

  // 削除
  Game_Bullet.prototype.erase = function() {
    this._characterName = '';
    this._opacity = 0;
  };

  // 地形反射
  Game_Bullet.prototype.reflect = function() {
    this._x -= this._vx;
    if (this.collideMap()) {
      this._y -= this._vy;
      this._vy = 0 - this._vy;
    } else {
      this._y -= this._vy;
      this._vx = 0 - this._vx;
    }
  };

  // 時限爆弾
  Game_Bullet.prototype.timeBomb = function() {
    var a = $dataSkills[this._skillId].meta['time_bomb'].split(' ').map(Number);
    var space = Math.PI * 2 / a[0];
    for (var i = 0; i < a[0]; i++) {
      $gameMap.addBullet(this._x, this._y, 200 + i, Math.cos(a[1]) * a[2],
                         Math.sin(a[1]) * a[2], a[1], a[3], a[4], a[5],
                         this._enemyFlag, a[6], this._owner);
      a[1] += space;
    }
  };

  // 接触判定
  Game_Bullet.prototype.updateCollide = function() {
    if (this._mapCollide && this.collideMap()) {
      if ($dataSkills[this._skillId].meta['map_reflect']) {   // 弾反射の処理
        this.reflect();
        return false;
      } else {
        return true;
      }
    }
    if (this._enemyFlag) {
      if (this.collideCharacter($gamePlayer)) {
        this.executeDamage($gamePlayer);
		gameplayerdamage = 1
		bouncex = (this._x-$gamePlayer._realX)/(Math.abs(this._x-$gamePlayer._realX))*-0.06
		bouncey = -0.06
        return true;
      }
    } else {
      var targets = $gameMap.events();
      for (i = 0; i < targets.length; i++) {
        var character = targets[i];
		if (character._priorityType == 0 && character._enemyId > 0){
		character._priorityType = 1
		}
        if (this.collideCharacter(character)) {
			gameplayerdamage =0
          this.executeDamage(character);
		  if (character._enemyId > 0){character._priorityType = 0}
          return true;

        } 
		if (character._enemyId > 0){character._priorityType = 0}
      }
    }
    return false;
  };

  // 弾によるダメージ処理
  Game_Bullet.prototype.executeDamage = function(character) {
    if (character.isBattler() && this._owner.isBattler() && !character.isInvincible()) {
      character.applySkill(this._owner, this._skillId);
      if (character.battler()._result.isHit()) {
        character.setupInvincible();
        var animeId = $dataSkills[this._skillId].meta.bulletAnime;
        if (!animeId) animeId = $dataSkills[this._skillId].meta.bullet_anime;
        if (animeId) character.requestAnimation(+animeId);
      }
    }
  };

  // キャラクターと接触しているかどうかを返す
  Game_Bullet.prototype.collideCharacter = function(character) {
    if (!character.isNormalPriority()) return false;
    return this._x - this._collideSize <= character._realX + character._collideW &&
           this._x + this._collideSize >= character._realX - character._collideW &&
           this._y - this._collideSize <= character._realY &&
           this._y + this._collideSize >= character._realY - character._collideH;
  };

  // マップと接触しているかどうかを返す
  Game_Bullet.prototype.collideMap = function() {
    var x = Math.floor(this._x);
    var y = Math.floor(this._y);
    return !$gameMap.checkPassageBullet(x, y);
  }

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //

  // メンバ変数の初期化
  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
	BlinkEye = 0
	Checksx = 0
	gameplayerdamage =0
	criticalappear = 0
	criticaldistance = 0
	Hurtcount = 0
	menucancelbutton = 1
	//if($gameVariables.value(1) ==0){
	//TH.setSaveTitle("'等級' + $gameActors._data[1]._level+' - '+$gameMap.displayName().split(',')[$gameVariables.value(1)]", true)}else{
	//TH.setSaveTitle("$gameMap.displayName().split(',')[$gameVariables.value(1)]", true)
	//}
	LastItemTab = 1
	LastItem1Page = 1
	LastItem2Page = 1
	LastItem3Page = 1
	LastItem4Page = 1
	LastItem5Page = 1
	ItemSortBtn = 0
	DetailHeight = 0
	DBH1 = 0
	DBH2 = 0
	DBH4 = 0
	DBH3 = 0
	DBH5 = 0
	DBH6 = 0
	DBH7 = 0
	DBH8 = 0
	DBH9 = 0
	DBH10 = 0
	DBH11 = 0
	DBH12 = 0
	DBH14 = 0
	DBH13 = 0
	DBH15 = 0
	DBH16 = 0
	DBH17 = 0
	DBH18 = 0
	NoticeSave = 0
	Galv.CACHE.load('characters','!$alert%(4)')
Galv.CACHE.load('characters','!$jumping%(4)')
Galv.CACHE.load('characters','!$walking%(4)')
Galv.CACHE.load('characters','!$standing%(4)')
Galv.CACHE.load('characters','!$onfloor%(1)')
Galv.CACHE.load('characters','!$SwingA%(3)')
Galv.CACHE.load('characters','!$SwingB%(3)')
Galv.CACHE.load('characters','!$SwingC%(3)')
Galv.CACHE.load('characters','!$StabA%(2)')
Galv.CACHE.load('characters','!$StabB%(2)')
Galv.CACHE.load('characters','!$StabC%(3)')
	ActionCharacter=1
	CanAttackCheck = 0
	directionbeforedead = 0
	alertcount = 0
	CurrentX = 0.5
	CurrentY = 0.99
    this._needsRefresh = false;
    this._mapPopups = [];
    this._vx = 0;
    this._vy = 0;
    this._vxPlus = 0;
    this._lastY = 0;
    this._lastSwim = false;
    this._collideW = 0.375;
    this._collideH = 0.75;
    this._collideIds = [];
    this._landingObject = null;
    this._landingRegion = 0;
    this._ladder = false;
    this._lift = false;
    this._lockCount = 0;
    this._moveCount = 0;
    this._jumpInput = 0;
    this._dashCount = 0;
    this._friction = 0;
    this._moveSpeed = 0.05;
    this._jumpSpeed = 0.14;
    this._swimSpeed = 0.02;
    this._dashSpeedX = 0.1;
    this._dashSpeedY = 0.03;
    this._ladderSpeed = 0.04;
    this._accele = 0.003
    this._ladderAccele = 0.003;
    this._jumpInputTime = 0;
    this._dashCountTime = 30;
    this._swimJump = 0.1;
    this._mulchJump = 1;
    this._weight = 0;
    this._gravity = actGravity;
    this._fallGuard = 0;
    this._invincibleCount = 0;
    this._invincibleTime = 30;
    this._carried = false;
    this._carryingObject = null;
	CheckBullet = 0
	ActionCoolDown = 0
	ItemPriorityResort = 0
  };

  // バトラーの取得
  Game_CharacterBase.prototype.battler = function() {
    return null;
  };

  // バトラーが設定されているか
  Game_CharacterBase.prototype.isBattler = function() {
    return this.battler() !== null;
  };

  // 移動状態判定
  Game_CharacterBase.prototype.isMoving = function() {
    return this._moveCount > 0;
  };

  // ダッシュ状態判定
  Game_CharacterBase.prototype.isDashing = function() {
    return this._dashCount > 0;
  };

  // 地面に立っているか
  Game_CharacterBase.prototype.isLanding = function() {
    return this._landingObject !== null;
  };

  // およぎ状態判定
  Game_CharacterBase.prototype.isSwimming = function() {
    return this.terrainTag() === actWaterTerrainTag;
  };

  // 持ち上げられ状態判定
  Game_CharacterBase.prototype.isCarried = function() {
    return this._carried;
  };

  // ガード状態判定
  Game_CharacterBase.prototype.isGuarding = function() {
    if (!this.isBattler()) return false;
    return this.battler().isStateAffected(actGuardStateId);
  };

  // ロック状態判定
  Game_CharacterBase.prototype.isLocking = function() {
    return this._lockCount > 0;
  };

  // 自分の重さで相手をはじき飛ばせるかチェック
  Game_CharacterBase.prototype.checkFlickWeight = function(weight) {
    return this._weight >= weight + actFlickWeight;
  };

  // 被弾後の無敵状態判定
  Game_CharacterBase.prototype.isInvincible = function() {
    return this._invincibleCount > 0;
  };

  // リフレッシュフラグを立てる
  Game_CharacterBase.prototype.requestRefresh = function() {
    this._needsRefresh = true;
  };

  // 移動速度のセット
  Game_CharacterBase.prototype.setMoveSpeed = function(moveSpeed) {
    this._moveSpeed = moveSpeed / 100 + 0.02;
  };

  // 無敵状態のセット
  Game_CharacterBase.prototype.setupInvincible = function() {
    this._invincibleCount = this._invincibleTime;
	if( alertcount == 1){
	clearTimeout(alerttime)
	alertcount = 0}
	alertcount = 1
	alerttime = setTimeout( function () {
	alertcount = 0
	}, 8000);
	
  };

  // アニメーション間隔
  Game_CharacterBase.prototype.animationWait = function() {
    return (actStepAnimeConstantA - this._moveSpeed - (this.isDashing() ? 0.01 : 0)) * actStepAnimeConstantB;
  };

  // フレーム更新
  Game_CharacterBase.prototype.update = function() {
	if(NoAction == 1){
	$gamePlayer._characterName = '!$die%(4)'
	$gamePlayer._moveSpeed = +0.015
	}
	  
	if(Input.isPressed('attack')||Input.isPressed('up')||Input.isPressed('down')||Input.isPressed('left')||Input.isPressed('right')||Input.isPressed('Q')||Input.isPressed('W')||Input.isPressed('E')||Input.isPressed('R')||
	Input.isPressed('A')||Input.isPressed('S')||Input.isPressed('D')||Input.isPressed('F')||Input.isPressed('jump')||Input.isPressed('ok')){
	if($gameVariables.value(9)>51||$gameVariables.value(10)>1||$gameVariables.value(11)>201||$gameVariables.value(12)>251||$gameVariables.value(401)>401){
	setTimeout( function () {
	$gameTemp.reserveCommonEvent(127)
	}, 100);	
	
	
	}}
	  
	  
	 
	  	if ($gamePlayer._vy > 0.0045){
			$gamePlayer._jumpCount = 0
		}
   if (CheckBullet == 0){
  if (ActionCharacter == 6 && $gamePlayer._pattern==2 && $gamePlayer._animationCount == 1){
	  if($gamePlayer._direction == 4){
	  $gamePlayer.requestAnimation(($dataWeapons[3002].meta.AniSwingA))}else {
	  $gamePlayer.requestAnimation(Number($dataWeapons[3002].meta.AniSwingA)+1)    
  }}
  if (ActionCharacter == 7 && $gamePlayer._pattern==2 && $gamePlayer._animationCount == 1){
	  if($gamePlayer._direction == 4){
	  $gamePlayer.requestAnimation(($dataWeapons[3002].meta.AniSwingB))}else {
	  $gamePlayer.requestAnimation(Number($dataWeapons[3002].meta.AniSwingB)+1)    
  }}
  if (ActionCharacter == 8 && $gamePlayer._pattern==2 && $gamePlayer._animationCount == 1){
	  if($gamePlayer._direction == 4){
	  $gamePlayer.requestAnimation(($dataWeapons[3002].meta.AniSwingC))}else {
	  $gamePlayer.requestAnimation(Number($dataWeapons[3002].meta.AniSwingC)+1)     
  }}
  if (ActionCharacter == 9 && $gamePlayer._pattern==2 && $gamePlayer._animationCount == 1){
	  if($gamePlayer._direction == 4){
	  $gamePlayer.requestAnimation(($dataWeapons[3002].meta.AniStabC))}else {
	  $gamePlayer.requestAnimation(Number($dataWeapons[3002].meta.AniStabC)+1)     
  }}
  if (ActionCharacter == 10 && $gamePlayer._pattern==1 && $gamePlayer._animationCount == 1){
	  if($gamePlayer._direction == 4){
	  $gamePlayer.requestAnimation(($dataWeapons[3002].meta.AniStabA))}else {
	  $gamePlayer.requestAnimation(Number($dataWeapons[3002].meta.AniStabA)+1)     
  }}
  if (ActionCharacter == 11 && $gamePlayer._pattern==1 && $gamePlayer._animationCount == 1){
	  if($gamePlayer._direction == 4){
	  $gamePlayer.requestAnimation(($dataWeapons[3002].meta.AniStabB))}else {
	  $gamePlayer.requestAnimation(Number($dataWeapons[3002].meta.AniStabB)+1)     
  }}

  if (ActionCharacter == 21 && $gamePlayer._pattern==2 && $gamePlayer._animationCount == 1){
	  if($gamePlayer._direction == 4){
	  $gamePlayer.requestAnimation(($dataWeapons[3002].meta.AniShootA))}else {
	  $gamePlayer.requestAnimation(Number($dataWeapons[3002].meta.AniShootA)+1)     
  }}
  if (ActionCharacter == 22 && $gamePlayer._pattern==2 && $gamePlayer._animationCount == 1){
	  if($gamePlayer._direction == 4){
	  $gamePlayer.requestAnimation(($dataWeapons[3002].meta.AniShootB))}else {
	  $gamePlayer.requestAnimation(Number($dataWeapons[3002].meta.AniShootB)+1)     
  }}
  }
  
  if (NoAction == 0&&(ActionCharacter < 6||((ActionCharacter > 5&&ActionCharacter < 10) && $gamePlayer._pattern==2 && $gamePlayer._animationCount > ($dataWeapons[3002].meta.WeaponSpeedX/80*35-1))||(ActionCharacter > 20 && $gamePlayer._pattern==2 && $gamePlayer._animationCount > ($dataWeapons[3002].meta.WeaponSpeedX/80*35-1))||((ActionCharacter > 9&&ActionCharacter < 12) && $gamePlayer._pattern==1 && $gamePlayer._animationCount > ($dataWeapons[3002].meta.WeaponSpeedX/80*35-1)))){
   if (((Input.isPressed('attack')||
   ($gameVariables.value(49)<2000&&(Input.isPressed('Q')&& $dataSkills[$gameVariables.value(49)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(49)].mpCost))||
   ($gameVariables.value(50)<2000&&(Input.isPressed('W')&& $dataSkills[$gameVariables.value(50)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(50)].mpCost))||
   ($gameVariables.value(51)<2000&&(Input.isPressed('E')&& $dataSkills[$gameVariables.value(51)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(51)].mpCost))||
   ($gameVariables.value(52)<2000&&(Input.isPressed('R')&& $dataSkills[$gameVariables.value(52)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(52)].mpCost))||
   ($gameVariables.value(53)<2000&&(Input.isPressed('A')&& $dataSkills[$gameVariables.value(53)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(53)].mpCost))||
   ($gameVariables.value(54)<2000&&(Input.isPressed('S')&& $dataSkills[$gameVariables.value(54)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(54)].mpCost))||
   ($gameVariables.value(55)<2000&&(Input.isPressed('D')&& $dataSkills[$gameVariables.value(55)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(55)].mpCost))||
   ($gameVariables.value(56)<2000&&(Input.isPressed('F')&& $dataSkills[$gameVariables.value(56)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(56)].mpCost)) )&& ActionCoolDown == 0)&& $gamePlayer._direction !== 8){
	  $gamePlayer._pattern=0;
	  $gamePlayer._animationCount=0;
		if( alertcount == 1){
		clearTimeout(alerttime)
		alertcount = 0}
		alertcount = 1
		
	alerttime = setTimeout( function () {
	alertcount = 0
	}, 8000);
	  if($dataWeapons[3002].wtypeId==16){
	  ActionCharacter = Math.randomInt(2)+21
	  if (ActionCharacter == 21){
	  $gamePlayer._characterName = '!$ShotA%(3)';}
	  if (ActionCharacter == 22){
	  $gamePlayer._characterName = '!$ShotB%(3)';}
	  }else{
	  if($dataWeapons[3002].wtypeId==18){
	  ActionCharacter = Math.randomInt(3)+6}else
	  {ActionCharacter = Math.randomInt(6)+6}
	  if (ActionCharacter == 6){
	  $gamePlayer._characterName = '!$SwingA%(3)';}
	  if (ActionCharacter == 7){
	  $gamePlayer._characterName = '!$SwingB%(3)';}
	  if (ActionCharacter == 8){
	  $gamePlayer._characterName = '!$SwingC%(3)';}
	  if (ActionCharacter == 9){
	  $gamePlayer._characterName = '!$StabC%(3)';}
	  if (ActionCharacter == 10){
	  $gamePlayer._characterName = '!$StabA%(2)';}
	  if (ActionCharacter == 11){
	  $gamePlayer._characterName = '!$StabB%(2)';}
	  if (ActionCharacter == 12){
	  $gamePlayer._characterName = '!$2SwingA%(3)';}
	  if (ActionCharacter == 13){
	  $gamePlayer._characterName = '!$2SwingB%(3)';}
	  if (ActionCharacter == 14){
	  $gamePlayer._characterName = '!$2SwingC%(3)';}
	  if (ActionCharacter == 15){
	  $gamePlayer._characterName = '!$2SwingD%(3)';}
	  if (ActionCharacter == 16){
	  $gamePlayer._characterName = '!$2SwingE%(3)';}
	  if (ActionCharacter == 17){
	  $gamePlayer._characterName = '!$2StabA%(2)';}
	  if (ActionCharacter == 18){
	  $gamePlayer._characterName = '!$2StabB%(2)';}
	  }
	  } else if (
   ($gameVariables.value(49)<2000&&(Input.isPressed('Q')&& $gameVariables.value(68)==0 && $dataSkills[$gameVariables.value(49)].meta.type > 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(49)].mpCost && ActionCoolDown == 0))){
	$gamePlayer.applySkill($gamePlayer, $gameVariables.value(49)) 
	 $gameTemp.reserveCommonEvent($dataSkills[$gameVariables.value(49)].effects["0"].dataId)
	 $gameActors._data[1]._mp-=$dataSkills[$gameVariables.value(49)].mpCost
	 ActionCoolDown = 60
	 $gameVariables.setValue(68,1)
	 if($dataSkills[$gameVariables.value(49)].meta.cooldown > 0){
		 
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-0",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *0);	

	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-1",0,962,630,100,100,366,0)
	
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *1);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-2",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *2);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-3",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *3);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-4",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *4);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-5",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *5);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-6",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *6);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-7",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *7);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-8",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *8);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-9",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *9);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-10",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *10);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-11",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *11);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-12",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *12);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-13",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *13);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-14",0,962,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *14);
	
	setTimeout( function () {
	$gameScreen.showPicture(471,"CoolTime-15",0,962,630,100,100,366,0)
	$gameVariables.setValue(68,0)
	}, $dataSkills[$gameVariables.value(49)].meta.cooldown *1000 /15 *15);
	
	 }
	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	
	} else if (
   ($gameVariables.value(49)>2000&&(Input.isPressed('Q') && ActionCoolDown == 0))){
	$gameSystem.setAutoMode(false)
	for (var id in $gameParty._items) {
	if ($dataItems[id].sortPriority == $gameVariables.value(49)){
	if ($dataItems[id].consumable == true){
	if($gameParty._items[id] == 1){
	$gameVariables.setValue(102,$gameVariables.value(102)-1);ItemPriorityResort = 1;Idcheckpriority = $dataItems[id].sortPriority;$dataItems[id].sortPriority=0}
	item = $dataItems[id];actor = $gamePlayer.actor();actor.useItem(item)
	var action = new Game_Action(actor);action.setItemObject(item);action.apply($gamePlayer.actor());$gamePlayer.requestAnimation(item.animationId);
	action.applyGlobal();
	}}}if(ItemPriorityResort == 1){
	for (var id in $gameParty._items) {if ($dataItems[id].consumable == true){if($dataItems[id].sortPriority>Idcheckpriority){
	$dataItems[id].sortPriority-=1
	$gameVariables.setValue(49,1)
	$gameScreen.erasePicture(32)
	}}}}
	 
	 ActionCoolDown = 60
	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	$gameSystem.setAutoMode(true)
	 } else if (
   ($gameVariables.value(50)<2000&&(Input.isPressed('W')&& $dataSkills[$gameVariables.value(50)].meta.type > 1 && $gameVariables.value(69) == 0 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(50)].mpCost && ActionCoolDown == 0))){
	$gamePlayer.applySkill($gamePlayer, $gameVariables.value(50)) 
	 $gameTemp.reserveCommonEvent($dataSkills[$gameVariables.value(50)].effects["0"].dataId)
	 $gameActors._data[1]._mp-=$dataSkills[$gameVariables.value(50)].mpCost
	 ActionCoolDown = 60
	 
	 $gameVariables.setValue(69,1)
	 if($dataSkills[$gameVariables.value(50)].meta.cooldown > 0){
		 
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-0",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *0);	

	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-1",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *1);	
	
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-2",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *2);

	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-3",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *3);	
	
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-4",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *4);	
	
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-5",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *5);	
	
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-6",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *6);	
	
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-7",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *7);	
	
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-8",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *8);	
	
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-9",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *9);	
	
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-10",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *10);	
	
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-11",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *11);	
	
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-12",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *12);	
	
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-13",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *13);	
	
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-14",0,997,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *14);	
	
	setTimeout( function () {
	$gameScreen.showPicture(472,"CoolTime-15",0,997,630,100,100,366,0)
	$gameVariables.setValue(69,0)
	}, $dataSkills[$gameVariables.value(50)].meta.cooldown *1000 /15 *15);
	
		
	 }
	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	
	} else if (
   ($gameVariables.value(50)>2000&&(Input.isPressed('W') && ActionCoolDown == 0))){
	$gameSystem.setAutoMode(false)
	for (var id in $gameParty._items) {
	if ($dataItems[id].sortPriority == $gameVariables.value(50)){
	if ($dataItems[id].consumable == true){
	if($gameParty._items[id] == 1){
	$gameVariables.setValue(102,$gameVariables.value(102)-1);ItemPriorityResort = 1;Idcheckpriority = $dataItems[id].sortPriority;$dataItems[id].sortPriority=0}
	item = $dataItems[id];actor = $gamePlayer.actor();actor.useItem(item)
	var action = new Game_Action(actor);action.setItemObject(item);action.apply($gamePlayer.actor());$gamePlayer.requestAnimation(item.animationId);
	action.applyGlobal();
	}}}if(ItemPriorityResort == 1){
	for (var id in $gameParty._items) {if ($dataItems[id].consumable == true){if($dataItems[id].sortPriority>Idcheckpriority){
	$dataItems[id].sortPriority-=1
	$gameVariables.setValue(50,1)
	$gameScreen.erasePicture(33)
	}}}}
	 
	 ActionCoolDown = 60
	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	$gameSystem.setAutoMode(true)
	 } else if (
   ($gameVariables.value(51)<2000&&(Input.isPressed('E')&& $dataSkills[$gameVariables.value(51)].meta.type > 1 && $gameVariables.value(70) == 0  && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(51)].mpCost && ActionCoolDown == 0))){
	$gamePlayer.applySkill($gamePlayer, $gameVariables.value(51)) 
	 $gameTemp.reserveCommonEvent($dataSkills[$gameVariables.value(51)].effects["0"].dataId)
	 $gameActors._data[1]._mp-=$dataSkills[$gameVariables.value(51)].mpCost
	 ActionCoolDown = 60
	 
	 $gameVariables.setValue(70,1)
	 if($dataSkills[$gameVariables.value(51)].meta.cooldown > 0){
		 
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-0",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *0);	

	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-1",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *1);	
	
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-2",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *2);

	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-3",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *3);	
	
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-4",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *4);	
	
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-5",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *5);	
	
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-6",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *6);	
	
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-7",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *7);	
	
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-8",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *8);	
	
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-9",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *9);	
	
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-10",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *10);	
	
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-11",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *11);	
	
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-12",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *12);	
	
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-13",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *13);	
	
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-14",0,1032,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *14);	
	
	setTimeout( function () {
	$gameScreen.showPicture(473,"CoolTime-15",0,1032,630,100,100,366,0)
	$gameVariables.setValue(70,0)
	}, $dataSkills[$gameVariables.value(51)].meta.cooldown *1000 /15 *15);
	
		
	 }
	 	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	
	} else if (
   ($gameVariables.value(51)>2000&&(Input.isPressed('E') && ActionCoolDown == 0))){
	$gameSystem.setAutoMode(false)
	for (var id in $gameParty._items) {
	if ($dataItems[id].sortPriority == $gameVariables.value(51)){
	if ($dataItems[id].consumable == true){
	if($gameParty._items[id] == 1){
	$gameVariables.setValue(102,$gameVariables.value(102)-1);ItemPriorityResort = 1;Idcheckpriority = $dataItems[id].sortPriority;$dataItems[id].sortPriority=0}
	item = $dataItems[id];actor = $gamePlayer.actor();actor.useItem(item)
	var action = new Game_Action(actor);action.setItemObject(item);action.apply($gamePlayer.actor());$gamePlayer.requestAnimation(item.animationId);
	action.applyGlobal();
	}}}if(ItemPriorityResort == 1){
	for (var id in $gameParty._items) {if ($dataItems[id].consumable == true){if($dataItems[id].sortPriority>Idcheckpriority){
	$dataItems[id].sortPriority-=1
	$gameVariables.setValue(51,1)
	$gameScreen.erasePicture(34)
	}}}}
	 
	 ActionCoolDown = 60
	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	$gameSystem.setAutoMode(true)
	 } else if (
   ($gameVariables.value(52)<2000&&(Input.isPressed('R')&& $dataSkills[$gameVariables.value(52)].meta.type > 1 && $gameVariables.value(71) == 0   && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(52)].mpCost && ActionCoolDown == 0))){
	$gamePlayer.applySkill($gamePlayer, $gameVariables.value(52)) 
	 $gameTemp.reserveCommonEvent($dataSkills[$gameVariables.value(52)].effects["0"].dataId)
	 $gameActors._data[1]._mp-=$dataSkills[$gameVariables.value(52)].mpCost
	 ActionCoolDown = 60
	 
	 $gameVariables.setValue(71,1)
	 if($dataSkills[$gameVariables.value(52)].meta.cooldown > 0){
		 
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-0",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *0);	

	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-1",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *1);	
	
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-2",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *2);

	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-3",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *3);	
	
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-4",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *4);	
	
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-5",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *5);	
	
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-6",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *6);	
	
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-7",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *7);	
	
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-8",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *8);	
	
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-9",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *9);	
	
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-10",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *10);	
	
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-11",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *11);	
	
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-12",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *12);	
	
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-13",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *13);	
	
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-14",0,1067,630,100,100,366,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *14);	
	
	setTimeout( function () {
	$gameScreen.showPicture(474,"CoolTime-15",0,1067,630,100,100,366,0)
	$gameVariables.setValue(71,0)
	}, $dataSkills[$gameVariables.value(52)].meta.cooldown *1000 /15 *15);
	
		
	 }
	 	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	
	} else if (
   ($gameVariables.value(52)>2000&&(Input.isPressed('R') && ActionCoolDown == 0))){
	$gameSystem.setAutoMode(false)
	for (var id in $gameParty._items) {
	if ($dataItems[id].sortPriority == $gameVariables.value(52)){
	if ($dataItems[id].consumable == true){
	if($gameParty._items[id] == 1){
	$gameVariables.setValue(102,$gameVariables.value(102)-1);ItemPriorityResort = 1;Idcheckpriority = $dataItems[id].sortPriority;$dataItems[id].sortPriority=0}
	item = $dataItems[id];actor = $gamePlayer.actor();actor.useItem(item)
	var action = new Game_Action(actor);action.setItemObject(item);action.apply($gamePlayer.actor());$gamePlayer.requestAnimation(item.animationId);
	action.applyGlobal();
	}}}if(ItemPriorityResort == 1){
	for (var id in $gameParty._items) {if ($dataItems[id].consumable == true){if($dataItems[id].sortPriority>Idcheckpriority){
	$dataItems[id].sortPriority-=1
	$gameVariables.setValue(52,1)
	$gameScreen.erasePicture(35)
	}}}}
	 
	 ActionCoolDown = 60
	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	$gameSystem.setAutoMode(true)
	 } else if (
   ($gameVariables.value(53)<2000&&(Input.isPressed('A')&& $dataSkills[$gameVariables.value(53)].meta.type > 1 && $gameVariables.value(72) == 0  && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(53)].mpCost && ActionCoolDown == 0))){
	$gamePlayer.applySkill($gamePlayer, $gameVariables.value(53)) 
	 $gameTemp.reserveCommonEvent($dataSkills[$gameVariables.value(53)].effects["0"].dataId)
	 $gameActors._data[1]._mp-=$dataSkills[$gameVariables.value(53)].mpCost
	 ActionCoolDown = 60
	 
	 $gameVariables.setValue(72,1)
	 if($dataSkills[$gameVariables.value(53)].meta.cooldown > 0){
		 
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-0",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *0);	

	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-1",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *1);	
	
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-2",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *2);

	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-3",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *3);	
	
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-4",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *4);	
	
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-5",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *5);	
	
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-6",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *6);	
	
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-7",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *7);	
	
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-8",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *8);	
	
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-9",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *9);	
	
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-10",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *10);	
	
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-11",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *11);	
	
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-12",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *12);	
	
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-13",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *13);	
	
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-14",0,962,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *14);	
	
	setTimeout( function () {
	$gameScreen.showPicture(475,"CoolTime-15",0,962,663,100,100,366,0)
	$gameVariables.setValue(72,0)
	}, $dataSkills[$gameVariables.value(53)].meta.cooldown *1000 /15 *15);
	
		
	 }
	 	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	
	} else if (
   ($gameVariables.value(53)>2000&&(Input.isPressed('A') && ActionCoolDown == 0))){
	 $gameSystem.setAutoMode(false)
	for (var id in $gameParty._items) {
	if ($dataItems[id].sortPriority == $gameVariables.value(53)){
	if ($dataItems[id].consumable == true){
	if($gameParty._items[id] == 1){
	$gameVariables.setValue(102,$gameVariables.value(102)-1);ItemPriorityResort = 1;Idcheckpriority = $dataItems[id].sortPriority;$dataItems[id].sortPriority=0}
	item = $dataItems[id];actor = $gamePlayer.actor();actor.useItem(item)
	var action = new Game_Action(actor);action.setItemObject(item);action.apply($gamePlayer.actor());$gamePlayer.requestAnimation(item.animationId);
	action.applyGlobal();
	}}}if(ItemPriorityResort == 1){
	for (var id in $gameParty._items) {if ($dataItems[id].consumable == true){if($dataItems[id].sortPriority>Idcheckpriority){
	$dataItems[id].sortPriority-=1
	$gameVariables.setValue(53,1)
	$gameScreen.erasePicture(36)
	}}}}
	 
	 ActionCoolDown = 60
	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	$gameSystem.setAutoMode(true)
	 	 } else if (
   ($gameVariables.value(54)<2000&&(Input.isPressed('S')&& $dataSkills[$gameVariables.value(54)].meta.type > 1 && $gameVariables.value(73) == 0  && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(54)].mpCost && ActionCoolDown == 0))){
	$gamePlayer.applySkill($gamePlayer, $gameVariables.value(54)) 
	 $gameTemp.reserveCommonEvent($dataSkills[$gameVariables.value(54)].effects["0"].dataId)
	 $gameActors._data[1]._mp-=$dataSkills[$gameVariables.value(54)].mpCost
	 ActionCoolDown = 60
	 
	 $gameVariables.setValue(73,1)
	 if($dataSkills[$gameVariables.value(54)].meta.cooldown > 0){
		 
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-0",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *0);	

	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-1",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *1);	
	
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-2",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *2);

	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-3",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *3);	
	
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-4",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *4);	
	
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-5",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *5);	
	
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-6",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *6);	
	
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-7",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *7);	
	
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-8",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *8);	
	
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-9",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *9);	
	
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-10",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *10);	
	
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-11",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *11);	
	
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-12",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *12);	
	
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-13",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *13);	
	
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-14",0,997,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *14);	
	
	setTimeout( function () {
	$gameScreen.showPicture(476,"CoolTime-15",0,997,663,100,100,366,0)
	$gameVariables.setValue(73,0)
	}, $dataSkills[$gameVariables.value(54)].meta.cooldown *1000 /15 *15);
	
		
	 }
	 	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	
	} else if (
   ($gameVariables.value(54)>2000&&(Input.isPressed('S') && ActionCoolDown == 0))){
	$gameSystem.setAutoMode(false)
	for (var id in $gameParty._items) {
	if ($dataItems[id].sortPriority == $gameVariables.value(54)){
	if ($dataItems[id].consumable == true){
	if($gameParty._items[id] == 1){
	$gameVariables.setValue(102,$gameVariables.value(102)-1);ItemPriorityResort = 1;Idcheckpriority = $dataItems[id].sortPriority;$dataItems[id].sortPriority=0}
	item = $dataItems[id];actor = $gamePlayer.actor();actor.useItem(item)
	var action = new Game_Action(actor);action.setItemObject(item);action.apply($gamePlayer.actor());$gamePlayer.requestAnimation(item.animationId);
	action.applyGlobal();
	}}}if(ItemPriorityResort == 1){
	for (var id in $gameParty._items) {if ($dataItems[id].consumable == true){if($dataItems[id].sortPriority>Idcheckpriority){
	$dataItems[id].sortPriority-=1
	$gameVariables.setValue(54,1)
	$gameScreen.erasePicture(37)
	}}}}
	 
	 ActionCoolDown = 60
	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	$gameSystem.setAutoMode(true)
	 	 } else if (
   ($gameVariables.value(55)<2000&&(Input.isPressed('D')&& $dataSkills[$gameVariables.value(55)].meta.type > 1 && $gameVariables.value(74) == 0  && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(55)].mpCost && ActionCoolDown == 0))){
	$gamePlayer.applySkill($gamePlayer, $gameVariables.value(55)) 
	 $gameTemp.reserveCommonEvent($dataSkills[$gameVariables.value(55)].effects["0"].dataId)
	 $gameActors._data[1]._mp-=$dataSkills[$gameVariables.value(55)].mpCost
	 ActionCoolDown = 60
	 
	 $gameVariables.setValue(74,1)
	 if($dataSkills[$gameVariables.value(55)].meta.cooldown > 0){
		 
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-0",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *0);	

	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-1",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *1);	
	
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-2",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *2);

	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-3",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *3);	
	
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-4",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *4);	
	
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-5",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *5);	
	
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-6",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *6);	
	
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-7",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *7);	
	
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-8",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *8);	
	
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-9",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *9);	
	
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-10",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *10);	
	
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-11",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *11);	
	
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-12",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *12);	
	
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-13",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *13);	
	
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-14",0,1032,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *14);	
	
	setTimeout( function () {
	$gameScreen.showPicture(477,"CoolTime-15",0,1032,663,100,100,366,0)
	$gameVariables.setValue(74,0)
	}, $dataSkills[$gameVariables.value(55)].meta.cooldown *1000 /15 *15);
	
		
	 }
	 	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	
	} else if (
   ($gameVariables.value(55)>2000&&(Input.isPressed('D') && ActionCoolDown == 0))){
	$gameSystem.setAutoMode(false)
	for (var id in $gameParty._items) {
	if ($dataItems[id].sortPriority == $gameVariables.value(55)){
	if ($dataItems[id].consumable == true){
	if($gameParty._items[id] == 1){
	$gameVariables.setValue(102,$gameVariables.value(102)-1);ItemPriorityResort = 1;Idcheckpriority = $dataItems[id].sortPriority;$dataItems[id].sortPriority=0}
	item = $dataItems[id];actor = $gamePlayer.actor();actor.useItem(item)
	var action = new Game_Action(actor);action.setItemObject(item);action.apply($gamePlayer.actor());$gamePlayer.requestAnimation(item.animationId);
	action.applyGlobal();
	}}}if(ItemPriorityResort == 1){
	for (var id in $gameParty._items) {if ($dataItems[id].consumable == true){if($dataItems[id].sortPriority>Idcheckpriority){
	$dataItems[id].sortPriority-=1
	$gameVariables.setValue(55,1)
	$gameScreen.erasePicture(38)
	}}}}
	 
	 ActionCoolDown = 60
	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	$gameSystem.setAutoMode(true)
	 	 } else if (
   ($gameVariables.value(56)<2000&&(Input.isPressed('F')&& $dataSkills[$gameVariables.value(56)].meta.type > 1 && $gameVariables.value(75) == 0  && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(56)].mpCost && ActionCoolDown == 0))){
	$gamePlayer.applySkill($gamePlayer, $gameVariables.value(56)) 
	 $gameTemp.reserveCommonEvent($dataSkills[$gameVariables.value(56)].effects["0"].dataId)
	 $gameActors._data[1]._mp-=$dataSkills[$gameVariables.value(56)].mpCost
	 ActionCoolDown = 60
	 
	 $gameVariables.setValue(75,1)
	 if($dataSkills[$gameVariables.value(56)].meta.cooldown > 0){
		 
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-0",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *0);	

	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-1",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *1);	
	
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-2",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *2);

	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-3",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *3);	
	
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-4",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *4);	
	
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-5",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *5);	
	
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-6",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *6);	
	
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-7",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *7);	
	
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-8",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *8);	
	
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-9",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *9);	
	
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-10",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *10);	
	
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-11",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *11);	
	
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-12",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *12);	
	
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-13",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *13);	
	
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-14",0,1067,663,100,100,366,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *14);	
	
	setTimeout( function () {
	$gameScreen.showPicture(478,"CoolTime-15",0,1067,663,100,100,366,0)
	$gameVariables.setValue(75,0)
	}, $dataSkills[$gameVariables.value(56)].meta.cooldown *1000 /15 *15);
	
		
	 }
	 	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);

	} else if (
   ($gameVariables.value(56)>2000&&(Input.isPressed('F') && ActionCoolDown == 0))){
	$gameSystem.setAutoMode(false)
	for (var id in $gameParty._items) {
	if ($dataItems[id].sortPriority == $gameVariables.value(56)){
	if ($dataItems[id].consumable == true){
	if($gameParty._items[id] == 1){
	$gameVariables.setValue(102,$gameVariables.value(102)-1);ItemPriorityResort = 1;Idcheckpriority = $dataItems[id].sortPriority;$dataItems[id].sortPriority=0}
	item = $dataItems[id];actor = $gamePlayer.actor();actor.useItem(item)
	var action = new Game_Action(actor);action.setItemObject(item);action.apply($gamePlayer.actor());$gamePlayer.requestAnimation(item.animationId);
	action.applyGlobal();
	}}}if(ItemPriorityResort == 1){
	for (var id in $gameParty._items) {if ($dataItems[id].consumable == true){if($dataItems[id].sortPriority>Idcheckpriority){
	$dataItems[id].sortPriority-=1
	$gameVariables.setValue(56,1)
	$gameScreen.erasePicture(39)
	}}}}
	 
	 ActionCoolDown = 60
	 
	 setTimeout( function () {
	ActionCoolDown = 0
	}, 600);
	$gameSystem.setAutoMode(true)
	  } else if($gamePlayer._direction !== 8) {
  if ($gamePlayer._jumpCount == 0 ){
  $gamePlayer._characterName = '!$jumping%(4)';ActionCharacter = 4}
	    if ( !Input.isPressed('right') && !Input.isPressed('left') && !Input.isPressed('down')) {
  if ($gamePlayer._jumpCount == 1 ){if ($gamePlayer._invincibleCount == 0){
	  if (alertcount == 0) {
	  $gamePlayer._characterName = '!$standing%(4)';ActionCharacter = 1}
	  else {$gamePlayer._characterName = '!$alert%(4)';ActionCharacter = 3}
	  }else{
	$gamePlayer._characterName = '!$alert%(4)';ActionCharacter = 3
  }}}}}
	if(NoAction == 1 && ActionCharacter >1){ ActionCharacter = 1}
    this.updateMove();
    this.updateAnimation();
    this.updateCollideIds();
    if (this.isDashing()) this.updateDashCount();
    if (this.isMoving()) {
      this.updateMoveCount();
    } else {
      this.updateStop();
    }
    if (this.isSwimming() !== this._lastSwim) this.updateSwiming();
    if (this._needsRefresh) this.refresh();
    if (this.isInvincible()) this._invincibleCount--;
  };

  // 画面 X 座標の取得
  Game_CharacterBase.prototype.screenX = function() {
    var tw = $gameMap.tileWidth();
    return Math.round(this.scrolledX() * tw);
  };

  // 画面 Y 座標の取得
  Game_CharacterBase.prototype.screenY = function() {
    var th = $gameMap.tileHeight();
    return Math.round(this.scrolledY() * th);
  };

  // 移動の処理
  Game_CharacterBase.prototype.updateMove = function() {
    this.updateGravity();
    this.updateFriction();
    if (this._vx !== 0 || this._vxPlus !== 0) {
	if($gameMap._mapId == 3){
	if ($gamePlayer._landingObject !== null){
	if ($gamePlayer._landingObject._eventId == 11&& ($gameMap._events[11]._realY<10.0001&&$gameMap._events[11]._realY>8.9999)){
	if($gameMap._events[11]._realY == 10){
	$gameMap._events[11]._realY -= 0.05
	this._realY -= 0.05
	}
	$gameMap._events[11]._realY -= this._vx*0.39 + this._vxPlus;	
	this._realY -= this._vx*0.39 + this._vxPlus;	
	}}
	if ($gamePlayer._landingObject == null&& $gamePlayer._x>6 && $gamePlayer._x<10){
	if (($gameMap._events[11]._realY<10.0001&&$gameMap._events[11]._realY>8.9999)){
	$gameMap._events[11]._realY -= this._vx*0.39 + this._vxPlus;
	this._realY -= this._vx*0.39 + this._vxPlus;
	}}
	if($gamePlayer._x<7){$gameMap._events[11]._realY=10}
	if($gamePlayer._x>9){$gameMap._events[11]._realY=9}
	if($gameMap._events[11]._realY>10){
	$gameMap._events[11]._realY -= 0.1	
	this._realY -= 0.1
	}
	if($gameMap._events[11]._realY<9){
	$gameMap._events[11]._realY += 	Math.min((9-$gameMap._events[11]._realY),0.05)
	this._realY += Math.min((9-$gameMap._events[11]._realY),0.05)
	}}
	
	this._realX += this._vx + this._vxPlus;
      if (this._through) {
        this._realX = this._realX.clamp(0, $gameMap.width());
      } else {
        if (this._vx > 0) {
          this.collideMapRight();
          this.collideCharacterRight();
        } else {
          this.collideMapLeft();
          this.collideCharacterLeft();
        }
      }
	  
      this._x = Math.floor(this._realX);
    }

    if (this._vy !== 0) {
      this._landingObject = null;
      this._realY += this._vy;
      if (this._through) {
        this._realY = this._realY.clamp(0, $gameMap.height());
      } else {
        if (this._vy > 0) {
          this.collideMapDown();
          this.collideCharacterDown();
        } else {
          this.collideMapUp();
          this.collideCharacterUp();
        }
      }
      this._y = Math.floor(this._realY);
      this._lastY = Math.floor(this._realY + actTileMarginTop);
    }
  };

  // 重力の処理
  Game_CharacterBase.prototype.updateGravity = function() {
    if (this._jumpPeak > this._realY && this._gravity > 0) {
      this.resetPeak();
    }
    this._vy = Math.min(this._vy + this._gravity, this.maxFallSpeed());
	
  };

  // 最大落下速度の取得
  Game_CharacterBase.prototype.maxFallSpeed = function() {
    return this.isSwimming() ? 0.04 : 0.6;
  };

  // 摩擦の処理
  Game_CharacterBase.prototype.updateFriction = function() {
    if (this.isLanding()) {
      if (Object.prototype.toString.call(this._landingObject) !== '[object Array]' &&
          this._landingObject._lift) {
        this._vxPlus = this._landingObject._vx;
      }
    } else {
      this._vxPlus = 0;
    }
  };

  // 移動カウントの処理
  Game_CharacterBase.prototype.updateMoveCount = function() {
    this._moveCount--;
    if (this._moveCount == 0 && !this.isDashing()) {
      this._vx = 0;
      if (this._gravity == 0) this._vy = 0;
    }
  };

  // ダッシュカウントの処理
  Game_CharacterBase.prototype.updateDashCount = function() {
    this._dashCount--;
  };

  // 处理碰撞角色//碰到时被弹开
  Game_CharacterBase.prototype.updateCollideIds = function() {
    for(var i = this._collideIds.length - 1; i >= 0; i--) {
      var id = this._collideIds[i];
      var character = id < 0 ? $gamePlayer : $gameMap.event(id); //character是被碰到的东西
      if (!this.isCollide(character)) {
		  if ( $gamePlayer._invincibleCount == 0 && this._enemyId > 0 && NoAction == 0){
	  if ($gameMap.event(id) === undefined && $gamePlayer._invincibleCount == 0 && id == -1) {
	  gameplayerdamage = 1
	  bouncex = (this._direction-5)*0.06
	  bouncey = -0.06
	  $gamePlayer.flick(this);  //被碰到时添加伤害
	  $gamePlayer._invincibleCount = $gamePlayer._invincibleTime;
      //if(this.battler()._actionResult.missed == false){$gamePlayer.battler().requestEffect('blink'); } 
	   	if( alertcount == 1){
	clearTimeout(alerttime)
	alertcount = 0}
	   alertcount = 1
		
	alerttime = setTimeout( function () {
	alertcount = 0
	}, 8000);
	  break
	  
	  } 
		  }
	 this._collideIds.splice(i, 1);
	  }
	  }
  };

  // キャラクターとの直線距離を返す
  Game_CharacterBase.prototype.distFromCharacter = function(character) {
    var x = this._realX - character._realX;
    var y = this._realY - character._realY;
    return Math.sqrt(x * x + y * y);
  };

  // マップとの衝突判定（上方向）
  Game_CharacterBase.prototype.collideMapUp = function() {
    var lx = Math.floor(this._realX - this._collideW);
    var rx = Math.floor(this._realX + this._collideW);
    var y  = Math.floor(this._realY - this._collideH);
    for (var x = lx; x <= rx; x++) {
      if (!$gameMap.isPassable(x, y, 8)) {
        this._realY = y + 1.001 + this._collideH;
        this._vy = 0;
        this._jumpInput = 0;
        return;
      }
    }
  };

  // マップとの衝突判定（下方向）
  Game_CharacterBase.prototype.collideMapDown = function() {
    var y = Math.floor(this._realY + actTileMarginTop);
    if (y === this._lastY) return;
    var lx = Math.floor(this._realX - this._collideW);
    var rx = Math.floor(this._realX + this._collideW);
    for (var x = lx; x <= rx; x++) {
      if (!$gameMap.isPassable(x, y, 2)) {
        if (this._ladder && $gameMap.isLadder(x, y)) continue;
        this._landingObject = [x, y];
        this._landingRegion = $gameMap.regionId(x, y);
        this.getLand(y - actTileMarginTop - 0.001);
        return;
      }
    }
  };

  // マップとの衝突判定（左方向）
  Game_CharacterBase.prototype.collideMapLeft = function() {
    var ty = Math.floor(this._realY - this._collideH);
    var by = Math.floor(this._realY + actTileMarginTop);
    var x = Math.floor(this._realX - this._collideW);
    for (var y = ty; y <= by; y++) {
      if (!$gameMap.isPassable(x, y, 4)) {
        this._realX = x + 1.001 + this._collideW;
        this._vx = 0;
        return;
	  }
    }
  };

  // マップとの衝突判定（右方向）
  Game_CharacterBase.prototype.collideMapRight = function() {
    var ty = Math.floor(this._realY - this._collideH);
    var by = Math.floor(this._realY + actTileMarginTop);
    var x = Math.floor(this._realX + this._collideW);
    for (var y = ty; y <= by; y++) {
      if (!$gameMap.isPassable(x, y, 6)) {
        this._realX = x - 0.001 - this._collideW;
        this._vx = 0;
        return;
      }
    }
  };

  // キャラクターとの衝突判定（上方向）
  Game_CharacterBase.prototype.collideCharacterUp = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character) && !character.isCarried()) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift) {
            character._realY = this._realY - this._collideH - 0.001;
            character._vy = this._vy;
            character._landingObject = this;
            character.resetJump();
          } else {
            this._realY = character._realY + this._collideH + 0.001;
            this._vy = 0;
            this._jumpInput = 0;
          }
        }
      }
    }
  };

  // キャラクターとの衝突判定（下方向）
  Game_CharacterBase.prototype.collideCharacterDown = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character) && !character.isCarried()) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift) {
            character._realY = this._realY + character._collideH + 0.001;
            character._jumpInput = 0;
            character._vy = this._vy;
          } else {
            this._landingObject = character;
            this._landingRegion = -1;
            this.getLand(character._realY - character._collideH - 0.001);
          }
        }
      }
    }
  };

  // キャラクターとの衝突判定（左方向）
  Game_CharacterBase.prototype.collideCharacterLeft = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character) && !character.isCarried()) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift || this._ladder) {
            character._realX = this._realX - this._collideW - 0.001 - character._collideW;
            character._vx = this._vx;
          } else {
            if (this.isDashing() && this.checkFlickWeight(character._weight)) {
            }
            this._realX = character._realX + character._collideW + 0.001 + this._collideW;
            this._vx = 0;
          }
        }
      }
    }
  };

  // キャラクターとの衝突判定（右方向）
  Game_CharacterBase.prototype.collideCharacterRight = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character) && !character.isCarried()) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift || this._ladder) {
            character._realX = this._realX + this._collideW + 0.001 + character._collideW;
            character._vx = this._vx;
          } else {
            if (this.isDashing() && this.checkFlickWeight(character._weight)) {
            }
            this._realX = character._realX - character._collideW - 0.001 - this._collideW;
            this._vx = 0;
          }
        }
      }
    }
  };

  // キャラクターとの衝突判定
  Game_CharacterBase.prototype.isCollide = function(character) {
    if (this.eventId() === character.eventId()) return false;
    return this._realX - this._collideW <= character._realX + character._collideW &&
           this._realX + this._collideW >= character._realX - character._collideW &&
           this._realY - this._collideH <= character._realY &&
           this._realY >= character._realY - character._collideH;
  };

  // 衝突判定を行う対象を返す
  Game_CharacterBase.prototype.collideTargets = function() {
    return $gameMap.events().concat($gamePlayer);
  };

  // 衝突している対象を追加する
  Game_CharacterBase.prototype.addCollideId = function(id) {
    if (this._collideIds.indexOf(id) == -1) {
      this._collideIds.push(id);
      this.checkEventTriggerCollide(id);
    }
  };

  // 地面に降りる
  Game_CharacterBase.prototype.getLand = function(y) {
    this._realY = y;
    this._vy = 0;
    this.resetJump();
    if (this._ladder) this.getOffLadder();
    this.updateDamageFall();
  };

  // ジャンプカウントのリセット
  Game_CharacterBase.prototype.resetJump = function() {
    this._jumpCount = this._mulchJump;
    this._jumpInput = 0;
  };

  // 落下ダメージの処理
  Game_CharacterBase.prototype.updateDamageFall = function() {
    if (this.isBattler() && this._fallGuard < 100) {
      var n = this._realY - this._jumpPeak - actDamageFallHeight;
      if (n > 0 && !this.isSwimming()) {
        var rate = 100 - this._fallGuard;
        var damage = Math.floor(Math.max(n * actDamageFallRate * rate / 100), 1);
		if ( this._invincibleCount == 0 && damage > 0){
		gameplayerdamage = 1
		bouncex = (this._direction-5)*0.06
		bouncey = -0.06
		this.battler().clearResult();
        this.battler().gainHp(-damage);  //落地时添加伤害
		this._invincibleCount = this._invincibleTime;
        this.battler().requestEffect('blink');
			if( alertcount == 1){
	clearTimeout(alerttime)
	alertcount = 0}
		alertcount = 1
		
	alerttime = setTimeout( function () {
	alertcount = 0
	}, 8000);
		}
      }
    }
    this.resetPeak();
  };

  // 最高到達点のリセット
  Game_CharacterBase.prototype.resetPeak = function() {
    this._jumpPeak = this._realY;
  };

  // 泳ぎ状態の更新
  Game_CharacterBase.prototype.updateSwiming = function() {
    this._lastSwim = !this._lastSwim;
  };

  // まっすぐに移動
  Game_CharacterBase.prototype.moveStraight = function(d) {
    this.setDirection(d);
	if(this == $gamePlayer){this._moveCount = Math.floor(1/ this._moveSpeed)
	} else {
	if(this._enemyId !== 0){
    this._moveCount = 0.1 * Math.randomInt(14) / this._moveSpeed}else{
	this._moveCount = 1/this._moveSpeed
	
	}}
    if (d === 2) {
      this._vy = this._moveSpeed;
    } else if (d === 4) {
      this._vx = -this._moveSpeed;
    } else if (d === 6) {
      this._vx = this._moveSpeed;
    } else {
      this._vy = -this._moveSpeed;
    }
  };

  // ななめに移動
  Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
    this.setDirection(horz);
    this._moveCount = Math.floor(1 / this._moveSpeed);
    this._vx = horz === 4 ? -this._moveSpeed : this._moveSpeed;
    this._vy = vert === 8 ? -this._moveSpeed : this._moveSpeed;
  };

  // ジャンプ
  Game_CharacterBase.prototype.jump = function(xPlus, yPlus) {
    if (this._jumpCount <= 0) return;
    this._jumpCount--;
    if (xPlus < 0) {
      this.setDirection(4);
      var speed = this._moveSpeed / 100 + 0.02;
      this._moveCount = Math.floor(1 / speed);
      this._vx = -speed;
    } else if (xPlus > 0) {
      this.setDirection(6);
      var speed = this._moveSpeed / 100 + 0.02;
      this._moveCount = Math.floor(1 / speed);
      this._vx = speed;
    }
    if (yPlus != 0) {
      this._vy = yPlus / 100;
    } else {
      this._vy = this.isSwimming() ? -this._swimJump : -this._jumpSpeed;
    }
    this.resetStopCount();
    this.straighten();
  };

  // ダッシュ（方向指定）
  Game_CharacterBase.prototype.dashFromDirection = function(direction) {
    var vx = direction === 4 ? -this._dashSpeedX : this._dashSpeedX;
    var vy = -this._dashSpeedY;
    this.dash(vx, vy);
  };

  // ダッシュ（速度指定）
  Game_CharacterBase.prototype.dash = function(vx, vy) {
    this._vx = vx;
    this._vy = vy;
    this._dashCount = this._dashCountTime;
    this._moveCount = this._dashCount / 2;
    this.resetStopCount();
    this.straighten();
  };

  // はじかれ
  Game_CharacterBase.prototype.flick = function(user) {
    if (actFlickSkill > 0 && user.isBattler() && this.isBattler()) {
      this.applySkill(user, actFlickSkill);
    }
    this._vx = user._vx;
    var n = 1 + (user._weight - this._weight - actFlickWeight) / 2;
    this._moveCount = Math.floor(n / Math.abs(this._vx));
    AudioManager.playSe(actSeFlick);
  };

  // 持ち上げられる
  Game_CharacterBase.prototype.carry = function() {
    this._carried = true;
    this._through = true;
  };

  // 投げられる
  Game_CharacterBase.prototype.hurl = function() {
    this._carried = false;
    this._through = false;
    this._lastSwim = this.isSwimming();
  };

  // スキルの適用
  Game_CharacterBase.prototype.applySkill = function(user, skillId) {
    user.battler().clearActions();
    var action = new Game_Action(user.battler());
    action.setSkill(skillId);
    user.battler().setAction(0, action);
    user.battler().action(0).apply(this.battler());
  };

  // ダメージの処理
  Game_CharacterBase.prototype.updateDamage = function() {
    var battler = this.battler();
    battler.clearResult();
    if (battler._actionResult.hpDamage != 0) {
      battler._actionResult.hpAffected = true;
      battler._actionResult.missed = false;
      battler._actionResult.evaded = false;
      this.damaged();
      if (battler._actionResult.hpDamage > 0) {
		  if (this==$gamePlayer){this.battler().requestEffect('blink')
		if( Hurtcount == 1){
	clearTimeout(Hurtime)
	Hurtcount = 0}
	Hurtcount = 1
	Hurtime = setTimeout( function () {
	Hurtcount = 0
	}, 2000);
		  
		  
		}
        battler.playDamageSe();
      } else {
        battler.playRecovarySe();
      }
	  if ( this !== $gamePlayer){
	AudioManager.playSe({"name":$dataEnemies[$gameMap._events[this._eventId]._enemyId].meta.damagese,"volume":90,"pitch":100,"pan":0})
	if ( DBH1 == 0){
	DBH1 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc1 =this
	setTimeout( function () {
	if( abc1._lockCount == 0&& abc1._battler !== null){
	abc1._direction = DBH1 }
	abc1.setWalkAnime(true)
	abc1.setStepAnime(true)
	DBH1 = 0
	}, 600);
	} else if (DBH2 == 0){
	DBH2 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc2 =this
	setTimeout( function () {
	if( abc2._lockCount == 0&& abc2._battler !== null){
	abc2._direction = DBH2}
	abc2.setWalkAnime(true)
	abc2.setStepAnime(true)
	DBH2 = 0
	}, 600);		
	} else if (DBH3 == 0){	
	DBH3 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc3 =this
	setTimeout( function () {
	if( abc3._lockCount == 0&& abc3._battler !== null){
	abc3._direction = DBH3 }
	abc3.setWalkAnime(true)
	abc3.setStepAnime(true)
	DBH3 = 0
	}, 600);
	} else if (DBH4 == 0){	
	DBH4 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc4 =this
	setTimeout( function () {
		if( abc4._lockCount == 0&& abc4._battler !== null){
		abc4._direction = DBH4 }
	abc4.setWalkAnime(true)
	abc4.setStepAnime(true)
	DBH4 = 0
	}, 600);		
	} else if (DBH5 == 0){	
	DBH5 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc5 =this
	setTimeout( function () {
	if( abc5._lockCount == 0&& abc5._battler !== null){
	abc5._direction = DBH5 }
	abc5.setWalkAnime(true)
	abc5.setStepAnime(true)
	DBH5 = 0
	}, 600);				
	} else if (DBH6 == 0){	
	DBH6 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc6 =this
	setTimeout( function () {
		if( abc6._lockCount == 0&& abc6._battler !== null){
		abc6._direction = DBH6 }
	abc6.setWalkAnime(true)
	abc6.setStepAnime(true)
	DBH6 = 0
	}, 600);	
	} else if (DBH7 == 0){	
	DBH7 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc7 =this
	setTimeout( function () {
		if( abc7._lockCount == 0&& abc7._battler !== null){
		abc7._direction = DBH7 }
	abc7.setWalkAnime(true)
	abc7.setStepAnime(true)
	DBH7 = 0
	}, 600);	
	} else if (DBH8 == 0){	
	DBH8 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc8 =this
	setTimeout( function () {
		if( abc8._lockCount == 0&& abc8._battler !== null){
		abc8._direction = DBH8 }
	abc8.setWalkAnime(true)
	abc8.setStepAnime(true)
	DBH8 = 0
	}, 600);	
	} else if (DBH9 == 0){	
	DBH9 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc9 =this
	setTimeout( function () {
		if( abc9._lockCount == 0&& abc9._battler !== null){
		abc9._direction = DBH9 }
	abc9.setWalkAnime(true)
	abc9.setStepAnime(true)
	DBH9 = 0
	}, 600);	
	} else if (DBH10 == 0){	
	DBH10 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc10 =this
	setTimeout( function () {
		if( abc10._lockCount == 0&& abc10._battler !== null){
		abc10._direction = DBH10 }
	abc10.setWalkAnime(true)
	abc10.setStepAnime(true)
	DBH10 = 0
	}, 600);	
	} else if (DBH11 == 0){	
	DBH11 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc11 =this
	setTimeout( function () {
		if( abc11._lockCount == 0&& abc11._battler !== null){
		abc11._direction = DBH11 }
	abc11.setWalkAnime(true)
	abc11.setStepAnime(true)
	DBH11 = 0
	}, 600);	
	} else if (DBH12 == 0){	
	DBH12 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc12 =this
	setTimeout( function () {
		if( abc12._lockCount == 0&& abc12._battler !== null){
		abc12._direction = DBH12 }
	abc12.setWalkAnime(true)
	abc12.setStepAnime(true)
	DBH12 = 0
	}, 600);	
	} else if (DBH13 == 0){	
	DBH13 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc13 =this
	setTimeout( function () {
		if( abc13._lockCount == 0&& abc13._battler !== null){
		abc13._direction = DBH13 }
	abc13.setWalkAnime(true)
	abc13.setStepAnime(true)
	DBH13 = 0
	}, 600);	
	} else if (DBH14 == 0){	
	DBH14 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc14 =this
	setTimeout( function () {
		if( abc14._lockCount == 0&& abc14._battler !== null){
		abc14._direction = DBH14 }
	abc14.setWalkAnime(true)
	abc14.setStepAnime(true)
	DBH14 = 0
	}, 600);	
	} else if (DBH15 == 0){	
	DBH15 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc15 =this
	setTimeout( function () {
		if( abc15._lockCount == 0&& abc15._battler !== null){
		abc15._direction = DBH15 }
	abc15.setWalkAnime(true)
	abc15.setStepAnime(true)
	DBH15 = 0
	}, 600);	
	} else if (DBH16 == 0){	
	DBH16 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc16 =this
	setTimeout( function () {
		if( abc16._lockCount == 0&& abc16._battler !== null){
		abc16._direction = DBH16 }
	abc16.setWalkAnime(true)
	abc16.setStepAnime(true)
	DBH16 = 0
	}, 600);	
	} else if (DBH17 == 0){	
	DBH17 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc17 =this
	setTimeout( function () {
		if( abc17._lockCount == 0&& abc17._battler !== null){
		abc17._direction = DBH17 }
	abc17.setWalkAnime(true)
	abc17.setStepAnime(true)
	DBH17 = 0
	}, 600);	
	} else if (DBH18 == 0){	
	DBH18 = this._direction
	if(this._vx == 0&& this._landingRegion !== 2){if ( $gamePlayer._direction == 4) {this._vx = -0.07}else {this._vx = 0.07}}
	if ( this._direction == 4) {this._direction =2}else {this._direction =8}
	if($gameMap._events[this._eventId]._battler._hp > 0){$gameMap._events[this._eventId]._waitCount = 80}
	this._pattern = 0
	this.setWalkAnime(false)
	this.setStepAnime(false)
	abc18 =this
	setTimeout( function () {
		if( abc18._lockCount == 0&& abc18._battler !== null){
		abc18._direction = DBH18 }
	abc18.setWalkAnime(true)
	abc18.setStepAnime(true)
	DBH18 = 0
	}, 600);	

	}	
	} 
    } else if (battler._actionResult.missed ||
               battler._actionResult.evaded) {
	  this.setupInvincible()
      this.damaged();
      battler.playMissSe();
    }
    if (battler._actionResult.isStatusAffected()) {
      this.requestRefresh();
    }
  };

  // ダメージ後の処理
  Game_CharacterBase.prototype.damaged = function() {
    var battler = this.battler();
  //  if (this.isLocking()) {
  //    return;
  //  }
    
    battler.startDamagePopup();
	if (this == $gamePlayer ) {
	gameplayerdamage = 1
	if(battler._actionResult.missed == false){
	if(battler._actionResult.hpDamage>0){
	if($gameActors._data[1]._hp>0){
	if(bouncex > 0){
	bouncex = Math.min(bouncex,0.06)	
	}else{
	bouncex = Math.max(bouncex,-0.06)	
	}
	$gamePlayer.dash(bouncex,bouncey)
	}
	gameplayerrecover = 0
	} else {gameplayerrecover = 1}
    }} else {gameplayerdamage =0
	}
	
    if (battler._actionResult.isStateAdded(battler.deathStateId())) {
      this.battlerDead();
    }
  };

  // 座標のセット
  Game_CharacterBase.prototype.setPosition = function(x, y) {
    this._x = Math.floor(x);
    this._y = Math.floor(y);
    this._realX = x;
    this._realY = y;
  };

  // 指定位置へ移動
  var _Game_CharacterBase_locate = Game_CharacterBase.prototype.locate;
  Game_CharacterBase.prototype.locate = function(x, y) {
    _Game_CharacterBase_locate.call(this, x, y);
    this._vx = 0;
    this._vy = 0;
    this._lastY = -1;
    this._lastSwim = this.isSwimming();
    this._collideIds = [];
    this.resetPeak();
    this._carried = false;
    this._carryingObject = null;
  };

  // マップ用ポップアップのセット
  Game_CharacterBase.prototype.setMapPopup = function(text, color, ry, dy, g) {
    var popup = {};
    popup.text = text;
    popup.color = color;
    popup.ry = ry == null ? -40 : ry;
    popup.dy = dy == null ? -4 : dy;
    popup.g = g == null ? 0.5 : g;
    this._mapPopups.push(popup);
  };
  
  // マップ用ポップアップがたまっているかどうかを返す
  Game_CharacterBase.prototype.isMapPopupExist = function() {
    return this._mapPopups.length > 0;
  };

  // マップ用ポップアップをひとつ返す
  Game_CharacterBase.prototype.getMapPopup = function() {
    return this._mapPopups.shift();
  };

  //-----------------------------------------------------------------------------
  // Game_Character
  //

  // ランダムに移動
  Game_Character.prototype.moveRandom = function() {
    if (this._gravity == 0) {
      this.moveStraight(2 + Math.randomInt(4) * 2);
    } else {
      this.moveStraight(4 + Math.randomInt(2) * 2);
    }
  };

  // キャラクターの方を向く
  Game_Character.prototype.turnTowardCharacter = function(character) {
    var sx = this._realX - character._realX;
    var sy = this._realY - character._realY;
    if (Math.abs(sx) > Math.abs(sy)) {
      this.setDirection(sx > 0 ? 4 : 6);
    } else if (sy !== 0) {
      this.setDirection(sy > 0 ? 8 : 2);
    }
  };

  // キャラクターの反対を向く
  Game_Character.prototype.turnAwayFromCharacter = function(character) {
    var sx = this._realX - character._realX;
    var sy = this._realY - character._realY;
    if (Math.abs(sx) > Math.abs(sy)) {
      this.setDirection(sx > 0 ? 6 : 4);
    } else if (sy !== 0) {
      this.setDirection(sy > 0 ? 2 : 8);
    }
  };

  // キャラクターのいる方向（角度）を取得
  Game_Character.prototype.angleToCharacter = function(character) {
    return Math.atan2(character._realY - character._collideH / 2 - (this._realY - this._collideH / 2), character._realX - this._realX);
  };

  // プレイヤーのいる方向（角度）を取得
  Game_Character.prototype.angleToPlayer = function() {
    return this.angleToCharacter($gamePlayer);
  };

  // ｎ方向ショット
  Game_Character.prototype.nwayShot = function(n, space, angle, speed, count, type, index, skillId) {
    angle = angle - (space * (n - 1) / 2);
    for (var i = 0; i < n; i++) {
      $gameMap.addBullet(this._realX, this._realY - this._collideH / 2, 200 + i,
                         Math.cos(angle) * speed, Math.sin(angle) * speed, angle, count, type, index,
                         this.battler().isEnemy(), skillId, this);
      angle += space;
    }
  };

  // 自機狙いｎ方向ショット
  Game_Character.prototype.nwayAim = function(n, space, angle, speed, count, type, index, skillId) {
    var a = angle + this.angleToPlayer();
    this.nwayShot(n, space, a, speed, count, type, index, skillId);
  };

  // 全方位ショット
  Game_Character.prototype.nallShot = function(n, angle, speed, count, type, index, skillId) {
    var space = Math.PI * 2 / n;
    for (var i = 0; i < n; i++) {
      $gameMap.addBullet(this._realX, this._realY - this._collideH / 2, 200 + i,
                         Math.cos(angle) * speed, Math.sin(angle) * speed, angle, count, type, index,
                         this.battler().isEnemy(), skillId, this);
      angle += space;
    }
  };

  // 自機狙い全方位ショット
  Game_Character.prototype.nallAim = function(n, angle, speed, count, type, index, skillId) {
    var a = angle + this.angleToPlayer()
    this.nallShot(n, a, speed, count, type, index, skillId);
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //

  // メンバ変数の初期化
  var _Game_Player_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function() {
    _Game_Player_initMembers.call(this);
    this._realSteps = 0;
    this._carryPower = 0;
    this._wallJump = false;
    this._dashDelay = 0;
    this._dashDelayTime = 30;
    this._dashMpCost = 0;
    this._guardInput = 0;
    this._guardSpeed = 0;
    this._shotWay = 0;
    this._shotSpace = 0.2;
    this._shotSpeed = 0.1;
    this._shotCountTime = 30;
    this._shotDelayTime = 10;
    this._shotType = 1;
    this._shotIndex = 0;
    this._shotSkillId = 0;
    this._shotSeName = "";
    this._shotSeVolume = 0;
    this._shotSePitch = 0;
    this._carryingObject = null;
  };

  // 画面中央の X 座標
  Game_Player.prototype.centerX = function() {
    return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0 + 0.5;
  };

  // 画面中央の Y 座標
  Game_Player.prototype.centerY = function() {
    return ((Graphics.height / $gameMap.tileHeight() - 1) / 2.0 + 0.5)+1;
  };

  // イベントIDを返す
  Game_Player.prototype.eventId = function() {
    return -1;
  };

  // アクターの取得
  Game_Player.prototype.actor = function() {
    return $gameParty.leader();
  };

  // バトラーを返す
  Game_Player.prototype.battler = function() {
    return this.actor();
  };

  // バトラーが設定されているか
  Game_Player.prototype.isBattler = function() {
    return this.actor() ? true : false;
  };

  // ダッシュ状態判定
  Game_Player.prototype.isDashing = function() {
    return this._dashCount > 0;
  };

  // 持ち上げ状態の取得
  Game_Player.prototype.isCarrying = function() {
    return this._carryingObject !== null;
  };

  // 衝突判定を行う対象を返す
  Game_Player.prototype.collideTargets = function() {
    return $gameMap.events();
  };

  // はしごにつかまる
  Game_Player.prototype.getOnLadder = function(downFlag) {
	  if(ActionCharacter < 6||ActionCharacter==20||ActionCharacter==19){
	$gamePlayer._characterName = '!$jumping%(4)'
	ActionCharacter = 4
    this._ladder = true;
    this._landingObject = null;
    this.setDirection(8);
    var lastRealX = this._realX;
    this._realX = Math.floor(this._realX) + 0.5;
    if (downFlag) this._realY += 0.04;
    this._lastY = Math.floor(this._realY + actTileMarginTop);
    if (lastRealX < this._realX) {
      this.collideCharacterLeft();
    } else if (lastRealX > this._realX) {
      this.collideCharacterRight();
    }
	// 	爬楼梯是跳力减半
	//this._jumpSpeed = 0.065;
	// 	无法在爬楼梯dash
	this._dashMpCost = 99999; 
    this._vx = 0;
    this._vy = 0;
    this.resetJump();
    this.resetPeak();
  }};

  // はしごから降りる
  Game_Player.prototype.getOffLadder = function() {
    this._ladder = false;
    this.setDirection(Input.isPressed('left') ? 4 : 6);
	this._jumpCount = 0;
	this._dashDelay = 30;
	this._dashMpCost = 0; // 跳下楼梯后可以dash
  };

  // 衝突したイベントの起動
  Game_Player.prototype.checkEventTriggerCollide = function(id) {
    if (!$gameMap.isEventRunning()) {
      var event = $gameMap.event(id);
	  if ( $gamePlayer.x == $gameMap.event(id).x && $gamePlayer._invincibleCount == 0 && $gameMap.event(id)._enemyId > 0 && NoAction == 0){
		  gameplayerdamage = 1
	  bouncex = (this._direction-5)*-0.06
	  bouncey = -0.06
	  $gamePlayer.flick(event);  //由上碰到时添加伤害
	  this._invincibleCount = this._invincibleTime;
      //if(this.battler()._actionResult.missed == false){this.battler().requestEffect('blink');}
	  	if( alertcount == 1){
	clearTimeout(alerttime)
	alertcount = 0}
	  alertcount = 1
		
	alerttime = setTimeout( function () {
	alertcount = 0
	}, 8000);
	  } else if ( $gamePlayer.y == $gameMap.event(id).y && this._invincibleCount == 0 && $gameMap.event(id)._enemyId > 0 && NoAction == 0){ 
	  gameplayerdamage = 1
	  bouncex = ($gamePlayer.x-$gameMap.event(id).x+0.0001)*0.05
	  bouncey = 0.05
	  $gamePlayer.flick(event);  //由左右碰到时添加伤害
	  this._invincibleCount = this._invincibleTime;
     //if(this.battler()._actionResult.missed == false){this.battler().requestEffect('blink');}
	  	if( alertcount == 1){
	clearTimeout(alerttime)
	alertcount = 0}
	  alertcount = 1
		
	alerttime = setTimeout( function () {
	alertcount = 0
	}, 8000);
	  }
  //    if (event.isTriggerIn([1, 2]) && event.isNormalPriority() === normal) {
      if (event.isTriggerIn([1, 2])) {
        event.start();
      }
    }
  };

  // フレーム更新
  Game_Player.prototype.update = function(sceneActive) {
    var lastScrolledX = this.scrolledX();
    var lastScrolledY = this.scrolledY();
    if (this.isLocking()) {
      this.updateLock();
    } else {
      if (sceneActive && this.canMove()) this.updateInput();
      var lastRealX = this._realX;
      var lastRealY = this._realY;
      Game_Character.prototype.update.call(this);
      this.updateSteps(lastRealX, lastRealY);
    }
    this.updateScroll(lastScrolledX, lastScrolledY);
    if (this.isBattler()) this.updateDamage();
  //  this._followers.update();
  };

  // 入力の処理
  Game_Player.prototype.updateInput = function() {
    this.carryByInput();
    if (this.isCarrying()) this._shotDelay = 1;
    this.attackByInput();
    this.changeByInput();
    this.moveByInput();
    this.jumpByInput();
    this.dashByInput();
    this.guardByInput();
    this.triggerButtonAction();
  };

  // 重力の処理
  Game_Player.prototype.updateGravity = function() {
    if (this._ladder || (this._jumpPeak > this._realY && this._gravity > 0)) {
      this.resetPeak();
      if (this._ladder) return;
    }
    Game_Character.prototype.updateGravity.call(this);
  };

  // 摩擦の処理
  Game_Player.prototype.updateFriction = function() {
    Game_Character.prototype.updateFriction.call(this);
    this._friction = 0;
    if (this._ladder) {
		$gamePlayer._jumpCount = 1
      var n = this.isMoving() ? 0 : actFriction;
      if (this._vy !== 0) {
        this._vy = this._vy > 0 ? Math.max(this._vy - n, 0) : Math.min(this._vy + n, 0);
      }
    } else {
      // ダッシュ状態でなければ移動速度を超えないように調整する
      if (!this.isDashing()) {
        var n = this.isSwimming() ? this._swimSpeed : this._moveSpeed;
        if (this._vx < -n) {
          this._vx = Math.min(this._vx + 0.005, -n);
        } else if (this._vx > n) {
          this._vx = Math.max(this._vx - 0.005, n);
        }
      }
      if (this.isLanding()) {
        var n = actFriction;
        var speed = this._moveSpeed;
        if (this.isGuarding()) speed = speed * actGuardMoveRate / 100;
        switch (this._landingRegion) {
        case actSlipFloorRegion:
          this._friction = 0.0025;
          return;
        case actRoughFloorRegion:
          if (Math.abs(this._vx) > speed / 2) {
            this._vx = this._vx > 0 ? speed / 2 : -speed / 2;
          }
          break;
        case actMarshFloorRegion:
          this._vx = 0;
          return;
        default:
          if (this.isGuarding() && Math.abs(this._vx) > speed) {
            this._vx = this._vx > 0 ? speed : -speed;
          }
          break;
        }
        if (!this.isMoving()) {
          if (this._vx > 0) {
            this._vx = Math.max(this._vx - n, 0);
          } else if (this._vx < 0) {
            this._vx = Math.min(this._vx + n, 0);
          }
        }
      }
    }
  };

  // 移動カウントの処理
  Game_Player.prototype.updateMoveCount = function() {
    this._moveCount--;
  };

  // ロック状態の処理
  Game_Player.prototype.updateLock = function() {
    this._lockCount--;
    if (this._lockCount === 0 && this.battler().isDead()) {
      this.changeMember();
    }
  };

  // ボタン操作による持ち上げ（投げ）
  Game_Player.prototype.carryByInput = function() {

  };

  // 持ち上げる
  Game_Player.prototype.executeCarry = function() {
    this._carryingObject = $gameMap.event(this._landingObject.eventId());
    this._carryingObject.carry();
    this._landingObject = null;
    AudioManager.playSe(actSeCarry);
  };

  // 投げる
  Game_Player.prototype.executeHurl = function() {
    this._carryingObject.hurl();
    if (Input.isPressed('up')) {            // 上を押しながら投げた
    } else if (Input.isPressed('down')) {   // 下を押しながら投げた

    } else {    // 左右いずれかを押しながら、またはどちらも押さずに投げた
      if (this._direction === 4 || Input.isPressed('left')) {
        this._carryingObject.dash(-0.14, -0.03)
      } else if (this._direction === 6 || Input.isPressed('right')) {
        this._carryingObject.dash(0.14, -0.03)
      } else {
        this._carryingObject.dash(0, 0);
      }
    }
    this._carryingObject = null;
    this._shotDelay = 1;
    AudioManager.playSe(actSeHurl);
  };

  // ボタン入力による攻撃
  Game_Player.prototype.attackByInput = function() {
	  if (this._ladder) {}else{ //爬楼梯无法进行攻击
    if (this._shotDelay > 0) {
      this._shotDelay--;
      this.removeGuard();         // 防御状態の解除
    } else {
      var n = this._shotWay;
      if (Input.isPressed('attack') && n > 0 && ActionCoolDown == 0) {
        var space = this._shotSpace;
        var speed = this._shotSpeed;
        var count = this._shotCountTime;
        var type = this._shotType;
        var index = this._shotIndex;
		CheckBullet = 0
        if (this._shotSkillId > 0) {
          var skillId = this._shotSkillId;
        } else {
          var skillId = this.battler().attackSkillId();
        }
        if (this._ladder) {
          if (Input.isPressed('left')) {
            this.setDirection(4); 
          } else if (Input.isPressed('right')) {
            this.setDirection(6); 
          }
        }
        var pan = 0;
		
        if (this._direction == 4) {
		if(ActionCharacter == 7){count-= 3}
		if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, Math.PI, speed, count, type, index, skillId)
			pan = -10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else if (this._direction == 6){
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, 0, speed, count, type, index, skillId)
				pan = 10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else {
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
				$gamePlayer.nwayShot(n, space, Math.PI * 1.5, speed, count, type, index, skillId)
	}, $dataWeapons[3002].meta.settimew);
        }
        this._shotDelay = this._shotDelayTime;
        if (actWeaponSprite) this.battler().performAttack();
       // AudioManager.playSe({name:this._shotSeName, pitch:this._shotSePitch,
       //                      volume:this._shotSeVolume, pan:pan});
        this.removeGuard();         // 防御状態の解除
      }  
	  
	  else if ($gameVariables.value(49)<2000&&(Input.isPressed('Q')&& n > 0&& $dataSkills[$gameVariables.value(49)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(49)].mpCost && ActionCoolDown == 0)) {
        var space = this._shotSpace;
        var speed = this._shotSpeed;
        var count = this._shotCountTime;
        var type = this._shotType;
        var index = this._shotIndex;
		if(Input.isPressed('Q')){
		var speed = 0.15
		var count = 30
		CheckBullet = 1
		setTimeout( function () {AudioManager.playSe({"name":"Skill10001","volume":90,"pitch":100,"pan":0})}, $dataWeapons[3002].meta.settimew)
		var skillId = $gameVariables.value(49)
		skillIdBullet = $gameVariables.value(49)-2
		$gameActors._data[1]._mp-= $dataSkills[$gameVariables.value(49)].mpCost
		} 
        if (this._ladder) {
          if (Input.isPressed('left')) {
            this.setDirection(4); 
          } else if (Input.isPressed('right')) {
            this.setDirection(6); 
          }
        }
        var pan = 0;
		
        if (this._direction == 4) {
		if(ActionCharacter == 7){count-= 3}
		if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, Math.PI, speed, count, type, index, skillId)
			pan = -10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else if (this._direction == 6){
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, 0, speed, count, type, index, skillId)
				pan = 10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else {
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
				$gamePlayer.nwayShot(n, space, Math.PI * 1.5, speed, count, type, index, skillId)
	}, $dataWeapons[3002].meta.settimew);
        }
        this._shotDelay = this._shotDelayTime;
        if (actWeaponSprite) this.battler().performAttack();
        //AudioManager.playSe({name:this._shotSeName, pitch:this._shotSePitch,
        //                     volume:this._shotSeVolume, pan:pan});
        this.removeGuard();         // 防御状態の解除
      }

	else if ($gameVariables.value(50)<2000&&(Input.isPressed('W')&& $dataSkills[$gameVariables.value(50)].meta.type == 1 && n > 0&& $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(50)].mpCost && ActionCoolDown == 0)) {
        var space = this._shotSpace;
        var speed = this._shotSpeed;
        var count = this._shotCountTime;
        var type = this._shotType;
        var index = this._shotIndex;
		if(Input.isPressed('W')){
		var speed = 0.15
		var count = 30
		CheckBullet = 1
		setTimeout( function () {AudioManager.playSe({"name":"Skill10001","volume":90,"pitch":100,"pan":0})}, $dataWeapons[3002].meta.settimew)
		var skillId = $gameVariables.value(50)	
		skillIdBullet = $gameVariables.value(50)-2
		$gameActors._data[1]._mp-= $dataSkills[$gameVariables.value(50)].mpCost
		} 
        if (this._ladder) {
          if (Input.isPressed('left')) {
            this.setDirection(4); 
          } else if (Input.isPressed('right')) {
            this.setDirection(6); 
          }
        }
        var pan = 0;
		
        if (this._direction == 4) {
		if(ActionCharacter == 7){count-= 3}
		if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, Math.PI, speed, count, type, index, skillId)
			pan = -10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else if (this._direction == 6){
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, 0, speed, count, type, index, skillId)
				pan = 10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else {
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
				$gamePlayer.nwayShot(n, space, Math.PI * 1.5, speed, count, type, index, skillId)
	}, $dataWeapons[3002].meta.settimew);
        }
        this._shotDelay = this._shotDelayTime;
        if (actWeaponSprite) this.battler().performAttack();
        //AudioManager.playSe({name:this._shotSeName, pitch:this._shotSePitch,
        //                     volume:this._shotSeVolume, pan:pan});
        this.removeGuard();         // 防御状態の解除
      }
else if ($gameVariables.value(51)<2000&&(Input.isPressed('E')&& $dataSkills[$gameVariables.value(51)].meta.type == 1 && n > 0&& $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(51)].mpCost && ActionCoolDown == 0)) {
        var space = this._shotSpace;
        var speed = this._shotSpeed;
        var count = this._shotCountTime;
        var type = this._shotType;
        var index = this._shotIndex;
		if(Input.isPressed('E')){
		var speed = 0.15
		var count = 30
		CheckBullet = 1
		setTimeout( function () {AudioManager.playSe({"name":"Skill10001","volume":90,"pitch":100,"pan":0})}, $dataWeapons[3002].meta.settimew)
		var skillId = $gameVariables.value(51)	
		skillIdBullet = $gameVariables.value(51)-2
		$gameActors._data[1]._mp-= $dataSkills[$gameVariables.value(51)].mpCost
		} 
        if (this._ladder) {
          if (Input.isPressed('left')) {
            this.setDirection(4); 
          } else if (Input.isPressed('right')) {
            this.setDirection(6); 
          }
        }
        var pan = 0;
		
        if (this._direction == 4) {
		if(ActionCharacter == 7){count-= 3}
		if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, Math.PI, speed, count, type, index, skillId)
			pan = -10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else if (this._direction == 6){
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, 0, speed, count, type, index, skillId)
				pan = 10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else {
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
				$gamePlayer.nwayShot(n, space, Math.PI * 1.5, speed, count, type, index, skillId)
	}, $dataWeapons[3002].meta.settimew);
        }
        this._shotDelay = this._shotDelayTime;
        if (actWeaponSprite) this.battler().performAttack();
        //AudioManager.playSe({name:this._shotSeName, pitch:this._shotSePitch,
        //                     volume:this._shotSeVolume, pan:pan});
        this.removeGuard();         // 防御状態の解除
      }
else if ($gameVariables.value(52)<2000&&(Input.isPressed('R')&& $dataSkills[$gameVariables.value(52)].meta.type == 1 && n > 0&& $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(52)].mpCost && ActionCoolDown == 0)) {
        var space = this._shotSpace;
        var speed = this._shotSpeed;
        var count = this._shotCountTime;
        var type = this._shotType;
        var index = this._shotIndex;
		if(Input.isPressed('R')){
		var speed = 0.15
		var count = 30
		CheckBullet = 1
		setTimeout( function () {AudioManager.playSe({"name":"Skill10001","volume":90,"pitch":100,"pan":0})}, $dataWeapons[3002].meta.settimew)
		var skillId = $gameVariables.value(52)	
		skillIdBullet = $gameVariables.value(52)-2
		$gameActors._data[1]._mp-= $dataSkills[$gameVariables.value(52)].mpCost
		} 
        if (this._ladder) {
          if (Input.isPressed('left')) {
            this.setDirection(4); 
          } else if (Input.isPressed('right')) {
            this.setDirection(6); 
          }
        }
        var pan = 0;
		
        if (this._direction == 4) {
		if(ActionCharacter == 7){count-= 3}
		if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, Math.PI, speed, count, type, index, skillId)
			pan = -10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else if (this._direction == 6){
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, 0, speed, count, type, index, skillId)
				pan = 10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else {
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
				$gamePlayer.nwayShot(n, space, Math.PI * 1.5, speed, count, type, index, skillId)
	}, $dataWeapons[3002].meta.settimew);
        }
        this._shotDelay = this._shotDelayTime;
        if (actWeaponSprite) this.battler().performAttack();
        //AudioManager.playSe({name:this._shotSeName, pitch:this._shotSePitch,
        //                     volume:this._shotSeVolume, pan:pan});
        this.removeGuard();         // 防御状態の解除
      }
else if ($gameVariables.value(53)<2000&&(Input.isPressed('A')&& $dataSkills[$gameVariables.value(53)].meta.type == 1 && n > 0&& $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(53)].mpCost && ActionCoolDown == 0)) {
        var space = this._shotSpace;
        var speed = this._shotSpeed;
        var count = this._shotCountTime;
        var type = this._shotType;
        var index = this._shotIndex;
		if(Input.isPressed('A')){
		var speed = 0.15
		var count = 30
		CheckBullet = 1
		setTimeout( function () {AudioManager.playSe({"name":"Skill10001","volume":90,"pitch":100,"pan":0})}, $dataWeapons[3002].meta.settimew)
		var skillId = $gameVariables.value(53)	
		skillIdBullet = $gameVariables.value(53)-2
		$gameActors._data[1]._mp-= $dataSkills[$gameVariables.value(53)].mpCost
		} 
        if (this._ladder) {
          if (Input.isPressed('left')) {
            this.setDirection(4); 
          } else if (Input.isPressed('right')) {
            this.setDirection(6); 
          }
        }
        var pan = 0;
		
        if (this._direction == 4) {
		if(ActionCharacter == 7){count-= 3}
		if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, Math.PI, speed, count, type, index, skillId)
			pan = -10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else if (this._direction == 6){
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, 0, speed, count, type, index, skillId)
				pan = 10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else {
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
				$gamePlayer.nwayShot(n, space, Math.PI * 1.5, speed, count, type, index, skillId)
	}, $dataWeapons[3002].meta.settimew);
        }
        this._shotDelay = this._shotDelayTime;
        if (actWeaponSprite) this.battler().performAttack();
        //AudioManager.playSe({name:this._shotSeName, pitch:this._shotSePitch,
        //                     volume:this._shotSeVolume, pan:pan});
        this.removeGuard();         // 防御状態の解除
      }
else if ($gameVariables.value(54)<2000&&(Input.isPressed('S')&& $dataSkills[$gameVariables.value(54)].meta.type == 1 && n > 0&& $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(54)].mpCost && ActionCoolDown == 0)) {
        var space = this._shotSpace;
        var speed = this._shotSpeed;
        var count = this._shotCountTime;
        var type = this._shotType;
        var index = this._shotIndex;
		if(Input.isPressed('S')){
		var speed = 0.15
		var count = 30
		CheckBullet = 1
		setTimeout( function () {AudioManager.playSe({"name":"Skill10001","volume":90,"pitch":100,"pan":0})}, $dataWeapons[3002].meta.settimew)
		var skillId = $gameVariables.value(54)	
		skillIdBullet = $gameVariables.value(54)-2
		$gameActors._data[1]._mp-= $dataSkills[$gameVariables.value(54)].mpCost
		} 
        if (this._ladder) {
          if (Input.isPressed('left')) {
            this.setDirection(4); 
          } else if (Input.isPressed('right')) {
            this.setDirection(6); 
          }
        }
        var pan = 0;
		
        if (this._direction == 4) {
		if(ActionCharacter == 7){count-= 3}
		if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, Math.PI, speed, count, type, index, skillId)
			pan = -10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else if (this._direction == 6){
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, 0, speed, count, type, index, skillId)
				pan = 10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else {
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
				$gamePlayer.nwayShot(n, space, Math.PI * 1.5, speed, count, type, index, skillId)
	}, $dataWeapons[3002].meta.settimew);
        }
        this._shotDelay = this._shotDelayTime;
        if (actWeaponSprite) this.battler().performAttack();
        //AudioManager.playSe({name:this._shotSeName, pitch:this._shotSePitch,
        //                     volume:this._shotSeVolume, pan:pan});
        this.removeGuard();         // 防御状態の解除
      }
else if ($gameVariables.value(55)<2000&&(Input.isPressed('D')&& $dataSkills[$gameVariables.value(55)].meta.type == 1 && n > 0&& $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(55)].mpCost && ActionCoolDown == 0)) {
        var space = this._shotSpace;
        var speed = this._shotSpeed;
        var count = this._shotCountTime;
        var type = this._shotType;
        var index = this._shotIndex;
		if(Input.isPressed('D')){
		var speed = 0.15
		var count = 30
		CheckBullet = 1
		setTimeout( function () {AudioManager.playSe({"name":"Skill10001","volume":90,"pitch":100,"pan":0})}, $dataWeapons[3002].meta.settimew)
		var skillId = $gameVariables.value(55)	
		skillIdBullet = $gameVariables.value(55)-2
		$gameActors._data[1]._mp-= $dataSkills[$gameVariables.value(55)].mpCost
		} 
        if (this._ladder) {
          if (Input.isPressed('left')) {
            this.setDirection(4); 
          } else if (Input.isPressed('right')) {
            this.setDirection(6); 
          }
        }
        var pan = 0;
		
        if (this._direction == 4) {
		if(ActionCharacter == 7){count-= 3}
		if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, Math.PI, speed, count, type, index, skillId)
			pan = -10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else if (this._direction == 6){
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, 0, speed, count, type, index, skillId)
				pan = 10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else {
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
				$gamePlayer.nwayShot(n, space, Math.PI * 1.5, speed, count, type, index, skillId)
	}, $dataWeapons[3002].meta.settimew);
        }
        this._shotDelay = this._shotDelayTime;
        if (actWeaponSprite) this.battler().performAttack();
        //AudioManager.playSe({name:this._shotSeName, pitch:this._shotSePitch,
        //                     volume:this._shotSeVolume, pan:pan});
        this.removeGuard();         // 防御状態の解除
      }
else if ($gameVariables.value(56)<2000&&(Input.isPressed('F')&& $dataSkills[$gameVariables.value(56)].meta.type == 1 && n > 0&& $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(56)].mpCost && ActionCoolDown == 0)) {
        var space = this._shotSpace;
        var speed = this._shotSpeed;
        var count = this._shotCountTime;
        var type = this._shotType;
        var index = this._shotIndex;
		if(Input.isPressed('F')){
		var speed = 0.15
		var count = 30
		CheckBullet = 1
		setTimeout( function () {AudioManager.playSe({"name":"Skill10001","volume":90,"pitch":100,"pan":0})}, $dataWeapons[3002].meta.settimew)
		var skillId = $gameVariables.value(56)	
		skillIdBullet = $gameVariables.value(56)-2
		$gameActors._data[1]._mp-= $dataSkills[$gameVariables.value(56)].mpCost
		} 
        if (this._ladder) {
          if (Input.isPressed('left')) {
            this.setDirection(4); 
          } else if (Input.isPressed('right')) {
            this.setDirection(6); 
          }
        }
        var pan = 0;
		
        if (this._direction == 4) {
		if(ActionCharacter == 7){count-= 3}
		if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, Math.PI, speed, count, type, index, skillId)
			pan = -10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else if (this._direction == 6){
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
			$gamePlayer.nwayShot(n, space, 0, speed, count, type, index, skillId)
				pan = 10;
	}, $dataWeapons[3002].meta.settimew);
          
        } else {
			if(ActionCharacter == 7){count-= 3}
			if(ActionCharacter == 9){count+= 10}
			setTimeout( function () {
				$gamePlayer.nwayShot(n, space, Math.PI * 1.5, speed, count, type, index, skillId)
	}, $dataWeapons[3002].meta.settimew);
        }
        this._shotDelay = this._shotDelayTime;
        if (actWeaponSprite) this.battler().performAttack();
        //AudioManager.playSe({name:this._shotSeName, pitch:this._shotSePitch,
        //                     volume:this._shotSeVolume, pan:pan});
        this.removeGuard();         // 防御状態の解除
      }


	  }}
  };

  // ボタン入力による操作アクター変更
  Game_Player.prototype.changeByInput = function() {
    if (this._carryingObject) return;
    if (Input.isTriggered('pageup')) {
      this.changeMember(true);
    } else if (Input.isTriggered('pagedown')) {
      this.changeMember(false);
    }
  };

  // 操作メンバーの切り替え
  Game_Player.prototype.changeMember = function(reverse) {
    var startActorId = this.actor().actorId();
    if (reverse) {
      $gameParty.backSlideActor();
    } else {
      $gameParty.frontSlideActor();
    }
    if (!this.isChangeMemberEnable()) $gameParty.sortActor(startActorId);
    if (startActorId !== this.actor().actorId()) {
      this.removeGuard();         // 防御状態の解除
      this.battler().requestEffect('appear');
      AudioManager.playSe(actSeChange);
      $gameMap.requestRefresh();
    }
  };

  // 指定したアクターに切り替えが可能かどうか
  Game_Player.prototype.isChangeMemberEnable = function() {
    var actor = this.actor();
    if (actor.isDead()) return false;
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (character.isNormalPriority() && this.isCollide(character)) return false;
    }
    var lx = Math.floor(this._realX - this._collideW);
    var rx = Math.floor(this._realX + this._collideW);
    var ty = Math.floor(this._realY - this._collideH);
    var by = Math.floor(this._realY + actTileMarginTop);
    for (var x = lx; x <= rx; x++) {
      if (!$gameMap.isPassable(x, ty, 8)) return false;
      if (!$gameMap.isPassable(x, by, 2)) return false;
    }
    for (var y = ty; y <= by; y++) {
      if (!$gameMap.isPassable(lx, y, 4)) return false;
      if (!$gameMap.isPassable(rx, y, 6)) return false;
    }
    return true;
  };
  
  // 方向ボタン入力による移動処理
  Game_Player.prototype.moveByInput = function() {
    if (this._ladder) {
      if (Input.isPressed('up')) {
        this.setDirection(8);
        this._vy = Math.max(this._vy - this._ladderAccele, -this._ladderSpeed);
        this._moveCount = 4;
        this.resetStopCount();
      } else if (Input.isPressed('down')) {
        this.setDirection(8);
        this._vy = Math.min(this._vy + this._ladderAccele, this._ladderSpeed);
        this._moveCount = 4;
        this.resetStopCount();
      }
      if (!this.isCollideLadder(false)) {
        this.getOffLadder();
      }
    } else {
      if (!this.isDashing()) {
		if (Input.isPressed('left') && (ActionCharacter < 6||((ActionCharacter > 5&&ActionCharacter < 10) && $gamePlayer._pattern==2 && $gamePlayer._animationCount > ($dataWeapons[3002].meta.WeaponSpeedX/80*35-1))||(ActionCharacter > 20 && $gamePlayer._pattern==2 && $gamePlayer._animationCount > ($dataWeapons[3002].meta.WeaponSpeedX/80*35-1))||((ActionCharacter > 9&&ActionCharacter < 12) && $gamePlayer._pattern==1 && $gamePlayer._animationCount > ($dataWeapons[3002].meta.WeaponSpeedX/80*35-1)))&& $gamePlayer._direction !== 8){
          var speed = this.isGuarding() ? -this._moveSpeed * actGuardMoveRate / 100 : -this._moveSpeed;
          if(!Input.isPressed('down')||Input.isPressed('left')){this.setDirection(4);}
          if (this._vx > speed) {
            var accele = Math.max(this._accele - this._friction, 0);
            this._vx = Math.max(this._vx - accele, speed);
          }
          this._moveCount = 4;
   if ((Input.isPressed('attack')||
   ($gameVariables.value(49)<2000&&(Input.isPressed('Q')&& $dataSkills[$gameVariables.value(49)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(49)].mpCost))||
   ($gameVariables.value(50)<2000&&(Input.isPressed('W')&& $dataSkills[$gameVariables.value(50)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(50)].mpCost))||
   ($gameVariables.value(51)<2000&&(Input.isPressed('E')&& $dataSkills[$gameVariables.value(51)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(51)].mpCost))||
   ($gameVariables.value(52)<2000&&(Input.isPressed('R')&& $dataSkills[$gameVariables.value(52)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(52)].mpCost))||
   ($gameVariables.value(53)<2000&&(Input.isPressed('A')&& $dataSkills[$gameVariables.value(53)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(53)].mpCost))||
   ($gameVariables.value(54)<2000&&(Input.isPressed('S')&& $dataSkills[$gameVariables.value(54)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(54)].mpCost))||
   ($gameVariables.value(55)<2000&&(Input.isPressed('D')&& $dataSkills[$gameVariables.value(55)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(55)].mpCost))||
   ($gameVariables.value(56)<2000&&(Input.isPressed('F')&& $dataSkills[$gameVariables.value(56)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(56)].mpCost)))&& ActionCoolDown == 0){

	  }else{
		  if ($gamePlayer._jumpCount == 1 ){$gamePlayer._characterName = '!$walking%(4)';ActionCharacter = 2}}
		} else  if (Input.isPressed('right') && (ActionCharacter < 6||((ActionCharacter > 5&&ActionCharacter < 10) && $gamePlayer._pattern==2 && $gamePlayer._animationCount > ($dataWeapons[3002].meta.WeaponSpeedX/80*35-1))||(ActionCharacter > 20 && $gamePlayer._pattern==2 && $gamePlayer._animationCount > ($dataWeapons[3002].meta.WeaponSpeedX/80*35-1))||((ActionCharacter > 9&&ActionCharacter < 12) && $gamePlayer._pattern==1 && $gamePlayer._animationCount > ($dataWeapons[3002].meta.WeaponSpeedX/80*35-1)))&& $gamePlayer._direction !== 8){
          var speed = this.isGuarding() ? this._moveSpeed * actGuardMoveRate / 100  : this._moveSpeed;
          this.setDirection(6);
          if (this._vx < speed) {
            var accele = Math.max(this._accele - this._friction, 0);
            this._vx = Math.min(this._vx + accele, speed);
          }
          this._moveCount = 4;
   if ((Input.isPressed('attack')||
   ($gameVariables.value(49)<2000&&(Input.isPressed('Q')&& $dataSkills[$gameVariables.value(49)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(49)].mpCost))||
   ($gameVariables.value(50)<2000&&(Input.isPressed('W')&& $dataSkills[$gameVariables.value(50)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(50)].mpCost))||
   ($gameVariables.value(51)<2000&&(Input.isPressed('E')&& $dataSkills[$gameVariables.value(51)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(51)].mpCost))||
   ($gameVariables.value(52)<2000&&(Input.isPressed('R')&& $dataSkills[$gameVariables.value(52)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(52)].mpCost))||
   ($gameVariables.value(53)<2000&&(Input.isPressed('A')&& $dataSkills[$gameVariables.value(53)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(53)].mpCost))||
   ($gameVariables.value(54)<2000&&(Input.isPressed('S')&& $dataSkills[$gameVariables.value(54)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(54)].mpCost))||
   ($gameVariables.value(55)<2000&&(Input.isPressed('D')&& $dataSkills[$gameVariables.value(55)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(55)].mpCost))||
   ($gameVariables.value(56)<2000&&(Input.isPressed('F')&& $dataSkills[$gameVariables.value(56)].meta.type == 1 && $gameActors._data[1]._mp>=$dataSkills[$gameVariables.value(56)].mpCost)))&& ActionCoolDown == 0){

	  }else{
		  if ($gamePlayer._jumpCount == 1 ){$gamePlayer._characterName = '!$walking%(4)';ActionCharacter = 2}}
        }
      }
      if (Input.isPressed('up')&&!Input.isPressed('down')) {
        if (this.isCollideLadder(false)) this.getOnLadder(false);
      } else if (Input.isPressed('down')) {
		   if ((ActionCharacter < 6||((ActionCharacter > 5&&ActionCharacter < 10) && $gamePlayer._pattern==2 && $gamePlayer._animationCount > ($dataWeapons[3002].meta.WeaponSpeedX/80*35-1))||(ActionCharacter > 20 && $gamePlayer._pattern==2 && $gamePlayer._animationCount > ($dataWeapons[3002].meta.WeaponSpeedX/80*35-1))||((ActionCharacter > 9&&ActionCharacter < 12) && $gamePlayer._pattern==1 && $gamePlayer._animationCount > ($dataWeapons[3002].meta.WeaponSpeedX/80*35-1)))&& $gamePlayer._direction !== 8){
		  if (!Input.isPressed('right')&&!Input.isPressed('left')) {
			  $gamePlayer._characterName = '!$onfloor%(1)';ActionCharacter = 5}}
        if (this.isCollideLadder(true)) this.getOnLadder(true);
      }
    }
  };

  // ボタン入力によるジャンプ処理
  Game_Player.prototype.jumpByInput = function() {
    if (this._jumpInput > 0) {
      this._jumpInput--;
      if (Input.isPressed('jump')) {
        this._vy = -this._jumpSpeed;
      } else {
        this._jumpInput = 0;
      }
    }
    if (Input.isTriggered('jump')) {
		if($gamePlayer._characterName == '!$onfloor%(1)'&& (this._landingRegion == 1||this._landingRegion == 2)){
	    setTimeout( function () {
		$gamePlayer._through = false
		}, 1);
		$gamePlayer._through = true;return
		}
		//按下跳按钮
      if (this.isSwimming()) {
        this.resetJump();
        this._jumpCount--;
      } else if (this._jumpCount > 0) {
        this._jumpCount--;
      } else {
        if (!this._wallJump) return;
        if (this._direction == 4) {
          var x = Math.floor(this._realX - this._collideW - 0.16);
        } else {
          var x = Math.floor(this._realX + this._collideW + 0.16);
        }
        var y = Math.floor(this._realY);
        if (!$gameMap.canWallJump(x, y, this._direction)) return;
        this.wallJump();
      }
      if (this._ladder) {
		  if (Input.isPressed('left')||Input.isPressed('right')){
		  this.getOffLadder();} else {
			  if (Input.isPressed('jump')){	  
		  this.resetJump()	
		  if (Input.isPressed('jump')) return;}}
		
		if (Input.isPressed('down')) return;       
      }
      this._jumpInput = this._jumpInputTime;
      if (this.isDashing()) {
        this._dashCount = this._dashCountTime;
        this._vx = this._direction == 4 ? -this._dashSpeedX : this._dashSpeedX
      }
      this._vy = this.isSwimming() ? -this._swimJump : -this._jumpSpeed;
      this.resetStopCount();
       if(this == $gamePlayer && (ActionCharacter<6||ActionCharacter==19||ActionCharacter==20)){this.straighten()};
      AudioManager.playSe(actSeJump);
    }
  };

  // 壁ジャンプの X 方向処理
  Game_Player.prototype.wallJump = function() {
    this._vx = this._direction == 4 ? this._moveSpeed : -this._moveSpeed;
    this.setDirection(this.reverseDir(this._direction));
    this.resetPeak();
  };

  // ボタン入力によるダッシュ処理
  Game_Player.prototype.dashByInput = function() {
    if (this._dashDelay > 0) {
      this._dashDelay--;
      this.removeGuard();         // 防御状態の解除
    } else {
      var battler = this.actor();
      if (Input.isTriggered('dash') && !this.isSwimming() &&
          !$gameMap.isDashDisabled() && battler.mp >= this._dashMpCost) {
        if (this._ladder) {
          this.getOffLadder()
          if (Input.isPressed('left')) {
            this.setDirection(4);
          } else if (Input.isPressed('right')) {
            this.setDirection(6);
          }
        } else {
          if (!this._direction == 4) {
            this.setDirection(6);
          }
        }
        this.dashFromDirection(this._direction);
        this._dashDelay = this._dashDelayTime;
        AudioManager.playSe(actSeDash);
        this.removeGuard();         // 防御状態の解除
        if (this._dashMpCost > 0) battler.gainMp(-this._dashMpCost);
      }
    }
  };

  // ボタン入力によるガード処理
  Game_Player.prototype.guardByInput = function() {

  };

  // ガードの解除
  Game_Player.prototype.removeGuard = function() {
    var battler = this.actor();
    this._guardInput = 0;
    if (battler) battler.removeState(actGuardStateId);
  };

  // 歩数の処理
  Game_Player.prototype.updateSteps = function(lastRealX, lastRealY) {
    this._realSteps += Math.max(Math.abs(this._realX - lastRealX), Math.abs(this._realY - lastRealY));
    if (this._realSteps >= 1) {
      if (this.isNormal()) {
        $gameParty.increaseSteps();
        if (this.actor()) this.actor().onPlayerWalk();
      }
      this._realSteps = 0;
    }
  };

  // 泳ぎ状態の更新
  Game_Player.prototype.updateSwiming = function() {
    Game_Character.prototype.updateSwiming.call(this);
    AudioManager.playSe(actSeSwim);
    this.resetPeak();
  };

  // マップイベントの起動
  Game_Player.prototype.startMapEvent = function(triggers, normal) {
    if (!$gameMap.isEventRunning()) {
      var targets = this.collideTargets();
      for (var i = 0; i < targets.length; i++) {
        var character = targets[i];
        if (this.isCollide(character)) {
          if (character.isTriggerIn(triggers) && character.isNormalPriority() === normal) {
            if (character.isBattler() && character.battler().isDead()) continue;
            character.start();
          }
        }
      }
    }
  };

  // 接触しているイベントの起動判定
  Game_Player.prototype.checkEventTriggerHere = function(triggers) {
    if (this.canStartLocalEvents()) this.startMapEvent(triggers, false);
  };

  // 正面のイベント起動判定
  Game_Player.prototype.checkEventTriggerThere = function(triggers) {
    var lastRealX = this._realX;
    this._realX += this._direction == 4 ? -this._collideW : this._collideW
    this.startMapEvent(triggers, true);
    this._realX += this._direction == 4 ? -0.5 : 0.5;
    if (!$gameMap.isAnyEventStarting() && $gameMap.isCounter(Math.floor(this._realX), this._y)) {
      this._realX += this._direction == 4 ? -0.5 : 0.5;
      this.startMapEvent(triggers, true);
    }
    this._realX = lastRealX;
  };

  // はしごと接触しているか
  Game_Player.prototype.isCollideLadder = function(downFlag) {
    var x = Math.floor(this._realX);
    if (downFlag) {
      if (!this.isLanding()) return false;
      var y = Math.floor(this._realY + actTileMarginTop + 0.1);
      return $gameMap.isLadder(x, y);
    } else {
      var ty = Math.floor(this._realY - this._collideH);
      var by = Math.floor(this._realY + actTileMarginTop);
      for (var y = ty; y <= by; y++) {
        if ($gameMap.isLadder(x, y)) return true;
      }
      return false;
    }
  };

  // 場所移動の実行
  Game_Player.prototype.performTransfer = function() {
    if (this.isTransferring()) {
      this.setDirection(this._newDirection);
      if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
        $gameMap.setup(this._newMapId);
        this._needsMapReload = false;
      }
      this.locate(this._newX + CurrentX, this._newY + CurrentY - actTileMarginTop);
      this.refresh();
      this.clearTransferInfo();
    }
  };

  // リフレッシュ
  Game_Player.prototype.refresh = function() {
    var actor = this.actor();
    if (actor) {
      var characterName   = actor.characterName();
      var characterIndex  = actor.characterIndex();
      var data = actor.actor();
	  if(NoAction == 1){this._moveSpeed = +0.015}else{
      this._moveSpeed = +(data.meta['move_speed'] || 0.035);}
      this._jumpSpeed = +(data.meta['jump_speed'] || 0.11);
      this._swimSpeed = +(data.meta['swim_speed'] || 0.02);
      this._ladderSpeed = +(data.meta['ladder_speed'] || this._moveSpeed/1.5);
      this._accele = +(data.meta['accele'] || 0.003);
      this._ladderAccele = +(data.meta['ladder_accele'] || 0.003);
      this._jumpInputTime = +(data.meta['jump_input'] || 0);
      this._swimJump = +(data.meta['swim_jump'] || 0.1);
      this._mulchJump = +(data.meta['mulch_jump'] || 1);
      this._weight = +(data.meta['weight'] || 0);
      this._carryPower = +(data.meta['carry_power'] || 0);
      this._gravity = +(data.meta['gravity'] || 0.0045);
      this._dashSpeedX = +(data.meta['dash_speed_x'] || 0.14);
      this._dashSpeedY = +(data.meta['dash_speed_y'] || 0.03);
      this._dashCountTime = +(data.meta['dash_count'] || 15);
      this._dashDelayTime = +(data.meta['dash_delay'] || 30);
      this._dashMpCost = +(data.meta['dash_mp_cost'] || 0);
      this._collideW = +(data.meta['w'] || 0.375);
      this._collideH = +(data.meta['h'] || 0.75);
      this._fallGuard = +(data.meta['fall_guard'] || 0);
      this._guardSpeed = +(data.meta['guard_speed'] || 0);
      this._invincibleTime = +(data.meta['invincible_time'] || 120);
      this._shotWay = +(data.meta['shot_way'] || 0);
      this._shotSpace = +(data.meta['shot_space'] || 0.2);
      this._shotSpeed = +(data.meta['shot_speed'] || 0.1);
      this._shotCountTime = +(data.meta['shot_count'] || 30);
      this._shotDelayTime = +(data.meta['shot_delay'] || 10);
      var traitObjects = actor.equips().concat(actor.states());
      for (var i = 0; i < traitObjects.length; i++) {
        var obj = traitObjects[i];
        if (obj) {
          if (obj.meta['move_speed']) this._moveSpeed += +obj.meta['move_speed'];
          if (obj.meta['jump_speed']) this._jumpSpeed += +obj.meta['jump_speed'];
          if (obj.meta['swim_speed']) this._swimSpeed += +obj.meta['swim_speed'];
          if (obj.meta['ladder_speed']) this._ladderSpeed += +obj.meta['ladder_speed'];
          if (obj.meta['accele']) this._accele += +obj.meta['accele'];
          if (obj.meta['ladder_accele']) this._ladderAccele += +obj.meta['ladder_accele'];
          if (obj.meta['jump_input']) this._jumpInputTime += +obj.meta['jump_input'];
          if (obj.meta['swim_jump']) this._swimJump += +obj.meta['swim_jump'];
          if (obj.meta['mulch_jump']) this._mulchJump += +obj.meta['mulch_jump'];
          if (obj.meta['weight']) this._weight += +obj.meta['weight'];
          if (obj.meta['carry_power']) this._carryPower += +obj.meta['carry_power'];
          if (obj.meta['gravity']) this._gravity += +obj.meta['gravity'];
          if (obj.meta['dash_speed_x']) this._dashSpeedX += +obj.meta['dash_speed_x'];
          if (obj.meta['dash_speed_y']) this._dashSpeedY += +obj.meta['dash_speed_y'];
          if (obj.meta['dash_count']) this._dashCountTime += +obj.meta['dash_count'];
          if (obj.meta['dash_delay']) this._dashDelayTime += +obj.meta['dash_delay'];
          if (obj.meta['dash_mp_cost']) this._dashMpCost += +obj.meta['dash_mp_cost'];
          if (obj.meta['w']) this._collideW += +obj.meta['w'];
          if (obj.meta['h']) this._collideH += +obj.meta['h'];
          if (obj.meta['fall_guard']) this._fallGuard += +obj.meta['fall_guard'];
          if (obj.meta['guard_speed']) this._guardSpeed += +obj.meta['guard_speed'];
          if (obj.meta['invincible_time']) this._invincibleTime += +obj.meta['invincible_time'];
          if (obj.meta['shot_way']) this._shotWay += +obj.meta['shot_way'];
          if (obj.meta['shot_space']) this._shotSpace += +obj.meta['shot_space'];
          if (obj.meta['shot_speed']) this._shotSpeed += +obj.meta['shot_speed'];
          if (obj.meta['shot_count']) this._shotCountTime += +obj.meta['shot_count'];
          if (obj.meta['shot_delay']) this._shotDelayTime += +obj.meta['shot_delay'];
        }
      }
      this._wallJump = actor.loadTagBool('wall_jump');
      this._shotType = +actor.loadTagString('shot_type', 1);
      this._shotIndex = +actor.loadTagString('shot_index', 0);
      this._shotSkillId = +actor.loadTagString('shot_skill', 0);
      this._shotSeName = actor.loadTagString('shot_se_name', '');
      this._shotSeVolume = +actor.loadTagString('shot_se_volume', 90);
      this._shotSePitch = +actor.loadTagString('shot_se_pitch', 100);
    } else {
      var characterName   = '';
      var characterIndex  = 0;
    }
    this.setImage(characterName, characterIndex);
    this._followers.refresh();
    this._needsRefresh = false;
  };

  // 飛行船の乗り降り
  Game_Player.prototype.getOnOffVehicle = function() {
    return false;
  };

  // まっすぐに移動
  Game_Player.prototype.moveStraight = function(d) {
    Game_Character.prototype.moveStraight.call(this, d);
  };

  // バトラーが戦闘不能になったときの処理
  Game_Player.prototype.battlerDead = function() {
    this._lockCount = 32;
    if ($gameParty.isAllDead()) {
	if (this._ladder){
	this.getOffLadder()
	setTimeout( function () {
	$gameTemp.reserveCommonEvent(actAllDeadEvent)
	}, 1300);
	}
	else
	{$gameTemp.reserveCommonEvent(actAllDeadEvent)}
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //

  // 初期化
  Game_Event.prototype.initialize = function(mapId, eventId) {
    Game_Character.prototype.initialize.call(this);
    this._mapId = mapId;
    this._eventId = eventId;
    this._repopCount = 0;
    this.locate(this.event().x + 0.5, this.event().y + 1);
    this.refresh();
  };

  // メンバ変数の初期化
  var _Game_Event_initMembers = Game_Event.prototype.initMembers;
  Game_Event.prototype.initMembers = function() {
    _Game_Event_initMembers.call(this);
    this._enemyId = 0;
    this._battler = null;
    this._deadSelfSwitch = null;
    this._commentParams = {};
  };

  // バトラーの取得
  Game_Event.prototype.battler = function() {
    return this._battler;
  };

  // 衝突したイベントの起動
  Game_Event.prototype.checkEventTriggerCollide = function(id) {
    if (!$gameMap.isEventRunning() && id < 0) {
//      if (this.isTriggerIn([1, 2]) && this.isNormalPriority() === normal) {
      if (this.isTriggerIn([1, 2])) this.start();
    }
  };

  // リフレッシュ
  var _Game_Event_refresh = Game_Event.prototype.refresh;
  Game_Event.prototype.refresh = function() {
    _Game_Event_refresh.call(this);
    this._needsRefresh = false;
  };

  // イベントページのセットアップ
  var _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {
      this._enemyId        = +this.loadTagParam('enemy') || 0;
      this._collideW       = +this.loadTagParam('w') || 0.375;
      this._collideH       = +this.loadTagParam('h') || 0.75;
      this._weight         = +this.loadTagParam('weight') || 0;
      this._deadSelfSwitch = this.loadTagParam('dead');
      this._repopTimer     = +this.loadTagParam('repop')+2800+Math.randomInt(70)*80 || 0;
      if (this._repopTimer > 0) {
        this._repopCount = this._repopTimer;
      }
      var param = this.loadTagParam('gravity');
      this._gravity        = param ? +param : actGravity;
      this._lift           = this.loadTagParam('lift') || false;
      this.setupBattler();
    }
  };

  // バトラーのセットアップ
  Game_Event.prototype.setupBattler = function() {
    if (this._enemyId > 0) {
      this._battler = new Game_Enemy(this._enemyId, this.eventId(), 0);
	  this.setDirection(4 + Math.randomInt(2) * 2)
	  this._animationCount = Math.randomInt(20)
    } else {
      this._battler = null;
    }
  };

  // フレーム更新
  var _Game_Event_update = Game_Event.prototype.update;
  Game_Event.prototype.update = function() {
    if (this._carried) {
      this._realX = $gamePlayer._realX;
      this._realY = $gamePlayer._realY - $gamePlayer._collideH - 0.001;
      this._x = Math.floor(this._realX);
      this._y = Math.floor(this._realY);
    } else {
      if (this.isLocking()) {
        this.updateLock();
      } else {
        _Game_Event_update.call(this);
        if (this._repopCount > 0) this.updateRepop();
      }
      if (this.isBattler()) this.updateDamage();
    }
  };

  // 摩擦の処理
  Game_Event.prototype.updateFriction = function() {
    Game_Character.prototype.updateFriction.call(this);
    if (!this.isMoving() && this._vx != 0) {
      if (!this.isDashing()) {
        var n = this.isSwimming() ? this._swimSpeed : this._moveSpeed;
        if (this._vx < -n) {
          this._vx = Math.min(this._vx + 0.005, -n);
        }
        if (this._vx > n) {
          this._vx = Math.max(this._vx - 0.005, n);
        }
      }
      if (this.isLanding()) {
        var n = actFriction;
        switch (this._landingRegion) {
        case actSlipFloorRegion:
          return;
        case actRoughFloorRegion:
          if (Math.abs(this._vx) > this._moveSpeed / 2) {
            this._vx = this._vx > 0 ? this._moveSpeed / 2 : -this._moveSpeed / 2;
          }
          break;
        case actMarshFloorRegion:
          this._vx = 0;
          return;
        }
        if (this._vx > 0) {
          this._vx = Math.max(this._vx - n, 0);
        } else {
          this._vx = Math.min(this._vx + n, 0);
        }
      }
    }
  };

  // リポップカウントの処理
  Game_Event.prototype.updateRepop = function() {
    this._repopCount--;
	if ($gameMap.event(this._eventId)._opacity == 255){
	if (this._repopCount === 430) {
		 var key = [$gameMap.mapId(), this._eventId, 'B'];
      if ($gameSelfSwitches.value(key)) {
		  $gameMap.event(this._eventId).setOpacity(215)
	}
	var key = [$gameMap.mapId(), this._eventId, 'C'];
      if ($gameSelfSwitches.value(key)) {
		  $gameMap.event(this._eventId).setOpacity(215)
	}
	
	}if (this._repopCount === 420) {
		 var key = [$gameMap.mapId(), this._eventId, 'B'];
      if ($gameSelfSwitches.value(key)) {
		  $gameMap.event(this._eventId).setOpacity(155)
	}
	var key = [$gameMap.mapId(), this._eventId, 'C'];
      if ($gameSelfSwitches.value(key)) {
		  $gameMap.event(this._eventId).setOpacity(155)
	}
	
	}
	if (this._repopCount === 410) {
		 var key = [$gameMap.mapId(), this._eventId, 'B'];
      if ($gameSelfSwitches.value(key)) {
		  $gameMap.event(this._eventId).setOpacity(75)
	}
	var key = [$gameMap.mapId(), this._eventId, 'C'];
      if ($gameSelfSwitches.value(key)) {
		  $gameMap.event(this._eventId).setOpacity(75)
	}
	
	}}

	if (this._repopCount == 400) {
		var key = [$gameMap.mapId(), this._eventId, 'B'];
		if ($gameSelfSwitches.value(key)) {
		var key = [$gameMap.mapId(), this._eventId, 'B'];
		$gameSelfSwitches.setValue(key, false);
		var key = [$gameMap.mapId(), this._eventId, 'A'];
		$gameSelfSwitches.setValue(key, false);
		$gameMap.event(this._eventId).setOpacity(255)
		}
		var key = [$gameMap.mapId(), this._eventId, 'C'];
		if ($gameSelfSwitches.value(key)) {
			this.setTransparent(true)
		var key = [$gameMap.mapId(), this._eventId, 'B'];
		$gameSelfSwitches.setValue(key, false);
		var key = [$gameMap.mapId(), this._eventId, 'A'];
		$gameSelfSwitches.setValue(key, false);
	}}
	if (this._repopCount == 100) {
		var key = [$gameMap.mapId(), this._eventId, 'C'];
		if ($gameSelfSwitches.value(key)) {
		$gameMap.event(this._eventId,4).start()}
	}
    if (this._repopCount === 0) {
		 var key = [$gameMap.mapId(), this._eventId, 'C'];
      if ($gameSelfSwitches.value(key)) {
        $gameSelfSwitches.setValue(key, false);
		var key = [$gameMap.mapId(), this._eventId, 'B'];
		$gameSelfSwitches.setValue(key, false);
		var key = [$gameMap.mapId(), this._eventId, 'A'];
		$gameSelfSwitches.setValue(key, false);
		this.setTransparent(false)
        this.refresh();
        this.requestAppear();
		$gameMap.event(this._eventId).setOpacity(255)
      }
 
    }
  };

  // 出現エフェクトのリクエスト
  Game_Event.prototype.requestAppear = function() {
    if (this.isBattler()) {
      if (actEventCollapse) this.battler().requestEffect('appear');
	  if (actEventCollapse) this.battler().requestEffect('whiten');
    }
  };
  
  // バトラーが戦闘不能になったときの処理
  Game_Event.prototype.battlerDead = function() {
    if (actEventCollapse) {
      this._lockCount = 32;
      //this.battler().requestEffect('collapse');
      //SoundManager.playEnemyCollapse();
    } else {
      this._lockCount = 1;
    }
  };

  // ロック状態の処理
  Game_Event.prototype.updateLock = function() {
    this._lockCount--;
    if (this._lockCount == 0) {
      if (this.battler().isDead()) {
        this.gainRewards();
        if (this._deadSelfSwitch !== null) {
			directionbeforedead = this._direction
			this._pattern = 0
		 if ( this._direction == 2){
		  var key = [$gameMap.mapId(), this._eventId, 'A'];
		 } else {
          var key = [$gameMap.mapId(), this._eventId, 'B'];
		 }
          $gameSelfSwitches.setValue(key, true);
          this.refresh();
          this.requestAppear();
        } else {
          this.erase();
        }
      }
    }
  };
  
  // 撃破報酬の獲得
  Game_Event.prototype.gainRewards = function() {
    var exp = this.battler().exp();
    if (exp > 0) this.gainRewardExp(exp);
    var gold = this.battler().gold();
    if (gold > 0) this.gainRewardGold(gold);
    var items = this.battler().makeDropItems();
    for (var i = 0; i < items.length; i++) {
      this.gainRewardItem(items[i], -16 - (items.length - i) * 24);
    }
  };

  // 撃破報酬（経験値）の獲得
  Game_Event.prototype.gainRewardExp = function(exp) {
    $gameParty.allMembers().forEach(function(actor) {
      actor.gainExp(exp);
    });
    //this.setMapPopup('' + exp + TextManager.exp, '#ffe0ff', -40, -0.2, 0);
  };
  
  // 撃破報酬（お金）の獲得
  Game_Event.prototype.gainRewardGold = function(gold) {
    $gameParty.gainGold(gold);
    //this.setMapPopup('' + gold + TextManager.currencyUnit, '#ffffe0', -64, -0.2, 0);
  };
  
  // 撃破報酬（アイテム）の獲得
  Game_Event.prototype.gainRewardItem = function(item, y) {
    //$gameParty.gainItem(item, 1);
//this.setMapPopup('\\I[' + item.iconIndex + ']', '#000000', y, -4, 0.5);
  };
  
  // 泳ぎ状態の更新
  Game_Event.prototype.updateSwiming = function() {
    Game_Character.prototype.updateSwiming.call(this);
    if (actUseEventSeSwim) {
      var origin_volume = actSeSwim.volume;
      var volume = Math.floor(origin_volume * ((15 - this.distFromCharacter($gamePlayer))) / 15);
      var se = {};
      se.name = actSeSwim.name;
      se.volume = Math.min(Math.max(volume, 0), 100);
      se.pitch = actSeSwim.pitch;
      if (this._realX < $gamePlayer._realX) {
        se.pan = Math.max(Math.floor((this._realX - $gamePlayer._realX) * 10, -100));
      } else {
        se.pan = Math.min(Math.floor((this._realX - $gamePlayer._realX) * 10, 100));
      }
      AudioManager.playSe(se);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  // イベントの位置変更
  Game_Interpreter.prototype.command203 = function() {
    var character = this.character(this._params[0]);
    if (character) {
      if (this._params[1] === 0) {  // Direct designation
        character.locate(this._params[2] + 0.5, this._params[3] + 1);
      } else if (this._params[1] === 1) {  // Designation with variables
        var x = $gameVariables.value(this._params[2] + 0.5);
        var y = $gameVariables.value(this._params[3] + 1);
        character.locate(x, y);
      } else {  // Exchange with another event
        var character2 = this.character(this._params[2]);
        if (character2) character.swap(character2);
      }
      if (this._params[4] > 0) character.setDirection(this._params[4]);
    }
    return true;
  };

  // 装備の変更
  var _Game_Interpreter_command319 = Game_Interpreter.prototype.command319;
  Game_Interpreter.prototype.command319 = function() {
    _Game_Interpreter_command319.call(this);
    if (!$gameParty.inBattle()) $gamePlayer.requestRefresh();
    return true;
  };

  // プラグインコマンド
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'actGainHp') {
      var character = this.character(args[0]);
      if (character && character.isBattler()) {
        character.battler().clearResult();
        character.battler().gainHp(+args[1]);
      }
    } else if (command === 'actHp') {
      var character = this.character(args[0]);
      if (character && character.isBattler()) {
        $gameVariables.setValue(+args[1], character.battler().hp);
      }
    } else if (command === 'actForceX') {
      var character = this.character(args[0]);
      if (character) character._vx = +args[1];
    } else if (command === 'actForceY') {
      var character = this.character(args[0]);
      if (character) character._vy = +args[1];
    } else if (command === 'actForceStop') {
      var character = this.character(args[0]);
      if (character) {
        character._vx = 0;
        character._vy = 0;
      }
    } else if (command === 'actChangeActor') {
      var actor = $gameActors.actor(+args[0]);
      if (actor && actor.isAlive() && $gameParty.members().contains(actor)) {
        var currentActorId = $gamePlayer.actor().actorId();
        $gameParty.sortActor(+args[0]);
        if (currentActorId !== $gamePlayer.actor().actorId()) {
          $gamePlayer.refresh();
          $gamePlayer.battler().requestEffect('appear');
        }
      }
    } else if (command === 'actPopup') {
      var character = this.character(args[0]);
      if (character) character.setMapPopup(args[1], args[2]);
    } else if (command === 'nwayShot') {
      var character = this.character(args[0]);
      if (character && character.isBattler()) {
        if (!args[8]) args[8] = character.battler().attackSkillId();
        character.nwayShot(+args[1], +args[2], +args[3], +args[4],
                           +args[5], +args[6], +args[7], +args[8]);
      }
    } else if (command === 'nwayAim') {
      var character = this.character(args[0]);
      if (character && character.isBattler()) {
        if (!args[8]) args[8] = character.battler().attackSkillId();
        character.nwayAim(+args[1], +args[2], +args[3], +args[4],
                          +args[5], +args[6], +args[7], +args[8]);
      }
    } else if (command === 'nallShot') {
      var character = this.character(args[0]);
      if (character && character.isBattler()) {
        if (!args[7]) args[7] = character.battler().attackSkillId();
        character.nallShot(+args[1], +args[2], +args[3], +args[4],
                           +args[5], +args[6], +args[7]);
      }
    } else if (command === 'nallAim') {
      var character = this.character(args[0]);
      if (character && character.isBattler()) {
        if (!args[7]) args[7] = character.battler().attackSkillId();
        character.nallAim(+args[1], +args[2], +args[3], +args[4],
                          +args[5], +args[6], +args[7]);
      }
    } else if (command === 'actShowHpGauge') {
      $gameSystem.setActHpGaugeVisible(true);
    } else if (command === 'actHideHpGauge') {
      $gameSystem.setActHpGaugeVisible(false);
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_Bullet
  //

  function Sprite_Bullet() {
    this.initialize.apply(this, arguments);
  }

  Sprite_Bullet.prototype = Object.create(Sprite.prototype);
  Sprite_Bullet.prototype.constructor = Sprite_Bullet;

  // 初期化
  Sprite_Bullet.prototype.initialize = function(bullet) {
    Sprite.prototype.initialize.call(this);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._bullet = bullet;
    this._characterName = '';
    this._characterIndex = 0;
	BulletPatern = 0
  };

  // フレーム更新
  Sprite_Bullet.prototype.update = function() {
    Sprite.prototype.update.call(this);	
    this.opacity = this._bullet._opacity;
    if (this.opacity > 0) {
      this.updateBitmap();
      this.x = this._bullet.screenX();
      this.y = this._bullet.screenY();
      this.z = this._bullet._z;
      this.rotation = this._bullet.angle();
    }
  };

  // 転送元ビットマップの更新
  Sprite_Bullet.prototype.updateBitmap = function() {
    if (this.isImageChanged()) {
      this._characterName = this._bullet._characterName;
      this._characterIndex = this._bullet._characterIndex;
      this.setCharacterBitmap();
    }
  };

  // グラフィックの変更判定
  Sprite_Bullet.prototype.isImageChanged = function() {
    return this._characterName !== this._bullet.characterName ||
           this._characterIndex !== this._bullet.characterIndex;
  };

  // ビットマップの設定
  Sprite_Bullet.prototype.setCharacterBitmap = function() {
	if(CheckBullet == 1){
	this.bitmap = ImageManager.loadSystem('Skill1000'+skillIdBullet);	
	BulletPatern += 1
	if (BulletPatern > 8){sx = 0;BulletPatern=0}
	else if (BulletPatern > 5){sx = 70}
	else if (BulletPatern > 2){sx = 35}
	else {sx = 0}
	this.setFrame(sx, 0, this.bitmap.width/3, this.bitmap.height);	
		
	} else {
	if($dataWeapons[3002].wtypeId==16){
    this.bitmap = ImageManager.loadSystem('Arrow2060000');
    this.setFrame(0, 0, this.bitmap.width, this.bitmap.height);//x, y, width, height
    } else {
	this.bitmap = ImageManager.loadSystem(this._characterName);
    var pw = Math.floor(this.bitmap.width);
    var sx = this._characterIndex * pw;
    this.setFrame(sx, 0, pw, this.bitmap.height);
    this.blendMode = this._characterName.charAt(0) === '!' ? 1 : 0;
	}}
  };

  //-----------------------------------------------------------------------------
  // Sprite_Shield
  //

  function Sprite_Shield() {
    this.initialize.apply(this, arguments);
  }

  Sprite_Shield.prototype = Object.create(Sprite.prototype);
  Sprite_Shield.prototype.constructor = Sprite_Shield;

  // 初期化
  Sprite_Shield.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.anchor.x = 0.5;
    this.anchor.y = 1.0;
    this.bitmap = ImageManager.loadSystem('TMJumpActionShield');
  };

  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  // メンバ変数の初期化
  var _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
  Sprite_Character.prototype.initMembers = function() {
    _Sprite_Character_initMembers.call(this);
    this._damages = [];
    this._popups = [];
    this._effectType = null;
    this._effectDuration = 0;
    this._shake = 0;
    this.createWeaponSprite();
  };

  // 武器スプライトの作成
  Sprite_Character.prototype.createWeaponSprite = function() {
    this._weaponSprite = new Sprite_Weapon();
    this.addChild(this._weaponSprite);
  };

  // 武器アニメーションのセットアップ
  Sprite_Character.prototype.setupWeaponAnimation = function() {
    if (this._character.battler().isWeaponAnimationRequested()) {
      this._weaponSprite.setup(this._character.battler().weaponImageId());
      this._character.battler().clearWeaponAnimation();
    }
  };

  // フレーム更新
  var _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function() {
    _Sprite_Character_update.call(this);
    this.updateDamagePopup();
    this.updateMapPopup();
    if (this._character.isBattler()) {
      this.updateEffect();
      this.updateMotion();
      this.updateShield();
      if (actHpGauge) this.updateHpGauge();
    }
  };

  // その他の更新
  var _Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;
  Sprite_Character.prototype.updateOther = function() {
    if (!this.isEffecting()) _Sprite_Character_updateOther.call(this);
  };

  // ダメージポップアップの更新
  Sprite_Character.prototype.updateDamagePopup = function() {
    if (this._character.isBattler()) this.setupDamagePopup();
    if (this._damages.length > 0) {
      for (var i = 0; i < this._damages.length; i++) {
        this._damages[i].update();
        this._damages[i].x = this.x;
		if(this.height<58){
		this._damages[i].y = this.y-this.height*1.4;
		}else{
		this._damages[i].y = this.y-this.height*0.95;
		}
        
		
      }
      if (!this._damages[0].isPlaying()) {
        this.parent.removeChild(this._damages[0]);
        this._damages.shift();
      }
    }
  };

  // 一套损坏弹出窗口
  Sprite_Character.prototype.setupDamagePopup = function() {
    var battler = this._character.battler();
    if (battler.isDamagePopupRequested()) {
      var sprite = new Sprite_MapDamage();
      sprite.x = this.x;
      sprite.y = this.y;
      sprite.z = this.z + 1;
      sprite.setup(battler);
      this._damages.push(sprite);
      this.parent.addChild(sprite);
      battler.clearDamagePopup();
      battler.clearActionResult();
    }
  };

  // マップ用ポップアップの更新
  Sprite_Character.prototype.updateMapPopup = function() {
    this.setupMapPopup();
    if (this._popups.length > 0) {
      for (var i = this._popups.length - 1; i >= 0; i--) {
        this._popups[i].update();
        this._popups[i].x = this.x;
        this._popups[i].y = this.y;
        if (!this._popups[i].isPlaying()) {
          this.parent.removeChild(this._popups[i]);
          this._popups.splice(i, 1);
        }
      }
    }
  };
  
  // マップ用ポップアップのセット
  Sprite_Character.prototype.setupMapPopup = function() {
    while (this._character.isMapPopupExist()) {
      var sprite = new Sprite_MapPopup();
      sprite.x = this.x;
      sprite.y = this.y;
      var popup = this._character.getMapPopup();
      var re = /\\I\[(\d+)\]/i;
      var match = re.exec(popup.text);
      if (match) {
        sprite.z = this.z + 1;
        sprite.setup(popup, Number(match[1]));
      } else {
        sprite.z = this.z + 2;
        sprite.setup(popup, -1);
      }
      this._popups.push(sprite);
      this.parent.addChild(sprite);
    }
  };

  // エフェクトのセット
  Sprite_Character.prototype.setupEffect = function() {
    if (this._character.battler().isEffectRequested()) {
      this.startEffect(this._character.battler().effectType());
      this._character.battler().clearEffect();
    }
  };

  // エフェクトの開始
  Sprite_Character.prototype.startEffect = function(effectType) {
    this._effectType = effectType;
    switch (this._effectType) {
    case 'appear':
      this.startAppear();
      break;
    case 'whiten':
      this.startWhiten();
      break;
    case 'blink':
      this.startBlink();
      break;
    case 'collapse':
      this.startCollapse();
      break;
    case 'bossCollapse':
      this.startBossCollapse();
      break;
    }
    this.revertToNormal();
  };

  // 出現エフェクトの開始
  Sprite_Character.prototype.startAppear = function() {
    this._effectDuration = 16;
  };

  // 白フラッシュエフェクトの開始
  Sprite_Character.prototype.startWhiten = function() {
    this._effectDuration = 16;
  };

  // 点滅エフェクトの開始
  Sprite_Character.prototype.startBlink = function() {
    this._effectDuration = this._character._invincibleTime;
  };

  // 崩壊エフェクトの開始
  Sprite_Character.prototype.startCollapse = function() {
    this._effectDuration = 32;
    this._appeared = false;
  };

  // ボス崩壊エフェクトの開始
  Sprite_Character.prototype.startBossCollapse = function() {
    this._effectDuration = this.bitmap.height;
    this._appeared = false;
  };

  // エフェクトの更新
  Sprite_Character.prototype.updateEffect = function() {
    this.setupEffect();
    if (this._effectDuration > 0) {
      this._effectDuration--;
      switch (this._effectType) {
      case 'appear':
        this.updateAppear();
        break;
      case 'whiten':
        this.updateWhiten();
        break;
      case 'blink':
        this.updateBlink();
        break;
      case 'collapse':
        this.updateCollapse();
        break;
      case 'bossCollapse':
        this.updateBossCollapse();
        break;
      }
      if (this._effectDuration === 0) {
        this._effectType = null;
        this.setBlendColor([0, 0, 0, 0]);
      }
    }
  };

  // エフェクトが実行中かどうか
  Sprite_Character.prototype.isEffecting = function() {
    return this._effectType !== null;
  };

  // スプライトのエフェクト設定を元に戻す
  Sprite_Character.prototype.revertToNormal = function() {
    this._shake = 0;
    this.blendMode = 0;
    this.opacity = 255;
    this.setBlendColor([0, 0, 0, 0]);
  };

  // 出現エフェクトの更新
  Sprite_Character.prototype.updateAppear = function() {
    this.opacity = (16 - this._effectDuration) * 16;
  };

  // 白フラッシュエフェクトの更新
  Sprite_Character.prototype.updateWhiten = function() {
    var alpha = 128 - (16 - this._effectDuration) * 10;
    this.setBlendColor([255, 255, 255, alpha]);
  };

  // 点滅エフェクトの更新
  Sprite_Character.prototype.updateBlink = function() {
    this.opacity = (this._effectDuration % 10 < 5) ? 255 : 0;
  };

  // 崩壊エフェクトの更新
  Sprite_Character.prototype.updateCollapse = function() {
    this.blendMode = Graphics.BLEND_ADD;
    this.setBlendColor([255, 128, 128, 128]);
    this.opacity *= this._effectDuration / (this._effectDuration + 1);
  };

  // ボス崩壊エフェクトの更新
  Sprite_Character.prototype.updateBossCollapse = function() {
    this._shake = this._effectDuration % 2 * 4 - 2;
    this.blendMode = Graphics.BLEND_ADD;
    this.opacity *= this._effectDuration / (this._effectDuration + 1);
    this.setBlendColor([255, 255, 255, 255 - this.opacity]);
    if (this._effectDuration % 20 === 19) {
      SoundManager.playBossCollapse2();
    }
  };

  // モーションの更新
  Sprite_Character.prototype.updateMotion = function() {
    this.setupWeaponAnimation();
    if (this._weaponSprite.isPlaying()) {
      if (this._character._direction == 4) {
        this._weaponSprite.scale.x = 1;
        this._weaponSprite.x = -16;
      } else {
        this._weaponSprite.scale.x = -1;
        this._weaponSprite.x = 16;
      }
    }
  };

  // HPゲージの更新
  Sprite_Character.prototype.updateHpGauge = function() {
    if (!this._hpGaugeSprite) {
      this._hpGaugeSprite = new Sprite_HpGauge(this._character);
      this._hpGaugeSprite.y = -2;
      this.addChild(this._hpGaugeSprite);
    }
  };

  // シールドの更新
  Sprite_Character.prototype.updateShield = function() {
    var battler = this._character.battler();
    if (this._shieldSprite) {
      this._shieldSprite.visible = battler.isStateAffected(actGuardStateId);
    } else {
      if (battler.isStateAffected(actGuardStateId)) {
        this._shieldSprite = new Sprite_Shield();
        this.addChild(this._shieldSprite);
      }
    }
  };

  // HPゲージとシールドのbushDepth対応
  var _Sprite_Character_createHalfBodySprites = Sprite_Character.prototype.createHalfBodySprites;
  Sprite_Character.prototype.createHalfBodySprites = function() {
    var flag = !this._upperBody;
    _Sprite_Character_createHalfBodySprites.call(this);
    if (flag) {
      if (this._hpGaugeSprite) this.addChild(this.removeChild(this._hpGaugeSprite));
      if (this._shieldSprite) this.addChild(this.removeChild(this._shieldSprite));
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_MapDamage
  //

  function Sprite_MapDamage() {
    this.initialize.apply(this, arguments);
  }

  Sprite_MapDamage.prototype = Object.create(Sprite_Damage.prototype);
  Sprite_MapDamage.prototype.constructor = Sprite_MapDamage;

  // セットアップ
  Sprite_MapDamage.prototype.setup = function(target) {
    var result = target._actionResult;
    if (result.missed || result.evaded) {
      this.createMiss();
    } else if (result.hpAffected) {
		if (result.critical) {
			criticalappear = 1	
		} else {
				criticalappear = 0
		}
      this.createDigits(0, result.hpDamage);
    } else if (target.isAlive() && result.mpDamage !== 0) {
      this.createDigits(2, result.mpDamage);
    }
    if (result.critical) {
      this.setupCriticalEffect();
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_MapPopup
  //

  function Sprite_MapPopup() {
    this.initialize.apply(this, arguments);
  }

  Sprite_MapPopup.prototype = Object.create(Sprite.prototype);
  Sprite_MapPopup.prototype.constructor = Sprite_MapPopup;

  Sprite_MapPopup.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._duration = 150;
  };

  Sprite_MapPopup.prototype.setup = function(popup, iconIndex) {
    var sprite = new Sprite();
    if (iconIndex >= 0) {
      sprite.bitmap = ImageManager.loadSystem('IconSet');
      var pw = Window_Base._iconWidth;
      var ph = Window_Base._iconHeight;
      var sx = iconIndex % 16 * pw;
      var sy = Math.floor(iconIndex / 16) * ph;
      sprite.setFrame(sx, sy, pw, ph);
    } else {
      sprite.bitmap = new Bitmap(160, 32);
      sprite.bitmap.outlineColor = 'black';
      sprite.bitmap.outlineWidth = 5;
      sprite.bitmap.fontSize = 28;
      sprite.bitmap.textColor = popup.color;
      sprite.bitmap.drawText(popup.text, 0, 0, 160, 32, 'center');
    }
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 1;
    sprite.y = popup.ry;
    sprite.ry = sprite.y;
    sprite.by = sprite.y + 40;
    sprite.dy = popup.dy;
    sprite.g = popup.g;
    this.addChild(sprite);
  };

  Sprite_MapPopup.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._duration > 0) {
      this._duration--;
      for (var i = 0; i < this.children.length; i++) {
        var sprite = this.children[i];
        sprite.dy += sprite.g;
        sprite.ry += sprite.dy;
        if (sprite.ry >= sprite.by) {
          sprite.ry = sprite.by;
          sprite.dy *= -0.6;
        }
        sprite.y = Math.round(sprite.ry);
      }
    }
    this.updateOpacity();
  };

  Sprite_MapPopup.prototype.updateOpacity = function() {
    if (this._duration < 10) {
      this.opacity = 255 * this._duration / 10;
    }
  };

  Sprite_MapPopup.prototype.isPlaying = function() {
    return this._duration > 0;
  };

  //-----------------------------------------------------------------------------
  // Sprite_HpGauge
  //

  function Sprite_HpGauge() {
    this.initialize.apply(this, arguments);
  }

  Sprite_HpGauge.prototype = Object.create(Sprite.prototype);
  Sprite_HpGauge.prototype.constructor = Sprite_HpGauge;

  Sprite_HpGauge.prototype.initialize = function(character) {
    this._character = character;
    this._battler = this._character.battler();
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(32, 4);
    this.z = 9;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
  };

  Sprite_HpGauge.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.visible = $gameSystem.isActHpGaugeVisible();
    if (this._battler !== this._character.battler()) {
      this._battler = this._character.battler();
      if (!this._battler) { // バトラーが削除された場合はゲージを消去
        this._hp = 0;
        this.refresh();
      }
    }
    if (this._battler) {
      if (this._hp !== this._battler.hp || this._mhp !== this._battler.mhp) {
        this._hp = this._battler.hp;
        this._mhp = this._battler.mhp;
        this.refresh();
      }
    }
  };

  Sprite_HpGauge.prototype.refresh = function() {
    this.bitmap.clear();
    if (this._hp === 0) return;
    this.bitmap.fillRect(0, 0, 32, 4, '#000000');
   var w = Math.floor(this._hp / this._mhp * 30);
 
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //

  var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.call(this);
    this.createBullets();
  };

  // 弾スプライトの作成
  Spriteset_Map.prototype.createBullets = function() {
    this._bulletSprites = [];
    $gameMap.playerBullets().forEach(function(bullet) {
      this._bulletSprites.push(new Sprite_Bullet(bullet));
      this._baseSprite.addChild(this._bulletSprites[this._bulletSprites.length - 1]);
    }, this);
    $gameMap.enemyBullets().forEach(function(bullet) {
      this._bulletSprites.push(new Sprite_Bullet(bullet));
      this._baseSprite.addChild(this._bulletSprites[this._bulletSprites.length - 1]);
    }, this);
  };

  // 飛行船の影の作成
  Spriteset_Map.prototype.createShadow = function() {
  };

  // 飛行船の影の更新
  Spriteset_Map.prototype.updateShadow = function() {
  };

  //-----------------------------------------------------------------------------
  // Window_Selectable
  //

  var _Window_Selectable_isOkTriggered = Window_Selectable.prototype.isOkTriggered;
  Window_Selectable.prototype.isOkTriggered = function() {
    return _Window_Selectable_isOkTriggered.call(this) ||
           (actAttackToOk && Input.isRepeated('attack'));
  };

  var _Window_Selectable_isCancelTriggered = Window_Selectable.prototype.isCancelTriggered;
  Window_Selectable.prototype.isCancelTriggered = function() {
    return _Window_Selectable_isCancelTriggered.call(this) ||
           (actJumpToCancel && Input.isRepeated('jump'));
  };

  //-----------------------------------------------------------------------------
  // Window_Option
  //

  var _Window_Option_makeCommandList = Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function() {
    _Window_Option_makeCommandList.call(this);
    if (padConfigCommand) this.addCommand(padConfigCommand, 'padConfig');
    // 常にダッシュは不要なので削除してしまう。
    for (var i = 0; i < this._list.length; i++) {
      if (this._list[i].symbol === 'alwaysDash') {
        this._list.splice(i, 1);
        break;
      }
    }
  };

  var _Window_Options_statusText = Window_Options.prototype.statusText;
  Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    if (symbol === 'padConfig') return '';
    return _Window_Options_statusText.call(this, index);
  };

  Window_Options.prototype.isPadSymbol = function(symbol) {
    return symbol.contains('padButton');
  };

  var _Window_Options_processOk = Window_Options.prototype.processOk;
  Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol === 'padConfig') {
      this.playOkSound();
      this.updateInputData();
      this.deactivate();
      this.callHandler('padConfig');
    } else {
      _Window_Options_processOk.call(this);
    }
  };

  var _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
  Window_Options.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol !== 'padConfig') {
      _Window_Options_cursorRight.call(this, wrap);
    }
  };

  var _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
  Window_Options.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol !== 'padConfig') {
      _Window_Options_cursorLeft.call(this, wrap);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_PadOptions
  //

  function Window_PadOptions() {
    this.initialize.apply(this, arguments);
  }

  Window_PadOptions.prototype = Object.create(Window_Options.prototype);
  Window_PadOptions.prototype.constructor = Window_PadOptions;

  Window_PadOptions.prototype.initialize = function() {
    Window_Options.prototype.initialize.call(this, 0, 0);
    this.hide();
    this.deactivate();
  };

  Window_PadOptions.prototype.makeCommandList = function() {
    for (var i = 1; i <= 12; i++) {
      this.addCommand('パッドボタン' + i, 'padButton' + i);
    }
  };

  Window_PadOptions.prototype.statusWidth = function() {
    return 120;
  };

  Window_PadOptions.prototype.statusText = function(index) {
    var value = this.getConfigValue(index);
    return value ? padButtonNames[padButtons.indexOf(value)] : '';
  };

  Window_PadOptions.prototype.processOk = function() {
    var index = this.index();
    var value = this.getConfigValue(index);
    value = padButtons.indexOf(value);
    value = (value + 1) % padButtons.length;
    this.changeValue(index, padButtons[value]);
  };

  Window_PadOptions.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var value = this.getConfigValue(index);
    value = padButtons.indexOf(value);
    value = (value + 1).clamp(0, padButtons.length - 1);
    this.changeValue(index, padButtons[value]);
  };

  Window_PadOptions.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var value = this.getConfigValue(index);
    value = padButtons.indexOf(value);
    value = (value - 1).clamp(0, padButtons.length - 1);
    this.changeValue(index, padButtons[value]);
  };

  Window_PadOptions.prototype.changeValue = function(index, value) {
    var lastValue = this.getConfigValue(index);
    if (lastValue !== value) {
      this.setConfigValue(index, value);
      this.redrawItem(index);
      SoundManager.playCursor();
    }
  };

  Window_PadOptions.prototype.getConfigValue = function(index) {
    return ConfigManager.getPadButton(index);
  };

  Window_PadOptions.prototype.setConfigValue = function(index, value) {
    ConfigManager.setPadButton(index, value);
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    $gamePlayer.refresh();
  };

  Scene_Base.prototype.checkGameover = function() {
  };

  Scene_Map.prototype.processMapTouch = function() {
  };

  //-----------------------------------------------------------------------------
  // Scene_Options
  //

  var _Scene_Options_create = Scene_Options.prototype.create;
  Scene_Options.prototype.create = function() {
    _Scene_Options_create.call(this);
    this.createPadOptionsWindow();
  };
  
  var _Scene_Options_createOptionsWindow = Scene_Options.prototype.createOptionsWindow;
  Scene_Options.prototype.createOptionsWindow = function() {
    _Scene_Options_createOptionsWindow.call(this);
    this._optionsWindow.setHandler('padConfig', this.onPadConfig.bind(this));
  };
  
  Scene_Options.prototype.createPadOptionsWindow = function() {
    this._padOptionsWindow = new Window_PadOptions();
    this._padOptionsWindow.setHandler('cancel', this.cancelPadConfig.bind(this));
    this.addWindow(this._padOptionsWindow);
  };
  
  Scene_Options.prototype.onPadConfig = function() {
    this._optionsWindow.hide();
    this._padOptionsWindow.show();
    this._padOptionsWindow.activate();
  };
  
  Scene_Options.prototype.cancelPadConfig = function() {
    this._padOptionsWindow.hide();
    this._optionsWindow.show();
    this._optionsWindow.activate();
  };

})();
