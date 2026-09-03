Events.on(ClientLoadEvent, e => {
  
  var buttonActive = true
  
  //добавление вкладки в настройках, и самих настроек (см. ниже)
  Vars.ui.settings.addCategory("Camera Point", Icon.file, cons(t => {
    //предупреждение
    t.add("[red]Warning: restart the game to apply the changes")
    //настройка показа кнопки 
    t.check("Show Camera Button", Core.settings.getBool("SCB", true), v => {
      Core.settings.put("SCB", v)
    }).left().center().row()
  }))
  
  //добавление кнопки на екран при включенной настройке
    if (Core.settings.getBool("SCB", true)) {
      
      Vars.ui.hudGroup.fill(cons(t => {
        
        var but = t.button("Camera", () => {
          Log.info("input B")
        }).size(150, 60).top().center().pad(20).get()
      
      //чтобы взаемодействовать с кнопкой в переменной нада добавить .get() для кнопки
      //взаемодействуем с кнопкой в переменной
      //color взаемойствует с цветовыми каналами, "a" ето alpha, прозрачнось
      but.color.a = 0.5
      
      }))
    }
})