const switchDirection = (direction) => {
  document.documentElement.dir = direction === 'auto' ? 'ltr' : direction;
};

const switchDirectionForPreferredLocale = (preferredLocale) => {
  const textDirection = ['ar', 'dv', 'fa', 'he', 'ku'].includes(preferredLocale)
    ? 'rtl'
    : 'auto';

  switchDirection(textDirection);
};
