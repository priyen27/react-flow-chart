import { buttons } from '../../theme/index';

const Button = ({ onClick, variant = 'primary', children, isDark }) => {
  if (variant === 'theme') {
    return (
      <button
        onClick={onClick}
        className={`${buttons.base} ${buttons.theme[isDark ? 'dark' : 'light']}`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${buttons.base} ${buttons[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button; 