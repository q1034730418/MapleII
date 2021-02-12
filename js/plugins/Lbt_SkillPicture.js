//=============================================================================
// Lbt_skillpicture.js
//=============================================================================
 
/*:
 * @plugindesc 用图片做技能效果显示插件
 * @author Lbt
 * @help 图片格式为：图片名_帧数   例子：skill220_14
 * 脚本代码：show(id,n,t,x,y,xx,yy,p,sys,f,s)
 * show("编号","图片名",原点，x,y,x放大率,y放大率,透明度,合成方式,图片帧，图片间隔延迟)
 * xx yy 为负数时，水平或垂直反转  例如：xx: -100 水平反转
 * 例子：show(50,'skill220_',1,50,60,100,100,255,0,14,50)
 * 
 * 
 * 附带技能冷却功能：
 * 技能名字（开关：id,延迟事件，true）
 * 
 * sk224.cd2(10,4000,true)
 * 
 * 对应$gameSwitches.setValue(id,true); 
 * /////////////图片代替动画功能//////////////////////
 * 1，装备一张空白图片 放入animations文件夹；
 * 2，特效图用（文件名_帧）的格式来命名。
 * 例：skill_0.png skill_1.png skill_2.png skill_3.png 
 * 这是一个4帧的动画。。。。
 * 聚体步骤QQ详解。。。1034730418
 */
  //////////////////////////////
  function show(id,n,t,x,y,xx,yy,p,sys,f,s) {
    var i = 0;
     setInterval(function() {
        if(i < f) {
           i++;
           $gameScreen.showPicture(id,n+i,t,$gamePlayer.screenX()+x,$gamePlayer.screenY()+y,xx,yy,p,sys);
           
        }
     }, s);
  }
  ///////////////////
  function guiji(f) {
    var i = 0;
     setInterval(function() {
        if(i < f) {
           i++;
           var hudu = (2*Math.PI / 360) * 72 * i
           var X = 0 + Math.sin(hudu) * 55
           var Y = 0 + Math.cos(hudu) * 55
           $gameScreen.movePicture(50,0,X-25,Y-52,100,100,255,0,1)
           //$gameScreen.movePicture(51,0,X-25,Y-52,100,100,255,0,1)
           //console.log('第'+i+'个')
           //console.log(hudu)
           //console.log('第'+i+'个人物X')
           //console.log($gamePlayer.screenX())
           console.log('第'+i+'个圈X')
           console.log(i+"帧 X: "+Math.round(X-21))
           console.log(i+"帧 Y: "+Math.round(Y-21))
           console.log("---------------------")
           //console.log('第'+i+'个人物Y')
           //console.log($gamePlayer.screenY())
           //console.log('第'+i+'个圈Y')
           //console.log(Y-$gamePlayer.screenY())

           
        }
     }, 40);
  }


 /////////////////////////   

  function Skill1(){ 
      this.time = 0;
      };
     
    Skill1.prototype.cd2 = function(id,cd,on) {
      this.id=id;
      this.cd=cd;
      this.on=on;
      setTimeout(this.cd3.bind(this), cd);
     };
    Skill1.prototype.cd3 = function(){
      //console.log(this.id+"号"+"技能"+this.on)
      $gameSwitches.setValue(this.id,this.on); 
             
    };
    var sk224 = new Skill1();
    var sk225 = new Skill1();
    var sk226 = new Skill1();
    var sk198 = new Skill1();
    var char0 = new Skill1();

  (function() {



    var _Sprite_Animation_prototype_initMembers = Sprite_Animation.prototype.initMembers
    Sprite_Animation.prototype.initMembers = function() {
        _Sprite_Animation_prototype_initMembers.call(this)
        this._bitmaps = {}
        this._animation2 = false
    };

    Sprite_Animation.prototype.isAnimation2 = function() {
        return this._animation2;
    };

    Sprite_Animation.prototype.loadBitmaps = function() {
        var name1 = this._animation.animation1Name;

        if (name1 == "kongbai") {
            this._animation2 = true
            this._bitmaps = {}
            var name2 = this._animation.animation2Name;
            var hue1 = this._animation.animation1Hue;
            var hue2 = this._animation.animation2Hue;
            if (name2) {
                var basename = name2.split("_")[0]
                var frames = this._animation.frames
                for (var i = 0; i < frames.length; i++) {
                    var frame = frames[i]
                    for (var i2 = 0; i2 < frame.length; i2++) {
                        var c = frame[i2]
                        var p = c[0]
                        if (p >= 0) {
                            this._bitmaps[p] = ImageManager.loadAnimation(basename + "_" + p, hue2);
                        }
                    }
                }
            }
        } else {
            this._animation2 = false
            var name2 = this._animation.animation2Name;
            var hue1 = this._animation.animation1Hue;
            var hue2 = this._animation.animation2Hue;
            this._bitmap1 = ImageManager.loadAnimation(name1, hue1);
            this._bitmap2 = ImageManager.loadAnimation(name2, hue2);
        }
    }

    /**是准备好 */
    Sprite_Animation.prototype.isReady = function() {
        if (this.isAnimation2()) {
            var v = true
            for (var i in this._bitmaps) {
                v = v && this._bitmaps[i].isReady()
            }
            return v
        } else {
            return this._bitmap1 && this._bitmap1.isReady() && this._bitmap2 && this._bitmap2.isReady();
        }
    };




    /**更新单元精灵 */
    Sprite_Animation.prototype.updateCellSprite = function(sprite, cell) {

        var pattern = cell[0];
        if (pattern >= 0) {

            if (this.isAnimation2()) {
                sprite.bitmap = this._bitmaps[pattern] || new Bitmap();
            } else {
                var sx = pattern % 5 * 192;
                var sy = Math.floor(pattern % 100 / 5) * 192;
                sprite.bitmap = pattern < 100 ? this._bitmap1 : this._bitmap2;
                sprite.setFrame(sx, sy, 192, 192);
            }
            var mirror = this._mirror;
            sprite.x = cell[1];
            sprite.y = cell[2];

            sprite.rotation = cell[4] * Math.PI / 180;
            sprite.scale.x = cell[3] / 100;
            if (cell[5]) {
                sprite.scale.x *= -1;
            }
            if (mirror) {
                sprite.x *= -1;
                sprite.rotation *= -1;
                sprite.scale.x *= -1;
            }
            sprite.scale.y = cell[3] / 100;
            sprite.opacity = cell[6];
            sprite.blendMode = cell[7];
            sprite.visible = true;
        } else {
            sprite.visible = false;
        }
    }
})()