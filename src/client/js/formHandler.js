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
            document.getElementById('polarity-conf').innerHTML = res.polarity_confidence;
            document.getElementById('subjectivity').innerHTML = res.subjectivity;
            document.getElementById('subjectivity-conf').innerHTML = res.subjectivity_confidence;
        });
    }else {
        alert("Please Enter a valid URL")
    }
};

