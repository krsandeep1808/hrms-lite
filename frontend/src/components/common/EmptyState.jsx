export default function EmptyState({ icon = "📭", title, message }) {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">{icon}</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{message}</p>
        </div>
    );
}
