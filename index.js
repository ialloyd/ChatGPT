const url = 'https://api.daku.tech/v1/chat/completions';
const authToken = 'sk-xxxx'; 
const main=document.getElementById('main');
const container=document.querySelector('.container');


let isRequestInProgress = false;

container.lastElementChild.addEventListener('click',()=>{

  
  if (isRequestInProgress) {
    return;
  }

  const userInput=document.createElement('div');
  userInput.id='user-input';
  userInput.textContent=container.firstElementChild.value;

  main.appendChild(userInput);
  
  const requestBody = {
    "messages": [
      {
        "content": "You are a helpful assistant.",
        "role": "system"
      },
      {
        "content": `${container.firstElementChild.value}`,
        "role": "user"
      }
    ],
    "model": "gpt-3.5-turbo"
  };

 
  isRequestInProgress = true;

  fetchData(requestBody);

});

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
    const userOutput=document.createElement('div');
    userOutput.id='ai-output';
    userOutput.textContent=data.choices[0].message.content;
    main.appendChild(userOutput);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
   
    isRequestInProgress = false;
  }
}