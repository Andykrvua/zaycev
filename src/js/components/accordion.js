class Accordion {
  constructor(el, options) {
    let default_options = {
      isOpen: () => {},
      isClose: () => {},
      speed: 400,
    };

    this.options = Object.assign(default_options, options);
    this.accordion = el;
    this.control = this.accordion.querySelector(".accordion__control");
    this.content = this.accordion.querySelector(".accordion__content");
    this.event();
  }

  event() {
    if (this.accordion) {
      this.accordion.addEventListener("click", (e) => {
        this.accordion.classList.toggle("open");

        if (this.accordion.classList.contains("open")) {
          this.open();
        } else {
          this.close();
        }
      });
    }
  }

  open() {
    this.accordion.style.setProperty(
      "--accordion-time",
      `${this.options.speed / 1000}s`
    );
    this.accordion.classList.add("is-open");
    this.control.setAttribute("aria-expanded", "true");
    this.content.setAttribute("aria-hidden", "false");
    this.options.isOpen(this);
  }

  close() {
    this.accordion.classList.remove("is-open");
    this.control.setAttribute("aria-expanded", "false");
    this.content.setAttribute("aria-hidden", "true");
    this.options.isClose(this);
  }
}
