    function createFormKont(p,item,uid) {
        p = $(p);
        if ($(p).data('kont') == undefined) {
            $(p).data('kont', []);
        }
        var c = $(p).children().length;
        var div = $('<div id="kont' + c + '" name="kont' + c + '" class="boxShadow2" >').appendTo(p);
            div.data('kont',$(p).data('kont'));
        div.css('margin-bottom','8px');
        
        var fk = new dhtmlXForm("kont" + c, [{
            type: "block",
            inputWidth: "auto",
            className: 'blockKont',
            blockOffset: 0,
            offsetLeft: 0,
            list: [

                {
                    type: "block",
                    inputWidth: "auto",
                    blockOffset: 0,
                    offsetLeft: 0,
                    list: [
                            { type: "input", name: 'TITLE', label: 'Наименование', value: '', readonly: false, inputWidth: 500, labelWidth: 120 },
                            { type:'hidden',name:'UID',value:uid},
                            { type: "newcolumn" },
                            { type: "button", name: "btnDelKont", value: "-" }
                        ]
                },

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
                                        { type: "label", label: 'Телефон',className:'labelBut', labelWidth: 'auto' },
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
                            offsetLeft: 10,
                            list: [{
                                    type: "block",
                                    inputWidth: "auto",
                                    blockOffset: 0,
                                    name: 'email',
                                    offsetLeft: 0,
                                    list: [
                                        { type: "label", label: 'Email',className:'labelBut', labelWidth: 'auto' },
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
        }, ]);
        
        div.data('kont',$(p).data('kont'));
        div.data('form',fk);

        
        $(fk.getInput('PHONE_0')).inputmask("+7(999) 999-99-99");
        fk.attachEvent("onButtonClick", function(name) {
            
            if (name=='btnDelKont') {
                // удаляем контакт
                var form = $(this.cont).data('form');
                var forms = $(this.cont).data('kont');
                for(var i=forms.length;i>=0;i--){
                    if(forms[i]==form){
                        forms.splice(i, 1);
                    }
                }
                $(this.cont).detach();
                return;
            }
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
        console.log(fk);
        $(p).data('kont').push(fk);
        if(item && item.kont){
            console.log('item',item);
            for(var i=0;i<item.kont.length;i++){
                if(i>0){
                    formNsob.callEvent("onButtonClick", ['addKont']);
                }

                for (var prop in item.kont[i]) {
                    if ($(p).data('kont')[i].isItem(prop)) {
                        $(p).data('kont')[i].setItemValue(prop, item.kont[i][prop]);
                    }
                }
                var phone = item.kont[i].PHONE;
                for(var e=0;e<phone.length;e++){
                    if(e>0){
                        $(p).data('kont')[i].callEvent("onButtonClick", ['btnAddPhone']);
                    }
                    if($(p).data('kont')[i].isItem('PHONELABEL_'+e)){
                        $(p).data('kont')[i].setItemValue('PHONELABEL_'+e,phone[e].LABEL);
                        
                    }
                    if($(p).data('kont')[i].isItem('PHONE_'+e)){
                        $(p).data('kont')[i].setItemValue('PHONE_'+e,phone[e].VALUE);
                        
                    }
                }

                var phone = item.kont[i].EMAIL;
                for(var e=0;e<phone.length;e++){
                    if(e>0){
                        $(p).data('kont')[i].callEvent("onButtonClick", ['btnAddEmail']);
                    }
                    if($(p).data('kont')[i].isItem('EMAILLABEL_'+e)){
                        $(p).data('kont')[i].setItemValue('EMAILLABEL_'+e,phone[e].LABEL);
                        
                    }
                    if($(p).data('kont')[i].isItem('EMAIL_'+e)){
                        $(p).data('kont')[i].setItemValue('EMAIL_'+e,phone[e].VALUE);
                        
                    }
                }


            }
            
        }
        console.log($(p).data('kont').length);

    }
    var formNsob = null;
    function winSobst(id,editflag) {
        myWins = new dhtmlXWindows({
            image_path: "/bitrix24/js/dhtmlx/imgs/",
            skin: "dhx_material"
        });
        myWins.attachViewportTo('page');
        var worg = myWins.createWindow({
            id: "newOrg",
            left: 20,
            top: 30,
            width: 900,
            height: 780,
            center: true,
            modal: true,
        });
        myWins.window('newOrg').centerOnScreen();
        if(!id){
            uid = generateUID();
        }else{
            uid=id;
        }
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
                { type: "hidden", name: "UID", value: uid },

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
        formNsob = myWins.window('newOrg').attachForm(formJson);
        formNsob.attachEvent("onButtonClick", function(name) {
            if (name == 'save') {
                var outOB = formNsob.getFormData();
                var kont = $(formNsob._getItemByName('divKont')).data('kont');
                outOB.kont = [];
                if(kont){
                    for (var i = 0; i < kont.length; i++) {
                        var k = kont[i].getFormData();
                        var k_ = {};
                        k_.UID = k.UID;
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
                }
                console.log(outOB);
/*                
                if(!id){
                    waitGet(['add'], ['klient'], outOB, function(data) {
                        console.log(data);
                    })
                }else{
                    waitGet(['save'], ['klient'], outOB, function(data) {
                        console.log(data);
                    })
                    
                }
*/                
            }
            if (name == 'addKont') {
                createFormKont($(formNsob._getItemByName('divKont')),null,generateUID());
            }
        });
        if(id){
            waitGet(['edit'],['klient'],id,function(data) {
                var item =  data[0].data;
                for (var prop in item) {
                    if (formNsob.isItem(prop)) {
                        formNsob.setItemValue(prop, item[prop]);
                    }
                }
                createFormKont($(formNsob._getItemByName('divKont')),item);
            })
        }
    }