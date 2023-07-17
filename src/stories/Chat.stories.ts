import type { Meta, StoryObj } from '@storybook/react';
import Chat from '../components/Chat';

const meta = {
  title: 'Dasmeta/Chat',
  component: Chat,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

const channels = [
  {
    id: '1',
    title: 'Channel 1',
    type: 'group',
    lastMessage: {
      text: 'Last Message',
      type: '',
      author: 'John Smith',
      date: '2011-10-05T14:48:00',
    },
    toUserId: '2',
    avatar: undefined,
    avatarAlt: 'JS',
    closed: false,
    sent: false,
  },
  {
    id: '2',
    title: 'Channel 2',
    type: 'direct',
    lastMessage: {
      text: 'Last Message',
      type: 'image',
      author: 'John Smith',
      date: '2011-10-05T14:48:00',
    },
    toUserId: '2',
    avatar: undefined,
    avatarAlt: 'JS',
    closed: false,
    sent: false,
  },
  {
    id: '3',
    title: 'Channel 3',
    type: 'direct',
    lastMessage: {
      text: 'Last Message',
      type: 'image',
      author: 'John Smith',
      date: '2011-10-05T14:48:00',
    },
    toUserId: '2',
    avatar: '',
    avatarAlt: 'JS',
    closed: false,
    sent: false,
  }
]

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

  console.log(messageType);

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
    channels,
    activeChannel: '1',
    messenger: {
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
}