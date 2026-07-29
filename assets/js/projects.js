/**
 * Featured Projects Data (Enhanced Version)
 * NEXIS Labs Webサイトの実績カードを管理するデータファイル
 * 
 * 各実績に「制作目的」「担当範囲」「概要」などの営業訴求データを日本語メインで定義しています。
 */

// ベースドメイン設定（本番公開時に書き換えるだけで一括反映可能）
const BASE_VERCEL_DOMAIN = "https://nexis-labs-demos.vercel.app";
const BASE_GITHUB_ORGANIZATION = "https://github.com/nexis-labs";

const PROJECTS_DATA = [
  {
    id: "nexis-labs",
    title: "NEXIS Labs<br class=\"sp-only\" />公式サイト",
    badge: "Design Demo",
    badgeClass: "demo",
    description: "NEXIS Labs自身の公式サイト。最先端フロントエンド技術の証明として、滑らかな3D演出と一瞬で完了するロード画面、ライト・ダークのハイブリッド設計を実装。",
    purpose: "当エージェンシーの技術力とデザイン品質を実証し、信頼性の高い新規お問い合わせを獲得する。",
    scope: "要件定義 / UI・UXデザイン / WebGL開発 / フロントエンド実装 / パフォーマンス最適化",
    technologies: ["Vanilla JS", "Three.js", "GSAP", "CSS3"],
    liveUrl: `${BASE_VERCEL_DOMAIN}/nexis-labs`,
    githubUrl: `${BASE_GITHUB_ORGANIZATION}/nexis-labs-official`,
    image: "assets/images/project_nexis_labs.png"
  },
  {
    id: "astranova",
    title: "ASTRANOVA<br class=\"sp-only\" />公式ポータル",
    badge: "Live Project",
    badgeClass: "live",
    description: "近未来・宇宙をテーマにしたeSportsチーム「ASTRANOVA」の公式ファンサイト。世界観を反映したダークネオンなデザインと、ファンを熱狂させる動的な戦績表示を実装。",
    purpose: "スポンサー獲得に向けたアピール力の強化、および所属選手とライブ配信のリアルタイム連携によるファン獲得。",
    scope: "eSportsチームブランディング / 3Dビジュアルディレクション / フロントエンド実装 / バックエンド連携",
    technologies: ["Next.js", "WebGL", "GSAP ScrollTrigger", "Tailwind CSS"],
    liveUrl: "https://astranova-esports.vercel.app",
    githubUrl: `${BASE_GITHUB_ORGANIZATION}/astranova-portal`,
    image: "assets/images/project_astranova.png"
  },
  {
    id: "bluewave-systems",
    title: "BlueWave Systems<br class=\"sp-only\" />サービスサイト",
    badge: "Design Demo",
    badgeClass: "demo",
    description: "SaaSスタートアップ企業向けのハイスピード製品紹介サイト。Stripe風の美しく滑らかな料金シミュレーターや、視線を誘導する高精度なグラデーション演出を実装。",
    purpose: "新規サービスの信頼性を高め、リリース初期段階でのユーザー登録（コンバージョン）率を最大化する。",
    scope: "ロゴマーク設計 / UI・UX設計 / インタラクティブUI開発 / 高速ランディングページ構築",
    technologies: ["Vanilla JS", "CSS Grid", "Canvas API", "Vite"],
    liveUrl: `${BASE_VERCEL_DOMAIN}/bluewave-systems`,
    githubUrl: `${BASE_GITHUB_ORGANIZATION}/bluewave-systems`,
    image: "assets/images/project_bluewave.png"
  },
  {
    id: "cafe-lp",
    title: "Cafe KOTOHOGI<br class=\"sp-only\" />特設LP",
    badge: "Design Demo",
    badgeClass: "demo",
    description: "高級自家焙煎ロースタリーのブランドサイト。Apple風の大きな余白を活かしたミニマルデザインで、厳選されたコーヒー豆のストーリーテリングを演出。",
    purpose: "店舗のプレミアムなイメージ価値をオンラインで浸透させ、お取り寄せ通販（EC）への流入を促す。",
    scope: "ブランドコンセプト設計 / ビジュアルディレクション / 製品紹介ページ設計・開発",
    technologies: ["HTML5", "CSS Custom Properties", "GSAP", "Vanilla JS"],
    liveUrl: `${BASE_VERCEL_DOMAIN}/cafe-kotohogi`,
    githubUrl: `${BASE_GITHUB_ORGANIZATION}/cafe-kotohogi-lp`,
    image: "assets/images/project_cafe_lp.png"
  },
  {
    id: "corporate-demo",
    title: "NexTech<br class=\"sp-only\" />コーポレートサイト",
    badge: "Design Demo",
    badgeClass: "demo",
    description: "次世代AIテクノロジー企業の公式ウェブサイト。Lighthouse評価でオール満点基準を満たす、極めて優れた表示速度、完璧なSEO、アクセシビリティ対応を徹底。",
    purpose: "ステークホルダーおよび大企業クライアントに対する技術的な信頼性の獲得と、採用応募エントリーの促進。",
    scope: "情報アーキテクチャ設計 / 企業ブランディングデザイン / アクセシビリティ・SEO徹底最適化",
    technologies: ["Vanilla JS", "CSS Grid", "Security Headers Tuning"],
    liveUrl: `${BASE_VERCEL_DOMAIN}/nextech-corporate`,
    githubUrl: `${BASE_GITHUB_ORGANIZATION}/nextech-corporate`,
    image: "assets/images/project_corporate_demo.png"
  },
  {
    id: "construction-demo",
    title: "SATO<br class=\"sp-only\" />建築設計事務所",
    badge: "Design Demo",
    badgeClass: "demo",
    description: "和モダンと先進的デザインを融合させた建築設計事務所の実績ギャラリーサイト。施工例をダイナミックかつ軽量に映し出すフル画面ビューアを搭載。",
    purpose: "建築写真のクオリティを最前面に押し出し、細部にこだわる見込み顧客からの注文設計の問い合わせを獲得する。",
    scope: "グリッドレイアウト設計 / ポートフォリオUI構築 / 問い合わせ導線・フォーム設計",
    technologies: ["Vanilla JS", "CSS Grid", "GSAP ScrollTrigger"],
    liveUrl: `${BASE_VERCEL_DOMAIN}/sato-construction`,
    githubUrl: `${BASE_GITHUB_ORGANIZATION}/sato-construction`,
    image: "assets/images/project_construction.png"
  }
];

// 外部ファイルからグローバルにアクセス可能にする
window.PROJECTS_DATA = PROJECTS_DATA;
