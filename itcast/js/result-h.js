/**
 * Created by wp on 2018/3/20.
 */
$(function () {
    //上拉
    $('.slide-music').click(function () {
        $('.music-box').slideToggle();
        $('.slide-music').toggleClass("bg-up")
    });

    $('.slide-comment').click(function () {
        $('.comment-box').slideToggle();
        $('.slide-comment').toggleClass("bg-up")
    });

    $('.slide-sub').click(function () {
        $('.sub-box').slideToggle();
        $('.slide-sub').toggleClass("bg-up")
    });

    //评论五角星
    var wjx_s = "★";
    var wjx_k = "☆";
    var level;

    $('.cDetial').val('');
    $('.term').val('');
    $('.show-comment .comment-star li').text(wjx_k);

    //1. 获取li注册事件,注册mouseenter事件
    $(".pub-star li").mouseenter(function () {
        //2. 让当前元素变实心，前面的兄弟元素变实心，后面的兄弟变空心
        $(this).text(wjx_s).prevAll().text(wjx_s);
        $(this).nextAll().text(wjx_k);
        //$(this).nextAll().text(wjx_k);
    });
    //3. 给ul注册离开事件
    $(".pub-star").mouseleave(function () {
        $(".pub-star li").text(wjx_k);
        //5. 找到添加了active这个类的li
        $(".pub-star li.activestar").text(wjx_s).prevAll().text(wjx_s);
    });

    //4 给所有的li注册点击事件
    $(".pub-star li").click(function () {
        //给点击的这个li加一个标记,排他
        $(this).addClass("activestar").siblings().removeClass("activestar");
        level = $(this).attr('data-id');
    });


    var roleId = window.location.search.split("&")[1].split("=")[1]; //角色id 1是老师 0是学生
    var id = window.location.search.split("&")[0].split("=")[1]; //公司id
    var type = window.location.search.split("&")[2].split("=")[1]; //学科type
    var baseUrl = 'http://172.16.0.97/zeus/' ; //链接
    var resurl = 'http://172.16.0.97:8088/' ;    //资源连接

    //roleId == 1的情况下可以显示上编辑
    if (roleId == 1) {
        $('.editBtn').show();
        $('.imgBtn').show();
        $('.uploadBtn').show();
        $('.show-comment').show()
    } else {
        $('.editBtn').hide();
        $('.imgBtn').hide();
        $('.uploadBtn').hide();
        $('.show-comment').hide();
    }

    //请求数据
    //获取公司基本信息
    function getInfo(){
        $.ajax({
            type: "get",
            url: baseUrl + 'corp/info/' + id,
            dataType: "json",
            success: function (res) {
                var data = res.data;
                console.log(data);
                if (res.code == 0) {

                    $('.h_name').text(data.name);
                    $('.logo-box .logo-des .intro').text(data.intro);
                    $('.logo-box .logo-des .industry').text(data.industry);
                    $('.logo-box .logo-des .size').text(data.size);
                    $('.logo-box .logo-des .phone').text(data.phone);
                    $('.logo-box .logo-des .address').text(data.address);

                    //公司环境
                    if (data.picture != null && data.picture != 'string' && data.picture != "") {
                        //面试题
                        var dataEnvpic = {};
                        dataEnvpic.list = data.picture.split(";").filter(function (item) {
                            return item != '';
                        });
                        var html = template("envtmp", dataEnvpic);
                        $('#img-box').html(html);
                        $('#img-box li a').attr('href', 'pic_c.html?id=' + id+'&roleId='+roleId+ '&type=' + type);
                    }
                    if(data.picture== ""||data.picture ==null){
                        $('#img-box').html('没有该公司相关图片')
                    }

                } else {
                }
            },
            error: function (msg) {
            }
        });
    }


    if (id != "") {
      getInfo()
    } else {
    }

    //var type=0;
    getindex(type);
    $('.btn-box li').eq(type).addClass('active').siblings('li').removeClass('active');
    $('.uploadBtn').attr('href', 't_index.html?id=' + id + '&roleId='+roleId+'&type=' + type);

    //给不同学科注册点击事件，获取该学科的详细信息
    $('.btn-box li').click(function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        type = $(this).attr("data-id");
        getindex(type);
        //不同学科跳转编辑页面
        $('.uploadBtn').attr('href', 't_index.html?id=' + id +'&roleId='+roleId+ '&type=' + type)
    });

    //公司信息编辑按钮跳转
    $('.editBtn').attr('href', 'adifmt.html?id=' + id);
    //公司环境页面上传跳转
    $('.imgBtn').attr('href', 't_img.html?id=' + id+'&roleId='+roleId+ '&type=' + type);



    //注册请求详细数据的事件
    function getindex(type) {
        $('.commentTitle .comment-star').html( "<li data-id='1'>☆</li> <li data-id='2'>☆</li> <li data-id='3'>☆</li> <li data-id='4'>☆</li> <li data-id='5'>☆</li>");
        $.ajax({
            type: "get",
            url: baseUrl + "interview/find/" + id + "/" + type,
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.code == "0") {
                    localStorage.setItem("id",res.data.id);

                    //薪资
                    if (res.data.salary != null) {
                        $('.salary').html(res.data.salary)
                    } else {
                        $('.salary').html('暂无该学科薪资信息')
                    }

                    //面试题
                    $('.subTitle').attr('data-id', res.data.id);
                    if (res.data.imgs != null && res.data.imgs != "") {
                        var datapic = {};
                        datapic.list = res.data.imgs.split(";").filter(function (item) {
                            return item != '';
                        });
                        var html = template("pictmp", datapic);
                        $('#sub-box').html(html);
                        $('#sub-box li a').attr('href', 'pic_i.html?id=' + id + '&roleId='+roleId+ '&type=' + type);
                    } else {
                        $('#sub-box').html("该学科面试题没有收集");
                    }

                    //录音
                    if (res.data.record != null && res.data.record != "") {
                        var dataaudio = {};
                        dataaudio.list = res.data.record.split(";").filter(function (item) {
                            return item != '';
                        });
                        var html = template("audiotmp", dataaudio);
                        $('#music-box').html(html);
                    } else {
                        $('#music-box').html("该学科面试录音没有收集");
                    }

                    //评论显示星星
                    if (res.data.level != null) {
                        $('.commentTitle .comment-star li').eq(res.data.level - 1).text(wjx_s).prevAll().text(wjx_s);
                    }
                    if(res.data.level == null) {
                        //$('.commentTitle .comment-star').html('暂无该学科评价信息')
                    }

                    if (res.data.comment != null) {
                        //"13期张三*评论|2;12期肖*很好|2;学生名字*评论345|2"
                        var comment = res.data.comment.split(';');
                        var data = [];
//                            data.length=comment.length
                        comment.forEach(function (item, index) {
                            comment[index] = item.split("|")
                        });
                        for (var i = 0; i < comment.length; i++) {
                            data[i] = {};
                            data[i].level = comment[i][1];
                            data[i].trem = comment[i][0].split('*')[0];
                            data[i].detail = comment[i][0].split('*')[1];

                            data[i].idx = i+1;
                        }
                        var arrdata = {};
                        arrdata.list = data;
                        console.log(arrdata);
                        //分页
                        var temp = {};
                        temp.list = arrdata.list.slice(0, 10);
                        var html = template("commenttmp", temp);
                        $('#comment-box').html(html);
                        for (var i = 0; i < $('#comment-box .comment-star').length; i++) {
                            var level = $($('#comment-box .comment-star')[i]).attr('data-id');
                            $($('#comment-box .comment-star')[i]).find('li').eq(level - 1).text(wjx_s).prevAll().text(wjx_s);
                        }

                        $("#page").paging({
                            pageNo: 1,
                            totalPage: Math.ceil(arrdata.list.length / 10),
                            totalSize: arrdata.list.length,
                            callback: function (num) {
                                temp.list = arrdata.list.slice(10 * (num - 1), 10 * num) ; //
                                var html = template("commenttmp", temp);
                                $('#comment-box').html(html);
                                for (var i = 0; i < $('#comment-box .comment-star').length; i++) {
                                    var level = $($('#comment-box .comment-star')[i]).attr('data-id');
                                    $($('#comment-box .comment-star')[i]).find('li').eq(level - 1).text(wjx_s).prevAll().text(wjx_s);
                                }
                            }
                        })
                    } else {
                        $('.comment-box').html('暂无该学科评价详情');
                        $("#page").html("")
                    }

                } else {
                    $('#music-box').html(res.message);
                    $('#sub-box').html(res.message);
                    $('.salary').html(res.message);
                    $('.comment-box').html(res.message);
                    //$('.commentTitle .comment-star').html('暂无该学科评价信息');
                    $('#page').html('')

                }
            },
            error: function (msg) {
            }
        });
    }


    //        提交评论
    $('.pub').click(function () {
        var comment = $('.cDetial').val();
        var term = $('.term').val();
        if (!level) {
            alert("请打分");
            return
        }
        if (!term) {
            alert("请输入学生班级姓名");
            return
        }
        if (!comment) {
            alert("请输入评价详情");
            return
        }
        comment = term + '*' + comment;
        $.ajax({
                url: baseUrl + 'interview/' + id + '/' + type + '/' + comment + '/' + level,
                type: 'post',
                success: function (res) {
                    console.log(res);
                    if (res.code == 0) {
                         $('.cDetial').val('');
                         $('.term').val('');
                         $('.show-comment .comment-star li').text(wjx_k);
                        getindex(type);
                    }
                }
            })
    });

    //删除图片(环境)
    $('.img-box').on('click', 'li .delete', function (e) {
        $.ajax({
            type: 'post',
            url: baseUrl + 'upload/deleteEnv',
            data: {
                fileName: $(e.target).attr('data-id').split('\\')[2],
                id: id,
            },
            success: function (res) {
                if (res.code == 0) {
                    $(e.target).parent('li').remove();
                    //window.history.go(0)
                    getInfo()
                } else {
                    alert('删除不成功')
                }
            },
            error: function (msg) {
                alert(msg)
            }
        })

    });


    //删除图片（面试题）
    $('.sub-box').on('click', 'li .delete', function (e) {
        var fileName = $(e.target).attr('data-id').substring($(e.target).attr('data-id').indexOf('\\') + 1);
        deleteRes(fileName, 1, $(e.target), $('.sub-box'))
    });

    //删除录音
    $('.music-box').on('click', 'button', function (e) {
        var fileName = $(e.target).attr('data-id').substring($(e.target).attr('data-id').indexOf('\\') + 1);
        deleteRes(fileName, 2, $(e.target), $('.music-box'));

    });

    function deleteRes(fileName,fileType, target, parent) {
        $.ajax({
            url: baseUrl + "upload/delete?",
            type: 'post',
            data: {
                fileName: fileName,
                fileType: fileType,
                id: $('.subTitle').attr('data-id')
            },
            success: function (res) {
                if (res.code == 0) {
                    //target.parent('li').remove();
                    //window.history.go(0)
                    getindex(type)
                } else {
                }
            },
            error: function (msg) {
            }
        })
    }

});