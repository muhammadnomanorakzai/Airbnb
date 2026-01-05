// Example starter JavaScript for disabling form submissions if there are invalid fields
// Roman Urdu: Agar form me invalid fields hain to submit nahi hone dete, Bootstrap style ke sath

(function () {
  "use strict";

  // Roman Urdu: Saare forms fetch kar rahe jo "needs-validation" class use karte hain
  var forms = document.querySelectorAll(".needs-validation");

  // Roman Urdu: Har form ke upar loop laga ke submit event handle kar rahe hain
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        // Roman Urdu: Agar form valid nahi hai to submission prevent karo
        if (!form.checkValidity()) {
          event.preventDefault(); // form submit nahi hoga
          event.stopPropagation(); // event aur bubble nahi hoga
        }

        // Roman Urdu: Bootstrap ke liye validation class add karo
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
