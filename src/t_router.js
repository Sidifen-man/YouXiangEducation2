import teacHome from './views/teachers/Home.vue'
import studentList from './views/teachers/student/stuList.vue'

const router3 = [
  {
    path: '/teacher',
    redirect: '/teacher/assess/classDynamic',
    component: teacHome,
    children: [
      {
        path: "assess",
        component: () =>
          import(
            /* webpackChunkName: "AssessmentCenter" */ "./views/teachers/AssessHome.vue"
          ),
        meta: {
          title: "测评中心"
        },
        children:[
         // via
          {
            path: 'assessmentCenter',
            component: () =>
              import(
                /* webpackChunkName: "AssessmentCenter" */ './tcomponents/AssessmentCenterView.vue'
              ),
            meta: {
              title: '测评中心',
              index: 7
            }
          },
          {
            path: 'readMore',
            component: () => import('./components/readMore.vue'),
            meta: {
              title: '了解更多'
            }
          },
          {
            path: 'evaluate',
            component: () => import('./tcomponents/evaluate.vue'),
            meta: {
              title: '开始测评'
            }
          },
          {
            path: 'reportManagement',
            component: () =>
              import(
                /* webpackChunkName: "ReportManagement" */ './tcomponents/ReportManagement.vue'
              ),
            meta: {
              title: '报告管理',
              index: 20
            }
          },
          {
            path: 'ProfessionalAssessment',
            component: () =>
              import(
                /* webpackChunkName: "ProfessionalAssessment" */ './tcomponents/ProfessionalAssessment.vue'
              ),
            meta: {
              title: 'ONet职业测评',
              index: 19
            }
          },
          {
            path: '',
            component: () => import('./tcomponents/AssessmentCenterView.vue'),
            meta: {
              title: '测评中心'
            }
          },
          // onet
          {
            path: 'oNet',
            component: () => import('./views/teachers/ONetEvalute.vue'),
            meta: {
              title: 'ONet职业测评'
            }
          },
          {
            path: 'detail',
            component: () => import('./views/Detail.vue'),
            meta: {
              title: '了解详情'
            }
          },
          {
            path: "onetEvalute",
            component: () => import("./tcomponents/oNetEvalute.vue"),
            meta: {
              title: "开始测评"
            }
          },
          {
            path: "exam",
            component: () => import("./views/teachers/Exam.vue"),
            meta: {
              title: "开始测评"
            }
          },
          {
            path: 'detail2',
            component: () => import('./views/Detail2.vue'),
            meta: {
              title: '职业价值观测评'
            }
          },
          {
            path: 'reportManagement',
            component: () =>
              import(
                /* webpackChunkName: "ReportManagement" */ './tcomponents/ReportManagement.vue'
              ),
            meta: {
              title: '报告管理',
              index: 20
            }
          },
          {
            path: 'classDynamic',
            component: () =>
              import(
                /* webpackChunkName: "ReportManagement" */ './views/teachers/student/stuList.vue'
              ),
            meta: {
              title: '班级动态',
              index: 21
            }
          },
          {
            path: 'report',
            component: () =>
              import(
                /* webpackChunkName: "ReportManagement" */ './views/teachers/Report.vue'
              ),
            meta: {
              title: '报告管理',
              index: 20
            }
          },
        ]
      },
  
      // 全球数据库路由模块
      {
        path: "profession",
        component: () =>
          import(
            /* webpackChunkName: "AssessmentCenter" */ "./views/teachers/profession/Index.vue"
          ),
        meta: {
          title: "全球数据中心"
        },
        children: [
          {
            path: "select",
            component: () =>
              import(
                /* webpackChunkName: "AssessmentCenter" */ "./views/teachers/profession/select.vue"
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
                /* webpackChunkName: "AssessmentCenter" */ "./views/teachers/profession/Pdetail.vue"
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
                /* webpackChunkName: "AssessmentCenter" */ "./views/teachers/profession/Discipline.vue"
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
                /* webpackChunkName: "AssessmentCenter" */ "./views/teachers/profession/professionalDetailsView.vue"
              ),
            meta: {
              title: "职业详情",
              index: 8
            }
          },
          {
            path: "universityDetail",
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
            component: () => import("./views/teachers/profession/universityLibrary.vue"),
            meta: {
              title: "大学库"
            }
          }
        ]
      },
    ]
  }
];

export default router3;
