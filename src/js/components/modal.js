function nope() {}

function _createModalFooter(footer_btns = []) {
  if (footer_btns.length === 0) return;

  const _footer = document.createElement("div");
  _footer.classList.add("jsmodal__footer");

  footer_btns.forEach(function (btn) {
    const _btn = document.createElement("button");
    _btn.textContent = btn.text || "";
    if (btn.class) {
      btn.class.forEach(function (_class) {
        _btn.classList.add(_class);
      });
    }
    if (btn.type) {
      _btn.setAttribute("type", `${btn.type}`);
    } else {
      _btn.setAttribute("type", "button");
    }
    _btn.onclick = btn.handler || nope;
    if (btn.form) {
      _btn.setAttribute("form", `${btn.form}`);
    }
    _footer.appendChild(_btn);
  });

  return _footer;
}

function _createModal(options, FOCUSABLE) {
  const DEFAULT_WIDTH = 1000;

  const modal = document.createElement("div");
  modal.classList.add("jsmodal");
  modal.setAttribute("aria-hidden", "true");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="jsmodal--overlay" data-close>
        <div class="jsmodal__window" style="max-width: ${
          options.width || DEFAULT_WIDTH
        }px" aria-modal="true" role="dialog">
          <div class="jsmodal__header">
            <span class="jsmodal__header-title">${options.title || ""}</span>
            ${
              options.closable
                ? `
                <button
                  class="jsmodal__header--close"
                  data-close
                  type="button"
                  aria-controls="jsmodal"
                  aria-label="close window"
                >
                </button>`
                : ""
            }
          </div>
          <div class="jsmodal__content" data-content>
            ${options.content || ""}
          </div>
          <div class="js_helper"></div>
        </div>
      </div>
  `
  );
  const _footer = _createModalFooter(options.footer_btns);

  let _helper = modal.querySelector(".js_helper");
  _helper.parentNode.insertBefore(_footer, _helper);
  _helper.remove();

  modal.querySelectorAll(FOCUSABLE).forEach((el) => {
    el.setAttribute("tabindex", "-1");
  });
  document.body.appendChild(modal);
  return modal;
}

const modal = function (selector, options) {
  if (document.querySelector(selector) === null) return;
  const FOCUSABLE = "input,button,select,textarea";
  const BASE_TRANSITION = 400;
  let fixedSelectors = document.querySelectorAll(options.fixed_selectors);
  let closing = false;
  let destroyed = false;
  let _scroll_position;
  let html = document.documentElement;
  const $modal = _createModal(options, FOCUSABLE);

  const modal = {
    open() {
      // headroom plugin
      headroom.unpin();
      headroom.freeze();
      !closing && $modal.classList.add("open");
      _scroll_position = window.pageYOffset;
      let marginSize = window.innerWidth - html.clientWidth;
      html.style.top = -_scroll_position + "px";
      if (marginSize) {
        html.style.marginRight = marginSize + "px";
      }
      html.classList.add("modal__opened");
      fixedSelectors.forEach((el) => {
        el.style.marginRight =
          parseInt(getComputedStyle(el).marginRight) + marginSize + "px";
      });

      $modal.querySelectorAll(FOCUSABLE).forEach((el, ind) => {
        el.removeAttribute("tabindex");
        if (ind === 0) el.focus();
      });
      $modal.setAttribute("aria-hidden", "false");
      document.addEventListener("keydown", focus_listener);
    },
    close() {
      if (destroyed) return;
      closing = true;
      $modal.classList.remove("open");
      $modal.setAttribute("aria-hidden", "true");
      $modal.querySelectorAll(FOCUSABLE).forEach((el) => {
        el.setAttribute("tabindex", "-1");
      });
      $modal.classList.add("hiding");
      setTimeout(() => {
        html.classList.remove("modal__opened");
        html.style.marginRight = "";
        window.scrollTo(0, _scroll_position);
        html.style.top = "";
        fixedSelectors.forEach((el) => {
          el.style.marginRight = "";
        });
        $modal.classList.remove("hiding");
        closing = false;
        if (typeof options.onDestroy === "function") {
          options.onDestroy();
        }
      }, BASE_TRANSITION);
      document.removeEventListener("keydown", focus_listener);
      // headroom plugin
      headroom.unfreeze();
    },
  };

  const listener = function (e) {
    if (e.target.dataset.close === "") modal.close();
  };

  $modal.addEventListener("click", listener);

  document.querySelector(selector).addEventListener("click", function () {
    modal.open();
  });

  const focus_listener = function (e) {
    if (e.keyCode === 9) {
      let focusable = $modal.querySelectorAll(FOCUSABLE);
      if (focusable.length) {
        let first = focusable[0];
        let last = focusable[focusable.length - 1];
        let shift = e.shiftKey;

        if (shift) {
          if (e.target === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (e.target === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    }
    if (e.keyCode === 27) {
      modal.close();
    }
  };

  return Object.assign(modal, {
    destroy() {
      $modal.removeEventListener("click", listener);
      $modal.parentNode.removeChild($modal);
      destroyed = true;
    },
    set_content(html) {
      $modal.querySelector("[data-content]").innerHTML = html;
    },
  });
};

/**
 * Returns Modal window.
 * const mymodal = modal(selector, {title: "My Modal"})
 *
 * @param {string} selector Query selector target el
 * @param {string} title Modal title
 * @param {boolean} closable Enable/disable close button
 * @param {html} content Modal content
 * @param {number} width Modal width in px
 * @param {string} fixed_selectors Other pos fixed el in page
 * @param {function} onDestroy Call destroy on close
 * @param {array} footer_btns Modal footer buttons
 * @param {string} text Button text
 * @param {array} class Button classes
 * @param {string} type Button type
 * @param {string} form Form id
 * @param {function} handler Button function
 */

// const mymodal = modal("footer .link-btn", {
//   title: "Модальное окно",
//   closable: true,
//   content: `
//   <h4>Модальное окно работает</h4>
//   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, cumque?</p>
//   `,
//   width: 600,
//   fixed_selectors: [".footer"],
//   onDestroy() {
//     mymodal.destroy();
//   },
//   footer_btns: [
//     {
//       text: "Отправить",
//       class: ["link-btn", "test"],
//       type: "submit",
//       form: "form1"
//       handler() {
//         mymodal.close();
//       },
//     },
//     {
//       text: "закрыть",
//       class: ["primary"],
//       type: "button",
//       handler() {
//         mymodal.close();
//       },
//     },
//   ],
// });
