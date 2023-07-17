import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '../components/Avatar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Dasmeta/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        src: 'https://static.toiimg.com/photo/76729750.cms'
    }
}

export const NoImage: Story = {
    args: {
        name: 'John Smith'
    }
}

export const WithText: Story = {
    args: {
        src: 'https://static.toiimg.com/photo/76729750.cms',
        text: 'Hello'
    }
}