const style = {
  textAlign: 'center',
  fontWeight: '600',
  fontSize: '18px',
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('CONTENTmessage.data: ', message)
  if (message) {
    const messageSpan = document.createElement("span");
    messageSpan.style.fontSize = style.fontSize;
    messageSpan.textContent = message;

    const timeSpan = document.createElement("span");
    timeSpan.style.marginRight = "8px";
    timeSpan.style.fontWeight = style.fontWeight;
    timeSpan.textContent = new Date().toLocaleTimeString();

    // Создаем общий элемент для группировки сообщения и времени
    const messageContainer = document.createElement("p");
    messageContainer.style.textAlign = style.textAlign;
    messageContainer.append(timeSpan, messageSpan);

    // Добавляем элементы в документ
    document.documentElement.prepend(messageContainer);
      // let currentList = document.getElementById('content').innerHTML;
      
      // // Добавляем новую фразу в список
      // let newList = currentList + '<p>' + message.data + '</p>';
      
      // // Обновляем контейнер с новым списком
      // document.getElementById('content').innerHTML = newList;
      //alert(message.data)
  }
});