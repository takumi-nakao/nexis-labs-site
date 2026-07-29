/**
 * NEXIS Labs - Main JavaScript Logic
 * 
 * 1. Minimal Loader (Apple / Linear style)
 * 2. Mobile Navigation Toggle
 * 3. Dynamic Projects Rendering
 * 4. GSAP ScrollTrigger Animations
 * 5. FAQ Accordion Logic
 * 6. Contact Form integration (Formspree helper)
 */

// Formspreeの送信先エンドポイント (案件ごとに変更可能)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/placeholder_id";

// ブラウザのリロード時にスクロール位置を復元せず、常に最上部（TOP）から表示する
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

// 読み込み直後に強制的に最上部へスクロール
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  // DOM構築完了時にも念のため最上部に固定
  window.scrollTo(0, 0);

  // GSAPの登録
  gsap.registerPlugin(ScrollTrigger);

  // 各初期化関数の呼び出し
  initLoader();
  initNavbar();
  renderProjects();
  initFAQ();
  initContactForm();
  initScrollAnimations();
  initPricingCarousel();
});

// 全てのリソースが読み込まれ、高さが確定した時点で位置計算をリフレッシュ
window.addEventListener('load', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});

/* ==========================================================================
   1. MINIMAL LOADER (0.8s - 1.5s)
   ========================================================================== */
function initLoader() {
  const loader = document.querySelector('.loader-wrapper');
  const percentText = document.querySelector('.loader-progress');
  const loaderLogo = document.querySelector('.loader-logo');
  
  if (!loader || !percentText) return;

  // スクロールをロック
  document.body.classList.add('overflow-hidden');

  // GSAPでロゴとパーセント表示をフェードイン
  const loaderTl = gsap.timeline();
  
  loaderTl.to(loaderLogo, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out"
  }).to(percentText, {
    opacity: 1,
    duration: 0.3
  }, "-=0.2");

  // カウントアップシミュレーション (1.0秒程度で完了)
  let count = 0;
  const target = 100;
  const duration = 1000; // 1秒
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    count = Math.floor(progress * target);
    percentText.textContent = `${count}%`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      // 100%に達したらローダーを消す
      endLoading();
    }
  }

  requestAnimationFrame(updateCounter);

  function endLoading() {
    // ローダー消去アニメーション (一瞬で高級感のあるフェードアウト)
    gsap.timeline({
      onComplete: () => {
        loader.style.display = 'none';
        document.body.classList.remove('overflow-hidden');
        // ヒーローセクションの表示アニメーションを開始
        animateHero();
      }
    })
    .to([loaderLogo, percentText], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in"
    })
    .to(loader, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    }, "-=0.2");
  }
}

/* ==========================================================================
   2. NAVBAR SCROLL EFFECT & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  // スクロール時の背景付与
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // モバイルメニュー開閉
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      const active = navLinksContainer.classList.toggle('active');
      mobileToggle.classList.toggle('open');
      
      if (active) {
        gsap.fromTo('.nav-link', 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: "power2.out" }
        );
      }
    });

    // リンククリック時に閉じる
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        mobileToggle.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   3. DYNAMIC PROJECTS RENDERING
   ========================================================================== */
function renderProjects() {
  const container = document.querySelector('#projects-container');
  if (!container || !window.PROJECTS_DATA) return;

  container.innerHTML = window.PROJECTS_DATA.map(project => {
    // 技術タグの生成
    const tagsHTML = project.technologies.map(tech => `<span class="project-tag">${tech}</span>`).join('');

    return `
      <div class="project-card glass-panel gsap-fade-up">
        <div class="project-image-container">
          <img class="project-image" src="${project.image}" alt="${project.title}" loading="lazy">
          <span class="project-badge ${project.badgeClass}">${project.badge}</span>
        </div>
        <div class="project-details">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          
          <div class="project-meta-info">
            <div class="project-meta-item">
              <strong>制作目的:</strong> <span>${project.purpose}</span>
            </div>
            <div class="project-meta-item">
              <strong>担当範囲:</strong> <span>${project.scope}</span>
            </div>
          </div>
          
          <div class="project-tags">${tagsHTML}</div>
          
          <div class="project-actions">
            <a href="${project.liveUrl}" target="_blank" class="btn btn-secondary mono-text">Live Site</a>
            <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary mono-text">Repository</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   4. GSAP SCROLLTRIGGER ANIMATIONS
   ========================================================================== */
function animateHero() {
  // ヒーローセクション登場時の連鎖アニメーション
  const tl = gsap.timeline();
  
  tl.to('.hero-tagline', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power3.out"
  })
  .to('.hero-title', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.4")
  .to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.6")
  .to('.hero-ctas', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.6");
}

function initScrollAnimations() {
  // セクションごとのフェードアップ
  const fadeUpElements = document.querySelectorAll('.gsap-fade-up');
  
  fadeUpElements.forEach(el => {
    gsap.fromTo(el, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // 画面の85%に入ったら開始
          toggleActions: "play none none none"
        }
      }
    );
  });



  // タイムラインUIのアニメーション（進行ラインのハイライト）
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    const badge = item.querySelector('.timeline-badge');
    const content = item.querySelector('.timeline-content');
    
    // 安全対策：要素が存在しない場合はスキップ
    if (!badge || !content) return;
    
    gsap.fromTo([badge, content],
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });
}

/* ==========================================================================
   5. FAQ ACCORDION LOGIC
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // 他のアコーディオンを閉じる (高級感ある排他開閉)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-content').style.maxHeight = null;
        }
      });

      // アクティブ状態のトグル
      item.classList.toggle('active');
      
      if (!isActive) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================================================
   6. CONTACT FORM INTEGRATION
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  const statusDiv = document.querySelector('#form-status');
  
  if (!form || !statusDiv) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UIのローディング状態
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    
    statusDiv.className = "form-status";
    statusDiv.style.display = "none";

    // フォームデータの構築
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // エンドポイントがプレースホルダーの場合はダミー送信（テスト用）
      if (FORMSPREE_ENDPOINT.includes('placeholder_id')) {
        // ダミー送信の疑似ディレイ (0.8秒)
        await new Promise(resolve => setTimeout(resolve, 800));
        
        statusDiv.textContent = "【テスト送信成功】お問い合わせを受け付けました。本番ではFormspree APIに接続されます。";
        statusDiv.classList.add('success');
        form.reset();
      } else {
        // 本番送信
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          statusDiv.textContent = "お問い合わせが送信されました。確認メールをお送りします。";
          statusDiv.classList.add('success');
          form.reset();
        } else {
          throw new Error('Formspree returned error response');
        }
      }
    } catch (error) {
      statusDiv.textContent = "送信中にエラーが発生しました。お手数ですがしばらく経ってから再度お試しください。";
      statusDiv.classList.add('error');
      console.error('Contact Form Error:', error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

/**
 * 料金プランカルーセルの制御（タブレット・スマホ対応）
 * 3.5秒ごとに自動スクロールし、ユーザー操作時にはタイマーをポーズします。
 */
function initPricingCarousel() {
  const grid = document.querySelector('.pricing-grid');
  const cards = document.querySelectorAll('.pricing-card');
  if (!grid || cards.length === 0) return;

  let intervalId = null;
  let currentIndex = 0;
  const slideDuration = 3500; // 3.5秒（3500ミリ秒）
  let isTransitioning = false; // 重複スクロール防止フラグ

  // スライドを次のカードへ移動する関数
  function startAutoSlide() {
    stopAutoSlide();
    intervalId = setInterval(() => {
      // 画面幅が992pxより大きい（PC表示）の場合は処理しない
      if (window.innerWidth > 992) return;

      currentIndex = (currentIndex + 1) % cards.length;
      scrollToIndex(currentIndex);
    }, slideDuration);
  }

  // 自動スライドの一時停止
  function stopAutoSlide() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // 指定インデックスのカードへスクロール
  function scrollToIndex(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    const card = cards[index];
    const gridStyle = window.getComputedStyle(grid);
    const gap = parseInt(gridStyle.gap) || 16;
    const paddingLeft = parseInt(gridStyle.paddingLeft) || 16;

    // カードのオフセットからコンテナのパディングを引いた正確なスクロール位置を計算
    const targetScrollLeft = card.offsetLeft - paddingLeft;

    grid.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });

    // スムーズスクロール完了後にフラグを下ろす（おおむね500ms）
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  // ユーザーのスクロール/スワイプ操作を検知して自動スライドをポーズ
  let scrollTimeout;
  grid.addEventListener('scroll', () => {
    if (window.innerWidth > 992) return;

    // スクロール検知中はタイマーをクリアして自動スライドを一時停止
    stopAutoSlide();

    // スクロールが終了した（＝150ms間スクロールイベントが来ない）タイミングでインデックスを検知して再開
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const gridStyle = window.getComputedStyle(grid);
      const gap = parseInt(gridStyle.gap) || 16;
      const paddingLeft = parseInt(gridStyle.paddingLeft) || 16;
      
      // スクロール完了位置から、一番近いカードのインデックスを計算
      const scrollPos = grid.scrollLeft;
      let closestIndex = 0;
      let minDistance = Infinity;

      cards.forEach((card, idx) => {
        const targetPos = card.offsetLeft - paddingLeft;
        const dist = Math.abs(scrollPos - targetPos);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = idx;
        }
      });

      currentIndex = closestIndex;
      startAutoSlide(); // 自動スライドをリスタート
    }, 150);
  });

  // 初期スライド自動実行を開始
  startAutoSlide();

  // PC ⇔ タブレット/スマホ間のサイズ切り替え時の監視
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      stopAutoSlide();
      grid.scrollTo({ left: 0 }); // PC版に戻ったらスクロールをリセット
      currentIndex = 0;
    } else {
      if (!intervalId) {
        startAutoSlide();
      }
    }
  });
}

