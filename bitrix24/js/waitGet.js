    /*global localStorage;*/
    var schema = {
        stores: [
            {
                name: 'sobst',
                keyPath: 'UID',
                indexes: [
                    {name: 'EMAIL'}, 
                    {name: 'PARTNER'},
                    {name: 'REM'},
                    {name: 'SITE'},
                ]
            }, 
            {
                name: 'kont',
                keyPath: 'UID',
                indexes: [
                    {name: 'TITLE'}, 
                ]
            }, 
            {
                name: 'kont-sobst',
                autoIncrement: true,
                indexes: [
                    {name: 'UID'}, 
                    {name: 'PUID'}, 
                ]
            }
        ]
    };
    
    var Webdb = openDatabase("rent21", "0.1", "A list of to do items.", 200000);    
    if(!Webdb){alert("Failed to connect to database.");}    

    var sqlfields = 'CREATE TABLE IF NOT EXISTS `allfields` ('+
        '  `ID` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'+
        '  `UID` varchar(64) DEFAULT NULL,'+
        '  `PUID` varchar(64) DEFAULT NULL,'+
        '  `TITLE` varchar(64) DEFAULT NULL,'+
        '  `TIP` varchar(32) DEFAULT NULL,'+
        '  `VALUE` text,'+
        '  `LABEL` text,'+
        '  `MFIELD` varchar(32) DEFAULT NULL'+
    ')'; 


    var sqlperson = 'CREATE TABLE IF NOT EXISTS `person` ('+
        '  `ID` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'+
        '  `UID` varchar(64) DEFAULT NULL,'+
        '  `TITLE` varchar(64) DEFAULT NULL,'+
        '  `TIP` varchar(32) DEFAULT NULL,'+
        '  `VALUE` text,'+
        '  `MFIELD` text NOT NULL'+
    ')'; 

    var sqlsobst = 'CREATE TABLE IF NOT EXISTS `sobst` ('+
        '  `ID` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'+
        '  `UID` varchar(64) DEFAULT NULL,'+
        '  `TITLE` varchar(64) DEFAULT NULL,'+
        '  `SITE` varchar(64) DEFAULT NULL,'+
        '  `EMAIL` varchar(64) DEFAULT NULL,'+
        '  `REM` text,'+
        '  `PARTNER` INTEGER(1) DEFAULT 0'+
    ')'; 


    function recreateAllDB(){
        Webdb.transaction(function(tx) {
            tx.executeSql('drop table allfields', [], function(tx,result){
                tx.executeSql(sqlfields);
            }, function(tx, error){
                tx.executeSql(sqlfields);
                console.log(tx, error);
            });
            tx.executeSql('drop table person', [], function(tx,result){
                tx.executeSql(sqlperson);
            }, function(tx, error){
                tx.executeSql(sqlperson);
                console.log(tx, error);
            });
            tx.executeSql('drop table sobst', [], function(tx,result){
                tx.executeSql(sqlsobst);
            }, function(tx, error){
                console.log(tx, error);
                tx.executeSql(sqlsobst);
            });
        });    
    }

recreateAllDB();

/*    
    Webdb.transaction(function(tx) {
        tx.executeSql('DROP TABLE person', [], function(result){
            console.log(result);
            
        }, function(tx, error){
            console.log(tx, error);
        });
    });    
*/    



function testDB(){
    Webdb.transaction(function(tx) {
        tx.executeSql('select * from allfields', [], function(tx,result){
            console.log(result);
        }, function(tx, error){
            console.log(tx, error);
        });
    });    
    
}
/*
    Webdb.transaction(function(tx) {
        tx.executeSql("INSERT INTO `person` ( `TITLE`, `PUID`, `TIP`, `VALUE`, `MFIELD`) VALUES ( NULL, NULL, 'SOBST', NULL,'')", [], function(result){
            console.log(result);
            
        }, function(tx, error){
            console.log(tx, error);
        });
    });    
*/

//SHOW TABLES
/*    
    var db = new ydn.db.Storage('rent21', schema);   
    console.log(db.sql);
//    db.transaction(function(tx) {
//      // Insert 2 rows
//      console.log(tx);

//    });    
    
    db.remove('sobst','8faeae7f-e07a-45a2-80ba-92b9447e75c2').fail(function(e) {
        console.error(e);
    });    
    

    db.executeSql('SELECT * FROM sobst').then(function(results) {
        console.log(results);
    }, function(e) {
        throw e;
    });    
    
*/    
    function replaceFromUID(table,item,fun){
        Webdb.transaction(function(tx) {
            tx.executeSql("select count(UID) as count from allfields WHERE UID='"+item.UID+"'", [], function(tx,result){
                if(result.rows[0].count==0){
                    var strK ='';
                    var strV ='';
                    for(var key in item){
                        if(strK!='')strK+=',';
                        strK += "`"+key+"`";
                        if(strV!='')strV+=',';
                        strV += "'"+item[key]+"'";
                    }
                    var sql = "INSERT INTO `"+table+"` ("+strK+") VALUES ("+strV+")";
                    tx.executeSql(sql, [], function(tx,result){
                        fun({
                                item:item,
                                result:result,
                                sql:sql
                        });
                    }, function(tx, error){
                        fun({error:error})
                    });
                }else{
                    var strK ='';
                    for(var key in item){
                        if(key!='UID'){
                            if(strK!='')strK+=',';
                            strK += "`"+key+"`='"+item[key]+"'";
                        }
                    }
                    var sql = "UPDATE `"+table+"` SET "+strK+" WHERE UID='"+item.UID+"'";
                    tx.executeSql(sql, [], function(tx,result){
                        fun({
                                item:item,
                                result:result,
                                sql:sql
                        });
                    }, function(tx, error){
                        fun({error:error})
                    });
                }
            }, function(tx, error){
                fun({error:error})
            });
        });    
    }
    
    function saveKont(kont){
        
        replaceFromUID('allfields',{UID:'1111111',TIP:'FIELD',VALUE:'2222222'},function(data){
            console.log(data);
        })
        
        Webdb.transaction(function(tx) {
            var prom = [];
            for(var i=0;i<kont.length;i++){
                prom.push(
                    new Promise(function(resolve, reject){
                        var item = kont[i];
                        tx.executeSql("select count(UID) as count from allfields WHERE `TIP`='KONT' AND UID='"+item.UID+"'", [], function(tx,result){
                            resolve({count:result.rows[0].count,item:item});
                        }, function(tx, error){
                            reject(error);
                        });
                        
                    })
                );
            }
            Promise.all(prom).then(function(e) {
                var prom = [];
                for(i=0;i<e.length;i++){
                    if(e[i].count==0){
                        sql = "INSERT INTO `allfields` (`TIP`,`UID`) VALUES (?,?)";
                    }else{
                        
                    }
                    prom.push(
                        new Promise(function(resolve, reject){
                            var item = e[i].item;
                            tx.executeSql(sql, ['KONT',item.UID], function(tx,result){
                                resolve({result:result,item:item});
                            }, function(tx, error){
                                reject(error);
                            });
                            
                        })
                    );
                }
                
                Promise.all(prom).then(function(e) {
                    // запись контакта создана. удаляем все поля от неё
                    var prom = [];
                    for(i=0;i<e.length;i++){
                        var sql = "DELETE FROM `allfields` WHERE `TIP`='FIELD' AND `PUID` ='"+e[i].item.UID+"'";
                        var item = e[i].item;
                        prom.push(
                            new Promise(function(resolve, reject){
                                var item = e[i].item;
                                tx.executeSql(sql, [], function(tx,result){
                                    resolve({result:result,item:item});
                                }, function(tx, error){
                                    reject(error);
                                });
                                
                            })
                        );
                        
                    }
                    Promise.all(prom).then(function(e) {
                        //пишем поля которые не масивы и не UID
                        var prom = [];
                        for(i=0;i<e.length;i++){
                            for (key in e[i].item) {
                                if(key!='UID' ){
                                    if(! $.isArray(e[i].item[key])) {
                                        sql = "INSERT INTO `allfields` (`TIP`,`TITLE`,`VALUE`,'PUID') VALUES (?,?,?,?)";
                                        prom.push(
                                            new Promise(function(resolve, reject){
                                                var item = e[i].item;
                                                tx.executeSql(sql, ['FIELD',key,item[key],item.UID], function(tx,result){
                                                    resolve({result:result,item:item});
                                                }, function(tx, error){
                                                    reject(error);
                                                });
                                                
                                            })
                                        );
                                        
                                    }else{
                                        for(m=0;m<e[i].item[key].length;m++){
                                            sql = "INSERT INTO `allfields` (`TIP`,`TITLE`,`VALUE`,`LABEL`,'UID') VALUES (?,?,?,?,?)";
                                            prom.push(
                                                new Promise(function(resolve, reject){
                                                    var s = e[i].item[key][m];
                                                    s.TITLE = key;
                                                    s.PARENT = e[i].item.UID;
                                                    s.PARENT = e[i].item.UID;

                                                    var item = e[i].item;
                                                    replaceFromUID('allfields',{UID:item.UID,TIP:'FIELD',VALUE:s.VALUE,LABEL:s.LABEL},function(data){
                                                        if(data.error){
                                                            reject(data.error);
                                                        }else{
                                                            resolve({result:data,item:s});
                                                        }
                                                    })
                                                })
                                            );
                                        }                                        
                                    }
                                }
                            }
                        }
                        Promise.all(prom).then(function(e) {
                            // пишем привязку полей поля
                            var prom = [];
                            var uids = [];
                            for(var i=0;i<e.length;i++){
                                if(e[i].item.PARENT){
                                    console.log(e[i].item);
                                    if(uids.indexOf(e[i].item.PARENT)==-1)uids.push(e[i].item.PARENT);
                                }
                            }
                            var s = uids.join("','");
                            var sql = "DELETE FROM `allfields` WHERE `TIP`='LINC' AND `PUID` in ('"+s+"')";
                            var items = e;
                            Webdb.transaction(function(tx) {
                                tx.executeSql(sql, [], function(tx,result){
                                    prom=[];
                                    for(var i=0;i<items.length;i++){
                                        if(items[i].item.PARENT){
                                            sql = "INSERT INTO `allfields` (`TIP`,`UID`,`PUID`) VALUES (?,?,?)";
                                            prom.push(
                                                new Promise(function(resolve, reject){
                                                    var item = e[i].item;
                                                    tx.executeSql(sql, ['LINC',item.UID,item.PARENT], function(tx,result){
                                                        resolve({result:result,item:item});
                                                    }, function(tx, error){
                                                        reject(error);
                                                    });
                                                })
                                            );
                                            
                                        }                                        
                                    }
                                    //resolve({result:result,item:item});
                                }, function(tx, error){
                                    //reject(error);
                                });
                                
                            });

                                    // получаем неповторяющ уиды 
                                    
/*
                                    sql = "INSERT INTO `allfields` (`TIP`,`UID`,`PUID`) VALUES (?,?,?)";
                                    prom.push(
                                        new Promise(function(resolve, reject){
                                            var item = e[i].item;
                                            tx.executeSql(sql, ['LINC',item.UID,item.PARENT], function(tx,result){
                                                resolve({result:result,item:item});
                                            }, function(tx, error){
                                                reject(error);
                                            });
                                        })
                                    );
*/                                    
//                            Promise.all(prom).then(function(e) {
//                                console.log(e);
//                                testDB();
//                            }, function(e) {
//                                console.log('fig vam delete',e)
//                            });
                        }, function(e) {
                            console.log('fig vam insert',e)
                        });
                        
                        
                    }, function(e) {
                        console.log('fig vam delete',e)
                    });
                }, function(e) {
                    console.log('fig vam',e)
                });
              // все загрузились
            }, function(e) {
                console.log('fig vam',e)
            });

        });    
    }

    function waitGet(inurl, table, postParam, fun) {

        // входные параметры inurl - масив урлов для get запроса или строка ����ля пост
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
        
        for (var i = 0; i < inurl.length; i++) {
            switch (inurl[i]) {
                    case 'saveSobst':
                        console.log(postParam[i]);
                        Webdb.transaction(function(tx) {
                            tx.executeSql("select count(ID) as COUNT from sobst WHERE UID='"+postParam.UID+"'", [], function(tx,result){
                                if(result.rows[0].COUNT==0){
                                    // добавление
                                    tx.executeSql("INSERT INTO `sobst` (`UID`,`TITLE`,`SITE`,`EMAIL`,`REM`,`PARTNER`) VALUES ( ?,?,?,?,?,?)", [
                                            postParam.UID,
                                            postParam.TITLE,
                                            postParam.SITE,
                                            postParam.EMAIL,
                                            postParam.REM,
                                            0                                            
                                        ], function(result){
                                        console.log(result);
                                    }, function(tx, error){
                                        console.log(tx, error);
                                    });
                                    
                                }
                            }, function(tx, error){
                                console.log(tx, error);
                            });
                        });    
                    break;
                    case 'listSobst':
                        Webdb.transaction(function(tx) {
                            tx.executeSql("select * from sobst", [], function(tx,result){
                                if (fun) fun(result.rows);        

                            }, function(tx, error){
                                console.log(tx, error);
                            });
                        });    
                        
                        break;
                default:
            }            
        }

        return;
        
        
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