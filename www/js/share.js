var qApiSrc={
       lower:"http://3gimg.qq.com/html5/js/qb.js",
       higher:"http://jsapi.qq.com/get?api=app.share"
    },
    bLevel={
       qq:{
           forbid:0,
           lower:1,
           higher:2
       },
        uc:{
            forbid:0,
            allow:1
        }
    },
    isqqBrowser=(navigator.appVersion.split("MQQBrowser/").length>1)?bLevel.qq.higher:bLevel.qq.forbid,
    isucBrowser=(navigator.appVersion.split("UCBrowser/").length>1)?bLevel.uc.allow:bLevel.uc.forbid,
    version={uc:"",qq:""},
    platform_os,
    userConfig={uId:"",userface:"",usernick:"",isLogin:false},
    shareBasePath="http://mjs.sinaimg.cn/wap/module/share/201501261608/",
    localhref=window.location.href,
    cur_domain=localhref.split("//")[1].split("/")[0];
window.ishare=true;
if(typeof(__userConfig__)=="undefined"||!window.__userConfig__){
    window.__userConfig__={__uid:"",__unick:"",__uface:"",__isLogin:false}
}
if(typeof(readConfig)=="undefined"||!window.readConfig){
    window.readConfig={
        isArt:true,
        share:{
            sharenum:0,
            hotnum:10000,
            imgsrc:"",
            imgid:"j_ishare_pic",
            shorttitle:"",
            content:"",
            targeturl:"http://interface.sina.cn/wap_api/share_to_weibo.d.json",
            shareurl:localhref,
            isdoc:0
        },
        comment:{
            num:0,
            golinks:""
        },
        originpic:""
    }
}
function MyShareClass(){
    var W={login:0,platlist:1,share:2,fade:3},
        G={
            sweibo:["SinaWeibo","新浪微博"],
            friend:["WechatFriends","微信好友"],
            fsircle:["WechatTimeline","微信朋友圈"]
        },
        D={
            voteNum:0,
            voteStatus:false,
            favorStatus:false
        },
        q={
            isInit:false,
            isAdd:true
        },
        L={
            contentRows:[4,6],
            contentMax:88,
            basePath:shareBasePath,
            cssPath:shareBasePath+"css/addShare.min.css",
            userInfoUrl:"http://interface.sina.cn/wap_api/wap_get_user_info.d.api?jsoncallback=",
            animate:["platformShow","sinaShow"],
            headimgsrc:"images/headimg.png",
            shareimgsrc:"http://u1.sinaimg.cn/upload/2014/12/08/101778.png"
        },
        K={
            iTitle:"",
            iContent:"",
            iImgsrc:"",
            iUrl:"",
            iBackurl:"",
            isdoc:0
        },
        t={
            findClass:{
                shareIcon:"j_splat_ico",
                shareContentZone:"j_icontent",
                shareBtn:"j_shareBtn",
                platforms_big:"j_platforms_big",
                sinaShareContent:"j_sinaShareContent",
                praiseBtn:"j_vote_btn",
                submitBtn:"j_isunbmit",
                addFavor:"j_iadd_btn",
                sinaInfo:"sinaInfo",
                forbid:"forbid",
                opPraise:"op_praise "
            },
            findId:{
                sharefloat:"j_sharebox",
                floatCross:"j_sharecross",
                shareContentid:"j_ishare_content",
                sharetitle:"j_shareTitle",
                sharecnum:"j_ishare_num",
                spicid:"j_ishare_pic",
                userInfo:"j_sinaInfo",
                userName:"j_user_name",
                userImg:"j_user_img",
                shareImg:"j_ishare_img",
                insertDom:["j_com_pics_op","j_com_art_op"]
            }
        },
        Y={
            iweibo:"kSinaWeibo",
            ifriend:"kWeixin",
            ifcircle:"kWeixinFriend",
            asweibo:"SinaWeibo",
            afriend:"WechatFriends",
            afcircle:"WechatTimeline"
        },
        e,
        h=this,
        a=(typeof(WapLogin)=="function")?(new WapLogin()):this;
    personal_url="http://my.sina.cn/?vt=4",
    _fromPlat={qqfriend:"qqfriend",qqweichat:"qqweichat",ucfriend:"ucfriend",ucweichat:"ucweichat"},
    _frompre=readConfig.share.shareurl.indexOf("?")>=0?"&":"?";
    function i(ac,af,ad,Z,aa){
        if(isucBrowser){
            var ab={
                getTop:function(ai){
                    var aj=ai.offsetTop;
                    if(ai.offsetParent!=null){
                        aj+=ab.getTop(ai.offsetParent)
                    }
                    return aj
                },
                getLeft:function(ai){
                    var aj=ai.offsetLeft;
                    if(ai.offsetParent!=null){
                        aj+=ab.getLeft(ai.offsetParent)
                    }
                    return aj
                },
                getCss3offsetTop:function(ak){
                    var ai=getComputedStyle(ak,null).webkitTransform;
                    if(ai=="none"){
                        var aj=0
                    }
                    else{
                        var aj=parseInt(ai.split(",")[5].replace(")",""))
                    }
                    if(ak.parentNode.tagName!="BODY"){
                        aj+=ab.getCss3offsetTop(ak.parentNode)
                    }
                    return aj
                },
                getCss3offsetLeft:function(ak){
                    var aj=getComputedStyle(ak,null).webkitTransform;
                    if(aj=="none"){
                        var ai=0
                    }
                    else{
                        var ai=parseInt(aj.split(",")[4])
                    }
                    if(ak.parentNode.tagName!="BODY"){
                        ai+=ab.getCss3offsetLeft(ak.parentNode)
                    }
                    return ai
                },
                getNodeInfoById:function(aj){
                    var ai=document.getElementById(aj);
                    if(ai){
                        var ak=[ab.getLeft(ai)+ab.getCss3offsetLeft(ai),ab.getTop(ai)+ab.getCss3offsetTop(ai),ai.offsetWidth,ai.offsetHeight];
                        return(ak)
                    }
                    else{return""}
                }
            };
            if(typeof(ucweb)!="undefined"){
                var ag=ucweb.startRequest("shell.page_share",[af,ad,Z,aa,"","我们正在看【"+af+"】，一起来看吧",ab.getNodeInfoById(ac)])
            }
            else{
                if(typeof(ucbrowser)!="undefined"){
                    if(aa==G.sweibo[0]){
                        aa=Y.iweibo
                    }
                    else{
                        if(aa==G.friend[0]){
                            aa=Y.ifriend;
                            Z+=_frompre+"from="+_fromPlat.ucfriend
                        }
                        else{
                            if(aa==G.fsircle[0]){
                                aa=Y.ifcircle;
                                Z+=_frompre+"from="+_fromPlat.ucweichat
                            }
                        }
                    }
                    ucbrowser.web_share(af,ad,Z,aa,"","@手机新浪网",ac)
                }
                else{

                }
            }
        }
        else{
            if(isqqBrowser){
                if(aa==G.friend[0]){
                    aa=1;
                    Z+=_frompre+"from="+_fromPlat.qqfriend
                }
                else{
                    if(aa==G.fsircle[0]){
                        aa=8;
                        Z+=_frompre+"from="+_fromPlat.qqweichat
                    }
                    else{
                        aa=""
                    }
                }
                var ae={
                    url:Z,
                    title:af,
                    description:ad,
                    img_url:K.iImgsrc,
                    img_title:af,
                    to_app:aa,
                    cus_txt:"请输入此时此刻想要分享的内容"
                },
                    ah=-1;
                if(typeof(browser)!="undefined"){
                    if(typeof(browser.app)!="undefined"&&isqqBrowser==bLevel.qq.higher){
                        ah=browser.app.share(ae)
                    }
                }
                else{
                    if(typeof(window.qb)!="undefined"&&isqqBrowser==bLevel.qq.lower){
                        window.qb.share(ae)
                    }
                    else{

                    }
                }
            }
            else{

            }
        }
        l(W.fade);
        return
    }
    this.login=function(Z,ad,aa,ab){
        var ac=arguments.length;
        if(window.SINA_OUTLOGIN_LAYER&&!Z){
            e=window.SINA_OUTLOGIN_LAYER;
            e.set("sso",{entry:"wapsso"}).init();
            e.show();
            e.register("login_success",function(ae)
                {
                    h.updateUserInfo(ae);
                    switch(ac){
                        case 2:ad();break;
                        case 3:ad(aa);break;
                        case 4:ad(aa,ab);break;
                        default:window.location.href=window.location.href;break
                    }
                });
            e.register("layer_hide",function(){
                if(typeof(ad)!="undefined"){
                    ad=null
                }
            })
        }
        return
    };
    this.updateUserInfo=function(Z){
        if(!window.__userConfig__||typeof(__userConfig__)!="undefined"){
            window.__userConfig__={}
        }
        __userConfig__.__isLogin=true;
        __userConfig__.__unick=Z.nick;
        __userConfig__.__uface=Z.portrait;
        if(!window.globalConfig||typeof(globalConfig)!="undefined"){
            globalConfig={}
        }
        globalConfig.isLogin=true;
        if($("#loginImg").find("img").length>0){
            $("#loginImg").find("img").attr("src",portrait)
        }
        return
    };
    function M(){
        var aa=readConfig.share.targeturl,Z="";
        if(!!aa==false){
            return false
        }
        Z=aa+"?title="+K.iTitle+"&content="+K.iContent+"&pic="+K.iImgsrc+"&url="+K.iUrl+"&isdoc="+K.isdoc;
        if(aa.indexOf("?")==-1){
            aa=aa+"?"
        }
        $.ajax({
            url:Z,
            async:false,
            type:"post",
            dataType:"jsonp",
            success:function(ab){

            },
            error:function(ac,ab){

            }
        });
        l(W.fade);
        return
    }
    window.shareCallback=function(aa){
        var Z="";
        switch(aa.code){
            case -3:Z="分享失败!";break;
            case -2:Z="未登录!";break;
            case -1:Z="请求非法！";break;
            case 1:Z="分享成功！";break;
            default:Z="未知状态码 "+aa.code;break
        }
        X(Z,true);
        v("public_sinashare_success")
    };
    var C=null;
    function r(){
        var Z=[];
        if($(".re_box").length<1){
            Z.push("<section>");
            Z.push('<div class="re_box">');
            Z.push('<div class="resault_f re_simple">收藏失败!</div>');
            Z.push('<div class="resault_f re_notice">');
            Z.push("<div>");
            Z.push("<p>您已收藏，请到个人中心查看</p>");
            Z.push("</div>");
            Z.push('<span class="re_cancel">知道了</span>');
            Z.push('<span class="re_ok" data-url="'+personal_url+'">去看看</span>');
            Z.push("</div>");
            Z.push("</div>");
            Z.push("</section>");$("body").append(Z.join(""));
            s()
        }
        return
    }
    function X(aa,Z){
        if($(".re_box").length<=0){
            r()
        }
        if(C){
            clearTimeout(C)
        }
        if($(".resault_f").eq(0).hasClass("showFadeAnimate")){
            $(".resault_f").eq(0).html("").hide().removeClass("showFadeAnimate")
        }
        if($(".resault_f").eq(1).hasClass("showAnimate")){
            $(".resault_f").eq(1).find("p").html("");
            $(".resault_f").eq(1).hide().removeClass("showAnimate")
        }
        if(typeof(Z)=="undefined"){
            return
        }
        else{
            if(Z){
                $(".resault_f").eq(0).show().html(aa).addClass("showFadeAnimate");
                C=setTimeout(function(){$(".resault_f").eq(0).html("").hide().removeClass("showFadeAnimate")},5000)
            }
            else{
                if(!Z){
                    $(".resault_f").eq(1).show().addClass("showAnimate").find("p").html(aa)
                }
            }
        }
    }
    function s(){
        $(".re_cancel").each(
            function(){
                $(this).on("click",function(){
                    X()
                })
            });
        $(".re_ok").each(
            function(){
                $(this).on("click",function(){
                    X();
                    window.location.href=$(this).data("url")
                })
            })
    }
    function d(){
        var Z=[],aa=1,ac=[],ab=[];
        readConfig.comment.num=window.commentnum||readConfig.comment.num;
        ac.push(readConfig.comment.golinks?readConfig.comment.golinks:"javascript:void(0)");
        ac.push(readConfig.comment.num>10000?(parseInt(readConfig.comment.num/10000)+"万"):readConfig.comment.num);
        ab.push(readConfig.originpic?readConfig.originpic:"javascript:void(0)");
        if(readConfig.isArt){
            aa=1;
            if(isqqBrowser||isucBrowser){
                Z.push('<div class="platforms_small">');
                Z.push("<ul>");
                Z.push('<li class="shareText"> 分享</li>');
                Z.push("<li>");
                Z.push("<ul>");
                Z.push("<li></li>");
                Z.push('<li><span class="'+t.findClass.shareIcon+' splat_ico sina_samll" data-platform="'+G.sweibo[0]+'"  data-sudaclick="public_sinaweibo"></span></li>');
                Z.push('<li><span class="'+t.findClass.shareIcon+' splat_ico friend_small" data-platform="'+G.friend[0]+'"  data-sudaclick="public_wechatfriends"></span></li>');
                Z.push('<li><span class="'+t.findClass.shareIcon+' splat_ico fcircle_small" data-platform="'+G.fsircle[0]+'"  data-sudaclick="public_wechattimeline"></span></li>');
                Z.push("<li></li>");Z.push("</ul>");Z.push("</li>");
                Z.push("</ul>");
                Z.push("</div>");
                Z.push('<div class="share_op">');
                Z.push("<ul>")
            }
            else{
                Z.push('<div class="share_op">');
                Z.push("<ul>");
                Z.push('<li><span class="share_ico art_share '+t.findClass.shareBtn+'">分享</span></li>')
            }
            Z.push('<li><a href="'+ac[0]+'" class="share_ico art_comment" data-sudaclick="public_comment">'+ac[1]+"</a></li>");
            Z.push('<li><a class="share_ico op_praise art_praise" data-sudaclick="public_praise">赞</a></li>');
            Z.push('<li class="favor"><a class="share_ico art_collect '+t.findClass.addFavor+'" href="javascript:void(0);"  data-sudaclick="public_favor">收藏</a></li>');
            Z.push("</ul>");
            Z.push("</div>")
        }else{
            aa=0;Z.push("<ul >");
            Z.push('<li><a id="weibo_share" href="javascript:void(0);" class="share_ico pic_share '+t.findClass.shareBtn+'" data-sudaclick="picShare">分享</a></li>');
            Z.push('<li><a id="comment" href="'+ac[0]+'" class="share_ico pic_comment " data-sudaclick="public_comment">'+ac[1]+"</a></li>");
            Z.push('<li><a id="updown" href="javascript:void(0);" class="share_ico op_praise pic_praise" data-sudaclick="public_praise">赞</a></li>');
            Z.push('<li><a id="down" href="'+ab[0]+'" class="share_ico pic_original" target="_blank" data-sudaclick="public_origin">原图</a></li>');
            Z.push("</ul>")
        }
        $("#"+t.findId.insertDom[aa]).append(Z.join(""));
        console.log(t.findId.insertDom[aa]);
        return
    }
    function p(aa){
        var ab=document.getElementsByTagName("head")[0],
            Z=document.createElement("script");
        Z.src=aa;
        Z.charset="utf-8";
        ab.appendChild(Z)
    }
    function S(){
        if(typeof __pkeys!="undefined"&&typeof __pValue!="undefined"){
            var ab="http://data.api.sina.cn/api/count/count.php?act=",
                ac=__domainUrl||localhref.split("?")[0]||"",
                ae="&backurl="+ac+"&ch="+cur_domain+"&type=1&pkey="+__pkeys+"&p="+__pValue+"&channel="+__domain+"&jsonpcallback=",
                aa=ab+"show"+ae+"getPraise",Z=ab+"add"+ae+"addPraise",
                ad=$("."+t.findClass.opPraise);
            if(ad.length>0){
                ad.data("url",aa).data("status",0);
                p(aa)
            }
            ad.each(function(){
                $(this).on("click tap",function(){
                    X();
                    var af=$(this);
                    if(af.hasClass("on")||af.data("loading")=="yes"){
                        return
                    }
                    else{
                        $(this).data("url",Z).data("status",1);
                        p(Z)
                    }
                })
            })
        }
    }
    window.getPraise=function(aa){
        var Z=aa.count>0?(aa.count>10000?(parseInt(aa.count/10000)+"万"):aa.count):"赞";$("."+t.findClass.opPraise).html(Z).data("loading","no");
        D.voteNum=aa.count
    };
    window.addPraise=function(Z){
        if(Z.status==0){
            $("."+t.findClass.opPraise).each(
                function(){
                    if($("."+t.findClass.opPraise).data("loading")=="no"){
                        var aa=Z.count>0?(Z.count>10000?(parseInt(Z.count/10000)+"万"):Z.count):"赞";$("."+t.findClass.opPraise).text(aa).addClass("on");
                        D.voteNum=Z.count
                    }
                })
        }
        else{

        }
    };
    function Q(){
        $("."+t.findClass.addFavor).each(function(){
            A($(this),q.isInit);
            $(this).on("click tap",function(){
                X();
                A($(this),q.isAdd)
            })
        })
    }
    function A(af,Z){
        var ac=sudaMapConfig.uid||"",
            aa=__docid||"",
            ae=__domainUrl||localhref.split("?")[0]||"",
            ag="",
            Z=(typeof(Z)!="undefined")?(Z?q.isAdd:q.isInit):q.isAdd;
        if(__userConfig__.__isLogin){
            if(af.hasClass("on")){
                if(Z&&q.isAdd){
                    var ad="您已收藏，请到个人中心查看";
                    X(ad,false)
                }
                return
            }
            if(!Z&&!q.isInit){
                ag="&op=isFav&jsoncallback=initFavorCallback"
            }
            else{
                ag="&jsoncallback=addFavorCallback"
            }
            var ab="http://o.my.sina.cn/favorite?uid="+ac+"&docid="+aa+"&backurl="+ae+"&ch="+cur_domain+"&csrftime="+__colleid+"&csrfcode="+__collekey+"&channel="+__domain+ag;p(ab)
        }
        else{
            if(Z&&q.isAdd){
                l(W.login,A,af,true)
            }
        }
    }
    window.addFavorCallback=function(aa){
        var ab=$("."+t.findClass.addFavor).eq(0);ab.data("loading","no");
        if(aa&&aa.code==1){
            ab.addClass("on");
            ab.addClass("on").html("已收藏");var Z="您已收藏，请到个人中心查看";
            X(Z,false)
        }
        else{
            if(aa&&aa.code==2){
                document.location.href=aa.data
            }
            else{
                var Z="收藏失败!";
                X(Z,true)
            }
        }
    };
    window.initFavorCallback=function(Z){
        var aa=$("."+t.findClass.addFavor).eq(0);
        if(Z&&Z.code==1&&Z.data.id){
            aa.addClass("on").html("已收藏")
        }
    };
    function H(){
        var Z=[],
            aa=[],
            ab=[];
        ab.push((L.contentMax-readConfig.share.content.length<0)?"notice":"");
        ab.push(L.contentMax-readConfig.share.content.length);
        if(typeof(__userConfig__)!="undefined"){
            if(typeof(__userConfig__.__uface)!="undefined"&&typeof(__userConfig__.__unick)!="undefined"){
                aa.push(__userConfig__.__uface?__userConfig__.__uface:L.basePath+L.headimgsrc);
                aa.push(__userConfig__.__unick?__userConfig__.__unick:"新浪用户")
            }
            else{
                aa.push(L.basePath+L.headimgsrc);
                aa.push("新浪用户")
            }
        }
        else{
            aa.push(L.basePath+L.headimgsrc);
            aa.push("新浪用户")
        }
        Z.push("<section>");
        Z.push('<div class="shareBg" id="'+t.findId.sharefloat+'">');
        Z.push('<div class="sharebox">');
        Z.push('<div class="float_cross fTitle" id="'+t.findId.floatCross+'" data-sudaclick="public_share_close"></div>');
        Z.push('<div class="shareTitle fTitle" id="'+t.findId.sharetitle+'">分享至微博</div>');
        Z.push('<div class="shareZone">');
        Z.push('<div class="platforms_big '+t.findClass.platforms_big+'">');
        Z.push("<ul>");
        Z.push("<li>");
        Z.push('<span class="'+t.findClass.shareIcon+' splat_ico sina_big" data-platform="'+G.sweibo[0]+'" data-sudaclick="public_sinaweibo"></span>');
        Z.push("<p>"+G.sweibo[1]+"</p>");Z.push("</li>");
        Z.push("<li>");
        Z.push('<span class="'+t.findClass.shareIcon+' splat_ico friend_big" data-platform="'+G.friend[0]+'" data-sudaclick="public_wechatfriends"></span>');
        Z.push("<p>"+G.friend[1]+"</p>");
        Z.push("</li>");
        Z.push("<li>");
        Z.push('<span class="'+t.findClass.shareIcon+' splat_ico fcircle_big" data-platform="'+G.fsircle[0]+'" data-sudaclick="public_wechattimeline"></span>');
        Z.push("<p>"+G.fsircle[1]+"</p>");
        Z.push("</li>");
        Z.push("</ul>");
        Z.push("</div>");
        Z.push('<div class="sinaShareContent '+t.findClass.sinaShareContent+'">');
        Z.push('<div class="sinaInfo" id="'+t.findId.userInfo+'">');
        Z.push('<span class="user_img" id="'+t.findId.userImg+'">');
        Z.push('<img src="'+aa[0]+'"  style="width:100%;height:100%;"/>‘');
        Z.push("</span>");
        Z.push('<span class="user_name" id="'+t.findId.userName+'">'+aa[1]+"</span>");
        Z.push("</div>");
        Z.push('<div class="icontent '+t.findClass.shareContentZone+'">');
        Z.push('<textarea class="ishare_content" id="'+t.findId.shareContentid+'">'+(readConfig.share.content?readConfig.share.content:readConfig.share.shorttitle)+"</textarea>");
        Z.push('<span class="ishare_img">');
        Z.push('<img class="shareimg_style" src="'+(readConfig.share.imgsrc?readConfig.share.imgsrc:L.shareimgsrc)+'" id="'+t.findId.shareImg+'" style="width:32px;height:32px"/>');
        Z.push("</span>");
        Z.push('<span class="ishare_num"><span class="  '+ab[0]+'" id="'+t.findId.sharecnum+'">'+ab[1]+"</span>字</span>");
        Z.push("</div>");
        Z.push('<button class="isubmit '+t.findClass.submitBtn+'" data-sudaclick="public_sinashare_submit">立即分享</button>');
        Z.push("</div>");
        Z.push("</div>");
        Z.push("</div>");
        Z.push("</div>");
        Z.push("</section>");$("body").append(Z.join(""));
        V();
        return
    }
    function V(){
        w();
        x(true);
        n();
        $(".shareBg").css("height",(o+50)+"px");
        $("."+t.findClass.shareIcon).each(function(){
            $(this).click(function(){

            })
        })
    }
    function U(){
        if(document.all){
            return window.event
        }
        func=U.caller;
        while(func!=null){
            var Z=func.arguments[0];
            if(Z){
                if((Z.constructor==Event||Z.constructor==MouseEvent)||(typeof(Z)=="object"&&Z.preventDefault&&Z.stopPropagation)){
                    return Z
                }
            }
            func=func.caller
        }
        return null
    }
    this.wantShare=function(Z){
        if(Z){
            T()
        }
        if($(".shareBg").length<=0){
            H()
        }
        X();
        if(isqqBrowser>bLevel.qq.lower||isucBrowser){
            l(W.platlist)
        }
        else{
            z()
        }
    };
    function b(){
        window.addEventListener("click",function(ab){
            var ad=ab.target||U().target,ac=T($(ad));
            if(($(ad).hasClass(t.findClass.shareBtn)||$(ad).parents(".j_share_btn").length>0||$(ad).parents("."+t.findClass.shareBtn).length>0)&&window.ishare){
                I(ab);
                h.wantShare()
            }
            else{
                if($(ad).hasClass(t.findClass.shareIcon)){
                    if($(".shareBg").length<=0){
                        H()
                    }
                    X();
                    if(ac._platform==G.sweibo[0]){
                        z()
                    }
                    else{
                        if(isucBrowser){
                            $("#j_comment_nav").hide();
                            setTimeout(function(){
                                i(ac._obj,ac._title,ac._content,localhref,ac._platform)
                            },300);
                            setTimeout(function(){
                                $("#j_comment_nav").show()
                            },600)
                        }
                        else{
                            i(ac._obj,ac._title,ac._content,localhref,ac._platform)
                        }
                    }
                }
            }
            var aa=$("#ST_outLogin_mask"),
                Z=$("#j_sharebox");
            if(aa.length>0&&Z.length>0&&Z.css("display")!="none"){
                if(aa.css("display")!="none"){
                    N(true)
                }
                else{
                    if(aa.css("display")=="none"){
                        N(false)
                    }
                }
            }
        })
    }
    function N(Z){
        if(Z){
            $("#j_sharecross").hide()
        }
        else{
            $("#j_sharecross").show()
        }
    }
    function T(Z){
        var aa={
            _obj:t.findId.spicid,
            _title:readConfig.share.shorttitle?readConfig.share.shorttitle:$("title").html(),
            _content:readConfig.share.content?readConfig.share.content:$("title").html(),
            _url:readConfig.share.shareurl,
            _platform:Z?Z.data("platform"):""
        };
        K.iTitle=aa._title;
        K.iContent=aa._content;
        K.iImgsrc=readConfig.share.imgsrc?readConfig.share.imgsrc:($("#"+aa._obj).attr("src")?$("#"+aa._obj).attr("src"):L.shareimgsrc);
        K.iUrl=aa._url;
        K.iBackurl=aa._url;
        K.isdoc=readConfig.share.isdoc?readConfig.share.isdoc:0;
        return aa
    }
    function z(){
        var Z=L.contentMax-K.iContent.length;
        $("#"+t.findId.shareContentid).text(K.iContent);
        $("#"+t.findId.sharecnum).html(Z);
        if(Z<0){
            $("#"+t.findId.sharecnum).addClass("notice");
            $("."+t.findClass.submitBtn).addClass(t.findClass.forbid)
        }
        else{
            $("#"+t.findId.sharecnum).removeClass("notice");
            $("."+t.findClass.submitBtn).removeClass(t.findClass.forbid)
        }
        $("#"+t.findId.shareImg).attr("src",K.iImgsrc);
        l(W.share)
    }
    function w(){
        $("#"+t.findId.floatCross).on("click ",function(){
            l(W.fade)
        });
        return
    }
    var O="",
        o=document.documentElement.clientHeight;
    function x(af){
        var ag=$("."+t.findClass.sinaShareContent),
            aa=$("."+t.findClass.shareContentZone),
            ab=$("#"+t.findId.shareContentid),
            ac=$("."+t.findClass.sinaInfo),
            ae=$("#"+t.findId.sharefloat),
            ad=$("#"+t.findId.sharecnum),
            ah=$("."+t.findClass.submitBtn);
        var Z=function(){
            if(ag.css("display")=="block"){
                var aj=document.getElementById(t.findId.shareContentid).value,
                    ai=L.contentMax-aj.length;
                ad.html(ai);
                if(ai<0||ai==L.contentMax){
                    ad.addClass("notice");
                    ah.addClass(t.findClass.forbid)
                }
                else{
                    ad.removeClass("notice");
                    ah.removeClass(t.findClass.forbid)
                }
                K.iContent=aj
            }
        };
        if(!af){
            aa.css({height:"140px"});
            ab.attr("rows",L.contentRows[1])
        }
        else{
            $("#"+t.findId.shareContentid).on("click tap",function(){
                var ai=ab.html();
                X();
                ab.focus()
            }).on("keyup",Z).focus(function(){
                    aa.css({height:"85px"});
                    $(this).attr("rows",L.contentRows[0]);
                    $(".sharebox").css({"margin-top":"40px"});
                    $(".shareBg").css("height",(o+50)+"px")}).blur(function(){
                        $(this).attr("rows",L.contentRows[1]);
                        $(".sharebox").css({"margin-top":"10px"});
                        $(".shareBg").css("height",(o+10)+"px")
                    });
                document.addEventListener("touchend",Z,false)
            }
        return
    }
    function n(){
        $("."+t.findClass.submitBtn).each(function(){
            $(this).on("click",function(){
                X();
                if(!$(this).hasClass(t.findClass.forbid)){
                    M()
                }
            })
        });
        return
    }
    var B=function(Z){
        Z.preventDefault()
    };
    function u(Z){
        var aa=document.body;
        if(Z){
            $(document.body).css({overflow:"hidden",position:"absolute",top:"0px"})
        }
        else{
            $(document.body).css({overflow:"auto",position:"relative"})
        }
        return
    }
    var J=document.body.scrollTop,
        E=document.getElementsByName("viewport")[0],
        k={hide:"width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui",
            show:"width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        },
        c=false;
    function l(aa,ab,Z){
        aa=aa?aa:W.login;
        switch(aa){
            case W.login:F(ab,Z);break;
            case W.platlist:if(!c){
                    J=document.body.scrollTop
                }
                E.content=k.hide;
                setTimeout(function(){
                    window.scrollTo(0,1)
                },200);
                c=true;
                f(true);
                m(t.findId.sharefloat,true);
                y(t.findId.floatCross,true);
                y(t.findId.sharetitle,false);
                P("."+t.findClass.platforms_big,true,W.platlist);
                P("."+t.findClass.sinaShareContent,false,W.share);break;
            case W.share:if(__userConfig__.__isLogin){
                    if(!c){
                        J=document.body.scrollTop
                    }
                    E.content=k.hide;
                    setTimeout(function(){
                        window.scrollTo(0,1)
                    },200);
                    c=true;
                    f(true);
                    m(t.findId.sharefloat,true);
                    y(t.findId.floatCross,true);
                    y(t.findId.sharetitle,true);
                    R();
                    if($("#j_user_img").find("img").attr("src")==window.location.href||$("#j_user_img").find("img").attr("src")==""){
                        g()
                    }
                    P("."+t.findClass.platforms_big,false,W.platlist);
                    P("."+t.findClass.sinaShareContent,true,W.share);
                    v("public_sinaweibo")
                }
                else{
                    a.login(__userConfig__.__isLogin,l,W.share)
                }break;
            case W.fade:E.content=k.show;
                f(false);
                m(t.findId.sharefloat,false);
                y(t.findId.floatCross,true);
                P("."+t.findClass.platforms_big,false,W.platlist);
                P("."+t.findClass.sinaShareContent,false,W.share);
                x(false);
                A($("."+t.findClass.addFavor),false);
                if(c){document.body.scrollTop=J}
                c=false;break;
            default:break
        }
        return
    }
    function I(Z){
        if(Z&&Z.preventDefault){
            Z.preventDefault()
        }
        else{
            window.event.returnValue=false
        }
        return false
    }
    function f(aa){
        var ab=$(document.body),
            Z=ab.children();
        for(var ac=0;ac<Z.length;ac++){
            if(Z[ac].tagName!="SCRIPT"&&Z[ac].tagName!="NOSCRIPT"&&$(Z[ac]).find(".shareBg").length<=0){
                if(aa&&$(Z[ac]).css("display")!="none"){
                    $(Z[ac]).data("show","show");
                    $(Z[ac]).hide()
                }
                else{
                    if(!aa){
                        if($(Z[ac]).data("show")=="show"&&$(Z[ac]).css("display")=="none"){
                            $(Z[ac]).show()
                        }
                        else{
                            $(Z[ac]).data("show","")
                        }
                    }
                }
            }
        }
    }
    function R(){
        $("#"+t.findId.userImg).find("img").attr("src",__userConfig__.__uface);
        $("#"+t.findId.userName).html(__userConfig__.__unick)
    }
    function P(af,ae,aa){
        var ag=$(af),
            ab=(aa==W.platlist)?ag.find("li"):ag,
            Z=ae?1:0,
            ac=ae?L.animate[0]:"",
            ad=ae?"block":"none";
        if(ae){
            ag.css({opacity:0});
            setTimeout(function(){
                ag.css({opacity:Z})
            },250);
            ab.css({"-webkit-animation-name":ac,opacity:Z,display:ad});
            if(ab!=ag){
                ag.css({display:ad})
            }
        }
        else{
            ab.css({"-webkit-animation-name":ac,opacity:Z,display:ad});
            ag.css({opacity:Z,display:ad})
        }
        return
    }
    function m(ac,Z){
        var aa=$("#"+ac),
            ab=aa.css("display");
        if(ab=="none"&&Z){
            aa.show(3000)
        }
        else{
            if(ab!="none"&&!Z){
                aa.hide("fast")
            }
        }
        return
    }
    function y(aa,Z){
        if(!Z){
            $("#"+aa).hide()
        }
        else{
            $("#"+aa).show()
        }
        return
    }
    function F(aa,Z){
        m(t.findId.sharefloat,false);
        if(typeof(aa)!="undefined"&&typeof(Z)!="undefined"){
            a.login(__userConfig__.__isLogin,aa,Z)
        }
        else{
            if(typeof(aa)!="undefined"){
                a.login(__userConfig__.__isLogin,aa)
            }
            else{
                a.login(__userConfig__.__isLogin)
            }
        }
    }
    function g(){
        var Z=L.userInfoUrl+"userCallback";
        p(Z);
        return
    }
    window.userCallback=function(Z){
        __userConfig__.__uface=Z.result.data.userface;
        __userConfig__.__unick=Z.result.data.uname;
        $("#"+t.findId.userImg).find("img").attr("src",__userConfig__.__uface);
        $("#"+t.findId.userName).html(__userConfig__.__unick);
        return
    };
    function v(Z){
        var aa={name:Z};
        if(typeof(window.suds_count)=="function"||window.suds_count){
            window.suds_count&&window.suds_count(aa)
        }
    }
    function j(){
        $("head").append('<link rel="stylesheet" type="text/css" href="'+L.cssPath+'"></link>');
        d();
        return
    }
    this.init=function(){
        if(typeof(window.__userConfig__)=="undefined"||!window.__userConfig__){
            window.__userConfig__={__uid:"",__unick:"",__uface:"",__isLogin:false}
        }
        j();
        setTimeout(function(){
            b();
            S();
            Q()
        },200);
        return
    };
    return
}
function isloadqqApi(){
    var c=new MyShareClass();
    if(isqqBrowser){
        var b=(version.qq<5.4)?qApiSrc.lower:qApiSrc.higher,
            d=document.createElement("script"),
            a=document.getElementsByTagName("body")[0];
        d.onload=function(){
            c.init()
        };
        d.setAttribute("src",b);
        a.appendChild(d)
    }
    else{
        c.init()
    }
    return
}
function getPlantform(){
    ua=navigator.userAgent;
    if((ua.indexOf("iPhone")>-1||ua.indexOf("iPod")>-1)){
        return"iPhone"
    }
    return"Android"
}
function getVersion(c){
    var a=c.split("."),
        b=parseFloat(a[0]+"."+a[1]);
    return b
}
function init(){
    platform_os=getPlantform();
    version.qq=isqqBrowser?getVersion(navigator.appVersion.split("MQQBrowser/")[1]):0;
    version.uc=isucBrowser?getVersion(navigator.appVersion.split("UCBrowser/")[1]):0;
    if((isqqBrowser&&version.qq<5.4&&platform_os=="iPhone")||(isqqBrowser&&version.qq<5.3&&platform_os=="Android")){
        isqqBrowser=bLevel.qq.forbid
    }
    else{
        if(isqqBrowser&&version.qq<5.4&&platform_os=="Android"){
            isqqBrowser=bLevel.qq.lower
        }
        else{
            if(isucBrowser&&((version.uc<10.2&&platform_os=="iPhone")||(version.uc<9.7&&platform_os=="Android"))){
                isucBrowser=bLevel.uc.forbid
            }
        }
    }
    isloadqqApi();
    return
}
setTimeout(function(){init()},300);