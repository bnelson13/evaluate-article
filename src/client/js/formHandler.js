export async function handleSubmit (event) {
    event.preventDefault()
    const urlError = document.getElementById('urlError');
    urlError.innerText = '';
    console.log(`Requesting sentiment information for ${formText}...`);
    const formText = document.getElementById('name').value;
    if(!(Client.linkCheck(formText))) {
        console.error(`You're trying to analyze ${formText}. The specified URL is not valid.`);
        urlError.innerText = 'The specified URL is not valid. Pleasy try again.'
        return
    }
    try {
        const apiQuery = await fetch('http://localhost:8081/aylien',
        {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({url: formText}),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const sentimentAnalysis = await apiQuery.json();

        if (!(Client.jsonCheck(sentimentAnalysis))) {
            console.error('JSON Object is Invalid');
            return
        }

        const {
            polarity, subjectivity, polarity_confidence: polarityConfidence, subjectivity_confidence: subjectivityConfidence
        } = sentimentAnalysis

        console.log(polarity)
        console.log(polarityConfidence)
        console.log(subjectivity)
        console.log(subjectivityConfidence)

        document.getElementById('polarity-conf').innerHTML = Math.round(polarityConfidence * 100);
        document.getElementById('subjectivity-conf').innerHTML = Math.round(subjectivityConfidence * 100);

        switch (polarity) {
            case 'negative':
                document.getElementById('pol-image').src = "./src/client/img/Group3.png";
                break;
            case 'neutral':
                document.getElementById('pol-image').src = "./src/client/img/Group1.png";
                break;
            case 'positive':
                document.getElementById('pol-image').src = "./src/client/img/Group2.png";
                break;
        }
        switch (subjectivity) {
            case 'subjective':
                document.getElementById('sub-image').src = "./src/client/img/Group5.png";
                break;
            case 'neutral':
                document.getElementById('sub-image').src = "./src/client/img/Group4.png";
                break;
            case 'objective':
                document.getElementById('sub-image').src = "./src/client/img/Group6.png";
                break;
        }

    }
    catch(error) {
        console.log("Error:", error);
    }
};

