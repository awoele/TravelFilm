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
    label: "FROM PLACE TO MOMENT",
    title: "从足迹进入一卷旅程",
    description:
      "先在地图上找到地点，再沿着胶卷、旅程详情与单张照片，逐层回到旅行里的具体瞬间。",
    shots: [
      {
        index: "01",
        meta: "FOOTPRINTS · MAP",
        title: "从地图找到旅行足迹",
        description: "在地图上查看地点分布，选中城市后，底部展开该地点的照片。",
        image: publicAsset("/screens/01-footprints-map-20261012.jpg"),
        alt: "TravelFilm My Footprints 地图与选中城市的照片",
      },
      {
        index: "02",
        meta: "MY ROLLS",
        title: "按旅程浏览照片胶卷",
        description: "用日期、地点、照片序列与天数区分每卷旅程，找到想回看的那一次出发。",
        image: publicAsset("/screens/02-rolls-20261012.jpg"),
        alt: "TravelFilm My Rolls 胶卷列表与旅程摘要",
      },
      {
        index: "03",
        meta: "ROLL DETAIL",
        title: "展开一段完整旅程",
        description: "从封面进入日期、地点与照片集合，也可以在这段旅程里添加自己的记忆。",
        image: publicAsset("/screens/03-roll-detail-20261012.jpg"),
        alt: "TravelFilm 旅行详情，展示封面、日期、地点、笔记入口与照片集合",
      },
      {
        index: "04",
        meta: "PHOTO VIEWER",
        title: "回到某一个瞬间",
        description: "全屏查看单张照片，前后切换浏览，并可将当前照片设为胶卷封面。",
        image: publicAsset("/screens/04-photo-viewer-20261012.png"),
        alt: "TravelFilm 单张照片浏览，含照片序号、切换按钮与 Set cover 操作",
      },
    ],
  },
  {
    number: "02",
    label: "FROM MEMORY TO REVIEW",
    title: "让记忆有更多回看的方式",
    description:
      "用城市卡片与票根重访地点，在个人总览里看见旅行节奏，最后把里程排成一张分享卡片。",
    shots: [
      {
        index: "05",
        meta: "CITY MEMORIES",
        title: "换一种方式回看城市",
        description: "城市照片以叠放卡片展开，Storyline 与 Lucky Draw 提供两种回看入口。",
        image: publicAsset("/screens/05-city-memories-20261012.png"),
        alt: "TravelFilm 集宁区城市回忆，包含照片卡片、Storyline 与 Lucky Draw",
      },
      {
        index: "06",
        meta: "MY TICKETS",
        title: "把地点记忆收进票根",
        description: "用票根样式展示照片与地点信息，在 All、城市和收藏之间切换查看。",
        image: publicAsset("/screens/06-tickets-20261012.png"),
        alt: "TravelFilm My Tickets 票根集合与 All、城市、收藏筛选",
      },
      {
        index: "07",
        meta: "ME · ALL",
        title: "看见旅行的长期节奏",
        description: "汇总里程、地点、天数与胶卷，并展示最长旅程、最远到达和月份节奏。",
        image: publicAsset("/screens/07-travel-films-20261012.png"),
        alt: "TravelFilm My Travel Films 个人总览，包含里程统计与旅行节奏",
      },
      {
        index: "08",
        meta: "TRAVEL MOTION · KM",
        title: "把旅行里程排成一张卡",
        description: "从 KM 统计进入 Travel motion，选择封面，将里程、旅程数与天数排成分享卡片。",
        image: publicAsset("/screens/08-travel-motion-20261012.jpg"),
        alt: "TravelFilm Travel motion 里程卡片页面，包含封面选择与 Generate card 按钮",
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
