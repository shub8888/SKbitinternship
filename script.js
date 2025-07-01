document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form submission

            const number = document.getElementById("number").value;

            if (/^\d{10}$/.test(number)) {
                // If valid 10-digit number, redirect to OTP page
                window.location.href = "OTP.html";
            } else {
                alert("Please enter a valid 10-digit mobile number.");
            }
        });

const timerDisplay = document.getElementById("resend-timer");
  const submitBtn = document.getElementById("submit-btn");
  const otpInputs = document.querySelectorAll(".otp-inputs input");
  let timeLeft = 70;

  
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  }


  const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerDisplay.textContent = "00:00";
    }
  }, 1000);

 
  function checkOTPInputs() {
    const allFilled = Array.from(otpInputs).every(input => input.value.length === 1);
    submitBtn.disabled = !allFilled;
  }


  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      const value = e.target.value;

     
      if (!/^\d$/.test(value)) {
        e.target.value = ""; // Clear if not a digit
        return;
      }

     
      if (value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }

      checkOTPInputs();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        if (input.value === "" && index > 0) {
          otpInputs[index - 1].focus();
        }
      } else if (e.key >= "0" && e.key <= "9") {
        input.value = ""; 
      }
    });
  });

  // Submit button action
  submitBtn.addEventListener("click", () => {
    const otp = Array.from(otpInputs).map(input => input.value).join("");
    alert("Entered OTP: " + otp);
    // Redirect to index.html or handle OTP verification
    window.location.href = "index.html";
  });