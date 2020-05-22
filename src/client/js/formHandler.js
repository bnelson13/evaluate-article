// export function handleSubmit(event) {
//     event.preventDefault()

//     // check what text was put into the form field
//     let formText = document.getElementById('name').value
//     Client.checkForName(formText)

//     console.log("::: Form Submitted :::")
//     fetch('http://localhost:8081/test')
//     .then(res => res.json())
//     .then(function(res) {
//         document.getElementById('results').innerHTML = res.message;
//     })
// }

export function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value
    Client.linkCheck(formText)

    fetch('http://localhost:8081/aylien')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.polarity;
    })
}
