function checkWorks(cb, callback) {
    var bimThickness = null;//if bimThickness!=0 this request have a layers
    var bimLayersCount = null

    function tolerance(a,b) {
        a = a.replace(",",".");
        b = b.replace(",",".");
        a = parseFloat(a);
        b = parseFloat(b);
        let diff = b-a;
        if(a<b){
            return "+" + diff.toFixed(1);
        }
        if(a>b){
            return diff.toFixed(1);
        }
        if(a==b){ //seriously&
            return null
        }
    }
    function sortLayers (materials) {
        materials.sort(function (a,b) {
            if (a.level > b.level
            )
            {
                return 1;
            }
            if (a.level < b.level) {
                return -1;
            }
            return 0;
        })
        return materials
    }

    if(cb.layers&&cb.layers.length>0){//have and layers creating bimThickness
        cb.layers.forEach(function (d) {
            if(d.t){bimThickness+=parseInt(d.t)}
            bimLayersCount++
        })
    }

    if(bimThickness){console.log("have a" + bimLayersCount + " layers  summary =" + bimThickness)}

    if(cb.works&&cb.works.length>0) {
        let selected = null;
        cb.works.forEach(function (tech,techID){
            let bimLayerNumber = -1;
            tech.level=1;
            if(tech.thickness&&bimThickness&&bimThickness!=parseInt(tech.thickness)){tech.level=3;console.log('different summary thick')}
            let selfTech = tech;
            tech.work.forEach(function(work){
                let deepSelf = selfTech;
                work.typematerials.forEach(function(layer){
                    layer.level = 1;
                    let deepLayer = layer;
                    if(layer.function=="Слой"){
                        bimLayerNumber++;
                        if(bimLayerNumber<bimLayersCount) { //if we have layers fo compare
                            if(parseInt(layer.thickness!=cb.layers[bimLayerNumber].t)){deepSelf.level=3;layer.level = 3; console.log('different thickness on layer '  + bimLayerNumber + ' thick')}
                                layer.materials.forEach(function (material,materialI){
                                    material.level = 1;
                                    material.property.forEach(function (property){
                                        if(cb.layers[bimLayerNumber].t&&property.name=="Толщина"&&cb.layers[bimLayerNumber].t&&tolerance(cb.layers[bimLayerNumber].t,property.value)!=null){material.level=3;deepLayer.level=3; material.tolerance= tolerance(cb.layers[bimLayerNumber].t,property.value);}
                                        if(cb.layers[bimLayerNumber].w&&property.name=="Ширина"&&cb.layers[bimLayerNumber].w&&tolerance(cb.layers[bimLayerNumber].w,property.value)!=null){material.level=3;deepLayer.level=3;material.tolerance= tolerance(cb.layers[bimLayerNumber].w,property.value);}
                                        if(cb.layers[bimLayerNumber].d&&property.name=="Диаметр"&&cb.layers[bimLayerNumber].d&&tolerance(cb.layers[bimLayerNumber].d,property.value)!=null){material.level=3;deepLayer.level=3;material.tolerance= tolerance(cb.layers[bimLayerNumber].d,property.value);}
                                        if(cb.layers[bimLayerNumber].h&&property.name=="Высота"&&cb.layers[bimLayerNumber].h&&tolerance(cb.layers[bimLayerNumber].h,property.value)!=null){material.level=3;deepLayer.level=3;material.tolerance= tolerance(cb.layers[bimLayerNumber].h,property.value);}
                                        if(cb.layers[bimLayerNumber].s&&property.name=="Имя системы"&&cb.layers[bimLayerNumber].s&&cb.layers[bimLayerNumber].s!=property.value){material.level=3;}
                                      })
                                    if(material.guid==cb.layers[bimLayerNumber].id){layer.value = materialI;material.level=1;} //exactly same material
                                });
                                layer.materials = sortLayers(layer.materials);

                        }else{layer.level = 3;layer.level = 3}

                    }
                    if(layer.function=="Блок"){
                        if(bimLayersCount==1){
                            layer.materials.forEach(function (material){
                                material.level = 1;
                                material.property.forEach(function (property){
                                    if(cb.layers[0].t&&property.name=="Толщина"&&cb.layers[0].t&&parseInt(cb.layers[0].t)!=parseInt(property.value)){material.level=3;deepLayer.level=3; material.tolerance= tolerance(cb.layers[0].t,property.value);}
                                    if(cb.layers[0].w&&property.name=="Ширина"&&cb.layers[0].w&&parseInt(cb.layers[0].w)!=parseInt(property.value)){material.level=3;deepLayer.level=3;material.tolerance= tolerance(cb.layers[0].w,property.value);}
                                    if(cb.layers[0].d&&property.name=="Диаметр"&&cb.layers[0].d&&parseInt(cb.layers[0].d)!=parseInt(property.value)){material.level=3;deepLayer.level=3;material.tolerance= tolerance(cb.layers[0].d,property.value);}
                                    if(cb.layers[0].h&&property.name=="Высота"&&cb.layers[0].h&&parseInt(cb.layers[0].h)!=parseInt(property.value)){material.level=3;deepLayer.level=3;material.tolerance= tolerance(cb.layers[0].h,property.value);}
                                    if(cb.layers[0].s&&property.name=="Имя системы"&&cb.layers[0].s&&parseInt(cb.layers[0].s)!=parseInt(property.value)){material.level=3;deepLayer.level=3}
                                })
                            })
                            layer.materials = sortLayers(layer.materials);
                        }
                    }
                    if(layer.level>1){deepSelf.level=3}

            });
            if(cb.parameters&&cb.parameters.length>0)//trying to update parameters only if requested
                tech.requvar.forEach(function(variable){
                    cb.parameters.forEach(function (bimParameter) {
                        if(variable.сalculated&&bimParameter.id==variable.guid){variable.value = bimParameter.v; variable.status = true;}
                        if(!variable.сalculated&&bimParameter.id==variable.guid){variable.value = bimParameter.v; variable.status = true;}
                    })
                })
                if(deepSelf.level>1){selfTech.level=3}
                if(deepSelf.level==1&&!selected){selected=techID;}
        });
       })

        cb.selected = selected;

      }
    callback(cb);
}



module.exports = checkWorks;