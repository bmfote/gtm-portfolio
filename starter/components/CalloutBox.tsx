interface CalloutBoxProps {
  children: React.ReactNode
}

export function CalloutBox({ children }: CalloutBoxProps) {
  return (
    <div
      style={{
        background: 'rgba(88, 166, 255, 0.06)',
        borderLeft: '3px solid var(--accent)',
        borderRadius: '0 6px 6px 0',
        padding: '16px 20px',
        margin: '0',
        fontSize: 15,
        color: 'var(--text-secondary)',
        lineHeight: 1.7,
      }}
    >
      {children}
    </div>
  )
}
