import Image from 'next/image'
import styles from './header.module.css'

import SearchInput from '../SearchInput'
import { IconBell, IconCamera } from '../Icons'

export const Header = () => {
    return (<header className={styles.header}>
        <form className={styles.form}>
            <SearchInput />
        </form>

        <ul className={styles.actions}>
            <li>
                <IconBell />
            </li>
            <li>
                <IconCamera />
            </li>
            <li>
                <Image 
                    src="https://github.com/brunoLagoa.png" 
                    alt='Bruno Castro'
                    width={24}
                    height={25}
                    className={styles.roundedFull}
                />
            </li>
        </ul>
    </header>)
}