import Image from "next/image"

import vidy from './vidy.svg'

import styles from './header.module.css'

export const ChatHeader = () => {
    return (<div>
        <header className={styles.header}>
            <Image alt="" src={vidy} />
            <h1 className={styles.heading}>
                Eu sou o Bruno chatbot, seu assistente virtual! Só falo de filmes. Séries? Nem no Oscar! 🍿🎬
            </h1>
        </header>
    </div>)
}