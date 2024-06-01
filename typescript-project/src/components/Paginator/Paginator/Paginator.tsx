import { useMemo } from 'react';
import PaginatorButton from '../PaginatorButton/PaginatorButton';
import styles from './Paginator.module.css';

interface PaginatorProps {
    pagesCount: number;
    activePage: number;
    onPaginatorButtonClick: (pageNumber: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ activePage, pagesCount, onPaginatorButtonClick }) => {

    const pagesArray = useMemo(() => {
        return Array.from({ length: pagesCount }, (_, i) => i + 1);
    }, [pagesCount]);

    return (
        <div className={styles['paginator']}>
            {pagesArray.map(index => (
                <PaginatorButton key={index} isActive={activePage === index} buttonNumber={index} onPaginatorClick={onPaginatorButtonClick} />
            ))}
        </div>
    );
}

export default Paginator;
