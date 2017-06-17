(function($,window,document,undefined){
    //$.fn == type=file的上传控件。
    $.fn.jq_rk_imgUpload = function(options){
        var upload = new Upload(this,options);
         $(this).on('change',function(){
             upload.onSelect($(this).get(0).files);
             console.log('$(this):::::',$(this));
             console.log('$(this).closest(from).find(.submit):::::',$(this).closest('.uploadWrap').find('.submit'));
         });
         $(this).closest('.uploadWrap').on('click','.submit',function(e){
             e.preventDefault();
             console.log('in onSubmit:::',this);
             upload.OnSubmit($(this).closest('form'));
             return false;
         })
    };

    class Upload{
        finalFiles = [];
        constructor(fileELE,options){
            //this.formElE = formElE;
            this.fileELE = fileELE;
        }
        //本地预览图片
        onSelect(files){
            var url= $(this.fileELE).val();
            $('#label_url').html(url);
            console.log('url：：：',url);
            if(files && files.length>0){
                var html = "",i=0,reader,notice='',imgTypeString='',sizeRightString='';
                for(var file of files){
                    imgTypeString = this.isImgType(file);
                    sizeRightString = this.is_sizeRight_oneFile(file);
                    if(imgTypeString!='' || sizeRightString!=''){
                        notice+=imgTypeString;
                        notice+=sizeRightString;
                        continue;
                    }
                    console.log('this not continue');
                    this.finalFiles.push(file);
                    var imgId = "uploadImage_" + i;
                    html += '<div id="uploadList_'+ i +'" class="upload_append_list"><p><strong>' + file.name + '</strong>'+
                        '<a href="javascript:" class="upload_delete" title="删除" data-index="'+ i +'">删除</a><br />' +
                        '<img id='+imgId+' class="upload_image" /></p>'+
                        '<span id="uploadProgress_' + i + '" class="upload_progress"></span>' +
                        '</div>';

                    reader = new FileReader();
                    reader.readAsDataURL(file);
                    //onload 用闭包解决file对象取值永远是最后一个的问题
                    reader.onload = ((file,imgId)=>{
                        return (e)=>{
                            $('#'+imgId).attr({'src':e.target.result});
                        }
                    })(file,imgId);
                    i++;
                }
                //渲染页面
                $("#preview").html(html);
                $('.notice').html(notice);
                //注册删除事件
                $('.upload_append_list').on('click','.upload_delete',function(){
                    console.log($(this).attr('data-index'));
                });

            }
        }
        isImgType(file){
            console.log('fileType:::::',file.type);
            if(!/image\/\w+/.test(file.type)){
                return file.name+"不是图片。";
            }
            return '';
        }
        is_sizeRight_oneFile(file){
            if(file.size>204800){
                return file.name+"图片过大，应小于200k。";
            }
            return '';
        }

        OnSubmit(form){
            let formData = $(form).get(0);//new FormData($(this.fileELE));
            console.log('formData',formData);
            // {'userName':'quanquan','email':'qq@163.com'},
            $.ajax({
                type:"post",
                url:'/post',//url跟后台路由url完全一致
                data:formData,
                success:function(data){
                    console.log('data::::::::::::::::::',data);
                },
                error:function(e){
                    console.log('error::::',e);
                }

            });
        }

    }
})(jQuery,window,document);