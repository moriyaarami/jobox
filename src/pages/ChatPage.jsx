import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video,
  Search,
  Archive,
  Flag,
  Ban,
  Smile
} from 'lucide-react';
import chatIllustration from '@/assets/chat-illustration.png';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const messagesEndRef = useRef(null);

  // Mock chat data
  const chats = [
    {
      id: 1,
      name: 'מעסיק א׳ - חברת טכנולוגיה',
      lastMessage: 'מעוניינים לקבוע ראיון טלפוני',
      timestamp: '10:30',
      unread: 2,
      isOnline: true,
      avatar: null,
      type: 'employer'
    },
    {
      id: 2,
      name: 'מעסיק ב׳ - סטארט-אפ',
      lastMessage: 'תודה על השליחה של הקורות חיים',
      timestamp: 'אתמול',
      unread: 0,
      isOnline: false,
      avatar: null,
      type: 'employer'
    },
    {
      id: 3,
      name: 'מועמד ג׳',
      lastMessage: 'מתי נוכל לדבר?',
      timestamp: '15:45',
      unread: 1,
      isOnline: true,
      avatar: null,
      type: 'candidate'
    }
  ];

  const messages = selectedChat ? [
    {
      id: 1,
      sender: 'other',
      content: 'שלום! ראיתי את הפרופיל שלך ואני מעוניין לדבר איתך על תפקיד בחברה שלנו',
      timestamp: '09:30',
      type: 'text'
    },
    {
      id: 2,
      sender: 'me',
      content: 'שלום! אשמח לשמוע פרטים נוספים על התפקיד',
      timestamp: '09:35',
      type: 'text'
    },
    {
      id: 3,
      sender: 'other',
      content: 'מדובר על תפקיד Senior Full Stack Developer בצוות של 8 מפתחים. העבודה היברידית - 3 ימים במשרד ו-2 מהבית',
      timestamp: '09:40',
      type: 'text'
    },
    {
      id: 4,
      sender: 'me',
      content: 'נשמע מעניין! מה הטכנולוגיות שאתם עובדים איתן?',
      timestamp: '09:42',
      type: 'text'
    },
    {
      id: 5,
      sender: 'other',
      content: 'אנחנו עובדים עם React, Node.js, TypeScript, AWS ו-MongoDB. בדיוק הטכנולוגיות שראיתי שיש לך ניסיון איתן',
      timestamp: '09:45',
      type: 'text'
    },
    {
      id: 6,
      sender: 'me',
      content: 'מושלם! אני אשמח לקבוע ראיון',
      timestamp: '09:47',
      type: 'text'
    },
    {
      id: 7,
      sender: 'other',
      content: 'מעולה! מעוניינים לקבוע ראיון טלפוני השבוע?',
      timestamp: '10:30',
      type: 'text'
    }
  ] : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      // TODO: Implement send message logic
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const ChatListItem = ({ chat }) => (
    <div
      className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
        selectedChat?.id === chat.id ? 'bg-accent' : ''
      }`}
      onClick={() => setSelectedChat(chat)}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar>
            <AvatarImage src={chat.avatar} />
            <AvatarFallback>
              {chat.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          {chat.isOnline && (
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium truncate">{chat.name}</h4>
            <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
            {chat.unread > 0 && (
              <Badge variant="default" className="text-xs">
                {chat.unread}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const MessageBubble = ({ message }) => (
    <div className={`flex ${message.sender === 'me' ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          message.sender === 'me'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${
          message.sender === 'me' 
            ? 'text-primary-foreground/70' 
            : 'text-muted-foreground'
        }`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Chat List */}
      <Card className="w-80 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>הודעות</CardTitle>
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="חפש שיחות..." className="pr-10" />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-y-auto">
          <div className="divide-y">
            {chats.map((chat) => (
              <ChatListItem key={chat.id} chat={chat} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedChat.avatar} />
                    <AvatarFallback>
                      {selectedChat.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedChat.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedChat.isOnline ? 'מחובר עכשיו' : 'לא מחובר'}
                    </p>
                  </div>
                </div>
                
               {/*  <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div> */}
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
               {/*  <Button variant="ghost" size="icon">
                  <Smile className="h-4 w-4" />
                </Button> */}
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="הקלד הודעה..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-2 mt-2">
                {/* <Button variant="ghost" size="sm">
                  <Archive className="ml-1 h-3 w-3" />
                  ארכב
                </Button> */}
                <Button variant="ghost" size="sm">
                  <Flag className="ml-1 h-3 w-3" />
                  דווח
                </Button>
                <Button variant="ghost" size="sm">
                  <Ban className="ml-1 h-3 w-3" />
                  חסום
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <img 
                src={chatIllustration} 
                alt="התחל שיחה" 
                className="mx-auto w-48 h-48 object-contain opacity-50"
              />
              <h3 className="text-lg font-semibold">בחר שיחה להתחלה</h3>
              <p className="text-muted-foreground">
                בחר שיחה מהרשימה כדי להתחיל לשוחח
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChatPage;

