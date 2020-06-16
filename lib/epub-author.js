'use babel';

import EpubAuthorView from './epub-author-view';
import { CompositeDisposable } from 'atom';

export default {

  epubAuthorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.epubAuthorView = new EpubAuthorView(state.epubAuthorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.epubAuthorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'epub-author:toggle': () => this.toggle(),
      'epub-author:convert': () => this.convert()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.epubAuthorView.destroy();
  },

  serialize() {
    return {
      epubAuthorViewState: this.epubAuthorView.serialize()
    };
  },

  toggle() {
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      const editor = atom.workspace.getActiveTextEditor();
      const words = editor.getText().split(/\s+/).length;
      this.epubAuthorView.setCount(words);
      this.modalPanel.show();
    }
    console.log('EpubAuthor was toggled!');
  },
  
  convert() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      editor.insertText("Hello, World!")
    }
  }

};
