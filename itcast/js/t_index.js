/**
 * Created by 李波-web on 2018/3/17.
 */
$(function () {
    var corpid = window.location.search.split("&")[0].split("=")[1];
    var type = window.location.search.split("&")[2].split("=")[1];
    var id = window.localStorage.getItem('id');
    var roleId = window.location.search.split("&")[1].split("=")[1];
    var baseUrl = 'http://172.16.0.97/zeus/';


    $('.goBack').click(function () {
        window.location.href='./result-h.html?id='+corpid+'&roleId='+roleId+'&type='+type;
    });
    //上传图片
    $('.btn_pic').on("click",function(){
        var data = new FormData();
        data.append('files', $('#picture')[0].files[0]);
        data.append('corpId',corpid);
        $.ajax({
                type: "post",
                url: "http://172.16.0.97/zeus/upload/file",
                processData: false,
                contentType: false,
                data: data,
                success: function(msg){
                    testp(msg)
                }
            }
        );
    });
    var testp=function(msg){
        var url=msg.data.urls[0];
        $.ajax({
            type: "get",
            url:  "http://172.16.0.97/zeus/interview/find/"+corpid+"/"+type,
            dataType: "json",
            success: function(omsg){
                upoad(omsg);
            },
            error: function (msg){
                console.log(msg);
            }
        });
        var upoad=function(omsg){
            if(omsg.code=="0"){
                var oldimg = omsg.data.imgs;
                var tp = omsg.data.id;
                var IMGS = "";
                IMGS=IMGS+oldimg;
                 IMGS=IMGS+";";
                IMGS=IMGS+url;
                var NIMGS=IMGS;
                var obj={
                    "corpid": corpid,
                    "imgs":NIMGS,
                    "type": type,
                    "id":tp
                };
                var otc=JSON.stringify(obj);
                $.ajax({
                        type: "post",
                        url: "http://172.16.0.97/zeus/interview/create ",
                        dataType: "json",
                        contentType:'application/json',
                        data: otc,
                        success: function(mosg){
                            modal()
                        }
                    }
                );
            }else if(omsg.code=="-1"){
                var obj={
                    "corpid":corpid,
                    "imgs":url,
                    "type":type
                };
                var otc=JSON.stringify(obj);
                $.ajax({
                        type: "post",
                        url: "http://172.16.0.97/zeus/interview/create",
                        dataType: "json",
                        contentType:'application/json',
                        data: otc,
                        success: function(mosg){
                            modal();
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
    };

    //录音上传开始
    $('.btn_sud').on("click",function(){
        sound();
    });
    var sound=function(){

        var data = new FormData();
        data.append('files', $('#sound')[0].files[0]);
        data.append('corpId',corpid);

        $.ajax({
                type: "post",
                url: "http://172.16.0.97/zeus/upload/file",
                processData: false,
                contentType: false,
                data: data,
                success: function(msg){
                    tests(msg);
                }
            }
        );
    };
    var tests=function(msg){
        var urls=msg.data.urls[0];
        $.ajax({
            type: "get",
            url: baseUrl + "interview/find/" + corpid + "/" + type,
            dataType: "json",
            success: function(omsg){
                upoads(omsg);
            },
            error: function (msg){
                console.log(msg);
            }
        });

        var upoads=function(omsg){

            if(omsg.code=='-1'){
                var objs={
                    "corpid":corpid,
                    "record":urls,
                    "type":type
                };
                var otcs=JSON.stringify(objs);
                $.ajax({
                        type: "post",
                        url: "http://172.16.0.97:8080/zeus/interview/create ",
                        dataType: "json",
                        contentType:'application/json',
                        data: otcs,
                        success: function(mosg){
                            modal()

                        },
                        error: function (mosg){
                            console.log(mosg);
                        }
                    }
                );
            }else if(omsg.data.record==''){
                var ts=omsg.data.id;
                var objs={
                    "corpid":corpid,
                    "record":urls,
                    "type":type,
                    "id":ts
                };
                var otcs=JSON.stringify(objs);

                $.ajax({
                        type: "post",
                        url: "http://172.16.0.97:8080/zeus/interview/create ",
                        dataType: "json",
                        contentType:'application/json',
                        data: otcs,
                        success: function(mosg){
                            modal()
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
                    "corpid": corpid,
                    "record":NSONDS,
                    "type": type,
                    "id":ts
                };
                var otcs=JSON.stringify(obj);
                $.ajax({
                        type: "post",
                        url: "http://172.16.0.97:8080/zeus/interview/create",
                        dataType: "json",
                        contentType:'application/json',
                        data: otcs,
                        success: function(mosg){
                            modal()
                        }
                    }
                );

            }else{
                console.log(omsg)
            }
        }
    };
//录音上传结束

//上传薪资开始
    $('.btn_money').on("click",function() {
        var salary = $('.ifmt-form-input').val();
        if(!salary){alert('请输入薪资范围'); return;}
        var obj = {
            'id':id,
            'salary':salary
        };
        var otc=JSON.stringify(obj);
        $.ajax({
            type: "post",
            url: "http://172.16.0.97/zeus/interview/create ",
            dataType: "json",
            contentType: 'application/json',
            data: otc,
            success: function (mosg) {
                modal();
            }
        });
    });

    //模态框
    function modal(){
    $(".modal").fadeIn();
    setTimeout(function(){
        $(".modal").fadeOut()
    },1000)
    }
});


