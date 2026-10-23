import React from 'react';
import Editor from './components/editor/Editor';
import Preview from './components/preview/Preview';

export default function App() {
  const isPreview = window.location.hash === '#preview';

  return (
    <div id="app" className={isPreview ? 'preview-app' : ''}>
      {isPreview ? <Preview /> : <Editor />}
    </div>
  );
}
