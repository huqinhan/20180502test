/**
 * Created by 李波-web on 2018/3/23.
 */

$(function () {
    var corpid = window.location.search.split("&")[0].split("=")[1];
    var type = window.location.search.split("&")[2].split("=")[1];
    var roleId = window.location.search.split("&")[1].split("=")[1]; //角色id 1是老师 0是学生

    $('.goBack').click(function () {
        window.location.href='./result-h.html?id='+corpid+'&roleId='+roleId+'&type='+type;
    });
    //上传图片
    $('.btn_pic').on("click",function(){
        var formData = new FormData();
        formData.append('files', $('#picture')[0].files[0]);
        console.log($('#picture')[0].files[0]);
        formData.append('corpId',corpid);
        $.ajax({
                type: "post",
                url: "http://172.16.0.97/zeus/upload/corpEnv",
                processData: false,
                contentType: false,
                data: formData,
                success: function(msg){
                    console.log(msg)
                    modal()
                },
                error:function(data){
                    console.log(data)
                }

            }
        );
    });

    //模态框
    function modal(){
        $(".modal").fadeIn();
        setTimeout(function(){
            $(".modal").fadeOut()
        },1000)
    }
})