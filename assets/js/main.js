AOS.init({
  offset: 120,
  delay: 0,
  duration: 700,
  easing: 'ease',
  once: false,
  mirror: false,
  anchorPlacement: 'top-bottom',
});

// Function to handle download link click
function downloadCv(event) {
  event.preventDefault();
  var pdfUrl = event.target.href;
  var link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Get the download link element
var downloadLink = document.getElementById('downloadLink');
if (downloadLink) {
  downloadLink.addEventListener('click', downloadCv);
}

function sendEmail() {
  const name = document.querySelector('#contactForm [name="name"]')?.value || "";
  const email = document.querySelector('#contactForm [name="email"]')?.value || "";
  const message = document.querySelector('#contactForm [name="message"]')?.value || "";

  const subject = `Portfolio Inquiry from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  const mailtoLink = `mailto:amaanhilmy8@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;
}



