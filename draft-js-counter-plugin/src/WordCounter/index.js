import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const WordCounter = ({ store, limit, theme = {}, className }) => {
  const getWordCount = editorState => {
    const plainText = editorState.getCurrentContent().getPlainText('');
    const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
    const cleanString = plainText.replace(regex, ' ').trim(); // replace above characters w/ space
    const wordArray = cleanString.match(/\S+/g); // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  };

  const getClassNames = count => {
    const defaultStyle = clsx(theme.counter, className);
    const overLimitStyle = clsx(theme.counterOverLimit, className);
    return count > limit ? overLimitStyle : defaultStyle;
  };

  const count = getWordCount(store.getEditorState());
  const classNames = getClassNames(count);

  return <span className={classNames}>{count}</span>;
};

WordCounter.propTypes = {
  theme: PropTypes.any,
  limit: PropTypes.number,
};

export default WordCounter;
