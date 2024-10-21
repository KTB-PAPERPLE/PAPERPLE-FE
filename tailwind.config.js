export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    height: {
      'real-screen': 'calc(var(--vh) * 100)',
    },
    colors: {
      'main-1': '#7763BF',
      'main-3': '#9373BF',
      'main-4': '#AC96D9',

      'sub-1': '#BF4588',
      'sub-2': '#BF54B8',
      'sub-3': '#D9A0C5',
      'sub-4': '#D29CD9',
      'sub-5': '#F1B3D6',
      'sub-6': '#F2ACE0',

      'emphatic-1': '#323459',
      'emphatic-2': '#332973',
      'emphatic-3': '#392F73',

      'opposite-1': '#5797BF',
      'opposite-2': '#79C7D9',
      'opposite-3': '#90D9D9',
      'opposite-4': '#8BD9D1',

      'main-background-1': 'rgba(119, 99, 191, 0.55)',
      'main-background-2': '#7763BF',
      'main-background-3': '#9373BF',
      'main-background-4': '#AC96D9',

      'sub-background-1': 'rgba(191, 69, 136, 0.8)',
      'sub-background-2': '#BF54B8',
      'sub-background-3': '#D9A0C5',
      'sub-background-4': '#D29CD9',
      'sub-background-5': '#F1B3D6',
      'sub-background-6': 'rgba(242, 172, 224, 0.7)',

      'emphatic-background-1': 'rgba(50, 52, 89, 0.6)',
      'emphatic-background-2': '#332973',
      'emphatic-background-3': '#392F73',

      'opposite-background-1': 'rgba(87, 151, 191, 0.48)',
      'opposite-background-2': '#79C7D9',
      'opposite-background-3': '#90D9D9',
      'opposite-background-4': 'rgba(139, 217, 209, 0.4)',

      'system-black': '#1E1E1E',
      'system-white': '#FFFFFF',
      'system-disabled': '#B3B3B3',
      'system-background': '#FFFFFF',
      'system-red': '#D93744',
      'system-error': '#B3261E',
      'system-brown': '#A64724',
      'system-salmon': '#F1A35C',

      'system-gray-1': '#8E8E93',
      'system-gray-2': '#AEAEB2',
      'system-gray-3': '#C7C7CC',
      'system-gray-4': '#D1D1D6',
      'system-gray-5': '#E5E5EA',
      'system-gray-6': '#F2F2F7',

      title: '#1E1E1E',
      subtitle: '#444444',
      'teritary-title': '#5A5A5A',
      text: '#1E1E1E',
      placeholder: '#B3B3B3',

      'line-1': 'rgba(0, 0, 0, 0.12)',
      'line-2': 'rgba(0, 0, 0, 0.25)',
      'line-3': '#90D9D9',
      'line-4': 'rgba(139, 217, 209, 0.4)',
    },
    fontFamily: {
      sans: ['Pretendard', 'sans-serif'],
    },
    borderRadius: {
      button: '4px',
    },
  },
  minHeight: {
    'real-screen': 'calc(var(--vh) * 100)',
  },
};
export const plugins = [];
