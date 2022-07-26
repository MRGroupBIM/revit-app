<template>
  <div id="app">
     <div class="container">
         <div class="row">
             <div class="col-6"></div>
             <div class="col-2" v-if="getMode=='work'"><button type="button" class="btn btn-light" @click="setMode('dialog')">Запросить</button></div>
             <div class="col-2" v-if="getMode!='work'"><button type="button" class="btn btn-light" @click="setMode('work')">Назад</button></div>
             <div class="col-2"><button type="button" class="btn btn-light" @click="setMode('code')">Код</button></div>
         </div>
         <Works v-if="getMode=='work'"></Works>
         <Dialog v-if="getMode=='dialog'"></Dialog>
         <Code v-if="getMode=='code'"></Code>
     </div>

  </div>

</template>

<script>
    import Works from "./components/works.vue";
    import Dialog from "./components/dialog.vue";
    import Mapping from "./components/mapping.vue";
    import Code from "./components/code.vue";

    export default {
        name: "App",
          components: {
             Works,Dialog,Mapping,Code
          },
        methods: {
            setMode(val){
                console.log(val);
                this.$store.commit('setMode', val);
            }
        },
        computed: {
        getMode(){
            return this.$store.getters.getMode
        }
        },
        created(){
            this.$store.commit('setParams',params);
            console.log("created");
        }
    }
</script>

<style>

       .text-name {
           margin-top: 7px;
           margin-bottom: 10px;
           margin: 5px;
           color: white;
           background: #6a1b9a;
           font-size: 1rem;
       }

        .nav-country-select option{
            background-color: #fff;
        }

        .zebra.row:nth-of-type(odd) div {
            background-color:#cfd8dc;
            padding-bottom: 5px;
        }
        .zebra.row:nth-of-type(even) div {
            background: #eceff1;
            padding-bottom: 5px;
        }
        .orange {
            background: #ff5722;
            padding-bottom: 5px;
        }

        .red{
            background: #bf360c !important;
            color: white !important;;
            padding-bottom: 5px;
        }

       .correct{
           background: white !important;
           color: black !important;;
           padding-bottom: 5px;
       }

        .red-select{
            background: #bf360c;
            color: white;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 0.75rem center;
            background-size: 16px 12px;
            display: block;
            width: 100%;
            padding: 0.375rem 2.25rem 0.375rem 0.75rem;
            -moz-padding-start: calc(0.75rem - 3px);
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }


</style>
