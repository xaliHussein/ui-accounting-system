import Vue from 'vue'

 Vue.filter("formatNumber", function (value) {
       let val = (value / 1).toFixed(3).replace(".", ",");
       return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
 });