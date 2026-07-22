// ==================== DOMの読み込み完了を待つ ====================
document.addEventListener('DOMContentLoaded', function() {
    // 各種初期化関数を実行
    initScrollAnimations();
    initHeaderScroll();
    initSmoothScroll();
    initGalleryHover();
});

// ==================== スクロールアニメーション ====================
function initScrollAnimations() {
    // Intersection Observer を使用してスクロールアニメーションを実装
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // 要素が画面内に入ったらアニメーションを追加
                entry.target.classList.add('fade-in');

                // アニメーション後は監視を解除（一度だけ実行）
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を取得
    const animateElements = document.querySelectorAll('.section-title, .profile-content, .charm-card, .gallery-item, .activity-card');

    animateElements.forEach(function(element, index) {
        // 要素ごとに遅延を設定
        element.style.animationDelay = (index * 0.1) + 's';
        observer.observe(element);
    });
}

// ==================== ヘッダーのスクロール効果 ====================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');

    if (!header || !hero) {
        return;
    }

    function updateHeaderVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const isHeroVisible = scrollTop < heroBottom - header.offsetHeight;
        header.classList.toggle('hidden-on-hero', isHeroVisible);

        // スクロール量が50px以上でヘッダーにクラスを追加
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    updateHeaderVisibility();
    window.addEventListener('scroll', updateHeaderVisibility);
    window.addEventListener('resize', updateHeaderVisibility);
}

// ==================== スムーズスクロール ====================
function initSmoothScroll() {
    // すべてのナビゲーションリンクを取得
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // リンク先のIDを取得
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // ヘッダーの高さを考慮してスクロール
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // アクティブクラスの管理
                navLinks.forEach(function(navLink) {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// ==================== ギャラリーホバー効果 ====================
function initGalleryHover() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(function(item) {
        // マウスエンター時のアニメーション
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });

        // マウスリーブ時のアニメーション
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // クリック時のアクション（将来的にモーダル実装など）
        item.addEventListener('click', function() {
            // プレースホルダーのため、現在は何も実装していません
            // 実際の実装では、画像のモーダル表示などを追加可能
            console.log('Gallery item clicked');
        });
    });
}

// ==================== パララックス効果（ヒーローセクション） ====================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        // ヒーローセクションの背景に軽いパララックス効果
        const parallaxSpeed = 0.5;
        hero.style.transform = 'translateY(' + (scrolled * parallaxSpeed) + 'px)';
    }
});

// ==================== チャームカードのアニメーション ====================
const charmCards = document.querySelectorAll('.charm-card');

charmCards.forEach(function(card, index) {
    // カードごとにアニメーション遅延を設定
    card.style.animationDelay = (index * 0.2) + 's';

    // ホバー時のアニメーション強化
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.charm-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.charm-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ==================== ページ読み込み時のアニメーション ====================
window.addEventListener('load', function() {
    // ヒーローセクションのコンテンツをフェードイン
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(function() {
            heroContent.style.transition = 'opacity 1s ease';
            heroContent.style.opacity = '1';
        }, 100);
    }
});

// ==================== スクロールインジケーターのアニメーション ====================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // スクロールしたらインジケーターを非表示
        if (scrollTop > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.3s ease';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// ==================== アクティビティカードのアニメーション ====================
const activityCards = document.querySelectorAll('.activity-card');

activityCards.forEach(function(card, index) {
    // カードごとに左右からスライドインするアニメーション
    if (index % 2 === 0) {
        card.classList.add('slide-in-left');
    } else {
        card.classList.add('slide-in-right');
    }

    card.style.animationDelay = (index * 0.15) + 's';
});

// ==================== パフォーマンス最適化 ====================
// デバウンス関数（スクロールイベントの最適化）
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// スクロールイベントのデバウンス適用
const optimizedScroll = debounce(function() {
    // 重い処理をここに記述可能
}, 100);

window.addEventListener('scroll', optimizedScroll);
