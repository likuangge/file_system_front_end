<template>
  <el-container>
    <el-aside>
        <el-button @click="view" type="success">Bluetooth Connect</el-button>
    </el-aside>
    <!-- <el-container>
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
    </el-container> -->
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
        //RFCOMM(BlueTooth ver.< 4.0)
        // const bluetooth = require('bluetooth-serial-port');
        // const btSerial = new bluetooth.BluetoothSerialPort();
        // btSerial.on('found', (address, name) => {
        //   console.log('found device:', name, 'with address:', address);
        // });
        // btSerial.on('finished', () => {
        //   console.log('inquiry finished');
        // });
        // console.log('start inquiry');
        // btSerial.inquire();
        // console.log('should be displayed before the end of inquiry');

        //BLE(BlueTooth ver = 4.0, noble)
        // const noble = require('noble');
        // noble.on('stateChange', state => {
        //   if(state === 'poweredOn') {
        //     noble.startScanning(['9a8ca9ef-e43f-4157-9fee-c63a3d7dc12d'], false);
        //   } else if(state === 'poweredOff') {
        //     consle.log('noble power off');
        //   } else {
        //     noble.stopScanning();
        //   }
        // });
        // noble.on('discover', peripheral => {
        //   noble.stopScanning();
        //   console.log('found peripheral:', peripheral.advertisement);
        //   peripheral.connect(function(error) {
        //     peripheral.discoverServices(['9a8ca9ef-e43f-4157-9fee-c63a3d7dc12d'], function(err, services) {
        //       services.forEach(function(service) {
        //         console.log('found service:', service.uuid);
        //         service.discoverCharacteristics(['a8685fda51aa4f19a77771cf52abba1e'], function(err, characteristics) {
        //           characteristics.forEach(function(characteristic) {
        //             console.log('found characteristic:', characteristic.uuid);
        //             if('a8685fda51aa4f19a77771cf52abba1e' === characteristic.uuid) {
        //               characteristic.read(function(error, data) {
        //                 const websocketInfo = data.toString('ascii');
        //                 console.log('data', data);
        //                 peripheral.disconnect(function(error) {
        //                   console.log('peripheral disconnet!');
        //                 });
        //               });
        //             }
        //           });
        //         });
        //       });
        //     });
        //   });
        // });

        //web-api
        // navigator.bluetooth.getAvailability().then(isAvailability => {
        //   if(isAvailability) {
        //     console.log('ok');
        //   } else {
        //     console.log('not ok');
        //   }
        // });
        // navigator.permissions.query({name: 'bluetooth'}).then((permission) => {
        //   console.log('permission', permission);
        // }).catch((error) => {
        //   console.log(error);
        // });
        // navigator.permissions.request({name: 'bluetooth'}).then((permission) => {
        //   console.log('permission', permission);
        // })
        navigator.bluetooth.requestDevice({filters: [{services: ['9a8ca9ef-e43f-4157-9fee-c63a3d7dc12d']}]}).then((device) => {
          console.log('device', device);
          return device.gatt.connect();
        }).then((server) => {
          console.log('server', server);
          return server.getPrimaryService('9a8ca9ef-e43f-4157-9fee-c63a3d7dc12d');
        }).then((service) => {
          console.log('service', service);
          return service.getCharacteristic('a8685fda-51aa-4f19-a777-71cf52abba1e');
        }).then((characteristic) => {
          console.log('characteristic', characteristic);
          return characteristic.readValue();
        }).then((value) => {
          const websocketInfo = value.getUint8();
          console.log('value', String.fromCharCode.apply(null, new Uint8Array(value.buffer)));
        }).catch((error) => {
          console.log(error);
        })
        // navigator.bluetooth.requestDevice({acceptAllDevices: true}).then((device) => {
        //   console.log('device', device.name);
        // }).catch((error) => {
        //   console.log(error);
        // })

        //google doesn't implement this interface now
        // navigator.bluetooth.getDevices().then((deviceList) => {
        //   console.log('deviceList', deviceList);
        // })
        //this.$router.push("/view");
      }
    }
  }
</script>
