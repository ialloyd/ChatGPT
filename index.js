const url = 'https://api.daku.tech/v1/chat/completions';
const authToken = 'sk-ITtdLT07J3s9PSEtT3BlbkFJITtdLT07J3s9PSEt';
const main = document.getElementById('main');
const container = document.querySelector('.container');

let isRequestInProgress = false;
const button = container.lastElementChild;
const inputField = container.firstElementChild;

button.addEventListener('click', handleEvent);
inputField.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    handleEvent();
  }
});

function handleEvent() {
  if (isRequestInProgress || inputField.value.trim() === '') {
    return;
  }

  const userInput = document.createElement('div');
  userInput.id = 'user-input';
  userInput.textContent = inputField.value;

  main.appendChild(userInput);
  main.scrollTop = main.scrollHeight;

  const requestBody = {
    "messages": [
      {
        "content": "You are a helpful assistant.",
        "role": "system"
      },
      {
        "content": `${inputField.value}`,
        "role": "user"
      }
    ],
    "model": "gpt-3.5-turbo"
  };

  inputField.value = '';
  isRequestInProgress = true;

  fetchData(requestBody);
}

async function fetchData(requestBody) {
  try {
    document.getElementById("spinner").style.display = "";

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    document.getElementById("spinner").style.display = "none";
    const aiOutput = document.createElement('div');
    aiOutput.id = 'ai-output';

    let i = 0;
    const text = data.choices[0].message.content;
    const speed = 10;

    function typeWriter() {
      if (i < text.length) {
        aiOutput.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
        main.scrollTop = main.scrollHeight;
      } else {
        isRequestInProgress = false;
      }
    }

    typeWriter();

    main.appendChild(aiOutput);

  } catch (error) {
    console.error('Error:', error);
  }
}