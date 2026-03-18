const articles = [
  {
    title: "How Better Documentation Reduces Project Rework in Agile Teams",
    category: "agile-delivery",
    tag: "🔄 Agile & Delivery",
    excerpt: "One of the biggest hidden costs in product development is rework...",
    date: "March 2026",
    readTime: "7 min read",
    link: "how-better-documentation-reduces-rework.html",
    featured: true
  },

  {
    title: "Why Stakeholder Communication Is the Hardest Part of Any Project",
    category: "career-growth",
    tag: "🤝 Career & Growth",
    excerpt: "The technical side of delivery is learnable...",
    comingSoon: true
  },

  {
    title: "From Coordinator to Senior PM: What Actually Changes",
    category: "career-growth",
    tag: "📈 Career & Growth",
    excerpt: "The jump to Senior isn't just about doing more work...",
    comingSoon: true
  },

  {
    title: "How I Built a Client Portal That Cut Email Back-and-Forth by Half",
    category: "process-tools",
    tag: "⚙️ Process & Tools",
    excerpt: "A practical walkthrough of the Notion-based client portal system...",
    comingSoon: true
  }
];

const grid = document.getElementById('articlesGrid');
const visibleCountEl = document.getElementById('visibleCount');
const filterBtns = document.querySelectorAll('[data-filter]');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });
function renderArticles(list) {
  grid.innerHTML = '';

  list.forEach(article => {
    const el = document.createElement('article');

    let classes = 'article-card reveal';
    if (article.featured) classes += ' featured';
    if (article.comingSoon) classes += ' coming-soon';

    el.className = classes;
    el.setAttribute('data-category', article.category);

    if (article.featured) {
      el.innerHTML = `
        <div class="article-card-visual"></div>
        <div class="article-card-body">
          <span class="article-tag">${article.tag}</span>
          <h2 class="article-title">${article.title}</h2>
          <p class="article-excerpt">${article.excerpt}</p>
          <div class="article-footer">
            <div>
              <div class="article-date">${article.date}</div>
              <div class="article-read-time">${article.readTime}</div>
            </div>
            <a href="${article.link}" class="article-read-link">Read article →</a>
          </div>
        </div>
      `;
    }

    else if (article.comingSoon) {
      el.innerHTML = `
        <div class="article-card-body">
          <span class="coming-badge">Coming soon</span>
          <h2 class="article-title">${article.title}</h2>
          <p class="article-excerpt">${article.excerpt}</p>
          <div class="article-footer">
            <span class="article-tag">${article.tag}</span>
          </div>
        </div>
      `;
    }

    grid.appendChild(el);
  });

  // Re-attach animations
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
}
renderArticles(articles);
visibleCountEl.textContent = articles.length;

filterBtns.forEach(btn => {
  const filter = btn.getAttribute('data-filter');

  const count = filter === 'all'
    ? articles.length
    : articles.filter(a => a.category === filter).length;

  const badge = document.createElement('span');
  badge.className = 'filter-count';
  badge.textContent = count;

  btn.appendChild(badge);
});

function filterArticles(filter) {
  const filtered = filter === 'all'
    ? articles
    : articles.filter(a => a.category === filter);

  renderArticles(filtered);
  visibleCountEl.textContent = filtered.length;
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    filterArticles(btn.getAttribute('data-filter'));
  });
});
