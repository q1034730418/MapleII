/*-----------------------------------------------------------------------------------------
/*:
 *
 * @param 图层1
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 *
 * @param 图层2
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 * 
 * @param 图层3
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 * 
 * @param 图层4
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 * 
 * @param 图层5
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 * 
 * @param 图层6
 * @desc 输入多个技能ID时！用,隔开
 * 
 * @param 图层7
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 * 
 * @param 图层8
 * @desc 输入多个技能ID时！用,隔开
 * @default 0
 * 
 */
var ww = ww || {}
ww.animationSetZ = {}
ww.animationSetZ.setup = Sprite_Animation.prototype.setup
ww.animationSetZ.list = []; 
ww.animationSetZ.list[1] = PluginManager.parameters('animationSetZ')['图层1'].split(',') || [];
ww.animationSetZ.list[2] = PluginManager.parameters('animationSetZ')['图层2'].split(',') || [];
ww.animationSetZ.list[3] = PluginManager.parameters('animationSetZ')['图层3'].split(',') || [];
ww.animationSetZ.list[4] = PluginManager.parameters('animationSetZ')['图层4'].split(',') || [];
ww.animationSetZ.list[5] = PluginManager.parameters('animationSetZ')['图层5'].split(',') || [];
ww.animationSetZ.list[6] = PluginManager.parameters('animationSetZ')['图层6'].split(',') || [];
ww.animationSetZ.list[7] = PluginManager.parameters('animationSetZ')['图层7'].split(',') || [];
ww.animationSetZ.list[8] = PluginManager.parameters('animationSetZ')['图层8'].split(',') || [];
ww.animationSetZ.eval = function (id) {
    var l = ww.animationSetZ.list;
    for (var i = l.length; i-- > 0;) {
        var e = l[i];
        if (e) {
            if (e.indexOf(id=""+id) >= 0) {
                return i
            }
        }
    }
    return 8
};
Sprite_Animation.prototype.setup = function (target, animation, mirror, delay) { 
    ww.animationSetZ.setup.apply(this, arguments) 
    if (this._animation) {
        try {
            this.z = ww.animationSetZ.eval (this._animation.id )
        } catch (error) {
            this.z = 8
        }
    }
};