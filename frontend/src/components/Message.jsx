export default function Message({ type = 'error', payload }) {
  if (!payload) return null;

  return (
    <div className={`message message--${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <span>{payload.message}</span>
      {payload.errors?.length > 0 && (
        <ul>
          {payload.errors.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
