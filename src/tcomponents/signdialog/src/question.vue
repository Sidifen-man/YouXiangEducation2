<template>
  <div class="questions">
    <div class="questions-header">
      <div class="left">
        <img :src="activeData.thumbUrl" alt="">
      </div>
      <div class="right">
        <h2 class="title">{{activeData.title||activeData.name}}</h2>
        <p class="desc">{{activeData.intro}}</p>
      </div>
    </div>
    <div class="questions-actions">
      <el-row>
        <el-col class="acrion-btn" :span="12">
          <button v-if="showAddSupBtn">添加优势应用标签</button>
          <ul v-else class="shown-list superity">
            <li :class="item.type" v-for="(item,index) in advantageTag" :key="index">
              <img :src="item.imgsrc" alt="">
              <p>{{item.title}}</p>
            </li>
          </ul>
        </el-col>
        <el-col class="acrion-btn" :span="12">
          <button v-if="showAddAbilitBtn">添加能力应用标签</button>
          <ul v-else class="shown-list ability">
            <li v-for="(item,index) in abilityTag" :key="index">
              <img :src="item.icon||item.imgsrc" alt="">
              <p>{{item.tipTitle||item.title}}</p>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div class="questions-details">
      <el-form v-model="form">
        <el-form-item>
          <el-select v-model="form.role" size="mini" placeholder="担任的角色">
            <el-option
              v-for="item in roleOps"
              :value="item.value"
              :label="item.label"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.joinTime" size="mini" placeholder="参与活动时间">
            <el-option
              v-for="item in timeOps"
              :value="item.value"
              :label="item.label"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.payTime" size="mini" placeholder="本次花费时间">
            <el-option
              v-for="item in payTimeOps"
              :value="item.value"
              :label="item.label"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <ul class="question-list">
        <li class="question-list-item" v-for="(item,index) in questionList" :key="index">
          <span :content="index+1" class="index">
            <img :src="indexPic" alt="">
          </span>
          <div class="title">
            <div class="tag">{{item.tag}}</div>
            <div class="label">{{item.label}}</div>
          </div>
          <div class="content">
            <item-input
              @change="handleChange"
              :prop="item.prop"
              :placeholder="item.placeholder"
              :itemValue="form[item.prop]"
            ></item-input>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="questions-btn">
      <img class="left-img" :src="quesLeft" alt="">
      <button @click="handleNext">下一步</button>
      <img class="right-img" :src="quesRight" alt="">
    </div>-->
    <add-superiority-dialog @change="handleSuperiChange" ref="addSuperiorityDialog"></add-superiority-dialog>
    <my-advantage :state.sync="isShowAdvantage" @ability="handleAbility"></my-advantage>
    <no-select :state.sync="isShowNoSelect"></no-select>
    <courseware-upload
      :state.sync="isShowUpload"
      :uploadList="uploadList"
      @uploadSelect="handleUploadSelect"
      @invitative="handleInvitative"
    ></courseware-upload>
    <upload-list :state.sync="isShowUploadList" @uploadtList="handleUploadList"></upload-list>
    <invitation-comments
      :state.sync="isShowComments"
      @success="handleSuccess"
      @showActivity="handleActivityShow"
    ></invitation-comments>
    <invitation-success :state.sync="isShowSuccess"></invitation-success>
    <!-- 我的活动 -->
    <activity-name :state="isShowActivity" @close="parentClose" @invitation="invitation"></activity-name>
    <!-- 确认删除弹框 -->
    <delete-works :state="isShowDeleteWorks" @close="parentClose"></delete-works>
  </div>
</template>
<script>
  import activity3 from "assets/images/superiority/activity-03.png";
  import activity2 from "assets/images/superiority/activity-02.png";
  import activity1 from "assets/images/superiority/activity-01.png";
  import activity4 from "assets/images/superiority/activity-04.png";
  import quesLeft from "assets/images/superiority/ques-left.png";
  import quesRight from "assets/images/superiority/ques-right.png";
  import indexPic from "assets/images/superiority/index.png";

  import ActivityName from "@/components/activityName";
  import balanced from "assets/images/superiority/balanced.png";
  import brave from "assets/images/superiority/brave.png";
  import teamSpirit from "assets/images/superiority/teamSpirit.png";
  import ItemInput from "./item-input";
  import AddSuperiorityDialog from "./add-superiority-dialog.vue";
  import MyAdvantage from "@/components/myAdvantageModal";
  import CoursewareUpload from "@/components/coursewareUpload";
  import NoSelect from "@/components/notSelectTag";
  import InvitationSuccess from "@/components/invitationSuccess";
  import InvitationComments from "@/components/invitationComments";
  import UploadList from "@/components/uploadFileList";
  import DeleteWorks from "@/page/teachers/course/deleteWork/deleteWork";

  let mockData = [
    {
      thumbUrl: activity2,
      id: 111,
      title: "民国民乐社团小提琴打卡",
      tip: "选中打卡",
      desc:
        "外教英语培训班 , 外教英语培训班 , 每天45分钟 , 随时纠正 , 学英语上TutorABC , 随时随地对话全球外教 , 生活 , 职场 , 外教英语培训班 , 外教英语培训班 , 每天45分钟 , 随时纠正 , 学英语上TutorABC，外教英语,时纠正 , 学英语上TutorABC，外教英语教英语培训班 , 外教英语培训班 , 每天45分钟 , 随时纠正 , 学英语上TutorABC，外教英语,时纠正 , 学英语上TutorABC，外教英语",
      role: "",
      payTime: "",
      joinTime: "",
      situation: "",
      action: "",
      result: "",
      advantageTag: []
    },
    {
      thumbUrl: activity1,
      id: 222,
      title: "英语社区民乐社团打卡任务",
      tip: "选中打卡",
      desc:
        "英语社区民乐社团打卡任务英语社区民乐社团打卡任务英语社区民乐社团打卡任务英语社区民乐社团打卡任务英语社区民乐社团打卡任务英语社区民乐社团打卡任务英语社区民乐社团打卡任务英语社区民乐社团打卡任务英语社区民乐社团打卡任务英语社区民乐社团打卡任务英语社区民乐社团打卡任务英语社区民乐社团打卡任务英语社区民乐社团打卡任务",
      role: "1",
      payTime: "1",
      joinTime: "1",
      situation: "最喜欢的数学课学到很难得概念，我学不懂",
      action: "我主动找老师课后问问题",
      result: "周末作业我都完成了，也都会了",
      advantageTag: [
        {
          label: "欣赏美和卓越",
          prop: "balanced",
          imgsrc: balanced
        },
        {
          label: "勇敢",
          prop: "brave",
          imgsrc: brave
        },
        {
          label: "团队精神",
          prop: "teamSpirit",
          imgsrc: teamSpirit
        }
      ]
    },
    {
      thumbUrl: activity3,
      id: 333,
      title: "45天的持续打卡任务",
      tip: "选中打卡",
      desc:
        "45天的持续打卡任务45天的持续打卡任务45天的持续打卡任务45天的持续打卡任务45天的持续打卡任务45天的持续打卡任务45天的持续打卡任务45天的持续打卡任务",
      role: "",
      payTime: "",
      joinTime: "",
      situation: "",
      action: "",
      result: "",
      advantageTag: []
    },
    {
      thumbUrl: activity4,
      id: 444,
      title: "45天的持续打卡任务",
      tip: "选中打卡",
      desc:
        "45天的持续打卡任务45天的持续打卡任务45天的持续打卡任务45天的持续打卡任务45天的持续打卡任务45天的持续打卡任务45天的持续打卡任务45天的持续打卡任务",
      role: "",
      payTime: "",
      joinTime: "",
      situation: "",
      action: "",
      result: "",
      advantageTag: []
    }
  ];

  export default {
    components: {
      ItemInput,
      AddSuperiorityDialog,
      MyAdvantage,
      CoursewareUpload,
      NoSelect,
      InvitationSuccess,
      InvitationComments,
      UploadList,
      ActivityName,
      DeleteWorks
    },
    data() {
      return {
        indexPic,
        isShowDeleteWorks: false,
        isShowAdvantage: false,
        isShowNoSelect: false,
        isShowUpload: false,
        isShowComments: false,
        isShowSuccess: false,
        isShowUploadList: false,
        isShowActivity: false,
        activity1,
        advantageTag: [],
        abilityTag: [],
        uploadList: [],
        quesRight,
        quesLeft,
        activeData: {},
        form: {
          role: "",
          payTime: "",
          joinTime: "",
          situation: "",
          action: "",
          result: ""
        },
        roleOps: [
          {
            value: "1",
            label: "担任的角色1"
          },
          {
            value: "2",
            label: "担任的角色2"
          }
        ],
        timeOps: [
          {
            value: "1",
            label: "2019-04-20"
          },
          {
            value: "2",
            label: "2019-04-21"
          }
        ],
        payTimeOps: [
          {
            value: "1",
            label: "1小时"
          },
          {
            value: "2",
            label: "2小时"
          }
        ],
        questionList: [
          {
            id: 111,
            tag: "Situation：",
            label: "当时的情况/挑战是什么？",
            placeholder:
              "例如：我最喜欢的数学课学到很难得概念，我学不懂，测验失利（不超过140字）",
            prop: "situation"
          },
          {
            id: 222,
            tag: "Action：",
            label: "你的主要行动是什么? （结合你的优势，你具体的行动是什么）",
            placeholder:
              "我主动找老师课后问问题<br/>我和最好的朋友约着一起对卷子<br/>我安慰自己，很快恢复了情绪",
            prop: "action"
          },
          {
            id: 222,
            tag: "Results：",
            label: "结果如何?",
            placeholder: "周末作业我都完成了，也都会了",
            prop: "result"
          }
        ]
      };
    },
    computed: {
      showAddSupBtn() {
        return this.advantageTag.length <= 0;
      },
      showAddAbilitBtn() {
        return this.abilityTag.length <= 0;
      }
    },
    created() {
      // let id = this.$route.query.id + ''
      // let index = mockData.findIndex(item => item.id + "" == this.select_id);
      this.setData(this.select_id);
    },
    props: ["select_id"],
    methods: {
      handleActivityShow() {
        this.isShowActivity = true;
      },
      handleUploadSelect() {
        this.isShowUploadList = true;
      },
      handleUploadList(list) {
        console.log(list, "upload");
        this.uploadList = list;
      },
      handleAbility(list) {
        console.log(list, "list");
        this.abilityTag = list;
      },
      handleInvitative() {
        this.isShowComments = true;
      },
      handleSuccess() {
        this.isShowSuccess = true;
      },
      handleNext() {
        console.log(
          this.advantageTag.length,
          this.abilityTag.length,
          this.abilityTag.length <= 0 || this.advantageTag.length <= 0,
          "text"
        );
        if (this.abilityTag.length > 0 || this.advantageTag.length > 0) {
          this.isShowUpload = true;
        } else {
          this.isShowNoSelect = true;
        }
      },
      addSuperiority() {
        this.$refs.addSuperiorityDialog.show();
      },
      addOperate() {
        this.isShowAdvantage = true;
      },
      handleChange(obj) {
        this.form[obj.prop] = obj.val;
      },
      setData(id) {
        console.log(id);
        let index = mockData.findIndex(item => item.id + "" == id);
        this.activeData = mockData[index]||{};
        for (let key in this.form) {
          this.form[key] = this.activeData[key];
        }
        this.advantageTag = this.activeData.advantageTag;
      },
      handleSuperiChange(list) {
        this.advantageTag = list;
      },
      parentClose() {
        this.isShowActivity = false;
        this.isShowDeleteWorks = false;
      },
      invitation() {
        this.isShowDeleteWorks = true;
      }
    },
    watch: {
      $route() {
        let id = this.$route.query.id + "";
        let index = mockData.findIndex(item => item.id + "" === id);
        this.setData(mockData[index]);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .questions {
    height: 5.5rem;
    overflow: auto;

    .questions-header {
      height: 1.88rem;
      width: 100%;
      padding: 0 0.24rem 0 0.31rem;
      margin-top: 0.21rem;
      display: flex;
      .left {
        margin-right: 0.29rem;
        img {
          height: 1rem;
          width: 1.7rem;
        }
      }
      .right {
        flex: 1;
        .title {
          line-height: 0.2rem;
          font-size: 0.2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.1rem;
          margin-top: 0.1rem;
        }
        .desc {
          font-size: 0.14rem;
          color: rgba(136, 136, 136, 1);
          line-height: 0.18rem;
        }
      }
    }
    .questions-actions {
      height: 0.8rem;
      margin: 0.21rem 0.31rem 0.33rem;
      background: rgba(248, 248, 248, 0.8);
      border: 1px solid rgba(228, 232, 237, 1);
      .el-row {
        height: 100%;
        position: relative;
      }
      .acrion-btn {
        text-align: center;
        height: 100%;
        button {
          height: 0.44rem;
          width: 1.86rem;
          text-align: center;
          line-height: 0.44rem;
          cursor: pointer;
          font-size: 0.15rem;
          border-radius: 0.04rem;
          margin-top: 0.16rem;
          border: 1px solid #f79727;
          box-sizing: border-box;
        }
        &:first-child button {
          background-color: #f79727;
          color: #fff;
        }
        &:last-child button {
          background-color: transparent;
          color: #f79727;
        }
        .shown-list {
          height: 100%;
          line-height: 100%;
          li {
            height: 0.8rem;
            line-height: 0.8rem;
            display: inline-block;
            margin-right: 0.6rem;
            &:last-child {
              margin-right: 0;
            }
            img {
              display: inline-block;
              vertical-align: middle;
            }
            p {
              display: inline-block;
              vertical-align: middle;
              font-size: 0.14rem;
            }
          }
        }
        .shown-list.superity {
          img {
            width: 0.28rem;
            height: 0.28rem;
            margin-right: 0.08rem;
          }
          .spirit {
            color: #d957d9;
          }
          .emotion {
            color: #24aef2;
          }
          .relationship {
            color: #fa4b77;
          }
        }
        .shown-list.ability {
          li {
            img {
              width: 0.36rem;
              height: 0.4rem;
              margin-right: 0.1rem;
            }
            p {
              color: #f79727;
            }
          }
        }
      }
      .acrion-btn:first-child:after {
        position: absolute;
        height: 0.36rem;
        width: 1px;
        content: "";
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(228, 232, 237, 1);
      }
    }
    .questions-details {
      position: relative;
      .question-list {
        padding-top: 0.4rem;
        padding-bottom: 0.4rem;
      }
      .el-form {
        position: absolute;
        z-index: 5;
        right: 0.32rem;
        font-size: 0;
        top: -0.13rem;
        .el-form-item {
          width: 1.3rem;
          display: inline-block;
        }
        .el-form-item + .el-form-item {
          margin-left: 0.2rem;
        }
      }
      .question-list {
        .question-list-item {
          padding: 0 0.32rem 0 0.54rem;
          margin-bottom: 0.33rem;
          position: relative;
          &:last-child {
            margin-bottom: 0;
          }
          .tag,
          .label {
            color: #333;
            font-size: 0.15rem;
            display: inline-block;
            margin-bottom: 0.17rem;
          }
          .tag {
            font-weight: bold;
          }
          .index {
            position: absolute;
            left: 0.17rem;
            top: -0.05rem;
            img {
              height: 0.26rem;
              width: 0.26rem;
            }
            &:after {
              content: attr(content);
              position: absolute;
              width: 0.26rem;
              height: 0.26rem;
              left: 0;
              top: 0;
              text-align: center;
              line-height: 0.26rem;
              color: #fff;
              font-weight: bold;
            }
          }
        }
      }
    }
    .questions-btn {
      height: 0.52rem;
      text-align: center;
      position: absolute;
      width: 100%;
      bottom: 0.33rem;
      button {
        height: 100%;
        width: 2.23rem;
        line-height: 0.52rem;
        background: linear-gradient(
            -90deg,
            rgba(255, 183, 38, 1),
            rgba(255, 129, 38, 1)
        );
        border-radius: 0.26rem;
        color: #fff;
        font-weight: bold;
        font-size: 0.18rem;
        cursor: pointer;
      }
      .left-img {
        position: absolute;
        left: 0;
        bottom: -0.33rem;
        height: 1.34rem;
        width: 2.88rem;
      }
      .right-img {
        position: absolute;
        right: 0;
        bottom: -0.33rem;
        height: 1.07rem;
        width: 2.38rem;
      }
    }
  }
</style>
