/**
 * Created by ZHR on 2018/1/29.
 */
$(function () {
    $('.tip').hide()
    $('.tip1').hide()
    var roleId=window.localStorage.roleId;
    console.log("roleId="+roleId);

    $('.search').keyup(function (e) {
        var x = e.keyCode;
        if(x==13){
            getseh()
        }

    });

    $(".btn-sch").click(function () {
        getseh()
    })



    function  getseh(){
        var name=$('.search').val();
        if(name!=""){
            $.ajax({
                type: "get",
                url:'http://172.16.0.97/zeus/corp/like?name='+name,
                dataType: 'json',
                success: function (res) {
                    console.log(res);
                    if(roleId=="1"&&res.code=="-1"){
//                                跳转到创建页面
//                                window.location.href="adifmt.html"
                        $('.tip').show()
                    }else if(roleId=="0"&&res.code=="-1"){
                        $('.tip1').show()
                    } else if(res.data&&res.data.length==1&&res.code!="-1"){
                        //只有一条结果
                        document.cookie="name="+name;
                        window.location.href='./result-h.html?id='+res.data[0].id+'&roleId='+roleId;
                    }else {
                        //多条结果
                        document.cookie="name="+name;
                        window.location.href='./result-d.html?name='+encodeURI(name)+'&roleId='+roleId;
                    }
                },
                error: function (res) {
                    console.log(res);
                }
            })
        }else{
            alert('查询关键字不能为空')
        }
    }

})