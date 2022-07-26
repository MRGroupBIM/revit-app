<template>
        <div>
            <div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="level" v-model="showAll">
                    <label class="form-check-label" for="level">Отобразить неподходящие</label>
                </div>
            </div>
                <div v-if="getFull" class="text-name">
                    <span >{{getFullName}}</span>
                </div>
                <div v-for="(tech,indexT) in getTech">
                    <div  v-show="changeSelectedTech==indexT">
                        <span>Выберите технологию</span>
                        <div class="form-group">
                            <select :class="[{'red-select' : tech.level=='3'},{'form-select' : tech.level!='3'}]" v-model="changeSelectedTech">
                                <option v-for="(techSelect,indexS) in getTech" v-bind:value="indexS" :class="[{ 'red' : techSelect.level==3},{ 'correct' : techSelect.level!=3}]" v-show="showAll||(techSelect.level==1)" @change="onChange()">{{cutText(techSelect.name)}}</option>
                            </select>
                        </div>
                    </div>
                    <div v-show="changeSelectedTech==indexT">
                            <div v-for="(work,indexW) in tech.work">
                                    <div class="col-12">
                                        <span class="text-left work-name">Работа: {{work.name}}</span>
                                    </div>
                                <div class="row zebra" v-for="(layer,indexL) in work.typematerials">
                                    <div class="row">
                                        <div class="col-8">
                                            <span class="text-left layer-name">{{layer.name}}</span>
                                        </div>
                                        <div class="col-4">
                                            <span v-if="layer.function=='Слой'">{{layer.thickness}} мм</span>
                                            <span v-if="layer.function=='Блок'">Блок</span>
                                            <span v-if="layer.function=='Немоделируемое'">Немоделируемое</span>
                                        </div>
                                    </div>
                                    <div class="row input">
                                        <div class="col-12">
                                            <select :class="[{'red-select' : layer.level=='3'},{'form-select' : layer.level!='3'}]" v-model="getTech[indexT].work[indexW].typematerials[indexL].value" @change="onChange()">
                                                <option v-for="(material,indexm) in layer.materials" v-bind:value="indexm" :class="[{'red' : material.level=='3'}]" v-show="showAll||material.level=='1'"><span v-if="material.level=='3'||material.tolerance">{{material.name}} ({{material.tolerance}})</span><span v-if="material.level=='1'">{{material.name}}</span></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row zebra" v-for="(param) in tech.requvar" >
                                    <div  class="row" v-if="param.сalculated">
                                        <div class="col-2">
                                            <span class="text-left" :class="[{ 'text-left red' : !param.status}]">#</span>
                                        </div>
                                        <div class="col-6">
                                            <span class="text-left">{{param.representation}}</span>
                                        </div>
                                        <div class="col-4">
                                            <input class="form-control form-control-sm" type="text" v-model="param.value" @change="onChange()">
                                        </div>
                                    </div>
                                    <div class="row" v-if="!param.сalculated">
                                        <div class="col-2">
                                            <span class="text-left" :class="[{ 'text-left red' : !param.status}]">#</span>
                                        </div>
                                        <div class="col-6">
                                            <span class="text-left">{{param.representation}}</span>
                                        </div>
                                        <div class="col-4">
                                            <span class="text-left" v-if="!param.status">Не заполнено в Revit</span>
                                            <span class="text-left" v-if="param.status||param.value">Значение в Revit ({{param.value}})</span>
                                        </div>
                                    </div>

                            </div>
                    </div>
                </div>

        </div>

    </div>
    </div>
</template>

<script>
    export default {
        name: "Works",
        methods: {
            onChange() {
                this.$store.commit('saveTech');
                this.$store.commit('saveName',this.$store.getters.getFull);
            },
            cutText(text) {
                const maxLength = 69;
                if (text.length > maxLength) {
                    return text.substr(0, maxLength) + '...';
                } else {return text}
            }
        },
        computed: {
            showAll: {
                get () {
                    return this.$store.getters.getShowAll
                },
                set (value) {
                    this.$store.commit('setShowAll', value);
                }
            },
            getFull(){
                return this.$store.getters.getFull;
            },
            getCode() {
                return this.$store.getters.getCode
            },
            getValue() {
                return this.$store.getters.getValue
            },
            getTech() {
                return this.$store.getters.getTech;
            },
            getFullName() {
                var name = this.$store.getters.getFullName;
                this.name = name;
                this.$store.commit('saveName',name);
                return this.$store.getters.getFullName;
            },
            getValue(){
                return this.$store.getters.getValue
            },
            changeSelectedTech: {
                get () {
                    return this.$store.getters.getSelectedTech
                },
                set (value) {
                    this.$store.commit('setSelectedTech', value);
                }
            }

        },
        created(){

        }
    }
</script>

<style>


</style>
