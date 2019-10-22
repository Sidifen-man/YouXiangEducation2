<template>
  <el-dialog
   :lock-scroll="true"
    custom-class="custom-activity"
    :visible.sync="dialogVisible">
    <div class="title" slot="title">
      自定义活动
    </div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item class="item-major" label="活动名称：">
        <el-input v-model="form.name" placeholder="活动名称"></el-input>
        <div class="tip" v-if="!form.name && isShow"><i class="el-icon-warning"></i><span>必填项</span></div>
      </el-form-item>
      <el-form-item class="item-major"  label="活动方：">
        <el-input v-model="form.activeParty" placeholder="请填写活动方名称"></el-input>
        <div class="tip" v-if="!form.activeParty && isShow"><i class="el-icon-warning"></i><span>必填项</span></div>
      </el-form-item>
      <el-form-item class="item-major"  label="活动地点：">
        <el-select v-model="form.regionType" placeholder="校内/校外">
          <el-option label="校内" value="0"></el-option>
          <el-option label="校外" value="1"></el-option>
        </el-select>
        <div class="tip" v-if="!form.regionType && isShow"><i class="el-icon-warning"></i><span>必填项</span></div>
      </el-form-item>
      <el-form-item   label="活动城市：">
        <el-input v-model="form.city" placeholder="请填写活动城市"></el-input>
      </el-form-item>
      <el-form-item class="item-major"  label="活动类型：" >
        <el-select v-model="form.actType" placeholder="请选择活动类型">
          <el-option label="个人发明" value="1"></el-option>
          <el-option label="大学暑校实习" value="2"></el-option>
          <el-option label="社团/兴趣课" value="3"></el-option>
          <el-option label="学科竞赛" value="4"></el-option>
          <el-option label="文章发表" value="5"></el-option>
          <el-option label="社区活动" value="6"></el-option>
          <el-option label="线上课程" value="7"></el-option>
          <el-option label="线下游学" value="8"></el-option>
        </el-select>
         <div class="tip" v-if="!form.actType && isShow"><i class="el-icon-warning"></i><span>必填项</span></div>
      </el-form-item>
      <el-form-item label="学科/专业类型：">
        <el-select v-model="form.majorCode" placeholder="选择学科/专业类型">
          <el-option label="艺术与人文" value="1"></el-option>
          <el-option label="商业" value="2"></el-option>
          <el-option label="体育运动" value="3"></el-option>
          <el-option label="社会科学和社会服务" value="4"></el-option>
          <el-option label="科学 、数字和技术" value="5"></el-option>
          <el-option label="专业技能" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动形式：">
        <el-radio-group v-model="form.actWay">
          <el-radio border label="1">线上</el-radio>
          <el-radio border label="2">线下</el-radio>
          <el-radio border label="3">混合</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动方式：">
        <el-radio-group v-model="form.teamMode">
          <el-radio border label="0">个人</el-radio>
          <el-radio border label="1">团队</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动成果：">
        <el-radio-group v-model="form.result">
          <el-radio border label="1">作品</el-radio>
          <el-radio border label="2">证书</el-radio>
          <el-radio border label="3">奖状</el-radio>
          <el-radio border label="9">其它</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动周期：" class="muilty-form-item">
        <el-radio-group v-model="form.periodType" @change="periodChange(form.periodType)" class="item-major">
          <el-radio border label="0">仅这次</el-radio>
          <el-radio border label="1">我会持续参与</el-radio>
          <div class="tip" v-if="!form.periodType && isShow"><i class="el-icon-warning"></i><span>必填项</span></div>
        </el-radio-group>
        <div class="date-range item-major" >
          <el-date-picker type="date" placeholder="选择日期" v-model="form.dateFrom" :picker-options="pickerOptionsStart" @change="isShowDate"></el-date-picker>
          <span class="line">-</span>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.dateTo" :picker-options="pickerOptionsEnd" :disabled="isDisabled"></el-date-picker>
          <div class="tip" v-if="(!form.dateFrom || !form.dateTo)  && isShow"><i class="el-icon-warning"></i><span>必填项</span></div>
        </div>
      </el-form-item>
      <el-form-item label="所需时间：">
        <el-select v-model="form.hours" placeholder="小时/周">
          <el-option
            v-for="item in needTimeOptions"
            :label="item.label"
            :value="item.value"
            :key="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-textarea" label="活动介绍：">
          <div>
            <el-input
              v-model="form.intro"
              type="textarea"
              maxlength="140"
              ref="textarea"
              @focus="foucsing=true"
              @blur="foucsing=false">
            </el-input>
            <span @click="handleFocus" v-show="showPlaceholder" class="place-holder"><span class="text">用140字以内的描述来介绍你的作品</span></span>
            <div class="page text-page">
              <span class="page-left">{{ form.intro ? form.intro.length : 0 }}</span>
              <span class="page-mid">/</span>
              <span class="page-right">140</span>
            </div>
          </div>
      </el-form-item>
    </el-form>
    <div class="submit-btn">
        <button @click="onSubmit">添加到活动计划</button>
    </div>
  </el-dialog>
</template>

<script>

  import { createCustomStudentActivityApi } from 'api/api'
  import axios from 'axios'

export default {
  data() {
    return {
      foucsing: false,
      dialogVisible: false,
      isShow:false,
      form: {
        name: '',
        activeParty: '',
        regionType: '',
        city: '',
        actType: '',
        majorCode: '',
        periodType: '',
        actWay: '',
        teamMode: '',
        resultType: '',
        intro: '',
        hours: '',
        dateFrom: '',
        dateTo: ''
      },
      needTimeOptions:[{
        label: '10小时/周',
        value: '10'
      },{
        label: '20小时/周',
        value: '20'
      },{
        label: '30小时/周',
        value: '30'
      },{
        label: '40小时/周',
        value: '40'
      }],
      isDisabled:true,  //是否显示结束时间
      pickerOptionsStart: {
          disabledDate:time=> {
            let endDateVal = this.form.dateTo;
            if (endDateVal) {
                return time.getTime() > new Date(endDateVal).getTime() ;
            }else{
              return time.getTime() < Date.now() - 8.64e7
            } 
          }
        },
      pickerOptionsEnd: {
          disabledDate:time=> {
            let dateFroms = this.form.dateFrom;
            if(dateFroms){
               return time.getTime() < new Date(dateFroms).getTime() - 1*24*60*60*1000;//可以选择同一天
            }
          }
        }, 
    };
  },
  computed: {
    showPlaceholder() {
      return !this.form.intro && !this.foucsing;
    },
  },
  methods: {
    periodChange(val){
      if(val==0){
         this.$confirm('仅这次代表只能打一次卡, 是否更换活动周期?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$set(this.form,'periodType','1')
        }).catch(() => {         
        });
      }
    },
    isShowDate(val){
      if(val){
        this.isDisabled = false
      }else{
        this.isDisabled = true
      }
    },
    show() {
      this.dialogVisible = true;
    },
    handleFocus() {
      this.$refs.textarea.focus()
    },
    onSubmit() {

        let params = {};
        
        let _this  = this;
        this.isShow = true;
        if(!this.form.name || !this.form.activeParty ||!this.form.regionType ||!this.form.dateFrom || !this.form.dateTo || !this.form.periodType){
        }else{
          this.isShow = false;
          for (let i in this.form) {
            if (this.form[i] != null && this.form[i] !== '')
              params[i] = this.form[i];
          }
          let dateFrom = params['dateFrom']
          if(dateFrom){
            let fromyear = dateFrom.getFullYear();
            let frommonth = dateFrom.getMonth()+1;
            let fromdate = dateFrom.getDate();
            params['dateFrom'] = [fromyear,frommonth,fromdate].join('-');
          }
          let dateTo = params['dateTo']
          if(dateTo){
            let toyear = dateTo.getFullYear();
            let tomonth = dateTo.getMonth()+1;
            let todate = dateTo.getDate();
            params['dateTo'] = [toyear,tomonth,todate].join('-');
          }
                    console.log("params === " + JSON.stringify(params))
          axios.post(createCustomStudentActivityApi, params,{
            headers: {
              'sid': localStorage.getItem("sid")
            }
          }).then(res => {
                console.log(res)
            let code = res.data.code
            if(code == "success"){
               // 返回值: id/thumbUrl/customFlag/ret
               if (res.data.result && typeof res.data.result == 'object') {
                  for (let i in res.data.result) 
                    params[i] = res.data.result[i];
               }

                // TODO: 转向何方
                // 是否刷新页面?
               this.$emit('customeActivy',params);
               for(let i in _this.form){
                 if (_this.form[i] != null && _this.form[i] !== '')
                      _this.form[i] = '';
                }
                setTimeout(()=>{
                  _this.dialogVisible = false;
                })
            } else {
              alert(res.data.message);
            }

          })
        }
        

    }
  }
};
</script>
<style lang="scss">
.custom-activity{
  height: 8rem;
  width: 7rem;
  min-height: 750px;
  .el-dialog__header {
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.16rem;
    color: #333;
    font-weight: bold;
    padding: 0 0 0 0.44rem;
    border-bottom: 1px solid #E4E8ED;
    .title {
      position: relative;
    }
    .title:before {
      position: absolute;
      content: "";
      width: 0.04rem;
      height: 0.18rem;
      left: -0.1rem;
      top: 50%;
      transform: translateY(-50%);
      background-color: #F79727;
      margin-right: 0.14rem;
      border-radius: 0.2rem;
    }
  }
  .el-dialog__body {
    padding: 0.2rem 0 0.17rem 0;
    box-sizing: border-box;
    margin: 0 1.57rem 0 0.72rem;
    .el-form {
      font-size: 0;
      .el-input--small .el-input__inner  {
        border-radius: 0.03rem;
        height: 0.32rem;
        line-height: 0.32rem
      }
      .el-select {
        width: 100%;
      }
      .el-form-item {
        margin-bottom: 0.12rem;
        .el-form-item__label {
          line-height: 0.32rem;
        }
        .el-form-item__content {
          height: 0.32rem;
          line-height: 0.32rem!important;
        }
        .el-input.el-input--small {
          line-height: 0.3rem;
          height: 0.32rem;
        }
      }
      .item-major {
        position: relative;
        .tip {
          position: absolute;
          line-height: 0.19rem;
          right: -0.7rem;
          top: 0.07rem;
          color: #FF3B3B;
          font-size: 0;
          .el-icon-warning {
            font-size: 0.18rem;
            vertical-align: middle;
            margin-right: 0.06rem;
          }
          span {
            display: inline-block;
            vertical-align: middle;
            font-size: 0.12rem;
          }
        }
      }
      .el-radio-group {
        .el-radio.is-bordered {
          margin-right: 0.05rem;
          padding-left: 0;
          padding-right: 0;
          text-align: center;
          width: 0.55rem;
          padding: 0 0.14rem;
          height: 0.32rem;
          line-height: 0.3rem;
          .el-radio__label {
            padding: 0;
          }
        }
        .el-radio__input,
        .el-radio__inner {
          height: 0;
          width: 0;
        }
        .el-radio.is-bordered.is-checked {
          border-color: #F79727;
          background-color: #FFF7ED;
        }
      }
      .muilty-form-item {
        height: 0.72rem;
        .el-radio.is-bordered {
          width: 1.24rem;
          margin-bottom: 0.1rem;
        }
        .date-range {
          .el-date-editor {
            width: 1.45rem;
          }
          .line {
            color: #DCE0E5;
          }
        }
        
      }
      .form-textarea {
        height: 1rem;
      }
      .el-textarea {
        height: 1rem;
        border-radius: 0.03px;
        .el-textarea__inner {
          border-color: #DCE0E6;
          background-color: #fff;
          height: 100%;
          resize: none;
        }
        .el-textarea__inner:focus {
          border-color:#F28C18;
        }
      }
      .place-holder {
        font-size: 0.12rem;
        line-height: 0.12rem;
        top: 0.1rem;
        position: absolute;
        left: 0.2rem;
        color: #999;
      }
      .text-page {
        position: absolute;
        bottom: 0.08rem;
        right: 0.15rem;
        line-height: 0.16rem;
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
    .submit-btn {
      text-align: center;
      button {
        width: 1.8rem;
        height: 0.5rem;
        line-height: 0.5rem;
        background:linear-gradient(-90deg,rgba(255,183,38,1),rgba(255,129,38,1));
        border-radius: 0.25rem;
        font-weight:bold;
        color:rgba(255,255,255,1);
        text-align: center;
        font-size: 0.16rem;
        cursor: pointer;
      }
    }
  }
}
</style>