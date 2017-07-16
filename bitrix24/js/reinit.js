    //console.log('window.location.hash', window.location.hash);
    //    console.log(BX24.placement.info());

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

    function waitGet(inurl, table, postParam, fun) {
        // входные параметры inurl - масив урлов для get запроса или строка для пост
        var outArr = [];
        if (!localStorage.getItem('items')) localStorage.setItem('items', JSON.stringify({}));
        if (1==1) {
            // если гет запрос
            for (var i = 0; i < inurl.length; i++) {
                if (inurl[i] == 'list') {
                    var list = JSON.parse(localStorage.getItem('items'));
                    var d = {
                        id: inurl[i],
                        data: list[table[i]]
                    };
                    outArr.push(d);
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
                    var d = {
                        id: inurl[i],
                        data: items[postParam]
                    };
                    outArr.push(d);
                }
                if (inurl[i] == 'save') {
                    var items = JSON.parse(localStorage.getItem('items'));
                    items[postParam.id] = postParam;
                    localStorage.setItem('items', JSON.stringify(items));
                    var d = {
                        id: inurl[i],
                        data: items[postParam.id]
                    };
                    outArr.push(d);
                }

            }
            if (fun) fun(outArr);
        }
    }



    function createFormKont(p) {
        p = $(p);
        if ($(p).data('kont') == undefined) {
            $(p).data('kont', []);
        }
        var c = $(p).children();
        var div = $('<div id="kont' + c + '" name="kont' + c + '">').appendTo(p);
        var fk = new dhtmlXForm("kont" + c, [{
            type: "block",
            inputWidth: "auto",
            className: 'blockKont',
            blockOffset: 0,
            offsetLeft: 0,
            list: [

                { type: "input", name: 'TITLE', label: 'Наименование', value: '', readonly: false, inputWidth: 300, labelWidth: 120 },

                {
                    type: "block",
                    inputWidth: "auto",
                    blockOffset: 0,
                    offsetLeft: 0,
                    list: [{
                            type: "block",
                            inputWidth: "auto",
                            blockOffset: 0,
                            offsetLeft: 0,
                            list: [{
                                    type: "block",
                                    inputWidth: "auto",
                                    blockOffset: 0,
                                    name: 'phone',
                                    offsetLeft: 0,
                                    list: [
                                        { type: "label", label: 'Телефон', labelWidth: 'auto' },
                                        { type: "newcolumn" },
                                        { type: "button", name: "btnAddPhone", value: "+" }

                                    ]
                                },
                                {
                                    type: "block",
                                    inputWidth: "auto",
                                    blockOffset: 0,
                                    name: 'phone_',
                                    offsetLeft: 0,
                                    list: [{
                                        type: "block",
                                        inputWidth: "auto",
                                        blockOffset: 0,
                                        offsetLeft: 0,
                                        list: [
                                            { type: "input", name: 'PHONE_0', label: 'Телефон', value: '', readonly: false, inputWidth: 130, labelWidth: 'auto' },
                                            { type: "newcolumn" },
                                            { type: "input", name: 'PHONELABEL_0', label: '', value: '', readonly: false, inputWidth: 230, labelWidth: 'auto' },
                                        ]
                                    }]
                                },
                            ]
                        },
                        { type: "newcolumn" },
                        {
                            type: "block",
                            inputWidth: "auto",
                            blockOffset: 0,
                            offsetLeft: 0,
                            list: [{
                                    type: "block",
                                    inputWidth: "auto",
                                    blockOffset: 0,
                                    name: 'email',
                                    offsetLeft: 0,
                                    list: [
                                        { type: "label", label: 'Email', labelWidth: 'auto' },
                                        { type: "newcolumn" },
                                        { type: "button", name: "btnAddEmail", value: "+" }

                                    ]
                                },
                                {
                                    type: "block",
                                    inputWidth: "auto",
                                    blockOffset: 0,
                                    name: 'email_',
                                    offsetLeft: 0,
                                    list: [{
                                        type: "block",
                                        inputWidth: "auto",
                                        blockOffset: 0,
                                        offsetLeft: 0,
                                        list: [
                                            { type: "input", name: 'EMAIL_0', label: 'email', value: '', readonly: false, inputWidth: 130, labelWidth: 'auto' },
                                            { type: "newcolumn" },
                                            { type: "input", name: 'EMAILLABEL_0', label: '', value: '', readonly: false, inputWidth: 230, labelWidth: 'auto' },
                                        ]
                                    }]
                                },
                            ]
                        },


                    ]
                },
            ]
        }, ])
        $(fk.getInput('PHONE_0')).inputmask("+7(999) 999-99-99");
        fk.attachEvent("onButtonClick", function(name) {
            if (name.indexOf('btnDelEmail') != -1) {
                var e = name.replace('btnDelEmail', '');
                this.removeItem('EMAIL_BL' + e);
            }
            if (name.indexOf('btnDelPhone') != -1) {
                var e = name.replace('btnDelPhone', '');
                this.removeItem('PHONE_BL' + e);
            }
            if (name == 'btnAddPhone') {
                // проверяем сколько есть телефонов
                var i = 0;
                while (this.isItem('PHONE_' + i)) {
                    i++;
                }
                this.addItem('phone_', {
                    type: "block",
                    inputWidth: "auto",
                    name: "PHONE_BL" + i,
                    blockOffset: 0,
                    offsetLeft: 0,
                    list: [
                        { type: "input", name: 'PHONE_' + i, label: 'Телефон', value: '', readonly: false, inputWidth: 130, labelWidth: 'auto' },
                        { type: "newcolumn" },
                        { type: "input", name: 'PHONELABEL_' + i, label: '', value: '', readonly: false, inputWidth: 190, labelWidth: 'auto' },
                        { type: "newcolumn" },
                        { type: "button", name: "btnDelPhone" + i, value: "-" }
                    ]
                });
                $(this.getInput('PHONE_' + i)).inputmask("+7(999) 999-99-99");
            }

            if (name == 'btnAddEmail') {
                // проверяем сколько есть 
                var i = 0;
                while (this.isItem('EMAIL_' + i)) {
                    i++;
                }
                this.addItem('email_', {
                    type: "block",
                    inputWidth: "auto",
                    name: "EMAIL_BL" + i,
                    blockOffset: 0,
                    offsetLeft: 0,
                    list: [
                        { type: "input", name: 'EMAIL_' + i, label: 'email', value: '', readonly: false, inputWidth: 130, labelWidth: 'auto' },
                        { type: "newcolumn" },
                        { type: "input", name: 'EMAILLABEL_' + i, label: '', value: '', readonly: false, inputWidth: 190, labelWidth: 'auto' },
                        { type: "newcolumn" },
                        { type: "button", name: "btnDelEmail" + i, value: "-" }
                    ]
                });
            }

        });
        $(p).data('kont').push(fk);
        console.log($(p).data('kont').length);

    }

    function winSobst(id) {
        myWins = new dhtmlXWindows({
            image_path: "/bitrix24/js/dhtmlx/imgs/",
            skin: "dhx_material"
        });
        myWins.attachViewportTo('page');
        var worg = myWins.createWindow({
            id: "newOrg",
            left: 20,
            top: 30,
            width: 1000,
            height: 780,
            center: true,
            modal: true,
        });
        myWins.window('newOrg').centerOnScreen();
        var lw = 110;
        var iw = 470;
        var formJson = [{
            type: "block",
            inputWidth: "auto",
            blockOffset: 1,
            className: 'wbutClass',
            offsetLeft: 5,
            list: [
                { type: "button", name: "save", value: "Сохранить" },
                { type: "hidden", name: "UID", value: generateUID() },

                { type: "input", name: 'TITLE', label: 'Наименование', value: '', readonly: false, inputWidth: iw, labelWidth: lw },
                { type: "input", name: 'REM', label: 'Комментарий', value: '', readonly: false, inputWidth: iw, labelWidth: lw, inputHeight: 60, rows: 3 },
                { type: "input", name: 'PARTNER', label: 'Сотрудничество', value: '', readonly: false, inputWidth: iw, labelWidth: lw },
                {
                    type: "block",
                    inputWidth: "auto",
                    blockOffset: 0,
                    className: 'wbutClass',
                    offsetLeft: 0,
                    list: [
                        { type: "input", name: 'SITE', label: 'Сайт', value: '', readonly: false, inputWidth: 230, labelWidth: lw },
                        { type: "newcolumn", offset: 20 },
                        { type: "input", name: 'EMAIL', label: 'Почта', value: '', readonly: false, inputWidth: 230, labelWidth: 70 },

                    ]
                },
                {
                    type: "block",
                    inputWidth: "auto",
                    blockOffset: 0,
                    className: 'wbutClass',
                    offsetLeft: 0,
                    list: [
                        { type: "label", label: "Дополнительный контакт" },
                        { type: "newcolumn", offset: 20 },
                        { type: "button", name: "addKont", value: "+" }

                    ]
                },
                { type: "block", inputWidth: "auto", name: 'divKont', className: 'divKont', offsetLeft: 0, list: [] }

            ]
        }, ];
        var formNsob = myWins.window('newOrg').attachForm(formJson);
        formNsob.attachEvent("onButtonClick", function(name) {
            if (name == 'save') {
                var outOB = formNsob.getFormData();
                var kont = $(formNsob._getItemByName('divKont')).data('kont');
                outOB.kont = [];
                for (var i = 0; i < kont.length; i++) {
                    var k = kont[i].getFormData();
                    var k_ = {};
                    k_.TITLE = k.TITLE;
                    k_.PHONE = [];
                    var e = 0;
                    while (kont[i].isItem('PHONE_' + e)) {
                        var d = {
                            VALUE: kont[i].getItemValue('PHONE_' + e),
                            LABEL: kont[i].getItemValue('PHONELABEL_' + e)
                        };
                        k_.PHONE.push(d);
                        e++;
                    }
                    k_.EMAIL = [];
                    var e = 0;
                    while (kont[i].isItem('EMAIL_' + e)) {
                        var d = {
                            VALUE: kont[i].getItemValue('EMAIL_' + e),
                            LABEL: kont[i].getItemValue('EMAILLABEL_' + e)
                        };
                        k_.EMAIL.push(d);
                        e++;
                    }

                    outOB.kont.push(k_);
                }

                waitGet(['add'], ['klient'], outOB, function(data) {
                    console.log(data);
                })

            }
            if (name == 'addKont') {
                createFormKont($(formNsob._getItemByName('divKont')));
            }
        });
    }

    function editObject() {
        $("<div id='divTab' name='divTab'></div>").appendTo($(".content"));
        $("<div id='formAddr' name='formAddr'></div>").appendTo($(".content"));

        var formAddr = [{
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
        gridSobst.setHeader("&nbsp;,Собственник");
        gridSobst.setInitWidths("50,*");
        gridSobst.setColAlign("left,left");
        gridSobst.setColTypes("sub_row,ro");
        //gridSobst.setColSorting("str,str");                    
        gridSobst.setColumnIds("col0,col1");
//        gridSobst.setNoHeader(true);
        gridSobst.init();
        //gridSobst.setColumnHidden(2, true);
        waitGet(['list'], ['klient'], null, function(data) {
            console.log('klient',data)
            var rows = {
                rows: []
            };
                for (var i = 0; i < data.length; i++) {
                    console.log(data[0]);
                    for (var e=0;e<data[i].data.length;e++){
                        gridSobst.addRow(data[i].data[e].UID,[data[i].data[e].TITLE,data[i].data[e].TITLE]);
                        gridSobst.UserData[data[i].data[e].UID].allField = data[i].data[e];
                        rows.rows.push({
                            id: data[i].data[e].UID,
                            data: [
                                data[i].data[e].TITLE,
                                data[i].data[e].TITLE,
                            ]
                        });
                    }
//                    gridSobst.parse(rows, "json");
//                    gridSobst.UserData.inData = data;

                }
        })

        gridSobst.attachEvent("onSubRowOpen", function(id,state){
            console.log(id,this);
            
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

    $(document).ready(function() {
        // подгружаем или главную или остальные
        ymaps.ready(function() {
            switch (window.location.hash) {
                case '#object':
                    $(".content").empty();
                    editObject();

                    break;
                default:

                    break;
            }
        });
    });