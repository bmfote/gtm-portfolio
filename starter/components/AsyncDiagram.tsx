'use client'

import { useEffect, useRef, useState } from 'react'

interface AsyncPath {
  id: string
  label: string
  nodes: string[]
  trigger?: string // label for the webhook/trigger between paths
}

interface AsyncDiagramProps {
  paths: AsyncPath[]
}

export function AsyncDiagram({ paths }: AsyncDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [activePath, setActivePath] = useState(-1)
  const [activeNode, setActiveNode] = useState(-1)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [triggered])

  useEffect(() => {
    if (!triggered) return

    setActivePath(0)
    setActiveNode(0)

    let totalNodes = paths.reduce((sum, p) => sum + p.nodes.length, 0)
    let pathIndex = 0
    let nodeIndex = 0
    let step = 0

    const interval = setInterval(() => {
      step++
      nodeIndex++

      if (nodeIndex >= paths[pathIndex].nodes.length) {
        pathIndex++
        nodeIndex = 0
        if (pathIndex >= paths.length) {
          clearInterval(interval)
          setActivePath(paths.length) // all complete
          setTimeout(() => {
            setActivePath(-1)
            setActiveNode(-1)
            setTriggered(false)
            setTimeout(() => setTriggered(true), 500)
          }, 2500)
          return
        }
      }

      setActivePath(pathIndex)
      setActiveNode(nodeIndex)
    }, 600)

    return () => clearInterval(interval)
  }, [triggered, paths])

  // compute which paths are complete
  const pathComplete = (pIdx: number) => {
    if (activePath > pIdx) return true
    if (activePath === pIdx && activeNode >= paths[pIdx].nodes.length - 1) return true
    return false
  }

  return (
    <div
      ref={ref}
      style={{
        fontFamily: 'var(--font-mono)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      {paths.map((path, pIdx) => {
        const isPathActive = activePath === pIdx
        const isPathDone = pathComplete(pIdx)
        const isPathPending = activePath < pIdx

        return (
          <div key={path.id}>
            {/* Path header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 8,
                opacity: isPathPending ? 0.3 : 1,
                transition: 'opacity 0.3s',
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: isPathActive ? 'var(--accent)' : isPathDone ? 'var(--text-secondary)' : 'var(--canvas-border)',
                  border: `1px solid ${isPathActive ? 'var(--accent)' : isPathDone ? 'var(--text-secondary)' : 'var(--canvas-border)'}`,
                  borderRadius: 3,
                  padding: '1px 6px',
                  transition: 'all 0.2s',
                }}
              >
                PATH {path.id}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: isPathActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  transition: 'color 0.2s',
                }}
              >
                {path.label}
              </span>
            </div>

            {/* Nodes */}
            <div
              style={{
                paddingLeft: 16,
                borderLeft: `2px solid ${
                  isPathActive ? 'var(--accent)' : isPathDone ? 'rgba(88,166,255,0.2)' : 'var(--canvas-border)'
                }`,
                marginBottom: 4,
                transition: 'border-color 0.3s',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              {path.nodes.map((node, nIdx) => {
                const isNodeActive = isPathActive && nIdx === activeNode
                const isNodeDone = isPathDone || (isPathActive && nIdx < activeNode)

                return (
                  <div
                    key={nIdx}
                    style={{
                      fontSize: 12,
                      color: isNodeActive
                        ? 'var(--text-primary)'
                        : isNodeDone
                        ? 'var(--text-secondary)'
                        : 'rgba(139,148,158,0.3)',
                      fontWeight: isNodeActive ? 600 : 400,
                      paddingLeft: 8,
                      borderLeft: isNodeActive
                        ? '2px solid var(--accent)'
                        : '2px solid transparent',
                      paddingTop: 2,
                      paddingBottom: 2,
                      transition: 'all 0.2s',
                      boxShadow: isNodeActive ? '-4px 0 8px rgba(88,166,255,0.15)' : 'none',
                    }}
                  >
                    {node}
                  </div>
                )
              })}
            </div>

            {/* Webhook trigger connector between paths */}
            {path.trigger && pIdx < paths.length - 1 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  paddingLeft: 16,
                  marginBottom: 8,
                  opacity: isPathDone ? 1 : 0.2,
                  transition: 'opacity 0.4s',
                }}
              >
                <div
                  style={{
                    width: 1,
                    height: 20,
                    background: isPathDone ? 'var(--accent)' : 'var(--canvas-border)',
                    transition: 'background 0.3s',
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    color: isPathDone ? 'var(--accent)' : 'var(--text-secondary)',
                    letterSpacing: '0.08em',
                    fontStyle: 'italic',
                    transition: 'color 0.3s',
                  }}
                >
                  ↓ {path.trigger}
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
