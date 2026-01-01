interface CardProps {
    children: React.ReactNode;
    className?: string; // Allow custom classes
    title?: string;
}

export default function Card({ children, className = "", title }: CardProps) {
    return (
        <div
            className={`glass ${className}`}
            style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
        >
            {title && (
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}
