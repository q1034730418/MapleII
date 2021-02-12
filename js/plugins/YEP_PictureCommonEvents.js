//=============================================================================
// Yanfly Engine Plugins - Picture Common Events
// YEP_PictureCommonEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_PictureCommonEvents = true;

var Yanfly = Yanfly || {};
Yanfly.PCE = Yanfly.PCE || {};
Yanfly.PCE.version = 1.06;

//=============================================================================
 /*:
 * @plugindesc ▶V1.06 图片公共事件
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @text 常规
 * @default
 *
 * @param Enable Touch Move
 * @text 启用触摸移动
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @default true
 *
 * @param Hide Message
 * @text 消息窗口期间隐藏
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 消息窗口期间隐藏包含公共事件的图片
 * @default true
 *
 * @param ---Picture 1---
 * @text 图片 1
 * @default
 *
 * @param Picture 1 Click
 * @parent ---Picture 1---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 1 Repeat
 * @parent ---Picture 1---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 1 Hold
 * @parent ---Picture 1---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 1 Release
 * @parent ---Picture 1---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 2---
 * @text 图片 2
 * @default
 *
 * @param Picture 2 Click
 * @parent ---Picture 2---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 2 Repeat
 * @parent ---Picture 2---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 2 Hold
 * @parent ---Picture 2---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 2 Release
 * @parent ---Picture 2---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 3---
 * @text 图片 3
 * @default
 *
 * @param Picture 3 Click
 * @parent ---Picture 3---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 3 Repeat
 * @parent ---Picture 3---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 3 Hold
 * @parent ---Picture 3---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 3 Release
 * @parent ---Picture 3---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 4---
 * @text 图片 4
 * @default
 *
 * @param Picture 4 Click
 * @parent ---Picture 4---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 4 Repeat
 * @parent ---Picture 4---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 4 Hold
 * @parent ---Picture 4---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 4 Release
 * @parent ---Picture 4---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 5---
 * @text 图片 5
 * @default
 *
 * @param Picture 5 Click
 * @parent ---Picture 5---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 5 Repeat
 * @parent ---Picture 5---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 5 Hold
 * @parent ---Picture 5---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 5 Release
 * @parent ---Picture 5---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 6---
 * @text 图片 6
 * @default
 *
 * @param Picture 6 Click
 * @parent ---Picture 6---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 6 Repeat
 * @parent ---Picture 6---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 6 Hold
 * @parent ---Picture 6---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 6 Release
 * @parent ---Picture 6---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 7---
 * @text 图片 7
 * @default
 *
 * @param Picture 7 Click
 * @parent ---Picture 7---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 7 Repeat
 * @parent ---Picture 7---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 7 Hold
 * @parent ---Picture 7---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 7 Release
 * @parent ---Picture 7---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 8---
 * @text 图片 8
 * @default
 *
 * @param Picture 8 Click
 * @parent ---Picture 8---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 8 Repeat
 * @parent ---Picture 8---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 8 Hold
 * @parent ---Picture 8---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 8 Release
 * @parent ---Picture 8---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 9---
 * @text 图片 9
 * @default
 *
 * @param Picture 9 Click
 * @parent ---Picture 9---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 9 Repeat
 * @parent ---Picture 9---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 9 Hold
 * @parent ---Picture 9---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 9 Release
 * @parent ---Picture 9---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 10---
 * @text 图片 10
 * @default
 *
 * @param Picture 10 Click
 * @parent ---Picture 10---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 10 Repeat
 * @parent ---Picture 10---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 10 Hold
 * @parent ---Picture 10---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 10 Release
 * @parent ---Picture 10---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 11---
 * @text 图片 11
 * @default
 *
 * @param Picture 11 Click
 * @parent ---Picture 11---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 11 Repeat
 * @parent ---Picture 11---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 11 Hold
 * @parent ---Picture 11---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 11 Release
 * @parent ---Picture 11---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 12---
 * @text 图片 12
 * @default
 *
 * @param Picture 12 Click
 * @parent ---Picture 12---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 12 Repeat
 * @parent ---Picture 12---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 12 Hold
 * @parent ---Picture 12---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 12 Release
 * @parent ---Picture 12---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 13---
 * @text 图片 13
 * @default
 *
 * @param Picture 13 Click
 * @parent ---Picture 13---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 13 Repeat
 * @parent ---Picture 13---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 13 Hold
 * @parent ---Picture 13---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 13 Release
 * @parent ---Picture 13---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 14---
 * @text 图片 14
 * @default
 *
 * @param Picture 14 Click
 * @parent ---Picture 14---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 14 Repeat
 * @parent ---Picture 14---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 14 Hold
 * @parent ---Picture 14---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 14 Release
 * @parent ---Picture 14---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 15---
 * @text 图片 15
 * @default
 *
 * @param Picture 15 Click
 * @parent ---Picture 15---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 15 Repeat
 * @parent ---Picture 15---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 15 Hold
 * @parent ---Picture 15---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 15 Release
 * @parent ---Picture 15---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 16---
 * @text 图片 16
 * @default
 *
 * @param Picture 16 Click
 * @parent ---Picture 16---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 16 Repeat
 * @parent ---Picture 16---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 16 Hold
 * @parent ---Picture 16---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 16 Release
 * @parent ---Picture 16---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 17---
 * @text 图片 17
 * @default
 *
 * @param Picture 17 Click
 * @parent ---Picture 17---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 17 Repeat
 * @parent ---Picture 17---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 17 Hold
 * @parent ---Picture 17---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 17 Release
 * @parent ---Picture 17---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 18---
 * @text 图片 18
 * @default
 *
 * @param Picture 18 Click
 * @parent ---Picture 18---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 18 Repeat
 * @parent ---Picture 18---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 18 Hold
 * @parent ---Picture 18---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 18 Release
 * @parent ---Picture 18---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 19---
 * @text 图片 19
 * @default
 *
 * @param Picture 19 Click
 * @parent ---Picture 19---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 19 Repeat
 * @parent ---Picture 19---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 19 Hold
 * @parent ---Picture 19---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 19 Release
 * @parent ---Picture 19---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 20---
 * @text 图片 20
 * @default
 *
 * @param Picture 20 Click
 * @parent ---Picture 20---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 20 Repeat
 * @parent ---Picture 20---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 20 Hold
 * @parent ---Picture 20---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 20 Release
 * @parent ---Picture 20---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 21---
 * @text 图片 21
 * @default
 *
 * @param Picture 21 Click
 * @parent ---Picture 21---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 21 Repeat
 * @parent ---Picture 21---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 21 Hold
 * @parent ---Picture 21---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 21 Release
 * @parent ---Picture 21---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 22---
 * @text 图片 22
 * @default
 *
 * @param Picture 22 Click
 * @parent ---Picture 22---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 22 Repeat
 * @parent ---Picture 22---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 22 Hold
 * @parent ---Picture 22---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 22 Release
 * @parent ---Picture 22---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 23---
 * @text 图片 23
 * @default
 *
 * @param Picture 23 Click
 * @parent ---Picture 23---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 23 Repeat
 * @parent ---Picture 23---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 23 Hold
 * @parent ---Picture 23---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 23 Release
 * @parent ---Picture 23---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 24---
 * @text 图片 24
 * @default
 *
 * @param Picture 24 Click
 * @parent ---Picture 24---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 24 Repeat
 * @parent ---Picture 24---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 24 Hold
 * @parent ---Picture 24---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 24 Release
 * @parent ---Picture 24---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 25---
 * @text 图片 25
 * @default
 *
 * @param Picture 25 Click
 * @parent ---Picture 25---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 25 Repeat
 * @parent ---Picture 25---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 25 Hold
 * @parent ---Picture 25---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 25 Release
 * @parent ---Picture 25---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 26---
 * @text 图片 26
 * @default
 *
 * @param Picture 26 Click
 * @parent ---Picture 26---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 26 Repeat
 * @parent ---Picture 26---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 26 Hold
 * @parent ---Picture 26---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 26 Release
 * @parent ---Picture 26---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 27---
 * @text 图片 27
 * @default
 *
 * @param Picture 27 Click
 * @parent ---Picture 27---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 27 Repeat
 * @parent ---Picture 27---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 27 Hold
 * @parent ---Picture 27---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 27 Release
 * @parent ---Picture 27---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 28---
 * @text 图片 28
 * @default
 *
 * @param Picture 28 Click
 * @parent ---Picture 28---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 28 Repeat
 * @parent ---Picture 28---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 28 Hold
 * @parent ---Picture 28---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 28 Release
 * @parent ---Picture 28---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 29---
 * @text 图片 29
 * @default
 *
 * @param Picture 29 Click
 * @parent ---Picture 29---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 29 Repeat
 * @parent ---Picture 29---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 29 Hold
 * @parent ---Picture 29---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 29 Release
 * @parent ---Picture 29---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 30---
 * @text 图片 30
 * @default
 *
 * @param Picture 30 Click
 * @parent ---Picture 30---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 30 Repeat
 * @parent ---Picture 30---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 30 Hold
 * @parent ---Picture 30---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 30 Release
 * @parent ---Picture 30---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 31---
 * @text 图片 31
 * @default
 *
 * @param Picture 31 Click
 * @parent ---Picture 31---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 31 Repeat
 * @parent ---Picture 31---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 31 Hold
 * @parent ---Picture 31---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 31 Release
 * @parent ---Picture 31---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 32---
 * @text 图片 32
 * @default
 *
 * @param Picture 32 Click
 * @parent ---Picture 32---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 32 Repeat
 * @parent ---Picture 32---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 32 Hold
 * @parent ---Picture 32---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 32 Release
 * @parent ---Picture 32---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 33---
 * @text 图片 33
 * @default
 *
 * @param Picture 33 Click
 * @parent ---Picture 33---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 33 Repeat
 * @parent ---Picture 33---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 33 Hold
 * @parent ---Picture 33---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 33 Release
 * @parent ---Picture 33---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 34---
 * @text 图片 34
 * @default
 *
 * @param Picture 34 Click
 * @parent ---Picture 34---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 34 Repeat
 * @parent ---Picture 34---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 34 Hold
 * @parent ---Picture 34---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 34 Release
 * @parent ---Picture 34---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 35---
 * @text 图片 35
 * @default
 *
 * @param Picture 35 Click
 * @parent ---Picture 35---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 35 Repeat
 * @parent ---Picture 35---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 35 Hold
 * @parent ---Picture 35---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 35 Release
 * @parent ---Picture 35---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 36---
 * @text 图片 36
 * @default
 *
 * @param Picture 36 Click
 * @parent ---Picture 36---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 36 Repeat
 * @parent ---Picture 36---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 36 Hold
 * @parent ---Picture 36---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 36 Release
 * @parent ---Picture 36---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 37---
 * @text 图片 37
 * @default
 *
 * @param Picture 37 Click
 * @parent ---Picture 37---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 37 Repeat
 * @parent ---Picture 37---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 37 Hold
 * @parent ---Picture 37---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 37 Release
 * @parent ---Picture 37---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 38---
 * @text 图片 38
 * @default
 *
 * @param Picture 38 Click
 * @parent ---Picture 38---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 38 Repeat
 * @parent ---Picture 38---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 38 Hold
 * @parent ---Picture 38---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 38 Release
 * @parent ---Picture 38---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 39---
 * @text 图片 39
 * @default
 *
 * @param Picture 39 Click
 * @parent ---Picture 39---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 39 Repeat
 * @parent ---Picture 39---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 39 Hold
 * @parent ---Picture 39---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 39 Release
 * @parent ---Picture 39---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 40---
 * @text 图片 40
 * @default
 *
 * @param Picture 40 Click
 * @parent ---Picture 40---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 40 Repeat
 * @parent ---Picture 40---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 40 Hold
 * @parent ---Picture 40---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 40 Release
 * @parent ---Picture 40---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 41---
 * @text 图片 41
 * @default
 *
 * @param Picture 41 Click
 * @parent ---Picture 41---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 41 Repeat
 * @parent ---Picture 41---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 41 Hold
 * @parent ---Picture 41---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 41 Release
 * @parent ---Picture 41---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 42---
 * @text 图片 42
 * @default
 *
 * @param Picture 42 Click
 * @parent ---Picture 42---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 42 Repeat
 * @parent ---Picture 42---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 42 Hold
 * @parent ---Picture 42---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 42 Release
 * @parent ---Picture 42---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 43---
 * @text 图片 43
 * @default
 *
 * @param Picture 43 Click
 * @parent ---Picture 43---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 43 Repeat
 * @parent ---Picture 43---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 43 Hold
 * @parent ---Picture 43---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 43 Release
 * @parent ---Picture 43---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 44---
 * @text 图片 44
 * @default
 *
 * @param Picture 44 Click
 * @parent ---Picture 44---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 44 Repeat
 * @parent ---Picture 44---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 44 Hold
 * @parent ---Picture 44---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 44 Release
 * @parent ---Picture 44---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 45---
 * @text 图片 45
 * @default
 *
 * @param Picture 45 Click
 * @parent ---Picture 45---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 45 Repeat
 * @parent ---Picture 45---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 45 Hold
 * @parent ---Picture 45---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 45 Release
 * @parent ---Picture 45---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 46---
 * @text 图片 46
 * @default
 *
 * @param Picture 46 Click
 * @parent ---Picture 46---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 46 Repeat
 * @parent ---Picture 46---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 46 Hold
 * @parent ---Picture 46---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 46 Release
 * @parent ---Picture 46---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 47---
 * @text 图片 47
 * @default
 *
 * @param Picture 47 Click
 * @parent ---Picture 47---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 47 Repeat
 * @parent ---Picture 47---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 47 Hold
 * @parent ---Picture 47---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 47 Release
 * @parent ---Picture 47---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 48---
 * @text 图片 48
 * @default
 *
 * @param Picture 48 Click
 * @parent ---Picture 48---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 48 Repeat
 * @parent ---Picture 48---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 48 Hold
 * @parent ---Picture 48---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 48 Release
 * @parent ---Picture 48---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 49---
 * @text 图片 49
 * @default
 *
 * @param Picture 49 Click
 * @parent ---Picture 49---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 49 Repeat
 * @parent ---Picture 49---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 49 Hold
 * @parent ---Picture 49---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 49 Release
 * @parent ---Picture 49---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 50---
 * @text 图片 50
 * @default
 *
 * @param Picture 50 Click
 * @parent ---Picture 50---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 50 Repeat
 * @parent ---Picture 50---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 50 Hold
 * @parent ---Picture 50---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 50 Release
 * @parent ---Picture 50---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 51---
 * @text 图片 51
 * @default
 *
 * @param Picture 51 Click
 * @parent ---Picture 51---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 51 Repeat
 * @parent ---Picture 51---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 51 Hold
 * @parent ---Picture 51---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 51 Release
 * @parent ---Picture 51---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 52---
 * @text 图片 52
 * @default
 *
 * @param Picture 52 Click
 * @parent ---Picture 52---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 52 Repeat
 * @parent ---Picture 52---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 52 Hold
 * @parent ---Picture 52---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 52 Release
 * @parent ---Picture 52---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 53---
 * @text 图片 53
 * @default
 *
 * @param Picture 53 Click
 * @parent ---Picture 53---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 53 Repeat
 * @parent ---Picture 53---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 53 Hold
 * @parent ---Picture 53---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 53 Release
 * @parent ---Picture 53---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 54---
 * @text 图片 54
 * @default
 *
 * @param Picture 54 Click
 * @parent ---Picture 54---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 54 Repeat
 * @parent ---Picture 54---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 54 Hold
 * @parent ---Picture 54---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 54 Release
 * @parent ---Picture 54---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 55---
 * @text 图片 55
 * @default
 *
 * @param Picture 55 Click
 * @parent ---Picture 55---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 55 Repeat
 * @parent ---Picture 55---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 55 Hold
 * @parent ---Picture 55---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 55 Release
 * @parent ---Picture 55---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 56---
 * @text 图片 56
 * @default
 *
 * @param Picture 56 Click
 * @parent ---Picture 56---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 56 Repeat
 * @parent ---Picture 56---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 56 Hold
 * @parent ---Picture 56---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 56 Release
 * @parent ---Picture 56---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 57---
 * @text 图片 57
 * @default
 *
 * @param Picture 57 Click
 * @parent ---Picture 57---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 57 Repeat
 * @parent ---Picture 57---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 57 Hold
 * @parent ---Picture 57---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 57 Release
 * @parent ---Picture 57---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 58---
 * @text 图片 58
 * @default
 *
 * @param Picture 58 Click
 * @parent ---Picture 58---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 58 Repeat
 * @parent ---Picture 58---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 58 Hold
 * @parent ---Picture 58---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 58 Release
 * @parent ---Picture 58---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 59---
 * @text 图片 59
 * @default
 *
 * @param Picture 59 Click
 * @parent ---Picture 59---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 59 Repeat
 * @parent ---Picture 59---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 59 Hold
 * @parent ---Picture 59---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 59 Release
 * @parent ---Picture 59---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 60---
 * @text 图片 60
 * @default
 *
 * @param Picture 60 Click
 * @parent ---Picture 60---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 60 Repeat
 * @parent ---Picture 60---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 60 Hold
 * @parent ---Picture 60---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 60 Release
 * @parent ---Picture 60---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 61---
 * @text 图片 61
 * @default
 *
 * @param Picture 61 Click
 * @parent ---Picture 61---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 61 Repeat
 * @parent ---Picture 61---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 61 Hold
 * @parent ---Picture 61---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 61 Release
 * @parent ---Picture 61---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 62---
 * @text 图片 62
 * @default
 *
 * @param Picture 62 Click
 * @parent ---Picture 62---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 62 Repeat
 * @parent ---Picture 62---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 62 Hold
 * @parent ---Picture 62---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 62 Release
 * @parent ---Picture 62---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 63---
 * @text 图片 63
 * @default
 *
 * @param Picture 63 Click
 * @parent ---Picture 63---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 63 Repeat
 * @parent ---Picture 63---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 63 Hold
 * @parent ---Picture 63---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 63 Release
 * @parent ---Picture 63---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 64---
 * @text 图片 64
 * @default
 *
 * @param Picture 64 Click
 * @parent ---Picture 64---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 64 Repeat
 * @parent ---Picture 64---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 64 Hold
 * @parent ---Picture 64---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 64 Release
 * @parent ---Picture 64---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 65---
 * @text 图片 65
 * @default
 *
 * @param Picture 65 Click
 * @parent ---Picture 65---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 65 Repeat
 * @parent ---Picture 65---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 65 Hold
 * @parent ---Picture 65---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 65 Release
 * @parent ---Picture 65---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 66---
 * @text 图片 66
 * @default
 *
 * @param Picture 66 Click
 * @parent ---Picture 66---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 66 Repeat
 * @parent ---Picture 66---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 66 Hold
 * @parent ---Picture 66---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 66 Release
 * @parent ---Picture 66---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 67---
 * @text 图片 67
 * @default
 *
 * @param Picture 67 Click
 * @parent ---Picture 67---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 67 Repeat
 * @parent ---Picture 67---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 67 Hold
 * @parent ---Picture 67---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 67 Release
 * @parent ---Picture 67---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 68---
 * @text 图片 68
 * @default
 *
 * @param Picture 68 Click
 * @parent ---Picture 68---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 68 Repeat
 * @parent ---Picture 68---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 68 Hold
 * @parent ---Picture 68---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 68 Release
 * @parent ---Picture 68---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 69---
 * @text 图片 69
 * @default
 *
 * @param Picture 69 Click
 * @parent ---Picture 69---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 69 Repeat
 * @parent ---Picture 69---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 69 Hold
 * @parent ---Picture 69---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 69 Release
 * @parent ---Picture 69---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 70---
 * @text 图片 70
 * @default
 *
 * @param Picture 70 Click
 * @parent ---Picture 70---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 70 Repeat
 * @parent ---Picture 70---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 70 Hold
 * @parent ---Picture 70---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 70 Release
 * @parent ---Picture 70---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 71---
 * @text 图片 71
 * @default
 *
 * @param Picture 71 Click
 * @parent ---Picture 71---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 71 Repeat
 * @parent ---Picture 71---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 71 Hold
 * @parent ---Picture 71---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 71 Release
 * @parent ---Picture 71---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 72---
 * @text 图片 72
 * @default
 *
 * @param Picture 72 Click
 * @parent ---Picture 72---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 72 Repeat
 * @parent ---Picture 72---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 72 Hold
 * @parent ---Picture 72---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 72 Release
 * @parent ---Picture 72---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 73---
 * @text 图片 73
 * @default
 *
 * @param Picture 73 Click
 * @parent ---Picture 73---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 73 Repeat
 * @parent ---Picture 73---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 73 Hold
 * @parent ---Picture 73---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 73 Release
 * @parent ---Picture 73---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 74---
 * @text 图片 74
 * @default
 *
 * @param Picture 74 Click
 * @parent ---Picture 74---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 74 Repeat
 * @parent ---Picture 74---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 74 Hold
 * @parent ---Picture 74---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 74 Release
 * @parent ---Picture 74---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 75---
 * @text 图片 75
 * @default
 *
 * @param Picture 75 Click
 * @parent ---Picture 75---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 75 Repeat
 * @parent ---Picture 75---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 75 Hold
 * @parent ---Picture 75---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 75 Release
 * @parent ---Picture 75---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 76---
 * @text 图片 76
 * @default
 *
 * @param Picture 76 Click
 * @parent ---Picture 76---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 76 Repeat
 * @parent ---Picture 76---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 76 Hold
 * @parent ---Picture 76---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 76 Release
 * @parent ---Picture 76---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 77---
 * @text 图片 77
 * @default
 *
 * @param Picture 77 Click
 * @parent ---Picture 77---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 77 Repeat
 * @parent ---Picture 77---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 77 Hold
 * @parent ---Picture 77---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 77 Release
 * @parent ---Picture 77---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 78---
 * @text 图片 78
 * @default
 *
 * @param Picture 78 Click
 * @parent ---Picture 78---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 78 Repeat
 * @parent ---Picture 78---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 78 Hold
 * @parent ---Picture 78---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 78 Release
 * @parent ---Picture 78---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 79---
 * @text 图片 79
 * @default
 *
 * @param Picture 79 Click
 * @parent ---Picture 79---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 79 Repeat
 * @parent ---Picture 79---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 79 Hold
 * @parent ---Picture 79---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 79 Release
 * @parent ---Picture 79---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 80---
 * @text 图片 80
 * @default
 *
 * @param Picture 80 Click
 * @parent ---Picture 80---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 80 Repeat
 * @parent ---Picture 80---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 80 Hold
 * @parent ---Picture 80---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 80 Release
 * @parent ---Picture 80---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 81---
 * @text 图片 81
 * @default
 *
 * @param Picture 81 Click
 * @parent ---Picture 81---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 81 Repeat
 * @parent ---Picture 81---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 81 Hold
 * @parent ---Picture 81---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 81 Release
 * @parent ---Picture 81---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 82---
 * @text 图片 82
 * @default
 *
 * @param Picture 82 Click
 * @parent ---Picture 82---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 82 Repeat
 * @parent ---Picture 82---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 82 Hold
 * @parent ---Picture 82---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 82 Release
 * @parent ---Picture 82---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 83---
 * @text 图片 83
 * @default
 *
 * @param Picture 83 Click
 * @parent ---Picture 83---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 83 Repeat
 * @parent ---Picture 83---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 83 Hold
 * @parent ---Picture 83---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 83 Release
 * @parent ---Picture 83---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 84---
 * @text 图片 84
 * @default
 *
 * @param Picture 84 Click
 * @parent ---Picture 84---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 84 Repeat
 * @parent ---Picture 84---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 84 Hold
 * @parent ---Picture 84---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 84 Release
 * @parent ---Picture 84---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 85---
 * @text 图片 85
 * @default
 *
 * @param Picture 85 Click
 * @parent ---Picture 85---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 85 Repeat
 * @parent ---Picture 85---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 85 Hold
 * @parent ---Picture 85---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 85 Release
 * @parent ---Picture 85---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 86---
 * @text 图片 86
 * @default
 *
 * @param Picture 86 Click
 * @parent ---Picture 86---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 86 Repeat
 * @parent ---Picture 86---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 86 Hold
 * @parent ---Picture 86---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 86 Release
 * @parent ---Picture 86---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 87---
 * @text 图片 87
 * @default
 *
 * @param Picture 87 Click
 * @parent ---Picture 87---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 87 Repeat
 * @parent ---Picture 87---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 87 Hold
 * @parent ---Picture 87---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 87 Release
 * @parent ---Picture 87---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 88---
 * @text 图片 88
 * @default
 *
 * @param Picture 88 Click
 * @parent ---Picture 88---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 88 Repeat
 * @parent ---Picture 88---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 88 Hold
 * @parent ---Picture 88---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 88 Release
 * @parent ---Picture 88---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 89---
 * @text 图片 89
 * @default
 *
 * @param Picture 89 Click
 * @parent ---Picture 89---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 89 Repeat
 * @parent ---Picture 89---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 89 Hold
 * @parent ---Picture 89---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 89 Release
 * @parent ---Picture 89---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 90---
 * @text 图片 90
 * @default
 *
 * @param Picture 90 Click
 * @parent ---Picture 90---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 90 Repeat
 * @parent ---Picture 90---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 90 Hold
 * @parent ---Picture 90---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 90 Release
 * @parent ---Picture 90---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 91---
 * @text 图片 91
 * @default
 *
 * @param Picture 91 Click
 * @parent ---Picture 91---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 91 Repeat
 * @parent ---Picture 91---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 91 Hold
 * @parent ---Picture 91---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 91 Release
 * @parent ---Picture 91---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 92---
 * @text 图片 92
 * @default
 *
 * @param Picture 92 Click
 * @parent ---Picture 92---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 92 Repeat
 * @parent ---Picture 92---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 92 Hold
 * @parent ---Picture 92---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 92 Release
 * @parent ---Picture 92---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 93---
 * @text 图片 93
 * @default
 *
 * @param Picture 93 Click
 * @parent ---Picture 93---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 93 Repeat
 * @parent ---Picture 93---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 93 Hold
 * @parent ---Picture 93---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 93 Release
 * @parent ---Picture 93---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 94---
 * @text 图片 94
 * @default
 *
 * @param Picture 94 Click
 * @parent ---Picture 94---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 94 Repeat
 * @parent ---Picture 94---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 94 Hold
 * @parent ---Picture 94---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 94 Release
 * @parent ---Picture 94---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 95---
 * @text 图片 95
 * @default
 *
 * @param Picture 95 Click
 * @parent ---Picture 95---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 95 Repeat
 * @parent ---Picture 95---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 95 Hold
 * @parent ---Picture 95---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 95 Release
 * @parent ---Picture 95---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 96---
 * @text 图片 96
 * @default
 *
 * @param Picture 96 Click
 * @parent ---Picture 96---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 96 Repeat
 * @parent ---Picture 96---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 96 Hold
 * @parent ---Picture 96---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 96 Release
 * @parent ---Picture 96---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 97---
 * @text 图片 97
 * @default
 *
 * @param Picture 97 Click
 * @parent ---Picture 97---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 97 Repeat
 * @parent ---Picture 97---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 97 Hold
 * @parent ---Picture 97---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 97 Release
 * @parent ---Picture 97---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 98---
 * @text 图片 98
 * @default
 *
 * @param Picture 98 Click
 * @parent ---Picture 98---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 98 Repeat
 * @parent ---Picture 98---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 98 Hold
 * @parent ---Picture 98---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 98 Release
 * @parent ---Picture 98---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 99---
 * @text 图片 99
 * @default
 *
 * @param Picture 99 Click
 * @parent ---Picture 99---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 99 Repeat
 * @parent ---Picture 99---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 99 Hold
 * @parent ---Picture 99---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 99 Release
 * @parent ---Picture 99---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @param ---Picture 100---
 * @text 图片 100
 * @default
 *
 * @param Picture 100 Click
 * @parent ---Picture 100---
 * @text 单击时运行
 * @type common_event
 * @default 0
 *
 * @param Picture 100 Repeat
 * @parent ---Picture 100---
 * @text 按住左键每6帧运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每6帧触发一次
 * @default 0
 *
 * @param Picture 100 Hold
 * @parent ---Picture 100---
 * @text 按住左键每帧都运行1次
 * @type common_event
 * @desc 只要玩家没有松开鼠标(或停止触摸屏幕),每帧都会触发一次
 * @default 0
 *
 * @param Picture 100 Release
 * @parent ---Picture 100---
 * @text 松开后运行
 * @type common_event
 * @default 0
 *
 * @help
 * 插件更新:yanfly.moe/plugins/en/YEP_PictureCommonEvents.js
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 插件命令:
 * ════════════════════════════════════
 * 启用/禁用玩家触摸移动
 * EnableTouchMove
 * DisableTouchMove
 * ────────────────────────────────────
 * 启用/禁用消息窗口期间隐藏包含公共事件的图片
 * HidePictureCommonEvents
 * ShowPictureCommonEvents
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.makePictureCommonEventSettings = function(a, b) {
    Yanfly.PCE.Trigger = [null];
    Yanfly.PCE.Repeated = [null];
    Yanfly.PCE.Pressed = [null];
    Yanfly.PCE.Released = [null];
    for (var i = a; i < b + 1; ++i) {
      var param = 'Picture ' + i + ' Click';
      var value = Number(Yanfly.Parameters[param]);
      Yanfly.PCE.Trigger.push(value);
      var param = 'Picture ' + i + ' Repeat';
      var value = Number(Yanfly.Parameters[param]);
      Yanfly.PCE.Repeated.push(value);
      var param = 'Picture ' + i + ' Hold';
      var value = Number(Yanfly.Parameters[param]);
      Yanfly.PCE.Pressed.push(value);
      var param = 'Picture ' + i + ' Release';
      var value = Number(Yanfly.Parameters[param]);
      Yanfly.PCE.Released.push(value);
    }
};

Yanfly.Parameters = PluginManager.parameters('YEP_PictureCommonEvents');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.PCEMove = eval(String(Yanfly.Parameters['Enable Touch Move']));
Yanfly.Param.PCEHideMsg = eval(String(Yanfly.Parameters['Hide Message']));

Yanfly.makePictureCommonEventSettings(1, 100);

//=============================================================================
// Game_System
//=============================================================================

Yanfly.PCE.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.PCE.Game_System_initialize.call(this);
    this.initPCESettings();
};

Game_System.prototype.initPCESettings = function() {
    this._touchMovement = Yanfly.Param.PCEMove;
    this._hidePceMsg = Yanfly.Param.PCEHideMsg;
    this._hidePceAll = false;
};

Game_System.prototype.isTouchMoveEnabled = function() {
    if (this._touchMovement === undefined) this.initPCESettings();
    return this._touchMovement;
};

Game_System.prototype.setTouchMoveEnabled = function(value) {
    if (this._touchMovement === undefined) this.initPCESettings();
    this._touchMovement = value;
};

Game_System.prototype.isPictureHiddenDuringMessage = function() {
    if (this._hidePceMsg === undefined) this.initPCESettings();
    return this._hidePceMsg;
};

Game_System.prototype.setPictureHiddenDuringMessage = function(value) {
    if (this._hidePceMsg === undefined) this.initPCESettings();
    this._hidePceMsg = value;
};

Game_System.prototype.isPictureHidden = function() {
    if (this._hidePceAll === undefined) this.initPCESettings();
    return this._hidePceAll;
};

Game_System.prototype.setPictureHidden = function(value) {
    if (this._hidePceAll === undefined) this.initPCESettings();
    this._hidePceAll = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.PCE.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.PCE.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'EnableTouchMove') {
      $gameSystem.setTouchMoveEnabled(true);
    } else if (command === 'DisableTouchMove') {
      $gameSystem.setTouchMoveEnabled(false);
    } else if (command === 'MovePlayer') {
      this.pictureCommonEventsMove(args);
    } else if (command === 'HidePictureCommonEvents') {
      $gameSystem.setPictureHidden(true);
    } else if (command === 'ShowPictureCommonEvents') {
      $gameSystem.setPictureHidden(false);
    } else if (command === 'TriggerButton') {
      this.triggerButton(args)
    }
};

Game_Interpreter.prototype.pictureCommonEventsMove = function(args) {
    var dir = args[0];
    if (dir.match(/down/i)) {
      $gamePlayer.moveByPictureCommonEvent(2);
    } else if (dir.match(/left/i)) {
      $gamePlayer.moveByPictureCommonEvent(4);
    } else if (dir.match(/right/i)) {
      $gamePlayer.moveByPictureCommonEvent(6);
    } else if (dir.match(/up/i)) {
      $gamePlayer.moveByPictureCommonEvent(8);
    }
};

Game_Interpreter.prototype.triggerButton = function(args) {
  if (!args) return;
  var button = args[0].toLowerCase();
  if (button === 'cancel') button = 'escape';
  if (button === 'dash') button = 'shift';
  Input._latestButton = button;
  Input._pressedTime = 0;
};

//=============================================================================
// Game_Player
//=============================================================================

Game_Player.prototype.moveByPictureCommonEvent = function(direction) {
    if (!this.isMoving() && this.canMove() && direction > 0) {
      Input._dir4 = direction;
    }
};

Yanfly.PCE.Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    if ($gameMap.isEventRunning() && $gameMap.moveAfterCommonEvent()) {
      return true;
    }
    return Yanfly.PCE.Game_Player_canMove.call(this);
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.PCE.Game_Map_isEventRunning = Game_Map.prototype.isEventRunning;
Game_Map.prototype.isEventRunning = function() {
    if ($gameTemp._commonEventId > 0) return true;
    return Yanfly.PCE.Game_Map_isEventRunning.call(this);
};

Game_Map.prototype.moveAfterCommonEvent = function() {
    var interpreter = $gameMap._interpreter;
    if (!interpreter._list) return false;
    if (interpreter.eventId() > 0) return false;
    var list = interpreter._list;
    if ($gameTemp.destinationX() === $gamePlayer.x &&
      $gameTemp.destinationY() === $gamePlayer.y) {
        $gameTemp.clearDestination();
    }
    for (var i = 0; i < list.length; ++i) {
      var code = list[i].code;
      var exceptionCodes = [];
      exceptionCodes.push(101, 102, 103, 104, 105);
      exceptionCodes.push(201, 205, 230, 232, 261);
      exceptionCodes.push(301);
      if (exceptionCodes.contains(code)) return false;
    }
    return true;
};

//=============================================================================
// Game_Picture
//=============================================================================

Game_Picture.prototype.isTriggered = function() {
    if (!SceneManager._scene instanceof Scene_Map) return false;
    if (this.opacity() <= 0) return false;
    var sp = SceneManager._scene.getPictureSprite(this);
    if (!sp) return false;
    var mx = this.getLocalTouchInputX();
    var my = this.getLocalTouchInputY();
    //console.log('click: ' + mx + ', ' + my);
    var rect = this.getSpriteRect(sp);
    return mx >= rect.x &&
           my >= rect.y &&
           mx < (rect.x + rect.width) &&
           my < (rect.y + rect.height);
};

Game_Picture.prototype.pictureId = function() {
    return $gameScreen._pictures.indexOf(this);
};

Game_Picture.prototype.getLocalTouchInputX = function() {
    value = TouchInput.x;
    return value;
};

Game_Picture.prototype.getLocalTouchInputY = function() {
    value = TouchInput.y;
    return value;
};

Game_Picture.prototype.getSpriteRect = function(sp) {
    var width = sp.width * Math.abs(sp.scale.x);
    var height = sp.height * Math.abs(sp.scale.y);
    var x = sp.x - (sp.anchor.x * width);
    var y = sp.y - (sp.anchor.y * height);
    if (sp.anchor.x === 0 && sp.scale.x < 0) x += sp.width * sp.scale.x;
    if (sp.anchor.y === 0 && sp.scale.y < 0) y += sp.height * sp.scale.y;
    //console.log('rect: ' + x + ', ' + y + ', ' + width + ', ' + height);
    return new Rectangle(x, y, width, height);
};

Game_Picture.prototype.isRelatedPictureCommonEvent = function() {
    $gameTemp._pictureCommonEvents = $gameTemp._pictureCommonEvents || [];
    if ($gameTemp._pictureCommonEvents[this.pictureId()]) {
      return $gameTemp._pictureCommonEvents[this.pictureId()];
    }
    if (Yanfly.PCE.Trigger[this.pictureId()]) {
      $gameTemp._pictureCommonEvents[this.pictureId()] = true;
    } else if (Yanfly.PCE.Repeated[this.pictureId()]) {
      $gameTemp._pictureCommonEvents[this.pictureId()] = true;
    } else if (Yanfly.PCE.Pressed[this.pictureId()]) {
      $gameTemp._pictureCommonEvents[this.pictureId()] = true;
    } else if (Yanfly.PCE.Released[this.pictureId()]) {
      $gameTemp._pictureCommonEvents[this.pictureId()] = true;
    } else {
      $gameTemp._pictureCommonEvents[this.pictureId()] = false;
    }
    return $gameTemp._pictureCommonEvents[this.pictureId()];
};

Yanfly.PCE.Game_Picture_opacity = Game_Picture.prototype.opacity;
Game_Picture.prototype.opacity = function() {
  if (this.isRelatedPictureCommonEvent()) {
    if ($gameSystem.isPictureHidden()) return 0;
    if ($gameMessage.isBusy() && $gameSystem.isPictureHiddenDuringMessage()) {
      return 0;
    }
  }
  return Yanfly.PCE.Game_Picture_opacity.call(this);
};

//=============================================================================
// Spriteset_Base
//=============================================================================

Yanfly.PCE.Spriteset_Base_createPictures =
    Spriteset_Base.prototype.createPictures;
Spriteset_Base.prototype.createPictures = function() {
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map) {
      this.createSceneMapPictures();
    } else {
      Yanfly.PCE.Spriteset_Base_createPictures.call(this);
    }
};

Spriteset_Base.prototype.createSceneMapPictures = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var x = (Graphics.width - width) / 2;
    var y = (Graphics.height - height) / 2;
    this._pictureContainer = new Sprite();
    this._pictureContainer.setFrame(x, y, width, height);
    for (var i = 1; i <= $gameScreen.maxPictures(); i++) {
      var picture = new Sprite_Picture(i);
      if (picture.isRelatedPictureCommonEvent()) {
        SceneManager._scene.addPictureCommonEvent(picture);
      } else {
        this._pictureContainer.addChild(picture);
      }
    }
    this.addChild(this._pictureContainer);
};

//=============================================================================
// Sprite_Picture
//=============================================================================

Yanfly.PCE.Sprite_Picture_loadBitmap = Sprite_Picture.prototype.loadBitmap;
Sprite_Picture.prototype.loadBitmap = function() {
    Yanfly.PCE.Sprite_Picture_loadBitmap.call(this);
    SceneManager._scene.bindPictureSprite(this._pictureId, this);
};

Sprite_Picture.prototype.isRelatedPictureCommonEvent = function() {
    if (Yanfly.PCE.Trigger[this._pictureId]) return true;
    if (Yanfly.PCE.Repeated[this._pictureId]) return true;
    if (Yanfly.PCE.Pressed[this._pictureId]) return true;
    if (Yanfly.PCE.Released[this._pictureId]) return true;
    return false;
};

//=============================================================================
// Scene_Base
//=============================================================================

Scene_Base.prototype.bindPictureSprite = function(picture, sprite) {
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.PCE.Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function() {
    this._pictureCommonEvents = [];
    Yanfly.PCE.Scene_Map_createSpriteset.call(this);
    this.addPictureCommonEventChildren();
};

Scene_Map.prototype.addPictureCommonEvent = function(picture) {
    this._pictureCommonEvents.push(picture);
};

Scene_Map.prototype.addPictureCommonEventChildren = function() {
    var length = this._pictureCommonEvents.length;
    for (var i = 0; i < length; ++i) {
      var picture = this._pictureCommonEvents[i];
      this.addChild(picture);
    }
};

Scene_Map.prototype.bindPictureSprite = function(picture, sprite) {
    this._pictureCommonEventsBind = this._pictureCommonEventsBind || {};
    this._pictureCommonEventsBind[picture] = sprite;
};

Scene_Map.prototype.getPictureSprite = function(picture) {
    this._pictureCommonEventsBind = this._pictureCommonEventsBind || {};
    return this._pictureCommonEventsBind[picture.pictureId()];
};

Yanfly.PCE.Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
    this.updatePictureEvents();
    if (this.allowProcessMapTouch()) {
      Yanfly.PCE.Scene_Map_processMapTouch.call(this);
    }
};

Scene_Map.prototype.allowProcessMapTouch = function() {
    if (SceneManager.isSceneChanging()) return false;
    if ($gameMap.isEventRunning()) return false;
    if ($gameTemp.isCommonEventReserved()) return false;
    return $gameSystem.isTouchMoveEnabled();
};

Scene_Map.prototype.updatePictureEvents = function() {
    if (TouchInput.isTriggered()) {
      this.updatePictureEventCheck(Yanfly.PCE.Trigger);
    }
    if (TouchInput.isRepeated()) {
      this.updatePictureEventCheck(Yanfly.PCE.Repeated);
    }
    if (TouchInput.isPressed()) {
      this.updatePictureEventCheck(Yanfly.PCE.Pressed);
    }
    if (TouchInput.isReleased()) {
      this.updatePictureEventCheck(Yanfly.PCE.Released);
    }
};

Scene_Map.prototype.updatePictureEventCheck = function(check) {
    if (SceneManager.isSceneChanging()) return;
    if ($gameMap.isEventRunning()) return;
    var picture = this.getTriggeredPictureCommonEvent(check);
    if (!picture) return;
    $gameTemp.reserveCommonEvent(check[picture.pictureId()]);
    $gameTemp.clearDestination();
};

Scene_Map.prototype.getTriggeredPictureCommonEvent = function(check) {
    var length = check.length;
    var lastpicture = null;
    for (var i = 1; i < length; ++i) {
      var picture = $gameScreen.picture(i);
      if (!check[i]) continue;
      if (!picture) continue;
      var rect = picture.getSpriteRect(this.getPictureSprite(picture));
      lastpicture = picture;
      if (picture.isTriggered()) return picture;
    }
    return null;
};

Yanfly.PCE.Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
Scene_Map.prototype.isMenuCalled = function() {
    if ($gameSystem.isTouchMoveEnabled()) {
      return Yanfly.PCE.Scene_Map_isMenuCalled.call(this);
    } else {
      return Input.isTriggered('menu');
    }
};

//=============================================================================
// End of File
//=============================================================================
