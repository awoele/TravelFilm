type Shot = Readonly<{
  index: string;
  meta: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}>;

type CaseSection = Readonly<{
  number: string;
  label: string;
  title: string;
  description: string;
  shots: readonly Shot[];
}>;

type HeroPhoto = Readonly<{
  slot: string;
  image: string;
  alt: string;
  objectPosition: string;
}>;

const assetBase = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const publicAsset = (path: string) => `${assetBase}${path}`;

const heroPhotoSlots: readonly HeroPhoto[] = [
  {
    slot: "01",
    image: publicAsset("/hero-memory/01-center-red-cap.jpg"),
    alt: "戴红色棒球帽站在草原上的旅行肖像",
    objectPosition: "50% 46%",
  },
  {
    slot: "02",
    image: publicAsset("/hero-memory/04-portrait-sheep.jpg"),
    alt: "羊群与草地前的旅行肖像",
    objectPosition: "64% 52%",
  },
  {
    slot: "03",
    image: publicAsset("/hero-memory/06-standing-sheep.jpg"),
    alt: "羊群旁的全身旅行肖像",
    objectPosition: "50% 38%",
  },
  {
    slot: "04",
    image: publicAsset("/hero-memory/05-camera-grassland.jpg"),
    alt: "在草原上手持相机记录旅程",
    objectPosition: "70% 50%",
  },
  {
    slot: "05",
    image: publicAsset("/hero-memory/02-profile-sunflowers.jpg"),
    alt: "向日葵草原前的侧脸旅行肖像",
    objectPosition: "72% 54%",
  },
  {
    slot: "06",
    image: publicAsset("/hero-memory/03-landscape-red-cap.jpg"),
    alt: "戴红帽站在辽阔草原与山丘之间",
    objectPosition: "50% 58%",
  },
] as const;

const sections: readonly CaseSection[] = [
  {
    number: "01",
    label: "FROM PLACE TO ROLL",
    title: "从足迹进入一卷旅程",
    description:
      "Footprints 负责地点与照片，Rolls 负责一次完整旅程。两个入口各自清晰，又能自然衔接。",
    shots: [
      {
        index: "01",
        meta: "FOOTPRINTS · ALL",
        title: "先看去过的地方",
        description: "用城市照片卡和最近旅行卷，把地点与旅程放在同一入口里。",
        image: publicAsset("/screens/01-footprints-overview.jpg"),
        alt: "TravelFilm Footprints 总览，包含城市卡与最近旅行卷",
      },
      {
        index: "02",
        meta: "CITY CAROUSEL",
        title: "在城市之间连续浏览",
        description: "中心城市成为视觉主角，相邻地点从两侧露出，提示继续探索。",
        image: publicAsset("/screens/02-footprints-focus.jpg"),
        alt: "TravelFilm 城市照片卡横向轮播",
      },
      {
        index: "03",
        meta: "MY ROLLS",
        title: "把旅行整理成一卷胶片",
        description: "按旅程聚合照片、视频、地点与天数，形成可快速浏览的档案。",
        image: publicAsset("/screens/03-rolls.jpg"),
        alt: "TravelFilm My Rolls 旅行胶卷列表",
      },
      {
        index: "04",
        meta: "ROLL DETAIL",
        title: "回到一次完整旅程",
        description: "封面、日期、地点与照片序列共同还原一段真实出发。",
        image: publicAsset("/screens/04-roll-detail.jpg"),
        alt: "TravelFilm Roll Detail 旅行详情",
      },
    ],
  },
  {
    number: "02",
    label: "FROM MOMENT TO SHARE",
    title: "从一张照片，到回顾与分享",
    description:
      "既能回到单个瞬间，也能看见长期节奏；最终把日期、照片与旅程信息排成一张可分享的回顾。",
    shots: [
      {
        index: "05",
        meta: "PHOTO VIEWER",
        title: "单张照片仍是最后落点",
        description: "保留沉浸式浏览与前后切换，同时支持把当前照片设为封面。",
        image: publicAsset("/screens/05-photo-viewer.jpg"),
        alt: "TravelFilm 全屏照片浏览与设置封面",
      },
      {
        index: "06",
        meta: "ME · ALL",
        title: "把所有旅程放在一起看",
        description: "在 All 总览里汇总地点、天数、胶卷、里程与旅行节奏。",
        image: publicAsset("/screens/06-travel-films.jpg"),
        alt: "TravelFilm My Travel Films 全部旅程总览",
      },
      {
        index: "07",
        meta: "CITY MEMORIES",
        title: "一屏展开城市照片",
        description: "六张照片以不规则卡片叠放，Latest 与 Earlier 保留时间层次。",
        image: publicAsset("/screens/07-city-memories-a.png"),
        alt: "TravelFilm 城市照片不规则卡片集合",
      },
      {
        index: "08",
        meta: "SHARE POSTER",
        title: "把一卷旅程变成海报",
        description: "重新排版日期、照片与旅程统计，生成可以直接分享的旅行回顾。",
        image: publicAsset("/screens/08-share-poster.jpg"),
        alt: "TravelFilm 旅行胶卷分享海报",
      },
    ],
  },
];

function ScreenshotWindow({ shot }: Readonly<{ shot: Shot }>) {
  return (
    <article className="shot-card">
      <div className="shot-topline">
        <span>{shot.index}</span>
        <span>{shot.meta}</span>
      </div>
      <div className="phone-window">
        <div className="phone-screen">
          <img
            className="shot-image"
            src={shot.image}
            alt={shot.alt}
            width="1280"
            height="2774"
            loading={shot.index === "01" ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      </div>
      <div className="shot-copy">
        <h3>{shot.title}</h3>
        <p>{shot.description}</p>
      </div>
    </article>
  );
}

function HeroPhotoCollage() {
  return (
    <figure className="hero-memory-collage">
      <div className="hero-memory-meta" aria-hidden="true">
        <span>CHAHAR · AUG 2026</span>
        <span>ROLL 08 · 6 FRAMES</span>
      </div>
      <div className="hero-photo-stage" aria-label="察哈尔右翼后旗的六张旅行照片">
        {heroPhotoSlots.map((photo, index) => (
          <div
            className={`hero-photo-slot hero-photo-slot-${index + 1}`}
            key={photo.slot}
          >
            <img
              className="hero-photo-image"
              src={photo.image}
              alt={photo.alt}
              width="1200"
              height="1800"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              style={{ objectPosition: photo.objectPosition }}
            />
          </div>
        ))}
      </div>
      <figcaption>察哈尔右翼后旗 · 旅途中的六帧记忆</figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <main id="top">
      <div className="hero-page">
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="返回页面顶部">
            YXY <span>/ PRODUCT CASE</span>
          </a>
          <div className="app-mark">
            <i aria-hidden="true" /> TRAVELFILM <span>IPHONE APP</span>
          </div>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">LOCAL-FIRST TRAVEL MEMORY · MOBILE PRODUCT CASE</p>
            <h1 id="hero-title">把旅行，变成可以回去的地方。</h1>
            <div className="hero-bottom">
              <p>一款本地优先的 iPhone 旅行相册，用地点、旅程与长期回顾，重新整理旅途记忆。</p>
              <div className="product-logic" aria-label="TravelFilm 产品结构">
                <span><b>01</b><strong>Footprints</strong><small>看地点与照片</small></span>
                <span><b>02</b><strong>Rolls</strong><small>看完整旅程</small></span>
                <span><b>03</b><strong>Me</strong><small>看长期回顾</small></span>
              </div>
            </div>
          </div>
          <HeroPhotoCollage />
        </section>
      </div>

      {sections.map((section) => (
        <section className="case-section" id={`section-${section.number}`} key={section.number}>
          <div className="section-heading">
            <div className="section-kicker"><span>{section.number}</span><span>{section.label}</span></div>
            <div className="section-copy"><h2>{section.title}</h2><p>{section.description}</p></div>
          </div>
          <div className="shot-grid" aria-label={`${section.title}的四个界面`}>
            {section.shots.map((shot) => <ScreenshotWindow shot={shot} key={shot.index} />)}
          </div>
        </section>
      ))}

      <footer>
        <p>TRAVELFILM · PRODUCT DESIGN &amp; INDEPENDENT BUILD</p>
        <p>8 REAL PRODUCT STATES · 2026</p>
      </footer>
    </main>
  );
}
