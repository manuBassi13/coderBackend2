const buttonLogin = document.querySelector("#sendLogin")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const githubLogin = document.querySelector("#githubLogin")

const user = {
    email: "",
    password: "",
}

const handleChange = (e) => {
    const {name, value} = e.target
    user[name] = value
}

emailInput.addEventListener("input", handleChange)
passwordInput.addEventListener("input", handleChange)

buttonLogin.addEventListener("click", async () => {
    try{
        const response = await fetch("/api/sessions/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status == 201 || response.status < 300)
            window.location.href = '/profile'
    } catch (e) {
        console.log("error", e);
    }
})

githubLogin.addEventListener("click", async () => {
    try{
        window.location.href = '/api/sessions/githubLogin'
    }catch(e){
        console.log("error", e);
    }
})