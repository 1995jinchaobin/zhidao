<template>
  <div class="window">
    <Enstudiotap @showEnglish="changeEnglish" :tabIndex="tabIndex"></Enstudiotap>
    <div class="studio">
      <div @click="qiehuan(0)" :class="type==0?'click':''">Standard design</div>
      <div @click="qiehuan(1)" :class="type==1?'click':''">Regulations on studio management</div>
      <div @click="qiehuan(2)" :class="type==2?'click':''">Disclaimer statement</div>
      <div @click="qiehuan(3)" :class="type==3?'click':''">Designer's note</div>
    </div>
    <div class="shuru" v-if="type==0">
      <h2 style="maigin:auto">Specification for Material Pattern Design and Upload</h2>
      <div>
        <span style="font-size:20px">General</span>
        <br />1.Plagiarism is strictly prohibited
        <br />2.It is strictly prohibited to upload other people's works without authorization.
      </div>
      <img width="620" height="803" src="../../assets/image/studio/guanli2.jpg" alt />
      <div>
        1. Guan Yu picture：
        <br />1.1 The uploaded materials and pattern pictures should be clear and beautiful, able to fully distinguish the contents of the pictures, without watermarks, QQ WeChat mobile phone numbers and other contact methods, and the weaving channel will generate a platform uniform watermark to protect the rights of the studio;
        <br />1.2 The content of the uploaded pictures must conform to the laws and regulations of the People's Republic of China, and shall not be illegal or contain any bad information, such as those suspected of pornography, violence, reaction, disclosure of state secrets or any content that conflicts with the laws and regulations of the State, and shall not be approved.
        <br />1.3 The uploaded pictures shall not contain registered trademarks or company names, so as not to infringe others' trademark rights and name rights;
        <br />1.4 The uploaded pictures shall not contain RMB patterns;
        <br />1.5 The uploaded pictures shall not include works that others enjoy intellectual property rights, such as banning famous cartoon images such as Pleasant Goat and Logger Vick.
        <br />1.6 No advertisement information can be added to uploaded pictures;
        <br />The uploaded material shall not duplicate the current material of the weaving platform, otherwise it will not be approved
        <br />2. About PSD source files:：
        <br />2.1 PSD source files of uploaded patterns and detailed pattern pictures should be unified, otherwise they will not be approved:;
        <br />2.2 The uploaded pattern is a layered PSD format material. The clarity under the actual pixel of the source file must be ensured, and the size or resolution cannot be intentionally enlarged.
        <br />2.3 The uploaded pattern source file must not affect the use of the picture downloader (e.g. error in the source file, reading of composite layer, damage, lack of data, etc.), otherwise, the studio needs to upload the valid file again or refund the transaction fee, and negotiate compensation with the buyer.
      </div>
    </div>
    <div class="shuru" v-if="type==1">
      <h2 style="maigin:auto">Regulations on studio management</h2>
      <br />
      <br />
      <br />

      <div>
        <span style="font-size:20px">I. general remarks</span>
        <br />In order to maintain the normal operation order of the weaving platform, protect the legitimate rights and interests of weaving users and realize the standardized operation of designer studios, these Provisions are formulated in accordance with the national laws and regulations and the relevant agreements and rules of the weaving platform.
        <br />
        <br />
        <span style="font-size:20px">II. Regulations on Handling Violations</span>
        <br />1. the studio will use other people's works as its own original works or works infringing other people's copyright for sale. after verification, the work will be deleted and the studio will be closed permanently. Upon the application of the obligee, the weaving platform has the right to make advance compensation with the funds in the studio account in accordance with relevant laws and regulations.
<br />2. if the materials and patterns sold by the studio have problems of returning, clarity, irrelevant contents and non-standard layering, upon complaint, the studio needs to modify them as required and re-upload the modified pictures and PSD source files to the platform within 24 hours. if the modified products still have problems that cannot be effectively used, the purchaser has the right to request a refund.
<br />3. QQ, telephone number, etc. shall not appear in the original materials sold by the studio, pattern page information (including previews, parameter descriptions, etc.) and source files (including layer names, external links, and other forms of description in the compression package).
E-mail and other contact information, such as the discovery of such works will not provide services or delete directly, more than 3 times the prompt does not change, hidden studio for 1 month, while freezing the balance for 1 month.
<br />4. If the studio privately trades the original selling pattern uploaded to the weaving platform with the pattern buyer, maliciously avoids the weaving platform, or fails to cooperate with the customer service personnel to help the buyer solve the file problem, the studio will pay 2-5 times the trading commission of the weaving platform as compensation. If the compensation amount is lower than 50 yuan, the studio shall pay 50 yuan as compensation to the weaving platform, and freeze the balance or seal the number according to the seriousness of the case.
<br />5. those who reprint original materials and patterns published by other studios of the weaving channel platform (the reprinted studios are only published on the weaving channel platform) to other websites for others to download (free of charge and for a fee) will be treated as titles once discovered.
<br />6. download the shared materials of the weaving platform or the original materials of the studio and upload them to the weaving platform for sale. once found, delete the files and give a warning. if you do not change them for more than 3 times, hide the store for 1 month and freeze the balance for 1 month at the same time.
<br />7. download the original materials and patterns of weavers for use in/for making pirated copies for sale, and seal them once found.
<br />8. if the transaction fails due to human factors in the studio, after receiving the complaint from the material pattern buyer and confirming the fact, the studio shall compensate for the loss of the trading commission portion of the weaving platform (30% of the transaction amount) in addition to returning the income from the studio to the buyer. The transaction fails due to human factors in the studio, including but not limited to the following circumstances:
<br/> a. the format, return, definition, pixel size and color pattern of the original selling pattern are seriously different from the description of the studio;
<br />b the resolution and pixel size of the original selling pattern are consistent with the page display, but the actual pixels are obviously blurred;
<br/> c. merging or layering of original pattern PSD source files is seriously imprecise, resulting in works that cannot be used by buyers; D the preview map should be consistent with the source file (appropriate modification is allowed on the premise of not affecting the buyer's use). if there is serious discrepancy, the buyer of the work cannot use it;
<br/> e. when the pattern PSD source file is wrong and the buyer still needs the file after the complaint, it fails to send the file to the buyer in time;
<br/> f. layered original sale pattern shall ensure that each layered picture is relatively clear. vector format files containing bitmaps shall indicate the resolution and size of main bitmaps, which cannot be used normally after the buyer downloads due to unclear description.
        <br />
        <br />
        <span style="font-size:20px">III. Supplementary Provisions</span>
        <br />1. The weaving platform can adjust these management regulations at any time according to the platform's operation and publicize them to the studio in the form of announcement; When the studio entered the weaving channel, it accepted the management rules that the weaving channel adjusted and promulgated from time to time.
        <br />2.The studio shall abide by national laws, administrative regulations, departmental rules and other normative documents. For any suspected violation of national laws, administrative regulations, departmental rules and other normative documents, these rules shall apply to the provisions of these rules. If there is no provision in these rules, weaving lanes have the right to handle it at their discretion.
        <br />3.This regulation was formulated on March 5, 2019 and will take effect on March 20, 2019
      </div>
    </div>
    <div class="shuru" v-if="type==2">
      <h2 style="maigin:auto">Disclaimer</h2>
    </div>
    <div class="shuru" v-if="type==3">
      <h2 style="maigin:auto">Designer Channel Description</h2><br /><br />
      <div style="text-indent:2em">Designer Channel is the workbench of designers (studios), including studio management, material management, pattern management, transaction management, revenue and expenditure details and other major functions, focusing on fast and convenient commodity management.</div>
      <div style="text-indent:2em">It is free for individuals or enterprises to open studios on the weaving platform. After an individual or enterprise opens a studio, it can upload original materials and patterns. The studio will set its own price according to market price or other standards. After the materials and patterns are sold, the weaving platform will charge a commission of 30% of the transaction amount. In the interim, the original materials are uniformly placed in the original materials of the user channel pattern design module, and cannot be traded separately. After users use the element to design patterns and purchase them, they will charge 30% of the transaction price as commission according to the price of the materials themselves. For example, if a customer uses an original material with a price of 10 yuan after designing the pattern, the customer needs to pay 10 yuan for the pattern and 10 yuan for the mid-term original material, then the weaving platform obtains 3 yuan commission and the studio of the original material obtains 7 yuan. The original pattern is sold in the shop of the studio and traded separately. Users purchase the original pattern and the weaving platform will charge a commission of 30% of the transaction price of the pattern. The income obtained by the studio can be applied for settlement. 100 yuan starts to withdraw cash. After initiating the application for settlement, it will arrive at the bound bank account within 3-7 working days.</div>
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
  name: "Regulations",
  components: {
    Enstudiotap,
    Loading,
    Jump
  },
  data() {
    return {
      showJump: false,
      tabIndex: 5,
      showLoading: false,
      type: 0
    };
  },
  methods: {
    changeEnglish() {
      this.$router.go(0);
    },
    qiehuan(e) {
      this.type = e;
    }
  },
  mounted() {
    // this.$nextTick(function() {
    //   this.drawPie("canBox");
    // });
    // let createTime = JSON.parse(localStorage.getItem("user")).createTime;
    // if (date.getTime() < createTime + 1 * 60 * 60 * 1000) {
    //   this.all.newTime = true;
    // }
    // if (this.all.newTime) {
    //   this.showModel = false;
    // }
    localStorage.setItem("path", "/EnRegulations");
    if (localStorage.getItem("English")) {
      this.$router.push({
        path: "/EnRegulations"
      });
    } else {
      this.$router.push({
        path: "/Regulations"
      });
    }
  }
};
</script>
<style scoped>
.window {
  width: 1920px;
  height: 1500px;
  background-color: rgb(215, 215, 218);
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
.shuru {
  width: 900px;
  height: 1249px;
  padding: 50px;
  position: absolute;
  left: 360px;
  top: 110px;
  font-size: 12px;
  color: #050500;
  background-color: rgba(255, 255, 255, 0.85);
}
.studio > div {
  margin-top: 30px;
  height: 61px;
  line-height: 61px;
  margin-bottom: 90px;
}
.shuru > div {
  width: 700px;
  height: 30px;
  text-align: left;
  margin-bottom: 41px;
  position: relative;
  margin-left: 100px;
}
.click {
  width: 264px;
  position: relative;
  left: -10px;
  background-color: #0362d7;
}
@media screen and (max-width: 1400px) {
  .shuru {
    width: 900px;
    left: 50px;
  }
  .studio {
    display: none;
  }
}
</style>
