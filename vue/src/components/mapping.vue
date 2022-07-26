<template>
    <div>
        <div class="module">
            Настройте меппинг параметров Абсолют
        </div>
        <div class="module">
                <button type="button" class="btn btn-primary" @click="sendMapping()">Сохранить меппинг параметров</button>
        </div>
        <div class="module">
            <div v-for="(prm) in mapping">
                <div class="row zebra">
                    <div class="col-4">{{prm.name}}</div>
                    <input class="col-2" v-model="prm.nameInRevit" required>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "Mapping",
        data: function() {
            return {
                email:{
                    text: "",
                    validate: null
                },
                mapping: []
            };
        },
        methods: {
            updateMAPPING(obj){
                var self = this;
                axios({
                    method: 'post',
                    url: '/mapping/get',
                    data: {
                        session: obj.session
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            self.mapping = response.data.mapping;
                            /*self.$store.commit('setMessages', response.data);*/
                        })
            },
            sendMapping() {
                var self = this;
                axios({
                    method: 'post',
                    url: '/mapping/post',
                    data: {
                        session: self.$store.getters.getSession,
                        mapping: this.mapping
                    }
                })
                        .then(function (cb) {
                            //console.log(cb.data);
                            var obj = {
                                session: cb.data.session
                            }
                            self.updateMAPPING(obj);
                        })
            }
        },
        computed: {
            getCode() {
                return this.$store.getters.getCode
            },
            getMapping() {
                return this.$store.getters.getMapping
            }

        },
        created(){
            if(this.$store.getters.getMapping.length==0){
                var obj = {
                    session: this.$store.getters.getSession
                }
                this.updateMAPPING(obj)
            }


        }
    }
</script>

<style>



</style>
