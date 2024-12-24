const slugify = (str) => {
    const map = {
      'ə': 'e',
      'ü': 'u',
      'ö': 'o',
      'ç': 'c',
      'ğ': 'g',
      'ş': 's',
      'ı': 'i',
      'Ə': 'e',
      'Ü': 'u',
      'Ö': 'o',
      'Ç': 'c',
      'Ğ': 'g',
      'Ş': 's',
      'I': 'i',
    };
  
    return str
      .toLowerCase()
      .replace(/[əüöçğşıƏÜÖÇĞŞI]/g, (char) => map[char])
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };
  
module.exports = { slugify }