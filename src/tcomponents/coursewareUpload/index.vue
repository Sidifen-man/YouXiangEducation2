<template>
  <div class="my-advantage">
    <el-dialog :visible.sync="visible" width="5.63rem" :before-close="handleClose">
      <div class="adt-title-wrap">
        <div class="adt-line"></div>
        <div class="adt-title">我的优势打卡</div>
        <div class="back" @click="handleClose">
          <i class="el-icon-arrow-left"></i>
          <span class="back-text" >返回上一步</span>
        </div>
      </div>
      <div class="upload-desc">这个活动中你有完成作品吗？上传留下记录，赢得积分</div>
      <div class="content-wrap">
        <div class="courseware-content">
          <div class="course-title-wrap" @click="handleUploadSelect">
            <img src="../../assets/images/icon/icon_course_name.png" alt="" class="course-file-icon">
            <span class="course-title">从你的课堂作品中选择</span>
          </div>
          <ul class="course-list">
            <li class="course-item" v-for="(list, index) in uploadList" :key="index">{{ list.name }}</li>
          </ul>
          <!--<ul class="course-list">
            <li class="course-item">余周周的课件作品.PDF</li>
            <li class="course-item">余周周的课件作品.PDF</li>
            <li class="course-item">余周周的课件作品.PDF</li>
            <li class="course-item">余周周的课件作品.PDF</li>
            <li class="course-item">余周周的课件作品.PDF</li>
            <li class="course-item">余周周的课件作品.PDF</li>
            <li class="course-item">余周周的课件作品.PDF</li>
            <li class="course-item">余周周的课件作品.PDF</li>
          </ul>-->
        </div>
        <div class="upload-content">
          <el-upload
            class="upload-demo"
            action = "http:1111/99" 
            :on-change="handleChange"
            :file-list="fileList" :auto-upload="false">
            <div class="upload-btn">点击上传</div>
            <div class="upload-warn">选择文件( 不超过 100 M),支持 png,JPG,JPEG </div>
          </el-upload>
        </div>
      </div>
      <div class="submit-wrap">
        <div class="over-btn" @click="submit(1)">跳过</div>
        <div class="submit" @click="submit(2)">下一步</div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { uploadWorksFileApi } from 'api/api'
import { createAdvActivityApi } from 'api/api'
export default {
  props: {
    state: {
      type: Boolean,
      default: false
    },
    uploadList: {
      type: Array,
      default: () => {
        return []
      }
    },
    activeId:{
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false,
     // fileList: []
      form: {
        file: ''
      },
      fileList: [],
      workId:''
    }
  },
  watch: {
    state (newVal) {
      this.visible = newVal
      this.$emit('update:state', newVal)
    }
  },
  methods: {
    handleClose () {
      this.visible = false
      this.$emit('update:state', false)
      this.$emit('close')
    },
    // 文件状态改变时的钩子
    handleChange (file, fileList) {
      console.log(file, fileList, 'filelist')
      this.form.file = file.raw
      this.uploadFile()
    },
    handleUploadSelect () {
      this.$emit('uploadSelect')
    },
    submit(val) {
      if(val==1){
     
        if(this.form.file || this.uploadList.length){
          this.$confirm('您的文件已经选择，确定是否要跳过', '文件提醒', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.visible = false
            this.$emit('update:state', false)
            this.$emit('invitative')
         });
        }else{
          this.visible = false
          this.$emit('update:state', false)
          this.$emit('invitative')
        }
      }else{
        let works = this.workId;
        for(let i in this.uploadList){
          works = works +','+this.uploadList[i].id
        }
        let params ={
            activityId :this.$route.query.id,
            taskresultId :this.$route.query.taskresultId,
            id : this.activeId,
            works : works
         }
         let config = {
           headers: {'sid': localStorage.getItem("sid")}
         }
        axios.post(createAdvActivityApi, params,config).then(res => {
          let code = res.data.code
          if(code == 'success'){
            this.visible = false
            this.$emit('update:state', false)
            this.$emit('invitative')
          }else{  // 显示错误消息
              this.$message({
                message: res.data.message||'操作失败!',
                type: 'warning'
              });
          }
        })
      }
      
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log('change')
      console.log(file)
   //   this.form.file = file.raw
      console.log(this.form.file)
      console.log(fileList)
     // this.uploadFile()
    },

  
    uploadFile() {

     /* this.$refs.uploadExcel.submit()*/
      
      let _this = this
      let formData = new FormData()
      formData.append("bizid", "wiiiiiinney")
      formData.append('picUrlCreate', this.form.file);
      let suffixName = formData.get("picUrlCreate").name.split('.');
      let length =  this.form.file.size;
      let suffixList = ['jpg','jpeg','png'];
      if(length>20971520){
        this.$alert('文件过大，请重新上传', '文件上传失败', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        this.fileList = []
      }else if(suffixList.indexOf(suffixName[suffixName.length-1].toLowerCase())==-1 ){
        this.$alert('文件格式不正确，仅支持jpg、jpeg、png', '文件上传失败', {
          confirmButtonText: '确定',
          type: 'warning'
        });
         this.fileList = []
      }else{
        let config = {
          headers: {"Content-Type": "multipart/form-data" },
          'sid': localStorage.getItem("sid")
        }
        axios.post(uploadWorksFileApi,formData, config ).then(response => {
          if(response.data.success){
            let fileUploadObj = response.data.result

            if(fileUploadObj.bizid =='error'){
              this.$alert('上传失败', '文件上传失败', {
                confirmButtonText: '确定',
                type: 'warning'
              });
              this.fileList = []
            } else {
               _this.workId =  fileUploadObj.bizid
            }
          }else{
             this.fileList = []
             this.$alert(response.data.message, '文件上传失败', {
                confirmButtonText: '确定',
                type: 'warning'
              });
            }
        }).catch(err => {
          alert(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-advantage /deep/ .el-dialog__header,
.my-advantage /deep/ .el-dialog__body {
  padding: 0
}
</style>

<style lang="scss" scoped>
.my-advantage {
  border-radius: 0.06rem;
}
.adt-title-wrap {
  height: 0.6rem;
  line-height: 0.6rem;
  padding-left: 0.3rem;
  box-sizing: border-box;
  border-bottom: 0.01rem solid #E4E8ED;
  border-radius: 0.06rem 0.06rem 0 0;
  font-size: 0;
  position: relative;
  font-weight: bold;
  .adt-line {
    width: 0.04rem;
    height: 0.16rem;
    background:rgba(247,151,39,1);
    border-radius: 0.02rem;
    margin-right: 0.1rem;
  }

  .adt-line,
  .adt-title {
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
  }

  .back {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    margin-left: 0.14rem;
    color: #F79727;
    font-weight: 400;
  }
}

.upload-desc {
  margin: 0.3rem 0 0.2rem 0;
  color: #888;
  text-align: center;
}

.content-wrap {
  padding: 0 .08rem;

  .course-file-icon,
  .course-title {
    display: inline-block;
    vertical-align: middle;
  }

  .course-file-icon {
    width: 0.17rem;
    margin-right: 0.14rem;
  }

  .course-title-wrap {
    padding: 0.2rem 0 0.17rem 0;
  }

  .courseware-content,
  .upload-content {
    height: 1.24rem;
    background:rgba(255,255,255,1);
    border: 0.01rem solid rgba(228,232,237,1);
    border-radius: 0.06rem;
    margin-bottom: 0.16rem;
    text-align: center;
    overflow: auto;
  }

  .courseware-content {
    overflow: auto;
  }

  .course-list {
    display: flex;
    padding: 0 70px;
    flex-wrap: wrap;
    justify-content: center;

    .course-item {
      // flex: 1;
      margin-right: 0.3rem;
      margin-bottom: 0.2rem;

      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }

  .upload-btn {
    margin: 0.2rem auto;
    width: 1.1rem;
    height: 0.38rem;
    line-height: 0.38rem;
    background:rgba(247,151,39, 0.1);
    border-radius: 0.03rem;
    color: #F79727;
    text-align: center;
  }

  .upload-warn {
    color: #999;
    font-size: 12px;
  }
}

.submit-wrap {
  text-align: center;
  padding: 0.2rem 0;
  font-size: 0;
}

.submit,
.over-btn {
  width: 1.8rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  font-size: 16px;
  color: #fff;
  border-radius: 0.25rem;
  cursor: pointer;
  user-select: none;
  display: inline-block;
  vertical-align: middle;
}

.submit {
  background:linear-gradient(-90deg,rgba(255,183,38,1),rgba(255,129,38,1));
}

.over-btn {
  border: 0.01rem solid rgba(221,221,221,1);
  color: #999;
  margin-right: 0.2rem;
}

</style>
