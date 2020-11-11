<script>
import {_} from 'vue-underscore';

export const convertToGroupedRows = (planRows, columnName) => {
    var result = [];

    _.each(planRows, function(item) {
      var foundGroup = _.find(result, function(el) {
        return el.label == item[columnName];
    });
    
    if (typeof(foundGroup) == "undefined") {

      var newGroup = {
        "mode": "span",
        "label": item[columnName],
        "html": false,
        "children": [ item ]};

      result.push(newGroup);
    } else {
      foundGroup.children.push(item);
    }
  });

  return result;
}

export const convertToGroupedRowsForBootstrap = (planRows, columnName, ctx) => {
    var result = [];
    const fromIndex = (ctx.currentPage - 1) * ctx.perPage; 
    const toIndex = ctx.currentPage * ctx.perPage;
    var currentRowIndex = 0;
    
    var pushToResult = function (rowIndex) {
      return fromIndex <= rowIndex && rowIndex < toIndex
    };

    var sortedRows = _.sortBy(planRows, ctx.sortBy);

    _.each(sortedRows, function(item) {
        if (!pushToResult(currentRowIndex++)) {
         return 1;
       }
        var foundGroup = _.find(result, function(el) {
          return el.label == item[columnName];
      });
    
    if (typeof(foundGroup) == "undefined") {

      var newGroup = {
        "key": "name",
        "label": item[columnName],
        "_showDetails": ctx.showDetails == true,
        "children": [ item ]};
     
        result.push(newGroup);
    } else {
      foundGroup.children.push(item);
    }
  });

  return result;
}

export default {
  convertToGroupedRows,
  convertToGroupedRowsForBootstrap
}
</script>
