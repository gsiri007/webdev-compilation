export const getMIME = resource => {
  const extension = resource.split('.')[1];

  const mimes = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    png: 'image/png',
    json: 'application/json'
  };


  //TODO: handle undefined MIME types
  return mimes[extension];
}
