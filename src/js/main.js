// headroom header
let el_headroom = document.querySelector("header.headroom");
let headroom = new Headroom(el_headroom, {
  offset: 500,
  tolerance: {
    up: 30,
    down: 0,
  },
});
headroom.init();

// main page slider
const swiper = new Swiper(".swiper", {
  loop: true,
  navigation: {
    nextEl: ".btn__next",
    prevEl: ".btn__prev",
  },
  grabCursor: true,
  keyboard: {
    enabled: true,
  },
  mousewheel: true,
});

// main page modal
const mymodal = modal("footer .btn", {
  title: "Связаться для сотрудничества",
  closable: true,
  content: `
    <form class="cooperation" id="cooperation">
        <div>
          <input placeholder=" " type="email" name="mail" id="mail" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$">
          <label class="err_mail" for="mail">Почта</label>
        </div>
        <div>
          <textarea placeholder=" " name="message" id="message" rows="4" required></textarea>
          <label class="err_message" for="message">Сообщение</label>
        </div>
    </form>
  `,
  width: 1000,
  // fixed_selectors: [".copyright"],
  footer_btns: [
    {
      text: "Отправить",
      class: ["jsmodal__btn--submit", "hover__btn", "btn"],
      type: "submit",
      form: "cooperation",
      handler(e) {
        e.preventDefault();

        function validateEmail(email) {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
        }

        function validateTextarea(str) {
          let txt = str.split(" ").join("");
          if (txt.length === 0) return 0;
          if (txt.length > 0 && txt.length < 15) return 1;
          return true;
        }

        if (!validateEmail(document.querySelector("#mail").value)) {
          let mail = document.querySelector(".err_mail");
          let mail_txt = mail.textContent;
          mail.innerHTML = "Адрес указан не верно";
          mail.classList.add("show");
          setTimeout(() => {
            mail.innerHTML = mail_txt;
            mail.classList.remove("show");
          }, 4000);
        }

        let temp = validateTextarea(document.querySelector("#message").value);
        if (temp === 0 || temp === 1) {
          let message = document.querySelector(".err_message");
          let message_txt = message.textContent;
          if (temp === 0) {
            message.innerHTML = "Сообщение не должно быть пустым";
          } else {
            message.innerHTML = "Сообщение очень короткое";
          }
          message.classList.add("show");
          setTimeout(() => {
            message.innerHTML = message_txt;
            message.classList.remove("show");
          }, 4000);
        }

        function sendData(data) {
          const XHR = new XMLHttpRequest(),
            FD = new FormData();

          // Push our data into our FormData object
          for (name in data) {
            FD.append(name, data[name]);
          }

          // Define what happens on successful data submission
          XHR.addEventListener("load", function (event) {
            alert("Yeah! Data sent and response loaded.");
          });

          // Define what happens in case of error
          XHR.addEventListener(" error", function (event) {
            alert("Oops! Something went wrong.");
          });

          // Set up our request
          XHR.open("POST", "https://example.com/cors.php");

          // Send our FormData object; HTTP headers are set automatically
          XHR.send(FD);
        }

        sendData({ test: "ok" });
      },
    },
  ],
});

// accordion
document.querySelectorAll(".accordion").forEach(function (el) {
  new Accordion(el, {});
});

// animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animation");
      return;
    }
    // entry.target.classList.remove("animation");
  });
});

let anim_el = document.querySelectorAll(".benefits__content--item");
anim_el.forEach((el) => observer.observe(el));
