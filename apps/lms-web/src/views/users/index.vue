<script lang="ts" setup>
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';

import { ElButton, ElCard, ElCheckbox, ElMessage } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

const MOCK_TABLE_DATA = [{
  id: 1,
  name: '张三',
  age: 20,
  role: 'admin',
  address: '北京市海淀区'
},
{
  id: 2,
  name: '李四',
  age: 21,
  role: 'user',
  address: '上海市浦东新区'
},
{
  id: 3,
  name: '王五',
  age: 22,
  role: 'guest',
  address: '广州市天河区'
}
]

interface RowType {
  address: string;
  age: number;
  id: number;
  name: string;
  nickname: string;
  role: string;
}

const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'name', title: '姓名' },
    { field: 'age', sortable: true, title: '年龄' },
    { field: 'nickname', title: '昵称' },
    { field: 'role', title: '角色' },
    { field: 'address', showOverflow: true, title: '地址' },
  ],
  data: MOCK_TABLE_DATA,
  pagerConfig: {
    enabled: false,
  },
  sortConfig: {
    multiple: true,
  },
};

const gridEvents: VxeGridListeners<RowType> = {
  cellClick: ({ row }) => {
    message.info(`cell-click: ${row.name}`);
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ gridEvents, gridOptions });

const showBorder = gridApi.useStore((state) => state.gridOptions?.border);
const showStripe = gridApi.useStore((state) => state.gridOptions?.stripe);

function changeBorder() {
  gridApi.setGridOptions({
    border: !showBorder.value,
  });
}

function changeStripe() {
  gridApi.setGridOptions({
    stripe: !showStripe.value,
  });
}

function changeLoading() {
  gridApi.setLoading(true);
  setTimeout(() => {
    gridApi.setLoading(false);
  }, 2000);
}
</script>

<template>
  <!-- 此处的`vp-raw` 是为了适配文档的展示效果，实际使用时不需要 -->
  <div class="vp-raw w-full">
    <Grid>
      <template #toolbar-tools>
        <ElButton class="mr-2" type="primary" @click="changeBorder">
          {{ showBorder ? '隐藏' : '显示' }}边框
        </ElButton>
        <ElButton class="mr-2" type="primary" @click="changeLoading">
          显示loading
        </ElButton>
        <ElButton class="mr-2" type="primary" @click="changeStripe">
          {{ showStripe ? '隐藏' : '显示' }}斑马纹
        </ElButton>
      </template>
    </Grid>
  </div>
</template>
