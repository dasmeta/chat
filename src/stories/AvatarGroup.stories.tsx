import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import AvatarGroup from '../components/AvatarGroup';
import Avatar from '../components/Avatar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Dasmeta/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const images = [
  'https://static.toiimg.com/photo/76729750.cms',
  'https://i.pinimg.com/originals/24/25/6c/24256c7b17b072fa898209bd17f36209.png',
  'https://static.standard.co.uk/s3fs-public/thumbnails/image/2020/05/18/16/img-0359.jpg?w968',
];

const Template = (args) => (
  <AvatarGroup {...args}>
    {images &&
      images.map((item, key) => {
        return <Avatar src={item} alt={`${key}`} size="sm" />;
      })}
  </AvatarGroup>
);

export const Default: Story = {
    ...Template,
    args: {
        maxCount: 3,
        children: (
          <>
            <Avatar src="https://static.toiimg.com/photo/76729750.cms" />
            <Avatar name="John Smith" />
            <Avatar name="Nicola Tesla" />
          </>
        ),
    }
}