export function handleSubmit (event) {
    event.preventDefault()
    const formText = document.getElementById('name').value
    if(Client.linkCheck(formText)) {
        console.log(`Requesting sentiment information for ${formText}...`);
        fetch('http://localhost:8081/aylien',
        {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({url: formText})
        })
        .then(res => res.json())
        .then(function(res) {
            document.getElementById('polarity').innerHTML = res.polarity;
            document.getElementById('polarity-conf').innerHTML = Math.round(res.polarity_confidence * 100);
            document.getElementById('subjectivity').innerHTML = res.subjectivity;
            document.getElementById('subjectivity-conf').innerHTML = Math.round(res.subjectivity_confidence * 100);
            console.log(res.polarity);
            console.log(res.subjectivity);
            switch (res.polarity) {
                case 'negative':
                    document.getElementById('pol-image').src = "/src/client/img/Group 3.png";
                    break;
                case 'neutral':
                    document.getElementById('pol-image').src = "/src/client/img/Group 1.png";
                    break;
                case 'positive':
                    document.getElementById('pol-image').src = "/src/client/img/Group 2.png";
                    break;
            }
            switch (res.subjectivity) {
                case 'subjective':
                    document.getElementById('sub-image').src = "/src/client/img/Group 5.png";
                    break;
                case 'neutral':
                    document.getElementById('sub-image').src = "/src/client/img/Group 4.png";
                    break;
                case 'objective':
                    document.getElementById('sub-image').src = "/src/client/img/Group 6.png";
                    break;
            }
        });
    }else {
        alert("Please Enter a valid URL")
    }
};

