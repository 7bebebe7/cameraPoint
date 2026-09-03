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
        
        let but = t.button("B", () => {
          cameraPointMemu()
        }).size(150, 60).pad(20).top().get()
      
      //чтобы взаемодействовать с кнопкой в переменной нада добавить .get() для кнопки
      //взаемодействуем с кнопкой в переменной
      //color взаемойствует с цветовыми каналами, "a" ето alpha, прозрачнось
      but.color.a = 0.5
      
      }))
    }
    
    //создание меню
    function cameraPointMemu() {
      const CPM = new BaseDialog("Camera Point Menu")
      
      CPM.cont.table(Tex.button, T1 => {
        let xyLabel = T1.add(new TextField("", Styles.defaultField)).width(200).get()
        T1.setFilter(TextField.TextFieldFilter.digitsOnly)
        T1.setMessageText("X, Y")
        
        T1.row()
        
        T1.button("Set Pos", () => {
           xyLabel.setText(Vars.player.x, Vars.player.y)
        })
        
      })
      
      CPM.show()
    }
})