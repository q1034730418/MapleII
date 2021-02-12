//=============================================================================
// AfterImage.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Velfare Nagata
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// Version
// 1.2.1 2018/01/21 ・コマンド実行時に即時反映されない不具合を修正
//                  ・ピクチャが中央表示だった場合にうまく表示されない不具合を修正
//
// 1.2.0 2018/01/06 ・乗り物に残像を表示する機能を追加
//                  ・本プラグイン使用中にセーブ／ロードを行ったときにエラーになる問題を修正。
//
// 1.1.0 2017/09/13 ・イベント、プレイヤー、フォロワーに残像を表示する機能を追加
//                  ・ピクチャーの移動でのみ残像を表示していた仕様を、
//                  　ピクチャーの表示内容に何らかの変更があった場合に残像を表示するように修正。
//
// 1.0.0 2017/09/08 ・初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/velfare_nagata/
//=============================================================================

/*:ja
 * @plugindesc ピクチャやイベント、プレイヤー、フォロワーが移動した際に残像を表示するプラグインです
 * 。
 * ピクチャは「ピクチャの表示」、「ピクチャの移動」、「ピクチャの回転」コマンドや、
 * ピクチャアニメーションを実現する一部のプラグインを利用したときに残像が表示されます。
 * 
 * イベント、プレイヤー、フォロワー、乗り物は「移動ルートの指定」、「イベントの位置設定」、「隊列メンバーの集合」コマンドや、
 * イベント、プレイヤー、フォロワー、乗り物の移動・表示を制御する一部のプラグインを利用したときに残像が表示されます。
 * 
 * 戦闘シーンでのモンスター、バトラーの表示は現時点では未対応です。
 * まて更新！！
 * 
 * @author ベルファーレ長田（゜∀゜）◆AHYA/lPiZ.‏
 *
 * @param 1フレームあたりのフェードアウト量
 * @desc 残像をフェードアウトさせる際、1フレームあたりに減算する透明度の値です。
 * @default 10
 * 
 * @param 残像の色調R
 * @desc ベース画像に対する残像の色合い(R)です。
 * @default -255
 * 
 * @param 残像の色調G
 * @desc ベース画像に対する残像の色合い(G)です。
 * @default -255
 * 
 * @param 残像の色調B
 * @desc ベース画像に対する残像の色合い(B)です。
 * @default 255
 *
 * @help 下記のプラグインコマンドを実行し、指定したオブジェクトに対して残像の有効／無効を設定します。
 *
 * ピクチャの残像を有効にする場合
 * ・PICT_AFTERIMAGE_ADD {0} {1} {2} {3} {4}
 * ・ピクチャの残像追加 {0}
 * 　{0}：【必須】ピクチャー番号
 * 　{1}：【任意】1フレームあたりのフェードアウト量 ※未指定の場合はプラグインパラメータが適用されます。
 * 　{2}：【任意】残像の色調R ※未指定の場合はプラグインパラメータが適用されます。
 * 　{3}：【任意】残像の色調G ※未指定の場合はプラグインパラメータが適用されます。
 * 　{4}：【任意】残像の色調B ※未指定の場合はプラグインパラメータが適用されます。
 * 
 * 例：
 * PICT_AFTERIMAGE_ADD 1
 * >> 1番のピクチャの表示内容が変更されると残像が表示されるようになります。
 * 
 * ピクチャの残像追加 2
 * >> 2番のピクチャの表示内容が変更されると残像が表示されるようになります。
 * 
 * PICT_AFTERIMAGE_ADD 3 10 255 -255 -255
 * >> 3番のピクチャの表示内容が変更されると赤の残像が表示されるようになります。
 * 
 * 
 * ピクチャの残像を無効にする場合
 * ・PICT_AFTERIMAGE_REMOVE {0}
 * ・ピクチャの残像削除 {0}
 * 　{0}：【必須】ピクチャ番号
 * 
 * 例：
 * PICT_AFTERIMAGE_REMOVE 4
 * >> 4番のピクチャの表示内容が変更されても残像が表示されなくなります。
 * 
 * ピクチャの残像削除 5
 * >> 5番のピクチャの表示内容が変更されても残像が表示されなくなります。
 * 
 * 
 * 
 * イベントの残像を有効にする場合
 * ・EVENT_AFTERIMAGE_ADD {0} {1} {2} {3} {4}
 * ・イベントの残像追加 {0}
 * 　{0}：【必須】イベントID
 * 　{1}：【任意】1フレームあたりのフェードアウト量 ※未指定の場合はプラグインパラメータが適用されます。
 * 　{2}：【任意】残像の色調R ※未指定の場合はプラグインパラメータが適用されます。
 * 　{3}：【任意】残像の色調G ※未指定の場合はプラグインパラメータが適用されます。
 * 　{4}：【任意】残像の色調B ※未指定の場合はプラグインパラメータが適用されます。
 * 
 * 例：
 * EVENT_AFTERIMAGE_ADD 1
 * >> ID 1番のイベントの表示内容が変更されると残像が表示されるようになります。
 * 
 * イベントの残像追加 2
 * >> ID 2番のイベントの表示内容が変更されると残像が表示されるようになります。
 * 
 * EVENT_AFTERIMAGE_ADD 3 10 -255 255 -255
 * >> ID 3番のイベントの表示内容が変更されると緑の残像が表示されるようになります。
 * 
 * 
 * イベントの残像を無効にする場合
 * ・EVENT_AFTERIMAGE_REMOVE {0}
 * ・イベントの残像削除 {0}
 * 　{0}：【必須】イベントID
 * 
 * 例：
 * EVENT_AFTERIMAGE_REMOVE 4
 * >> ID 4番のイベントの表示内容が変更されても残像が表示されなくなります。
 * 
 * イベントの残像削除 5
 * >> ID 5番のイベントの表示内容が変更されても残像が表示されなくなります。
 * 
 * 
 * 
 * プレイヤーの残像を有効にする場合
 * ・PLAYER_AFTERIMAGE_ADD {0} {1} {2} {3} {4}
 * ・プレイヤーの残像追加 {0}
 * 　{0}：【任意】プレイヤーID ※ダミーのため何を指定しても関係ありません。
 * 　{1}：【任意】1フレームあたりのフェードアウト量 ※未指定の場合はプラグインパラメータが適用されます。
 * 　{2}：【任意】残像の色調R ※未指定の場合はプラグインパラメータが適用されます。
 * 　{3}：【任意】残像の色調G ※未指定の場合はプラグインパラメータが適用されます。
 * 　{4}：【任意】残像の色調B ※未指定の場合はプラグインパラメータが適用されます。
 * 
 * 例：
 * PLAYER_AFTERIMAGE_ADD
 * >> プレイヤーの表示内容が変更されると残像が表示されるようになります。
 * 
 * プレイヤーの残像追加
 * >> プレイヤーの表示内容が変更されると残像が表示されるようになります。
 * 
 * PLAYER_AFTERIMAGE_ADD 0 10 -255 -255 255
 * >> ID プレイヤーの表示内容が変更されると青の残像が表示されるようになります。
 * 
 * 
 * プレイヤーの残像を無効にする場合
 * ・PLAYER_AFTERIMAGE_REMOVE {0}
 * ・プレイヤーの残像削除 {0}
 * 　{0}：【任意】プレイヤーID ※ダミーのため何を指定しても関係ありません。
 * 
 * 例：
 * PLAYER_AFTERIMAGE_REMOVE
 * >> プレイヤーの表示内容が変更されても残像が表示されなくなります。
 * 
 * プレイヤーの残像削除
 * >> プレイヤーの表示内容が変更されても残像が表示されなくなります。
 * 
 * 
 * 
 * フォロワーの残像を有効にする場合
 * ・FOLLOWER_AFTERIMAGE_ADD {0} {1} {2} {3} {4}
 * ・フォロワーの残像追加 {0}
 * 　{0}：【必須】フォロワー番号
 * 　{1}：【任意】1フレームあたりのフェードアウト量 ※未指定の場合はプラグインパラメータが適用されます。
 * 　{2}：【任意】残像の色調R ※未指定の場合はプラグインパラメータが適用されます。
 * 　{3}：【任意】残像の色調G ※未指定の場合はプラグインパラメータが適用されます。
 * 　{4}：【任意】残像の色調B ※未指定の場合はプラグインパラメータが適用されます。
 * 
 * 例：
 * FOLLOWER_AFTERIMAGE_ADD 1
 * >> 1番のフォロワーの表示内容が変更されると残像が表示されるようになります。
 * 
 * フォロワーの残像追加 2
 * >> 2番のフォロワーの表示内容が変更されると残像が表示されるようになります。
 * 
 * FOLLOWER_AFTERIMAGE_ADD 3 10 0 0 0
 * >> 3番のフォロワーの表示内容が変更されると分身のような残像が表示されるようになります。
 * 
 * 
 * フォロワーの残像を無効にする場合
 * ・FOLLOWER_AFTERIMAGE_REMOVE {0}
 * ・フォロワーの残像削除 {0}
 * 　{0}：【必須】フォロワー番号
 * 
 * 例：
 * FOLLOWER_AFTERIMAGE_REMOVE 1
 * >> 1番のフォロワーの表示内容が変更されても残像が表示されなくなります。
 * 
 * フォロワーの残像削除 2
 * >> 2番のフォロワーの表示内容が変更されても残像が表示されなくなります。
 * 
 * 
 * 
 * 小型船の残像を有効にする場合
 * ・SMALLSHIP_AFTERIMAGE_ADD {0} {1} {2} {3} {4}
 * ・小型船の残像追加 {0}
 * 　{0}：【任意】乗り物ID ※ダミーのため何を指定しても関係ありません。
 * 　{1}：【任意】1フレームあたりのフェードアウト量 ※未指定の場合はプラグインパラメータが適用されます。
 * 　{2}：【任意】残像の色調R ※未指定の場合はプラグインパラメータが適用されます。
 * 　{3}：【任意】残像の色調G ※未指定の場合はプラグインパラメータが適用されます。
 * 　{4}：【任意】残像の色調B ※未指定の場合はプラグインパラメータが適用されます。
 * 
 * 例：
 * SMALLSHIP_AFTERIMAGE_ADD
 * >> 小型船の表示内容が変更されると残像が表示されるようになります。
 * 
 * 小型船の残像追加
 * >> 小型船の表示内容が変更されると残像が表示されるようになります。
 * 
 * SMALLSHIP_AFTERIMAGE_ADD 0 10 -255 -255 255
 * >> 小型船の表示内容が変更されると青の残像が表示されるようになります。
 * 
 * 
 * 小型船の残像を無効にする場合
 * ・SMALLSHIP_AFTERIMAGE_REMOVE {0}
 * ・小型船の残像削除 {0}
 * 　{0}：【任意】乗り物ID ※ダミーのため何を指定しても関係ありません。
 * 
 * 例：
 * SMALLSHIP_AFTERIMAGE_REMOVE
 * >> 小型船の表示内容が変更されても残像が表示されなくなります。
 * 
 * 小型船の残像削除
 * >> 小型船の表示内容が変更されても残像が表示されなくなります。
 * 
 * 
 * 
 * 大型船の残像を有効にする場合
 * ・LARGESHIP_AFTERIMAGE_ADD {0} {1} {2} {3} {4}
 * ・大型船の残像追加 {0}
 * 　{0}：【任意】乗り物ID ※ダミーのため何を指定しても関係ありません。
 * 　{1}：【任意】1フレームあたりのフェードアウト量 ※未指定の場合はプラグインパラメータが適用されます。
 * 　{2}：【任意】残像の色調R ※未指定の場合はプラグインパラメータが適用されます。
 * 　{3}：【任意】残像の色調G ※未指定の場合はプラグインパラメータが適用されます。
 * 　{4}：【任意】残像の色調B ※未指定の場合はプラグインパラメータが適用されます。
 * 
 * 例：
 * LARGESHIP_AFTERIMAGE_ADD
 * >> 大型船の表示内容が変更されると残像が表示されるようになります。
 * 
 * 小型船の残像追加
 * >> 大型船の表示内容が変更されると残像が表示されるようになります。
 * 
 * LARGESHIP_AFTERIMAGE_ADD 0 10 -255 -255 255
 * >> 大型船の表示内容が変更されると青の残像が表示されるようになります。
 * 
 * 
 * 大型船の残像を無効にする場合
 * ・LARGESHIP_AFTERIMAGE_REMOVE {0}
 * ・大型船の残像削除 {0}
 * 　{0}：【任意】乗り物ID ※ダミーのため何を指定しても関係ありません。
 * 
 * 例：
 * LARGESHIP_AFTERIMAGE_REMOVE
 * >> 大型船の表示内容が変更されても残像が表示されなくなります。
 * 
 * 大型船の残像削除
 * >> 大型船の表示内容が変更されても残像が表示されなくなります。
 * 
 * 
 * 
 * 飛行船の残像を有効にする場合
 * ・AIRSHIP_AFTERIMAGE_ADD {0} {1} {2} {3} {4}
 * ・飛行船の残像追加 {0}
 * 　{0}：【任意】乗り物ID ※ダミーのため何を指定しても関係ありません。
 * 　{1}：【任意】1フレームあたりのフェードアウト量 ※未指定の場合はプラグインパラメータが適用されます。
 * 　{2}：【任意】残像の色調R ※未指定の場合はプラグインパラメータが適用されます。
 * 　{3}：【任意】残像の色調G ※未指定の場合はプラグインパラメータが適用されます。
 * 　{4}：【任意】残像の色調B ※未指定の場合はプラグインパラメータが適用されます。
 * 
 * 例：
 * AIRSHIP_AFTERIMAGE_ADD
 * >> 飛行船の表示内容が変更されると残像が表示されるようになります。
 * 
 * 飛行船の残像追加
 * >> 飛行船の表示内容が変更されると残像が表示されるようになります。
 * 
 * AIRSHIP_AFTERIMAGE_ADD 0 10 -255 -255 255
 * >> 飛行船の表示内容が変更されると青の残像が表示されるようになります。
 * 
 * 
 * 飛行船の残像を無効にする場合
 * ・AIRSHIP_AFTERIMAGE_REMOVE {0}
 * ・飛行船の残像削除 {0}
 * 　{0}：【任意】乗り物ID ※ダミーのため何を指定しても関係ありません。
 * 
 * 例：
 * AIRSHIP_AFTERIMAGE_REMOVE
 * >> 飛行船の表示内容が変更されても残像が表示されなくなります。
 * 
 * 飛行船の残像削除
 * >> 飛行船の表示内容が変更されても残像が表示されなくなります。
 */

( function() {
    'use strict';
    var pluginName = 'Afterimage';

    // --------------------------------------------------
    // プロパティ追加
    // --------------------------------------------------
    // ---
    // ピクチャ表示用スプライト一覧を管理するコンテナ
    // ---
    var _pictureContainer = null;
    
    var pictureContainer = function() {
        return _pictureContainer;
    };
    var setPictureContainer = function( pictureContainer ) {
        _pictureContainer = pictureContainer;
    };

    // ---
    // 残像オブジェクト管理用の連想配列
    // ---
    var _afterImages = null;
    
    // ---
    // 残像表示データ一覧
    // ---
    var afterImagesContainer = function() {
        return _afterImages;
    };
    var setAfterImagesContainer = function( afterImages ) {
        _afterImages = afterImages;
    };
    var initAfterImagesContainer = function() {
        // if( _afterImages != null) {
        //     return;
        // }
        _afterImages = new Object();
    };

    Game_Screen.prototype.afterImageJsons = function() {
        if( this._afterImageJsons == null ) {
            this._afterImageJsons = new Array();
        }
        return this._afterImageJsons;
    };
    
    Game_Screen.prototype.upsertAfterImageJson = function( afterImage ) {
        var afterImageJsons = $gameScreen.afterImageJsons();
        var afterImageJson = afterImageToJson( afterImage );
        var afterImageJsonParsed = JSON.parse( afterImageJson );

        // 含まれていない場合は追加、既に含まれていたら更新
        for( var i = 0; i < afterImageJsons.length; i++ ) {
            var savedAfterImageJsonParsed = JSON.parse( afterImageJsons[i] );
            if( savedAfterImageJsonParsed.type == afterImageJsonParsed.type && savedAfterImageJsonParsed.targetId == afterImageJsonParsed.targetId ) {
                afterImageJsons[i] = afterImageJson;
                return;
            }
        }
        afterImageJsons[afterImageJsons.length] = afterImageJson;
    };

    Game_Screen.prototype.getTargetIdsByType = function() {
        var afterImages = afterImagesContainer();
        var afterImageJsons = this.afterImageJsons();
        var parsedAfterImageJsons = new Array();
        for( var i = 0; i < afterImageJsons.length; i++ ) {
            parsedAfterImageJsons[i] = JSON.parse( afterImageJsons[i] );
        }
        var eventIds = new Array();
        var vehicleIds = new Array();
        var followerIds = new Array();
        var playerIds = new Array();

        // 種別毎に残像表示対象IDの一覧を取得
        var idsArray = [eventIds, vehicleIds, followerIds, playerIds];
        for( var i = 0; i < parsedAfterImageJsons.length; i++ ) {
            var parsed = parsedAfterImageJsons[i];
            if( parsed.type == 1 ) {
                // ピクチャに対する処理はここでは行わない
            }
            if( parsed.type == 2 ) {
                eventIds[eventIds.length] = parsed.targetId;
            }
            if( parsed.type == 3 ) {
                playerIds[playerIds.length] = parsed.targetId;
            }
            if( parsed.type == 4 ) {
                followerIds[followerIds.length] = parsed.targetId;
            }
            if( 5 <= parsed.type && parsed.type <= 7 ) {
                vehicleIds[vehicleIds.length] = parsed.targetId;
            }
        }
        // 昇順ソート
        for( var i = 0; i < idsArray.length; i++ ) {
            idsArray[i].sort( function( a, b ) {
                if( a < b ) return -1;
                if( a > b ) return 1;
                return 0;
            } );
        }

        return idsArray;
    };

    // ---
    // 残像オブジェクト -> JSON 変換
    // ---
    var afterImageToJson = function( target ) {
        var type = -1;
        if( target instanceof Game_AfterImage_Picture ) {
            type = 1;
        }
        if( target instanceof Game_AfterImage_Event ) {
            type = 2;
        }
        if( target instanceof Game_AfterImage_Player ) {
            type = 3;
        }
        if( target instanceof Game_AfterImage_Follower ) {
            type = 4;
        }
        if( target instanceof Game_AfterImage_Vehicle ) {
            if( target.targetId() == 1 ) {
                type = 5;
            }
            if( target.targetId() == 2 ) {
                type = 6;
            }
            if( target.targetId() == 3 ) {
                type = 7;
            }
        }

        return JSON.stringify( { 
            type: type, 
            targetId: target.targetId(), 
            isDisplayAfterimage: target.isDisplayAfterimage(),
            feedoutOpacityPerFrame: target.feedoutOpacityPerFrame(),
            feedoutImageToneR: target.feedoutImageToneR(),
            feedoutImageToneG: target.feedoutImageToneG(),
            feedoutImageToneB: target.feedoutImageToneB()
         } );
    };

    // ---
    // JSON -> 残像オブジェクト 変換
    // ---
    var jsonToAfterImage = function( target ) {
        var parsed = JSON.parse( target );

        var afterImage = null;
        if( parsed.type == 1 ) {
            afterImage = new Game_AfterImage_Picture( parsed.targetId );
        }
        if( parsed.type == 2 ) {
            afterImage = new Game_AfterImage_Event( parsed.targetId );
        }
        if( parsed.type == 3 ) {
            afterImage = new Game_AfterImage_Player( parsed.targetId );
        }
        if( parsed.type == 4 ) {
            afterImage = new Game_AfterImage_Follower( parsed.targetId );
        }
        if( 5 <= parsed.type && parsed.type <= 7 ) {
            afterImage = new Game_AfterImage_Vehicle( parsed.targetId );
        }

        afterImage.setIsDisplayAfterimage( parsed.isDisplayAfterimage );
        afterImage.setFeedoutOpacityPerFrame( parsed.feedoutOpacityPerFrame );
        afterImage.setFeedoutImageToneR( parsed.feedoutImageToneR );
        afterImage.setFeedoutImageToneG( parsed.feedoutImageToneG );
        afterImage.setFeedoutImageToneB( parsed.feedoutImageToneB );

        return afterImage;
    };

    // --------------------------------------------------
    // ローカル関数
    // 参考：トリアコンタン殿の各種プラグインファイル
    // --------------------------------------------------
    var getCommandName = function( command ) {
        return ( command || '').toUpperCase();
    };
    var getArgNumber = function( arg, min, max ) {
        min = ( arguments.length < 2 ) ? -Infinity : min; 
        max = ( arguments.length < 3 ) ? -Infinity : max;

        return ( parseInt( convertEscapeCharacters( arg ), 10 ) || 0 ).clamp( min, max );
    };
    var convertEscapeCharacters = function( text ) {
        text = ( text == null ) ? '' : text;
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters( text ) : text;
    };
    var getParam = function( paramNames ) {
        for( var i = 0; i < paramNames.length; i++ ) {
            var name = PluginManager.parameters( pluginName )[paramNames[i]];
            if( name ) {
                return name;
            }
        }
        return null;
    };
    var getParamNumber = function( paramNames, min, max ) {
        min = ( arguments.length < 2 ) ? -Infinity : min; 
        max = ( arguments.length < 3 ) ? -Infinity : max;

        var value = getParam( paramNames );
        return ( parseInt( value, 10 ) || 0 ).clamp( min, max );
    };

    // --------------------------------------------------
    // プラグインコマンド追加　　　　
    // --------------------------------------------------
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function( command, args ) {
        _Game_Interpreter_pluginCommand.apply( this, arguments );
        var targetId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
        var separatedFeedoutOpacityPerFrame = ( args.length >= 2 ) ? getArgNumber( args[1], 0, 255 ) : feedoutOpacityPerFrame;
        var separatedFeedoutImageToneR = ( args.length >= 3 ) ? getArgNumber( args[2], -255, 255 ) : feedoutImageToneR;
        var separatedFeedoutImageToneG = ( args.length >= 4 ) ? getArgNumber( args[3], -255, 255 ) : feedoutImageToneG;
        var separatedFeedoutImageToneB = ( args.length >= 5 ) ? getArgNumber( args[4], -255, 255 ) : feedoutImageToneB;
        var afterImages = afterImagesContainer();
        var setupAfterImage = function( key, value ) {
            if( key in afterImages ) {
                value = afterImages[key];
            }
            afterImages[key] = value
            $gameScreen.upsertAfterImageJson( value );
            value.setFeedoutOpacityPerFrame( separatedFeedoutOpacityPerFrame );
            value.setFeedoutImageToneR( separatedFeedoutImageToneR );
            value.setFeedoutImageToneG( separatedFeedoutImageToneG );
            value.setFeedoutImageToneB( separatedFeedoutImageToneB );
            value.setIsDisplayAfterimage( true );
        };
        var setIsDisplayAfterimage = function( key ) {
            if( key in afterImages ) {
                afterImages[key].setIsDisplayAfterimage( false );
            }
        };
        switch( getCommandName( command ) ) {
            case 'PICT_AFTERIMAGE_ADD' :
            case 'ピクチャの残像追加':
                if( targetId == 0 ) {
                    return;
                }
                setupAfterImage( "PICT_" + targetId, new Game_AfterImage_Picture( targetId ) );
                break;
            case 'PICT_AFTERIMAGE_REMOVE' :
            case 'ピクチャの残像削除':
                if( targetId == 0 ) {
                    return;
                }
                setIsDisplayAfterimage( "PICT_" + targetId );
                break;
            case 'EVENT_AFTERIMAGE_ADD' :
            case 'イベントの残像追加':
                if( targetId == 0 ) {
                    return;
                }
                setupAfterImage( "EVENT_" + targetId, new Game_AfterImage_Event( targetId ) );
                break;
            case 'EVENT_AFTERIMAGE_REMOVE' :
            case 'イベントの残像削除':
                if( targetId == 0 ) {
                    return;
                }
                setIsDisplayAfterimage( "EVENT_" + targetId );
                break;
            case 'PLAYER_AFTERIMAGE_ADD' :
            case 'プレイヤーの残像追加':
                setupAfterImage( "PLAYER", new Game_AfterImage_Player( 0 ) );
                break;
            case 'PLAYER_AFTERIMAGE_REMOVE' :
            case 'プレイヤーの残像削除':
                setIsDisplayAfterimage( "PLAYER" );
                break;
            case 'FOLLOWER_AFTERIMAGE_ADD' :
            case 'フォロワーの残像追加':
                if( targetId == 0 ) {
                    return;
                }
                setupAfterImage( "FOLLOWER_" + targetId, new Game_AfterImage_Follower( targetId ) );
                break;
            case 'FOLLOWER_AFTERIMAGE_REMOVE' :
            case 'フォロワーの残像削除':
                if( targetId == 0 ) {
                    return;
                }
                setIsDisplayAfterimage( "FOLLOWER_" + targetId );
                break;
            case 'SMALLSHIP_AFTERIMAGE_ADD' :
            case '小型船の残像追加':
                setupAfterImage( "SMALLSHIP", new Game_AfterImage_Vehicle( 1 ) );
                break;
            case 'SMALLSHIP_AFTERIMAGE_REMOVE' :
            case '小型船の残像削除':
                setIsDisplayAfterimage( "SMALLSHIP" );
                break;
            case 'LARGESHIP_AFTERIMAGE_ADD' :
            case '大型船の残像追加':
                setupAfterImage( "LARGESHIP", new Game_AfterImage_Vehicle( 2 ) );
                break;
            case 'LARGESHIP_AFTERIMAGE_REMOVE' :
            case '大型船の残像削除':
                setIsDisplayAfterimage( "LARGESHIP" );
                break;
            case 'AIRSHIP_AFTERIMAGE_ADD' :
            case '飛行船の残像追加':
                setupAfterImage( "AIRSHIP", new Game_AfterImage_Vehicle( 3 ) );
                break;
            case 'AIRSHIP_AFTERIMAGE_REMOVE' :
            case '飛行船の残像削除':
                setIsDisplayAfterimage( "AIRSHIP" );
                break;
        }
    };

    // --------------------------------------------------
    // パラメータ取得／バリデーション
    // --------------------------------------------------
    var feedoutOpacityPerFrame = getParamNumber(['FeedoutOpacityPerFrame', '1フレームあたりのフェードアウト量'], 0, 255 );
    var feedoutImageToneR = getParamNumber(['FeedoutImageToneR', '残像の色調R'], -255, 255 );
    var feedoutImageToneG = getParamNumber(['FeedoutImageToneG', '残像の色調G'], -255, 255 );
    var feedoutImageToneB = getParamNumber(['FeedoutImageToneB', '残像の色調B'], -255, 255 );
    
    // Game_Picture--------------------------------------------------------------------------------
    // ---
    // ピクチャID
    // ---
    Game_Picture.prototype.pictureId = function() {
        if( this._pictureId == null ) {
            this._pictureId = 0;
        }
        return this._pictureId;
    }
    Game_Picture.prototype.setPictureId = function( pictureId ) {
        this._pictureId = pictureId;
    }
    // --------------------------------------------------------------------------------------------
    // ---
    // メンバー番号
    // ---
    Game_Follower.prototype.memberIndex = function() {
        return this._memberIndex;
    };

    // ◆Game_AfterImage----------------------------------------------------------------------------
    function Game_AfterImage( id ) {
        this.initialize.apply( this, arguments );
    }
    // ---
    // メンバ初期化
    //
    Game_AfterImage.prototype.initialize = function( targetId ) {
        this._targetId = targetId;
        this._isDisplayAfterimage = false;
        this._feedoutOpacityPerFrame = 0;
        this._feedoutImageToneR = 0;
        this._feedoutImageToneG = 0;
        this._feedoutImageToneB = 0;
        this._afterimageContainer = new Sprite();
        this._afterimageSprites = new Array();
    }
    // ---
    // ID
    // ---
    Game_AfterImage.prototype.targetId = function() {
        return this._targetId;
    }
    Game_AfterImage.prototype.setTargetId = function( targetId ) {
        this._targetId = targetId;
    }
    // ---
    // 残像表示フラグ
    // ---
    Game_AfterImage.prototype.isDisplayAfterimage = function() {
        return this._isDisplayAfterimage;
    }
    Game_AfterImage.prototype.setIsDisplayAfterimage = function( isDisplayAfterimage ) {
        this._isDisplayAfterimage = isDisplayAfterimage;
    }

    // ---
    // 1フレームあたりのフェードアウト量
    // ---
    Game_AfterImage.prototype.feedoutOpacityPerFrame = function() {
        return this._feedoutOpacityPerFrame;
    }
    Game_AfterImage.prototype.setFeedoutOpacityPerFrame = function( feedoutOpacityPerFrame ) {
        this._feedoutOpacityPerFrame = feedoutOpacityPerFrame;
    }

    // ---
    // 残像の色調R
    // ---
    Game_AfterImage.prototype.feedoutImageToneR = function() {
        return this._feedoutImageToneR;
    }
    Game_AfterImage.prototype.setFeedoutImageToneR = function( feedoutImageToneR ) {
        this._feedoutImageToneR = feedoutImageToneR;
    }

    // ---
    // 残像の色調G
    // ---
    Game_AfterImage.prototype.feedoutImageToneG = function() {
        return this._feedoutImageToneG;
    }
    Game_AfterImage.prototype.setFeedoutImageToneG = function( feedoutImageToneG ) {
        this._feedoutImageToneG = feedoutImageToneG;
    }

    // ---
    // 残像の色調B
    // ---
    Game_AfterImage.prototype.feedoutImageToneB = function() {
        return this._feedoutImageToneB;
    }
    Game_AfterImage.prototype.setFeedoutImageToneB = function( feedoutImageToneB ) {
        this._feedoutImageToneB = feedoutImageToneB;
    }

    // ---
    // 残像表示用スプライト一覧を管理するコンテナ
    // ---
    Game_AfterImage.prototype.afterimageContainer = function() {
        return this._afterimageContainer;
    }
    Game_AfterImage.prototype.setAfterimageContainer = function( afterimageContainer ) {
        this._afterimageContainer = afterimageContainer;
    }

    // ---
    // 残像表示用スプライト一覧
    // ---
    Game_AfterImage.prototype.afterimageSprites = function() {
        return this._afterimageSprites;
    }
    Game_AfterImage.prototype.setAfterimageSprites = function( afterimageSprites ) {
        this._afterimageSprites = afterimageSprites;
    }
    // --------------------------------------------------------------------------------------------

    // ◆Game_AfterImage_MapObject----------------------------------------------------------------------
    function Game_AfterImage_MapObject( id ) {
        this.initialize.apply( this, arguments );
    }

    Game_AfterImage_MapObject.prototype = Object.create( Game_AfterImage.prototype );
    Game_AfterImage_MapObject.prototype.constructor = Game_AfterImage;

    // ---
    // メンバ初期化
    //
    Game_AfterImage_MapObject.prototype.initialize = function( targetId ) {
        Game_AfterImage.prototype.initialize.apply( this, arguments );
        this._afterimageContainer.anchor.x = 0.5;
        this._afterimageContainer.anchor.y = 1;
        this._afterimageContainer.z = 2.9;
    }

    // ---
    // 残像表示フラグ
    // ---
    Game_AfterImage_MapObject.prototype.setIsDisplayAfterimage = function( isDisplayAfterimage ) {
        var beforeIsDisplayAfterimage = this.isDisplayAfterimage();
        Game_AfterImage.prototype.setIsDisplayAfterimage.apply( this, arguments );

        // マップスプライトにアクセスできない場合は処理しない
        if( SceneManager._scene._spriteset == null ) {
            return;
        }

        // マップ上のスプライト情報を更新
        if( beforeIsDisplayAfterimage != isDisplayAfterimage ) {
            SceneManager._scene._spriteset.setupAfterImage();

            // スプライト情報を削除する場合は、すでに表示している残像情報をクリアする
            if( !isDisplayAfterimage ) {
                var container = this.afterimageContainer();
                var sprites = this.afterimageSprites();
                for( var i = 0; i < sprites.length; i++ ) {
                    sprites[i].opacity = 0;
                    sprites[i].update();
                    container.removeChild( sprites[i] );
                }
                sprites.length = 0;
            }
        }
    }
    // --------------------------------------------------------------------------------------------

    // ◆Game_AfterImage_Event----------------------------------------------------------------------
    function Game_AfterImage_Event( id ) {
        this.initialize.apply( this, arguments );
    }

    Game_AfterImage_Event.prototype = Object.create( Game_AfterImage_MapObject.prototype );
    Game_AfterImage_Event.prototype.constructor = Game_AfterImage_MapObject;
    // --------------------------------------------------------------------------------------------
    // ◆Game_AfterImage_Player----------------------------------------------------------------------
    function Game_AfterImage_Player( id ) {
        this.initialize.apply( this, arguments );
    }

    Game_AfterImage_Player.prototype = Object.create( Game_AfterImage_MapObject.prototype );
    Game_AfterImage_Player.prototype.constructor = Game_AfterImage_MapObject;
    // --------------------------------------------------------------------------------------------
    // ◆Game_AfterImage_Follower----------------------------------------------------------------------
    function Game_AfterImage_Follower( id ) {
        this.initialize.apply( this, arguments );
    }

    Game_AfterImage_Follower.prototype = Object.create( Game_AfterImage_MapObject.prototype );
    Game_AfterImage_Follower.prototype.constructor = Game_AfterImage_MapObject;
    // --------------------------------------------------------------------------------------------
    // ◆Game_AfterImage_Vehicle----------------------------------------------------------------------
    function Game_AfterImage_Vehicle( id ) {
        this.initialize.apply( this, arguments );
    }

    Game_AfterImage_Vehicle.prototype = Object.create( Game_AfterImage_MapObject.prototype );
    Game_AfterImage_Vehicle.prototype.constructor = Game_AfterImage_MapObject;
    // --------------------------------------------------------------------------------------------
    // ◆Game_AfterImage_Picture--------------------------------------------------------------------
    function Game_AfterImage_Picture( id ) {
        this.initialize.apply( this, arguments );
    }

    Game_AfterImage_Picture.prototype = Object.create( Game_AfterImage.prototype );
    Game_AfterImage_Picture.prototype.constructor = Game_AfterImage;

    // ---
    // メンバ初期化
    //
    Game_AfterImage_Picture.prototype.initialize = function( targetId ) {
        Game_AfterImage.prototype.initialize.apply( this, arguments );
    }

    // ---
    // 残像表示フラグ
    // ---
    Game_AfterImage_Picture.prototype.setIsDisplayAfterimage = function( isDisplayAfterimage ) {
        if( SceneManager._scene._spriteset == null ) {
            Game_AfterImage.prototype.setIsDisplayAfterimage.apply( this, arguments );
            return;
        }
        if( isDisplayAfterimage ) {
            if( this.isDisplayAfterimage() != isDisplayAfterimage ) {
                // 残像表示用コンテナをピクチャ表示用コンテナに挿入するインデックス番号を計算
                var afterImages = afterImagesContainer();
                var index = this.targetId() - 1;
                for( var i = 0; i < this.targetId(); i++ ) {
                    var pictureNumber = i + 1;
                    var key = "PICT_" + pictureNumber;
                    if( key in afterImages && afterImages[key].isDisplayAfterimage() ) {
                        index ++;
                    }
                }
                
                // 残像表示用コンテナをピクチャ表示用コンテナに追加
                pictureContainer().removeChild( this.afterimageContainer() );
                pictureContainer().addChildAt( this.afterimageContainer(), index );
            }
        } else {
            if( this._isDisplayAfterimage != isDisplayAfterimage ) {
                // 残像表示用コンテナをピクチャ表示コンテナから削除
                var container = this.afterimageContainer();
                pictureContainer().removeChild( container );

                // 残像表示用スプライトをクリア
                var sprites = this.afterimageSprites();
                for( var i = 0; i < sprites.length; i++ ) {
                    sprites[i].opacity = 0;
                    sprites[i].update();
                    container.removeChild( sprites[i] );
                }
                sprites.length = 0;
            }
        }
        Game_AfterImage.prototype.setIsDisplayAfterimage.apply( this, arguments );
    }
    
    // --------------------------------------------------------------------------------------------

    // --------------------------------------------------
    // 定義更新
    // --------------------------------------------------
    var _Game_Screen_showPicture = Game_Screen.prototype.showPicture;
    Game_Screen.prototype.showPicture = function( pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode ) {
        // 既存のピクチャー表示処理を実行する
        _Game_Screen_showPicture.apply( this, arguments );

        var realPictureId = this.realPictureId( pictureId );
        var picture = this._pictures[realPictureId];
        picture.setPictureId( pictureId );
    };

    // Sprite_Picture------------------------------------------------------------------------------
    // ---
    // 残像表示が有効なピクチャーの表示が更新された場合は残像画像を追加する
    // また、残像の表示を更新する
    // ---
    var _Sprite_Picture_update = Sprite_Picture.prototype.update;
    Sprite_Picture.prototype.update = function() {
        // ピクチャがとれない場合は既存処理のみ実行して処理終了（こんなことありえるか？）
        if( this.picture() == null ) {
            _Sprite_Picture_update.apply( this, arguments );
            return;
        }
        // 残像情報がとれない、または残像が有効でない場合は既存処理のみ実行して処理終了
        var afterImages = afterImagesContainer();
        var picture = this.picture();
        var pictureId = picture.pictureId();
        var key = "PICT_" + pictureId;
        if(  !( key in afterImages ) || !afterImages[key].isDisplayAfterimage() ) {
            _Sprite_Picture_update.apply( this, arguments );
            return;
        }

        // 下記のいずれかが変更されている場合は現状を残像として表示する
        // ・ビットマップ
        // ・表示フレーム
        // ・表示位置
        var beforePictureName;
        var beforeFrameData;
        var beforeImageX;
        var beforeImageY;
        var beforeAngle;
        var afterPictureName;
        var afterFrameData;
        var afterImageX;
        var afterImageY;
        var afterAngle;

        // 更新前の情報を取得する
        beforePictureName = this.displayedFileName();
        beforeAngle = this.displayedAngle();
        beforeFrameData = this.getFrameData();
        beforeImageX = this.x;
        beforeImageY = this.y;
        
        // 既存のピクチャー画像更新処理を実行する
        _Sprite_Picture_update.apply( this, arguments );

        // 更新後の情報を取得する
        this.setDisplayedFileName( picture.name() ); 
        this.setDisplayedAngle( picture.angle() );
        afterPictureName = this.displayedFileName();
        afterAngle = this.displayedAngle();
        afterFrameData = this.getFrameData();
        afterImageX = this.x;
        afterImageY = this.y;
        
        var afterImage = afterImages[key];
        var container = afterImage.afterimageContainer();
        var afterImageSprites = afterImage.afterimageSprites();
        
        // 更新後の情報を取得する
        if( beforePictureName != afterPictureName ||  beforeAngle != afterAngle || beforeFrameData.toString() != afterFrameData.toString()
         || beforeImageX != afterImageX || beforeImageY != afterImageY ) {
            var bitmap = ImageManager.getAfterImage( this.bitmap, beforePictureName, afterImage.feedoutImageToneR(), afterImage.feedoutImageToneG(), afterImage.feedoutImageToneB() );
            var sprite = new Sprite( bitmap );
            sprite.x = beforeImageX;
            sprite.y = beforeImageY;
            sprite.scale.x = this.scale.x;
            sprite.scale.y = this.scale.y;
            sprite.opacity = this.opacity;
            sprite.rotation = picture.angle() * Math.PI / 180;
            if ( picture.origin() === 0 ) {
                sprite.anchor.x = 0;
                sprite.anchor.y = 0;
            } else {
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
            }
            sprite.setFrame( beforeFrameData[0], beforeFrameData[1], beforeFrameData[2], beforeFrameData[3] );
            container.addChild( sprite );
            afterImageSprites[afterImageSprites.length] = sprite;
        }

        // 残像スプライトを更新する
        for( var i = 0; i < afterImageSprites.length; i++ ) {
            var sprite = afterImageSprites[i];
            sprite.opacity -= afterImage.feedoutOpacityPerFrame();
            sprite.update();
            if( sprite.opacity <= 0 ) {
                container.removeChild( sprite );
                afterImageSprites.splice( i, 1 );
                i--;
            }
        }
    };
    // --------------------------------------------------------------------------------------------

    // Sprite_Character----------------------------------------------------------------------------
    // ---
    // 残像表示が有効なイベントの表示が更新された場合は残像画像を追加する
    // また、残像の表示を更新する
    // ---
    var _Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        // イベントがとれない場合は既存処理のみ実行して処理終了（こんなことありえるか？）
        if( this._character == null ) {
            _Sprite_Character_update.apply( this, arguments );
            return;
        }
        // 残像情報がとれない、または残像が有効でない場合は既存処理のみ実行して処理終了
        var key = "";
        if( this._character.constructor === Game_Event ) {
            key = "EVENT_" + this._character.eventId();
        }
        if( this._character.constructor === Game_Player ) {
            key = "PLAYER";
        }
        if( this._character.constructor === Game_Follower ) {
            key = "FOLLOWER_" + this._character.memberIndex();
        }
        if( this._character.constructor === Game_Vehicle ) {
            if( this._character.isBoat() ) {
                key = "SMALLSHIP";
            }
            if( this._character.isShip() ) {
                key = "LARGESHIP";
            }
            if( this._character.isAirship() ) {
                key = "AIRSHIP";
            }
        }
        var afterImages = afterImagesContainer();
        if( key == "" || !( key in afterImages ) || !afterImages[key].isDisplayAfterimage() ) {
            _Sprite_Character_update.apply( this, arguments );
            return;
        }
        // 下記のいずれかが変更されている場合は現状を残像として表示する
        // ・ビットマップ
        // ・表示フレーム
        // ・表示位置
        var isDisplayAfterimage = false;
        var beforeCharaName;
        var beforeFrameData;
        var beforeImageX;
        var beforeImageY;
        var beforeImageZ;
        var afterCharaName;
        var afterFrameData;
        var afterImageX;
        var afterImageY;
        var afterImageZ;

        // 更新前の情報を取得する
        beforeCharaName = this.displayedFileName();
        beforeFrameData = this.getFrameData();
        beforeImageX = this.x;
        beforeImageY = this.y;
        beforeImageZ = this.z;
        
        // 既存のキャラクタースプライト更新処理を実行する
        _Sprite_Character_update.apply( this, arguments );

        // 更新後の情報を取得する
        this.setDisplayedFileName( this._character.characterName() ); 
        afterCharaName = this.displayedFileName();
        afterFrameData = this.getFrameData();
        afterImageX = this.x;
        afterImageY = this.y;
        afterImageZ = this.z;
        
        var afterImage = afterImages[key];
        var container = afterImage.afterimageContainer();
        var afterImageSprites = afterImage.afterimageSprites();
        
        // 更新後の情報を取得する
        if( beforeCharaName != afterCharaName ||  beforeFrameData.toString() != afterFrameData.toString()
         || beforeImageX != afterImageX || beforeImageY != afterImageY || beforeImageZ != afterImageZ ) {
             
            // 乗り物に乗っている最中はプレイヤー／フォロワーの残像は表示しない
            if( !( $gamePlayer.isInVehicle() && ( this._character.constructor === Game_Player || this._character.constructor === Game_Follower ) ) ) {
                var bitmap = ImageManager.getAfterImage( this.bitmap, beforeCharaName, afterImage.feedoutImageToneR(), afterImage.feedoutImageToneG(), afterImage.feedoutImageToneB() );
                var sprite = new Sprite( bitmap );
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 1;
                sprite.x = beforeImageX;
                sprite.y = beforeImageY;
                sprite.z = beforeImageZ - 0.1;
                sprite.opacity = this.opacity;
                sprite.setFrame( beforeFrameData[0], beforeFrameData[1], beforeFrameData[2], beforeFrameData[3] );
                container.addChild( sprite );
                afterImageSprites[afterImageSprites.length] = sprite;
            }
        }

        // 残像スプライトを更新する
        for( var i = 0; i < afterImageSprites.length; i++ ) {
            var sprite = afterImageSprites[i];
            sprite.opacity -= afterImage.feedoutOpacityPerFrame();
            sprite.update();
            if( sprite.opacity <= 0 ) {
                container.removeChild( sprite );
                afterImageSprites.splice( i, 1 );
                i--;
            }
        }
    };
    // --------------------------------------------------------------------------------------------

    // --------------------------------------------------
    // 定義追加
    // --------------------------------------------------
    var _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {
        if( afterImagesContainer() == null ) {
            initAfterImagesContainer();
            var afterImages = afterImagesContainer();
            var afterImageJsons = $gameScreen.afterImageJsons();
            for( var i = 0; i < afterImageJsons.length; i++ ) {
                var afterImage = jsonToAfterImage( afterImageJsons[i] )
                var key = "";
                if( afterImage instanceof Game_AfterImage_Picture ) {
                    key = "PICT_" + afterImage.targetId();
                }
                if( afterImage instanceof Game_AfterImage_Event ) {
                    key = "EVENT_" + afterImage.targetId();
                }
                if( afterImage instanceof Game_AfterImage_Player ) {
                    key = "PLAYER";
                }
                if( afterImage instanceof Game_AfterImage_Follower ) {
                    key = "FOLLOWER_" + afterImage.targetId();
                }
                if( afterImage instanceof Game_AfterImage_Vehicle ) {
                    if( afterImage.targetId() == 1  ) {
                        key = "SMALLSHIP";
                    }
                    if( afterImage.targetId() == 2 ) {
                        key = "LARGESHIP";
                    }
                    if( afterImage.targetId() == 3 ) {
                        key = "AIRSHIP";
                    }
                }
                afterImages[key] = afterImage;
            }
        }
        _Spriteset_Map_initialize.apply( this, arguments );
    };

    // ---
    // マップ表示時に残像スプライトを追加する
    // ---
    var _Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
    Spriteset_Map.prototype.createCharacters = function() {
        _Spriteset_Map_createCharacters.apply( this, arguments );
        this.setupAfterImage();
    };

    var _Spriteset_Base_createPictures = Spriteset_Base.prototype.createPictures;
    Spriteset_Base.prototype.createPictures = function() {
        _Spriteset_Base_createPictures.apply( this, arguments );
        
        // ピクチャ一括管理スプライトを$gameScreenから参照できるようにする
        setPictureContainer( this._pictureContainer );
        
        var afterImages = afterImagesContainer();
        for( var key in afterImages ) {
            var afterImage = afterImages[key];
            if( key.indexOf( "PICT_" ) != -1 && afterImage.isDisplayAfterimage() ) {
                // 残像表示用コンテナをピクチャ表示用コンテナに挿入するインデックス番号を計算
                var index = afterImage.targetId() - 1;
                for( var i = 0; i < afterImage.targetId(); i++ ) {
                    var pictureNumber = i + 1;
                    var searchKey = "PICT_" + pictureNumber;
                    if( searchKey in afterImages && afterImages[searchKey].isDisplayAfterimage() ) {
                        index ++;
                    }
                }
                // 残像表示用コンテナをピクチャ表示用コンテナに追加
                pictureContainer().removeChild( afterImage.afterimageContainer() );
                pictureContainer().addChildAt( afterImage.afterimageContainer(), index - 1 );
            }
        }
    };

    // ---
    // キャラクターの残像表示用スプライトをマップ上のスプライト一覧に挿入
    // ---
    Spriteset_Map.prototype.setupAfterImage = function() {
        this.removeAfterImage();
        this.insertAfterImage();
    };

    Spriteset_Map.prototype.removeAfterImage = function() {
        var afterImages = afterImagesContainer();
        var targetIdsByType = $gameScreen.getTargetIdsByType();
        var eventIds = targetIdsByType[0];
        var vehicleIds = targetIdsByType[1];
        var followerIds = targetIdsByType[2];
        var playerIds = targetIdsByType[3];
        
        // イベントの残像表示用スプライトを削除
        eventIds.forEach( function( eventId ) {
            var targets = $gameMap.events().filter( function( item, index ) {
                return item.eventId() == eventId;
            });
            if( targets.length > 0 ) {
                var afterImage = afterImages["EVENT_" + targets[0].eventId()];
                for( var j = 0; j < this._characterSprites.length; j++ ) {
                    if( this._characterSprites[j] == afterImage.afterimageContainer() ) {
                        this._characterSprites.splice( j, 1 );
                        this._tilemap.removeChild( afterImage.afterimageContainer() );
                    }
                }
            }
        }, this );

        // 乗り物の残像表示用スプライトを削除
        vehicleIds.forEach( function( vehicleId ) {
            var keyArray = ["SMALLSHIP", "LARGESHIP", "AIRSHIP"];
            var key = keyArray[vehicleId - 1];
            var afterImage = afterImages[key];
            for( var j = 0; j < this._characterSprites.length; j++ ) {
                if( this._characterSprites[j] == afterImage.afterimageContainer() ) {
                    this._characterSprites.splice( j, 1 );
                    this._tilemap.removeChild( afterImage.afterimageContainer() );
                }
            }
        }, this );
        // フォロワーの残像表示用スプライトを削除
        followerIds.forEach( function( followerId ) {
            var keys = Object.keys( afterImages );
            var afterImage = afterImages["FOLLOWER_" + followerId];
            for( var j = 0; j < this._characterSprites.length; j++ ) {
                if( this._characterSprites[j] == afterImage.afterimageContainer() ) {
                    this._characterSprites.splice( j, 1 );
                    this._tilemap.removeChild( afterImage.afterimageContainer() );
                }
            }
        }, this );
        // プレイヤーの残像表示用スプライトを削除
        playerIds.forEach( function( playerId ) {
            var afterImage = afterImages["PLAYER"];
            for( var j = 0; j < this._characterSprites.length; j++ ) {
                if( this._characterSprites[j] == afterImage.afterimageContainer() ) {
                    this._characterSprites.splice( j, 1 );
                    this._tilemap.removeChild( afterImage.afterimageContainer() );
                }
            }
        }, this );
    };

    Spriteset_Map.prototype.insertAfterImage = function() {
        var afterImages = afterImagesContainer();
        var targetIdsByType = $gameScreen.getTargetIdsByType();
        var eventIds = targetIdsByType[0];
        var vehicleIds = targetIdsByType[1];
        var followerIds = targetIdsByType[2];
        var playerIds = targetIdsByType[3];

        var i = 0;
        // イベントの残像表示用スプライトを挿入
        eventIds.forEach( function( eventId ) {
            var targets = $gameMap.events().filter( function( item, index ) {
                return item.eventId() == eventId;
            });
            if( targets.length > 0 ) {
                var afterImage = afterImages["EVENT_" + targets[0].eventId()];
                if( afterImage.isDisplayAfterimage() ) {
                    this._characterSprites.unshift( afterImage.afterimageContainer() );
                    this._tilemap.addChildAt( afterImage.afterimageContainer(), i );
                    i++;
                }
            }
        }, this );

        // 乗り物の残像表示用スプライトを挿入
        vehicleIds.forEach( function( vehicleId ) {
            var keyArray = ["SMALLSHIP", "LARGESHIP", "AIRSHIP"];
            var key = keyArray[vehicleId - 1];
            var afterImage = afterImages[key];
            if( afterImage.isDisplayAfterimage() ) {
                this._characterSprites.unshift( afterImage.afterimageContainer() );
                this._tilemap.addChildAt( afterImage.afterimageContainer(), i );
                i++;
            }
        }, this );

        // フォロワーの残像表示用スプライトを挿入
        followerIds.forEach( function( followerId ) {
            var afterImage = afterImages["FOLLOWER_" + followerId];
            if( afterImage.isDisplayAfterimage() ) {
                this._characterSprites.unshift( afterImage.afterimageContainer() );
                this._tilemap.addChildAt( afterImage.afterimageContainer(), i );
                i++;
            }
        }, this );

        // プレイヤーの残像表示用スプライトを挿入
        playerIds.forEach( function( playerId ) {
            var afterImage = afterImages["PLAYER"];
            if( afterImage.isDisplayAfterimage() ) {
                this._characterSprites.unshift( afterImage.afterimageContainer() );
                this._tilemap.addChildAt( afterImage.afterimageContainer(), i );
                i++;
            }
        }, this );
    };

    // Sprite--------------------------------------------------------------------------------------
    // ---
    // 直前に表示していた画像ファイル名を取得／設定する
    // ---
    Sprite.prototype.displayedFileName = function() {
        if( this._displayedFileName == null ) {
            this._displayedFileName = "";
        }
        return this._displayedFileName;
    };
    Sprite.prototype.setDisplayedFileName = function( displayedFileName ) {
        this._displayedFileName = displayedFileName;
    };
    // ---
    // 直前に表示していた回転角度を取得／設定する
    // ---
    Sprite.prototype.displayedAngle = function() {
        if( this._displayedAngle == null ) {
            this._displayedAngle = 0;
        }
        return this._displayedAngle;
    };
    Sprite.prototype.setDisplayedAngle = function( displayedAngle ) {
        this._displayedAngle = displayedAngle;
    };
    // ---
    // フレーム情報を配列で取得する
    // ※そのまま渡してよいのでは？
    // ---
    Sprite.prototype.getFrameData = function() {
        return [this._frame.x, this._frame.y, this._frame.width, this._frame.height];
    };
    // --------------------------------------------------------------------------------------------

    // ImageManager--------------------------------------------------------------------------------
    // ---
    // 残像画像を取得する
    // キャッシュが存在しない場合は、残像画像キャッシュを生成しておく
    // ※まだ画像がロードされていない場合を考慮
    // ---
    ImageManager.getAfterImage = function( source, fileName, r, g, b ) {
        var cache = this.afterImageCache();
        var key = fileName + "R" + r + "G" + g + "B" + b;
        var bitmap = cache.get( key );
        if ( !bitmap ) {
            var setupAfterImage = function() {
                bitmap = new Bitmap( source.width, source.height );
                var sourceContext = source.context;
                var sourceImageData = sourceContext.getImageData( 0, 0, source.width, source.height );
                var sourcePixels = sourceImageData.data;
                var bitmapContext = bitmap.context;
                var bitmapImageData = bitmapContext.getImageData( 0, 0, bitmap.width, bitmap.height );
                var bitmapPixels = bitmapImageData.data;
                for ( var i = 0; i < sourcePixels.length; i += 4 ) {
                    bitmapPixels[i + 0] = sourcePixels[i + 0] + r;
                    bitmapPixels[i + 1] = sourcePixels[i + 1] + g;
                    bitmapPixels[i + 2] = sourcePixels[i + 2] + b;
                    bitmapPixels[i + 3] = sourcePixels[i + 3];
                }
                bitmapContext.putImageData( bitmapImageData, 0, 0 );
                cache.add( key, bitmap );
            }
            if( !source.isReady() ) {
                source.addLoadListener( function() {
                    setupAfterImage();
                } );
            } else {
                setupAfterImage();
            }
        } else if( !bitmap.isReady() ){
            bitmap.decode();
        }
        return bitmap;
    };

    ImageManager.afterImageCache = function() {
        if( this._afterIimageCache == null ) {
            this._afterIimageCache = new ImageCache();
        }
        return this._afterIimageCache;
    };
    // --------------------------------------------------------------------------------------------
})();