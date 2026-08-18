import studentsData from './data/students.json'
import StudentCard from './components/StudentCard'
import type { Student } from './types/Student'

const students: Student[] = studentsData

function App() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <p style={styles.eyebrow}>LEARNING ANALYTICS</p>
          <h1 style={styles.title}>Student Progress Dashboard</h1>
          <p style={styles.subtitle}>Track learning progress across all students</p>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.grid}>
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </main>
    </div>
  )
}

const NAVY = '#0a1f44'
const NAVY_DEEP = '#071630'
const SKY = '#4a9eff'

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#eef2f9',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  header: {
    background: `linear-gradient(135deg, ${NAVY_DEEP}, ${NAVY} 60%, #12386b)`,
    padding: '56px 24px 72px',
    textAlign: 'center',
  },
  headerInner: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  eyebrow: {
    color: SKY,
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '3px',
    margin: '0 0 12px 0',
  },
  title: {
    color: '#ffffff',
    fontSize: '38px',
    fontWeight: 800,
    margin: '0 0 10px 0',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    color: '#aebdd6',
    fontSize: '16px',
    margin: 0,
  },
  main: {
    maxWidth: '1200px',
    margin: '-40px auto 0',
    padding: '0 24px 60px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    justifyContent: 'center',
  },
}

export default App