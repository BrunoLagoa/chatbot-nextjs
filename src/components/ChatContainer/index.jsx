'use client';

import { useChat } from 'ai/react';

import Button from '../Button';
import ChatBubble from '../ChatBubble';
import { ChatForm } from '../ChatForm';
import { ChatHeader } from '../ChatHeader';
import { IconStop } from '../Icons';
import { Loader } from '../Loader';
import { RetryButton } from '../RetryButton';
import styles from './container.module.css';

export const ChatContainer = () => {
  const { messages, setMessages, input, isLoading, handleInputChange, handleSubmit, stop, reload, error } = useChat();

  function removeMessage(msgId) {
    setMessages(messages.filter(m => m.id != msgId))
  }

  return (
    <section className={styles.container}>
      <ChatHeader />
      <div className={styles.chat}>
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.content}
            isUser={msg.role == 'user'}
            onRemove={() => removeMessage(msg.id)}
          />
        ))}
      </div>
      {isLoading && (
        <div>
          <Loader />
          <Button variant='danger' onClick={stop}>
            <IconStop /> parar
          </Button>
        </div>  
      )}
      {!isLoading && !!messages.length && !error && (
        <div>
          <RetryButton onClick={reload} />
        </div>  
      )}
      {error && <p>Ops! Alguma coisa deu errado!</p>}
      <ChatForm 
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};
