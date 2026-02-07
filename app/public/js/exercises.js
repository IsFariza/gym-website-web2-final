const API = "http://localhost:5000/api"

async function login() {
  const email = emailInput.value
  const password = passwordInput.value

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  const data = await res.json()

  if (res.ok) {
    localStorage.setItem("token", data.token)
    localStorage.setItem("role", data.user.role)
    window.location.href = "dashboard.html"
  } else alert(data.message)
}

async function register() {
  const body = {
    username: username.value,
    email: email.value,
    password: password.value
  }

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })

  const data = await res.json()

  if (res.ok) {
    localStorage.setItem("token", data.token)
    localStorage.setItem("role", data.user.role)
    window.location.href = "dashboard.html"
  } else alert(data.message)
}
