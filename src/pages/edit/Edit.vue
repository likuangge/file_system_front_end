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
        <el-button @click="save" type="primary">保存</el-button>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>

  import {mapState} from 'vuex';
  import {getFile} from '../../api';
  import {Loading} from 'element-ui';

  export default {
    data() {
      return {
        File: {
          fileNo: "",
          fileName: "",
          fileContent: ""
        }
      }
    },
    computed: {
      ...mapState({
        fileNo: state => state.File.fileNo
      })
    },
    mounted() {
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
    },
    methods: {
      save() {

      },
      view() {
        this.$router.push("/view");
      },
      newFile() {
        this.$router.push("/new");
      }
    }
  }
</script>
