<template>
  <div class="window">
    <Enstudiotap @showEnglish="changeEnglish" :studio="studio" :tabIndex="tabIndex"></Enstudiotap>
    <div class="studio">
      <div @click="qiehuan(0)" :class="type==0?'click':''">Personal studio</div>
      <div @click="qiehuan(1)" :class="type==1?'click':''">Enterprise studio</div>
    </div>
    <div class="shuru">
      <div class="page1">
        <div>
          Mobile phone number
          <span class="red">*</span>
          <input v-model="message.phone" />
        </div>
        <div>
          Mailbox
          <input v-model="message.email" />
        </div>
        <div>
          Real name
          <span class="red">*</span>
          <input v-model="message.name" />
        </div>
        <div>
          Id card number
          <span class="red">*</span>
          <input v-model="message.ID" />
        </div>
        <div style="height: 450px;">
          The front and back of the ID card
          <span class="red">*</span>
          <div class="upload">
            <div class="img-container">
              <img :src="src" width="250" height="185" alt />
            </div>
            <input type="file" @change="getFile" ref="file" id="file" />
            <label class="zhezhao" for="file"></label>
          </div>
          <div class="upload2">
            <div class="img-container">
              <img :src="src2" width="250" height="185" alt />
            </div>
            <input type="file" @change="getFile2" ref="file" id="file2" />
            <label class="zhezhao" for="file2"></label>
          </div>
        </div>
        <div>
          Name of unit or school
          <input v-model="message.unir" />
        </div>
        <div style="height: 200px;">
          Personal history
          <textarea v-model="message.resume"></textarea>
        </div>
        <div>
          Note: (with
          <span class="red">*</span>Mandatory）
        </div>
      </div>
      <div class="page2">
        <div>
          Studio name
          <span class="red">*</span>
          <input v-model="message.studioname" />
        </div>
        <div style="height: 170px;">
          Studio logo
          <span class="red">*</span>
          <div class="upload3">
            <div class="img-container">
              <img :src="src3" width="250" height="185" alt />
            </div>
            <input type="file" @change="getFile3" ref="file" id="file3" />
            <label class="zhezhao" for="file3"></label>
          </div>
        </div>
        <div style="height: 450px;">
          Studio introduction
          <textarea v-model="message.studiointroduction"></textarea>
        </div>
        <div v-if="type!=1">
          Sample work
          <span class="red">*</span>
          <!-- 公司营业执照<span class="red">*</span> -->
          <input type="file" accept="image/*" id="file4" @change="getFile4" value />
          <label for="file4" style="position: absolute;left: 200px;top: 10px;margin-top: 0;">upload file</label>
        </div>
        <div v-if="type!=1">
          Description of sample works
          <span class="red">*</span>
          <!-- 公司具体描述 -->
          <textarea v-model="message.Sampledescription"></textarea>
        </div>
        <div v-if="type==1">
          Business license of the company
          <span class="red">*</span>
          <!-- 公司营业执照<span class="red">*</span> -->
          <input type="file" accept="image/*" id="file4" @change="getFile4" value />
          <label for="file4" style="position: absolute;left: 200px;top: 10px;margin-top: 0;">上传文件</label>
        </div>
        <div v-if="type==1">
          Business license of the company
          <span class="red">*</span>
          <!-- 公司具体描述 -->
          <textarea v-model="message.Sampledescription"></textarea>
        </div>
      </div>
      <div class="page3">
        <button class="queding" @click="shangchuan">Determine</button>
        <input @click="xuanzhong(1)" type="radio" />
        <span>Agree with Studio Management</span>
      </div>
    </div>
    <Jump v-if="showJump" :title="err"></Jump>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>

<script>
import Enstudiotap from "../../components/Enstudiotap";
import Jump from "../../components/Jump";
import Loading from "../../components/Loading";
import Scroll from "../../assets/js/scroll.js";

export default {
  name: "studioManagement",
  components: {
    Enstudiotap,
    Loading,
    Jump
  },
  data() {
    return {
      check: 0,
      showJump: false,
      tabIndex: 0,
      showLoading: false,
      err: "",
      type: this.$route.query.type, //0个人用户，1企业用户
      src: "",
      src2: "",
      src3: "",
      file1: "", //文件格式
      file2: "", //文件格式
      file3: "", //文件格式
      file4: "", //文件格式
      message: {
        phone: "",
        email: "",
        name: "",
        ID: "",
        file1: "", //url格式
        file2: "",
        unir: "",
        resume: "",
        studioname: "",
        studiointroduction: "",
        file3: "", //logo
        file4: "", //示例作品
        Sampledescription: ""
      }
    };
  },
  methods: {
    xuanzhong(e) {
      this.check = e;
    },
    qiehuan(e) {
      this.type = e;
    },
    havestudio(){
      if(this.studio==1){
        this.src=this.studioshuju.identityCardFront,
        this.src2=this.studioshuju.identityCardVerso,
        this.src3=this.studioshuju.studioLogo,
        this.message.phone=this.studioshuju.phone,
        this.message.email=this.studioshuju.email,
        this.message.name=this.studioshuju.name,
        this.message.ID=this.studioshuju.idNumber,        
        this.message.unir=this.studioshuju.companyName,
        this.message.resume=this.studioshuju.curriculumVitae,
        this.message.studioname=this.studioshuju.studioName,
        this.message.studiointroduction=this.studioshuju.studioIntroduction,
        this.message.Sampledescription=this.studioshuju.companyProfile
      }
      //个人
      else if(this.studio==0){
        this.src=this.studioshuju.identityCardFront,
        this.src2=this.studioshuju.identityCardVerso,
        this.src3=this.studioshuju.studioLogo,
        this.message.phone=this.studioshuju.phone,
        this.message.email=this.studioshuju.email,
        this.message.name=this.studioshuju.name,
        this.message.ID=this.studioshuju.idNumber,
        this.message.unir=this.studioshuju.companyName,
        this.message.resume=this.studioshuju.curriculumVitae,
        this.message.studioname=this.studioshuju.studioName,
        this.message.studiointroduction=this.studioshuju.studioIntroduction,
        this.message.Sampledescription=this.studioshuju.descriptionOfSampleWorks
      }
    },
    changeEnglish() {
      this.$router.go(0);
    },
    getFile(e) {
      var files = e.target.files[0];
      console.log(files);
      this.file1 = files;
      let _this = this;

      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.src = this.result;
      };
    },
    getFile2(e) {
      var files = e.target.files[0];
      console.log(files);
      this.file2 = files;
      let _this = this;

      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.src2 = this.result;
      };
    },
    getFile3(e) {
      var files = e.target.files[0];
      console.log(files);
      this.file3 = files;
      let _this = this;

      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.src3 = this.result;
      };
    },
    getFile4(e) {
      console.log(1);
      var files = e.target.files[0];
      console.log(files);
      this.file4 = files;
      let _this = this;

      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        // _this.src3 = this.result
      };
    },

    RegisterStudio(e) {
      if (e == 4) {
        let self = this;
        if (this.type != 1) {
          //个人用户
          let formData = new FormData();
          formData.append("phone", self.message.phone);
          formData.append("email", self.message.email);
          formData.append("name", self.message.name);
          formData.append("idNumber", self.message.ID);
          formData.append("identityCardFront", self.message.file1);
          formData.append("identityCardVerso", self.message.file2);
          formData.append("companyName", self.message.unir);
          formData.append("curriculumVitae", self.message.resume);
          formData.append("stylistYn", 1);
          formData.append("studioLogo", self.message.file3);
          //以上是共有要传的部分
          formData.append("personalStudioYn", 1);
          formData.append("studioName", self.message.studioname);
          formData.append(
            "studioIntroduction",
            self.message.studiointroduction
          );
          formData.append("theSampleWorks", self.message.file4);
          formData.append(
            "descriptionOfSampleWorks",
            self.message.Sampledescription
          );
          let obj = {
            url: self.all.baseUrl + "/app3dDesignersAndStudiosJyg/update",
            formdata: formData
          };
          self.getData(obj).then(res => {
            console.log(res);
            if (res.data.status == 0) {
              alert("Registration successful");
            } else if (res.data.status == -95) {
              this.showJump = true;
              this.err = "Your account has expired";
              setTimeout(function() {
                self.showJump = false;
                self.err = "";
                Scroll.move();
                localStorage.clear();
                self.$router.push({
                  path: "/Login"
                });
              }, 1000);
            } else {
              this.showJump = true;
              this.err = res.data.msg;
              setTimeout(function() {
                self.showJump = false;
                self.err = "";
              }, 1500);
            }
          });
        } else {
          //企业用户
          let formData = new FormData();
          formData.append("phone", self.message.phone);
          formData.append("email", self.message.email);
          formData.append("name", self.message.name);
          formData.append("idNumber", self.message.ID);
          formData.append("identityCadFront", self.message.file1);
          formData.append("identityCardVerso", self.message.file2);
          formData.append("companyName", self.message.unir);
          formData.append("curriculumVitae", self.message.resume);
          formData.append("stylistYn", 1);
          formData.append("studioLogo", self.message.file3);
          //以上是共有要传的部分
          formData.append("businessLicense", self.message.file4);
          formData.append("companyProfile", self.message.Sampledescription);
          formData.append("corporateStudioYn", 1);
          formData.append("studioName", self.message.studioname);
          formData.append(
            "studioIntroduction",
            self.message.studiointroduction
          );
          let obj = {
            url: self.all.baseUrl + "/app3dDesignersAndStudiosJyg/update",
            formdata: formData
          };
          self.getData(obj).then(res => {
            console.log(res);
            if (res.data.status == 0) {
              alert("Registration successful");
            } else if (res.data.status == -95) {
              this.showJump = true;
              this.err = "Your account has expired";
              setTimeout(function() {
                self.showJump = false;
                self.err = "";
                Scroll.move();
                localStorage.clear();
                self.$router.push({
                  path: "/Login"
                });
              }, 1000);
            } else {
              this.showJump = true;
              this.err = res.data.msg;
              setTimeout(function() {
                self.showJump = false;
                self.err = "";
              }, 1500);
            }
          });
        }
      }
    },
    shangchuan() {
      let self = this;
      if (!/^1[3456789]\d{9}$/.test(this.message.phone)) {
        this.showJump = true;
        this.err = "The format of mobile phone number is incorrect.";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else if (this.check != 1) {
        this.showJump = true;
        this.err = "Not agreeing to the studio management law";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else if (
        this.message.phone == "" ||
        this.message.name == "" ||
        this.message.ID == "" ||
        this.file1 == "" ||
        this.file2 == "" ||
        this.file3 == "" ||
        this.file4 == "" ||
        this.message.studioname == ""
      ) {
        this.showJump = true;
        this.err = "Required items are not filled in";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else if (
        (this.file1.type != "image/jpeg" && this.file1.type != "image/png") ||
        (this.file2.type != "image/jpeg" && this.file2.type != "image/png") ||
        (this.file3.type != "image/jpeg" && this.file3.type != "image/png") ||
        (this.file4.type != "image/jpeg" && this.file4.type != "image/png")
      ) {
        this.showJump = true;
        this.err = "There is an unsupported picture format";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        //传图片
        let self = this;
        let pictrueCount = 0;
        console.log(1);
        let formData = new FormData();
        formData.append("file", self.file1);
        let obj = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj).then(res => {
          console.log(res.data.result);
          self.message.file1 = res.data.result;
          self.RegisterStudio(++pictrueCount);
        });

        formData.append("file", self.file2);
        let obj2 = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj2).then(res => {
          console.log(res.data.result);
          self.message.file2 = res.data.result;
          self.RegisterStudio(++pictrueCount);
        });

        formData.append("file", self.file3);
        let obj3 = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj3).then(res => {
          console.log(res.data.result);
          self.message.file3 = res.data.result;
          self.RegisterStudio(++pictrueCount);
        });

        formData.append("file", self.file4);
        let obj4 = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj4).then(res => {
          console.log(res.data.result);
          self.message.file4 = res.data.result;
          self.RegisterStudio(++pictrueCount);
        });
        //传图片结束
      }
    }
  },
  mounted() {
    // this.$nextTick(function() {
    // 	this.drawPie('canBox')
    // });
    // let createTime = JSON.parse(localStorage.getItem('user')).createTime;
    // if (date.getTime() < createTime + 1 * 60 * 60 * 1000) {
    // 	this.all.newTime = true;
    // }
    // if (this.all.newTime) {
    // 	this.showModel = false;
    // }
    // let createTime = JSON.parse(localStorage.getItem('user')).createTime;
    // console.log(createTime);
    this.havestudio();
    localStorage.setItem("path", "/EnStudioManagement");
    if (localStorage.getItem("English")) {
      this.$router.push({
        path: "/EnstudioManagement"
      });
    } else {
      this.$router.push({
        path: "/StudioManagement"
      });
    }
  }
};
</script>
<style scoped>
input {
  /* border-style:none; */
  width: 250px;
  height: 41px;
  border-radius: 10px;
  background-color: #ddd;
  border: 1px solid #ddd;
  text-indent: 10px;
  position: absolute;
  left: 180px;
  top: 0px;
}

textarea {
  width: 250px;
  border-radius: 10px;
  height: 185px;
  position: absolute;
  left: 180px;
  top: 30px;
}

.zhezhao {
  width: 250px;
  height: 175px;
  position: absolute;
  top: -9px;
  left: 2px;
  background-color: rgba(255, 255, 255, 0);
}

.upload {
  width: 250px;
  border-radius: 10px;
  height: 185px;
  position: absolute;
  left: 180px;
  top: 30px;
  /* background-size: 365px 185px; */
}

.upload2 {
  width: 250px;
  border-radius: 10px;
  height: 185px;
  position: absolute;
  left: 180px;
  top: 255px;
  /* background-size: 365px 185px; */
}

.upload3 {
  width: 250px;
  border-radius: 10px;
  height: 185px;
  position: absolute;
  left: 180px;
  top: 10px;
  /* background-size: 365px 185px; */
}

label {
  width: 120px;
  height: 30px;
  line-height: 30px;
  display: block;
  color: white;
  background-color: green;
  border-radius: 5px;
  text-align: center;
  margin-top: 10px;
  font-size: 12px;
}

.img-container {
  width: 250px;
  height: 185px;
  border: 1px solid grey;
  border-radius: 5px;
}

input[type="file"] {
  display: none;
  z-index: 10;
  width: 120px;
  font-size: 0;
  height: 30px;
}

.window {
  width: 1920px;
  height: 1500px;
  background-color: rgb(215, 215, 218);
}

body {
  height: 1500px;
  background-color: rgb(215, 215, 218);
}

.shuru {
  width: 1000px;
  height: 1349px;
  position: absolute;
  left: 360px;
  top: 110px;
  font-size: 15px;
  color: #050500;
  background-color: rgba(255, 255, 255, 0.85);
}

.red {
  color: #f11313;
}

.page1 {
  position: absolute;
  width: 440px;
  height: 1159px;
  left: 50px;
  top: 50px;
  border-right: 3px solid rgb(215, 215, 218);
}

.page2 {
  position: absolute;
  width: 450px;
  height: 1159px;
  left: 500px;
  top: 50px;
}

.page3 {
  position: absolute;
  width: 300px;
  height: 150px;
  bottom: 0px;
  left: 350px;
}

.page3 > button {
  width: 248px;
  height: 89px;
  color: white;
  background-color: #485765;
  border-radius: 20px;
  font-size: 25px;
  position: absolute;
  left: 26px;
  border: 0;
}

.page3 > input {
  position: absolute;
  width: 20px;
  height: 15px;
  top: 122px;
  left: 49px;
}

.page3 > span {
  font-size: 20px;
  color: #485765;
  position: absolute;
  top: 115px;
  left: 68px;
}

.page1 > div {
  width: 700px;
  height: 30px;
  text-align: left;
  margin-bottom: 41px;
  position: relative;
}

.page2 > div {
  width: 700px;
  height: 30px;
  text-align: left;
  margin-bottom: 41px;
  position: relative;
}

.studio {
  width: 244px;
  height: 1359px;
  background-color: #485765;
  color: white;
  font-size: 20px;
  text-align: center;
  position: absolute;
  left: 61px;
  top: 100px;
}

.studio > div {
  margin-top: 30px;
  height: 61px;
  line-height: 61px;
  margin-bottom: 90px;
}

.click {
  width: 264px;
  position: relative;
  left: -10px;
  background-color: #0362d7;
}
@media screen and (max-width: 1400px) {
  .shuru {
    width: 1000px;
    left: 50px;
  }
  .studio {
    display: none;
  }
}
/* @media screen and (max-width: 1750px) {
  .page1 {
    width: 600px;
  }
  .page2 {
    width: 600px;
    left: 700px;
  }
  .shuru {
    width: 1300px;
  }
  .page3 {
    left: 500px;
  }
} */
</style>
