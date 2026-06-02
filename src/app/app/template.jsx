'use client'

// Re-mounts on every navigation within /app, giving each page a soft entrance.
export default function Template({ children }) {
  return <div className="page-anim">{children}</div>
}
