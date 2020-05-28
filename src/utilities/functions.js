
function lazyLoad(view) { return () => import(`@/${view}`); }

export { lazyLoad };