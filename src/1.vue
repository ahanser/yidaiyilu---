<template>
  <div>
    <el-select v-model="value5" multiple placeholder="请选择" @change="sel()">
      <el-option style="height:auto; overflow-y:scroll" value>
        <el-tree
          :data="data2"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          ref="tree"
          @node-click="getCheckedNodes"
          @check="getCheckedNodes"
        ></el-tree>
      </el-option>
    </el-select>
    <button @click="getId()">获取选中节点id</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value5: [],
      value11: [],
      treeData: [],
      menuArr: [],
      data2: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    getCheckedNodes() {
      var arr = [];
      this.value5 = [];

      arr = this.$refs.tree.getCheckedNodes();

      if (arr.length == 0) {
        this.value5 = [];
      } else {
        for (let i = 0; i < arr.length; i++) {
          this.value5.push(arr[i].label);
          console.log(arr[i].label);
        }
      }
    },
    sel() {
      this.$refs.tree.setCheckedKeys([]);
    },
    getId() {
      this.flatten(this.data2);
      // console.log(this.menuArr);
      let menuArr = this.menuArr;
      let value5 = this.value5;
      for (let j = 0; j < menuArr.length; j++) {
        // console.log(menuArr[j].label);
        for (let i = 0; i < value5.length; i++) {
          // console.log(value5[i]);
          if (menuArr[j].label == value5[i]) {
            console.log(menuArr[j].id);
          }
        }
      }
    },
    flatten(menus) {
      let that = this;
      let menuArr = [];
      that.menuArr = menuArr;
      function spread(menus) {
        for (var i = 0; i < menus.length; i++) {
          let menu = menus[i];
          if (menu.children) {
            spread(menu.children);
            delete menu.children;
          }
          menuArr.push(menu);
        }

        // /console.log(menuArr);
        return menuArr;
      }

      spread(menus);
    }
  }
};
</script>
<style>
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
}
</style>