<template>
  <div class="content">
    <v-menu :menuData="menuData"></v-menu>

    <!-- search 搜索 -->
    <el-row type="flex" class="row-bg">
      <el-date-picker
        v-model="searchInfo.month"
        type="month"
        placeholder="选择月"
        format="yyyy/MM">
      </el-date-picker>
      <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
    </el-row>

    <!-- export 导出报表 -->
    <el-row type="flex" class="row-bg addFlodwarp">
      <el-button size="mini" type="primary" @click="exportFile()">导出报表</el-button>
    </el-row>

    <!-- table 表格 -->
    <el-table size="mini" :row-key="getRowKeys" :data="datas.data" border style="width: 100%" 
      @selection-change="handleSelectionChange"
      highlight-current-row>
      <el-table-column type="selection" v-if="datas.jiti_status !== 'confirmed'" 
        width="55" fixed='left'></el-table-column>
      <el-table-column v-for="(item,index) in datas.columns" 
        :label="item.label" 
        :prop="item.prop" 
        :fixed='item.fixed'
        :width="item.width">
        <template slot-scope="scope">
          <!-- status:inuse/confirmed(不可修改) -->
          
          <!-- select 数据提供人 -->
          <div  v-if="item.select && datas.jiti_status !== 'confirmed'">

            <!-- edit -->
            <div v-if="scope.row.isSet && scope.row.isSet == item.select">
              <el-select v-model="datas.sel[item.propId]" 
                filterable :placeholder="item.label">
                <el-option
                  v-for="item in datas[item.select]"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  >
                </el-option>
              </el-select>
              <span class="el-tag el-tag--success el-tag--mini" style="cursor: pointer;" 
                @click.stop="saveData(scope.row,scope.$index,item.propId)">保存</span>
              <span class="el-tag el-tag--default el-tag--mini" style="cursor: pointer;" 
                @click.stop="calcelInput(scope.row,scope.$index,datas.data)">取消</span>
            </div>
            <div v-else>
              <span>{{scope.row[item.prop] || '暂无'}}</span>
              <span class="el-tag el-tag--primary el-tag--mini" style="cursor: pointer;" 
                @click.stop="editInput(scope.row,scope.$index,item.select)">修改</span>
            </div>
          </div>

          <!-- input 用户输入 数字类型（核减-收入,成本,激活量）-->
          <div  v-else-if="item.input && datas.jiti_status !== 'confirmed'">
            <!-- edit -->
            <div v-if="scope.row.isSet && scope.row.isSet == item.input">
              <el-input size="mini" placeholder="请输入内容" type='number' v-model="datas.sel[item.prop]">
              </el-input>
              <span class="el-tag el-tag--success el-tag--mini" style="cursor: pointer;" 
                @click.stop="saveData(scope.row,scope.$index,item.prop)">保存</span>
              <span class="el-tag el-tag--default el-tag--mini" style="cursor: pointer;" 
                @click.stop="calcelInput(scope.row,scope.$index,datas.data)">取消</span>
            </div>
            <div v-else>
              <span>{{scope.row[item.prop]}}</span>
              <span class="el-tag el-tag--primary el-tag--mini" style="cursor: pointer;" 
               @click.stop="editInput(scope.row,scope.$index,item.input)">修改</span>

            </div>
          </div>

          <!-- radio 回款 开票-->
          <div  v-else-if="item.radio && datas.jiti_status !== 'confirmed'">
            <el-radio v-model="scope.row[item.prop]" label="yes"
              @click.native.prevent="saveRadioData(scope.row,scope.$index,item.prop,'yes')">是</el-radio>
            <el-radio v-model="scope.row[item.prop]" label="no"
              @click.native.prevent="saveRadioData(scope.row,scope.$index,item.prop,'no')">否</el-radio>
          </div>

          <!-- text 文本展示 -->
          <span v-else-if="item.filter&&item.filter=='filterCustomerType'"> 
            {{scope.row[item.prop] | filterCustomerType}}
          </span>
          <!-- text 文本展示 -->
          <span v-else-if="item.filter&&item.filter=='filterRadioType'"> 
            {{scope.row[item.prop] | filterRadioType}}
          </span>
          <div  v-else>
            {{scope.row[item.prop]}}
          </div>

        </template>
      </el-table-column>
     
    </el-table>

    <!-- operate 批量操作-->
    <el-row type="flex" class="row-bg" v-if="datas.jiti_status !== 'confirmed'" >
      <el-button size="mini" type="primary" @click="operateSelect('money_invoice','all')">已回款 , 已开票</el-button>
      <el-button size="mini" type="primary" @click="operateSelect('money_invoice','money')">已回款 , 未开票</el-button>
    </el-row>
    <el-row type="flex" class="row-bg" justify="end" v-if="datas.jiti_status !== 'confirmed'" >
      <el-button size="mini" type="primary" @click="operateJiti('confirm')">生成计提</el-button>
      <el-button size="mini" type="primary" @click="operateJiti('reset')">重置</el-button>
    </el-row>
    

  </div>
</template>
<script>
import vMenu from "../../components/menubread.vue";
import moment from 'moment';
import {getReportList, getStaffList, editData, editJiti} from '../../request/api.js'
export default {
  components:{ vMenu },
  data () {
    return {
      // base
      menuData:[{id:1, name:'数据报表', path:''},{id:2, name:'计提报表', path:''}],
      searchInfo:{month:''},
      datas:{
        sel: null, //编辑行数据   
        columns:[
          { prop:"customer_type", label:"客户属性", width: 80 ,filter:"filterCustomerType",fixed:true,},  //agency 代理 normal 直客
          { prop: "data_stuff_name", label: "数据提供人", width: 120, select:'staffList', propId:"data_stuff_id",fixed:true,},
          { prop: "customer_name", label: "客户公司名称", width: 120,fixed:true,},
          { prop: "campaign_name", label: "推广活动名称", width: 120,fixed:true,},
          { prop: "package_name", label: "包名", width: 120,fixed:true,},
          { prop: "staff_name", label: "负责人", width: 120,fixed:true,},
          { prop: "channel_name", label: "投放渠道", width: 120, text:true,fixed:true,},
          { prop: "shortname", label: "投放渠道简称", width: 120,fixed:true,},

          { prop: "deliv_num", label: "投放数量", width: 'auto'},
          { prop: "income_price", label: "收入单价", width: 'auto'},
          { prop: "rebated_income", label: "扣除返点后金额（人民币）（财务入账）最终", width: '180'},
          { prop: "examed_income", label: "核减后收入", width: 120,input:'examed_income'},
          { prop: "payee", label: "收款方", width: 'auto'},
          { prop: "act_num", label: "激活量", width: 'auto'},
          { prop: "examed_activation", label: "核减后激活量", width: 120,input:'examed_activation'},
          { prop: "cost_price", label: "成本单价", width: 'auto'},
          { prop: "rebated_cost", label: "最终扣除返点后金额（人民币）（财务入账）", width: '180'},
          { prop: "examed_cost", label: "核减后成本", width: 120,input:'examed_cost'},
          { prop: "money_return", label: "是否回款", width: 150,radio:'money_return' ,filter:"filterRadioType"},
          { prop: "invoice", label: "是否开票", width: 150,radio:'invoice' ,filter:"filterRadioType"}
        ],
        data:[
        ],
        jiti_status:'inuse', //inuse：未计提，confirmed：已计提
        staffList:[]  //数据提供人列表
      },
      multipleSelection:[]  //多选checkbox
    }
  },
  methods:{
    getRowKeys(row) {
      return row.id;
    },
    getDataList:function(){
      var month = this.$moment(this.searchInfo.month).format('YYYY/MM')
      let search = '?month='+month;
      getReportList(search).then(res=>{
        if(res.code == 0){
          this.datas.data = res.data;
          this.datas.jiti_status = res.jiti_status;
        }
      }).catch(err => {
        this.$showMessage('error',err.message)
      });
    },
    // search
    search:function(){
      this.searchInfo.page = 1;
      this.getDataList();
    },
    // 导出报表
    exportFile:function(){
      var month = this.$moment(this.searchInfo.month).format('YYYY/MM')
      let search = '?month='+month+"&export=export";
      this.$downFlie('/jiti/report'+search);
    },
    // 获取数据提供人列表
    getStaffList:function(){
      getStaffList('').then(res=>{
        if(res.code == 0){
          this.datas.staffList = res.data
        }
      }).catch(err => {
        this.$showMessage('error',err.message)
      });
    },
    editInput(row,index,type) { //编辑
      for (let i of this.datas.data) {
       if (i.isSet) return this.$message.warning(`请先保存当前编辑项`);
      }
      this.datas.sel = JSON.parse(JSON.stringify(row));
      row.isSet = type
      this.$set(this.datas.data, index, row);
    },
    calcelInput(row, index, rows) { //取消
      row.isSet = false;
      this.$set(this.datas.data, index, row);
    },
    // 输入选择操作保存数据
    saveData(row, index, skey) { //保存--数据
      let data = JSON.parse(JSON.stringify(this.datas.sel));
      for (let k in data) {
        row[k] = data[k] 
      }
      row.isSet = false;
      this.$set(this.datas.data, index, row);
      
      var savedata  = {}
      savedata.skey = skey;
      console.log(data)
      savedata.sval = data[skey];
      savedata.ids = [data.id]
      this.editData(savedata);
    },
    // 回款 开票-操作
    saveRadioData(row, index, skey,value){
      row[skey] = value;
      this.$set(this.datas.data, index, row);
            console.log(row[skey])
      var savedata  = {}
      savedata.skey = skey;
      savedata.sval = value;
      savedata.ids = [row.id]
      this.editData(savedata);
    },
    // 保存数据--调用接口
    editData:function(savedata){
      editData(savedata).then(res=>{
        if(res.code == 0){
          this.getDataList();
          this.$showMessage('success','修改成功！')
        }
      }).catch(err => {
        this.$showMessage('error',err.message)
      });
    },
    // 回款 开票--复选框选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },
    // 回款 开票 --批量操作
    operateSelect(skey,sval){
      let ids = [];
      this.multipleSelection.forEach(item=>{
        ids.push(item.id+'');
      })
      if(ids.length<=0){
        this.$showMessage('error','请勾选表格前面对应的复选框！')
        return;
      }
      let savedata  = {skey:skey, sval:sval, ids:ids}
      this.editData(savedata);
    },
    // 生成计提，重置
    operateJiti(type){
      let month = this.$moment(this.searchInfo.month).format('YYYY/MM');
      let savedata  = {month:month, type:type};
      editJiti(savedata).then(res=>{
        if(res.code == 0){
          this.getDataList();
          this.$showMessage('success','操作成功！')
        }
      }).catch(err => {
        this.$showMessage('error',err.message)
      });
    }
    
  },
  mounted(){
    this.searchInfo.month = moment().subtract(0,'month');
    this.getDataList();
    this.getStaffList();
    this.$store.commit('updateMenu','/reportList')
  }
}
</script>

<style lang="stylus" scoped>
.el-table
  margin-bottom:12px
.addBtn
  margin-right:16px
.el-select
  margin-right:8px
.el-range-editor.el-input__inner,.el-date-editor.el-input, .el-date-editor.el-input__inner
  margin-right:8px
.row-bg.el-row--flex
  margin-bottom:12px
.el-table >>> .el-table__empty-block
  justify-content:flex-start
.el-table >>> .el-table__empty-text
  text-align:left;
  margin-left:12px;
</style>
