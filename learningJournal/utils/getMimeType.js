export const getMimeType = (path) => {
  const extension = path.split('.')[1];

  const mimeTypes = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/js',
    png: 'image/png',
    json: 'application/json'
  };

  return mimeTypes[extension];
};
