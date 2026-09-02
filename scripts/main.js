Events.on(ClientLoadEvent, e => {
  
  //добавление вкладки в настройках, и самих настроек (см. ниже)
  Vars.ui.settings.addCategory("Camera Point", Icon.file, cons(t => {
    //настройка показа кнопки 
    t.check("Show Camera Button", Core.settings.getBool("SCB", false), v => {
      Core.settings.put("SCB", v)
    }).left().row()
  }))
  
  //обнаружение платформы пользователя для того чтобы включить/выключить кнопку на екране
  //переменная для того чтобы проверить платформу во время первого захода
  let checkPlatform = true
  
  //запускаем если checkPlatform активно, но активно оно будет только во время первого запуска
  if (checkPlatform = true) {
    //проверка, если мобильное устройство, то включается кнопка, а если ПК то выключается
    Vars.mobile ? Core.settings.put("SCB", true) : Core.settings.put("SCB", false)
    //переводим переменную в false чтобы больше не проверять
    checkPlatform = false
    //проверка что обнаружение выключилось 
    Log.info(checkPlatform)
  }
})