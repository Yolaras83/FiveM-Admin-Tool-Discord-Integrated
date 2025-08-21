let data;

window.addEventListener('message', (event) => {
    data = event.data;

    if(data.action == "show"){ 
        document.body.style.display = "block";
        document.getElementById('name').innerHTML = data.targetName;
        document.getElementById('serverId').innerHTML = "Server ID: " + data.serverId; 
        document.getElementById('discordIdentifier').innerHTML = "Discord Identifier: " + data.discordIdentifier;
        // Fetch the identifier
    }

    if(data.action == 'close') {
        document.body.style.display = "none";
    }
});


async function sendMessage() {
    if (document.getElementById('messageInput').value == "") {
        console.log('Message cannot be null!');
        return
    }
    await fetch('http://127.0.0.1:3000/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ discordId: data.idToUse, message: document.getElementById('messageInput').value, adminName: data.adminName}), //Pass in the discord identifier first and then the message
    });
    document.getElementById('messageInput').value = "";
}

async function createSupport() {
    await fetch('http://127.0.0.1:3000/create-support', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ discordId: data.idToUse })
    });
}

window.addEventListener('keydown', async(e) => {
    if(e.key == "Escape") {
        await fetch(`https://${GetParentResourceName()}/close`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        });
    }
});
