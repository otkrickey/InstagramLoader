import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import {
    PrimaryButton,
    DefaultButton,
    TeachingBubble,
    DirectionalHint
} from '@fluentui/react/lib';

import classes from './style.scss';

const Root: FC = () => {
    const [showBubble, setShowBubble] = useState(false);
    useEffect(() => {
        const id = setTimeout(() => { setShowBubble(true); }, 3000);
        return () => clearTimeout(id);
    }, [])
    return (
        <div className={classes.Root}>
            <h1>Hello World!</h1>
            <div>
                <DefaultButton text='Like' id='targetButton' />
                <PrimaryButton text='Subscribe' />
            </div>
            {
                showBubble && (
                    <TeachingBubble
                        calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
                        target='#targetButton'
                        isWide={true}
                        hasCloseButton={true}
                        onDismiss={() => setShowBubble(false)}
                        headline='please read carefully'
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magnam tempora sit possimus! Quisquam odio magnam explicabo totam ut debitis maiores dignissimos, quod quae at expedita accusamus incidunt sequi tempora.
                    </TeachingBubble>
                )
            }
            <p>Some text here.</p>
        </div>
    )
}


ReactDOM.render(
    <Root />,
    document.getElementById('app')
)