if ('mediaDevices' in navigator) {
  // Запрашиваем разрешение на использование микрофона
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
          console.log('Микрофон успешно подключен');
          
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
          };
          
          // Обработчик окончания распознавания
          recognition.onend = function() {
              recognition.start(); // Перезапуск распознавания
          };
          
          // Начинаем распознавание
          recognition.start();
      })
    .catch(function(err) {
          console.error('Ошибка при получении доступа к микрофону:', err);
      });
} else {
  console.error('Ваш браузер не поддерживает необходимые API');
}