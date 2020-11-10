<template>
  <div class="vue-table-content">  
    <vue-good-table
      :columns="columns"
      :rows="rows"
      styleCl="vgt-table striped"
      @on-row-click="onRowClick"
      :search-options="{
        enabled: true
      }"
      :select-options="{ 
        enabled: true,
      }"
      :group-options="{
        enabled: true,
        collapsable: true
      }"
      :pagination-options="{
        enabled: true,
      }"
      >
        <div slot="selected-row-actions" slot-scope="props">
          <p>{{props}}</p>
          <button class="btn btn-primary" @click="btnclick">makan</button>
        </div>
    </vue-good-table>
  </div>
</template>

<script>
import EmployeeGridData from './employeeGridData.json'
import {_} from 'vue-underscore';

var convertJsonForGrouping = function(jsonData) {
  var result = [];

  _.each(jsonData, function(item) {
    var foundGroup = _.find(result, function(el) {
      return el.label == item.company;
    });
    
    if (typeof(foundGroup) == "undefined") {

      var newGroup = {
        "mode": "span",
        "label": item.company,
        "html": false,
        "children": [ item ]};

      result.push(newGroup);
    } else {
      foundGroup.children.push(item);
    }
  });

  return result;
}

var groupedData = convertJsonForGrouping(EmployeeGridData);

export default {
  name: 'vue-good-table-example',
  data(){
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Company',
          field: 'company'
        },
        {
          label: 'Prson Group',
          field: 'personGroup'
        }
      ],
      rows: groupedData,
    };
  },
  methods:{
    onRowClick(params){
      console.log(params)
    },
    btnclick(params){
      console.log(params)
    }
  }
};
</script>

<style scoped>
.vue-table-content {
  display: flex; 
  align-items: center; 
  justify-content: center;
}
.vgt-wrap {
  min-width: 720px;
}
</style>
