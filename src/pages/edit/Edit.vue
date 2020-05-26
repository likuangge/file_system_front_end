<template>
  <el-container>
    <el-aside>
      <el-row>
        <el-button @click="view" type="success">浏览文件</el-button>
      </el-row>
      <el-row style="margin-top: 50px">
        <el-button @click="newFile" type="success">新建文件</el-button>
      </el-row>
    </el-aside>
    <el-container>
      <el-header>
        <h2>编辑文件</h2>
      </el-header>
      <el-main>
        <el-form :model="File" style="width: 500px;margin-left: 35%">
          <el-form-item label="文件名称">
            <el-input v-model="File.fileName" disabled/>
          </el-form-item>
          <el-form-item label="文件内容" required="true">
            <el-input type="textarea" v-model="File.fileContent" clearable/>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer style="margin-left:70px">
        <el-button @click="save" type="primary" :disabled="disabled">保存</el-button>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>

  import {mapState} from 'vuex';
  import {getFile, saveFile, delLock} from '../../api';
  import {Loading} from 'element-ui';

  export default {
    data() {
      return {
        File: {
          fileNo: "",
          fileName: "",
          fileContent: ""
        },
        disabled: false
      }
    },
    computed: {
      ...mapState({
        fileNo: state => state.File.fileNo,
        threadId: state => state.File.threadId
      })
    },
    mounted() {
      if(this.fileNo === null) {
        this.$router.push("/new");
        this.$message.warning("无文件编号，无法编辑");
      } else {
        this.disabled = false;
        let loading = Loading.service({fullscreen: true});
        getFile(this.fileNo).then((data) => {
          loading.close();
          if (data.success) {
            this.File.fileNo = data.data.fileNo;
            this.File.fileName = data.data.fileName;
            this.File.fileContent = data.data.fileContent;
          } else {
            this.$message.error(data.statusInfo);
          }
        }).catch(() => {
          loading.close();
          this.$message.error("获取文件详情失败")
        })
      }
    },
    methods: {
      save() {
        this.disabled = true;
        saveFile({
          fileNo: this.File.fileNo,
          fileName: this.File.fileName,
          fileContent: this.File.fileContent,
          threadId: this.threadId
        }).then((data) => {
          if(data.success) {
            this.$router.push("/view");
            this.$message.success("保存成功");
          } else {
            this.$message.error(data.statusInfo);
          }
        }).catch(() => {
          this.$message.error("保存文件失败")
        })
      },
      view() {
        delLock({
          fileNo: this.File.fileNo,
          threadId: this.threadId
        }).then((data) => {
          console.log(data);
        }).catch(() => {
          this.$message.error("跳转页面异常")
        });
        this.$store.commit("File/setFileNo", null);
        this.$store.commit("File/setThreadId", null);
        this.$router.push("/view");
      },
      newFile() {
        delLock({
          fileNo: this.File.fileNo,
          threadId: this.threadId
        }).then((data) => {
          console.log(data);
        }).catch(() => {
          this.$message.error("跳转页面异常")
        });
        this.$store.commit("File/setFileNo", null);
        this.$store.commit("File/setThreadId", null);
        this.$router.push("/new");
      }
    }
  }
</script>
