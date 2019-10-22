import {apihttpUrl} from 'api/api'; 
import axios from 'api/http/http'; // 导入http中创建的axios实例

const surver = {    
    // 获取班级列表     
    getclasslist () {    
        return axios.post(`${apihttpUrl}/student/user/classlist2`,{});    
    },
    // 班级测评完成率     
    getClassSurveyRatio (params) {    
        return axios.post(`${apihttpUrl}/survey/stat/getClassSurveyRatio`,params);    
    },
    // 班级测评完成率     
    getClassViaPortrait (params) {    
        return axios.post(`${apihttpUrl}/survey/stat/getClassViaPortrait`,params);    
    },
    // 班级列表     
    getClassSurveyList (params) {    
        return axios.post(`${apihttpUrl}/survey/stat/getClassSurveyList`,params);    
    },
    // 学生优势画像     
    getStrengthPortrait (params) {    
        return axios.post(`${apihttpUrl}/survey/via/getStrengthPortrait`,params);    
    },
    // 学生测评结果     
    getViaResult (params) {    
        return axios.post(`${apihttpUrl}/survey/via/getViaResult`,params);    
    },
    // 学生职业推荐
    getCareerRecommendation (params) {    
        return axios.post(`${apihttpUrl}/survey/onet/getCareerRecommendation`,params);    
    },
    // 学生中英文报告
    getViaReport (params) {    
        return axios.post(`${apihttpUrl}/survey/report/getViaReport`,params);    
    },
}

export default surver;
