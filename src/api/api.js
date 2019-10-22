/**
 * 用来做接口list
 * 整改接口地址只需要该baseUrl
 */

// 静态文件地址
switch (process.env.NODE_ENV) {
  case 'production':
    window.__baseUrl = process.env.BASE_API
    window.__adminApiUrl = process.env.ADMIN_BASE_API||''
    break
  default:
    window.__baseUrl = 'http://47.100.46.51:8787/'
    window.__adminApiUrl = process.env.ADMIN_BASE_API
}

// api地址// let baseUrl = window.__baseUrl? window.__baseUrl : '//pkufi-perftest.zhongan.io'
let baseUrl = window.__baseUrl




    let apiUrl = 'http://uat.bestucareer.com/admin/api'

  // let apiUrl = 'http://192.168.1.144:8080/bestu/api'
 
//console.log("baseUrl", baseUrl); 
console.log("apiUrl", apiUrl);
console.log("process.env", process.env);
export const apihttpUrl = apiUrl 
//登陆接口
export const phpLoginApi = apiUrl + '/phptoken/login'

// 本地登录接口, 2019-6-3
export const loginApi = apiUrl + '/login'

// 远程(第三方)登录接口, 2019-6-3，如 https://cloud.jsk365.com/app_interface/...、或 http://www.bestucareer.com/evaluation/#/login
export const remoteLoginApi = "http://www.bestucareer.com/evaluation/#/login";
//export const remoteLoginApi = apiUrl + "/login";   // 测试之用

//学生课程列表
export const studentCourseListApi = apiUrl + '/student/course/list'
export const studentTaskListApi = apiUrl + '/student/task/list'
//学生课程明细
export const studentCourseDetailApi = apiUrl + '/student/course/detail'
//学生查看课程课件
export const studentChapterDetailApi = apiUrl + '/student/course/chapter/file'

// 获取待完成任务列表
export const myTaskListApi = apiUrl + '/student/taskcenter/list'

export const myTtestListApi = apiUrl + '/student/test/detail/tasklist'


// 上传作品
export const uploadWorksFileApi = apiUrl + '/work/upload'
// 上传作品
export const getWorksFileApi = apiUrl + '/student/work/file'

// 上传任务相关附件
export const uploadTaskFileApi = apiUrl + '/task/files/upload'

// 上传任务图文图片
export const uploadTaskContentApi = apiUrl + '/task/content/upload'


// 获取用户对应的班级列表
export const getUserClassListApi = apiUrl + '/student/user/classlist'

// 获取用户所在学校的人员列表
export const getUserSchoolUserApi = apiUrl + '/teacher/project/userlist'


// 删除发起任务 taskinfo
//   /api/student/task/delete
export const deleteTaskInfo = apiUrl + '/student/task/delete'

//创建作品：同时提交上传记录 (即保存 apiUrl + '/work/upload' 的调用结果)
export const createStudentWorkApi = apiUrl + '/student/works/upload'
export const getTaskresultDetailApi = apiUrl + '/student/taskcenter/detail'




// 学生作品列表
export const studentWorksListApi = apiUrl + '/student/works/list'
// 删除作品
export const studentWorksDeleteApi = apiUrl + '/student/works/delete'

// 获取所有班级
export const getClassListApi = apiUrl + '/student/works/classlist'

// 获取所有课程
export const getCourseListApi = apiUrl + '/student/works/courselist'

// 获取所有课程
export const getChapterListApi = apiUrl + '/student/works/chapterlist'

//获取问卷明细
export const myTaskResultDetailApi = apiUrl + '/task/survey/detail'
// 获取问卷明细，供查看使用
export const myTaskResultAnswerDetailApi = apiUrl + '/task/survey/answerdetail'

//获取问卷明细
export const mySurveySubmitApi = apiUrl + '/task/survey/submit'

// 获取图文任务明细
export const getContentTaskDetailApi = apiUrl + '/taskresult/content/detail'

// 完成任务
export const completeTaskResultApi = apiUrl + '/student/task/complete'

// 获取我发起的任务列表
export const myStartTaskApi = apiUrl + '/student/taskcenter/sponsorlist'

// 获取课件任务列表
export const studentChapterTaskApi = apiUrl + '/student/course/chapter/tasklist'

// 获取用户 有关联的课程列表
export const getUserCourseList = apiUrl + '/student/user/courselist'
export const getUserChapterList = apiUrl + '/student/user/chapterlist'

// 学生 我的测试获取接口
export const myTestReportApi = apiUrl + '/student/test/detail'

//学生 新建自定义活动接口
export const createCustomStudentActivityApi = apiUrl + "/student/activity/customActAdd"
//学生 查询活动列表接口 (非课堂活动)
export const getStudentActivityListApi = apiUrl + "/student/activity/getActivityList"
//学生 查询优势打卡活动接口
export const getAdvActivityApi = apiUrl + "/student/activity/getAdvActivity"
//学生 新建优势打卡活动接口
export const createAdvActivityApi = apiUrl + "/student/activity/advActivitySave"

//学生 优势打卡 选择受邀人列表
export const getUserList = apiUrl + "/student/getUserList"
//查询优势打卡的邀请列表
export const getAdvInvitedList = apiUrl + "/student/activity/getAdvInvitedList"
// 邀请 他人参与优势打卡评价: 添加评价人
export const inviteAdvActivityEval = apiUrl + "/student/activity/inviteAdvActivityEval"
//取消或收回 优势打卡邀请
export const cancelAdvActEvalInvited = apiUrl + "/student/activity/cancelAdvActEvalInvited"

// 查询 优势打卡 评价任务详情 (收到的任务中收)
export const getAdvEvalTask = apiUrl + "/student/activity/getAdvEvalTask"
//学生 优势打卡评分接口
export const evalAdvActivityApi = apiUrl + "/student/activity/evalAdvActivity"


// 老师接口

// 获取老师课程列表
export const teacherCourseListApi = apiUrl + '/teacher/course/list'
// 任务列表
export const teacherTaskListApi = apiUrl + '/teacher/task/list'

// 学生作品列表
export const teacherWorksListApi = apiUrl + '/teacher/works/list'

// 获取课程明细
export const teacherCourseDetailApi = apiUrl + '/teacher/course/detail'

// 待开放课件列表
export const teacherPptAuthListApi = apiUrl + '/teacher/course/chapter/courseware'
// 开放课件授权
export const teacherPptAuthApi = apiUrl + '/teacher/course/chapter/coursewareopen'

// 待开始上课列表
export const teacherChapterStartListApi = apiUrl + '/teacher/course/chapter/classchapter'
// 正式开始上课
export const teacherChapterStartApi = apiUrl + '/teacher/course/chapter/chapterstart'

// 备课资料列表
export const teacherChapterFilesApi = apiUrl + '/teacher/course/chapter/lessondatalist'

// 获取课件图片列表
export const teacherChapterDetailApi = apiUrl + '/teacher/course/chapter/file'

// 添加 班级课时任务 (自定义)
export const taskaddApi = apiUrl + '/teacher/course/classchapter/taskadd'
// 批量保存 课时任务 的排序
export const teacherTaskOrderApi = apiUrl+'/teacher/course/classchapter/taskOrder'
// 分配课时任务
export const teacherTaskDispatchApi = apiUrl+'/teacher/course/classchapter/taskDispatch'
// 删除课时任务: 原来为 /teacher/task/delete
export const teacherTaskDeleteApi = apiUrl+'/teacher/course/classchapter/taskDelete'

//新建 班级图文/优势打卡任务接口
export const createContentTaskApi = apiUrl + "/teacher/course/class/taskadd"

// 获取课件任务列表
export const teacherChapterTaskApi = apiUrl + '/teacher/course/chapter/tasklist'


// 获取课时小组列表/api/teacher/course/chapter/groupsoutstudent
export const teacherGetChapterGroupApi = apiUrl + '/student/course/chapter/groups'
// 提交课程小组/course/chapter/saveGroups
export const teacherSaveGroupApi = apiUrl + '/teacher/course/chapter/saveGroups'
// 获取未分配小组的学生列表
export const teacherGetChapterUnGroupApi = apiUrl + '/teacher/course/chapter/groupsoutstudent'

// 获取未分配小组的学生列表
export const likeWorksApi = apiUrl + '/student/works/praise'
// 获取未分配小组的学生列表
export const unLikeWorksApi = apiUrl + '/student/works/cancelpraise'


export const getCollegeListApi = baseUrl + 'workvalue/api/collegeData/list'
export const getCollegeDetailApi = baseUrl + 'workvalue/api/collegeData/detail'

/* 
*
* 测评中心
*/

// 学生端

export const getQuestions = apiUrl + '/survey/via/getQuestions'    //获取via 问卷

export const submitVia = apiUrl+ '/survey/via/submit'       //提交via 问卷


export const getoNetList = apiUrl+ '/survey/onet/getQuestions'       //获取oNet 问卷
export const submitoNet = apiUrl+ '/survey/onet/submit'       //提交oNet 问卷

export const getStrengthportrait = apiUrl+'/survey/via/getStrengthPortrait'  //优势画像
export const getViaResult = apiUrl+'/survey/via/getViaResult'  //我的测评结果

export const getCipResult = apiUrl+'/survey/onet/getCipResult'  //我的测评结果Onet cip30、60
export const getWipResult = apiUrl+'/survey/onet/getWipResult'  //我的测评结果Onet wip20
export const getCareerRecommendation = apiUrl+'/survey/onet/getCareerRecommendation'  //我的测评结果 职业推荐

export const getHistoryReport = apiUrl+'/survey/report/getHistoryReport'  //报告管理列表

export const startSurvey = apiUrl+'/survey/via/startSurvey'  //via,测试获取sessionKey



