
/*-----------------------------------------------------------------------------------------
/*:
 *
 * @param 速度1
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 * 
 * @param 速度2
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 * 
 * @param 速度3
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 * 
 * @param 速度5
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 * 
 * @param 速度6
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 * 
 * @param 速度7
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 *
 * @param 速度8
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 * 
 */
var ww = ww || {}
ww.animationSetrate = {}
ww.animationSetrate.setup = Sprite_Animation.prototype.setup
ww.animationSetrate.list = []; 
ww.animationSetrate.list[1] = PluginManager.parameters('animationSet_rate')['速度1'].split(',') || [];
ww.animationSetrate.list[2] = PluginManager.parameters('animationSet_rate')['速度2'].split(',') || [];
ww.animationSetrate.list[3] = PluginManager.parameters('animationSet_rate')['速度3'].split(',') || [];
ww.animationSetrate.list[5] = PluginManager.parameters('animationSet_rate')['速度5'].split(',') || [];
ww.animationSetrate.list[6] = PluginManager.parameters('animationSet_rate')['速度6'].split(',') || [];
ww.animationSetrate.list[7] = PluginManager.parameters('animationSet_rate')['速度7'].split(',') || [];
ww.animationSetrate.list[8] = PluginManager.parameters('animationSet_rate')['速度8'].split(',') || [];
ww.animationSetrate.eval = function (id) {
    var l = ww.animationSetrate.list;
    for (var i = l.length; i-- > 0;) {
        var e = l[i];
        if (e) {
            if (e.indexOf(id=""+id) >= 0) {
                return i
            }
        }
    }
    return 4
};
Sprite_Animation.prototype.setup = function (target, animation, mirror, delay) {
    ww.animationSetrate.setup.apply(this, arguments)
    if (this._animation) {
        try { 
            this._rate = ww.animationSetrate.eval (this._animation.id )
            this.setupDuration();
        } catch (error) {
            this._rate = 4
        }
    }
};