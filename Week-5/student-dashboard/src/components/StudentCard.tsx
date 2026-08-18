import type { Student } from '../types/Student'

interface StudentCardProps {
  student: Student
}

const NAVY = '#0a1f44'
const NAVY_LIGHT = '#1a3a6b'
const SKY = '#4a9eff'

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <div style={styles.card}>
      <div style={styles.cardAccent} />

      <div style={styles.avatarRow}>
        <div style={styles.avatar}>
          {student.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div>
          <h2 style={styles.name}>{student.name}</h2>
          <p style={styles.role}>Student</p>
        </div>
      </div>

      <div style={styles.progressSection}>
        <div style={styles.progressLabel}>
          <span style={styles.progressText}>Overall Progress</span>
          <span style={styles.progressPercent}>{student.progress}%</span>
        </div>
        <div style={styles.progressBarBackground}>
          <div
            style={{
              ...styles.progressBarFill,
              width: `${student.progress}%`,
            }}
          />
        </div>
      </div>

      <div style={styles.divider} />

      <div style={styles.courseSection}>
        <p style={styles.courseTitle}>Completed Courses</p>
        {student.completedCourses.length > 0 ? (
          <ul style={styles.list}>
            {student.completedCourses.map((course) => (
              <li key={course} style={styles.listItem}>
                <span style={styles.checkIcon}>✓</span>
                {course}
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.emptyText}>None yet</p>
        )}
      </div>

      <div style={styles.courseSection}>
        <p style={styles.courseTitle}>Pending Courses</p>
        {student.pendingCourses.length > 0 ? (
          <ul style={styles.list}>
            {student.pendingCourses.map((course) => (
              <li key={course} style={styles.listItemPending}>
                <span style={styles.dotIcon}>○</span>
                {course}
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.emptyText}>All done</p>
        )}
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '28px 24px 26px',
    boxShadow: '0 12px 32px rgba(10, 31, 68, 0.14)',
    border: '1px solid #e8ecf3',
    width: '100%',
    maxWidth: '340px',
    overflow: 'hidden',
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: `linear-gradient(90deg, ${NAVY}, ${SKY})`,
  },
  avatarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '22px',
  },
  avatar: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${NAVY_LIGHT}, ${SKY})`,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '15px',
    flexShrink: 0,
  },
  name: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 700,
    color: NAVY,
    letterSpacing: '-0.3px',
  },
  role: {
    margin: '2px 0 0 0',
    fontSize: '12px',
    color: '#9aa4b8',
  },
  progressSection: {
    marginBottom: '18px',
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '7px',
  },
  progressText: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#8a93a6',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  },
  progressPercent: {
    fontSize: '16px',
    fontWeight: 800,
    color: NAVY,
  },
  progressBarBackground: {
    width: '100%',
    height: '9px',
    backgroundColor: '#eef1f6',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: `linear-gradient(90deg, ${NAVY_LIGHT}, ${SKY})`,
    borderRadius: '10px',
    transition: 'width 0.4s ease',
  },
  divider: {
    height: '1px',
    backgroundColor: '#eef1f6',
    margin: '18px 0',
  },
  courseSection: {
    marginBottom: '16px',
  },
  courseTitle: {
    fontWeight: 700,
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    color: NAVY,
    marginBottom: '10px',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    fontSize: '13.5px',
  },
  listItem: {
    padding: '5px 0',
    color: '#3a4356',
    display: 'flex',
    alignItems: 'center',
  },
  listItemPending: {
    padding: '5px 0',
    color: '#8a93a6',
    display: 'flex',
    alignItems: 'center',
  },
  checkIcon: {
    color: SKY,
    marginRight: '9px',
    fontWeight: 700,
  },
  dotIcon: {
    color: '#c5cad6',
    marginRight: '9px',
  },
  emptyText: {
    fontSize: '13px',
    color: '#b0b7c3',
    fontStyle: 'italic',
    margin: 0,
  },
}