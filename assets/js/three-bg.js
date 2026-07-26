/**
 * Three.js Interactive Background
 * 
 * 黒・濃いグレーの背景に、シアン・ブルー・パープルの柔らかなパーティクルが漂う
 * 近未来的かつ高級感あふれるインタラクティブ背景を生成します。
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#three-canvas');
  if (!canvas) return;

  // シーン・カメラ・レンダラーの設定
  const scene = new THREE.Scene();
  
  // カメラ（視野角、アスペクト比、クリッピング手前、奥）
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // 背景を透明にし、CSSグラデーションとブレンドする
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // パーティクルの作成
  const particlesCount = 250;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  // テーマの検出 (デフォルトはダーク)
  const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';

  // アクセントカラーの定義
  const themeColors = isLightTheme ? [
    new THREE.Color('#0891b2'), // Cyan (Darker)
    new THREE.Color('#1d4ed8'), // Blue (Darker)
    new THREE.Color('#7c3aed')  // Purple (Darker)
  ] : [
    new THREE.Color('#06b6d4'), // Cyan
    new THREE.Color('#2563eb'), // Blue
    new THREE.Color('#8b5cf6')  // Purple
  ];


  for (let i = 0; i < particlesCount; i++) {
    // 位置：画面全体に立体的に散りばめる
    positions[i * 3] = (Math.random() - 0.5) * 12;     // X
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12; // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z

    // 色：テーマカラーからランダムに選択
    const chosenColor = themeColors[Math.floor(Math.random() * themeColors.length)];
    colors[i * 3] = chosenColor.r;
    colors[i * 3 + 1] = chosenColor.g;
    colors[i * 3 + 2] = chosenColor.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // 丸いパーティクルを描画するためのCanvasテクスチャ生成
  const createCircleTexture = () => {
    const matCanvas = document.createElement('canvas');
    matCanvas.width = 16;
    matCanvas.height = 16;
    const matContext = matCanvas.getContext('2d');
    
    // 円形のグラデーション（中心から外に向けてフェードアウト）
    const gradient = matContext.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    matContext.fillStyle = gradient;
    matContext.fillRect(0, 0, 16, 16);
    
    return new THREE.CanvasTexture(matCanvas);
  };

  // パーティクルのマテリアル設定
  const material = new THREE.PointsMaterial({
    size: isLightTheme ? 0.16 : 0.12,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: isLightTheme ? 0.45 : 0.6,
    map: createCircleTexture(),
    depthWrite: false,
    blending: isLightTheme ? THREE.NormalBlending : THREE.AdditiveBlending // ライトテーマではNormalBlending
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // マウスインタラクション
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (event) => {
    // 画面中心を0とした座標 (-0.5 〜 0.5)
    targetX = (event.clientX / window.innerWidth) - 0.5;
    targetY = (event.clientY / window.innerHeight) - 0.5;
  });

  // リサイズ対応
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // アニメーションループ
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // パーティクル全体のゆっくりとした浮遊・回転運動
    particleSystem.rotation.y = elapsedTime * 0.03;
    particleSystem.rotation.x = elapsedTime * 0.015;

    // マウスの動きに滑らかな慣性（イージング）をつけて追従
    mouseX += (targetX - mouseX) * 0.05;
    mouseY += (targetY - mouseY) * 0.05;

    // カメラ位置をマウスに合わせて微調整
    camera.position.x = mouseX * 2.5;
    camera.position.y = -mouseY * 2.5;
    camera.lookAt(scene.position);

    // レンダリング
    renderer.render(scene, camera);

    // 次のフレームへ
    window.requestAnimationFrame(tick);
  };

  tick();
});
