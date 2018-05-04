/**
 * Created by 李波-web on 2018/3/21.
 */
$(function () {



    //编辑黑名单信息
    // $('.editBlack').attr('href', 'blackname.html?id=' + id)
    //点击注册事件
    // var msg = $('.search').val();
    var urlr=decodeURI(window.location.search);
    console.log(urlr);
    var name = urlr.split("=")[1];
    var data=null;
    // console.log(name);
    if(name){
        data={name:name};
        getSch(data)
    }else{
        data={name:''};
        getSch(data)
    }
    $('.btn-sch').click(function () {
        var msg = $('.search').val();
        data={name:msg};
        getSch(data);
    });
    $(document).keyup(function(event){
        if(event.keyCode == 13){
            var msg = $('.search').val();
            data={name:msg};
            getSch(data)
        }
    });

    //请求数据
    function  getSch(data){
        if(data.name==""||data.name.length>3){
            $.ajax({
                type: "get",
                url : "http://172.16.0.97:8080/zeus/corp/blacklistLike",
                dataType:"json",
                data:data,
                success: function(res){

                    if(res.data.length!==0){
                        var msg1;var obj={}
                        obj.data=res.data.slice(0, 6)
                        msg1={content: obj}
                        var html = template("test", msg1);
                        $('.serach-details').html(html);


                        $("#page").paging({
                            pageNo: 1,
                            totalPage: Math.ceil(res.data.length / 6),
                            totalSize: res.data.length,
                            callback: function (num) {
                                obj.data=res.data.slice(6 * (num - 1), 6 * num)
                                msg1={content: obj}
                                var html = template("test", msg1);
                                $('.serach-details').html(html);

                            }
                        })


                    }else{
                        alert("该公司目前不存在黑名单中")
                    }
                },
                error: function (msg){

                }
            });
        }else{

            alert("请输入公司的全称")
        }
    }
})


