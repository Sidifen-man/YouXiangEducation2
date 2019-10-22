import GlobalData from "./views/data/GlobalData.vue";
const dataRouter = [
  {
    path: "/students",
    component: GlobalData,
    redirect: "/students/profession/select",
    children: [
      // 全球数据库路由模块
      {
        path: "profession",
        component: () =>
          import(
            /* webpackChunkName: "AssessmentCenter" */ "./views/AssessmentCenter.vue"
          ),
        meta: {
          title: "全球数据中心"
        },
        children: [
          {
            path: "select",
            component: () =>
              import(
                /* webpackChunkName: "AssessmentCenter" */ "./views/data/Profession.vue"
              ),
            meta: {
              title: "职业选择",
              index: 7
            }
          },
          {
            path: "pdetail/:id",
            component: () =>
              import(
                /* webpackChunkName: "AssessmentCenter" */ "./views/data/Pdetail.vue"
              ),
            meta: {
              title: "职业详情",
              index: 8
            }
          },
          {
            path: "discipline",
            component: () =>
              import(
                /* webpackChunkName: "AssessmentCenter" */ "./views/data/Discipline.vue"
              ),
            meta: {
              title: "专业选择",
              index: 9
            }
          },
          {
            path: "professionDetail/:type/:id",
            component: () =>
              import(
                /* webpackChunkName: "AssessmentCenter" */ "./views/data/professionalDetailsView.vue"
              ),
            meta: {
              title: "职业详情",
              index: 8
            }
          },
          {
            path: "dataCourse",
            component: () =>
              import(
                /* webpackChunkName: "CourseIndex" */ "./views/data/CourseIndex.vue"
              ),
            meta: {
              title: "课程库"
            }
          },
          {
            path: "universityDetail/:id",
            component: () =>
              import(
                /* webpackChunkName: "AssessmentCenter" */ "./views/UniversityDetail.vue"
              ),
            meta: {
              title: "大学库",
              index: 10
            }
          },
          {
            path: "universityLibrary",
            component: () => import("./views/data/universityLibrary.vue"),
            meta: {
              title: "大学库"
            }
          }
        ]
      },
      //测评中心路由模块
      {
        path: "home",
        component: () => import("./views/Home.vue"),
        meta: {
          title: "测评中心"
        },
        children: [
          //VIA测试tab
          {
            path: "assessmentCenterView",
            component: () =>
              import(
                /* webpackChunkName: "AssessmentCenter" */ "./components/AssessmentCenterView.vue"
              ),
            meta: {
              title: "测评中心",
              index: 7
            }
          },
          {
            path: "readMore",
            component: () => import("./components/readMore.vue"),
            meta: {
              title: "了解更多"
            }
          },
          {
            path: "evaluate",
            component: () => import("./components/evaluate.vue"),
            meta: {
              title: "开始测评"
            }
          },
          // oNet测试tab
          {
            path: "oNet",
            component: () => import("./views/ONetEvalute.vue"),
            meta: {
              title: "ONet职业测评"
            }
          },
          {
            path: "oNet/detail",
            component: () => import("./views/Detail.vue"),
            meta: {
              title: "了解更多"
            }
          },
          {
            path: "detail2",
            component: () => import("./views/Detail2.vue"),
            meta: {
              title: "了解更多"
            }
          },
          {
            path: "detail3",
            component: () =>
              import(
                /* webpackChunkName: "ProfessionalAssessment" */ "./components/ProfessionalAssessment.vue"
              ),
            meta: {
              title: "ONet职业测评",
              index: 19
            }
          },
          {
            path: "exam",
            component: () => import("./views/Exam.vue"),
            meta: {
              title: "开始测评"
            }
          },
          {
            path: "onetEvalute",
            component: () => import("./components/oNetEvalute.vue"),
            meta: {
              title: "开始测评"
            }
          },
          {
            path: "ProfessionalAssessment",
            component: () =>
              import(
                /* webpackChunkName: "ProfessionalAssessment" */ "./components/ProfessionalAssessment.vue"
              ),
            meta: {
              title: "ONet职业测评",
              index: 19
            }
          },
          // 报告管理tab
          {
            path: "reportManagement",
            component: () =>
              import(
                /* webpackChunkName: "ReportManagement" */ "./components/ReportManagement.vue"
              ),
            meta: {
              title: "报告管理",
              index: 20
            }
          },
          {
            path: "report",
            component: () =>
              import(
                /* webpackChunkName: "ReportManagement" */ "./views/Report.vue"
              ),
            meta: {
              title: "报告管理",
              index: 20
            }
          }
        ]
      },
      //活动中心路由模块
      {
        path: "activity",
        component: () => import("./views/Activity.vue"),
        meta: {
          title: "活动中心"
        },
        children: [
          //活动库
          {
            path: "library",
            component: () =>
              import(
                /* webpackChunkName: "AssessmentCenter" */ "./views/data/Library.vue"
              ),
            meta: {
              title: "活动库",
              index: 21
            },
            children: [
              {
                path: "myActivityPlan",
                component: () => import("./views/data/myActivityPlan.vue"),
                meta: {
                  title: "我的活动计划"
                }
              },
              {
                path: "detail",
                component: () => import("./views/data/ActivityDetail.vue"),
                meta: {
                  title: "活动详情"
                }
              },
              {
                path: "school_detail",
                component: () => import("./views/data/SchoolActivity.vue"),
                meta: {
                  title: "活动详情"
                }
              },
              {
                path: "AutoActivi",
                component: () => import("./views/data/AutoActivi.vue"),
                meta: {
                  title: "自定义活动"
                }
              },
              {
                path: "Bestur",
                component: () => import("./views/data/Bestur.vue"),
                meta: {
                  title: "BestU活动"
                }
              },
              {
                path: "Favorites",
                component: () => import("./views/data/Favorites.vue"),
                meta: {
                  title: "收藏夹"
                }
              },
              {
                path: "",
                redirect: "myActivityPlan"
              }
            ]
          },
          {
            path: "advantage",
            component: () => import("./views/data/Advantage.vue"),
            meta: {
              title: "优势打卡",
              index: 22
            }
          }
        ]
      }
    ]
  }
];
export default dataRouter;
