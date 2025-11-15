import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  size = 'medium',
  variant = 'default',
  startIcon,
  endIcon,
  ...props
}, ref) => {
  const baseClasses = 'input';
  const sizeClasses = {
    small: 'input-small',
    medium: 'input-medium',
    large: 'input-large'
  };
  const variantClasses = {
    default: 'input-default',
    filled: 'input-filled',
    outlined: 'input-outlined'
  };

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    error && 'input-error',
    fullWidth && 'full-width',
    (startIcon || endIcon) && 'has-icon',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={`form-group ${fullWidth ? 'full-width' : ''}`}>
      {label && (
        <label htmlFor={props.id} className="input-label">
          {label}
        </label>
      )}

      <div className="input-container">
        {startIcon && (
          <span className="input-icon start-icon">
            {startIcon}
          </span>
        )}

        <input
          ref={ref}
          className={classes}
          {...props}
        />

        {endIcon && (
          <span className="input-icon end-icon">
            {endIcon}
          </span>
        )}
      </div>

      {error && (
        <span className="error-text">{error}</span>
      )}

      {helperText && !error && (
        <span className="helper-text">{helperText}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;