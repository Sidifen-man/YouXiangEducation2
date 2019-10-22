import {apihttpUrl} from 'api/api'; 
import axios from 'api/http/http'; // 导入http中创建的axios实例

const surver = {    
    // 获取行业单位列表     
    getIndustrylist (param) {    
        return axios.post(`${apihttpUrl}/career/industry/list`,param);    
    },
    // 获取职业列表
    getlist (param) {    
        return axios.post(`${apihttpUrl}/career/list`,param);    
    },
    // 添加收藏
    collectionAdd(param) {    
        return axios.post(`${apihttpUrl}/career/collectionAdd`,param);    
    },
    // 取消收藏
    collectionCancel(param) {    
        return axios.post(`${apihttpUrl}/career/collectionCancel`,param);    
    },
    // 职业详情
    careerDetail(param) {    
        return axios.post(`${apihttpUrl}/career/detail`,param);    
    },
    //  专业库
    // 国内专业分类列表 
    categoryList(param) {    
        return axios.post(`${apihttpUrl}/major/inland/category/list`,param);    
    },
    // 国外专业分类列表 
    FcategoryList(param) {    
        return axios.post(`${apihttpUrl}/major/foreign/category/list`,param);    
    },
    // 国外列表 
    foreignList(param) {    
        return axios.post(`${apihttpUrl}/major/foreign/list`,param);    
    },
    // 国内列表 
    inlandList(param) {    
        return axios.post(`${apihttpUrl}/major/inland/list`,param);    
    },
    // 专业库添加收藏
    m_collectionAdd(param) {    
        return axios.post(`${apihttpUrl}/major/collectionAdd`,param);    
    },
    // 专业库取消收藏
    m_collectionCancel(param) {    
        return axios.post(`${apihttpUrl}/major/collectionCancel`,param);    
    },
    // 国内详情 
    inlandDetail(param) {    
        return axios.post(`${apihttpUrl}/major/inland/detail`,param);    
    },
    // 国外详情 
    foreignDetail(param) {    
        return axios.post(`${apihttpUrl}/major/foreign/detail`,param);    
    },

    // 大学库
    
    // 海外大学库
    fcollegeList(param) {    
        return axios.post(`${apihttpUrl}/college/foreign/list`,param);    
    },
    // 大学库添加收藏、心愿
    c_collectionAdd(param) {    
        return axios.post(`${apihttpUrl}/college/collectionAdd`,param);    
    },
    // 大学库取消收藏、心愿
    c_collectionCancel(param) {    
        return axios.post(`${apihttpUrl}/college/collectionCancel`,param);    
    },
    // 国外专业分类
    fcategory(param) {    
        return axios.post(`${apihttpUrl}/major/foreign/category/list`,param);    
    },
    // 国外专业详情
    fdetail(param) {    
        return axios.post(`${apihttpUrl}/college/foreign/detail`,param);    
    },
    
    // 添加课程计划
    courseAdd(param) {    
        return axios.post(`${apihttpUrl}/course/collectionAdd`,param);    
    },
    // 课程列表
    courseList(param) {    
        return axios.post(`${apihttpUrl}/course/collectionList`,param);    
    },
}

export default surver;
