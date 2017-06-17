'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($, window, document, undefined) {
    //$.fn == type=file的上传控件。
    $.fn.jq_rk_imgUpload = function (options) {
        var upload = new Upload(this, options);
        $(this).on('change', function () {
            upload.onSelect($(this).get(0).files);
            console.log('$(this):::::', $(this));
            console.log('$(this).closest(from).find(.submit):::::', $(this).closest('.uploadWrap').find('.submit'));
        });
        $(this).closest('.uploadWrap').on('click', '.submit', function (e) {
            e.preventDefault();
            console.log('in onSubmit:::', this);
            upload.OnSubmit($(this).closest('form'));
            return false;
        });
    };

    var Upload = function () {
        function Upload(fileELE, options) {
            _classCallCheck(this, Upload);

            this.finalFiles = [];

            //this.formElE = formElE;
            this.fileELE = fileELE;
        }
        //本地预览图片


        _createClass(Upload, [{
            key: 'onSelect',
            value: function onSelect(files) {
                var url = $(this.fileELE).val();
                $('#label_url').html(url);
                console.log('url：：：', url);
                if (files && files.length > 0) {
                    var html = "",
                        i = 0,
                        reader,
                        notice = '',
                        imgTypeString = '',
                        sizeRightString = '';
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var file = _step.value;

                            imgTypeString = this.isImgType(file);
                            sizeRightString = this.is_sizeRight_oneFile(file);
                            if (imgTypeString != '' || sizeRightString != '') {
                                notice += imgTypeString;
                                notice += sizeRightString;
                                continue;
                            }
                            console.log('this not continue');
                            this.finalFiles.push(file);
                            var imgId = "uploadImage_" + i;
                            html += '<div id="uploadList_' + i + '" class="upload_append_list"><p><strong>' + file.name + '</strong>' + '<a href="javascript:" class="upload_delete" title="删除" data-index="' + i + '">删除</a><br />' + '<img id=' + imgId + ' class="upload_image" /></p>' + '<span id="uploadProgress_' + i + '" class="upload_progress"></span>' + '</div>';

                            reader = new FileReader();
                            reader.readAsDataURL(file);
                            //onload 用闭包解决file对象取值永远是最后一个的问题
                            reader.onload = function (file, imgId) {
                                return function (e) {
                                    $('#' + imgId).attr({ 'src': e.target.result });
                                };
                            }(file, imgId);
                            i++;
                        }
                        //渲染页面
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    $("#preview").html(html);
                    $('.notice').html(notice);
                    //注册删除事件
                    $('.upload_append_list').on('click', '.upload_delete', function () {
                        console.log($(this).attr('data-index'));
                    });
                }
            }
        }, {
            key: 'isImgType',
            value: function isImgType(file) {
                console.log('fileType:::::', file.type);
                if (!/image\/\w+/.test(file.type)) {
                    return file.name + "不是图片。";
                }
                return '';
            }
        }, {
            key: 'is_sizeRight_oneFile',
            value: function is_sizeRight_oneFile(file) {
                if (file.size > 204800) {
                    return file.name + "图片过大，应小于200k。";
                }
                return '';
            }
        }, {
            key: 'OnSubmit',
            value: function OnSubmit(form) {
                var formData = $(form).get(0); //new FormData($(this.fileELE));
                console.log('formData', formData);
                // {'userName':'quanquan','email':'qq@163.com'},
                $.ajax({
                    type: "post",
                    url: '/post', //url跟后台路由url完全一致
                    data: formData,
                    success: function success(data) {
                        console.log('data::::::::::::::::::', data);
                    },
                    error: function error(e) {
                        console.log('error::::', e);
                    }

                });
            }
        }]);

        return Upload;
    }();
})(jQuery, window, document);