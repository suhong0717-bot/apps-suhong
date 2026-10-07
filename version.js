/* 버전 정보는 이 파일 하나에서 관리합니다.
   - VERSION: 모든 페이지 우상단 버튼에 표시되는 숫자 (변경이 생길 때마다 올림)
   - LOG: 페이지별 업데이트 내역 (실제로 바뀐 페이지에만 줄 추가, 최신이 맨 위) */
(function () {
  var VERSION = 'v10.15';

  var LOG = {
    index: [
      ['v10.11', '뒤로 버튼으로 앱 종료, 백업 상태 위치 이동'],
      ['v10.09', '맨 아래 개발 정보 추가'],
      ['v10.08', '모바일 화면 최적화, 웹 앱 설치 지원'],
      ['v10.07', '블룸버그 테마, Drive 자동 백업'],
      ['v08.07', '초기 출시']
    ],
    follow: [
      ['v10.12', '거래 입력 배치 정리, 화면 폭 대응'],
      ['v10.11', '메모·상단 종목 수 제거'],
      ['v10.09', '상단바 포맷 통일'],
      ['v10.07', 'apps-suhong 런처 분리'],
      ['v08.07q', '뒤로가기 팝업']
    ],
    asset: [
      ['v10.13', '상단 중복 제목·날짜 제거'],
      ['v10.10', '상단바 가운데 제목 추가'],
      ['v10.07', '기본값 평가 모드, 런처 분리'],
      ['v08.07', '초기 출시']
    ],
    soxl: [
      ['v10.15', 'A계좌 7/23~10/6 실제 매매 42건 반영'],
      ['v10.14', '7/23~10/6 기록 일괄 복구 (B계좌 매매 포함)'],
      ['v10.09', '상단바 포맷 통일'],
      ['v10.07', '그래프 nice 단위, 표 접기, 런처 분리'],
      ['v08.07', '초기 출시']
    ],
    wedding: [
      ['v10.11', '검은 바탕으로 통일'],
      ['v10.10', '상단바 가운데 제목 추가'],
      ['v10.09', '상단바 포맷 통일'],
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

    var rows = (LOG[page] || []).slice(0, 3); // 최근 3개까지만 표시
    while (popup.children.length > 1) popup.removeChild(popup.lastElementChild); // 제목만 남김
    var bare = parseFloat(getComputedStyle(popup).paddingLeft) === 0; // 안쪽 여백 없는 팝업 보정
    if (bare) popup.style.paddingBottom = '8px';
    rows.forEach(function (r, i) {
      var d = document.createElement('div');
      d.style.cssText = "font:10px/1.9 'IBM Plex Mono',monospace;white-space:nowrap;" + (i ? 'opacity:.55;' : '');
      var b = document.createElement('b');
      b.textContent = r[0];
      if (!i) b.style.color = '#ff6b00';
      d.appendChild(b);
      d.appendChild(document.createTextNode(' · ' + r[1]));
      if (bare) d.style.padding = '0 12px';
      popup.appendChild(d);
    });
  }

  /* '← AI Tool 모음' 버튼: 첫 페이지에서 들어온 경우 새로 이동하지 않고 '되돌아가기'로 처리.
     → 첫 페이지에서 휴대폰 '뒤로'를 누르면 방금 본 앱으로 가지 않고 바로 종료됨. */
  function fixBack() {
    var links = document.querySelectorAll('a[href="index.html"]');
    Array.prototype.forEach.call(links, function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var ref = '';
        try { ref = new URL(document.referrer).pathname; } catch (err) {}
        var fromLauncher = /\/apps-suhong\/(index\.html)?$/.test(ref);
        if (fromLauncher && window.history.length > 1) window.history.back();
        else window.location.replace('index.html');
      });
    });
  }

  function init() { apply(); fixBack(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
