    //console.log('window.location.hash', window.location.hash);
    //    console.log(BX24.placement.info());
    function suggestViewchange(e) {
        var activeIndex = suggestView.state.get('activeIndex');
        if (typeof activeIndex == 'number') {
            activeItem = suggestView.state.get('items')[activeIndex];
            if (activeItem) {
                var myGeocoder = ymaps.geocode(activeItem.value);
                myGeocoder.then(
                        function (res) {
                            v = res.geoObjects.get(0).geometry.getCoordinates();
                            mapG.setCenter(v, 16);
                        }
                    ,
                    function (err) {
                        console.log('Ошибка');
                    }
                );
            }
        }
    }


    function doYmap(name, value) {
        //    var f = this.getForm();
        return '<div id="divMap" name="divMap" style="width:280px;height:210px;border:1px solid"></div>';
    }
    var myWins = null;
    window.onhashchange = function() {
        window.location.reload(true);
    }

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function generateUID() {
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }

    function editObject(uid) {
        $('.uprMenu').empty();
        var a = $('<href="javascript:void(0)" ><i class="fa fa-floppy-o fa6" aria-hidden="true" item="Добавить обьект"></i></a>' ).appendTo($(".uprMenu"));
        a.click(function(){
            var ob = window['formAddr'].getFormData();
            console.log(ob);
        });
        var a = $('<href="javascript:void(0)" style="margin-left:12px" ><i class="fa fa-undo fa6" aria-hidden="true" item="Добавить обьект"></i></a>' ).appendTo($(".uprMenu"));
        a.click(function(){
            redrawObject();
        });
        if(!uid){
            uid = generateUID();
        }
        
        $(".content").empty();
        $("<div id='divTab' name='divTab'></div>").appendTo($(".content"));
        $("<div id='formAddr' name='formAddr'></div>").appendTo($(".content"));

        var formAddr = [
            {type:'hidden',name:'UID',value:uid},
            {
                type: "block",
                inputWidth: "auto",
                blockOffset: 1,
                className: 'wbutClass',
                offsetLeft: 5,
                list: [{
                        type: "block",
                        inputWidth: "auto",
                        blockOffset: 1,
                        className: 'wbutClass',
                        offsetLeft: 5,
                        list: [
                            { type: "input", name: 'TITLE', label: 'Заголовок', value: '', readonly: false, inputWidth: 240, labelWidth: 70 },
                            { type: "combo", name: 'TIPZD', label: 'Тип здания', value: '', readonly: false, inputWidth: 240, labelWidth: 70 },
                            { type: "combo", name: 'KLASS', label: 'Класс', value: '', readonly: false, inputWidth: 240, labelWidth: 70 },
                            {
                                type: "container",
                                name: "myGrid",
                                label: "",
                                labelWidth: 0,
                                inputWidth: 310,
                                inputHeight: 200
                            },
                        ]
                    },

                    { type: "newcolumn", offset: 20 },
                    {
                        type: "block",
                        inputWidth: "auto",
                        blockOffset: 1,
                        list: [
                            { type: "input", name: 'map_autocomplete', label: '', value: '', readonly: false, inputWidth: 540, labelWidth: 1 },
                            {
                                type: "block",
                                inputWidth: "auto",
                                blockOffset: 1,
                                list: [
                                    { type: "input", name: 'GOROD', offsetLeft: -10, label: 'Город', value: '', readonly: false, inputWidth: 180, labelWidth: 70 },
                                    { type: "input", name: 'ULITCA', label: 'Улица', value: '', readonly: false, inputWidth: 180, labelWidth: 70 },
                                    { type: "input", name: 'METRO', label: 'Метро', value: '', readonly: false, inputWidth: 180, labelWidth: 70 },
                                    { type: "input", name: 'RAJON', label: 'Район', value: '', readonly: false, inputWidth: 180, labelWidth: 70 },
                                    { type: "input", name: 'OKRUG', label: 'Округ', value: '', readonly: false, inputWidth: 180, labelWidth: 70 },
                                    { type: "input", name: 'DOM', label: 'Дом', value: '', readonly: false, inputWidth: 180, labelWidth: 70 },
                                    { type: "newcolumn", offset: 20 },
                                    { type: "template", name: "a", label: "", labelWidth: 1, value: "", position: "label-left", format: doYmap }
                                ]
                            },
                            {
                                type: "block",
                                blockOffset: 1,
                                list: [
                                    { type: "input", name: 'CENAIN', offsetLeft: -10, label: 'Стоимость метра в год От', value: '', readonly: false, inputWidth: 70, labelWidth: 170 },
                                    { type: "newcolumn", offset: 20 },
                                    { type: "input", name: 'CENAIN', offsetLeft: -10, label: 'До', value: '', readonly: false, inputWidth: 70, labelWidth: 40 },

                                ]
                            },
                        ]
                    },
                    {
                        type: "block",
                        inputWidth: "auto",
                        className: 'wbutClass',
                        offsetLeft: 5,
                        list: [

                        ]
                    }
                ]
            },
            {
                type: "block",
                inputWidth: "auto",
                blockOffset: 1,
                list: [{
                        type: "container",
                        name: "divSobst",
                        label: "",
                        labelWidth: 0,
                        inputWidth: 800,
                        inputHeight: 300
                    },
                    { type: "newcolumn", offset: 5 },
                    { type: "button", name: "addSobst", value: "+" }
                ]
            }
        ];

        var myTabbar = new dhtmlXTabBar({
            parent: "divTab",
            close_button: false,
            tabs: [
                { id: "a1", text: "Адрес", active: true },
                { id: "a2", text: "Помещения" },
                { id: "a3", text: "Файлы", close: false } // tab w/o close button
            ]
        });
        window['formAddr'] = myTabbar.tabs('a1').attachForm(formAddr); //new dhtmlXForm("formAddr", formAddr); 

        window['formAddr'].attachEvent("onButtonClick", function(name) {
            if (name == 'addSobst') {
                winSobst();
            }
        });

        var sobstTab = new dhtmlXTabBar(window['formAddr'].getContainer("divSobst"));
        sobstTab.addTab(
            "a1", // id
            "Собс. адреса", // tab text
            null, // auto width
            null, // last position
            false, // inactive
            false // disable close button <-- this one
        );

        var gridSobst = sobstTab.tabs('a1').attachGrid();
        gridSobst.setImagePath("js/dhtmlx/codebase/imgs/");
        gridSobst.setHeader("&nbsp;,Собственник,Управление");
        gridSobst.setInitWidths("50,*,140");
        gridSobst.setColAlign("left,left,left");
        gridSobst.setColTypes("sub_row,ro,ro");
        //gridSobst.setColSorting("str,str");                    
        gridSobst.setColumnIds("col0,col1,col1");
        gridSobst.setNoHeader(true);
        gridSobst.init();
        //gridSobst.setColumnHidden(2, true);
        
        waitGet(
            [
                'getOb',
            ], 
            [
                'klient',
            ], 
            [
                window['formAddr'].getFormData(),
            ],
            function(data) {
                console.log(data);
        });
        
        
/*        
        waitGet(['list'], ['klient'], [window['formAddr'].getFormData()], function(data) {
            console.log('klient',data)
            for (var i = 0; i < data.length; i++) {
                console.log(data[0]);
                for (var e=0;e<data[i].data.length;e++){
                    gridSobst.addRow(data[i].data[e].UID,[
                        data[i].data[e].TITLE,
                        data[i].data[e].TITLE,
                        '<a href="javascript:void(0)" UID="'+data[i].data[e].UID+'" onclick="winSobst('+"'"+data[i].data[e].UID+"'"+')">Подробнее</a>'
                    ]);
                    gridSobst.UserData[data[i].data[e].UID].allField = data[i].data[e];
                }
            }
        })
*/
        gridSobst.attachEvent("onRowCreated", function(rId,rObj,rXml){
            console.log('---------------',rObj);
        });

        gridSobst.attachEvent("onSubRowOpen", function(id,state){
            if(state){
                if($('#row_'+id).length == 0) {
                    this.cells(id,0).setContent('<div id="row_'+id+'" name="row_'+id+'" ></div>');
                    // создаём карточку предосмотра контактов
                    var divG = $('#row_'+id);
                    dhxForm = new dhtmlXForm('row_'+id, [
                            {type:"settings",position:"label-left"},
                            {type:"block", name:"kont", list: []},
                            {type:"Container", name:"ots",inputHeight:30},
                        ]);                    
                    var kont = this.UserData[id].allField.kont;
                    for(var i=0;i<kont.length;i++){
                        dhxForm.addItem('kont', {
                            type: "block",
                            name: "kont_" + i,
                            blockOffset: 0,
                            offsetLeft: 0,
                            list: [
                                {type:"label", label:kont[i].TITLE},
                                {type:"block", name:"phone_"+i, blockOffset: 0,offsetLeft: 0,list: []},
//                                {type:"newcolumn"},
//                                {type:"block", name:"email_", blockOffset: 0,offsetLeft: 0,list: []},
                            ]
                        });
                        for(var e=0;e<kont[i].PHONE.length;e++){
                            dhxForm.addItem('phone_'+i, {
                                type: "block",
                                blockOffset: 0,
                                offsetLeft:8,
                                list: [
                                    {type:"label", name:"kontF",labelLeft:0, labelWidth:140,label:kont[i].PHONE[e].LABEL},
                                    {type:"newcolumn"},
                                    {type:"label", name:"kontS", labelLeft:0,label:kont[i].PHONE[e].VALUE},
                                ]
                            });
                            
                        }                        
                        
                        
                    }
                    this.cells(id,0).resize();

                    console.log(this.UserData[id].allField.kont);
                }    
            }
        });

        sobstTab.addTab(
            "a2", // id
            "Собс. площадей", // tab text
            null, // auto width
            null, // last position
            false, // inactive
            false // disable close button <-- this one
        );
        sobstTab.tabs('a1').setActive();


        var grid = new dhtmlXGridObject(window['formAddr'].getContainer("myGrid"));
        var dataGrid = {
            "total_count": 50000,
            "pos": 0,
            "data": [{
                    "col1": "<a href='#'>Охрана</a>",
                    "col2": '',
                    "col3": "100"
                },
                {
                    "col1": "<a href='#'>Вход</a>",
                    "col2": '',
                    "col3": "1000"
                },
                {
                    "col1": "<a href='#'>ЭТАЖ</a>",
                    "col2": '',
                    "col3": "-200"
                },
                {
                    "col1": "<a href='#'>Доп. поля</a>",
                    "col2": '',
                    "col3": "-200"
                }
            ]
        };


        grid.setImagePath("js/dhtmlx/codebase/imgs/");
        grid.setHeader("Sales, Book Title, Author");
        grid.setNoHeader(true);
        grid.setInitWidths("90,40,*");

        grid.setColAlign("left,left,left");
        grid.setColTypes("ro,ro,ro");
        grid.setColSorting("str,str,str");

        grid.setColumnIds("col1,colB,col2");
        grid.enableMultiline(true);
        grid.splitAt(2);
        grid.init();
        grid.parse(dataGrid, "js");

        mapG = new ymaps.Map('divMap', {
            center: [55.76, 37.64],
            zoom: 16,
            controls: []
        });
        
        
        var im = $(window['formAddr'].getInput('map_autocomplete'));
        suggestView = new ymaps.SuggestView(im.attr('id'));
        suggestView.state.events.add('change', suggestViewchange);
        
        
        mapG.events.add('actionend', function(e) {
            var v = mapG.getCenter();
            ymaps.geocode(v, { kind: 'street' }).then(
                function(res) {
                    var street = res.geoObjects.get(0);
                    var name = street.properties.get('name');
                    window['formAddr'].setItemValue('ULITCA', name);
                    //alert(name);
                }
            );
            ymaps.geocode(v, { kind: 'metro' }).then(
                function(res) {
                    var street = res.geoObjects.get(0);
                    var name = street.properties.get('name').replace('метро ', '');
                    window['formAddr'].setItemValue('METRO', name);
                    //alert(name);
                }
            );
            ymaps.geocode(v, { kind: 'district' }).then(
                function(res) {
                    var street = res.geoObjects.get(0);
                    var name = street.properties.get('name');
                    window['formAddr'].setItemValue('RAJON', name);
                    //alert(name);
                }
            );
            ymaps.geocode(v, { kind: 'province' }).then(
                function(res) {
                    var street = res.geoObjects.get(0);
                    var name = street.properties.get('name');
                    window['formAddr'].setItemValue('OKRUG', name);
                    //alert(name);
                }
            );
            ymaps.geocode(v, { kind: 'locality' }).then(
                function(res) {
                    var street = res.geoObjects.get(0);
                    var name = street.properties.get('name');
                    window['formAddr'].setItemValue('GOROD', name);
                    //alert(name);
                }
            );
            ymaps.geocode(v, { kind: 'house' }).then(
                function(res) {
                    var street = res.geoObjects.get(0);
                    var name = street.properties.get('name');
                    var p = name.split(',');
                    window['formAddr'].setItemValue('DOM', p[1].trim());
                }
            );
            mapG.geoObjects.removeAll();
            var myGeoObject = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: v
                },
                properties: {}
            }, {
                preset: 'islands#blackStretchyIcon',
                draggable: false
            });
            mapG.geoObjects.add(myGeoObject);
        });
        /*
                                console.log(AjaxData);
                                mapG.setCenter([AjaxData.LAT, AjaxData.LNG], 16, {
                                    checkZoomRange: true
                                });            
        */
    }
    $( window ).resize(function() {
        var t = $('.footer').offset().top - 90;
        $('#mainDivW').css('height',t+'px');
    });
    
    function redrawObject(){
        $('.uprMenu').empty();
        var a = $('<href="javascript:void(0)" ><i class="fa fa-plus fa6" aria-hidden="true" item="Добавить обьект"></i></a>' ).appendTo($(".uprMenu"));
        a.click(function(){
            editObject();
        });
        $(".content").empty();
        var t = $('.footer').offset().top - 90;
        $('#mainDivW').css('height',t+'px');
        mapG = new ymaps.Map('mainDivW', {
            center: [55.76, 37.64],
            zoom: 9,
            controls: []
        });
    }

    function redrawListSobst(){
        $(".content").empty();
        // выводим грид собственников
        var t = $('.footer').offset().top - 90;
        $('#mainDivW').css('height',t+'px');
        var gridSobst = new dhtmlXGridObject($('#mainDivW')[0]);
        gridSobst.setImagePath("js/dhtmlx/codebase/imgs/");
        gridSobst.setHeader("&nbsp;,Собственник,Управление");
        gridSobst.setInitWidths("50,*,140");
        gridSobst.setColAlign("left,left,left");
        gridSobst.setColTypes("sub_row,ro,ro");
        //gridSobst.setColSorting("str,str");                    
        gridSobst.setColumnIds("col0,col1,col1");
        gridSobst.setNoHeader(true);
        gridSobst.init();
        //gridSobst.setColumnHidden(2, true);
        waitGet(['list'], ['klient'], null, function(data) {
            console.log('klient',data)
            for (var i = 0; i < data.length; i++) {
                console.log(data[0]);
                for (var e=0;e<data[i].data.length;e++){
                    gridSobst.addRow(data[i].data[e].UID,[
                        data[i].data[e].TITLE,
                        data[i].data[e].TITLE,
                        '<a href="javascript:void(0)" UID="'+data[i].data[e].UID+'" onclick="winSobst('+"'"+data[i].data[e].UID+"'"+')">Подробнее</a>'
                    ]);
                    gridSobst.UserData[data[i].data[e].UID].allField = data[i].data[e];
                }
            }
        })
    }
    
    $(document).ready(function() {
        // подгружаем или главную или остальные
        ymaps.ready(function() {
            switch (window.location.hash) {
                case '#object':
                    redrawObject();
                    break;
                case '#info':
                    redrawListSobst();
                    break;

                default:

                    break;
            }
        });
    });