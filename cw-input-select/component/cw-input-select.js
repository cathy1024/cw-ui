
/* 01.带输入框搜索的下拉框组件
    参数说明：见props
    注意：只接受optionsUrl接口返回选项
*/
Vue.component('cw-input-select', {
    template: `<div v-bind:id="componentId" class="cw-input-select_wrap" onselectstart="return false">
    <div class="cw-input-select">
        <div class="cw-input-select_box" v-on:click="selectHandle">
            <span>{{selectedValue || '请选择'}}</span>
            <i class="cw-arrow" v-bind:class="{'up': isShowPop}"></i>
        </div>
        <div class="cw-input-select_pop" v-if="isShowPop">
            <div class="cw-input-select_ipt_wrap">
                <input type="text" v-model.trim="searchTxt" v-on:input="searchHandle(searchTxt)" class="cw-input-select_ipt" placeholder="搜索" />
                <span class="icon-clear" v-if="searchTxt" v-on:click="clearHandle">
                    <svg t="1575258400555" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2468" width="16" height="16"><path d="M509.866667 32C245.333333 32 32 247.466667 32 512s213.333333 480 477.866667 480S987.733333 776.533333 987.733333 512 774.4 32 509.866667 32z m0 896C281.6 928 96 742.4 96 512S281.6 96 509.866667 96 923.733333 281.6 923.733333 512s-185.6 416-413.866666 416z" fill="#8a8a8a" p-id="2469"></path><path d="M693.333333 330.666667c-12.8-12.8-32-12.8-44.8 0L512 467.2l-136.533333-136.533333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l136.533333 136.533333-136.533333 136.533333c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533334s17.066667-2.133333 23.466667-8.533334l136.533333-136.533333 136.533334 136.533333c6.4 6.4 14.933333 8.533333 23.466666 8.533334s17.066667-2.133333 23.466667-8.533334c12.8-12.8 12.8-32 0-44.8L556.8 512l136.533333-136.533333c12.8-12.8 12.8-32 0-44.8z" fill="#8a8a8a" p-id="2470"></path></svg>
                </span>
            </div>
            <ul class="cw-input-select_options">
                <li v-on:click="selected('不限')">
                    <span>不限</span>
                </li>
                <li v-for="option in optionsList" v-on:click="selected(option)">
                    <span v-if="typeof option == 'object'">{{option[labelName]}}</span>
                    <span v-else>{{option}}</span>
                </li>
            </ul>
            <span class="cw-input-select_arrow"></span>
        </div>
    </div>
</div>`,
    props: ['componentId', 'options', 'labelName'],
    data: function () {
        return {
            optionsList: [],
            isShowPop: false,
            selectedValue: '', // 选中值
            searchTxt: '', // 搜索词
        }
    },
    created: function () {
        // 深拷贝一份源数据
        this.optionsList = JSON.parse(JSON.stringify(this.options));
        // 点全局范围收起下拉框
        var that = this;
        $('body').click(function (e) {
            if (e.target.id==that.componentId || $(e.target).parents('#' + that.componentId).length>0) {
                return;
            }
            console.log('hide')
            that.hidePop();
        });
    },
    methods: {
        // 显示或隐藏选项列表盒子
        selectHandle: function () {
            this.isShowPop = !this.isShowPop;
        },
        // 隐藏选项列表盒子
        hidePop: function () {
            this.isShowPop = false;
        },
        // 点击选项
        selected: function (val) {
            // 根据选项类型给名称赋值
            this.selectedValue = typeof val == 'object' ? val[this.labelName] : val;
            this.isShowPop = false;
        },
        // 选项搜索
        searchHandle (val) {
            // 深拷贝一份源数据
            var originList = JSON.parse(JSON.stringify(this.options));
            // filter过滤函数
            this.optionsList = originList.filter((item, index) => {
                // 根据选项类型给名称赋值
                var content = typeof item == 'object' ? item[this.labelName] : item;
                return content.indexOf(val) > -1;
            });
        },

        // 清除搜索
        clearHandle (e) {
            e.stopPropagation();
            this.searchTxt = '';
            // 深拷贝一份源数据
            this.optionsList = JSON.parse(JSON.stringify(this.options));
        }
    },
})

/* end */