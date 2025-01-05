let form = document.getElementById("form");
form.addEventListener("submit", function () {
  event.preventDefault();
  let fname = form.forminput1.value;
  let flast = form.forminput2.value;
  let email = form.forminput3.value;
  let password = form.forminput4.value;
  let member = form.forminput5.value;
  let userObj = { fname, flast, email, password, member };
  /// logic is check whether email is present in the DB
  fetch("https://understood-steel-touch.glitch.me/users")
    .then((res) => res.json())
    .then((data) => {
      let user = data.filter((el, i) => el.email == email);
      if (user.length != 0) {
        /// user present
        alert("User already registred, please SignIn");
        window.location.href = "signin.html"
      } else {
        /// user is not present
        /// push the user into json server
        fetch("https://understood-steel-touch.glitch.me/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userObj),
        }).then(() => {
          let customers = JSON.parse(localStorage.getItem("customerdata")) || [];
          customers.push(userObj);
          localStorage.setItem("customerdata", JSON.stringify(customers));

          alert("Account Created Sucessfull");
          window.location.href = "signin.html"
        });
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Something wenr wrong, Please try again later");
    });
});
