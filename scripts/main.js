Events.on(ClientLoadEvent, e => {
  
  //добавление вкладки в настройках, и самих настроек (см. ниже)
  Vars.ui.settings.addCategory("Camera Point", Icon.file, cons(t => {
    //предупреждение
    t.add("[red]Warning: restart the game to apply the changes").padBottom(5).row()
    //настройка показа кнопки 
    t.check("Show Camera Button", Core.settings.getBool("SCB", true), v => {
      //система переключения чека
      Core.settings.put("SCB", v)
    }).left().center().padTop(5).row()
  }))
  
  //обявляем кнопки чтобы с ними можно было работать по за ифом
  let but
  let but1
  let but2
  let but3
  
  //добавление кнопок на екран при включенной настройке
    if (Core.settings.getBool("SCB", true)) {
      
      Vars.ui.hudGroup.fill(cons(t => {
        t.top()
        
        but = t.button("B", () => {
          //вызов функции открывающей диалог (функция ниже)
          cameraPointMemu()
        }).size(150, 60).padTop(20).padLeft(5).get()
        
        //берем значение из лейбла, а точнее CPM_key1 в противном случае(поле пустое) будет z
        but1 = t.button(Core.settings.getString("CPM_key1", "z"), () => {
          //обявление крдинат, так как функция камера позишн, принимает только переменные или числа
          //умножаем на 8 так как берем мы в тайлах(блоках), а функция камеры принимает в пикселях (1 тайл = 8 пикселям)
          let x = parseFloat(Core.settings.getString("CPM_x", "0") * 8)
          let y = parseFloat(Core.settings.getString("CPM_y", "0") * 8)
          Core.camera.position.set(x, y)
        }).size(60, 60).padTop(20).padLeft(5).get()
        
        but2 = t.button("x", () => {
          Log.info("input 2")
        }).size(60, 60).padTop(20).padLeft(5).get()
        
        but3 = t.button("c", () => {
          Log.info("input 3")
        }).size(60, 60).padTop(20).padLeft(5).get()
      
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
        let xLabel = T1.add(new TextField(Core.settings.getString("CPM_x", ""),  Styles.defaultField)).width(200).padBottom(20).get()
        //фильтр, на цифры и математические символы
        xLabel.setFilter((field, c) => /[0-9.,\- ]/.test(c))
        //задаем неактивный текст для понимания что вводить
        xLabel.setMessageText("X")
        //центрируем текст внутри
        xLabel.setAlignment(Align.center)
        
        //при изменении значения будем его сохранять
        xLabel.changed(() => {
          //через .put записываем значение, первый аргумент ето ключ(имя), а второй значение
          Core.settings.put("CPM_x", xLabel.getText())
        })
        
        T1.row()
        
        //аналогисно к xLabel но с осю Y
        let yLabel = T1.add(new TextField(Core.settings.getString("CPM_y", ""),  Styles.defaultField)).width(200).padBottom(20).get()
        yLabel.setFilter((field, c) => /[0-9.,\- ]/.test(c))
        yLabel.setMessageText("Y")
        yLabel.setAlignment(Align.center)
        
        yLabel.changed(() => {
          Core.settings.put("CPM_y", yLabel.getText())
        })
        
        T1.row()
        
        //кнопка для копирования и вставки текущих кординат
        T1.button("Set Pos", () => {
           xLabel.setText(Vars.player.tileX())
           yLabel.setText(Vars.player.tileY())
           //берем оси, и задаём им значение вручную так как изминение настройки через кнопку не щитается за изменение 
           Core.settings.put("CPM_x", Vars.player.tileX() + "")
           Core.settings.put("CPM_y", Vars.player.tileY() + "")
        }).size(150, 60).padBottom(10).row()
        
        //настройка хоткея/кнопки
        let hotKeyLabel = T1.add(new TextField(Core.settings.getString("CPM_key1", "z"),  Styles.defaultField)).width(200).get()
        hotKeyLabel.setFilter((field, c) => /[a-z]/.test(c))
        hotKeyLabel.setAlignment(Align.center)
        hotKeyLabel.setMaxLength(1)
        
        hotKeyLabel.changed(() => {
          Core.settings.put("CPM_key1", hotKeyLabel.getText())
          if (but1) but1.setText(hotKeyLabel.getText())
        })
        
      })
      //показ диалога
      CPM.show()
    }
    
    //настройка физических клавиш
    Events.run(Trigger.update, () => {
      if (Core.input.keyTap(KeyCode.a)) {
        Log.info("input: a")
      }
    })
})