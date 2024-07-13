import styles from './LoaderStatus.module.css';

export function LoaderStatus() {
    let errors: string[] = [];    
    let errorMessages = (<></>);

    if(errors.length > 0) {
        errorMessages = (
            <ul className={styles.errorList}>
                {errors.map(e => (
                    <li><span>{e}</span></li>
                ))}
            </ul>
        );
    }

    // Todo: infoMsgs[] / successMsgs[] and retrieve these messages from global ui store

    return (
        <div className={styles.messageBanner}>
            {errorMessages}
        </div>
    )
};
