import React from 'react';

const SVG = (props) => {
    return (
        <div
            className={props.classes}
            style={
                props.size === 'screenSize'
                    ? {
                          width: '100vw',
                          height: '100vh',
                          objectFit: 'contain',
                          overflow: 'hidden',
                          maxWidth: '100%'
                      }
                    : props.size === 'divSize'
                    ? {
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          overflow: 'hidden',
                          maxWidth: '100%'
                      }
                    : {
                          width: props.width ? props.width : 'auto',
                          height: props.height ? props.height : '100%',
                          objectFit: 'contain',
                          overflow: 'hidden',
                          maxWidth: '100%'
                      }
            }>
            <img
                src={props.svg}
                style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    objectFit: props.size ? 'contain' : 'scale-down'
                }}
                alt={props.tag}></img>
            {props.children}
        </div>
    );
};

export default SVG;
