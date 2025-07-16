function analyzeLoginForm() {
  const resultDiv = document.getElementById("analysisResult");
  resultDiv.innerHTML = ""; // Clear previous results

  const form = document.getElementById("loginForm");
  const inputs = form.getElementsByTagName("input");
  let issues = [];

  // Check if form uses HTTPS
  if (!form.action.startsWith("https://")) {
    issues.push("⚠️ Form action is not using HTTPS. Login data may not be encrypted.");
  }

  // Check for password input type
  let hasPasswordField = false;
  for (let input of inputs) {
    if (input.type === "password") {
      hasPasswordField = true;

      // Check if autocomplete is off
      if (input.autocomplete !== "off") {
        issues.push("⚠️ Password input should have autocomplete=\"off\" to prevent browser from storing credentials.");
      }

      // Check if minlength is set
      if (!input.hasAttribute("minlength")) {
        issues.push("⚠️ Password input does not have a minlength attribute.");
      }
    }
  }

  if (!hasPasswordField) {
    issues.push("⚠️ Login form does not contain a password input field!");
  }

  // Check for basic client-side validation
  for (let input of inputs) {
    if (!input.hasAttribute("required")) {
      issues.push(`⚠️ The field "${input.name}" is missing the required attribute.`);
    }
  }

  // Display results
  if (issues.length === 0) {
    resultDiv.innerHTML = `<p class="good">✅ No major issues found. Your login form has basic front-end security features.</p>`;
  } else {
    const list = document.createElement("ul");
    list.classList.add("warning");
    for (let issue of issues) {
      const li = document.createElement("li");
      li.innerText = issue;
      list.appendChild(li);
    }
    resultDiv.appendChild(list);
  }
}
