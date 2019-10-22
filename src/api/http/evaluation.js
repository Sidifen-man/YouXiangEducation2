import {getQuestions,submitVia,getoNetList,submitoNet,getStrengthportrait,getViaResult,getCipResult,getWipResult} from 'api/api'; 
import {getCareerRecommendation,getHistoryReport,startSurvey} from 'api/api'
import axios from 'api/http/http'; // 导入http中创建的axios实例

const surver = {    
    // 获取via问卷列表     
    questionsList (params) {    
        return axios.post(`${getQuestions}`,params);    
    },
    // 提交via问卷
    submitVia(params){
    	return axios.post(`${submitVia}`,params);   
    },
    // 获取oNet接口
    getoNetList(params){
    	return axios.post(`${getoNetList}`,params);   
    },
    // 提交oNet问卷
    submitoNet(params){
    	return axios.post(`${submitoNet}`,params);   
    },
    // 我的测评结果oNet cip
    getCipResult(params){
        return axios.post(`${getCipResult}`,params);   
    },
    // 我的测评结果oNet wip
    getWipResult(params){
        return axios.post(`${getWipResult}`,params);   
    },
    // 优势画像
    getStrengthportrait(params){
    	return axios.post(`${getStrengthportrait}`,params);   
    },
    // 我的测评结果
    getViaResult(params){
    	return axios.post(`${getViaResult}`,params);   
    },
    // 职业推荐
    getCareerRecommendation(params){
        return axios.post(`${getCareerRecommendation}`,params);   
    },
    //  // 报告管理
    // getHistoryReport(params){
    //     return axios.get(getHistoryReport,{params});   
    // }
    //报告管理
    getHistoryReport(params){
        return axios.post(getHistoryReport,params);   
    },
    //via 获取sessionKey
    startSurvey(params){
        return axios.post(startSurvey,params);   
    }
}

export default surver;
