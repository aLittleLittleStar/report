<template>
  <div class="content">
    <v-menu :menuData="menuData"></v-menu>
    <!-- search 搜索 -->
    <el-row type="flex" class="row-bg" justify="space-between">
      <div>
        <el-button :disabled="datas.jiti_status === 'confirmed'" size="mini" type="primary" @click="addRow(datas.data)">添加数据</el-button>
        <el-button :disabled="datas.jiti_status === 'confirmed'" size="mini" type="primary" @click="createData">创建新数据</el-button>
      </div>
      <div>
        <el-button size="mini" type="primary" @click="batchReuse">批量复用到下个月</el-button>
        <el-button size="mini" type="primary" @click="exportFile()">导出报表</el-button>
      </div>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-select v-model="searchInfo.customer_id" 
        @change="selectChangeTop('customerList')" filterable placeholder="客户公司名称">
        <el-option label="客户公司名称(全部)" value=''></el-option>
        <el-option
          v-for="item in selectsTop.customerList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          >
        </el-option>
      </el-select>
      <el-select v-model="searchInfo.campaign_id" 
        @change="selectChangeTop('campaignList')" filterable placeholder="推广活动名称">
        <el-option label="推广活动名称(全部)" value=''></el-option>
        <el-option
          v-for="item in selectsTop.campaignList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          >
        </el-option>
      </el-select>
      <el-select v-model="searchInfo.package_id" filterable placeholder="包名">
        <el-option label="包名(全部)" value=''></el-option>
        <el-option
          v-for="item in selectsTop.packageList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="searchInfo.channel_id" filterable placeholder="投放渠道公司全称">
        <el-option label="投放渠道简称(全部)" value=''></el-option>
        <el-option
          v-for="item in selectsTop.channelList"
          :key="item.id"
          :label="item.shortname"
          :value="item.id">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="searchInfo.month"
        type="month"
        placeholder="选择月"
        format="yyyy/MM">
      </el-date-picker>
      <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
    </el-row>

    <!-- 包裹表格 处理为自适应填充剩余高度 -->
    <div class="tabWarp">
      <!-- table 表格 -->
      <el-table size="mini" :row-key="getRowKeys" :data="datas.data" border style="width: 100%" highlight-current-row :height="tableHeight" ref="tableDataRef" @selection-change="handleSelectionChange">

        <el-table-column type="selection"  
          width="55" fixed='left'></el-table-column>
        <el-table-column type="index" :fixed='true'></el-table-column>
        <!-- content 内容部分 -->
        <el-table-column v-for="(item,index) in datas.columns" :fixed='item.fixed'
          :label="item.label" :prop="item.prop" :width="item.width">
          <template slot-scope="scope">
            
            <!-- edit -->
            <div v-if="scope.row.isSet">

              <!-- date-picker -->
              <div  v-if="item.datepicker">
                <el-date-picker
                  v-model="datas.sel[item.prop]"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy/MM/dd"
                  value-format="yyyy/MM/dd"
                  @change="datepickerChange(scope.row,item.prop)">
                </el-date-picker>
              </div>
              <!-- select -->
              <div  v-else-if="item.select">
                <!-- 指定label -->
                <el-select v-model="datas.sel[item.propId]" v-if="item.propName"
                  @change="selectChange(item.select,item.propId)"
                  filterable :placeholder="item.label">
                  <el-option 
                    v-for="sitem in selects[item.select]"
                    :key="sitem.id"
                    :label="sitem[item.propName]"
                    :value="sitem.id"
                    >
                  </el-option>
                </el-select>
                <el-select v-model="datas.sel[item.propId]" v-else
                  @change="selectChange(item.select,item.propId)"
                  filterable :placeholder="item.label">
                  <el-option 
                    v-for="item in selects[item.select]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                  </el-option>
                </el-select>
                
              </div>
              <!-- input -->
              <div  v-else-if="!item.text">
                <el-input size="mini" placeholder="请输入内容" clearable v-model="datas.sel[item.prop]">
                </el-input>
              </div>
              <!-- url tip -->
              <div  v-else-if="item.tooltip">
                <span class="link-short">{{datas.sel[item.prop]}}</span>
                <el-tooltip :content="datas.sel[item.prop]" placement="top">
                  <i class="el-icon-warning"></i>
                </el-tooltip>
              </div>
              <!-- text -->
              <span v-else-if="item.filter&&item.filter=='filterCharging'"> 
                {{datas.sel[item.prop] | filterCharging}}
              </span>
              <span v-else>{{datas.sel[item.prop]}}</span>
            </div>

            <!-- 弃用处理 -->
            <span v-else-if="item.select&&scope.row.removed == item.prop"> 
              <span>{{scope.row[item.prop]}}</span>
              <el-tooltip content="改项已经弃用，请重新编辑保存改项！" placement="top">
                <i class="el-icon-warning"></i>
              </el-tooltip>
            </span>
            
            <!-- unedit -->
            <!-- url tip -->
            <div  v-else-if="item.tooltip">
              <span class="link-short">{{scope.row[item.prop]}}</span>
              <el-tooltip :content="scope.row[item.prop]" placement="top">
                <i class="el-icon-warning"></i>
              </el-tooltip>
            </div>
            <span v-else-if="item.filter&&item.filter=='filterCharging'"> 
              {{scope.row[item.prop] | filterCharging}}
            </span>
            <span v-else-if="item.filter&&item.filter=='filterDate'"> 
              {{scope.row[item.prop] | filterDate}}
            </span>
            <span v-else>{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
        <!-- 总激活 -->
        <el-table-column class-name="date-cell" label="总激活" width="100" :fixed='true'>
          <template slot-scope="scope">
            <p>
              <span v-if="scope.row.isSet">{{datas.sel.income.total_num | formatNumberRgx}}</span>
              <span v-else>{{scope.row.income.total_num}}</span>
            </p>
            <p>
              <span v-if="scope.row.isSet">{{datas.sel.cost.total_num | formatNumberRgx}}</span>
              <span v-else>{{scope.row.cost.total_num}}</span>
            </p>
          </template>
        </el-table-column>
        <!-- 总收入 -->
        <el-table-column class-name="date-cell" label="总收入" width="100" :fixed='true'>
          <template slot-scope="scope">
            <p>
              <span v-if="scope.row.isSet">{{datas.sel.income.total_income | formatNumberRgx}}</span>
              <span v-else>{{scope.row.income.total_income | formatNumberRgx}}</span>
            </p>
            <p>
              <span v-if="scope.row.isSet">{{datas.sel.cost.total_income | formatNumberRgx}}</span>
              <span v-else>{{scope.row.cost.total_income | formatNumberRgx}}</span>
            </p>
          </template>
        </el-table-column>
        
        <!-- 成本 单价 -->
        <el-table-column label="收入" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.isSet && scope.row.isSet !== 'edit'">
              <el-input size="mini" placeholder="请输入内容"  type='number' class="miniInput"
                @blur="priceInputChange(scope.row,scope.$index,'income_price')" v-model="datas.sel.income_price">
              </el-input>
            </div>
            <p v-else>
              {{scope.row.income_price}}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="成本" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.isSet && scope.row.isSet !== 'edit'">
              <el-input size="mini" placeholder="请输入内容"  type='number' class="miniInput"
                @blur="priceInputChange(scope.row,scope.$index,'cost_price')" v-model="datas.sel.cost_price">
              </el-input>
            </div>
            <p v-else>
              {{scope.row.cost_price}}
            </p>
          </template>
        </el-table-column>
      
        <!-- 日期相关列 -->
        <el-table-column class-name="date-cell" label="数据类型" width="120">
          <template slot-scope="scope">
            <p>收入</p>
            <p>成本</p>
          </template>
        </el-table-column>

        <el-table-column class-name="date-cell" v-for="(item,index) in datas.datecolumns" :label="item.label" 
          :prop="item.prop" :width="item.width">
          <template slot-scope="scope">
            <div v-if="scope.row.isSet">
              <el-input size="mini" :disabled="datas.sel[item.prop+'_disabled']" placeholder="请输入数量"   type='number' class="miniInput"
                @blur="dateIncomeChange(scope.row,scope.$index,item.prop)" v-model="datas.sel.income[item.prop]">
              </el-input>

            </div>
            <p v-else>
              {{scope.row.income[item.prop]}}
            </p>
            <div v-if="scope.row.isSet" class="inputCost">
              <el-input size="mini" :disabled="datas.sel[item.prop+'_disabled']" placeholder="请输入数量"  type='number' class="miniInput"
                @blur="dateCostChange(scope.row,scope.$index,item.prop)" v-model="datas.sel.cost[item.prop]">
              </el-input>
            </div>
            <p v-else>
              {{scope.row.cost[item.prop]}}
            </p>

          </template>
        </el-table-column>
        <el-table-column label="扣量比例(%)" prop='status' width="66" fixed='right'>
          <template slot-scope="scope">
            <!-- edit -->
            <div v-if="scope.row.isSet">
              <el-input size="mini" placeholder="请输入内容" type='number' class="miniInput"
                @change="proportion(scope.row,scope.$index)"
                v-model="datas.sel.ratio">
              </el-input>
            </div>
            <!-- unedit -->
            <span v-else>{{scope.row.ratio}}</span>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="150" fixed='right' v-if="datas.jiti_status !== 'confirmed'">
          <template slot-scope="scope">
            <span v-if="scope.row.isSet" class="el-tag el-tag--success el-tag--mini" 
              @click.stop="saveRow(scope.row,scope.$index)">保存
            </span>
            <span v-if="scope.row.isSet" class="el-tag el-tag--primary el-tag--mini" 
              @click.stop="cancelRow(scope.row,scope.$index,datas.data)">取消
            </span>
            <span v-if="!scope.row.isSet" class="el-tag el-tag--primary el-tag--mini" 
              @click="editRow(scope.row,scope.$index)">编辑
            </span>
            <span v-if="!scope.row.isSet && scope.row.status !== 1" class="el-tag el-tag--success el-tag--mini" 
              @click.stop="copyRow(scope.row,scope.$index,datas.data)">复制
            </span>
            <span v-if="!scope.row.isSet && scope.row.status !== 1" class="el-tag el-tag--danger el-tag--mini" 
              @click="deleteRow(scope.row,scope.$index,datas.data)">删除
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 创建新数据 -->
    <el-dialog title="创建新数据" :visible.sync="showDialog"
      @close="dalogClose('Info')" width="70%" destroy-on-close>
      <el-form status-icon
        :model="Info" 
        :rules="rules" 
        ref="Info"
        label-width="140px">
        <el-form-item label="客户公司名称" prop="customer_name">
          <el-autocomplete
            class="inline-input"
            v-model="Info.customer_name"
            :fetch-suggestions="querySearchCust"
            placeholder="请输入内容"
            @select="handleSelect($event,'customerList')"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="客户类型" prop="customer_type" >
          <el-radio-group v-model="Info.customer_type" :disabled="Info.customerDisabled">
            <el-radio label="agency">代理</el-radio>
            <el-radio label="normal">直客</el-radio>
           </el-radio-group>
        </el-form-item>
        <el-form-item label="推广活动名称" prop="campaign_name">
          <el-autocomplete
            class="inline-input"
            v-model="Info.campaign_name"
            :fetch-suggestions="querySearchCamp"
            placeholder="请输入内容"
            @select="handleSelect($event,'campaignList')"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="结算方式" prop="settlement_type">
           <el-radio-group v-model="Info.settlement_type" :disabled="Info.campaignDisabled">
            <el-radio label="activation">激活</el-radio>
            <el-radio label="registration">注册</el-radio>
           </el-radio-group>
        </el-form-item>
        <el-form-item label="包名" prop="package_name">
          <el-autocomplete
            class="inline-input"
            v-model="Info.package_name"
            :fetch-suggestions="querySearchPack"
            placeholder="请输入内容"
            @select="handleSelect($event,'packageList')"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="客户链接" prop="customer_link">
          <el-input v-model.trim="Info.customer_link" clearable :disabled="Info.packageDisabled"></el-input>
        </el-form-item>
        <el-form-item label="可投放链接" prop="link">
          <el-input v-model.trim="Info.link" clearable :disabled="Info.packageDisabled"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="staff_id">
          <el-select v-model="Info.staff_id" clearable filterable placeholder="客户公司名称">
            <el-option
              v-for="item in selects.staffList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上线日期" prop="startdate">
          <el-date-picker
            v-model="Info.startdate"
            type="date"
            placeholder="选择日期"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下线日期" prop="enddate">
          <el-date-picker
            v-model="Info.enddate"
            type="date"
            placeholder="选择日期"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="渠道公司名称" prop="channel_name">
          <el-autocomplete
            class="inline-input"
            v-model="Info.channel_name"
            :fetch-suggestions="querySearchChan"
            placeholder="请输入内容"
            @select="handleSelect($event,'channelList')"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="渠道简称" prop="shortname">
          <el-input v-model.trim="Info.shortname" clearable :disabled="Info.channelDisabled"></el-input>
        </el-form-item>
        
        <el-form-item label="收入单价" prop="income_price">
          <el-input size="mini" placeholder="请输入内容" clearable type='number' v-model="Info.income_price"></el-input>
        </el-form-item>
        <el-form-item label="成本单价" prop="cost_price">
          <el-input size="mini" placeholder="请输入内容" clearable type='number' v-model="Info.cost_price"></el-input>
        </el-form-item>
        <el-form-item label="扣量比例" prop="ratio">
          <el-input size="mini" placeholder="请输入内容" clearable type='number' v-model="Info.ratio"></el-input>
        </el-form-item>

      </el-form>
          
      <div slot="footer">
        <el-button type="primary" @click="saveData('Info')">保 存</el-button>
        <el-button @click="closeDalog('showAddInfo')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import vTable from "@/components/Table.vue";
import vMenu from "../../components/menubread.vue";
import * as API from '../../request/api.js'
export default {
  components:{
    vTable, vMenu
  },
  data () {
    return {
      // base
      menuData:[{id:1,name:'数据报表',path:''},{id:2,name:'录入数据',path:''}],
      searchInfo:{
        customer_id:'',
        campaign_id:'',
        package_id:'',
        channel_id:'',
        month:''
      },
      pageInfo:{page:1,limit:30,count:0,pageTotal:0},
      datas:{
        sel: null, //选中行  编辑，复制，添加 --数据
        columns:[
          { prop: "shortname", label: "渠道", width: 80, select:'channelList', propId:"channel_id",fixed:true,propName:"shortname"},
          { prop:"customer_name", label:"客户公司名称", width: 120, select:'customerList', propId:"customer_id",fixed:true,},
          { prop: "campaign_name", label: "推广活动名称", width: 140, select:'campaignList', propId:"campaign_id",fixed:true,},
          { prop: "package_name", label: "包名", width: 100, select:'packageList', propId:"package_id",fixed:true,},
          { prop: "staff_name", label: "负责人", width: 80, select:'staffList', propId:"staff_id"},
          { prop: "startdate", label: "上线日期", width: 170, input:true, datepicker:'startdate'},
          { prop: "enddate", label: "暂停日期", width: 170, input:true, datepicker:'enddate'},
          { prop: "customer_link", label: "客户链接", width: 120, text:true,tooltip:'customer_link'},
          { prop: "link", label: "可投放链接", width: 120, text:true,tooltip:'link'},
          { prop: "settlement_type", label: "计费方式", width: 120, text:true ,filter:"filterCharging"},
        ],
        datecolumns:[], //日期表头
        data:[],  //表格数据
        jiti_status:'inuse', //inuse：未计提，confirmed：已计提
        addProp:['customer_id','campaign_id','package_id','staff_id','startdate','enddate','channel_id','customer_link','customer_link','link','settlement_type','income_price','cost_price','ratio']
      },
      tableHeight:500,
      selects:{ // 
        customerList:[],//客户
        campaignList:[],  //活动  
        packageList:[], //包号
        channelList:[], //渠道
        staffList:[]  //员工
      },
      selectsTop:{  // 顶部筛选数据
        customerList:[],//客户
        campaignList:[],  //活动  
        packageList:[], //包号
        channelList:[], //渠道
      },
      InitStatus:true,
      multipleSelection:[], //多选checkbox
      showDialog:false, //创建新数据弹框
      Info:{
        customer_name:'',customer_type:'',customerDisabled:false,
        campaign_name:'',settlement_type:'',campaignDisabled:false,
        package_name:'',customer_link:'',link:'',packageDisabled:false,
        staff_id:'',
        channel_name:'',shortname:'',channelDisabled:false,
        income_price:'',cost_price:'',
        startdate:'',enddate:'',ratio:'',month:''
      },
      rules:{
        customer_name: [{ required: true, message: '请输入客户名称', trigger: 'change' }],
        customer_type:[{ required: true, message: '请选择客户类型', trigger: 'change' }],
        campaign_name:[{ required: true, message: '请输入活动名称', trigger: 'change' }],
        settlement_type:[{ required: true, message: '请选择结算方式', trigger: 'change' }],
        package_name:[{ required: true, message: '请输入包名称', trigger: 'change' }],
        customer_link:[{ required: true, message: '请输入客户链接', trigger: 'blur' }],
        link:[{ required: true, message: '请输入可投放链接', trigger: 'blur' }],
        staff_id:[{ required: true, message: '请选择负责人', trigger: 'change' }],
        channel_name:[{ required: true, message: '请输入渠道名称', trigger: 'change' }],
        shortname:[{ required: true, message: '请输入渠道简称', trigger: 'blur' }],
        income_price:[{ required: true, message: '请输入收入单价', trigger: 'blur' }],
        cost_price:[{ required: true, message: '请输入成本单价', trigger: 'blur' }],
        startdate:[{ required: true, message: '请选择开始时间', trigger: 'change' }],
        ratio:[{ required: true, message: '请输入扣量比例', trigger: 'blur' }],
      },
    }
  },
  methods:{
    getRowKeys(row) {
      // console.log(row.id)
      return row.id;
    },
    dealSearch(){
      let month = this.$moment(this.searchInfo.month).format('YYYY/MM')
      let search = `?page=${this.pageInfo.page}&pagesize=${this.pageInfo.limit}&month=${month}`;
      if(this.searchInfo.customer_id || this.searchInfo.customer_id === 0) {
        search += '&customer_id='+this.searchInfo.customer_id;
      }
      if(this.searchInfo.campaign_id || this.searchInfo.campaign_id === 0) {
        search += '&campaign_id='+this.searchInfo.campaign_id;
      }
      if(this.searchInfo.package_id || this.searchInfo.package_id === 0) {
        search += '&package_id='+this.searchInfo.package_id;
      }
      if(this.searchInfo.channel_id || this.searchInfo.channel_id === 0) {
        search += '&channel_id='+this.searchInfo.channel_id;
      }
      return search;
    },
    dealData(data){
      let isArr = data && Object.prototype.toString.call(data.data) == "[object Array]";
      isArr&&data.data.forEach(item=>{
        this.datas.datecolumns.forEach(dataItem=>{
          if(Array.isArray(item.income)){item.income = {}}
          if(Array.isArray(item.cost)){item.cost = {}}
          item.income[dataItem.prop] = item.income[dataItem.prop] || null
          item.cost[dataItem.prop] = item.cost[dataItem.prop] || null
          item.startdate = item.startdate.split('-').join('/')
          item.enddate && (item.enddate = item.enddate.split('-').join('/'))
        })
      });
      return data.data;
    },
    getDataList:function(){
      let search = this.dealSearch();

      API.getDataList(search).then(res=>{
        if(res.code == 0){
          if(this.InitStatus){ //初始数据

            this.datas.data = this.dealData(res.data);

            this.pageInfo.count = res.data.total;
            this.pageInfo.pageTotal = res.data.last_page;
            this.datas.jiti_status = res.jiti_status;
            this.$nextTick(() => { //处理错位问题 （表格固定高度和固定列）
              this.$refs.tableDataRef.doLayout();
            });
            this.dealSelect(); // 或者相关筛选列表
          }else{
            let  data = this.dealData(res.data)
            console.log(data,this.datas.data)
            this.datas.data = this.datas.data.concat(data);
          }
        }
      }).catch(err => {
        this.$showMessage('error',err.message)
      });
    },
    dealSelect(){ //请求下拉列表数据
      this.InitStatus = false;
      let nameArr = [ 
        {type:'getCustomerList', name:'customerList', search:''}, 
        {type:'getCampaignList', name:'campaignList', search:''}, 
        {type:'getPackageList',name:'packageList', search:''}, 
        {type:'getChannelList',name:'channelList', search:''},
        {type:'getStaffList',name:'staffList', search:''}
      ]
      this.getSelectList(nameArr);
    },
    search:function(){  // 筛选数据
      this.InitStatus = true; 
      this.pageInfo.page = 1;
      this.getDateColumn(); //重新获取搜索月日期表头
      this.getDataList();
    },
    scrollLoad(){ //加载下一页
      let dom = document.querySelector('.el-table__body-wrapper');
      console.log(dom.scrollHeight,dom.scrollTop,dom.clientHeight)
      const scrollDistance =dom.scrollHeight - dom.scrollTop - dom.clientHeight;
      if(scrollDistance <=0){//等于0证明已经到底，可以请求接口
        if(this.pageInfo.page < this.pageInfo.pageTotal){
          this.$showMessage('warning','加载下一页')
          this.pageInfo.page++;
          this.getDataList();
        }else{
          // this.$showMessage('warning','数据加载完毕')
        }
      }
    },
    // 导出报表
    exportFile:function(){
      var month = this.$moment(this.searchInfo.month).format('YYYY/MM')
      let search = '?month='+month+"&export=export";
      if(this.searchInfo.customer_id || this.searchInfo.customer_id === 0) {
        search += '&customer_id='+this.customer_id;
      }
      if(this.searchInfo.campaign_id || this.searchInfo.campaign_id === 0) {
        search += '&campaign_id='+this.campaign_id;
      }
      if(this.searchInfo.package_id || this.searchInfo.package_id === 0) {
        search += '&package_id='+this.package_id;
      }
      if(this.searchInfo.channel_id || this.searchInfo.channel_id === 0) {
        search += '&channel_id='+this.channel_id;
      }
      console.log('/jiti/datainput'+search)
      this.$downFlie('/jiti/datainput'+search);
    },
    // 顶部筛选
    selectChangeTop:function(name){
      let search = '';
      let nameArr = [];
      if(name == 'customerList'){
        let customer_id = this.searchInfo.customer_id || '';
        customer_id ? search=`?customer_id=${customer_id}` : '';
        nameArr = [
          {type:'getCampaignList', name:'campaignList', search:search}, 
          {type:'getPackageList',name:'packageList', search:search}
        ]
        this.searchInfo.campaign_id = '';
        this.searchInfo.package_id = '';
        this.getSelectList(nameArr,'selectsTop');
      }else if(name == 'campaignList'){
        let campaign_id = this.searchInfo.campaign_id || '';
        let customer_id = this.searchInfo.customer_id || '';
        if(campaign_id){
          search=`?campaign_id=${campaign_id}`
        }else{
          customer_id ? search=`?customer_id=${customer_id}` : '';
        }
        nameArr = [
          {type:'getPackageList',name:'packageList', search:search}
        ]
        this.searchInfo.package_id = '';
        this.getSelectList(nameArr,'selectsTop');
      }
    },
    // 表格内下拉筛选--请求接口
    getSelectList:function(nameArr, selectName){
      nameArr.forEach(item=>{
        API[item.type](item.search).then(res=>{
          if(res.code == 0){
            if(!selectName){  //初始 顶部筛选数据和表格里面下拉列表数据
              res.data.forEach(item=>{
                item.value = item.name
              })
              this.selects[item.name] = res.data;
              this.selectsTop[item.name] = res.data;
            }else{
              res.data.forEach(item=>{
                item.value = item.name
              })
              this[selectName][item.name] = res.data;
            }
          }
        }).catch(err => {
          this.$showMessage('error', err.message)
        });
      })
    },
    // select 处理级联关系筛选
    selectChange:function(name,prop){
      let search = '';
      let nameArr = [];
      if(name == 'customerList'){
        let customer_id = this.datas.sel.customer_id || '';
        customer_id ? search=`?customer_id=${customer_id}` : '';
        nameArr = [
          {type:'getCampaignList', name:'campaignList', search:search}, 
          {type:'getPackageList',name:'packageList', search:search}
        ]
        this.datas.sel.campaign_id = '';
        this.datas.sel.package_id = '';
        this.getSelectList(nameArr,'selects');
      }else if(name == 'campaignList'){
        let campaign_id = this.datas.sel.campaign_id || '';
        campaign_id ? search=`?campaign_id=${campaign_id}` : '';
        nameArr = [
          {type:'getPackageList',name:'packageList', search:search}
        ]
        this.datas.sel.package_id = '';
        this.getSelectList(nameArr,'selects');
      }else if(name == 'packageList'){
        let package_id = this.datas.sel.package_id || '';
        if(package_id){
          this.selects.packageList.forEach(item=>{
            if(item.id == package_id){
              this.datas.sel.link = item.link
              this.datas.sel.customer_link = item.customer_link
              this.datas.sel.settlement_type = item.settlement_type || 'activation'
            }
          })
        }
      }
    },
    toFixed2:function(value){
      return parseFloat(parseFloat(value).toFixed(2));
    },
    toFloor:function(value){
      return Math.floor(value);
    },
    // 价格修改--计算总数
    priceInputChange:function(){
      let income = this.datas.sel.income;
      let cost = this.datas.sel.cost;
      let total_num = income.total_num || 0;
      let total_num_cost = cost.total_num || 0;
      this.datas.sel.income_price = this.toFixed2(this.datas.sel.income_price);
      this.datas.sel.cost_price = this.toFixed2(this.datas.sel.cost_price);
      if(total_num !== 0 && this.datas.sel.income_price){
        income.total_income = this.toFixed2(total_num * this.datas.sel.income_price);
      }
      if(total_num_cost !== 0 && this.datas.sel.cost_price){
        cost.total_income = this.toFixed2(total_num_cost * this.datas.sel.cost_price);
      }
      this.datas.sel.income = income;
      this.datas.sel.cost = cost;
    },
    // 修改 收入数--计算成本数
    dateIncomeChange:function(row,index,prop){
      let sel = this.datas.sel
      sel.income[prop] = this.toFloor(sel.income[prop]);
      if(sel.ratio){
        sel.cost[prop] = this.toFloor(sel.income[prop] * ((100 - sel.ratio)* 0.01));
      }
      this.countTotal(row,index);
    },
    // 修改 成本数--计算成本数
    dateCostChange:function(row,index,prop){
      let sel = this.datas.sel
      sel.cost[prop] = this.toFloor(sel.cost[prop]);
      this.countTotal(row,index);
    },
    // 计算总数 总收入
    countTotal:function(){
      let income = this.datas.sel.income;
      let cost = this.datas.sel.cost;
      let total_num = 0;
      let total_num_cost = 0;
      this.datas.datecolumns.forEach(item=>{
        if(income[item.prop]){
          total_num += this.toFixed2(income[item.prop]);
        }
        if(cost[item.prop]){
          total_num_cost += this.toFixed2(cost[item.prop]);
        }
      })
      income.total_num = total_num
      cost.total_num = total_num_cost

      if(this.datas.sel.income_price){
        income.total_income = this.toFixed2(total_num * this.datas.sel.income_price);
      }
      if(this.datas.sel.cost_price){
        cost.total_income = this.toFixed2(total_num_cost * this.datas.sel.cost_price);
      }
      this.datas.sel.income = income;
      this.datas.sel.cost = cost;
    },
    // 扣量比例调整 计算对应的成本数（已经保存的成本数不重新计算）
    proportion:function(row,index){
      let sel = this.datas.sel;
      let flog = false;
      this.datas.datecolumns.forEach(item=>{
        console.log(row.income[item.prop],sel.income[item.prop])
        if(row.income[item.prop] !== sel.income[item.prop]){
          flog = true;
          sel.cost[item.prop] = this.toFixed2(sel.income[item.prop] * ((100 - sel.ratio)* 0.01));
        }
      })
      flog && this.countTotal(row,index);
    },
    // 添加--一行
    addRow(rows) {
      let count = 0;
      for (let i of this.datas.data) {
        if (i.isSet) return this.$message.warning(`请先保存第${count+1}项`);
        count++;
       // i.isSet = false;
      }
      let newRow = {}
      
      this.datas.addProp.forEach(item=>{
        newRow[item] = ''
      })
      newRow.income = {total_income:'',total_num:''};
      newRow.cost = {total_income:'',total_num:''};
      this.datas.datecolumns.forEach(item=>{
        newRow.income[item.prop] = null
        newRow.cost[item.prop] = null
      })
      rows.unshift(newRow);
      newRow = this.dateColDisable(newRow)
      this.datas.sel = JSON.parse(JSON.stringify(newRow));
      newRow.isSet = true
    }, 
    // 校验提交数据是否为空
    validateData(data){
      let validateInfo = {code:0, message:''}
      var validateArr = [
        {prop:'ratio',message:'请输入扣量比例'},
        {prop:'cost_price',message:'请输入成本单价'},
        {prop:'income_price',message:'请输入收入单价'},
        {prop:'channel_id',message:'请选择渠道'},
        {prop:'startdate',message:'请输入上线日期'},
        {prop:'staff_id',message:'请选择负责人'},
        {prop:'package_id',message:'请选择包名'},
        {prop:'campaign_id',message:'请选择活动'},
        {prop:'customer_id',message:'请选择客户'},
      ]
      validateArr.forEach(item => {
        if(!data[item.prop]){
          validateInfo.code = -1;
          validateInfo.message = item.message;
          return validateInfo;
        }
      })
      return validateInfo;
    },
    saveRow(row, index) { //保存
      let data = JSON.parse(JSON.stringify(this.datas.sel));
      for (let k in data) {
        row[k] = data[k] 
      }
      data.month = this.$moment(this.searchInfo.month).format('YYYY/MM')
      var validateInfo = this.validateData(data);
      if(validateInfo.code == -1){
        this.$showMessage('error', validateInfo.message);
        return
      }
      // 开始时间之前的时间（表头时间）不允许编辑字段删除
      this.datas.datecolumns.forEach(item=>{
        delete data[item.prop+'_disabled']
      })
      API.addData(data).then(res=>{
        if(res.code == 0){
          row.isSet = false;
          this.$set(this.datas.data, index, row);
          this.$showMessage('success', '保存成功！')

          this.search();
        }
      }).catch(err => {
        this.$showMessage('error', err.message)
      });
    },
    cancelRow(row, index,rows) { //取消
      row.isSet = false;
      this.$set(this.datas.data, index, row);
      if(!row.id){

        rows.splice(index,1);
      }
    },
    // 开始时间调整
    datepickerChange:function(row,prop){
      if(row.isSet && prop == 'startdate' && this.datas.sel.startdate){
        let newRow = JSON.parse(JSON.stringify(this.datas.sel));
        newRow = this.dateColDisable(newRow)
        this.datas.sel = JSON.parse(JSON.stringify(newRow));
      }
    },
    dateColDisable:function(newRow){
      // 开始时间之前的时间（表头时间）不允许编辑
      this.datas.datecolumns.forEach(item=>{
        var startTime = newRow.startdate.replace(/\//g,'-');
        var editdate = item.prop.replace(/\//g,'-');
        let flog = this.$moment(editdate).isBefore(startTime);
        newRow[item.prop+'_disabled'] = flog
      })
      return newRow
    },
    editRow(row,index) { //编辑
      let count = 0;
      for (let i of this.datas.data) {
        if (i.isSet) return this.$message.warning(`请先保存第${count+1}项`);
        count++;
       // i.isSet = false;
      }
      let newRow = JSON.parse(JSON.stringify(row));
      // 检查是否有弃用的
      if(row.removed == 'campaign_name'){
        newRow.campaign_id = '';
        newRow.package_id = '';
      }else if(row.removed == 'package_name'){
        newRow.package_id = '';
      }

      newRow = this.dateColDisable(newRow)
      this.datas.sel = JSON.parse(JSON.stringify(newRow));

      //编辑时联动筛选查询数据
      let customer_id = this.datas.sel.customer_id || '';
      let campaign_id = this.datas.sel.campaign_id || '';

      let campaignSearch = customer_id ? `?customer_id=${customer_id}` : '';
      let packageSearch = campaign_id ? `?campaign_id=${campaign_id}` : (customer_id ? `?customer_id=${customer_id}` : '');
      let nameArr = [
        {type:'getCampaignList', name:'campaignList', search:campaignSearch}, 
        {type:'getPackageList',name:'packageList', search:packageSearch}
      ]
      this.getSelectList(nameArr,'selects');
      row.isSet = 'edit';
      this.$set(this.datas.data, index, row);
    },
    deleteRow(row, index, rows) { //删除
      this.$confirm('确定要删除该条数据？','提示',{
        confirmButtonText:'确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.splice(index, 1)
        // 如果当前行有id则同时接口删除ajax
        let id = row.id || '';
        id&&API.delData({id:id}).then(res=>{
           if(res.code == 0){
              this.$showMessage('success', '删除成功！')
              this.getDataList();
            }
        }).catch(err=>{
          this.$showMessage('error', err.message)
        });
      }).catch(() => {
         
      });
    },
    // 复制
    copyRow(row,index,rows){
      let count = 0;
      for (let i of this.datas.data) {
        if (i.isSet) return this.$message.warning(`请先保存第${count+1}项`);
        count++;
        // i.isSet = false;
      }
      let newRow = JSON.parse(JSON.stringify(row));
      newRow.copy_from = newRow.id //复制源
      newRow.id = '';
      // 检查是否有弃用的
      if(row.removed == 'campaign_name'){
        newRow.campaign_id = '';
        newRow.package_id = '';
      }else if(row.removed == 'package_name'){
        newRow.package_id = '';
      }
      rows.splice(index+1,0,newRow);
      newRow = this.dateColDisable(newRow)
      this.datas.sel = JSON.parse(JSON.stringify(newRow));
      //复制时联动筛选查询数据
      let customer_id = this.datas.sel.customer_id || '';
      let campaign_id = this.datas.sel.campaign_id || '';
      let campaignSearch = customer_id ? `?customer_id=${customer_id}` : '';
      let packageSearch = campaign_id ? `?campaign_id=${campaign_id}` : (customer_id ? `?customer_id=${customer_id}` : '');
      let nameArr = [
        {type:'getCampaignList', name:'campaignList', search:campaignSearch}, 
        {type:'getPackageList',name:'packageList', search:packageSearch}
      ]
      this.getSelectList(nameArr,'selects');
      
      this.datas.sel.income = {}
      this.datas.sel.cost = {}

      newRow.isSet = true

      this.$set(this.datas.data, index+1, newRow);
    },
    // 获取月份的天数，作为表格日期的表头
    getDateColumn:function(){
      let month = this.searchInfo.month;
      let dayEnd = this.$moment(month).endOf("month").dates();
      let monthForamt = this.$moment(month).format('YYYY/MM')
      let dayHead = []; 
      for(let i = 0; i < dayEnd; i++){
        let day = (i+1)>9?(i+1):('0'+(i+1))
        let dayFormat =  monthForamt + "/" + day;
        let id = 18 + i;
        let item = {prop:dayFormat,label:dayFormat, width:"120"};
        dayHead.push(item)
      }
      this.datas.datecolumns = dayHead;
    },
    // 批量选择--复选框选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量复用---相关函数
    batchReuse(){
      let ids = [];
      this.multipleSelection.forEach(item=>{
        ids.push(item.id+'');
      })
      if(ids.length<=0){
        this.$showMessage('error','请勾选表格前面对应的复选框！')
        return;
      }
      let month = this.$moment(this.searchInfo.month).format('YYYY/MM')
      API.batchReuse({month:month,ids:ids}).then(res=>{
        this.$showMessage('success','提交成功！')
      }).catch(err => {
        this.$showMessage('error', err.message)
      });
    },
    createData:function(){
      this.showDialog = true;
    },
    // 清空弹框数据
    dalogClose:function(formName){
      this.$refs[formName].resetFields();
    },
    // 关闭弹框
    closeDalog(showInfo) {
      this[showInfo] = false
    },
    // 保存-创建数据
    saveData(formName){
      var data = JSON.parse(JSON.stringify(this.Info));
      data.month = this.$moment(this.searchInfo.month).format('YYYY/MM')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          API.newData(data).then(res=>{
            this.$showMessage('success', '保存成功！')
            this.closeDalog('showDialog')
            this.search();
          }).catch(err => {
            this.$showMessage('error', err.message)
          });
        }
      })
      
    },
    // 处理相关筛选--信息内
    handleSelect(item,name) {
      console.log(item,name)
      let search = '';
      let nameArr = [];
      if(name == 'customerList'){
        this.Info.customer_type = item.type;
        this.Info.customerDisabled = true;
        let customer_id = item.id || '';
        customer_id ? search=`?customer_id=${customer_id}` : '';
        nameArr = [
          {type:'getCampaignList', name:'campaignList', search:search}, 
          {type:'getPackageList',name:'packageList', search:search}
        ]
        this.Info.campaign_name = '';
        this.Info.package_name = '';
        this.getSelectList(nameArr,'selects');
      }else if(name == 'campaignList'){
        this.Info.settlement_type = item.settlement_type;
        this.Info.campaignDisabled = true;
        let campaign_id = item.id || '';
        campaign_id ? search=`?campaign_id=${campaign_id}` : '';
        nameArr = [
          {type:'getPackageList',name:'packageList', search:search}
        ]
        this.Info.package_name = '';
        this.getSelectList(nameArr,'selects');
      }else if(name == 'packageList'){
        this.Info.customer_link = item.customer_link;
        this.Info.packageDisabled = true;
        this.Info.link = item.link;
        let package_id = item.id || '';
        if(package_id){
          this.selects.packageList.forEach(item=>{
            if(item.id == package_id){
              item.link = item.link
              item.customer_link = item.customer_link
              item.settlement_type = item.settlement_type || 'activation'
            }
          })
        }
      }else if(name == 'channelList'){
        this.Info.channelDisabled = true;
        this.Info.shortname = item.shortname;
      }
    },
    // 输入-关联查询
    querySearch(queryString, cb, type) {
      console.log(type)
      var restaurants = this.selects[type];
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
      this.dealChange(type);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    // 客户，活动，包号，渠道
    querySearchCust(queryString, cb,) {
      this.querySearch(queryString, cb, 'customerList')
    },
    querySearchCamp(queryString, cb) {
      this.querySearch(queryString, cb, 'campaignList')
    },
    querySearchPack(queryString, cb) {
      this.querySearch(queryString, cb, 'packageList')
    },
    querySearchChan(queryString, cb) {
      this.querySearch(queryString, cb, 'channelList')
    },
    // 选择项-其相关信息不可编辑
    dealChange(type){
      type = type.replace('List','Disabled');
      this.Info[type] = false;
    },
  },
  mounted(){
    this.searchInfo.month = this.$moment().subtract(0,'month');
    this.getDataList();
    this.getDateColumn();
    this.$nextTick(()=>{
      // 绑定滚动事件
      let dom = document.querySelector('.el-table__body-wrapper');
      dom.addEventListener("scroll", this.scrollLoad)

      // 获取剩余高度--表格
      let tabwarp = document.querySelector('.tabWarp');
      if(tabwarp && tabwarp.clientHeight){
        this.tableHeight = tabwarp.clientHeight-4;
      }
    })

    this.$store.commit('updateMenu','/dataList')
  },
  beforeDestroy(){
    // 移除滚动事件
    let dom = document.querySelector('.el-table__body-wrapper');
    dom.removeEventListener('scroll', this.scrollLoad);
  }
}
</script>

<style lang="stylus" scoped>
.content
  display:flex;
  flex-direction:column;
.addBtn
  margin-right:16px
.el-select
  margin-right:8px
.el-range-editor.el-input__inner,.el-date-editor.el-input, .el-date-editor.el-input__inner
  margin-right:8px
.row-bg.el-row--flex
  margin-bottom:12px
.el-tag--mini.el-tag
  margin-right:2px
  cursor:pointer
.el-table >>> .date-cell .cell
  padding: 0;
  text-align: center;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
.el-table .date-cell .cell p 
  flex: 1 0 23px;
.el-table .date-cell .cell p:nth-child(2n+1)
  background: #f0f9eb;
.el-table .date-cell .cell p:nth-child(2n)
  border-top:1px solid #EBEEF5;
  background: #fdf5e6
.inputCost
  margin-top:4px
.el-input--mini.miniInput >>> .el-input__inner
  padding-right:6px;

.el-date-editor.el-input
  width:auto
.el-input--medium.el-date-editor.el-input .el-input__inner
  padding: 0 6px;
  text-align: center;
.link-short
  width: 70px;
  display: inline-block;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
.el-table >>> .date-cell
  padding:0
  margin:0
.el-table >>> .el-table__empty-block
  justify-content:flex-start;
  align-items: flex-start;
.el-table >>> .el-table__empty-text
  text-align:left;
  margin-left:12px;
.tabWarp
  flex:1
</style>
