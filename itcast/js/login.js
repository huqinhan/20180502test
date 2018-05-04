/**
 * Created by ZHR on 2018/1/29.
 */
$(document).ready(function(){
    $(".btn-primary").on("click",function(){
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            type: "get",
            url: "http://172.16.0.97/zeus/user/login?",
//                url: "http://172.16.0.97/zeus/corp/create?corp="+jsonBook,
            dataType: "json",
            data:{
                username:username,
                password:password
            },
            success: function(msg){
                console.log(msg);
//                    code=0账号密码错误
                if(msg.code =="0" ){
                    window.localStorage.roleId=msg.data.role;
                    window.location.href="search.html";
                }else{
                    alert(msg.message)
                }
            },
            error: function (msg){
                alert(msg);
            }
        });
    });
});