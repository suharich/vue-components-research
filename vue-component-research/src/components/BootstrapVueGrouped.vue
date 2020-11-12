<template>
  <b-container>
    <b-table
      show-empty
      small
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
     
      <template #table-colgroup="scope">
        <col
        v-for="field in scope.fields"
        :key="field.key"
        :style="{ width: field.key === 'name' ? '620px' : '380px' }"
        >
    </template>

      <template #cell(name)="row">
        <span>
          <span class="triangle" :class="{'expand': isExpanded(row)}" @click="row.toggleDetails"></span> 
          <span><b>{{row.item.label}}</b></span>
        </span>
      </template>

      <template #cell(actions)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
      </template>

      <template #row-details="row">
            <!-- <b-row b-col v-for="(rowItem) in row.item.children" :key="rowItem.id"> 
              <b-col 
                  v-show="isShownGroupedColuumn(key)" 
                  v-for="(value, key) in rowItem" 
                  :key="key">
                {{value}}</b-col>
            </b-row> -->
            <b-table-simple>
              <!-- <b-thead>
                <b-tr>
                  <b-th v-show="isShownGroupedColuumn(field.key)" v-for="(field) in fields" :key="field.key">
                    {{field.label}}
                  </b-th>
                 </b-tr>
              </b-thead> -->
              <b-tbody>
                <b-tr v-for="(rowItem) in row.item.children" :key="rowItem.id">
                  <b-td
                   v-show="isShownGroupedColuumn(key)" 
                  v-for="(value, key) in rowItem" 
                  :key="key">
                    {{value}}
                  </b-td>
                </b-tr>
              </b-tbody>
              </b-table-simple>
      </template>
    </b-table>

    <b-row>
      <b-col cols="4" offset="4">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
import EmployeeGridData from './employeeGridData.json'
import {_} from 'vue-underscore';
import { convertToGroupedRowsForBootstrap } from '../utils/dataset-converter.vue';


  export default {
    data() {
      return {
        items: this.itemsProvider,
        fields: [
          { key: 'name', label: 'Name', sortable: true, class: 'text-center', sortDirection: 'desc'},
          { key: 'company', label: 'Company', sortable: true, class: 'text-center', sortDirection: 'desc'},
          { key: 'personGroup', label: 'Person Group', sortable: true, class: 'text-center', sortDirection: 'desc', colspanForGroup:2},
          { key: 'actions', label: 'Actions' }
        ],       
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        showDetails: false,
        gropedFileds: [{ key:'name'}, {key:'company'}, {key:'personGroup' }, {key:'action'}],
        groupeBy: "company",
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      // this.totalRows = this.items.length
    },
    methods: {
      itemsProvider(ctx, calback) {
        ctx = _.extend(ctx, {"showDetails": this.showDetails})
        calback(convertToGroupedRowsForBootstrap(EmployeeGridData, this.groupeBy, ctx));
        this.totalRows = EmployeeGridData.length;
      },
      isShownGroupedColuumn(columnKey) {
        return _.find(this.gropedFileds, function(item){ return item.key == columnKey; }) != undefined
      },
      isExpanded(row) {
        return row.item._showDetails;
      },
      expandGroup: function (row) {
        row.toggleGroup = !row.toggleGroup; 
      },
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>

<style scoped>
td .triangle:after {
    content: "";   
    display: block;
    margin-top: -6px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid #606266;
    margin-left: -3px;
    transition: .3s ease transform;
    position: absolute;
    margin-top: 5px;
    margin-left: 15px;
}

td .triangle.expand:after {
    transform: rotate(90deg);
}

td .row {
  border-top: 1px solid #dee2e6;
}
</style>