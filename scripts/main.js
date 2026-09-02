Events.on(ClientLoadEvent, e => {
  
  Vars.ui.settings.addCategory("Camera Point", Icon.file, cons(t => {
    t.check("Show Camera Button", Core.settings.getBool("mess", true), v => { Core.settings.put("mess", btnShow) }).left().row();
  }))
  
  print("Platform: " + Vars.platform);
  
})