export function handleSubmit(event) {
    event.preventDefault()
    document.getElementById('polarity').innerHTML = "Awaiting new measure...";
    document.getElementById('polarity-conf').innerHTML = '...';
    document.getElementById('subjectivity').innerHTML = "Awaiting new measure...";
    document.getElementById('subjectivity-conf').innerHTML = '...';
    const formText = document.getElementById('name').value
    if(Client.linkCheck(formText)) {
        console.log(`Requesting sentiment information for ${formText}...`);
        console.log(`API ID: ${process.env.API_ID}`);
        console.log(`API KEY: ${process.env.API_KEY}`);
        setTimeout(
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
            console.log(`Requested URL: ${formText}`);
        }),1);
    } else {
        alert('Invalid URL');
    }
}
