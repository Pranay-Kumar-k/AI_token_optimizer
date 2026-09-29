window.onload = function() {
    const optimizeButton = document.getElementById('optimizeButton');
    const promptInput = document.getElementById('prompt');
    const resultOutput = document.getElementById('result');
    

    optimizeButton.addEventListener('click', async () => {
        const prompt = promptInput.value;
        const url = 'http://localhost:3000/analyze'; // Update with your backend URL if different
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        resultOutput.textContent = JSON.stringify(data, null, 2);
    });
}