document.addEventListener("DOMContentLoaded", () => {
  const user = "dez";
  const domain = "mediabrilliance.io";
  const link = document.getElementById("email-link");

  if (link) {
    link.href = `mailto:${user}@${domain}`;
    link.textContent = `${user}@${domain}`;
  }
});
