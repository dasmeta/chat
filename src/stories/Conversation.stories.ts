import type { Meta, StoryObj } from '@storybook/react';
import Conversation from '../components/Conversation';

const meta = {
  title: 'Dasmeta/Conversation',
  component: Conversation,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Conversation>;

export default meta;
type Story = StoryObj<typeof meta>;

const getMessages = async (channelId, loaded = 0) => {

  if(loaded > 0) {
    return [];
  }

  return [
    {
      id: '1',
      messageId: '1',
      date: '2013-12-05T14:48:00',
      type: '',
      text: 'How are you?',
      edited: false,
      fileName: '',
      fileType: '',
      sender: {
        id: '1',
        name: 'John Smith',
        avatar: undefined,
      },
      seen: [
        {
          id: '2',
          name: 'John Wick',
          avatar: undefined,
        }
      ],
      loaded: true,
    },
    {
      id: '2',
      messageId: '2',
      date: '2012-11-05T14:48:00',
      type: '',
      text: 'Hello',
      edited: false,
      fileName: '',
      fileType: '',
      sender: {
        id: '2',
        name: 'John Wick',
        avatar: undefined,
      },
      loaded: true,
    },
    {
      id: '3',
      messageId: '3',
      date: '2013-12-04T14:48:00',
      type: '',
      text: 'How are you?',
      edited: false,
      fileName: '',
      fileType: '',
      sender: {
        id: '1',
        name: 'John Smith',
        avatar: undefined,
      },
      seen: [
        {
          id: '2',
          name: 'John Wick',
          avatar: undefined,
        }
      ],
      // forwardedMessage?: Sender;
      // repliedMessage?: Message;
      loaded: true,
    },
    {
      id: '4',
      messageId: '4',
      date: '2013-12-04T14:47:00',
      type: '',
      text: 'Hello',
      edited: false,
      fileName: '',
      fileType: '',
      sender: {
        id: '2',
        name: 'John Wick',
        avatar: undefined,
      },
      loaded: true,
    },
  ];
}

const detectMessageType = (type) => {
  const messageType = type.split('/').shift();
  if (!['image', 'video', 'audio'].includes(messageType)) {
    return 'attachment';
  }
  return messageType;
};

const onUpload = async ({ file }) => {

  const messageType = detectMessageType(file.type);

  if(messageType === 'attachment') {
    return {
      id: 1,
      path: 'storage/fee472ce6e64b122ba0c8b3/2017/02/file_example_XLS_10.xls',
      url: 'https://file-examples.com/storage/fee472ce6e64b122ba0c8b3/2017/02/file_example_XLS_10.xls'
    }
  }
  
  if(messageType === 'video') {
    return {
      id: 1,
      path: 'storage/fee472ce6e64b122ba0c8b3/2017/04/file_example_MP4_480_1_5MG.mp4',
      url: 'https://file-examples.com/storage/fee472ce6e64b122ba0c8b3/2017/04/file_example_MP4_480_1_5MG.mp4'
    }
  }

  if(messageType === 'audio') {
    return {
      id: 1,
      path: 'storage/fee472ce6e64b122ba0c8b3/2017/04/file_example_MP4_480_1_5MG.mp4',
      url: 'https://file-examples.com/storage/fee472ce6e64b122ba0c8b3/2017/11/file_example_MP3_700KB.mp3'
    }
  }

  if(messageType === 'image') {
    return {
      id: 1,
      path: 'storage/fee472ce6e64b122ba0c8b3/2017/10/file_example_JPG_100kB.jpg',
      url: 'https://file-examples.com/storage/fee472ce6e64b122ba0c8b3/2017/10/file_example_JPG_100kB.jpg'
    }
  }
}

export const Default: Story = {
  args: {
    sender: {
      id: '1',
      name: 'John Smith',
      avatar: undefined
    },
    messageActions: {
      update: true,
      delete: true,
      forward: true,
    },
    actions: {
      recorder: true,
      attachment: true,
    },
    getMessages,
    onSendMessage: () => {},
    onRemoveMessage: () => {},
    onUpload
  }
}

export const Comments: Story = {
  args: {
    sender: {
      id: '1',
      name: 'John Smith',
      avatar: undefined
    },
    getMessages,
    replyEnabled: false,
    emojiEnabled: false,
    onSendMessage: () => {},
    onRemoveMessage: () => {},
  }
}