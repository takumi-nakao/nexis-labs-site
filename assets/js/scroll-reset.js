/**
 * NEXIS Labs - Immediate Scroll Reset (CSP Compliant)
 * 
 * HTMLパースの最速フェーズでブラウザのスクロール位置自動復元を無効化し、
 * リロード時に必ず最上部（TOP）から表示されるように制御します。
 * セキュリティ（Content Security Policy: CSP）に準拠するため、外部ファイル化しています。
 */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
