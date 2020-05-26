import ajax from './ajax'

const BASE_URL = 'http://localhost:8081';

//创建文件
export const createFile = ({fileName, fileContent}) => ajax(BASE_URL + "/file/create", {fileName, fileContent}, "POST");

//分页获取文件列表
export const getFileList = ({page, rows}) => ajax(BASE_URL + "/file/getList", {page, rows}, "POST");

//获取文件内容
export const getFile = (fileNo) => ajax(BASE_URL + "/file/getFile", {fileNo});

//获取文件读锁
export const getReadLock = (fileNo) => ajax(BASE_URL + "/file/getReadLock", {fileNo});

//保存文件
export const saveFile = ({fileNo, fileName, fileContent, threadId}) => ajax(BASE_URL + "/file/saveFile", {fileNo, fileName, fileContent, threadId}, "POST");

//删除锁
export const delLock = ({fileNo, threadId}) => ajax(BASE_URL + "/file/delLock", {fileNo, threadId}, "POST");
