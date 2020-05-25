<template>
  <el-container>
    <el-aside>
      <el-button @click="newFile" type="success">新建文件</el-button>
    </el-aside>
    <el-main>
      <el-table :data=fileList highlight-current-row>
        <el-table-column type="index" fixed="left"/>
        <el-table-column label="文件编号" prop="fileNo"/>
        <el-table-column label="文件名称" prop="fileName">
          <template slot-scope="scope">
            <el-link type="primary" :href=download(scope.row)>{{scope.row.fileName}}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="新建时间" prop="createTimeDesc"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center">
        <el-pagination layout="total,prev,pager,next,jumper" :total="totalFile" :page-size="filePageSize"
                       :hide-on-single-page="hideFileOnSinglePage" @current-change="handleFileCurrentChange"/>
      </div>
    </el-main>
  </el-container>
</template>

<script>

  import {getFileList} from '../../api'

  export default {
    data() {
      return {
        fileList: [],
        totalFile: 0,
        filePageSize: 30,
        hideFileOnSinglePage: true
      }
    },
    mounted() {
      getFileList({
        page: 1,
        rows: this.filePageSize
      }).then((data) => {
        if (data.success) {
          this.totalFile = data.data.total;
          if (this.totalFile > this.filePageSize) {
            this.hideFileOnSinglePage = false;
          }
          this.fileList = data.data.rows;
        } else {
          this.$message.error(data.statusInfo);
        }
      }).catch(() => {
        this.$message.error("获取文件列表失败")
      })
    },
    methods: {
      handleFileCurrentChange(val) {
        getFileList({
          page: val,
          rows: this.filePageSize
        }).then((data) => {
          if (data.success) {
            this.totalFile = data.data.total;
            if (this.totalFile > this.filePageSize) {
              this.hideFileOnSinglePage = false;
            }
            this.fileList = data.data.rows;
          } else {
            this.$message.error(data.statusInfo);
          }
        }).catch(() => {
          this.$message.error("获取文件列表失败")
        })
      },
      download(file) {
        return "http://localhost:8081/file/download?fileNo=" + file.fileNo;
      },
      edit(file) {
        this.$store.commit("File/setFileNo", file.fileNo);
        this.$router.push("/edit");
      },
      newFile() {
        this.$router.push("/new");
      }
    }
  }
</script>
