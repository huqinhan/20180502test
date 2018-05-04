/**
 * Created by itcast on 2017/9/18.
 */


//单击页面放大

$(".l-mian").on("click","img",function(){
    $("#mask").css({"height":"100%",
        "width":"100%"
    }).show();
    // var cover = {
    //     "width":"50%",
    //     "height":"100%",
    //     "position":"absolute",
    //     "top":0,
    //     "left":"50%",
    //     "transform":"translate(-50%)",
    //     "z-index": "1002"
    // };
    $(this).addClass("cover")
        .siblings().animate({"width":0},500);
});

//隐藏遮罩层
$("#mask").click(function(){
    $(this).hide();
    $("img").removeClass("cover")
       .siblings().animate({"width":"20%"},2000);
});

$('.introduction li').eq(0).css({color:'red'});

$('.introduction li').on('click',function(){
    $('.introduction li').css({color:'#666'});
    $(this).css({color:'red'});
    $('.l-content').hide();
   var index=$(this).index()/2;
    $('.l-content').eq(index).show();
    
})

var id=window.location.search.split("&")[0].split("=")[1];
var type=window.location.search.split("&")[1].split("=")[1];
$.ajax({
    type: "get",
    url : "http://172.16.0.110/corp/info/"+id,
    dataType:"json",
    success: function(msg){
        var msg1 = {content:[msg]}
        $('.l-h2').html(msg.data.name)
        var html = template('introTem',msg1)
        $('.serach_details').html(html)
    },
    error: function (msg){
    }
});

//上传图片
$('.btn_pic').on("click",function(){
    picture();
})
var picture=function(){
    var data = new FormData();
    data.append('file', $('#picture')[0].files[0]);
    data.append('corpId',id);
    $.ajax({
            type: "post",
            url: "http://172.16.0.110/upload/file",
            processData: false,
            contentType: false,
            data: data,
            success: function(msg){
                testp(msg)
            }
        }
    );
}
var testp=function(msg){
    var url=msg.data.urls[0];
    $.ajax({
        type: "get",
        url: "http://172.16.0.110/interview/find/"+id+"/"+type,
        dataType: "json",
        success: function(omsg){
            upoad(omsg);
        },
        error: function (msg){
            alert(msg);
        }
    });

    var upoad=function(omsg){
        if(omsg.code=="0"){
            var oldimg= omsg.data.imgs;
            var tp=omsg.data.id
            var IMGS="";
            IMGS=IMGS+oldimg;
            IMGS=IMGS+";";
            IMGS=IMGS+url;
            var NIMGS=IMGS;
            var obj={
                "corpid": id,
                "imgs":NIMGS,
                "type": type,
                "id":tp
            };
            var otc=JSON.stringify(obj);
            $.ajax({
                    type: "post",
                    url: "http://172.16.0.110//interview/create ",
                    dataType: "json",
                    contentType:'application/json',
                    data: otc,
                    success: function(mosg){
                        alert("上传成功！");
                            }
                        }
                    );
        }else if(omsg.code=="-1"){
            var obj={
                "corpid":id,
                "imgs":url,
                "type":type
            };
            var otc=JSON.stringify(obj);
            $.ajax({
                    type: "post",
                    url: "http://172.16.0.110//interview/create ",
                    dataType: "json",
                    contentType:'application/json',
                    data: otc,
                    success: function(mosg){
                        alert("上传成功！");
                    },
                    error: function (mosg){
                        console.log(mosg);
                    }
                }
            );
        }else{
            console.log(omsg);
        }
    }
}

//图片上传结束

//录音上传开始
//
$('.btn_sud').on("click",function(){
    sound();
})

var sound=function(){
    var data = new FormData();
    data.append('file', $('#sound')[0].files[0]);
    data.append('corpId',id);
    $.ajax({
            type: "post",
            url: "http://172.16.0.110/upload/file",
            processData: false,
            contentType: false,
            data: data,
            success: function(msg){
                tests(msg);
            }
        }
    );
}
var tests=function(msg){
    var urls=msg.data.urls[0];
    console.log(urls);
    $.ajax({
        type: "get",
        url: "http://172.16.0.110/interview/find/"+id+"/"+type,
        dataType: "json",
        success: function(omsg){
            upoads(omsg);
        },
        error: function (msg){
            alert(msg);
        }
    });

    var upoads=function(omsg){
        if(omsg.code=="-1"){
            var objs={
                "corpid":id,
                "record":urls,
                "type":type
            };
            var otcs=JSON.stringify(objs);
            $.ajax({
                    type: "post",
                    url: "http://172.16.0.110//interview/create ",
                    dataType: "json",
                    contentType:'application/json',
                    data: otcs,
                    success: function(mosg){
                        alert("上传成功！");
                    },
                    error: function (mosg){
                        console.log(mosg);
                    }
                }
            );
        }else if(omsg.data.imgs&&omsg.data.record==null){
            var ts=omsg.data.id;
            var objs={
                "corpid":id,
                "record":urls,
                "type":type,
                "id":ts
            };
            var otcs=JSON.stringify(objs);
            console.log(otcs);
            $.ajax({
                    type: "post",
                    url: "http://172.16.0.110//interview/create ",
                    dataType: "json",
                    contentType:'application/json',
                    data: otcs,
                    success: function(mosg){
                        alert("上传成功！");
                    },
                    error: function (mosg){
                        console.log(mosg);
                    }
                }
            );

        }else if(omsg.data.record!=""){
            var oldsond= omsg.data.record;
            var ts=omsg.data.id;
            var SONDS="";
            SONDS=SONDS+oldsond;
            SONDS=SONDS+";";
            SONDS=SONDS+urls;
            var NSONDS=SONDS;
            var obj={
                "corpid": id,
                "record":NSONDS,
                "type": type,
                "id":ts
            };
            var otcs=JSON.stringify(obj);
            $.ajax({
                    type: "post",
                    url: "http://172.16.0.110//interview/create ",
                    dataType: "json",
                    contentType:'application/json',
                    data: otcs,
                    success: function(mosg){
                        alert("上传成功！");
                    }
                }
            );

        }else{
            console.log(omsg)
        }
    }
}
//录音上传结束