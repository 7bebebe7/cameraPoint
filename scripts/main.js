Events.on(ClientLoadEvent, e => {
  
  //добавление вкладки в настройках, и самих настроек (см. ниже)
  Vars.ui.settings.addCategory("Camera Point", Icon.file, cons(t => {
    //предупреждение
    t.add("[red]Warning: restart the game to apply the changes").row()
    //настройка показа кнопки 
    t.check("Show Camera Button", Core.settings.getBool("SCB", true), v => {
      Core.settings.put("SCB", v)
    }).left().center().padTop(5).row()
  }))
  
  //добавление кнопки на екран при включенной настройке
    if (Core.settings.getBool("SCB", true)) {
      
      Vars.ui.hudGroup.fill(cons(t => {
        t.top()
        
        let but = t.button("B", () => {
          cameraPointMemu()
        }).size(150, 60).pad(20).get()
        
        let but1 = t.button("Z", () => {
          Log.info("input 1")
        }).size(60, 60).pad(20).get()
        
        let but2 = t.button("X", () => {
          Log.info("input 2")
        }).size(60, 60).pad(20).get()
        
        let but3 = t.button("C", () => {
          Log.info("input 3")
        }).size(60, 60).pad(20).get()
      
      //чтобы взаемодействовать с кнопкой в переменной нада добавить .get() для кнопки
      //взаемодействуем с кнопкой в переменной
      //color взаемойствует с цветовыми каналами, "a" ето alpha, прозрачнось
      but.color.a = 0.5
      but1.color.a = 0.5
      but2.color.a = 0.5
      but3.color.a = 0.5
      
      }))
    }
    
    //создание меню
    function cameraPointMemu() {
      const CPM = new BaseDialog("Camera Point Menu")
      //добавляем втроеную кнопку выхода
      CPM.addCloseButton()
      
      //список/меню для красоты
      CPM.cont.table(Tex.button, T1 => {

        //создаем текстовое поле и настраиваем(см. ниже)
        let xyLabel = T1.add(new TextField(Core.settings.getString("CPM_xy", ""),  Styles.defaultField)).width(200).padBottom(20).get()
        //фильтр, на цифры и математические символы
        xyLabel.setFilter((field, c) => /[0-9.,\- ]/.test(c))
        //задаем неактивный текст для понимания что вводить
        xyLabel.setMessageText("X, Y")
        //центрируем текст внутри
        xyLabel.setAlignment(Align.center)
        
        //при изменении значения будем его сохранять
        xyLabel.changed(() => {
          Core.settings.put("CPM_xy", xyLabel.getText())
        })
        
        T1.row()
        
        //кнопка для копирования и вставки текущих кординат
        T1.button("Set Pos", () => {
           xyLabel.setText(Vars.player.tileX() + ", " + Vars.player.tileY())
           Core.settings.put("CPM_xy", Vars.player.tileX() + ", " + Vars.player.tileY())
        }).size(150, 60).padBottom(10)
        
      })
      //показ диалога
      CPM.show()
    }
})