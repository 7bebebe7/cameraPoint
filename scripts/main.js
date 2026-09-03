Events.on(ClientLoadEvent, e => {
  
  //добавление вкладки в настройках, и самих настроек (см. ниже)
  Vars.ui.settings.addCategory("Camera Point", Icon.file, cons(t => {
    //настройка показа кнопки 
    t.check("Show Camera Button", Core.settings.getBool("SCB", true), v => {
      Core.settings.put("SCB", v)
    }).left().center().row()
    
    //настройка позиции кнопки для удобной игры
    t.add("[Grey]Button Position")
    
    t.check("Top", Core.settings.getBool("BPT", false), v => {
      Core.settings.put("BPT", true)
      if (Core.settings.getBool("BPT")) {
        Core.settings.put("BPR", false)
        Core.settings.put("BPB", false)
        Core.settings.put("BPL", false)
      }
    }).left().center().row()
    
    t.check("Right", Core.settings.getBool("BPR", false), v => {
      Core.settings.put("BPR", true)
      if (Core.settings.getBool("BPR")) {
        Core.settings.put("BPT", false)
        Core.settings.put("BPB", false)
        Core.settings.put("BPL", false)
      }
    }).left().row()
    
    t.check("Bottom", Core.settings.getBool("BPB", true), v => {
      Core.settings.put("BPB", true)
      if (Core.settings.getBool("BPB")) {
        Core.settings.put("BPR", false)
        Core.settings.put("BPT", false)
        Core.settings.put("BPL", false)
      }
    }).left().row()
    
    t.check("Left", Core.settings.getBool("BPL", true), v => {
      Core.settings.put("BPL", true)
      if (Core.settings.getBool("BPL")) {
        Core.settings.put("BPR", false)
        Core.settings.put("BPB", false)
        Core.settings.put("BPT", false)
      }
    }).left().row()
    
  }))
  
  //добавление кнопки на екран при включенной настройке
  
})