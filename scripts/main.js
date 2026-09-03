Events.on(ClientLoadEvent, e => {
  
  //добавление вкладки в настройках, и самих настроек (см. ниже)
  Vars.ui.settings.addCategory("Camera Point", Icon.file, cons(t => {
    //настройка показа кнопки 
    t.check("Show Camera Button", Core.settings.getBool("SCB", true), v => {
      Core.settings.put("SCB", v)
    }).left().center().row()
    
    //настройка позиции кнопки для удобной игры
    t.add("[gray]Button Position").row()
    
    t.check("Right", Core.settings.getBool("BPR", false), v => {
        Core.settings.put("BPR", v)
    
        if(v){
            Core.settings.put("BPT", false)
            Core.settings.put("BPB", false)
            Core.settings.put("BPL", false)
        }
    }).left().center().row()
    
    t.check("Bottom", Core.settings.getBool("BPB", true), v => {
        Core.settings.put("BPB", v)
    
        if(v){
            Core.settings.put("BPT", false)
            Core.settings.put("BPR", false)
            Core.settings.put("BPL", false)
        }
    }).left().center().row()
    
    t.check("Left", Core.settings.getBool("BPL", false), v => {
        Core.settings.put("BPL", v)
    
        if(v){
            Core.settings.put("BPT", false)
            Core.settings.put("BPR", false)
            Core.settings.put("BPB", false)
        }
    }).left().center().row()
    
  }))
  
  //добавление кнопки на екран при включенной настройке
  
})