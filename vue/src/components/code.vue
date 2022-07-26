<template>
    <div>
            <div v-for="(msg) in getCodeList">
                <div class="row zebra">
                    <div class="col-2" ><a :href="getLink(msg.code)">{{msg.code}}</a></div>
                    <div class="col-10">{{msg.ru}}</div>
                </div>
            </div>
    </div>
</template>

<script>
    import * as json from './data.json';
    console.log(json.Sheet1);
    var codeList = json.Sheet1;
    export default {
        name: "Code",
        methods: {
            getLink(code){
                let link = "" + code;
                if(this.$store.getters.getLayers){link+= "&" + this.$store.getters.getLayers}
                if(this.$store.getters.getParameters){link+= "&" + this.$store.getters.getParameters}
                return link
            }
        },
        computed: {
            getCodeList() {
                return this.$store.getters.getCodeList
            }

        },
        created(){
            this.$store.commit('setCodeList',codeList);
            console.log("code list has be plant");
        }
    }
</script>

<style>



</style>
