// /*{<script>
//   // دي دالة بتتندّه لما اليوزر يعمل sign-in
//   function signIn(username) {
//     const welcomeText = document.getElementById("welcome-text");
//     welcomeText.textContent = `Hi ${username}, welcome on board 🚀`;
//   }
// </script> }*/
// {
// <script>
//   function scrollToNext() {
//     document.getElementById("game-section").scrollIntoView({
//       behavior: "smooth"
//     })
//   }
// </script>
// }

// مسك كل الكاركتر
// const characters = document.querySelectorAll(".character");
// const profilePic = document.getElementById("profile-pic");
// const infoBox = document.getElementById("character-info-box");

// characters.forEach(char => {
//   // عند الكليك: اختيار شخصية
//   char.addEventListener("click", () => {
//     characters.forEach(c => c.classList.remove("selected"));
//     char.classList.add("selected");

//     const imgSrc = char.querySelector("img").src;
//     if (profilePic) {
//       profilePic.innerHTML = `<img src="${imgSrc}" alt="Profile">`;
//     }
//   });

//   // عند الهوفر: عرض البوكس
//   char.addEventListener("mouseenter", () => {
//     const enInfo = char.getAttribute("data-info-en");
//     const arInfo = char.getAttribute("data-info-ar");

//     if (infoBox) {
//       infoBox.innerHTML = `<strong>Info:</strong><br>${enInfo}<br><br><strong>معلومة:</strong><br>${arInfo}`;
//       infoBox.classList.add("show");
//     }
//   });

//   // متابعة حركة الماوس
//   char.addEventListener("mousemove", (e) => {
//     if (infoBox) {
//       infoBox.style.left = e.pageX + 15 + "px";
//       infoBox.style.top = e.pageY + 15 + "px";
//     }
//   });

//   // لما يسيب الشخصية
//   char.addEventListener("mouseleave", () => {
//     if (infoBox) {
//       infoBox.classList.remove("show");
//     }
//   });
// });

// حفظ بيانات اليوزر في localStorage
function saveUserData(firstName, lastName, email) {
  const userData = {
    name: `${firstName} ${lastName}`,
    email: email,
    avatar: null // لحد ما يختار افاتار
  };
  localStorage.setItem("userData", JSON.stringify(userData));
}

// تحديث رسالة الترحيب + الصورة
function updateWelcome() {
  const welcomeText = document.getElementById("Welcome-text");
  const profilePic = document.getElementById("profile-pic");

  if (!welcomeText || !profilePic || window.location.pathname.includes("signup.html")) {
    return;
  }

  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    welcomeText.textContent = `Hi ${userData.name}, welcome on board 🚀`;

    // لو فيه صورة افاتار
    if (userData.avatar) {
      profilePic.innerHTML = `<img src="${userData.avatar}" alt="Avatar">`;
    } else {
      profilePic.innerHTML = `<i class="fa fa-user-circle"></i>`;
    }
  }
}

// عند الـ Sign Up
const signupForm = document.querySelector("form[action='meetyourguide.html']");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;

    saveUserData(fname, lname, email);
    window.location.href = "meetyourguide.html";
  });
}

// عند الـ Login
const loginForm = document.querySelector("form[action='activities.html']");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    let userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.email === email) {
      window.location.href = "activities.html";
    } else {
      alert("User not found! Please sign up first.");
    }
  });
}

// عند اختيار Avatar
const characters = document.querySelectorAll(".character");
if (characters) {
  characters.forEach(char => {
    char.addEventListener("click", () => {
      const img = char.querySelector("img").getAttribute("src");

      let userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {
        userData.avatar = img;
        localStorage.setItem("userData", JSON.stringify(userData));
      }

      updateWelcome();
    });
  });
}

// تحديث الترحيب تلقائي عند فتح أي صفحة
document.addEventListener("DOMContentLoaded", updateWelcome);



