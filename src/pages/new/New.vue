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
          <el-form-item label="文件内容">
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

  import {createFile, getFileList} from '../../api'

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
        if(this.NewFile.fileName.length === 0) {
          this.$message.warning("请输入文件名");
        } else if(this.NewFile.fileName.length > 30) {
          this.$message.warning("文件名过长");
        } else {
          createFile({
            fileName: this.NewFile.fileName,
            fileContent: this.NewFile.fileContent
          }).then((data) => {
            if (data.success) {
              this.NewFile.fileName = "";
              this.NewFile.fileContent = "";
              this.$message.success("创建文件成功");
            } else {
              this.$message.error(data.statusInfo);
            }
          }).catch(() => {
            this.$message.error("创建文件失败!");
          })
        }
      },
      view() {
        this.$router.push("/view");
      }
    }
  }
</script>
