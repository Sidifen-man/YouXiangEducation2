<template>
  <div class="questionnaire">

    <LoadingPage :isShowModal="loading"></LoadingPage>
    <div class="questionnaire-header">
      <div class="img-wrap">
        <div class="img-title">{{mySurveyDetail.name}}</div>
        <img src="../../assets/images/decoration.png" alt class="pred-decotation">
      </div>
    </div>
    <div class="questionnaire-tip">
      <p class="questionnaire-tip__content">{{mySurveyDetail.desc}}</p>
    </div>
    <div class="questionnaire-content">
      <ul class="question-list"  v-for="(question, index) in mySurveyDetail.questions" :key="question.id">

        <li class="question-list-item with-face" v-if="question.type == 'matrix'">
          <div class="question-list-item__title">
            <div class="left">{{index+1}}. {{question.name}}</div>
            <div class="right" >
              <span  class="margin-39" v-for="(column, columnIndex) in question.columns" :key="column.id">{{column.name}}</span>
            </div>
          </div>
          <div class="question-list-item__options">
            <div class="left">
              <ul>
                <li class="sub-options" v-for="(row,rowIndex) in question.rows" :key="row.id">{{rowIndex+1+'. '+ row.name}}</li>
              </ul>
            </div>
            <div class="right">
              <ul>
                <li class="sub-options" v-for="(row,rowIndex) in question.rows" :key="row.id">
                  <span  class="width-28 margin-39"  v-for="(column, columnIndex) in question.columns" :key="column.id">
                    <img class="smileface" @click="handleSatisClick(row, columnIndex)" v-if="editAble" :src="row.value === columnIndex ? smile : unsmile" alt="">
                    <img class="smileface"  v-if="!editAble" :src="row.value === columnIndex ? smile : unsmile" alt="">
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </li>



        <li class="question-list-item"  v-if="question.type == 'textarea'">
          <div class="question-list-item__title">{{index+1}}. {{question.name}}</div>
          <div class="question-list-item__options">
            <div class="questionnaire-input">
              <el-input  type="textarea" class="limit-textarea" maxlength="140" ref="input"@focus="foucsing=true" @blur="foucsing=false" v-model="question.answerTextarea" v-if="editAble" >
              </el-input>
               <el-input  type="textarea" class="limit-textarea" maxlength="140" ref="input"@focus="foucsing=true" @blur="foucsing=false" v-model="question.answerTextarea" v-else readonly="readonly" >
              </el-input>
              <span  v-show="question.answerTextarea ? false : true " class="place-holder"><img :src="inputImg"><span class="text">请输入</span></span>
              <div  class="page text-page">
                <span class="page-left">{{ question.answerTextarea ? question.answerTextarea.length : 0 }}</span>
                <span class="page-mid">/</span>
                <span class="page-right">140</span>
              </div>
            </div>
         <!--    <item-input prop="suggestion1" type="textarea"  v-if="editAble"  aria-readonly="true" v-model="question.answerType" :change="handleChange"></item-input>
            <item-input prop="suggestion1" type="textarea"  v-if="!editAble"  aria-readonly="false" v-model="question.answerType"></item-input> -->
          </div>
        </li>

        <li class="question-list-item width-column" v-if="question.type == 'radiogroup'">
          <div class="question-list-item__title">{{index+1}}. {{question.name}}</div>
          <div class="question-list-item__options">
            <el-row v-for="item in question.choices" :key="item.id">
              <el-col :span="24" :class="{'is-active': 0 === item.value}"  v-if="editAble" class="sub-options" @click.native="handleSelectRadio(question.choices, item)">
                <i class="el-icon-circle-check-outline"></i><span class="option-title">{{item.name}}</span>
              </el-col>
              <el-col :span="24" :class="{'is-active': 0 === item.value}"  v-if="!editAble" class="sub-options" >
                <i class="el-icon-circle-check-outline"></i><span class="option-title">{{item.name}}</span>
              </el-col>
            </el-row>
          </div>
        </li>



        <li class="question-list-item width-column" v-if="question.type == 'checkbox'">
          <div class="question-list-item__title">{{index+1}}. {{question.name}}</div>
          <div class="question-list-item__options">
            <el-row>
              <el-col
                :span="12"
                class="sub-options"
                :class="{'is-active': item.value === 0}"
                v-for="item in question.choices" :key="item.id"
                @click.native="handleSelectCheckbox(item)"   v-if="editAble"  >
                <i class="el-icon-circle-check-outline"></i><span class="option-title">{{item.name}}</span>
              </el-col>
              <el-col
                :span="12"
                class="sub-options"
                :class="{'is-active': item.value === 0}"
                v-for="item in question.choices" :key="item.id"
                v-if="!editAble"  >
                <i class="el-icon-circle-check-outline"></i><span class="option-title">{{item.name}}</span>
              </el-col>
            </el-row>
          </div>
        </li>
      </ul>
    </div>
    <div class="submit-btn">
      <button @click="saveSurveyData" v-if="editAble && !isSubmit" >提交</button>
      <button  v-if="editAble && isSubmit" >已提交</button>

    </div>
  </div>
</template>
<script>
  import smile from 'assets/images/questionnaire/smile.png';
  import unsmile from 'assets/images/questionnaire/unsmile.png';
  import inputImg from 'assets/images/icon/input.png'
  // import ItemInput from './components/item-input';


  import LoadingPage from '../common/loadingPage.vue'

  import { myTaskResultDetailApi } from 'api/api'
  import { myTaskResultAnswerDetailApi } from 'api/api'


  import { mySurveySubmitApi } from 'api/api'
  import { myTaskListApi } from 'api/api'


  import axios from 'axios'


  const generateId = function() {
    return Math.floor(Math.random() * 10000);
  };
  export default {
    components:{
      // ItemInput,
      LoadingPage
    },


    data() {
      return {
        smile,
        unsmile,
        inputImg,
        taskresultId:"",
        mySurveyDetail:{},

        loading:false,
        editAble:true,

        isSubmit: false,

        form: {
          suggestion1: '',
          suggestion2: '',
          city: ''
        },
        textareaFocusing: false,
        satisfaction: {
        },
        selection1: {
        },
        selection2: {
        },
        inputVal: '',
        foucsing: '',
      }
    },

    created(){
      this.getMyTaskResult()
    },
    methods: {
      //this.taskresultId = this.$route.params.taskresultId

      handleFocus() {
        this.$refs.input.focus();
    
      },
      saveSurveyData(){

        let _this = this
        let params = _this.mySurveyDetail.questions;    //必填题填写判断
        let noFilled = [];
        for(let i=0;i<params.length;i++){
          let isRequired = params[i].isRequired;
          if(isRequired){
            if(params[i].type != "textarea"){
              let rows = params[i].rows;
              for(let j=0;j<rows.length;j++){
                if(rows[j].value ==-1){
                  let titleNum = (i+1)+','+(j+1);
                   noFilled.push(titleNum)
                }
              }
            }else{
              let answerTextarea = params[i].answerTextarea;
              if(!answerTextarea)noFilled.push(i+1)
            }
          }
        }
       if(noFilled.length){
        let noFilledString = noFilled.join('；');
        let message = '第'+noFilledString+'为必填题；请注意填写！'
        this.$alert(message, '提示信息', {
          confirmButtonText: '确定',
          type: 'warning' ,
          callback: action => {
           
          }
        });
        return
       }
      _this.loading = true
      // 提交数据
      let param = _this.mySurveyDetail   
      axios.post(mySurveySubmitApi, param,{
        headers: {
          'sid': localStorage.getItem("sid")
        }
      }).then(res => {

        let code = res.data.code
        if(code=='success'){
          // let myTasks = res.data.result.datalist
          this.$alert('提交成功', '提示信息', {
            confirmButtonText: '确定',
            type: 'success ' ,
            callback: action => {}
          });
          this.mySurveyDetail.completeStatus = '1'
          this.isSubmit = true

        } else {
           this.mySurveyDetail = {}
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

      getMyTaskResult(){

        this.loading = true

        this.taskresultId = this.$route.params.taskresultId

        let curEditStr=this.$route.params.editAble

        if(curEditStr === 'false'){
          this.editAble = false
        }

        if(curEditStr === 'teacher'){
          this.editAble = false
        }


        let params = {

          taskResultId:this.$route.params.taskresultId

        }



        // myTaskResultAnswerDetailApi

        if(this.editAble){

          axios.post(myTaskResultDetailApi, params,{
            headers: {
              'sid': localStorage.getItem("sid")
            }
          }).then(res => {

            let code = res.data.code
            if(code =='success'){
              // let myTasks = res.data.result.datalist
              this.mySurveyDetail = res.data.result
              if(this.mySurveyDetail.completeStatus == '1'){
                this.editAble = false
              }


            } else {
              this.mySurveyDetail = {}
            }

            setTimeout(() => {
              this.loading = false;
            }, 100);

          })
        } else if(curEditStr === 'teacher') {
          params = {

            id:this.$route.params.taskresultId

          }
          axios.post(myTaskResultDetailApi, params,{
            headers: {
              'sid': localStorage.getItem("sid")
            }
          }).then(res => {

            let code = res.data.code
            if(code =='success'){
              console.log('==========================')
              // let myTasks = res.data.result.datalist
              this.mySurveyDetail = res.data.result

            } else {
              this.mySurveyDetail = {}
            }

            this.isShowTask = true

            setTimeout(() => {
              this.loading = false;
            }, 100);

          })
        } else {

          axios.post(myTaskResultAnswerDetailApi, params,{
            headers: {
              'sid': localStorage.getItem("sid")
            }
          }).then(res => {

            let code = res.data.code
            if(code == "success"){
              console.log('==========================')
              // let myTasks = res.data.result.datalist
              this.mySurveyDetail = res.data.result

            } else {
              this.mySurveyDetail = {}
            }

            this.isShowTask = true

            setTimeout(() => {
              this.loading = false;
            }, 100);

          })
        }


      },
      handleChange(obj) {
        let prop = obj.prop;
        let val = obj.val;
        consoel.log(obj)
        this.form[prop] = val;

      },
      handleSatisClick(row, columnIndex) {
        row.value = columnIndex
      },
      handleSelection1Change(val) {
        this.selection1.value = val
      },
      handleSelectione2Change(val){
        let index = this.selection2.value.indexOf(val);
        if(index < 0) {
          this.selection2.value.push(val)

        } else {
          this.selection2.value.splice(index,1)
        }

      }
    }
  };
</script>

<style lang="scss" scoped>

  .img-wrap {
    text-align: center;
    position: relative;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.18rem;
    color: #fff;
    width: 3.63rem;
    margin: 0 auto;
    text-align: center;
  }

  .img-title {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    color: #fff;
    font-size: 16px;
  }

  .questionnaire {
    width: 13.66rem;
    height: 100%;
    margin: 0 auto;
    overflow: auto;
    padding: 0.32rem 0.42rem 0;
    background-color: #fff;

    .questionnaire-header {
      width: 100%;
      background: #fff;
      padding: 0.24rem;
      box-sizing: border-box;
      border-radius: 0.05rem;
      text-align: center;

    }

    .questionnaire-tip {
      margin-top: 0.24rem;
      height: 1.04rem;
      background:rgba(247,151,39,0.1);
      border-radius: 0.1rem;
      padding: 0.22rem 0.4rem;
      box-sizing: border-box;
      .questionnaire-tip__content {
        font-size: 0.15rem;
        color:rgba(247,151,39,1);
        line-height: 0.3rem;
      }
    }

    .questionnaire-content {
      .clearfix:after{
        content:".";
        display:block;
        height:0;
        clear:both;
        visibility:hidden;
      }
      .clearfix {
        zoom: 1;
      }
      .question-list-item {
        margin-top: 0.15rem;
        box-shadow: 0 0.06rem 0.19rem 0.01rem rgba(142,145,161,0.14);
        border-radius: 0.04rem;
        padding: 0.23rem 0.3rem;
        .question-list-item__title {
          display: flex;
          justify-content: space-between;
          .left {
            font-size: 0.13rem;
            color: #333;
            height: 0.14rem;
            line-height: 0.14rem;
          }
        }

        .right {
          span.margin-20 {
            margin-left: 0.2rem;
          }
          span.margin-39 {
            display:inline-block;
            text-align: center;
            width:0.73rem;
          }
          span.margin-45 {
            margin-left: 0.45rem;
          }
          span.margin-33 {
            margin-left: 0.33rem;
          }
        }
        .question-list-item__options {
          display: flex;
          margin-top: 0.2rem;
          padding-left: 0.2rem;
          justify-content: space-between;
          color: #666;
          font-size: 0.14rem;
          cursor: pointer;

         .questionnaire-input {
  position: relative;
  width: 100%;
  
  .limit-textarea {
    height: 1rem;
  }
  .el-input {
    height: 0.4rem;
  }
    
  .place-holder {
    position: absolute;
    left: 0.18rem;
    top: 0.14rem;
    font-size: 0.12rem;
    color: #ccc;
    img {
      display: inline-block;
      width: 0.13rem;
      height: 0.12rem;
      margin-right: 0.07rem;
      vertical-align: top;
    }
    text {
      display: inline-block;
      height: 0.12rem;
      line-height: 0.12rem;
      vertical-align: middle;
    }
  }
  .text-page {
    position: absolute;
    bottom: 0.12rem;
    right: 0.2rem;
    text-align: right;
    .page-left,
    .page-mid,
    .page-right {
      font-size: 12px;
      color: #ccc;
    }

    .page-left {
      color: #f79727;
    }
  }
} 
          .el-icon-circle-check-outline {
            font-size: 20px;
            vertical-align: top;
            margin-right: 0.14rem;
            color: #ccc;
          }
          .tip {
            margin: 0.14rem 0;
          }
          .sub-options.is-active {
            .el-icon-circle-check-outline,
            .option-title {
              color: #F79727;
            }
          }
        }

        &.with-face {
          .smileface {
            width: 0.26rem;
            height: 0.26rem;
          }
          .sub-options {
            color: #666666;
            font-size: 0.14rem;
            height: 0.26rem;
            line-height: 0.26rem;
            margin-bottom: 0.14rem;
            &:last-child {
              margin-bottom: 0;
            }
            span {
              display: inline-block;
              width: 0.26rem;
              height: 0.26rem;
              text-align: center;
            }
            .width-42 {
              width: 0.42rem;
            }
            .width-28 {
              display:inline-block;
              text-align: center;
              width:0.73rem;
            }
            .width-56 {
              width: 0.56rem;
            }
            .width-70 {
              width: 0.7rem;
            }
          }
        }

        &.width-column {
          .question-list-item__options {
            flex-direction: column;
            .sub-options {
              margin-bottom: 0.15rem;
              .option-title {
                display: inline-block;
                height: 0.2rem;
                line-height: 0.2rem;
              }
            }
            .el-row:last-child .sub-options {
              margin-bottom: 0;
            }
          }
        }
      }
    }

  .submit-btn {
    text-align: center;
    margin: 0.38rem 0;
    button {
      width: 1.8rem;
      height: 0.5rem;
      cursor: pointer;
      background: linear-gradient(
        -90deg,
        rgba(255, 183, 38, 1),
        rgba(255, 129, 38, 1)
      );
      border-radius: 0.25rem;
      font-size: 0.16rem;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>

<style lang="scss">
.questionnaire-input {
  .el-textarea__inner,
  .el-input__inner {
    height: 100%;
    min-height: 0.4rem;
    border-radius: 0.06rem;
    width: 100%;
    border-color: #eee;
  }
  .el-textarea__inner:hover,
  .el-input__inner:hover {
    border-color: #C0C4CC;
  }
  .el-textarea__inner:focus,
  .el-input__inner:focus {
    border-color: #F79727;
  }
}
</style>

