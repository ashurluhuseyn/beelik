export const maskPhone = (phone) => {
  // Ensure the phone always starts with '+994 '
  if (!phone || !phone.startsWith('+994')) {
    phone = '+994 ';
  }

  const cleaned = phone.replace(/[^\d+]/g, ''); // Keep only digits and '+'
  const prefix = '+994 ';
  const withoutPrefix = cleaned.slice(4); // Remove '+994 '

  // Match valid Azerbaijani mobile operator formats
  const match = withoutPrefix.match(/^(\d{2})?(\d{3})?(\d{2})?(\d{2})?$/);

  if (match) {
    const formatted = `${prefix}${match[1] || ''}${match[1] ? '-' : ''}${match[2] || ''}${match[2] ? '-' : ''}${match[3] || ''}${match[3] ? '-' : ''}${match[4] || ''}`;
    // Restrict maximum length to the format '+994 50-265-64-63'
    if (formatted.length > 17) {
      return formatted.slice(0, 17);
    }
    return formatted;
  }

  // Ensure input doesn't exceed max length
  if (phone.length > 17) {
    return phone.slice(0, 17);
  }

  return phone;
};
