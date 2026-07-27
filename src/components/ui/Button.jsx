import './Button.css';

export default function Button({
  children,
  icon,
  variant,
  alt,
  ...buttonProps
}) {
  const classNames = ['button', variant && `button--${variant}`]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} type="button" {...buttonProps}>
      {icon && (
        <span className="button__icon" aria-hidden="true">
          <img src={icon} alt={alt} />
        </span>
      )}
      {children && <span>{children}</span>}
    </button>
  );
}
