/**
 * Created by 李波-web on 2018/3/17.
 */
$(function(){
    var id = window.location.search.split("&")[0].split("=")[1];
    var baseUrl = 'http://172.16.0.97/zeus/';
    //创建公司
    $(".ifmt-form-btn_sch").on("click",function(){
        window.location.href="search.html"
    });
    $(".ifmt-form-btn").on("click",function(){
        var names=$('form input[name=name]').val();
        var addreses=$('form input[name=address]').val();
        var intro=$('form textarea[name=intro]').val();
        var size=$('form input[name=size]').val();
        var phone=$('form input[name=phone]').val();
        var industry=$('form input[name=industry]').val();

        if(!names){alert('请输入公司名字'); return}
        if(!intro){alert('请描述诈骗原因'); return}
        if(!addreses){alert('请输入公司地址'); return}
        if(!phone){alert('请输入公司电话'); return}
        if(!size){alert('请输入公司规模'); return}
        if(!industry){alert('请输入所属行业'); return}

        var obj={
            "id":id,
            "is_black":1,
            "address": addreses,
            "intro": intro,
            "name": names,
            "size": size,
            "phone": phone,
            "industry": industry
        };
        var jsonBook=JSON.stringify(obj);
        $.ajax({
            type: "get",
            url: "http://172.16.0.97/zeus/corp/create?corp="+jsonBook,
            dataType: "json",
            success: function(msg){
                if(msg.code==0){
                    modal();
                }
                if(msg.code==-1){
                    console.log(msg.message);
                }
            },
            error: function (msg){
                console.log(msg);
            }
        });
    });

    //渲染编辑公司
    if(id != undefined ){
        if (id != "") {
            $.ajax({
                type: "get",
                url: baseUrl + 'corp/info/' + id,
                dataType: "json",
                success: function (res) {
                    var data = res.data;
                    console.log(data.name);
                    $('form input[name=name]').val(data.name);
                    $('form textarea[name=intro]').text(data.intro);
                    $('form input[name=industry]').val(data.industry);
                    $('form input[name=size]').val(data.size);
                    $('form input[name=phone]').val(data.phone);
                    $('form input[name=address]').val(data.address);
                },
                error: function (msg) {
                    console.log(msg)
                }
            });
        }
    }

    //模态框
    function modal(){
        $(".modal").fadeIn();
        setTimeout(function(){
            $(".modal").fadeOut()
        },1500)
    }
});