/* 버전 정보는 이 파일 하나에서 관리합니다.
   - VERSION: 모든 페이지 우상단 버튼에 표시되는 숫자 (변경이 생길 때마다 올림)
   - LOG: 페이지별 업데이트 내역 (실제로 바뀐 페이지에만 줄 추가, 최신이 맨 위) */
(function () {
  var VERSION = 'v10.08';

  var LOG = {
    index: [
      ['v10.08', '모바일 화면 최적화, 웹 앱 설치 지원'],
      ['v10.07', '블룸버그 테마, Drive 자동 백업'],
      ['v08.07', '초기 출시']
    ],
    follow: [
      ['v10.07', 'apps-suhong 런처 분리'],
      ['v08.07q', '뒤로가기 팝업']
    ],
    asset: [
      ['v10.07', '기본값 평가 모드, 런처 분리'],
      ['v08.07', '초기 출시']
    ],
    soxl: [
      ['v10.07', '그래프 nice 단위, 표 접기, 런처 분리'],
      ['v08.07', '초기 출시']
    ],
    wedding: [
      ['v10.08', '모바일 화면 최적화, 제목 가림 수정'],
      ['v10.07', '런처 분리'],
      ['v08.07', '초기 출시']
    ]
  };

  var page = (document.currentScript && document.currentScript.getAttribute('data-page')) || 'index';

  function apply() {
    var popup = document.getElementById('versionPopup') || document.getElementById('verPopup');
    if (!popup) return;
    if (!popup.style.display) popup.style.display = 'none'; // 첫 탭에 바로 열리도록
    var btn = popup.parentNode.querySelector('button');
    if (btn) btn.textContent = VERSION;

    var rows = LOG[page] || [];
    while (popup.children.length > 1) popup.removeChild(popup.lastElementChild); // 제목만 남김
    rows.forEach(function (r, i) {
      var d = document.createElement('div');
      d.style.cssText = "font:10px/1.9 'IBM Plex Mono',monospace;white-space:nowrap;" + (i ? 'opacity:.55;' : '');
      var b = document.createElement('b');
      b.textContent = r[0];
      if (!i) b.style.color = '#ff6b00';
      d.appendChild(b);
      d.appendChild(document.createTextNode(' · ' + r[1]));
      popup.appendChild(d);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();
