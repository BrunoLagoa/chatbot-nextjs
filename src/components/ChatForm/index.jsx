'use client'

import styles from './chat.module.css'
import { IconSend } from "../Icons"

export const ChatForm = ({input, handleInputChange, handleSubmit}) => {
    return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <input 
            className={styles.input} 
            placeholder="Digite sua mensagem..."
            required
            onChange={handleInputChange}
            value={input}
        />
        <button  className={styles.btn}>
            <IconSend />
        </button>
    </form>)
}