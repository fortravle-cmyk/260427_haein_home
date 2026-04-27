# 🏗️ Implementation & Modification Process

> **프로젝트**: Haein Yun 개인 홈페이지  
> **작업일**: 2026-04-27  
> **경로**: `260427_haein_home/`  
> **기술스택**: HTML5, CSS3 (Vanilla), JavaScript (ES6+), Google Fonts

---

## 📋 목차

1. [Phase 1: 초기 구축](#phase-1-초기-구축)
2. [Phase 2: 따뜻한 톤 컬러 변경](#phase-2-따뜻한-톤-컬러-변경)
3. [Phase 3: 순환 텍스트 애니메이션 추가](#phase-3-순환-텍스트-애니메이션-추가)
4. [파일 구조](#파일-구조)
5. [디자인 시스템](#디자인-시스템)
6. [상세 코드 설명](#상세-코드-설명)

---

## Phase 1: 초기 구축

### 1.1 요구사항 분석

**사용자 요청**: 건축도시시스템공학전공 대학원생 느낌의 개인 웹페이지 제작

**입력 정보**:
- 이름: 윤해인 (Haein Yun)
- 소속: 이화여자대학교 건축도시시스템공학과 석사과정 (2026.03 ~)
- 연구실: 건설관리연구실(CML), 지도교수 이준성
- 연구 분야: LLM 기반 계약 리스크 분석, 건설 자동화
- 프로젝트: Routine Master, FIDIC Silver Book Study, LLM & RPA Automation
- 목표: I3CE 2026 Poster, 건축기사, 건설안전기사

**원본 HTML**: 사용자가 제공한 단순한 단일 HTML 파일 (인라인 CSS, 라이트 테마)

### 1.2 디자인 방향 결정

기존 단순 HTML 대비 대폭 업그레이드된 디자인 방향:

| 항목 | 기존 | 변경 |
|------|------|------|
| 레이아웃 | 단일 컬럼, max-width 900px | 풀스크린 섹션, max-width 1100px |
| 테마 | 라이트 (#fff 배경) | 다크 모드 (딥 네이비 #0a0e17) |
| 타이포그래피 | Pretendard 시스템 폰트 | Inter + Noto Sans KR + JetBrains Mono (Google Fonts) |
| 애니메이션 | hover 시 translateY 정도 | Canvas 배경 + Scroll Reveal + Spring 애니메이션 |
| 네비게이션 | 없음 | Fixed navbar (스크롤 시 blur 배경) |
| 인터랙션 | 기본 hover | 마우스 반응형 도트 그리드, 카드 호버, 스크롤 리빌 |

### 1.3 생성된 파일

#### `index.html` — 메인 HTML 구조

**섹션 구성** (총 6개 영역):

```
┌─────────────────────────────────┐
│  Navbar (Fixed)                 │  — 로고 HY. + 4개 네비게이션 링크
├─────────────────────────────────┤
│  Hero Section                   │  — 풀스크린, Canvas 배경
│  ├ Badge: Construction Mgmt Lab │
│  ├ 이름: Haein Yun / 윤해인     │
│  ├ Subtitle                     │
│  ├ 연구 소개 텍스트              │
│  ├ 3개 태그 (위치/역할/분야)     │
│  └ Scroll Indicator             │
├─────────────────────────────────┤
│  01 About Me                    │  — 2컬럼 그리드 (소개문 + 정보카드 4개)
├─────────────────────────────────┤
│  02 Education                   │  — 타임라인 UI (재학중 뱃지)
├─────────────────────────────────┤
│  03 Research & Projects         │  — 3열 카드 그리드
│  ├ FIDIC Silver Book (Contract) │
│  ├ LLM & RPA (AI Research)      │
│  └ Routine Master (Development) │
├─────────────────────────────────┤
│  04 Upcoming Milestones         │  — 리스트 카드 (3개 목표)
├─────────────────────────────────┤
│  Footer                         │  — 브랜드 + 링크 + 카피라이트
└─────────────────────────────────┘
```

**HTML 설계 결정사항**:
- 시맨틱 태그 사용: `<nav>`, `<section>`, `<article>`, `<footer>`
- SVG 아이콘 인라인 삽입 (외부 라이브러리 의존 제거)
- `data-text` 속성으로 네비게이션 접근성 확보
- 각 섹션 `id`를 통한 앵커 네비게이션
- `aria-label`로 접근성 보강 (nav toggle, scroll indicator)

#### `style.css` — 스타일시트 (초기 쿨톤 버전)

**CSS 변수 시스템 (초기)**:
```css
:root {
    --bg-primary: #0a0e17;       /* 딥 네이비 */
    --bg-secondary: #111827;     /* 세컨더리 배경 */
    --accent: #60a5fa;           /* 블루 액센트 */
    --accent-2: #a78bfa;         /* 보라 보조 */
    --accent-3: #34d399;         /* 민트 보조 */
    --text-primary: #f1f5f9;     /* 밝은 텍스트 */
    --text-secondary: #94a3b8;   /* 보조 텍스트 */
    --text-muted: #64748b;       /* 흐린 텍스트 */
}
```

**주요 CSS 기법**:

1. **Glassmorphism Navbar**:
   ```css
   .navbar.scrolled {
       background: rgba(10, 14, 23, 0.85);
       backdrop-filter: blur(20px);
   }
   ```

2. **CSS Custom Properties를 이용한 애니메이션 딜레이**:
   ```css
   .title-word {
       animation-delay: calc(var(--delay) * 0.15s + 0.3s);
   }
   ```

3. **Reveal-on-Scroll 패턴**:
   ```css
   .reveal-up {
       opacity: 0; transform: translateY(32px);
       transition: all 0.8s var(--ease-out);
       transition-delay: var(--delay, 0s);
   }
   .reveal-up.revealed { opacity: 1; transform: translateY(0); }
   ```

4. **반응형 디자인** (`@media max-width: 768px`):
   - 네비게이션: 햄버거 메뉴로 전환
   - About 그리드: 1컬럼으로 변경
   - Research 카드: 1컬럼 스택
   - 섹션 패딩 축소 (120px → 80px)

#### `script.js` — 인터랙션 & 애니메이션

**기능 4가지**:

1. **Blueprint Grid Canvas** (lines 1-42):
   - `<canvas>` 요소에 도트 그리드 패턴 렌더링
   - 40px 간격의 도트 배열 생성
   - `mousemove` 이벤트로 마우스 근처 도트 크기/밝기 증가 (반경 200px)
   - `requestAnimationFrame`으로 60fps 렌더링
   - 윈도우 리사이즈 시 자동 재초기화

2. **Navbar Scroll Effect** (line 44-48):
   - `window.scrollY > 50` 시 `.scrolled` 클래스 토글
   - backdrop-filter 블러 배경 활성화

3. **Scroll Reveal** (lines 58-68):
   - `IntersectionObserver` API 사용
   - threshold: 0.15, rootMargin: -40px
   - 한 번 노출되면 `unobserve`로 성능 최적화

4. **Active Nav Highlight** (lines 70-81):
   - 각 섹션의 가시성을 IntersectionObserver로 감지
   - 현재 보이는 섹션에 해당하는 네비게이션 링크 활성화

---

## Phase 2: 따뜻한 톤 컬러 변경

### 2.1 요구사항

**사용자 요청**: "색을 전체적으로 따뜻한 톤으로 변경해줄 수 있어?"

### 2.2 변경 범위 분석

변경이 필요한 모든 위치를 식별:

1. **CSS 변수** (`:root` 블록) — 17개 변수
2. **하드코딩된 rgba 값** — navbar, badge, timeline, tags, milestones 등 11곳
3. **JS Canvas 도트 색상** — `fillStyle` rgba 값 1곳

### 2.3 컬러 팔레트 변환 상세

| 변수명 | Before (쿨톤) | After (웜톤) | 변경 이유 |
|--------|--------------|-------------|-----------|
| `--bg-primary` | `#0a0e17` (딥 네이비) | `#1a1410` (다크 브라운) | 배경을 따뜻한 어두운 톤으로 |
| `--bg-secondary` | `#111827` (네이비) | `#1f1914` (브라운) | 대체 배경 섹션 |
| `--bg-card` | `rgba(17,24,39,0.7)` | `rgba(31,25,20,0.7)` | 카드 배경 |
| `--bg-card-hover` | `rgba(30,41,59,0.8)` | `rgba(45,36,28,0.8)` | 카드 호버 |
| `--surface` | `rgba(255,255,255,0.03)` | `rgba(255,245,235,0.04)` | 미세한 웜 틴트 |
| `--border` | `rgba(255,255,255,0.06)` | `rgba(255,220,180,0.08)` | 테두리에 앰버 틴트 |
| `--border-hover` | `rgba(255,255,255,0.12)` | `rgba(255,200,150,0.16)` | 호버 테두리 |
| `--text-primary` | `#f1f5f9` (쿨 화이트) | `#faf3eb` (웜 아이보리) | 텍스트 따뜻하게 |
| `--text-secondary` | `#94a3b8` (블루그레이) | `#b8a898` (웜 그레이) | 보조 텍스트 |
| `--text-muted` | `#64748b` (슬레이트) | `#8a7968` (웜 그레이) | 흐린 텍스트 |
| `--accent` | `#60a5fa` (블루) | `#e8a855` (앰버 골드) | **메인 액센트** |
| `--accent-glow` | `rgba(96,165,250,0.15)` | `rgba(232,168,85,0.15)` | 글로우 효과 |
| `--accent-2` | `#a78bfa` (보라) | `#d4836a` (테라코타) | AI Research 태그 등 |
| `--accent-3` | `#34d399` (민트) | `#c4a35a` (올리브 골드) | Development 태그 등 |
| `--gold` | `#fbbf24` (옐로우) | `#e8a855` (앰버) | 통일된 골드 |
| `--navy` | `#1e3a5f` (네이비) | `#5f3e1e` (웜 브라운) | 보조 다크 |

### 2.4 하드코딩된 색상 변경 목록

총 11개 위치의 하드코딩된 rgba/hex 값 변경:

```
style.css:
  L47  navbar.scrolled background    rgba(10,14,23,0.85)    → rgba(26,20,16,0.9)
  L88  hero-badge border             rgba(96,165,250,0.2)   → rgba(232,168,85,0.25)
  L212 timeline-badge background     rgba(52,211,153,0.1)   → rgba(196,163,90,0.15)
  L223 course-tag background         rgba(96,165,250,0.1)   → rgba(232,168,85,0.12)
  L257 tag-contract background       rgba(251,191,36,0.1)   → rgba(232,168,85,0.12)
  L258 tag-ai background             rgba(167,139,250,0.1)  → rgba(212,131,106,0.15)
  L259 tag-dev background            rgba(52,211,153,0.1)   → rgba(196,163,90,0.15)
  L281 milestone-icon background     rgba(96,165,250,0.08)  → rgba(232,168,85,0.08)
  L293 status-upcoming background    rgba(96,165,250,0.1)   → rgba(232,168,85,0.12)
  L294 status-planned background     rgba(251,191,36,0.1)   → rgba(212,131,106,0.15)
  L319 mobile nav-links background   rgba(10,14,23,0.95)    → rgba(26,20,16,0.95)

script.js:
  L36  canvas fillStyle              rgba(96,165,250,...)   → rgba(232,168,85,...)
```

### 2.5 캐시 무효화 처리

브라우저 캐시로 인해 변경 사항이 반영되지 않는 문제 발생.

**해결 방법**: CSS/JS 파일 참조에 쿼리 파라미터 추가
```html
<!-- Before -->
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>

<!-- After -->
<link rel="stylesheet" href="style.css?v=2">
<script src="script.js?v=2"></script>
```

---

## Phase 3: 순환 텍스트 애니메이션 추가

### 3.1 요구사항

**사용자 입력**: React framer-motion 기반 Hero 컴포넌트 코드 제공

**원본 React 코드 핵심 동작**:
- `useState`로 현재 표시 중인 단어 인덱스 관리
- 2초 간격으로 `setTimeout`을 통해 인덱스 순환
- `motion.span`으로 spring 물리 애니메이션 적용
  - 진입: `{ y: 0, opacity: 1 }` (아래에서 위로)
  - 퇴장: `{ y: -150, opacity: 0 }` (위로 사라짐)
  - spring stiffness: 50

### 3.2 바닐라 JS/CSS로의 변환 전략

| React/Framer-motion | Vanilla 구현 |
|---------------------|-------------|
| `useState(0)` | `let currentIndex = 0` |
| `setTimeout` + `useEffect` | `setInterval(callback, 2000)` |
| `motion.span` with spring | CSS `transition` + cubic-bezier 이징 |
| `animate={{ y, opacity }}` | `.active` / `.exit-up` 클래스 토글 |
| `stiffness: 50` (spring) | `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot) |

### 3.3 HTML 변경 (`index.html`)

Hero 섹션의 subtitle과 desc 사이에 순환 텍스트 영역 삽입:

```html
<!-- 추가된 영역 -->
<div class="hero-rotating">
    <span class="hero-rotating-static">I research&nbsp;</span>
    <span class="hero-rotating-wrapper" id="rotatingText">
        <span class="hero-rotating-word active">Contract Risk Analysis</span>
        <span class="hero-rotating-word">LLM Automation</span>
        <span class="hero-rotating-word">Construction Tech</span>
        <span class="hero-rotating-word">Data-driven Management</span>
        <span class="hero-rotating-word">FIDIC Contracts</span>
    </span>
</div>
```

**키워드 선정 근거**:
- `Contract Risk Analysis` — FIDIC 계약 리스크 연구 반영
- `LLM Automation` — LLM 기반 자동화 연구
- `Construction Tech` — 건설 기술 전반
- `Data-driven Management` — 데이터 기반 관리 체계 (About 섹션 연계)
- `FIDIC Contracts` — FIDIC Silver Book 연구

### 3.4 CSS 추가 (`style.css`)

```css
/* 컨테이너 */
.hero-rotating {
    display: flex; align-items: center;
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 700; height: 2.8em;
}

/* 순환 영역 */
.hero-rotating-wrapper {
    position: relative; display: inline-block;
    height: 1.3em; overflow: hidden;
    min-width: 280px;  /* 가장 긴 키워드 수용 */
}

/* 기본 상태: 아래에 숨겨짐 */
.hero-rotating-word {
    position: absolute; left: 0; top: 0;
    opacity: 0; transform: translateY(80px);
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    /* ↑ overshoot 이징: framer-motion spring 모사 */
}

/* 활성 상태: 제자리 표시 */
.hero-rotating-word.active {
    opacity: 1; transform: translateY(0);
}

/* 퇴장 상태: 위로 사라짐 */
.hero-rotating-word.exit-up {
    opacity: 0; transform: translateY(-80px);
    transition: all 0.5s cubic-bezier(0.55, 0, 1, 0.45);
    /* ↑ ease-in 계열: 빠르게 사라짐 */
}
```

**이징 커브 설명**:
- **진입** `cubic-bezier(0.34, 1.56, 0.64, 1)`: y 값이 1.56으로 목표를 초과했다가 돌아오는 spring-like 오버슈트
- **퇴장** `cubic-bezier(0.55, 0, 1, 0.45)`: 빠르게 가속하여 사라지는 ease-in 변형

### 3.5 JavaScript 추가 (`script.js`)

```javascript
const rotatingWrapper = document.getElementById('rotatingText');
if (rotatingWrapper) {
    const words = rotatingWrapper.querySelectorAll('.hero-rotating-word');
    let currentIndex = 0;

    setInterval(() => {
        const current = words[currentIndex];
        // 1) 현재 단어: active 제거 → exit-up (위로 사라짐)
        current.classList.remove('active');
        current.classList.add('exit-up');

        const nextIndex = (currentIndex + 1) % words.length;
        const next = words[nextIndex];

        // 2) 다음 단어: 아래 위치로 리셋
        next.classList.remove('exit-up');
        next.style.transform = 'translateY(80px)';
        next.style.opacity = '0';

        // 3) 강제 리플로우 → active 클래스로 애니메이션 트리거
        void next.offsetWidth;  // reflow trigger
        next.classList.add('active');
        next.style.transform = '';
        next.style.opacity = '';

        // 4) 퇴장 클래스 정리 (500ms 후)
        setTimeout(() => {
            current.classList.remove('exit-up');
        }, 500);

        currentIndex = nextIndex;
    }, 2000);
}
```

**`void next.offsetWidth` 테크닉 설명**:
- CSS 트랜지션이 동작하려면 "이전 스타일"과 "새 스타일" 사이에 브라우저 리플로우가 필요
- `offsetWidth` 읽기는 브라우저에게 레이아웃 재계산을 강제
- 이 없이는 `style.transform = 'translateY(80px)'` → `classList.add('active')` 가 배칭되어 애니메이션이 스킵됨

### 3.6 캐시 버스팅 업데이트

```html
<!-- v=2 → v=3 -->
<link rel="stylesheet" href="style.css?v=3">
<script src="script.js?v=3"></script>
```

---

## 파일 구조

```
260427_haein_home/
├── index.html                              (339 lines, ~16KB)
├── style.css                               (358 lines, ~15KB)
├── script.js                               (116 lines, ~4KB)
├── implementation_and_modification_process.md  ← 현재 파일
└── .raw.data/                              (기존 데이터 폴더)
```

---

## 디자인 시스템

### 현재 최종 컬러 팔레트 (웜톤)

```
Background
  ██ #1a1410  Primary (다크 브라운)
  ██ #1f1914  Secondary (세컨더리)

Accent
  ██ #e8a855  Primary Accent (앰버 골드)
  ██ #d4836a  Secondary Accent (테라코타)
  ██ #c4a35a  Tertiary Accent (올리브 골드)

Text
  ██ #faf3eb  Primary (웜 아이보리)
  ██ #b8a898  Secondary (웜 그레이)
  ██ #8a7968  Muted (톤다운 그레이)
```

### 타이포그래피

| 용도 | 폰트 | 로드 |
|------|------|------|
| 본문/UI (영문) | Inter 300~800 | Google Fonts |
| 본문/UI (한글) | Noto Sans KR 300~700 | Google Fonts |
| 코드/날짜 | JetBrains Mono 400, 500 | Google Fonts |

### 이징 함수

| 이름 | 값 | 용도 |
|------|---|------|
| ease-out (기본) | `cubic-bezier(0.16, 1, 0.3, 1)` | 대부분의 트랜지션 |
| spring-in (진입) | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 순환 텍스트 진입 |
| ease-in (퇴장) | `cubic-bezier(0.55, 0, 1, 0.45)` | 순환 텍스트 퇴장 |

---

## 상세 코드 설명

### Canvas Blueprint Grid 동작 원리

```
1. 초기화: 40px 간격으로 도트 좌표 배열 생성
2. 각 도트에 랜덤 baseAlpha (0.05~0.35) 할당
3. 매 프레임 (requestAnimationFrame):
   a. 전체 캔버스 클리어
   b. 각 도트에 대해:
      - 마우스와의 거리 계산 (유클리드)
      - influence = max(0, 1 - distance/200)
      - alpha = baseAlpha + influence * 0.5
      - size = 1 + influence * 2
      - 해당 위치에 원 그리기
4. 결과: 마우스 주변 200px 반경의 도트가 밝아지고 커짐
```

### IntersectionObserver 설정

```javascript
// Scroll Reveal
{ threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
// → 요소의 15%가 뷰포트 하단 40px 위에 진입하면 트리거

// Active Nav Link  
{ threshold: 0.3 }
// → 섹션의 30%가 보이면 해당 네비게이션 링크 활성화
```

### 반응형 브레이크포인트

```
768px 이하:
  - 네비게이션 → 드롭다운 메뉴 (햄버거 버튼)
  - About 그리드 → 1컬럼
  - Research 카드 → 1컬럼 스택
  - Hero 태그 → 세로 배치
  - Footer → 세로 배치
  - 섹션 패딩: 120px → 80px
  - 좌우 패딩: 32px → 20px
```

---

## 변경 이력 요약

| 시간 | Phase | 작업 내용 |
|------|-------|----------|
| 14:43 | 1 | 초기 구축 — HTML, CSS, JS 3개 파일 생성 |
| 14:53 | 2 | 웜톤 변경 — CSS 변수 17개 + 하드코딩 rgba 12곳 수정 |
| 15:12 | 3 | 순환 텍스트 — React framer-motion → 바닐라 JS/CSS 변환 적용 |
| 15:38 | — | 본 문서 작성 |

---

*이 문서는 2026-04-27 작업 세션의 전체 구현 및 수정 과정을 기록합니다.*
