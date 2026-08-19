type Shot = Readonly<{
  index: string;
  meta: string;
  title: string;
  description: string;
  guide: string;
  visual:
    | "footprints"
    | "rolls"
    | "roll-detail"
    | "constellation"
    | "city-slide"
    | "city-gallery"
    | "city-gallery-shuffled"
    | "lightbox";
}>;

type CaseSection = Readonly<{
  number: string;
  label: string;
  title: string;
  description: string;
  shots: readonly Shot[];
}>;

const sections: readonly CaseSection[] = [
  {
    number: "01",
    label: "PRODUCT SYSTEM",
    title: "从一座城，到一次旅程",
    description:
      "TravelFilm 不只按时间排列照片，而是把旅行拆成地点、旅程与长期回顾，让每段记忆都有清晰的入口。",
    shots: [
      {
        index: "01",
        meta: "FOOTPRINTS",
        title: "城市，是记忆的入口",
        description: "从地图与城市主图开始，先看一个地点留下了什么。",
        guide:
          "Footprints 首页静止态：城市主卡居中，城市名、visit 数与底部旅行卷缩略图完整可见。",
        visual: "footprints",
      },
      {
        index: "02",
        meta: "ROLLS",
        title: "一次旅程，一卷胶片",
        description: "Rolls 独立承载完整旅程，避免地点与旅程互相重复。",
        guide:
          "Rolls 第二个 Tab：选择包含 2–3 个旅行封面、层级清楚的一屏。",
        visual: "rolls",
      },
      {
        index: "03",
        meta: "ROLL DETAIL",
        title: "回到旅程的细节里",
        description: "日期、地点与照片序列共同还原一次完整出发。",
        guide:
          "某个 Roll 详情顶部：旅行标题、日期或地点与照片序列同时可见。",
        visual: "roll-detail",
      },
      {
        index: "04",
        meta: "ME · CONSTELLATION",
        title: "把长期回顾变成星图",
        description: "从单次旅行回到全年节奏，看见自己的移动轨迹。",
        guide:
          "Me → Travel Constellation：选择数据最丰富、星点层级最好看的一年。",
        visual: "constellation",
      },
    ],
  },
  {
    number: "02",
    label: "SIGNATURE INTERACTION",
    title: "摇一摇，重新看见这座城",
    description:
      "点击城市主图进入纯黑照片画布。六张 2:3 照片以不规则层级排布；轻轻一摇，城市记忆重新发牌。",
    shots: [
      {
        index: "05",
        meta: "CITY SELECT",
        title: "从城市主图进入",
        description: "相邻城市轻轻露出，让选择保持连续而有方向。",
        guide:
          "Footprints 城市轮播滑到两座城市之间：中心卡与左右相邻卡同时露出。",
        visual: "city-slide",
      },
      {
        index: "06",
        meta: "PHOTO CANVAS",
        title: "六张照片，一屏展开",
        description: "不滚动、不讲 Rolls，只留下地点、照片与清晰层级。",
        guide:
          "城市照片页完整静止态：居中标题、6 张 2:3 卡片，以及 Latest / Earlier 两个三照片组件全部同屏。",
        visual: "city-gallery",
      },
      {
        index: "07",
        meta: "SHAKE TO SHUFFLE",
        title: "摇一摇，重新发牌",
        description: "不改变视点，只替换照片组合，让前后差异一眼可见。",
        guide:
          "与 06 保持同一城市和机位；摇一摇后等待动画结束，确认顶部 6 张照片已全部换组。",
        visual: "city-gallery-shuffled",
      },
      {
        index: "08",
        meta: "PHOTO VIEWER",
        title: "最后落在照片本身",
        description: "点击任意卡片进入全屏浏览，继续看前后瞬间。",
        guide:
          "点击不规则卡片后的全屏照片页：保留城市名、当前序号与前后切换控件。",
        visual: "lightbox",
      },
    ],
  },
];

function AppHeader({ label, meta }: Readonly<{ label: string; meta?: string }>) {
  return (
    <div className="mock-app-header">
      <span>{label}</span>
      <span>{meta ?? "2026"}</span>
    </div>
  );
}

function PhotoTile({ className, label }: Readonly<{ className: string; label: string }>) {
  return (
    <span className={`photo-tile ${className}`}>
      <span>{label}</span>
    </span>
  );
}

function FootprintsMock() {
  return (
    <div className="mock-ui mock-footprints">
      <AppHeader label="FOOTPRINTS" />
      <div className="mock-section-label">PLACES I REMEMBER</div>
      <div className="mock-city-card">
        <div className="mock-city-horizon" />
        <div className="mock-city-copy">
          <strong>SEOUL</strong>
          <span>03 VISITS</span>
        </div>
      </div>
      <div className="mock-dots"><i /><i className="active" /><i /></div>
      <div className="mock-section-row"><span>RECENT TRAVEL ROLLS</span><b>04</b></div>
      <div className="mock-roll-strip">
        <PhotoTile className="tone-a" label="01" />
        <PhotoTile className="tone-b" label="02" />
        <PhotoTile className="tone-c" label="03" />
      </div>
    </div>
  );
}

function RollsMock() {
  return (
    <div className="mock-ui mock-rolls">
      <AppHeader label="ROLLS" meta="12 JOURNEYS" />
      <div className="mock-filter-row"><span className="selected">ALL</span><span>2026</span><span>2025</span></div>
      {["SEOUL IN SPRING", "NORTH COAST", "WEEKEND IN OSAKA"].map((title, index) => (
        <div className="mock-roll-card" key={title}>
          <PhotoTile className={`tone-${String.fromCharCode(97 + index)}`} label={`0${index + 1}`} />
          <div><span>TRAVEL ROLL</span><strong>{title}</strong><small>{index + 3} DAYS · {18 - index * 3} PHOTOS</small></div>
        </div>
      ))}
    </div>
  );
}

function RollDetailMock() {
  return (
    <div className="mock-ui mock-roll-detail">
      <div className="mock-back">← <span>ROLL DETAIL</span></div>
      <PhotoTile className="detail-cover tone-b" label="SEOUL · 2026" />
      <span className="mock-eyebrow">APR 18 — APR 22</span>
      <h4>Seoul in spring</h4>
      <p>5 days · 24 photos · 6 places</p>
      <div className="mock-photo-grid">
        {Array.from({ length: 8 }, (_, index) => (
          <PhotoTile className={`tone-${String.fromCharCode(97 + (index % 4))}`} label={`${index + 1}`} key={index} />
        ))}
      </div>
    </div>
  );
}

function ConstellationMock() {
  return (
    <div className="mock-ui mock-constellation">
      <AppHeader label="TRAVEL CONSTELLATION" meta="ME" />
      <div className="mock-year">2026</div>
      <div className="constellation-canvas">
        <span className="orbit orbit-a" /><span className="orbit orbit-b" /><span className="orbit orbit-c" />
        {Array.from({ length: 13 }, (_, index) => <i className={`star star-${index + 1}`} key={index} />)}
        <div className="constellation-center"><strong>12</strong><span>PLACES</span></div>
      </div>
      <div className="mock-constellation-stats"><span><b>38</b> DAYS AWAY</span><span><b>08</b> CITIES</span></div>
    </div>
  );
}

function CitySlideMock() {
  return (
    <div className="mock-ui mock-city-slide">
      <AppHeader label="FOOTPRINTS" />
      <div className="mock-section-label">SWIPE BETWEEN CITIES</div>
      <div className="city-carousel">
        <PhotoTile className="city-peek city-left tone-d" label="TOKYO" />
        <PhotoTile className="city-main tone-a" label="SEOUL · 03 VISITS" />
        <PhotoTile className="city-peek city-right tone-c" label="OSAKA" />
      </div>
      <div className="mock-dots"><i /><i className="active" /><i /><i /></div>
      <div className="mock-enter-hint"><span>OPEN CITY MEMORY</span><b>↗</b></div>
    </div>
  );
}

function MiniStacks() {
  return (
    <div className="mini-stack-row">
      {[
        ["LATEST", "06 PHOTOS"],
        ["EARLIER", "16 PHOTOS"],
      ].map(([label, count], groupIndex) => (
        <div className="mini-stack" key={label}>
          <div className="mini-cards">
            <i /><i /><i className={groupIndex ? "tone-c" : "tone-a"} />
          </div>
          <div><strong>{label}</strong><span>{count}</span></div>
        </div>
      ))}
    </div>
  );
}

function CityGalleryMock({ shuffled = false }: Readonly<{ shuffled?: boolean }>) {
  return (
    <div className={`mock-ui mock-city-gallery ${shuffled ? "is-shuffled" : ""}`}>
      <div className="gallery-heading">
        <span>SEOUL · 2026</span>
        <strong>{shuffled ? "A NEW HAND" : "CITY MEMORIES"}</strong>
        <small>⌁ SHAKE TO SHUFFLE</small>
      </div>
      <div className="photo-cloud">
        {Array.from({ length: 6 }, (_, index) => (
          <PhotoTile className={`cloud-${index + 1} tone-${String.fromCharCode(97 + ((index + (shuffled ? 2 : 0)) % 4))}`} label={`0${index + 1}`} key={index} />
        ))}
      </div>
      <MiniStacks />
    </div>
  );
}

function LightboxMock() {
  return (
    <div className="mock-ui mock-lightbox">
      <div className="lightbox-top"><span>←</span><strong>SEOUL</strong><span>•••</span></div>
      <div className="lightbox-photo"><span>12 / 22</span><i /></div>
      <div className="lightbox-caption"><span>APR 21 · 18:42</span><strong>Seongsu-dong, Seoul</strong></div>
      <div className="lightbox-controls"><button aria-label="上一张">←</button><span><i className="active" /><i /><i /><i /></span><button aria-label="下一张">→</button></div>
    </div>
  );
}

function PlaceholderVisual({ visual }: Readonly<{ visual: Shot["visual"] }>) {
  switch (visual) {
    case "footprints": return <FootprintsMock />;
    case "rolls": return <RollsMock />;
    case "roll-detail": return <RollDetailMock />;
    case "constellation": return <ConstellationMock />;
    case "city-slide": return <CitySlideMock />;
    case "city-gallery": return <CityGalleryMock />;
    case "city-gallery-shuffled": return <CityGalleryMock shuffled />;
    case "lightbox": return <LightboxMock />;
  }
}

function ScreenshotWindow({ shot }: Readonly<{ shot: Shot }>) {
  return (
    <article className="shot-card">
      <div className="shot-topline"><span>{shot.index}</span><span>{shot.meta}</span></div>
      <div className="phone-window">
        <div className="window-bar">
          <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
          <span>SCREENSHOT SLOT {shot.index}</span>
        </div>
        <div className="phone-screen">
          <PlaceholderVisual visual={shot.visual} />
          <div className="placeholder-stamp">等待截图回填</div>
        </div>
      </div>
      <div className="shot-copy">
        <h3>{shot.title}</h3>
        <p>{shot.description}</p>
        <div className="shot-guide"><span>需截图</span><p>{shot.guide}</p></div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="返回页面顶部">YXY <span>/ PRODUCT CASE</span></a>
        <div className="app-mark"><i aria-hidden="true" /> TRAVELFILM <span>IPHONE APP</span></div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">LOCAL-FIRST TRAVEL MEMORY · MOBILE PRODUCT CASE</p>
        <h1 id="hero-title">把旅行，变成可以回去的地方。</h1>
        <div className="hero-bottom">
          <p>一款本地优先的 iPhone 旅行相册，用地点、旅程与长期回顾，重新组织散落在相册里的记忆。</p>
          <div className="product-logic" aria-label="TravelFilm 产品结构">
            <span><b>01</b> Footprints <small>看地点与照片</small></span>
            <span><b>02</b> Rolls <small>看完整旅程</small></span>
            <span><b>03</b> Me <small>看长期回顾</small></span>
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <section className="case-section" id={`section-${section.number}`} key={section.number}>
          <div className="section-heading">
            <div className="section-kicker"><span>{section.number}</span><span>{section.label}</span></div>
            <div className="section-copy"><h2>{section.title}</h2><p>{section.description}</p></div>
          </div>
          <div className="shot-grid" aria-label={`${section.title}的四个截图窗口`}>
            {section.shots.map((shot) => <ScreenshotWindow shot={shot} key={shot.index} />)}
          </div>
        </section>
      ))}

      <footer>
        <p>TRAVELFILM · PRODUCT DESIGN &amp; INDEPENDENT BUILD</p>
        <p>8 SCREEN STATES · READY FOR SCREENSHOT FILL-IN</p>
      </footer>
    </main>
  );
}
