import { CREDENTIALS, WC_BASE_URL } from "../../credentials.js";
const $d = document;

const wrapper = $d.getElementById("list_coupons");
const imgLoader = $d.getElementById("logo_giko");
const textLoader = $d.getElementById("text_giko");

const getCoupons = () => {
  const state = {
    coupons: [],
  };

  const render = () => {
    let { coupons } = state;
    let html = "";

    coupons = coupons.filter(({ status, date_expires }) => {
      const expire = new Date(date_expires).getTime();
      const today = new Date().getTime();
      return status === "publish" && (!expire || today < expire);
    });

    if (!coupons.length) {
      imgLoader.src =
        "https://cdn-giko.s3.us-east-2.amazonaws.com/wp-content/uploads/2023/07/19164228/favicon_32%402x.png";
      textLoader.textContent = "Aún no tienes cupones por cambiar";
    } else {
      coupons.forEach(({ code, description, meta_data }, i) => {
        let [title] = description.split(",");
        meta_data = meta_data.filter(({ key }) => key === "amazonS3_cache")[0];
        const links = Object.keys(meta_data.value);
        const img = links.find((url) => url.includes("cdn-giko.s3"));
        html += `<section class="animate__animated animate__fadeIn">
                  <h3>${title.trim()}</h3>
                  <img loading="lazy" src="https:${img}" alt="Cupón ${++i}">
                  <div class="info">
                    <p>Código de validación</p>
                    <div>
                      <span>${code}</span>
                      <button onclick="copy('${code}')">Redimir Bono</button>
                    </div>
                  </div>
                </section>`;
      });
      wrapper.insertAdjacentHTML("beforeend", html);
      imgLoader.src =
        "https://gikolab.com/wp-content/uploads/2023/08/main_animation-1.gif";
      textLoader.textContent = "Cargando...";
    }
  };

  const setState = (obj = {}) => {
    for (const key in obj) {
      if (state.hasOwnProperty(key)) {
        state[key] = obj[key];
      }
    }
    render();
  };

  const getData = async () => {
    const { wc_username, wc_password } = CREDENTIALS;
    let res = await fetch(`${WC_BASE_URL}/coupons`, {
      headers: {
        Authorization: "Basic " + btoa(wc_username + ":" + wc_password),
      },
    });

    res = await res.json();

    setState({ coupons: res ?? [] });
  };

  getData();
};

$d.addEventListener("DOMContentLoaded", getCoupons);
