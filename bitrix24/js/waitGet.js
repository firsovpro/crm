    /*global localStorage;*/
    var schema = {
        stores: [
            {
                name: 'Supplier',
                keyPath: 'SID',
                indexes: [
                    {name: 'SNAME'},
                    {name: 'STATUS'}, 
                    {name: 'CITY'}
                ]
            }, 
            {
                name: 'Part',
                keyPath: 'PID',
                indexes: [
                    {name: 'PNAME'}, 
                    {name: 'COLOR'}, 
                    {name: 'WEIGHT'},
                    {name: 'CITY'}
                ]
            }, 
            {
                name: 'Part-Supplier',
                autoIncrement: true,
                indexes: [
                    {name: 'SID'}, 
                    {name: 'PID'}, 
                    {name: 'QTY'}
                ]
            }
        ]
};
    
    
    function waitGet(inurl, table, postParam, fun) {

        // входные параметры inurl - масив урлов для get запроса или строка для пост
        // sobst - таблица собствеников
        // linkSobst - таблица привязки собствеников
        // linkKontakt - таблица привязки контактов
        // kont - таблица контактов
        // itemGl - таблица обьектов
        
        // виртуальные комманды
        // getOb - Возвращает скелет обьекта
        // klientFromOB - 
//        localStorage.clear();
        
        var outArr = [];
        if (!localStorage.getItem('items')) localStorage.setItem('items', JSON.stringify({}));
        if (1==1) {
            // если гет запрос
            var list = JSON.parse(localStorage.getItem('items'));
            console.log('localStorage',list);
            for (var i = 0; i < inurl.length; i++) {
                switch (inurl[i]) {
                    case 'getOb':
                        if(!list['sobst']){
                            list['sobst']=[];
                            localStorage.setItem('items', JSON.stringify(list));
                        }

                        if(!list[table[i]]){
                            list[table[i]]=[];
                            localStorage.setItem('items', JSON.stringify(list));
                        }
                        for(var e=0;e<table.length;e++){
                            if(table[e].UID == postParam[i].UID){
                                data = table[e];
                                var d = {
                                    id: inurl[i],
                                    data: table[e]
                                };
                                // если есть такой уид - заполняем привязку
                                data['SOBST'] = [];
                                if(!list['linkSobst']){
                                    list['linkSobst']=[];
                                    localStorage.setItem('items', JSON.stringify(list));
                                }
                                var linkSobst = list['linkSobst'];
                                
                                for(var l = 0;l<linkSobst.length;l++){
                                    if(linkSobst[l].PUID==data['UID']){
                                        // если есть собственник - читаем его данные
                                        var uidSobst = linkSobst[l].UID;
                                        for(var s=0;s<list['sobst'].length;s++){
                                            if(list['sobst'][s].UID==uidSobst){
                                                data['SOBST'].push(list['sobst'][s]);
                                            }
                                        }
                                    }
                                }
                                outArr.push(d);
                            }
                        }
                        break;
                    case 'saveOb':
                        
                        break;
                    default:
                }
                                


/*                
                if (inurl[i] == 'list') {
                    var list = JSON.parse(localStorage.getItem('items'));
                    if(postParam){
                        if(postParam[i]){
                            var data = [];
                            for(e=0;e<list[table[i]].length;e++){
                                if(list[table[i]].UID==postParam[i].UID){
                                    data.push(list[table[i]]);
                                }
                            }
                            var d = {
                                id: inurl[i],
                                data: data
                            };
                            outArr.push(d);
                            
                            console.log('filter',outArr);
                        }
                    }else{
                        var d = {
                            id: inurl[i],
                            data: list[table[i]]
                        };
                        outArr.push(d);
                    }
                }
                if (inurl[i] == 'add') {
                    var items = JSON.parse(localStorage.getItem('items'));
                    if (items[table[i]] == null) items[table[i]] = [];
                    items[table[i]].push(postParam);
                    localStorage.setItem('items', JSON.stringify(items));
                    var d = {
                        id: inurl[i],
                        data: JSON.parse(localStorage.getItem('items'))
                    };
                    outArr.push(d);
                }
                if (inurl[i] == 'edit') {
                    var items = JSON.parse(localStorage.getItem('items'));
                    if (items[table[i]] == null) items[table[i]] = [];

                    for(var e=0;e<items[table[i]].length;e++){
                        if(items[table[i]][e].UID==postParam){
                            var d = {
                                id: inurl[i],
                                data: items[table[i]][e]
                            };
                            outArr.push(d);
                        }
                    }
                }
                if (inurl[i] == 'save') {
                    var items = JSON.parse(localStorage.getItem('items'));
                    if (items[table[i]] == null) items[table[i]] = [];
                    
                    for(var e=0;e<items[table[i]].length;e++){
                        if(items[table[i]][e].UID==postParam['UID']){
                            if(table[i]=='object'){
                                
                            }else{
                                items[table[i]][e] = postParam;
                                
                            }
                            var d = {
                                id: inurl[i],
                                data: items[table[i]][e]
                            };
                            outArr.push(d);
                        }
                    }
                    localStorage.setItem('items', JSON.stringify(items));
                }
*/
            }
            if (fun) fun(outArr);
        }
    }
// JavaScript File