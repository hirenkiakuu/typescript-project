
import styles from './PaginatorButton.module.css';

interface PaginatorButtonProps {
    buttonNumber: number;
    isActive: boolean;
    onPaginatorClick: (pageNumber : number) => void;
};

const PaginatorButton:React.FC<PaginatorButtonProps> = ({isActive, buttonNumber, onPaginatorClick}) => {
    
    return (
        <>
            <div className={isActive ? styles['paginator__button-active'] : styles['paginator__button'] } onClick={() => onPaginatorClick(buttonNumber)} >
                {buttonNumber}
            </div>
        </>
    );
}

export default PaginatorButton;