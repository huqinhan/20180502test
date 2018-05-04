$(document).ready(function(){
    $(".ifmt-form-btn_sch").on("click",function(){
        window.location.href="search.html"
    })
    $(".ifmt-form-btn").on("click",function(){
        var names=$('form input[name=name]').val();
        var addreses=$('form input[name=address]').val();
        var intros=$('form textarea[name=intro]').val();
        var checks=$('form input[name=check_edu]').val();
        var obj={
            "address": addreses,
            "checkEdu":checks,
            "intro": intros,
            "name": names
        }
        var jsonBook=JSON.stringify(obj);
        $.ajax({
            type: "get",
            url: "http://172.16.0.97/zeus/corp/create?corp="+jsonBook,
            dataType: "json",
            success: function(msg){
                if(msg.code==0){
                    alert("创建成功！");
                }else{
                    alert("新增公司名已存在, 请确定后重新尝试！")
                }
            },
            error: function (msg){
                console.log(msg);
            }
        });
    });
});