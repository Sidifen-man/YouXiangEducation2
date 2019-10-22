<template>
  <div class="teacher_editor"  v-show="state">

    <LoadingPage :isShowModal="loading"></LoadingPage>
    <el-dialog :visible.sync="state" :close-on-click-modal="false" :before-close="close">
      <span slot="title" class="teacher_editor_title">
        <h3>
          <i></i>编辑
        </h3>
      </span>
      <div class="form-wraper">
        <el-form ref="ruleForm" label-width="0.9rem" class="demo-ruleForm">
          <el-form-item label=" 标题" prop="name" label-width="0.65rem" style="margin-right: 0.25rem;">
            <el-input v-model="taskName"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="name" label-width="0.65rem">
            <div id="editor">
              <quill-editor
                v-model="content"
                @change="onEditorChange($event)"
                style="height: 260px;"
                :options="opt"
              ></quill-editor>
            </div>
          </el-form-item>

          <el-form-item label="相关文件" prop="name">

              <div class="upload-item" v-if="uploadName">{{ uploadName }}</div>

            <input type="file" id="picUrlCreate" @change="getFile($event)" name="picUrlCreate" />
            （注意：只能上传图片和pdf）
            <el-button type="primary"  style="cursor: pointer;"  @click="uploadFile">点击上传</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleClose">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleCloseDialog" custom-class="action">
      <span>{{messageDialog}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import { quillEditor, Quill } from "vue-quill-editor";
  import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";

  import LoadingPage from '../common/loadingPage.vue'

  // require styles
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";
  import "quill/dist/quill.bubble.css";




  import { uploadTaskContentApi } from 'api/api'
  import { uploadTaskFileApi } from 'api/api'


  import axios from 'axios'


  Quill.register("modules/ImageExtend", ImageExtend);

  export default {
    data() {
      return {
        taskName: '',
        editor: null,
        loading: true,
        content: "",
        uploadName: "",
        dialogVisible:false,
        messageDialog:'',
        // state: true,
        opt: {
          formula: true,
          syntax: true,
          modules: {
            ImageExtend: {
              // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
              name: "picUrlCreate", // 图片参数名
              size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
              action: uploadTaskContentApi, // 服务器地址, 如果action为空，则采用base64插入图片
              // response 为一个函数用来获取服务器返回的具体图片地址
              // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
              // 则 return res.data.url
              response: res => {
                console.log("res.data.result.fileurl===" + res.result.fileurl)
                return res.result.fileurl;
              },
              headers: xhr => {
                // xhr.setRequestHeader('myHeader','myValue')
              }, // 可选参数 设置请求头部
              sizeError: () => {}, // 图片超过大小的回调
              start: () => {}, // 可选参数 自定义开始上传触发事件
              end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
              error: () => {}, // 可选参数 上传失败触发的事件
              success: () => {}, // 可选参数  上传成功触发的事件
              change: (xhr, formData) => {
                // xhr.setRequestHeader('myHeader','myValue')
                // formData.append('token', 'myToken')
              } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
            },
            toolbar: {
              container: [
                ["bold", "italic", "underline", "strike"],
                // 标题大小
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                // 列表
                [{ list: "ordered" }, { list: "bullet" }],
                // 对齐方式
                [{ align: [] }],
                // 引用
                ["blockquote"],
                // 颜色
                [{ color: [] }, { background: [] }],
                // 链接图片
                ["link", "image"],

                ["code-block", "clean"]
              ],
              // 劫持原有图片上传
              // 如果不上传图片到服务器，此处不必配置
              handlers: {
                image: function() {
                  QuillWatch.emit(this.quill.id);
                }
              }
            }
          },
          placeholder: ""
        }
      };
    },
    props: ["state"],
    created() {
      let _this = this;
      setTimeout(() => {
        _this.loading = false;
      }, 100);
    },
    mounted() {},
    methods: {


      getFile(event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },

      uploadFile(){

        let _this = this
        _this.loading = true;

        let param = new FormData()
        param.append("bizid", "wiiiiiinney")
        param.append("picUrlCreate", this.file)
        let config = {
          headers: {
            "Content-Type": "multipart/form-data" },
          'sid': localStorage.getItem("sid")

        }
        axios.post(uploadTaskFileApi, param, config).then(function (response){


          if(response.data.success){
            let fileUploadObj = response.data.result

            if(fileUploadObj.bizid =='error'){
              alert("上传失败");

            } else {
              localStorage.setItem("taskFileId",fileUploadObj.bizid)
              localStorage.setItem("taskFileUrl",fileUploadObj.fileurl)



              _this.uploadName = fileUploadObj.filename
            }


          }

          setTimeout(() => {
            _this.loading = false;
          }, 100);

        }).catch(function (error) {
          console.log(error);

          setTimeout(() => {
            _this.loading = false;
          }, 100);
        });

      },
      close(){
        this.$emit("closeOption");
      },
      handleCloseDialog(){
        this.dialogVisible = false
      },
      handleChange(file, fileList) {
        this.uploadName = file.name
        console.log(file, 'change')
      },
      handleSuccess() {
        this.$message({
          type: "success",
          message: "上传成功",
          customClass: "unpload-message"
        });
      },
      handleError() {
        this.$message({
          message: "上传失败",
          type: "error",
          customClass: "unpload-message"
        });
      },
      handleSubmit() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file, "file");
      },
      gettext() {},
      handleClose() {
        if(!this.taskName) {
          this.dialogVisible = true;
          this.messageDialog = '请填写标题';
          return
        }
        if(!this.content) {
          this.dialogVisible = true;
          this.messageDialog = '请填写内容';
          return
        }
         localStorage.setItem("taskName",this.taskName + '')
        localStorage.setItem("taskContent",this.content + '')
        setTimeout(()=>{
           this.$emit("close");
         },0)
       

       
        console.log(this.content);
      },
      onEditorChange() {
        console.log(this.content);
      }
    },
    components: {
      quillEditor,
      LoadingPage
    },
    destroyed() {
      this.editor = null;
    }
  };
</script>
<style lang="scss" scoped>
  .teacher_editor {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999;
  }
  // dialog样式修改
  .teacher_editor /deep/ .el-dialog {
    margin-top: 0 !important;
    width: 11rem;
  }
  .teacher_editor /deep/ .el-dialog.action {
    margin-top:1.5rem !important;
  }
  .teacher_editor /deep/ .el-dialog.action .el-dialog__footer{
    height:0.6rem
  }
  .teacher_editor /deep/ .el-dialog__wrapper {
    padding-top: 0.25rem;
    box-sizing: border-box;
    overflow: hidden;
  }
  .teacher_editor /deep/ .el-dialog__header {
    height: 0.6rem;
    border-bottom: 0.01rem solid rgba(228, 232, 237, 1);
    .teacher_editor_title {
      font-size: 0.16rem;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      h3 {
        i {
          width: 0.04rem;
          height: 0.16rem;
          background: rgba(247, 151, 39, 1);
          border-radius: 0.02rem;
          display: inline-block;
          vertical-align: middle;
          margin-right: 0.1rem;
        }
      }
    }
  }
  #editor {
    width: 9.02rem;
    height: 3.5rem;
    margin-left: 0.25rem;
  }
  #editor /deep/ .edui-editor-toolbarboxinner {
    height: 0.64rem;
  }
  #editor /deep/ .edui-toolbar {
    height: 0.64rem;
    // line-height: 0.64rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  #editor /deep/ #edui1_iframeholder {
    height: 3.64rem !important;
  }
  #editor /deep/ #edui1_bottombar {
    display: none;
  }
  // form 表单样式修改
  .teacher_editor /deep/ .el-form-item__label {
    position: relative;
    margin-right: 0.25rem;
    &:after {
      position: absolute;
      content: "";
      width: 0.06rem;
      height: 0.06rem;
      background: rgba(242, 42, 24, 1);
      border-radius: 50%;
      top: 50%;
      left: 0;
      margin-top: -0.03rem;
    }
  }
  .teacher_editor /deep/ .el-input {
    width: 3.7rem;
  }
  .teacher_editor /deep/ .el-button {
    width: 1.2rem;
    height: 0.36rem;
    background: linear-gradient(
        -90deg,
        rgba(255, 183, 38, 1),
        rgba(255, 129, 38, 1)
    );
    border-radius: 0.04rem;
    border: none;
    float: right;
    margin-right: 0.5rem;
  }
  .upload-item {
    display: inline-block;
    padding: 0.08rem;
    color: #2691ff;
    border: 0.01rem solid #e4e4e4;
    border-radius: 0.02rem;
    line-height: 0.14rem;
    background-color: #f5f6f8;
    cursor: pointer;
  }
</style>
