import React from 'react';
import { ConfirmInfoRow } from './row';
import { ConfirmInfoRowUrl } from './url';

const DefaultStory = ({ url }) => <ConfirmInfoRowUrl url={url} />;
DefaultStory.args = {
  url: 'https://example.com',
};

const HttpStory = ({ url }) => <ConfirmInfoRowUrl url={url} />;
HttpStory.args = {
  url: 'http://example.com',
};

export default confirm({ stories }) => (
  <ConfirmInfoRow>
    {Object.keys(stories).map((name) => (
      < stories[name]({ name as props.url }) />
    ))}
  </ConfirmInfoRow>
);
