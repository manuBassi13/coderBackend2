const buttonRegister = document.querySelector("#sendRegister")
const nombreInput = document.querySelector("#first_name")
const apellidoInput = document.querySelector("#last_name")
const edadInput = document.querySelector("#age")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")

const newUser = {
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    password: ""
}

const handleChange = (e) => {
    const { name, value } = e.target
    newUser[name] = value
}

nombreInput.addEventListener("input", handleChange)
apellidoInput.addEventListener("input", handleChange)
edadInput.addEventListener("input", handleChange)
emailInput.addEventListener("input", handleChange)
passwordInput.addEventListener("input", handleChange)

buttonRegister.addEventListener("click", async () => {
    console.log(newUser);
    
    try{
        const response = await fetch("/api/sessions/register", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.status == 200 || response.status < 300)
            window.location.href = "/login"
    } catch (e){
        console.log("Error", e);
    }
})