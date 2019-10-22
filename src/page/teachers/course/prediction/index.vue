<template>
  <div class="prediction" v-if="visible">

    <LoadingPage :isShowModal="loading"></LoadingPage>
    <el-dialog :visible.sync="visible" :close-on-click-modal="false" width="5.5rem" :before-close="handleClose">
      <div class="prediction-wrap">
        <div class="img-wrap">
          <div class="img-title">{{mySurveyDetail.name}}</div>
          <img src="../../../../assets/images/decoration.png" alt class="pred-decotation">
        </div>
        <p class="pred-desc">
          {{mySurveyDetail.desc}}
        </p>
        <div  v-for="(question, index) in mySurveyDetail.questions" :key="question.id">
          <div class="test-wrap"  v-if="currentPage == index && question.type=='radiogroup'">

            <h3 class="test-title">{{index+1}}. {{question.name}}：</h3>
            <ul class="test-list">
              <li class="test-item" v-for="choice in question.choices" :key="choice.id" >
                <div v-if="!editAble" class="question" :class="{ 'is-select': choice.value==0 }">
                  <img :src=" choice.value==0 ? checkImg2 : checkImg1" alt class="test-icon">
                  <span class="ques-text" style="width: 3.5rem;">{{ choice.name }}</span>
                </div>

                <div v-if="editAble" class="question" :class="{ 'is-select': choice.value==0 }" @click="handleSelectRadio(question.choices, choice)">
                  <img :src=" choice.value==0 ? checkImg2 : checkImg1" alt class="test-icon">
                  <span class="ques-text" style="width: 3.5rem;">{{ choice.name }}</span>
                </div>
              </li>
            </ul>

            <div class="page">
              <span class="page-left">{{ currentPage + 1 }}</span>
              <span class="page-mid">/</span>
              <span class="page-right">{{ mySurveyDetail.questions.length }}</span>
            </div>

          </div>


          <div class="test-wrap"  v-if="currentPage == index && question.type=='checkbox'">

            <h3 class="test-title">{{index+1}}. {{question.name}}：</h3>
            <ul class="test-list">
              <li class="test-item" v-for="choice in question.choices" :key="choice.id">
                <div v-if="!editAble" class="question" :class="{ 'is-select': choice.value==0 }" >
                  <img :src=" choice.value==0 ? checkImg2 : checkImg1" alt class="test-icon">
                  <span class="ques-text" style="width: 3.5rem;">{{ choice.name }}</span>
                </div>
                <div v-if="editAble" class="question" :class="{ 'is-select': choice.value==0 }" @click="handleSelectCheckbox(choice)">
                  <img :src=" choice.value==0 ? checkImg2 : checkImg1" alt class="test-icon">
                  <span class="ques-text" style="width: 3.5rem;">{{ choice.name }}</span>
                </div>


              </li>
            </ul>

            <div class="page">
              <span class="page-left">{{ currentPage + 1 }}</span>
              <span class="page-mid">/</span>
              <span class="page-right">{{ mySurveyDetail.questions.length }}</span>
            </div>

          </div>


          <div class="test-wrap"  v-if="currentPage == index && question.type=='textarea'">

            <h3 class="test-title">{{index+1}}. {{question.name}}：</h3>


            <textarea v-if="!editAble"
                      readonly
                      @focus="handleFoucs"
                      @blur="handleBlur"
                      v-model="question.answerType == null?'':question.answerType"
                      maxlength="140"
                      class="user-textarea"
            ></textarea>

            <textarea v-if="editAble"
                      @focus="handleFoucs"
                      @blur="handleBlur"
                      v-model="question.answerType == null?'':question.answerType"
                      maxlength="140"
                      class="user-textarea"
            ></textarea>

            <div class="page text-page">
              <span class="page-left">{{ currentPage + 1 }}</span>
              <span class="page-mid">/</span>
              <span class="page-right">{{ mySurveyDetail.questions.length }}</span>
            </div>

          </div>



        </div>



        <div class="btn-wrap" v-if="!isSubmit">
          <div class="prev test-btn"  style="cursor: pointer;" @click="prevTest">上一题</div>
          <div class="submit test-btn" style="cursor: pointer;" @click="saveSurveyData" v-if="mySurveyDetail.questions.length-1 == currentPage && editAble">确认提交</div>
          <div class="submit test-btn" style="cursor: pointer;" @click="handleClose" v-else-if="mySurveyDetail.questions.length-1 == currentPage && !editAble">关闭</div>
          <div class="submit test-btn" style="cursor: pointer;" @click="nextTest" v-else>下一题</div>
        </div>

        <div class="btn-wrap" v-if="isSubmit">
          <div class="prev test-btn"  style="cursor: pointer;" @click="prevTest">上一题</div>
          <div class="submit test-btn" style="cursor: pointer;" v-if="mySurveyDetail.questions.length-1 == currentPage">已提交</div>
          <div class="submit test-btn" style="cursor: pointer;" @click="nextTest" v-else>下一题</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import check1 from '@/assets/images/task/check_1.png'
  import check2 from '@/assets/images/task/check_2.png'

  import LoadingPage from '../../../common/loadingPage.vue'


  import { mySurveySubmitApi } from 'api/api'


  import axios from 'axios'

  export default {
    props: {
      editAble:false,
      mySurveyDetail:{},
      state: {
        type: Boolean,
        default: false
      }
    },

    components: {
      LoadingPage
    },
    data () {
      return {
        loading:false,
        visible: this.state,
        checkImg1: check1,
        checkImg2: check2,

        testArr: [],

        isSubmit: false,

        testIndex: [],
        currentPage: 0,
        isShowTextArea: false,
        currentChatLen: 0,
        content: '',
        isShowPlace: true

      }

    },
    watch: {
      state (newVal) {
        this.visible = newVal
        this.isSubmit = false
        this.$emit('update:state', newVal)
      },
      mySurveyDetail(newVal) {
      }
    },
    created (){

    },
    methods: {

      saveSurveyData(){

        this.isSubmit = true

        let _this = this

        _this.tableData1 = []

        _this.loading = true

        let params = _this.mySurveyDetail

        axios.post(mySurveySubmitApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code
          console.log("==========================code==" + code)
          if(code == 'success'){
            console.log("==========================code===" + code)
            // let myTasks = res.data.result.datalist
            // this.mySurveyDetail = res.data.result
            // _this.mySurveyDetail.completeStatus = '1'
            this.$emit('completeTask', this.mySurveyDetail.taskResultId);
            // this.$emit('close')

            setTimeout(() => {
              this.handleClose()
            }, 100);
          } else {
            // this.mySurveyDetail = {}
            this.isSubmit = false
          }

          setTimeout(() => {
            _this.loading = false;
          }, 100);

        })

      },


      handleSelectCheckbox(choice){
        if(choice.value == 0){
          choice.value = -1
        } else {
          choice.value = 0
        }
      },

      handleSelectRadio(choices, choice){
        for (let i = 0; i < choices.length; i++) {

          let curChoice = choices[i]
          if(curChoice.id == choice.id){
            curChoice.value = 0
          } else {
            curChoice.value = -1
          }


        }
      },

      handleClose () {
        this.visible = false
        this.currentPage = 0
        this.$emit('update:state', false)
        this.$emit('close')
      },
      prevTest () {
        if (this.currentPage >= 1) {
          this.currentPage--
        }
        //
        // if (this.isShowTextArea) {
        //   this.isShowTextArea = false
        //   this.currentPage = this.testArr.length - 1
        // }
      },
      nextTest () {
        if (this.currentPage < this.mySurveyDetail.questions.length - 1) {
          if(!this.editAble){
             this.currentPage++;
             return
          }
          let currentList = this.mySurveyDetail.questions[this.currentPage];
          if (currentList.isRequired) {
             if(currentList.type=="checkbox" || currentList.type=="radiogroup"){
                let isTrue = false;
                currentList.choices.forEach(item=>{
                  if(item.value>-1) isTrue = true;
                })
                if(!isTrue){
                  this.$message({
                    message: '请选择信息',
                    type: 'error'
                  })
                }else{
                  this.currentPage++
                }
              }else if(currentList.type=="textarea"){
                if(!answerType || answerType==null){
                  this.$message({
                    message: '请填写信息',
                    type: 'error'
                  })
                }else{
                  this.currentPage++
                }
              }
          }else{
            this.currentPage++
          }
         
        } else {

        }
        //
        // if (this.isShowTextArea && this.content) {
        //   this.visible = false
        //   this.$emit('update:state', false)
        //   this.$message({
        //     message: '恭喜你，建议提交成功',
        //     type: 'success'
        //   })
        // }
      },
      handleFoucs () {
        this.isShowPlace = false
      },
      handleBlur () {
        if (!this.content) {
          this.isShowPlace = true
        }
      },
      handleSelectQues (index) {
        this.testIndex.splice(this.currentPage, 1, index)
      }
    },
    mounted () {}
  }
</script>

<style lang="scss" scoped>
.prediction-wrap {
  width: 5.5rem;
  height: 6.54rem;
  background: #fff;
  padding: 0.24rem;
  box-sizing: border-box;
  border-radius: 0.05rem;
}

.img-wrap {
  text-align: center;
  position: relative;
}

.img-title {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  color: #fff;
  font-size: 16px;
}

  .pred-decotation {
    width: 3.63rem;
    margin: 0 auto;
  }

  .pred-desc {
    width: 5rem;
    background: rgba(247, 151, 39, 0.1);
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 0.36rem;
    margin-bottom: 0.2rem;
    color: #f79727;
    padding: 0.2rem 0.15rem;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 1.5em;
    letter-spacing: 1px;
  }

  .test-wrap {
    width: 5rem;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 19px 1px rgba(142, 145, 161, 0.14);
    border-radius: 4px;
    padding: 0.15rem;
    box-sizing: border-box;
    position: relative;
  }

.test-list {
  height: 2.4rem;
  overflow: auto;
}

.test-item {
  padding: 0.2rem 0.2rem;
}

.question {
  margin-bottom: 0.3rem;

    &.is-select {
      color: #f79727;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .test-icon {
    width: 0.2rem;
    margin-right: 0.15rem;
  }

  .test-icon,
  .ques-text {
    display: inline-block;
    vertical-align: middle;
  }

  .page {
    text-align: center;
    font-size: 0;
  }

  .page-left,
  .page-mid,
  .page-right {
    font-size: 12px;
    color: #ccc;
  }

  .page-left {
    color: #f79727;
  }

.btn-wrap {
  text-align: center;
  padding-top: 0.4rem;
}

.test-btn {
  width: 1.8rem;
  height: 0.5rem;
  border-radius: 25px;
  display: inline-block;
  text-align: center;
  line-height: 0.5rem;
  cursor: pointer;
  user-select: none;
}

  .submit {
    background: linear-gradient(
        -90deg,
        rgba(255, 183, 38, 1),
        rgba(255, 129, 38, 1)
    );
    color: #fff;
  }

  .prev {
    margin-right: 0.4rem;
    color: #666;
    border: 0.01rem solid rgba(228, 232, 237, 1);
  }

.user-textarea {
  height: 2.4rem;
  width: 100%;
  resize: none;
  border: 1px solid rgba(238, 238, 238, 1);
  margin-top: 0.1rem;
  padding: 0.1rem;
  box-sizing: border-box;
}

.placehold {
  position: absolute;
  top: 0.5rem;
  left: 0.3rem;

  .placehold-icon {
    width: 0.14rem;
  }
}

.text-page {
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
  text-align: right;
}

  .prediction /deep/ .el-dialog__header {
    padding: 0;
  }

  .prediction /deep/ .el-dialog__body {
    padding: 0;
  }
</style>
