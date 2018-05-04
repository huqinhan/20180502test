/**
 * Created by ITCAST on 2017/9/19.
 */
$(document).ready(function(){
    $(".btn-sch").click(function(){
        getSch()
      });
    // $(".l-ul li").on("click",function(){
    //     var T_name=$(".l-ul li").index(this);
    //     document.cookie="rst_index="+T_name;
    //     window.location.href="t_index.html";
    // })
})
function getSch(){
    var str = $('.search').val();
    console.log(str)
    // var urlr=decodeURI(window.location.search);
    // str=urlr.substr(6)
    if(str!=""){
        $.ajax({
            type: "get",
            url : "http://172.16.0.93/corp/like",
            dataType:"json",
            data:{name:str},
            success: function(msg){
                console.log(msg)
                if(msg.code==0){
                    msg1 = {content:msg}
                    var html = template('test',msg1);
                    $('.serach-details').html(html);
                    $('.details').click(function(){
                      
                        id = $(this).attr("data-id")
                        
                        if(roleId == 0){
                            window.location.href='s_index.html?id='+id;
                        }else{
                            window.location.href='t_index.html?id='+id;
                        }
                    })
                }else{
                    var truthBeTold = window.confirm("单击'确定'重新搜索,单击'取消'退出系统!");
                    if (truthBeTold) {
                        window.location.href="./search.html";
                    }else {
                        window.location.href="http://sh.itcast.cn/";
                    }
                }

            },
            error: function (msg){
            }
        });
    }else{
    }

}