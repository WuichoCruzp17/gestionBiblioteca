var util ={
  
    isTheProperty:function(object,nameProperty){
      return (object.hasOwnProperty(nameProperty));
    },
      createVueFrom:function(object){
        /* return new Vue({
          el: object.element,
          data:object.model,
          methods: util.isTheProperty(object, 'methods') ? object.methods :null,
        }) */
        return new Vue(object);
      },
      
      dinamicIdFrom:function(formId){
        var $inputs = jQuery("#"+formId +" .material-control")
        for(var i=0;i<$inputs.length;i++){
          $inputs[i].setAttribute('id',formId+'_'+$inputs[i].name);
          }
      },
      clenFrom:function(object){
        for(key in object){
          if(utilString.validateString(object[key])){
            object[key] = '';
          }else{object[key] = 0;}
        }
      },

      validateNullOrEmpty:function(val){
        if(typeof val =='string'){
          return (val !=="")? true:false;
        }else if(typeof val =='object'){
          return Array.isArray(val);
        }else{
          return false;
        }
      },
      updateFrom:function(vuFrom,object){
        var temporal="";
        for(key in object) {
            temporal = key;
            //key = modsJS.convertColumns( key.toLocaleLowerCase() );
            if(vuFrom.hasOwnProperty( key )){
                if(key.split('fecha').length>1){
                    vuFrom[key]= moment(new Date(object[key])).format("YYYY-MM-DD");
                }else{
                    vuFrom[key] = object[key];
                } 
            }
        }
    },
    
    validateUnderScript:function(string){
        return string.split('_').length>1 ? true:false;
    },
    
    convertColumns:function(column){
        if(util.validateUnderScript(column)){
            const arr = column.split('_');
          return   column = arr[0]+ util.getFirstCapitalLetter(arr[1]);
        }else{return column;}
    },
    
    getFirstCapitalLetter:function(letter){
        const arr = letter.split('');
        var string ="";
        for(var i=0; i<arr.length;i++){
            string  += (i===0) ? arr[i].toLocaleUpperCase() : arr[i];
        }
        return string;
    }
  
  
  };
  
  var utilGrid ={
  
    propsDefault:{
      heroes: Array,
      columns: Array,
      filterKey:String
    },
  
    dataDefault: function () {
      var sortOrders = {}
      this.columns.forEach(function (key) {
        sortOrders[key] = 1
      })
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    },
    component:{
      setOrder:function(){
        var sortOrders = {}
                this.columns.forEach(function (key) {
                  if(key !==""){
                    sortOrders[key] = 1
                  }
                })
                return {
                  sortKey: '',
                  sortOrders: sortOrders
         }
      }
    },
  
    computed:{
      filteredHeroes: function () {
        var sortKey = this.sortKey
        var filterKey = this.filterKey && this.filterKey.toLowerCase()
        var order = this.sortOrders[sortKey] || 1
        var heroes = this.heroes
        if (filterKey) {
          heroes = heroes.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          heroes = heroes.slice().sort(function (a, b) {
            a = a[sortKey.name]
            b = b[sortKey.name]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return heroes
      }
    },
  
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    methods: {
      sortBy: function (key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      }
    },
  
    createGrid:function(object){
        Vue.component('demo-grid',object.component)
        var demo = new Vue({
            el: object.element,
            data: {
              searchQuery: '',
              gridColumns: object.columns,
              gridData: object.data
            }
          });
  
          return demo;
    }
  };
  
  var utilString = {
    validateString: function (obj) {
      return Object.prototype.toString.call(obj) === '[object String]';
    }
   };