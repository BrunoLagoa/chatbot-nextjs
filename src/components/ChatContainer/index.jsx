'use client';

import { useEffect, useRef } from 'react';
import { useChat } from 'ai/react';

import Button from '../Button';
import ChatBubble from '../ChatBubble';
import { ChatForm } from '../ChatForm';
import { ChatHeader } from '../ChatHeader';
import { IconStop } from '../Icons';
import { Loader } from '../Loader';
import { RetryButton } from '../RetryButton';
import styles from './container.module.css';

const mockMessages = [
  {
    id: '1',
    role: 'user',
    content: 'Olá, como você está?',
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Oi! Estou bem, obrigado por perguntar. E você?',
  },
  {
    id: '3',
    role: 'user',
    content: 'Estou bem também! O que você pode fazer por mim?',
  },
  {
    id: '4',
    role: 'assistant',
    content: 'Posso ajudar com informações, tirar dúvidas ou até mesmo conversar. O que você precisa?',
  },
  {
    id: '5',
    role: 'user',
    content: 'Quero saber mais sobre inteligência artificial.',
  },
  {
    id: '6',
    role: 'assistant',
    content: 'Claro! Inteligência artificial é um campo da ciência da computação que se concentra na criação de sistemas que podem realizar tarefas que normalmente exigiriam inteligência humana.',
  },
  {
    id: '7',
    role: 'user',
    content: 'Isso é incrível! Quais são os tipos de IA?',
  },
  {
    id: '8',
    role: 'assistant',
    content: 'Existem três tipos principais: IA estreita (ou fraca), IA geral (ou forte) e superinteligência. A IA estreita é projetada para tarefas específicas, como reconhecimento de voz.',
  },
  {
    id: '9',
    role: 'user',
    content: 'E a superinteligência?',
  },
  {
    id: '10',
    role: 'assistant',
    content: 'A superinteligência refere-se a uma IA que supera a inteligência humana em quase todos os aspectos, incluindo criatividade, resolução de problemas e habilidades sociais.',
  },
];

export const ChatContainer = () => {
  const { messages, setMessages, input, isLoading, handleInputChange, handleSubmit, stop, reload, error } = useChat();

  const chatContainerRef = useRef(null);

  function removeMessage(msgId) {
    setMessages(messages.filter(m => m.id != msgId))
  }

  const errorMessage = typeof error === 'object' ? error.message : 'Ops! Alguma coisa deu errado!';

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <section className={styles.container}>
      <ChatHeader />
      <div ref={chatContainerRef} className={styles.chat}>
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
      {error && <p>{errorMessage}</p>}
      <ChatForm 
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};
