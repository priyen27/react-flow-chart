export const colors = {
  primary: {
    light: 'bg-blue-400',
    default: 'bg-blue-500',
    dark: 'bg-blue-600',
    text: 'text-white'
  },
  secondary: {
    light: 'bg-purple-400',
    default: 'bg-purple-500',
    dark: 'bg-purple-600',
    text: 'text-white'
  },
  success: {
    light: 'bg-green-400',
    default: 'bg-green-500',
    dark: 'bg-green-600',
    text: 'text-white'
  },
  danger: {
    light: 'bg-red-400',
    default: 'bg-red-500',
    dark: 'bg-red-600',
    text: 'text-white'
  }
};

export const nodes = {
  home: {
    light: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-200',
      shadow: 'shadow-lg shadow-blue-100',
      text: 'text-gray-900'
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-800 to-gray-900',
      border: 'border-gray-700',
      shadow: 'shadow-lg shadow-gray-900/50',
      text: 'text-gray-100'
    }
  },
  child: {
    light: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      border: 'border-purple-200',
      shadow: 'shadow-lg shadow-purple-100',
      text: 'text-gray-900'
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-700 to-gray-800',
      border: 'border-gray-600',
      shadow: 'shadow-lg shadow-gray-900/50',
      text: 'text-gray-100'
    }
  }
};

export const buttons = {
  base: 'px-4 py-2 rounded transition-all duration-200 ease-in-out',
  primary: `${colors.primary.default} ${colors.primary.text} hover:${colors.primary.dark}`,
  secondary: `${colors.secondary.default} ${colors.secondary.text} hover:${colors.secondary.dark}`,
  success: `${colors.success.default} ${colors.success.text} hover:${colors.success.dark}`,
  danger: `${colors.danger.default} ${colors.danger.text} hover:${colors.danger.dark}`,
  theme: {
    light: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    dark: 'bg-gray-700 text-gray-200 hover:bg-gray-600'
  }
};

export const notifications = {
  container: 'fixed bottom-4 right-4 flex flex-col gap-2',
  base: 'px-4 py-2 rounded shadow-lg transition-all duration-200 ease-in-out',
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white'
}; 