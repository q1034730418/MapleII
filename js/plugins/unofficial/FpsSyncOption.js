//=============================================================================
// Plugin - Fps Sync as Option
// FpsSyncOption.js
//=============================================================================

var Imported = Imported || {};
Imported.FpsSyncOption = true;

var Liquidize = Liquidize || {};
Liquidize.FpsSync = Liquidize.FpsSync || {};

//=============================================================================
/*:
*@plugindesc v1.00将命令添加到选项中以启用打开
*或关闭监视器fps同步。
*@作者清算
*
*@参数命令名
*@选项菜单中的DESC命令名。
*@默认监视器fps同步
*
*@参数默认值
*@描述fps sync选项的默认值。
*@默认为真
*
*@帮助
*============================================================================
*导言
*============================================================================
*
*此插件将用于RPG Maker MV版本1.2.0及更高版本。
*
*允许用户禁用或启用更新
*从v1.1.0开始添加的游戏。
 *
 */
//=============================================================================

//=============================================================================
// Parameters
//=============================================================================

Liquidize.Parameters = PluginManager.parameters('FpsSyncOption');
Liquidize.Param = Liquidize.Param || {};

Liquidize.Param.FpsSyncCmdName = String(Liquidize.Parameters['Command Name']);
Liquidize.Param.FpsSyncDefault = eval(String(Liquidize.Parameters['Default Value']));

//=============================================================================
// Main
//=============================================================================

ConfigManager.fpsSync = Liquidize.Param.FpsSyncDefault;

Liquidize.FpsSync.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Liquidize.FpsSync.ConfigManager_makeData.call(this);
    config.fpsSync = this.fpsSync;
    return config;
};

Liquidize.FpsSync.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Liquidize.FpsSync.ConfigManager_applyData.call(this, config);
    this.fpsSync = this.readFpsSyncConfig(config, 'fpsSync');
};

ConfigManager.readFpsSyncConfig = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return Liquidize.Param.FpsSyncDefault;
    }
};

//=============================================================================
// SceneManager
//=============================================================================

SceneManager.updateMainDefault = SceneManager.updateMain;

SceneManager.updateWithoutFpsSync = function() {
    this.updateInputData();
    this.changeScene();
    this.updateScene();
    this.renderScene();
    this.requestUpdate();
};

SceneManager.updateMain = function() {
    if (ConfigManager.fpsSync) {
        this.updateMainDefault();
    } else {
        this.updateWithoutFpsSync();
    }
};

//=============================================================================
// Window_Options
//=============================================================================

Liquidize.FpsSync.Window_Options_addGeneralOptions =
    Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    Liquidize.FpsSync.Window_Options_addGeneralOptions.call(this);
    this.addCommand(Liquidize.Param.FpsSyncCmdName, 'fpsSync');
};

//=============================================================================
// End of File
//=============================================================================
