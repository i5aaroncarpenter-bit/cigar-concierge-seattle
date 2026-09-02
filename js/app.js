(function () {
  const CART_KEY = "cc_cart_v1";
  const AGE_KEY = "cc_age_ok";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  function money(n) {
    if (n == null) return "Inquire";
    return "$" + n.toLocaleString("en-US");
  }

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch { return []; }
  }
  function setCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartCount();
    renderDrawer();
  }
  function cartCount() {
    return getCart().reduce((n, i) => n + i.qty, 0);
  }
  function updateCartCount() {
    $$("[data-cart-count]").forEach((el) => { el.textContent = cartCount(); });
  }

  function addToCart(id, qty = 1) {
    const p = CC.products.find((x) => x.id === id);
    if (!p) return;
    const cart = getCart();
    const hit = cart.find((x) => x.id === id);
    if (hit) hit.qty += qty;
    else cart.push({ id, qty });
    setCart(cart);
    toast((p.name) + " added to the request list.");
    openDrawer();
  }

  function toast(msg) {
    let t = $(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2400);
  }

  const page = document.body.dataset.page || "";

  function headerHTML() {
    return `
      <div class="demo-ribbon">Demo boutique — no live charges. Requests route to @SeattleCigars on X.</div>
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html">
            <img src="https://cigar-concierge-seattle.netlify.app/assets/logo/crest-tight.jpg" alt="Cigar Concierge bell crest">
            <div class="brand-text">
              <strong>Cigar Concierge</strong>
              <span>Seattle · Est. private list</span>
            </div>
          </a>
          <nav class="nav" data-nav>
            <a href="index.html" class="${page==="home"?"active":""}">Home</a>
            <a href="shop.html" class="${page==="shop"||page==="product"?"active":""}">Shop</a>
            <a href="concierge.html" class="${page==="concierge"?"active":""}">Concierge</a>
            <a href="journal.html" class="${page==="journal"?"active":""}">Journal</a>
            <a href="about.html" class="${page==="about"?"active":""}">About</a>
            <a href="contact.html" class="${page==="contact"?"active":""}">Contact</a>
          </nav>
          <div class="header-tools">
            <div class="search-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
              <input type="search" placeholder="Search cigars" data-search>
            </div>
            <button class="cart-btn" data-open-cart aria-label="Open request list">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 7h15l-1.5 9h-12z"/><path d="M6 7L5 3H2"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>
              <span class="cart-count" data-cart-count>0</span>
            </button>
            <button class="menu-btn" data-menu aria-label="Menu">☰</button>
          </div>
        </div>
      </header>`;
  }

  function footerHTML() {
    return `
      <footer class="site-footer">
        <div class="container foot-grid">
          <div>
            <h4>Cigar Concierge™</h4>
            <p style="color:rgba(243,234,216,.7);max-width:32ch">Private-label Dominican cigars and an allocated vault of Fuente, Davidoff, and Padrón. Ring the bell. DM to order.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <a href="shop.html?cat=house">House blends</a>
            <a href="shop.html?cat=vault">The Vault</a>
            <a href="product.html?id=dawgfather">The Dawgfather</a>
            <a href="product.html?id=blockbuster">Blockbuster</a>
          </div>
          <div>
            <h4>House</h4>
            <a href="about.html">The Concierge</a>
            <a href="concierge.html">How allocation works</a>
            <a href="journal.html">Video journal</a>
            <a href="contact.html">Request a stick</a>
          </div>
          <div>
            <h4>Connect</h4>
            <a href="https://x.com/SeattleCigars" target="_blank" rel="noopener">@SeattleCigars</a>
            <a href="https://x.com/messages/compose?recipient_id=1067975870868930560" target="_blank" rel="noopener">Direct message</a>
            <a href="contact.html">Concierge desk</a>
          </div>
        </div>
        <div class="container legal">
          Must be 21+ to browse or request tobacco. This is a design demo assembled from public @SeattleCigars posts — not an official storefront and not affiliated beyond the public catalog shown on X. Smoking cigars can cause cancer, heart disease, and other serious health conditions. Prices shown are those published on X at time of capture.
        </div>
      </footer>
      <div class="drawer-bg" data-drawer-bg></div>
      <aside class="drawer" data-drawer>
        <div class="drawer-head">
          <strong>Request list</strong>
          <button class="btn btn-outline" data-close-cart style="float:right;padding:6px 10px">Close</button>
        </div>
        <div class="drawer-body" data-drawer-body></div>
        <div class="drawer-foot">
          <div class="summary-row"><span>Items</span><strong data-drawer-count>0</strong></div>
          <div class="summary-row"><span>Known subtotal</span><strong data-drawer-total>$0</strong></div>
          <p style="font-size:12px;color:var(--muted)">Vault pieces price on request. Checkout opens an X message to the Concierge.</p>
          <a class="btn btn-gold full" href="cart.html">Review &amp; request</a>
        </div>
      </aside>`;
  }

  function ageHTML() {
    return `
      <div class="age-gate" data-age>
        <div class="age-card">
          <img src="https://cigar-concierge-seattle.netlify.app/assets/logo/crest-tight.jpg" alt="Cigar Concierge">
          <h2>Ring the bell.</h2>
          <p>Cigar Concierge is a 21+ tobacco boutique. Confirm you are of legal smoking age in your jurisdiction.</p>
          <div class="age-actions">
            <button class="btn btn-gold" data-age-yes>I am 21+</button>
            <button class="btn btn-outline" data-age-no>Exit</button>
          </div>
        </div>
      </div>`;
  }

  function mountChrome() {
    document.body.insertAdjacentHTML("afterbegin", ageHTML() + headerHTML());
    document.body.insertAdjacentHTML("beforeend", footerHTML());

    if (localStorage.getItem(AGE_KEY) === "1") {
      $("[data-age]").classList.add("hidden");
    }
    $("[data-age-yes]").addEventListener("click", () => {
      localStorage.setItem(AGE_KEY, "1");
      $("[data-age]").classList.add("hidden");
    });
    $("[data-age-no]").addEventListener("click", () => {
      window.location.href = "https://www.google.com";
    });

    $("[data-menu]").addEventListener("click", () => $("[data-nav]").classList.toggle("open"));
    $("[data-open-cart]").addEventListener("click", openDrawer);
    $("[data-close-cart]").addEventListener("click", closeDrawer);
    $("[data-drawer-bg]").addEventListener("click", closeDrawer);

    const search = $("[data-search]");
    if (search) {
      search.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const q = encodeURIComponent(search.value.trim());
          window.location.href = "shop.html?q=" + q;
        }
      });
    }
    updateCartCount();
    renderDrawer();
  }

  function openDrawer() {
    $("[data-drawer]").classList.add("open");
    $("[data-drawer-bg]").classList.add("open");
  }
  function closeDrawer() {
    $("[data-drawer]").classList.remove("open");
    $("[data-drawer-bg]").classList.remove("open");
  }

  function renderDrawer() {
    const body = $("[data-drawer-body]");
    if (!body) return;
    const cart = getCart();
    if (!cart.length) {
      body.innerHTML = `<div class="empty">Your request list is empty.</div>`;
    } else {
      body.innerHTML = cart.map((item) => {
        const p = CC.products.find((x) => x.id === item.id);
        if (!p) return "";
        return `<div class="mini-item">
          <img src="${p.image}" alt="">
          <div>
            <strong>${p.name}</strong>
            <div class="card-meta">${item.qty} × ${money(p.price)}</div>
          </div>
          <button class="btn btn-outline" data-remove="${p.id}" style="padding:4px 8px">✕</button>
        </div>`;
      }).join("");
    }
    const known = cart.reduce((n, i) => {
      const p = CC.products.find((x) => x.id === i.id);
      return n + (p && p.price ? p.price * i.qty : 0);
    }, 0);
    const countEl = $("[data-drawer-count]");
    const totalEl = $("[data-drawer-total]");
    if (countEl) countEl.textContent = cartCount();
    if (totalEl) totalEl.textContent = money(known);
    body.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setCart(getCart().filter((x) => x.id !== btn.dataset.remove));
      });
    });
  }

  function productCard(p) {
    return `<article class="card">
      <a href="product.html?id=${p.id}">
        <div class="card-media">
          <img src="${p.image}" alt="${p.name}">
          <span class="badge ${p.badge}">${p.tag}</span>
        </div>
      </a>
      <div class="card-body">
        <div class="card-cat">${p.brand}</div>
        <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <div class="card-meta">${p.format}</div>
        <div class="price-row">
          <span class="price">${money(p.price)}</span>
          <button class="btn btn-navy" data-add="${p.id}">${p.price ? "Add" : "Request"}</button>
        </div>
      </div>
    </article>`;
  }

  function renderShop() {
    const root = $("[data-shop]");
    if (!root) return;
    const params = new URLSearchParams(location.search);
    let cat = params.get("cat") || "all";
    let q = (params.get("q") || "").toLowerCase();

    const paint = () => {
      let list = CC.products.slice();
      if (cat !== "all") list = list.filter((p) => p.category === cat);
      if (q) list = list.filter((p) => (p.name + p.brand + p.blurb + p.notes).toLowerCase().includes(q));
      root.innerHTML = list.length
        ? list.map(productCard).join("")
        : `<p class="empty">No cigars match that filter.</p>`;
      root.querySelectorAll("[data-add]").forEach((b) => b.addEventListener("click", () => addToCart(b.dataset.add)));
      $$("[data-filter]").forEach((c) => c.classList.toggle("active", c.dataset.filter === cat));
    };

    $$("[data-filter]").forEach((chip) => {
      chip.addEventListener("click", () => {
        cat = chip.dataset.filter;
        q = "";
        history.replaceState({}, "", "shop.html" + (cat === "all" ? "" : "?cat=" + cat));
        paint();
      });
    });
    paint();
  }

  function renderHomeFeatured() {
    const root = $("[data-featured]");
    if (!root) return;
    root.innerHTML = CC.products.slice(0, 6).map(productCard).join("");
    root.querySelectorAll("[data-add]").forEach((b) => b.addEventListener("click", () => addToCart(b.dataset.add)));
  }

  function renderProduct() {
    const root = $("[data-pdp]");
    if (!root) return;
    const id = new URLSearchParams(location.search).get("id") || "blockbuster";
    const p = CC.products.find((x) => x.id === id) || CC.products[0];
    document.title = p.name + " — Cigar Concierge";
    const media = p.video
      ? `<video class="main" controls playsinline poster="${p.image}" src="${p.video}"></video>`
      : `<img class="main" src="${p.image}" alt="${p.name}">`;
    const thumbs = (p.gallery || [p.image]).map((src, i) => `<img src="${src}" data-thumb="${src}" class="${i===0?"on":""}" alt="">`).join("")
      + (p.video ? `<video data-vid="${p.video}" muted playsinline src="${p.video}"></video>` : "");
    root.innerHTML = `
      <div class="pdp-grid">
        <div class="gallery">
          ${media}
          <div class="thumbs">${thumbs}</div>
        </div>
        <div class="pdp-info">
          <div class="eyebrow">${p.brand} · ${p.tag}</div>
          <h1>${p.name}</h1>
          <div class="pdp-price">${money(p.price)} <span style="font-size:1rem;color:var(--muted)">${p.unit}</span></div>
          <p>${p.story}</p>
          <p>${p.notes}</p>
          <dl class="specs">
            <div class="spec"><dt>Format</dt><dd>${p.format}</dd></div>
            <div class="spec"><dt>Wrapper</dt><dd>${p.wrapper}</dd></div>
            <div class="spec"><dt>Origin</dt><dd>${p.origin}</dd></div>
            <div class="spec"><dt>Strength</dt><dd>${p.strength}</dd></div>
            <div class="spec"><dt>Availability</dt><dd>${p.stock}</dd></div>
            <div class="spec"><dt>House</dt><dd>${p.category === "house" ? "Private label" : "Allocated vault"}</dd></div>
          </dl>
          <div class="qty-row">
            <div class="qty">
              <button type="button" data-minus>−</button>
              <input type="number" min="1" value="1" data-qty>
              <button type="button" data-plus>+</button>
            </div>
            <button class="btn btn-gold" data-add-pdp>${p.price ? "Add to request list" : "Request allocation"}</button>
          </div>
          <a class="btn btn-outline" href="https://x.com/SeattleCigars" target="_blank" rel="noopener">Message @SeattleCigars</a>
          ${p.tweet ? `<p class="card-meta" style="margin-top:16px">Originally offered on <a href="https://x.com/SeattleCigars/status/${p.tweet}" target="_blank">this X post</a>.</p>` : ""}
        </div>
      </div>`;

    const main = root.querySelector(".main");
    root.querySelectorAll("[data-thumb]").forEach((img) => {
      img.addEventListener("click", () => {
        if (main.tagName === "VIDEO") {
          const wrap = main.parentElement;
          const newImg = document.createElement("img");
          newImg.className = "main";
          newImg.src = img.dataset.thumb;
          wrap.replaceChild(newImg, main);
        } else {
          main.src = img.dataset.thumb;
        }
        $$(".thumbs img, .thumbs video", root).forEach((t) => t.classList.remove("on"));
        img.classList.add("on");
      });
    });
    const vthumb = root.querySelector("[data-vid]");
    if (vthumb) {
      vthumb.addEventListener("click", () => {
        location.reload();
      });
    }
    const qty = root.querySelector("[data-qty]");
    root.querySelector("[data-minus]").addEventListener("click", () => { qty.value = Math.max(1, +qty.value - 1); });
    root.querySelector("[data-plus]").addEventListener("click", () => { qty.value = +qty.value + 1; });
    root.querySelector("[data-add-pdp]").addEventListener("click", () => addToCart(p.id, +qty.value || 1));

    const related = $("[data-related]");
    if (related) {
      const more = CC.products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);
      related.innerHTML = more.map(productCard).join("");
      related.querySelectorAll("[data-add]").forEach((b) => b.addEventListener("click", () => addToCart(b.dataset.add)));
    }
  }

  function renderCartPage() {
    const root = $("[data-cart-page]");
    if (!root) return;
    const draw = () => {
      const cart = getCart();
      if (!cart.length) {
        root.innerHTML = `<div class="empty"><p>Nothing on the list yet.</p><a class="btn btn-gold" href="shop.html">Browse the humidor</a></div>`;
        return;
      }
      const rows = cart.map((item) => {
        const p = CC.products.find((x) => x.id === item.id);
        if (!p) return "";
        return `<tr>
          <td><div class="cart-item"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><div class="card-meta">${p.format}</div></div></div></td>
          <td>${money(p.price)}</td>
          <td>
            <div class="qty">
              <button data-chg="${p.id}" data-d="-1">−</button>
              <input value="${item.qty}" readonly>
              <button data-chg="${p.id}" data-d="1">+</button>
            </div>
          </td>
          <td>${p.price ? money(p.price * item.qty) : "TBD"}</td>
          <td><button class="btn btn-outline" data-remove="${p.id}">Remove</button></td>
        </tr>`;
      }).join("");
      const known = cart.reduce((n, i) => {
        const p = CC.products.find((x) => x.id === i.id);
        return n + (p && p.price ? p.price * i.qty : 0);
      }, 0);
      const lines = cart.map((i) => {
        const p = CC.products.find((x) => x.id === i.id);
        return p ? `${i.qty}× ${p.name} (${p.price ? money(p.price) : "inquire"})` : "";
      }).filter(Boolean).join("%0A");
      const dm = `https://x.com/messages/compose?recipient_id=1067975870868930560`;
      root.innerHTML = `
        <div class="cart-layout">
          <table class="cart-table">
            <thead><tr><th>Cigar</th><th>Price</th><th>Qty</th><th>Line</th><th></th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
          <aside class="summary">
            <h3>Request desk</h3>
            <div class="summary-row"><span>Known subtotal</span><strong>${money(known)}</strong></div>
            <div class="summary-row"><span>Vault pieces</span><span>Priced on reply</span></div>
            <hr>
            <p>This demo does not process payments. Send the list to the Concierge on X and he will confirm allocation, shipping, and payment.</p>
            <a class="btn btn-gold full" href="${dm}" target="_blank" rel="noopener">Open X message</a>
            <button class="btn btn-ghost full" data-copy style="margin-top:10px;border-color:var(--gold);color:var(--cream)">Copy order text</button>
          </aside>
        </div>`;
      root.querySelectorAll("[data-chg]").forEach((b) => {
        b.addEventListener("click", () => {
          const cart2 = getCart();
          const hit = cart2.find((x) => x.id === b.dataset.chg);
          if (!hit) return;
          hit.qty = Math.max(1, hit.qty + Number(b.dataset.d));
          setCart(cart2);
          draw();
        });
      });
      root.querySelectorAll("[data-remove]").forEach((b) => {
        b.addEventListener("click", () => { setCart(getCart().filter((x) => x.id !== b.dataset.remove)); draw(); });
      });
      const copyBtn = root.querySelector("[data-copy]");
      if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
          const text = "Cigar Concierge request:%0A".replace("%0A", "\n") + decodeURIComponent(lines);
          try { await navigator.clipboard.writeText(text); toast("Order text copied."); }
          catch { toast("Copy failed — select it from the list."); }
        });
      }
    };
    draw();
  }

  function renderJournal() {
    const featured = $("[data-video-featured]");
    const side = $("[data-video-side]");
    const embeds = $("[data-embeds]");
    if (featured && CC.videos[0]) {
      featured.innerHTML = `<video controls playsinline poster="https://cigar-concierge-seattle.netlify.app/assets/images/dawgfather-box.jpg" src="${CC.videos[0].src}"></video>
        <div class="pad" style="padding:16px 0 0">
          <div class="kicker">From the X desk</div>
          <h3 style="font-family:var(--serif);font-size:2rem;margin:6px 0">${CC.videos[0].title}</h3>
          <p>${CC.videos[0].copy}</p>
        </div>`;
    }
    if (side) {
      side.innerHTML = CC.videos.slice(1).map((v) => `
        <article class="video-card">
          <video controls playsinline src="${v.src}"></video>
          <div class="pad">
            <strong>${v.title}</strong>
            <p class="card-meta">${v.copy}</p>
          </div>
        </article>`).join("");
    }
    if (embeds) {
      embeds.innerHTML = CC.embeds.map((e) => `
        <div class="embed-card">
          <blockquote class="twitter-tweet" data-dnt="true" data-theme="light">
            <a href="https://twitter.com/SeattleCigars/status/${e.id}">${e.title}</a>
          </blockquote>
        </div>`).join("");
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://platform.twitter.com/widgets.js";
      document.body.appendChild(s);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    mountChrome();
    renderHomeFeatured();
    renderShop();
    renderProduct();
    renderCartPage();
    renderJournal();
  });

  window.CC.addToCart = addToCart;
})();
