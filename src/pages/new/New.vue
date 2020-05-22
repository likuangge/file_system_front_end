<template>
  <el-container>
    <el-aside>
        <el-button @click="view" type="success">浏览文件</el-button>
    </el-aside>
    <el-container>
      <el-header>
        <h2>新建文件</h2>
      </el-header>
      <el-main>
        <el-form :model="NewFile" style="width: 500px;margin-left: 35%">
          <el-form-item label="文件名称" required="true">
            <el-input v-model="NewFile.fileName" clearable/>
          </el-form-item>
          <el-form-item label="文件内容" required="true">
            <el-input type="textarea" v-model="NewFile.fileContent" clearable/>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer style="margin-left:70px">
        <el-button @click="create" type="primary">新建文件</el-button>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>

  import {createFile} from '../../api'

  export default {
    data() {
      return {
        NewFile: {
          fileName: "",
          fileContent: ""
        }
      }
    },
    methods: {
      create() {
        createFile({
          fileName: this.NewFile.fileName,
          fileContent: this.NewFile.fileContent
        }).then((data) => {
          if(data.success) {
            this.$message.success("创建文件成功");
          } else {
            this.$message.error(data.statusInfo);
          }
        }).catch(() => {
          this.$message.error("创建文件失败!");
        })
      },
      view() {

      }
    }
  }
</script>
