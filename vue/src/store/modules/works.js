const getDefaultState = () => {
    return {
        technologies: [],
        layers: [],
        parameters: [],
        mode: "work",
        code: null,
        session: null,
        selected:0,
        selectedLevel: null,
        value: "",
        full: false,
        loaded: true,
        name: "",
        showAll: false,
        fullName: "",
        category: null,
        codeList: []
    }
};
export default {
    state: getDefaultState(),
    getters: {
        getParameters(state) {
            return state.parameters
        },
        getCodeList (state) {
            return state.codeList
        },
        getSelectedLevel (state) {
            return state.selectedLevel
        },
        getCategory(state) {
            return state.categoty
        },
        getMode (state) {
          return state.mode
        },
        getCode (state) {
            return state.code
        },
        getLayers (state) {
            return state.layers
        },
        getShowAll(state){
            return state.showAll;
        },
        getFull(state){
            return state.full;
        },
        getTech(state) {
            console.log('tech-',state.technologies);
            return state.technologies;
        },
        getValue(state) {
            return state.value;
        },
        getFullName(state) {
            return state.fullName;
        },
        getSelectedTech(state) {
            return state.selected;
        },
        getSession(state) {
            return state.session;
        }
    },
    mutations: {
        setShowAll(state, val){
            state.showAll = val;
        },
        saveTech(state) {
            var name = "";
            var find = true;
            state.technologies[state.selected].work.forEach(function (work){
                var wname =  work.name;
                var materialsName = " (";
                work.typematerials.forEach(function (types,n){
                    //console.log(types);
                    var id =  types.value;
                    var array = types.materials;
                    if(id!=undefined){
                       materialsName +=  array[id].name + "//";
                       types.level = array[id].level; //set level of fit from checked materials to typematerials
                    }else{find = false}
                });
                materialsName+= ");";
                name+= wname + materialsName;
            });
            if(state.technologies[state.selected].requvar.length>0){
                state.technologies[state.selected].requvar.forEach(function (variable) {
                    //console.log(variable);
                    if(variable.сalculated){
                        if(variable.value!=undefined)
                        {name+= " " + variable.representation + ":" + variable.value
                        }else{find = false}
                    }
                });
            }
           if(find){state.full = find;console.log("full")}
            state.fullName = name;
            state.value = JSON.stringify(state.technologies[state.selected]);
        },
        setSelectedTech(state, value) {
            //console.log(state.technologies[value].level);
            state.getSelectedLevel = state.technologies[value].level;
            state.selected = value
        },
        saveName(state, value) {
            state.name = JSON.stringify(value);
        },
        setParams(state, value) {
            var data = JSON.parse(value);
            console.log(data);
            state.code = data.code;
            state.session = data.session;
            state.categoty = data.categoty;
            state.mapping = data.mapping;
            state.layers = data.layers;
            state.technologies = data.works;
            if(data.selected){state.selected = data.selected;}else{state.selected=0}
            state.parameters = data.parameters;
            console.log(data.mode);
        },
        setMode(state, value) {
            state.mode = value;
        },
        setCodeList(state, value) {
            state.codeList = value;
        }
    }

}
