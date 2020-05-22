import ajax from './ajax'

const BASE_URL = 'http://localhost:8081';

//创建文件
export const createFile = ({fileName, fileContent}) => ajax(BASE_URL + "/file/create", {fileName, fileContent}, "POST");
