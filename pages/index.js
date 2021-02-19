import React from "react"
import { a, useSpring } from "@react-spring/web"
import { useTweaks } from "use-tweaks"

export default function App() {
  const { interpolation, ...config } = useTweaks("Spring", {
    interpolation: { value: 0, min: 0, max: 1 },
    mass: { value: 1, min: 1, max: 10 },
    tension: { value: 170, min: 1, max: 200 },
    friction: { value: 26, min: 1, max: 30 },
  })

  const type = useTweaks("Text", {
    text: "poimandres",
    color: "#fff",
    fontSize: { value: 175, min: 150, max: 250 },
    letterSpacing: "-0.08em",
    lineHeight: "0.75em",
    fontStyle: "italic",
    "--var-weight": { min: 100, max: 900, value: 600 },
    "--var-slant": { min: -10, max: 0, value: 0 },
  })

  const [{ s }] = useSpring({ s: interpolation, config }, [
    interpolation,
    config,
  ])

  return (
    <div className="center">
      <a.div className="App">
        <div className="title" style={type}>
          {[...Array(10)].map((_, i) => (
            <a.div
              key={i}
              style={{
                willChange: "transform",
                transform: s.to((s) => {
                  const dir = i % 2 ? 1 : -1
                  return `translate3d(${100 * dir + s * (500 * dir)}px,0,0)`
                }),
              }}
            >
              {[...Array(5)].map((_, i) => (
                <span key={i}>{type.text}</span>
              ))}
            </a.div>
          ))}
        </div>
      </a.div>
    </div>
  )
}
