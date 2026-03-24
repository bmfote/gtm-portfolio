export function Footer() {
  return (
    <footer
      style={{
        padding: '40px 24px',
        borderTop: '1px solid var(--canvas-border)',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: 0 }}>
        © 2025 Matthew Batterson · Lenexa, KS ·{' '}
        <a href="mailto:battersonsales@gmail.com" style={{ color: 'var(--accent)' }}>
          battersonsales@gmail.com
        </a>
      </p>
    </footer>
  )
}
