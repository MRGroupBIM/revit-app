<template>
    <div>
        <div>
            Структура компонента Revit ||<span v-for="(layer) in getLayers">{{layer.t}}мм||</span>
            <span>Опишите, какую технологию вы хотите добавить для такого компонента c кодом по классификатору {{getCode}}</span>
        </div>
        <div>
            <textarea class="form-control form-control-sm" id="request" v-model="text" rows="3" required></textarea>
            <button type="button" class="btn btn-primary" @click="addMessage()">Добавить</button>
        </div>
        <div>
            <div v-for="(msg) in getMessages">
                <div class="row zebra">
                    <div class="col-1">{{msg.code}}</div>
                    <div class="col-3">{{msg.text}}</div>
                    <div class="col-4"><span v-for="(layer) in msg.layers">{{layer.t}}мм|</span></div>
                    <div class="col-2" @click="deleteMessage(msg._id)">X</div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "Dialogs",
        data: function() {
            return {
                text: "",
                messages: []
            };
        },
        methods: {
            deleteMessage(id){
                var self = this;
                axios({
                    method: 'post',
                    url: '/message/delete',
                    data: {
                        id: id,
                        session: self.$store.getters.getSession
                    }
                })
                        .then(function (response) {
                            console.log("after delete",response)
                            let obj = {
                                session: response.data.session
                            }
                            self.requestMessages(obj);
                        })
            },
            requestMessages(obj){
              var self = this;
              axios({
                  method: 'post',
                  url: '/message/get',
                  data: {
                      session: obj.session
                  }
              })
                      .then(function (response) {
                          console.log(response);
                          /*self.messages = response.data.messages;*/
                          self.$store.commit('setMessages', response.data.messages);
                      })
          },
            addMessage() {
                var self = this;
                axios({
                    method: 'post',
                    url: '/message/post',
                    data: {
                        code: self.$store.getters.getCode,
                        text: self.text,
                        session: self.$store.getters.getSession,
                        layers: self.$store.getters.getLayers,
                        category: self.$store.getters.getCategory
                    }
                })
                        .then(function (cb) {
                            console.log(cb.data);
                            let obj = {
                                session: cb.data.session
                            };
                            self.requestMessages(obj);
                        })
            }
        },
        computed: {
            getCode() {
                return this.$store.getters.getCode
            },
            getLayers() {
                return this.$store.getters.getLayers
            },
            getMessages() {
                return this.$store.getters.getMessages
            }
        },
        created(){
            var obj = {
                session: this.$store.getters.getSession
            };
            this.requestMessages(obj);
        }
    }
</script>

<style>



</style>
