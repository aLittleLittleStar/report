<template>
  <div class="content">
    <v-menu :menuData="menuData"></v-menu>
    <!-- search -->
    <el-row type="flex">
      <el-button class="addBtn" type="primary" @click="addChannel">创建包号</el-button>
      <el-button class="addBtn" type="primary" @click="showPackage = true">批量创建包号</el-button>
      <el-select v-model="searchInfo.customer_id" 
        @change="selectTopChange('customerList')" clearable filterable placeholder="请选择客户名称">
        <el-option label="全部(客户名称)" value=''></el-option>
        <el-option
          v-for="item in customerData"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="searchInfo.campaign_id" @change="selectTopChange('campaignList')" clearable filterable placeholder="请选择推广活动名称">
        <el-option label="全部(推广活动名称)" value=''></el-option>
        <el-option
          v-for="item in activityData"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="searchInfo.number_id" clearable filterable placeholder="请选择包号">
        <el-option label="全部(包号)" value=''></el-option>
        <el-option
          v-for="item in numberData"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
    </el-row>
    <!-- table -->
    <v-table
      :tableHead="tableHead"
      :tableData="tableData">

      <el-table-column slot="customer_link" label="客户链接" width="140">
        <template v-slot="scope">
          <span class="ellipsis_word">{{scope.row.customer_link}}</span>
          <span>
            <span>
            <el-tooltip
              :content="scope.row.customer_link" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
            </span>
          </span>
        </template>
      </el-table-column>

      <el-table-column slot="link" label="可投放链接" width="140">
        <template v-slot="scope">
          <span  class="ellipsis_word">{{scope.row.link}}</span>
          <span>
            <span>
            <el-tooltip
              :content="scope.row.link" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
            </span>
          </span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column slot="operate" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini" type="default"
            class="review"
            @click.stop="editorRow(scope.row)"
            :disabled="scope.row.status == 'removed'">修改
          </el-button>
          <el-button
            size="mini" type="default"
            class="copyRow"
            @click.stop="copyRow(scope.row)">复制
          </el-button>
          <el-button v-if="scope.row.status == 'inuse'"
            size="mini" type="default"
            class="review"
            @click="review(scope.row)">弃用
          </el-button>
          <el-button v-if="scope.row.status == 'removed'"
            class="review"
            size="mini" type="default" disabled>已弃用
          </el-button>
        </template>
      </el-table-column>
    </v-table>

    <v-page :pageInfo="pageInfo" @changePage="changePage"></v-page>

    <!-- 添加、编辑 -->
    <el-dialog :title="numberTitle" :visible.sync="showEditInfo" append-to-body
      @close="dalogClose('Info')">
      <el-form :model="Info" label-position="left" :rules="rules" ref="Info">
        <el-form-item label="客户名称" :label-width="formLabelWidth" prop="customer_id">
          <el-select v-model="Info.customer_id" clearable filterable placeholder="请选择客户名称" @change="getCampaignList(true)" :disabled="isEditInfo">
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推广活动名称" :label-width="formLabelWidth" prop="campaign_id">
          <el-select v-model="Info.campaign_id" clearable filterable placeholder="请选择推广活动名称" :disabled="isEditInfo">
            <el-option
              v-for="item in allActivityData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="包号" :label-width="formLabelWidth" prop="name">
          <el-input v-model.trim="Info.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户链接" :label-width="formLabelWidth" prop="customer_link">
          <el-input v-model.trim="Info.customer_link" clearable></el-input>
        </el-form-item>
        <el-form-item label="可投放链接" :label-width="formLabelWidth" prop="link">
          <el-input v-model.trim="Info.link" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveEditInfo('Info')">保 存</el-button>
        <el-button @click="closeAddDalog">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 批量添加 -->
    <el-dialog title="批量添加包号" :visible.sync="showPackage" append-to-body
      @close="dalogPkgClose('InfoPkg')" width="70%">
      <el-form :model="InfoPkg" label-position="right" :rules="rulesPkg" ref="InfoPkg">
        <el-form-item label="客户名称：" :label-width="formLabelWidth" prop="customer_id">
          <!-- false:非复制 true-批量创建 -->
          <el-select v-model="InfoPkg.customer_id" clearable filterable placeholder="请选择客户名称" @change="getCampaignList(true,true)" :disabled="isEditInfo">
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推广活动名称：" :label-width="formLabelWidth" prop="campaign_id">
          <el-select v-model="InfoPkg.campaign_id" clearable filterable placeholder="请选择推广活动名称" :disabled="isEditInfo">
            <el-option
              v-for="item in allActivityData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="包名 客户链接 可投放链接：" :label-width="formLabelWidth" prop="pkgs">
          <el-input v-model="InfoPkg.pkgs" rows="12" type="textarea" clearable placeholder="支持多行批量导入，每行一条链接 ，文本格式样例 ：  包名 客户链接 可投放链接。 不同字段之间用空格分隔"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savePkgInfo('InfoPkg')">保 存</el-button>
        <el-button @click="closePkgDalog">取 消</el-button>
      </div>
    </el-dialog>

    

  </div>
</template>
<script>
import vTable from "@/components/Table.vue";
import vPage from "../../components/Page.vue";
import vMenu from "../../components/menubread.vue";
import {setPackage, getPackageList, getCustomerList, getCampaignList, removePackage, savePkgInfo} from "../../request/api.js";
export default {
  components:{
    vTable, vMenu, vPage
  },
  data () {
    let regex = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'
    let re = new RegExp(regex)
    let validateCustomerLink = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入客户链接'))
      } else {
        if (!re.test(value)) {
          callback(new Error('请输入正确格式的客户链接'))
        }
        callback()
      }
    }
    let validateLink = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入可投放链接'))
      } else {
        if (!re.test(value)) {
          callback(new Error('请输入正确格式的可投放链接'))
        }
        callback()
      }
    }
    return {
      // base
      menuData:[{id:1,name:'基础数据管理',path:''},{id:2,name:'包号管理',path:''}],
      pageInfo:{page:1,limit:30,count:0},
      tableHead:[
        {id:1,prop:"id",label:"包号ID",width:"70"},
        {id:2,prop:"customer_name",label:"客户名称",width:"auto"},
        {id:3,prop:"campaign_name",label:"推广活动名称",width:"auto"},
        {id:4,prop:"name",label:"包号",width:"auto"},
        { slot: "customer_link",width:"auto",type:'tooltip'},
        { slot: "link",width:"auto",type:'tooltip'},
        {id:7,prop:"createtime",label:"创建时间",width:"auto"},
        {id:8,prop:"updatetime",label:"更新时间",width:"auto"},
        { slot: "operate",showDialog:'showEditInfo'},
      ],
      datas: {
        sel: null, // 选中行
        dataInfo: []
      },
      tableData: [],
      searchInfo:{customer_id: '',campaign_id: '',number_id: '',},
      customerData: [],
      activityData: [],
      numberData: [],

      customerList:[], // 添加包号的搜索框列表数据
      allActivityData:[],
      

      showEditInfo: false,
      formLabelWidth: '120px',
      isEditInfo: false, // 区分是否是修改【如果为修改 客户名称及推广活动不可进行修改】
      numberTitle: "",
      Info: {id: '', customer_link: '',link:'',customer_id:'',campaign_id:'', name: ''},
      rules: {
        customer_id: [{ required: true, message: '请选择客户名称', trigger: 'change' }],
        campaign_id: [{ required: true, message: '请选择推广活动名称', trigger: 'change' }],
        name: [{ required: true, message: '请输入包号', trigger: 'blur' }],
        customer_link: [{ required: true, validator: validateCustomerLink, trigger: 'blur' }],
        link: [{ required: true, validator: validateLink, trigger: 'blur' }]
      },
      // 批量添加
      showPackage:false,
      InfoPkg:{customer_id:'',campaign_id:'', pkgs: ''},
      rulesPkg: {
        customer_id: [{ required: true, message: '请选择客户名称', trigger: 'change' }],
        campaign_id: [{ required: true, message: '请选择推广活动名称', trigger: 'change' }],
        pkgs: [{ required: true, message: '请选择推广活动名称', trigger: 'change' }],
      },
    }
  },
  methods:{
    getDataList:function(){
      let search = '?paging=1&status=all&page='+this.pageInfo.page+"&pagesize="+this.pageInfo.limit;
      // 客户名称
      if(this.searchInfo.customer_id) {
        search += '&customer_id='+this.searchInfo.customer_id;
      }
      if(this.searchInfo.campaign_id) {
        search += '&campaign_id='+this.searchInfo.campaign_id;
      }
      if(this.searchInfo.number_id) {
        search += '&id='+this.searchInfo.number_id;
      }
      getPackageList(search).then(res=>{
        if(res.code == 0){
          this.tableData = res.data.data;
          this.pageInfo.count = res.data.total;
        }
      }).catch(err => {
        this.$showMessage('error', err.message)
      });
    },
    // 分页
    changePage:function(pageInfo){
      this.pageInfo = pageInfo;
      this.getDataList();
    },
    // 搜索
    search:function(){
      this.pageInfo.page = 1;
      this.getDataList();
    },
    // 筛选--顶部
    selectTopChange:function(name){
      let search = '?status=all';
      if(name == 'customerList'){
        let customer_id = this.searchInfo.customer_id;
        customer_id ? search +=`&customer_id=${customer_id}` : '';
        this.searchInfo.activity_id = '';
        getCampaignList(search).then(res=>{
          this.activityData = res.data;
          this.searchInfo.campaign_id = ''
          this.searchInfo.number_id = ''
        }).catch(err => {
          this.$showMessage('error', err.message)
        });
        getPackageList(search).then(res=>{
          this.numberData = res.data;
        }).catch(err => {
          this.$showMessage('error', err.message)
        });
      }else if(name == 'campaignList'){
        if (this.searchInfo.campaign_id) {
          search +=`&campaign_id=${this.searchInfo.campaign_id}`
        } else {
          this.searchInfo.customer_id ? search +=`&customer_id=${this.searchInfo.customer_id}` : ''
        }
        this.searchInfo.number_id = '';
        getPackageList(search).then(res=>{
          this.numberData = res.data;
        }).catch(err => {
          this.$showMessage('error', err.message)
        });
      }
    },

    // 获取下拉初始数据
    getCustomerList:function(){
      getCustomerList('').then(res=>{
        if(res.code == 0){
          this.customerData = res.data;
          this.customerList = res.data;
        }
      }).catch(err => {
        this.$showMessage('error', err.message)
      });
    },
    getActivityList:function(){
      let search=`?status=all`
      // 活动 包含已弃用的
      getCampaignList(search).then(res=>{
        if(res.code == 0){
          this.activityData = res.data;
        }
      }).catch(err => {
        this.$showMessage('error', err.message)
      });
    },
    getNumberList() {
      let search = '?status=all'
      getPackageList(search).then(res=>{
        if(res.code == 0){
          this.numberData = res.data;
        }
      }).catch(err => {
        this.$showMessage('error', err.message)
      });
    },
    
    // 活动-信息下拉
    getCampaignList(selectChange,pkg) {
      let search = '?customer_id='+this.Info.customer_id
      pkg?search = '?customer_id='+this.InfoPkg.customer_id:'';
      if(selectChange){
        this.Info.campaign_id = '';
        this.InfoPkg.campaign_id = '';
      }
      getCampaignList(search).then(res=>{
        this.allActivityData = res.data;
      }).catch(err => {
        this.$showMessage('error', err.message)
      });
    },
    
    // 保存修改信息
    saveEditInfo(formName) {
      let data = JSON.parse(JSON.stringify(this.Info));
      let msg = "修改包号成功";
      console.log("this.Info:", this.Info);
      if (!this.Info.id) {
        delete data.id
        msg = "添加包号成功";
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setPackage(data).then(res=>{
            // 添加 / 修改包号信息成功
            this.showEditInfo = false;
            this.$showMessage('success', msg)
            this.getDataList()
            this.getNumberList();
          }).catch(err => {
            this.$showMessage('error', err.message)
          });
        }
      })
    },
    savePkgInfo(formName) {
      // 点击创建包号的时候 获取推广活动列表
      this.$refs[formName].validate((valid) => {
        if (valid) {
          savePkgInfo(this.InfoPkg).then(res=>{
            this.showPackage = false;
            this.$showMessage('success', '操作成功')
            this.getDataList()
            this.getNumberList();
          }).catch(err => {
            this.$showMessage('error', err.message)
          });
        }
      })
    },
    // 添加包号
    addChannel() {
      this.numberTitle = "创建包号";
      this.showEditInfo = true;
      this.isEditInfo = false;
      this.Info = {id: '', customer_link: '',link:'',customer_id:'',campaign_id:'', name: ''}
      // 点击创建包号的时候 获取推广活动列表
      getCampaignList('').then(res=>{
        if(res.code == 0){
          this.allActivityData = JSON.parse(JSON.stringify(res.data));
        }
      }).catch(err => {
        this.$showMessage('error', err.message)
      });
    },
    
    
    // 关闭弹框
    closeAddDalog() {
      this.showEditInfo = false;
      this.isEditInfo = false;
    },
    closePkgDalog() {
      this.showPackage = false;
    },
    // 显示修改信息弹框
    showDialog(info, type) {
      this[type] = true;
      this.Info = JSON.parse(JSON.stringify(info))
      console.log("this.Info:", this.Info);
    },
    // 清空弹框数据
    dalogClose:function(formName){
      this.$refs[formName].resetFields();
      this.showEditInfo = false;
    },
    dalogPkgClose:function(formName){
      this.$refs[formName].resetFields();
      this.showPackage = false;
    },
    // 复制
    copyRow(row){
      this.numberTitle = "创建包号";
      let newRow = JSON.parse(JSON.stringify(row));
      console.log("newRow:", newRow)
      newRow.id = '';
      this.Info = newRow
      this.getCampaignList();
      console.log("this.Info:", this.Info);
      if (this.Info.status == 'removed') {
        this.Info.name = ''
      }
      if (newRow.campaign_status != 'inuse') {
        this.Info.campaign_id = ''
      }
      this.showEditInfo = true;
      this.isEditInfo = false;
    },
    review(info){
      this.$confirm('确定要弃用该包号吗？','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Info = {
          id: info.id
        }
        removePackage(this.Info).then(res=>{
          if(res.code == 0){
            this.$showMessage('success', '弃用成功')
            this.getDataList();
          }
        }).catch(err => {
          this.$showMessage('error', err.message)
        });
      }).catch(() => {
        this.$showMessage('info', '已取消解弃用。')
      });
    },
    // 修改
    editorRow(info) {
      this.numberTitle = "修改包号";
      this.showEditInfo = true;
      console.log("info:", info);
      this.isEditInfo = true;
      this.Info = JSON.parse(JSON.stringify(info));
      this.getCampaignList();
    }
  },
  mounted(){
    this.$store.commit('updateMenu','/numberList')
    if (this.$route.query.customer_id) { //客户
      this.searchInfo.customer_id = parseInt(this.$route.query.customer_id)
    }
    if(this.$route.query.campaign_id) { // 活动
      this.searchInfo.campaign_id = parseInt(this.$route.query.campaign_id)
    }
    this.getDataList();

    this.getCustomerList();
    this.getActivityList();
    this.getNumberList();
  }
}
</script>

<style scoped>
.addBtn{margin-right:16px;}
.el-select{margin-right:8px;}
.el-range-editor.el-input__inner{margin-right:8px;}
.ellipsis_word{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 50px;display: inline-block;}
.copyRow{margin: 6px 0;}
.review{margin-left: 0px;}
</style>
