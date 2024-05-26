// permission_request.js
navigator.mediaDevices.getUserMedia({ audio: true })
   .then(function(stream) {
        // Разрешение получено, можно закрыть страницу
        console.log('Микрофон успешно подключен');
          chrome.action.setIcon({ path: "/icons/on.png" })
          
          // Создаем экземпляр объекта SpeechRecognition
          var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
          recognition.lang = 'ru-RU'; // Устанавливаем язык распознавания
          recognition.continuous = true; // Включаем непрерывное распознавание
          //recognition.interimResults = true;
       
          
          // Обработчик начала распознавания
          recognition.onstart = function() {
              console.log('Начало распознавания...');
          };
          
          // Обработчик результата распознавания
          recognition.onresult = function(event) {
              var transcript = event.results[event.results.length - 1][0].transcript;
              console.log(transcript);
              //chrome.runtime.sendMessage({data: transcript});
              chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, transcript);
              });
              
          };
          
          // Обработчик окончания распознавания
          recognition.onend = function() {
              recognition.start(); // Перезапуск распознавания
          };
          
          // Начинаем распознавание
          recognition.start();


          chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === "disableMic") {
                if (stream) {
                    stream.getAudioTracks().forEach(track => track.stop());
                    
                }
            }
        });
          
    })
   .catch(function(err) {
        console.log("Ошибка при запросе доступа к микрофону:", err);
    });
