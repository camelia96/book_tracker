export default function TestPage() {
    return (
      <html>
        <body style={{ padding: '20px', fontFamily: 'sans-serif' }}>
          <h1>✅ Sitio funciona</h1>
          <p>Si ves esto, el problema es en tu layout/componentes</p>
          <pre>
            Node: {process.env.NODE_ENV}
            Vercel: {process.env.VERCEL ? 'Sí' : 'No'}
          </pre>
        </body>
      </html>
    );
  }