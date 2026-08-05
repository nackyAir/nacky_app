const routes = [
  {
    code: 'LAW',
    label: '法律',
    cx: 82,
    cy: 82,
    path: 'M 272 230 C 222 156 158 101 82 82',
    maskId: 'route-law',
    revealClassName: 'route-map__reveal',
  },
  {
    code: 'ACC',
    label: '会計',
    cx: 508,
    cy: 76,
    path: 'M 350 224 C 392 148 445 94 508 76',
    maskId: 'route-acc',
    revealClassName: 'route-map__reveal route-map__reveal--2',
  },
  {
    code: 'EST',
    label: '住宅',
    cx: 558,
    cy: 272,
    path: 'M 370 270 C 432 250 500 252 558 272',
    maskId: 'route-est',
    revealClassName: 'route-map__reveal route-map__reveal--3',
  },
  {
    code: 'CAR',
    label: 'キャリア',
    cx: 490,
    cy: 464,
    path: 'M 350 318 C 388 389 437 440 490 464',
    maskId: 'route-car',
    revealClassName: 'route-map__reveal route-map__reveal--4',
  },
  {
    code: 'LIV',
    label: '配信',
    cx: 88,
    cy: 452,
    path: 'M 270 314 C 214 383 154 431 88 452',
    maskId: 'route-liv',
    revealClassName: 'route-map__reveal route-map__reveal--5',
  },
]

export function PlaneGlyph() {
  return <path d="M0-2.2 8.5 0 0 2.2-2.4 8h-2l.8-8-8-2v-2l8 2-.8-8h2Z" />
}

export function RouteMap() {
  return (
    <svg
      viewBox="0 0 640 540"
      role="img"
      aria-labelledby="route-map-title route-map-description"
      className="h-auto w-full overflow-visible text-accent-navy"
    >
      <title id="route-map-title">AI とフルスタック開発の就航路線図</title>
      <desc id="route-map-description">
        AI
        とフルスタック開発を中心に、法律、会計、住宅、キャリア、配信の各業界へつながる図
      </desc>

      <defs>
        {routes.map((route) => (
          <mask
            key={route.maskId}
            id={route.maskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="640"
            height="540"
          >
            <path
              d={route.path}
              pathLength="1"
              className={route.revealClassName}
            />
          </mask>
        ))}
      </defs>

      <g>
        <circle
          cx="320"
          cy="270"
          r="112"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="1 8"
          opacity="0.26"
        />

        {routes.map((route) => (
          <path
            key={route.maskId}
            d={route.path}
            className="route-map__path"
            mask={`url(#${route.maskId})`}
          />
        ))}

        <g transform="translate(418 164) rotate(43)" fill="currentColor">
          <PlaneGlyph />
        </g>

        {routes.map((route) => (
          <g key={route.code} transform={`translate(${route.cx} ${route.cy})`}>
            <circle
              r="34"
              fill="var(--paper)"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle r="3" fill="currentColor" />
            <text
              y="54"
              textAnchor="middle"
              fill="currentColor"
              className="font-mono text-[12px] font-medium tracking-[0.18em]"
            >
              {route.code}
            </text>
            <text
              y="73"
              textAnchor="middle"
              fill="var(--ink-muted)"
              className="font-sans text-[12px]"
            >
              {route.label}
            </text>
          </g>
        ))}

        <g transform="translate(320 270)">
          <circle
            r="65"
            fill="var(--paper)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <g transform="translate(0 -18) scale(.75)" fill="currentColor">
            <PlaneGlyph />
          </g>
          <text
            y="15"
            textAnchor="middle"
            fill="currentColor"
            className="font-mono text-[11px] font-medium tracking-[0.11em]"
          >
            AI × FULL-STACK
          </text>
          <text
            y="36"
            textAnchor="middle"
            fill="var(--ink-muted)"
            className="font-mono text-[8px] tracking-[0.18em]"
          >
            CENTRAL HUB
          </text>
        </g>
      </g>
    </svg>
  )
}
