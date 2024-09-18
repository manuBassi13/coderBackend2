const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const sendButton = document.querySelector("#sendNewPass")

const user = {
    email: "",
    password: "",
}

const handleChange = (e) => {
    const {name, value} = e.target
    user[name] = value
}

emailInput.addEventListener('input', handleChange)
passwordInput.addEventListener('input', handleChange)
sendButton.addEventListener('click', async () => {
    try{
        const response = await fetch('api/sessions/recoverPw', {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status >= 200 || response.status < 300){
            window.location.href = '/login'
        }
    } catch (e) {
        console.log("Error ", e);
        
    }
})